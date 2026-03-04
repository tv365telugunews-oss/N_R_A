import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface EBook {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  pages: number;
  language: string;
  category: string;
  published: boolean;
  downloads: number;
  views: number;
  uploadedAt: string;
  scheduledDate?: string;
  enableFlipBook: boolean;
}

interface EBookContextType {
  ebooks: EBook[];
  addEBook: (ebook: EBook) => void;
  updateEBook: (id: string, ebook: Partial<EBook>) => void;
  deleteEBook: (id: string) => void;
  getPublishedEBooks: () => EBook[];
}

const EBookContext = createContext<EBookContextType | undefined>(undefined);

const initialEBooks: EBook[] = [
  {
    id: '1',
    title: 'NEWS ROBO Weekly Digest - January 2026',
    description: 'Compilation of top news stories from the last week',
    coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'weekly-digest-jan-2026.pdf',
    fileSize: '12.5 MB',
    pages: 48,
    language: 'English',
    category: 'Weekly Digest',
    published: true,
    downloads: 4567,
    views: 12389,
    uploadedAt: '2026-01-25T10:00:00',
    enableFlipBook: true
  },
  {
    id: '2',
    title: 'తెలుగు వార్తా సంగ్రహం - జనవరి 2026',
    description: 'తెలుగు భాషలో ముఖ్య వార్తలు',
    coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'telugu-digest-jan-2026.pdf',
    fileSize: '15.2 MB',
    pages: 52,
    language: 'Telugu',
    category: 'Weekly Digest',
    published: true,
    downloads: 3456,
    views: 8934,
    uploadedAt: '2026-01-25T10:00:00',
    enableFlipBook: true
  },
  {
    id: '3',
    title: 'Special Report: Budget 2026 Analysis',
    description: 'In-depth analysis of Union Budget 2026',
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'budget-2026-analysis.pdf',
    fileSize: '8.9 MB',
    pages: 32,
    language: 'English',
    category: 'Special Report',
    published: false,
    downloads: 0,
    views: 0,
    uploadedAt: '2026-01-28T14:30:00',
    scheduledDate: '2026-02-05T09:00:00',
    enableFlipBook: false
  }
];

export function EBookProvider({ children }: { children: ReactNode }) {
  const [ebooks, setEbooks] = useState<EBook[]>(() => {
    // Load from localStorage if available
    const stored = localStorage.getItem('newsrobo_ebooks');
    return stored ? JSON.parse(stored) : initialEBooks;
  });

  // Persist to localStorage whenever ebooks change
  useEffect(() => {
    localStorage.setItem('newsrobo_ebooks', JSON.stringify(ebooks));
  }, [ebooks]);

  const addEBook = (ebook: EBook) => {
    setEbooks([ebook, ...ebooks]);
  };

  const updateEBook = (id: string, updates: Partial<EBook>) => {
    setEbooks(ebooks.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const deleteEBook = (id: string) => {
    setEbooks(ebooks.filter(e => e.id !== id));
  };

  const getPublishedEBooks = () => {
    return ebooks.filter(e => e.published);
  };

  return (
    <EBookContext.Provider
      value={{
        ebooks,
        addEBook,
        updateEBook,
        deleteEBook,
        getPublishedEBooks
      }}
    >
      {children}
    </EBookContext.Provider>
  );
}

export function useEBooks() {
  const context = useContext(EBookContext);
  if (!context) {
    throw new Error('useEBooks must be used within EBookProvider');
  }
  return context;
}
