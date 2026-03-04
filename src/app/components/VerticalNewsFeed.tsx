import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { Heart, Share2, Bookmark, Eye, ChevronUp, ChevronDown } from 'lucide-react';
import { NewsRoboLogo } from '@/app/components/NewsRoboLogo';

interface NewsCard {
  id: string;
  title: string;
  summary: string;
  category: string;
  location: string;
  timeAgo: string;
  views: number;
  image?: string;
  trustScore: number;
}

const mockNews: NewsCard[] = [
  {
    id: '1',
    title: 'New Metro Line Opens in Hyderabad',
    summary: 'The much-awaited metro line connecting Ameerpet to LB Nagar is now operational, reducing travel time significantly for daily commuters.',
    category: 'Local News',
    location: 'Hyderabad, Telangana',
    timeAgo: '2h ago',
    views: 12450,
    trustScore: 95
  },
  {
    id: '2',
    title: 'Indian Startup Raises $150M in Series C',
    summary: 'Bengaluru-based fintech startup secures major funding round led by international investors, marking one of the biggest deals this year.',
    category: 'Business',
    location: 'Bengaluru, Karnataka',
    timeAgo: '4h ago',
    views: 8920,
    trustScore: 92
  },
  {
    id: '3',
    title: 'Heavy Rainfall Expected in Coastal Areas',
    summary: 'IMD issues orange alert for coastal Karnataka and Kerala. Residents advised to stay indoors and avoid travel unless necessary.',
    category: 'Weather',
    location: 'Mangaluru, Karnataka',
    timeAgo: '1h ago',
    views: 15670,
    trustScore: 98
  },
  {
    id: '4',
    title: 'New Education Policy Implementation Begins',
    summary: 'Schools across Maharashtra start implementing the National Education Policy 2020 with focus on multilingual education and skill development.',
    category: 'Education',
    location: 'Mumbai, Maharashtra',
    timeAgo: '3h ago',
    views: 6780,
    trustScore: 90
  },
  {
    id: '5',
    title: 'Tech Giant Announces New AI Features',
    summary: 'Revolutionary AI-powered tools to transform how we interact with technology in everyday life.',
    category: 'Technology',
    location: 'Bengaluru, Karnataka',
    timeAgo: '5h ago',
    views: 9234,
    trustScore: 88
  }
];

export function VerticalNewsFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Way2News-style smooth vertical slide variants
  const slideVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? '100%' : '-100%',
      opacity: 0.3,
      scale: 0.92,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        y: {
          type: 'spring',
          stiffness: 400,
          damping: 40,
          mass: 0.8,
        },
        opacity: {
          duration: 0.25,
          ease: 'easeOut'
        },
        scale: {
          duration: 0.3,
          ease: [0.34, 1.56, 0.64, 1] // Custom bounce easing
        }
      }
    },
    exit: (direction: number) => ({
      y: direction > 0 ? '-100%' : '100%',
      opacity: 0.3,
      scale: 0.92,
      transition: {
        y: {
          type: 'spring',
          stiffness: 400,
          damping: 40,
          mass: 0.8,
        },
        opacity: {
          duration: 0.2,
          ease: 'easeIn'
        },
        scale: {
          duration: 0.25,
          ease: 'easeInOut'
        }
      }
    })
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 30;
    const swipeVelocity = 300;

    if (Math.abs(info.offset.y) > swipeThreshold || Math.abs(info.velocity.y) > swipeVelocity) {
      if (info.offset.y < 0 && currentIndex < mockNews.length - 1) {
        // Swipe up - next card
        setDirection(1);
        setCurrentIndex(currentIndex + 1);
      } else if (info.offset.y > 0 && currentIndex > 0) {
        // Swipe down - previous card
        setDirection(-1);
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const goNext = () => {
    if (currentIndex < mockNews.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrevious = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        goPrevious();
      } else if (e.key === 'ArrowDown') {
        goNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const currentNews = mockNews[currentIndex];

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-white overflow-hidden select-none"
    >
      {/* Header - Fixed at top */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/40 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <NewsRoboLogo className="h-8 w-8" />
            <span className="text-white font-bold text-lg drop-shadow-lg">NEWS ROBO</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
              <span className="text-white text-sm font-medium">{currentNews.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* News Card Container with Way2News-style transition */}
      <div className="relative w-full h-full bg-white">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentNews.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 flex flex-col bg-white"
            style={{
              transformOrigin: 'center center'
            }}
          >
            {/* Full Screen News Card */}
            <div className="flex-1 flex flex-col bg-white">
              {/* Content Area */}
              <div className="flex-1 flex flex-col justify-center px-6 py-20">
                {/* Category & Trust Score */}
                <motion.div 
                  className="flex items-center gap-3 mb-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <span className="bg-[#D32F2F] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {currentNews.category}
                  </span>
                  <div className="flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full">
                    <span className="text-green-700 text-sm font-medium">✓ {currentNews.trustScore}%</span>
                  </div>
                </motion.div>

                {/* Title with staggered animation */}
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold text-[#212121] leading-tight mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4, ease: 'easeOut' }}
                >
                  {currentNews.title}
                </motion.h1>

                {/* Summary */}
                <motion.p 
                  className="text-xl text-gray-700 leading-relaxed mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
                >
                  {currentNews.summary}
                </motion.p>

                {/* Meta Info */}
                <motion.div 
                  className="flex items-center gap-4 text-gray-500 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                >
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {currentNews.views.toLocaleString()}
                  </span>
                  <span>•</span>
                  <span>{currentNews.timeAgo}</span>
                </motion.div>
              </div>

              {/* Bottom Action Bar */}
              <motion.div 
                className="bg-[#212121] text-white px-6 py-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <div className="flex items-center justify-around max-w-md mx-auto">
                  <button className="flex flex-col items-center gap-1 hover:scale-110 transition-transform active:scale-95">
                    <Heart className="h-6 w-6" />
                    <span className="text-xs">Like</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 hover:scale-110 transition-transform active:scale-95">
                    <Share2 className="h-6 w-6" />
                    <span className="text-xs">Share</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 hover:scale-110 transition-transform active:scale-95">
                    <Bookmark className="h-6 w-6" />
                    <span className="text-xs">Save</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Hints */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
        {currentIndex > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={goPrevious}
            className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors active:scale-95"
          >
            <ChevronUp className="h-6 w-6 text-[#D32F2F]" />
          </motion.button>
        )}
        {currentIndex < mockNews.length - 1 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={goNext}
            className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors active:scale-95"
          >
            <ChevronDown className="h-6 w-6 text-[#D32F2F]" />
          </motion.button>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20">
        <div className="flex gap-1.5">
          {mockNews.map((_, index) => (
            <motion.div
              key={index}
              className="h-1 rounded-full"
              initial={false}
              animate={{
                width: index === currentIndex ? 32 : 4,
                backgroundColor: index === currentIndex ? '#D32F2F' : '#D1D5DB'
              }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>

      {/* Swipe Hint - Show on first card */}
      {currentIndex === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            y: [10, 0, -5, -10]
          }}
          transition={{ 
            duration: 2.5,
            times: [0, 0.2, 0.8, 1],
            repeat: 2,
            repeatDelay: 1
          }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
            <ChevronUp className="h-4 w-4 animate-bounce" />
            Swipe up for next story
            <ChevronDown className="h-4 w-4" />
          </div>
        </motion.div>
      )}
    </div>
  );
}