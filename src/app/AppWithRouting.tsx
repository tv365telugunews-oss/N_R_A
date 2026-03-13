import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useNavigate } from 'react-router';
import { NewsFlipCard } from '@/app/components/NewsFlipCard';
import { CategoryMenu } from '@/app/components/CategoryMenu';
import { Onboarding } from '@/app/components/Onboarding';
import { mockNewsData } from '@/app/data/newsData';
import type { NewsArticle } from '@/app/types/news';
import { NEWS_API } from '@/apiConfig.js';
import { getLanguageCode, translateNewsArticles, warmTranslationCache } from '@/services/libreTranslate';

interface ApiNewsItem {
  id: number;
  title: string;
  shortHeadline?: string;
  summary?: string;
  content: string;
  description?: string;
  category: string;
  location: string;
  time?: string;
  language?: string;
}

interface ApiNewsListResponse {
  data?: ApiNewsItem[];
}

export function AppWithRouting() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [showOnboarding, setShowOnboarding] = useState(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('newsrobo_onboarding_complete');
    return !hasCompletedOnboarding;
  });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All News');
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('newsrobo_language') || 'English';
  });
  const [selectedLocation, setSelectedLocation] = useState(() => {
    return localStorage.getItem('newsrobo_location') || 'Hyderabad, Telangana';
  });
  const [newsData, setNewsData] = useState<NewsArticle[]>(mockNewsData);
  const [displayNewsData, setDisplayNewsData] = useState<NewsArticle[]>(mockNewsData);
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetch(NEWS_API);
        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.status}`);
        }

        const raw = (await response.json()) as ApiNewsItem[] | ApiNewsListResponse;
        const apiNews = Array.isArray(raw) ? raw : (raw.data || []);
        const mappedNews: NewsArticle[] = apiNews.map((item, index) => ({
          id: String(item.id),
          title: item.shortHeadline || item.title,
          shortHeadline: item.shortHeadline,
          summary: item.summary,
          content: item.content || item.description || '',
          image: `https://picsum.photos/seed/news-robo-${item.id}/1080/720`,
          category: item.category || 'General',
          location: item.location || 'India',
          timestamp: item.time || 'just now',
          likes: 100 + index,
          dislikes: 5,
          comments: 10 + index,
          trustScore: 90,
          source: 'NEWS ROBO API',
          language: item.language || 'English',
          mediaType: 'image',
          isBreaking: index === 0,
          tags: item.category ? [item.category] : ['News'],
        }));

        if (mappedNews.length > 0) {
          setNewsData(mappedNews);
          setDisplayNewsData(mappedNews);
        }
      } catch {
        setNewsData(mockNewsData);
        setDisplayNewsData(mockNewsData);
      }
    };

    loadNews();
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const applyTranslations = async () => {
      const languageCode = getLanguageCode(selectedLanguage);
      if (languageCode === 'en') {
        setDisplayNewsData(newsData);
        return;
      }

      const translated = await translateNewsArticles(newsData, languageCode);
      if (!isCancelled) {
        setDisplayNewsData(
          translated.map((article) => ({
            ...article,
            language: selectedLanguage,
          }))
        );
      }
    };

    applyTranslations();

    return () => {
      isCancelled = true;
    };
  }, [newsData, selectedLanguage]);

  useEffect(() => {
    const languageCode = getLanguageCode(selectedLanguage);
    if (languageCode === 'en' || !newsData.length) {
      return;
    }

    const scheduleWarmup =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? (cb: () => void) => (window as Window & { requestIdleCallback: (fn: () => void) => number }).requestIdleCallback(cb)
        : (cb: () => void) => window.setTimeout(cb, 400);

    const cancelWarmup =
      typeof window !== 'undefined' && 'cancelIdleCallback' in window
        ? (id: number) => (window as Window & { cancelIdleCallback: (value: number) => void }).cancelIdleCallback(id)
        : (id: number) => window.clearTimeout(id);

    const handle = scheduleWarmup(() => {
      void warmTranslationCache(newsData, languageCode, 8);
    });

    return () => cancelWarmup(handle);
  }, [newsData, selectedLanguage]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Filter news based on selected category
  const filteredNews = selectedCategory === 'All News' 
    ? displayNewsData 
    : displayNewsData.filter(news => news.category === selectedCategory);

  const currentNews = filteredNews[currentIndex];

  if (filteredNews.length === 0) {
    return (
      <div className="w-full h-screen bg-[#212121] text-white flex items-center justify-center px-6 text-center">
        No news available for this category right now.
      </div>
    );
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndY.current = e.changedTouches[0].clientY;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeDistance = touchStartY.current - touchEndY.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0 && currentIndex < filteredNews.length - 1) {
        // Swipe up - next article
        setCurrentIndex(currentIndex + 1);
      } else if (swipeDistance < 0 && currentIndex > 0) {
        // Swipe down - previous article
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  // Mouse wheel support for desktop
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0 && currentIndex < filteredNews.length - 1) {
      // Scroll down - next article
      setCurrentIndex(currentIndex + 1);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      // Scroll up - previous article
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && currentIndex < filteredNews.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, filteredNews.length]);

  const handleBottomPaddingClick = () => {
    setShowCategoryMenu(true);
    
    // Clear existing timeout
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
    }
    
    // Set new timeout to hide menu after 2 seconds
    menuTimeoutRef.current = setTimeout(() => {
      setShowCategoryMenu(false);
    }, 2000);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentIndex(0); // Reset to first article when category changes
    setShowCategoryMenu(false);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    localStorage.setItem('newsrobo_language', language);
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    localStorage.setItem('newsrobo_location', location);
  };

  const handleOnboardingComplete = (location: string, language: string) => {
    // Save preferences to localStorage
    localStorage.setItem('newsrobo_onboarding_complete', 'true');
    localStorage.setItem('newsrobo_location', location);
    localStorage.setItem('newsrobo_language', language);
    
    // Update state
    setSelectedLocation(location);
    setSelectedLanguage(language);
    setShowOnboarding(false);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (menuTimeoutRef.current) {
        clearTimeout(menuTimeoutRef.current);
      }
    };
  }, []);

  // Reset index when filtered news changes
  useEffect(() => {
    if (currentIndex >= filteredNews.length) {
      setCurrentIndex(Math.max(0, filteredNews.length - 1));
    }
  }, [filteredNews.length, currentIndex]);

  // Show onboarding if user hasn't completed it
  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Don't render if not authenticated (will redirect to login)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className="w-full h-screen bg-[#212121] overflow-hidden relative select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      {/* News Flip Card */}
      <NewsFlipCard
        news={currentNews}
        currentIndex={currentIndex}
        totalArticles={filteredNews.length}
        language={selectedLanguage}
        location={selectedLocation}
        onLanguageChange={handleLanguageChange}
        onLocationChange={handleLocationChange}
      />

      {/* Bottom Padding Area (6% - Clickable for Category Menu) */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[6vh] cursor-pointer z-20"
        onClick={handleBottomPaddingClick}
      />

      {/* Category Menu Overlay */}
      <CategoryMenu 
        isVisible={showCategoryMenu}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
    </div>
  );
}