import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Bookmark, Trash2, Calendar } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { bookmarkManager, BookmarkedArticle } from '@/app/utils/bookmarkManager';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export default function BookmarksPage() {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState<BookmarkedArticle[]>([]);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = () => {
    setBookmarks(bookmarkManager.getAll());
  };

  const handleRemove = (articleId: string) => {
    bookmarkManager.remove(articleId);
    loadBookmarks();
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to remove all bookmarks?')) {
      bookmarkManager.clearAll();
      loadBookmarks();
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-[#121212]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] text-white px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-xl font-bold">Bookmarks</h1>
              <p className="text-sm text-white/80">{bookmarks.length} saved articles</p>
            </div>
          </div>
          {bookmarks.length > 0 && (
            <Button
              onClick={handleClearAll}
              variant="outline"
              size="sm"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        {bookmarks.length === 0 ? (
          <Card className="p-12 text-center bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
            <Bookmark size={64} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
            <h3 className="text-xl font-bold text-[#212121] dark:text-white mb-2">No bookmarks yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start saving articles you want to read later
            </p>
            <Button
              onClick={() => navigate('/')}
              className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white"
            >
              Explore News
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookmarks.map((article) => (
              <Card key={article.id} className="bg-white dark:bg-[#1E1E1E] border-none shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="flex gap-4 p-4">
                  {/* Image */}
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                    <ImageWithFallback
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <span className="inline-block px-2 py-1 text-xs font-bold text-white bg-[#D32F2F] rounded mb-2">
                          {article.category}
                        </span>
                        <h3 className="font-bold text-[#212121] dark:text-white line-clamp-2 mb-1">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {article.content}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <Calendar size={12} />
                        <span>
                          Saved {new Date(article.bookmarkedAt).toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemove(article.id)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors group"
                        title="Remove bookmark"
                      >
                        <Trash2 size={16} className="text-gray-400 group-hover:text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}