// Bookmark Manager - handles saving/retrieving bookmarks from localStorage

export interface BookmarkedArticle {
  id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  timestamp: string;
  bookmarkedAt: string;
}

const BOOKMARKS_KEY = 'newsrobo_bookmarks';

export const bookmarkManager = {
  // Get all bookmarks
  getAll: (): BookmarkedArticle[] => {
    try {
      const bookmarks = localStorage.getItem(BOOKMARKS_KEY);
      return bookmarks ? JSON.parse(bookmarks) : [];
    } catch (error) {
      console.error('Error reading bookmarks:', error);
      return [];
    }
  },

  // Check if article is bookmarked
  isBookmarked: (articleId: string): boolean => {
    const bookmarks = bookmarkManager.getAll();
    return bookmarks.some(b => b.id === articleId);
  },

  // Add bookmark
  add: (article: Omit<BookmarkedArticle, 'bookmarkedAt'>): boolean => {
    try {
      const bookmarks = bookmarkManager.getAll();
      
      // Check if already bookmarked
      if (bookmarks.some(b => b.id === article.id)) {
        return false;
      }

      const newBookmark: BookmarkedArticle = {
        ...article,
        bookmarkedAt: new Date().toISOString()
      };

      bookmarks.unshift(newBookmark); // Add to beginning
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
      return true;
    } catch (error) {
      console.error('Error adding bookmark:', error);
      return false;
    }
  },

  // Remove bookmark
  remove: (articleId: string): boolean => {
    try {
      const bookmarks = bookmarkManager.getAll();
      const filtered = bookmarks.filter(b => b.id !== articleId);
      
      if (filtered.length === bookmarks.length) {
        return false; // Bookmark not found
      }

      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error removing bookmark:', error);
      return false;
    }
  },

  // Toggle bookmark
  toggle: (article: Omit<BookmarkedArticle, 'bookmarkedAt'>): boolean => {
    const isCurrentlyBookmarked = bookmarkManager.isBookmarked(article.id);
    
    if (isCurrentlyBookmarked) {
      bookmarkManager.remove(article.id);
      return false; // Removed
    } else {
      bookmarkManager.add(article);
      return true; // Added
    }
  },

  // Clear all bookmarks
  clearAll: (): void => {
    localStorage.removeItem(BOOKMARKS_KEY);
  },

  // Get bookmarks count
  getCount: (): number => {
    return bookmarkManager.getAll().length;
  }
};
