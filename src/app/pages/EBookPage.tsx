import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Download, Share2, BookOpen, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, FileText, BookMarked } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { toast } from 'sonner';
import { useEBooks, EBook } from '@/app/contexts/EBookContext';

export default function EBookPage() {
  const navigate = useNavigate();
  const { getPublishedEBooks, updateEBook } = useEBooks();
  const publishedEBooks = getPublishedEBooks();
  const [selectedEbook, setSelectedEbook] = useState<EBook | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [viewMode, setViewMode] = useState<'flipbook' | 'pdf'>('flipbook');
  const [isPageTurning, setIsPageTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState<'left' | 'right' | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Touch gesture state for pinch-to-zoom
  const [touchDistance, setTouchDistance] = useState<number | null>(null);
  const [initialZoom, setInitialZoom] = useState(100);

  const handleEbookSelect = (ebook: EBook) => {
    setSelectedEbook(ebook);
    setCurrentPage(1);
    setZoom(100);
    setViewMode(ebook.enableFlipBook ? 'flipbook' : 'pdf');
    // Increment views
    updateEBook(ebook.id, { views: ebook.views + 1 });
  };

  const handleDownload = () => {
    if (selectedEbook) {
      toast.success(`Downloading ${selectedEbook.fileName}...`);
      // In production, trigger actual download
      const link = document.createElement('a');
      link.href = selectedEbook.fileUrl;
      link.download = selectedEbook.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = () => {
    if (selectedEbook) {
      toast.success('Share link copied to clipboard!');
      // In production, implement actual sharing
    }
  };

  const handleNextPage = () => {
    if (selectedEbook && currentPage < selectedEbook.pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 25, 50));
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      const x1 = e.touches[0].clientX;
      const y1 = e.touches[0].clientY;
      const x2 = e.touches[1].clientX;
      const y2 = e.touches[1].clientY;
      const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      setTouchDistance(distance);
      setInitialZoom(zoom);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && touchDistance !== null) {
      const x1 = e.touches[0].clientX;
      const y1 = e.touches[0].clientY;
      const x2 = e.touches[1].clientX;
      const y2 = e.touches[1].clientY;
      const currentDistance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      const delta = currentDistance - touchDistance;
      setZoom(Math.min(Math.max(initialZoom + delta, 50), 200));
    }
  };

  const handleTouchEnd = () => {
    setTouchDistance(null);
    setInitialZoom(100);
  };

  const handlePageTurn = (direction: 'left' | 'right') => {
    if (selectedEbook) {
      setIsPageTurning(true);
      setTurnDirection(direction);
      setTimeout(() => {
        if (direction === 'left') {
          handlePrevPage();
        } else if (direction === 'right') {
          handleNextPage();
        }
        setIsPageTurning(false);
        setTurnDirection(null);
      }, 500);
    }
  };

  useEffect(() => {
    const currentRef = viewerRef.current;
    if (currentRef) {
      currentRef.addEventListener('touchstart', handleTouchStart);
      currentRef.addEventListener('touchmove', handleTouchMove);
      currentRef.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('touchstart', handleTouchStart);
        currentRef.removeEventListener('touchmove', handleTouchMove);
        currentRef.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [touchDistance, initialZoom]);

  if (selectedEbook) {
    return (
      <div className="fixed inset-0 bg-[#212121] flex flex-col">
        {/* Full Screen Viewer */}
        <div className="flex-1 relative overflow-hidden">
          {viewMode === 'flipbook' ? (
            // Flip Book View - Full Screen
            <div 
              ref={viewerRef}
              className="w-full h-full relative flex items-center justify-center bg-[#1a1a1a]"
            >
              {/* E-Book Content */}
              <div 
                className="relative bg-white shadow-2xl transition-transform duration-500"
                style={{
                  width: `${zoom}%`,
                  height: `90%`,
                  transform: isPageTurning 
                    ? turnDirection === 'left' 
                      ? 'rotateY(-15deg)' 
                      : 'rotateY(15deg)' 
                    : 'rotateY(0deg)',
                  transformOrigin: turnDirection === 'left' ? 'right center' : 'left center',
                }}
              >
                {/* Page Content */}
                <div className="w-full h-full flex items-center justify-center overflow-auto p-8">
                  {selectedEbook.fileUrl.endsWith('.pdf') ? (
                    <iframe
                      ref={iframeRef}
                      src={`${selectedEbook.fileUrl}#page=${currentPage}&toolbar=0&navpanes=0`}
                      className="w-full h-full border-none"
                      title={`${selectedEbook.title} - Page ${currentPage}`}
                    />
                  ) : (
                    <div className="text-center">
                      <FileText className="w-20 h-20 mx-auto mb-4 text-gray-300" />
                      <p className="text-gray-600">Page {currentPage}</p>
                      <p className="text-sm text-gray-400 mt-2">{selectedEbook.title}</p>
                    </div>
                  )}
                </div>

                {/* Page Number Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#D32F2F] px-4 py-1 rounded-full">
                  <span className="text-white text-sm font-medium">
                    {currentPage} / {selectedEbook.pages}
                  </span>
                </div>
              </div>

              {/* Left/Right Touch Areas for Page Turn */}
              <div 
                className="absolute left-0 top-0 bottom-20 w-1/4 cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => handlePageTurn('left')}
              />
              <div 
                className="absolute right-0 top-0 bottom-20 w-1/4 cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => handlePageTurn('right')}
              />
            </div>
          ) : (
            // PDF View - Full Screen
            <div className="w-full h-full bg-gray-900 overflow-auto">
              <div 
                ref={pdfContainerRef}
                className="flex items-center justify-center min-h-full p-4"
                style={{ zoom: `${zoom}%` }}
              >
                <iframe
                  src={selectedEbook.fileUrl}
                  className="w-full h-screen border-none rounded-lg shadow-2xl"
                  title={selectedEbook.title}
                />
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation Bar - Fixed at Bottom */}
        <div className="bg-[#1E1E1E] border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4 py-3">
            {/* Main Controls Row */}
            <div className="flex items-center justify-between mb-2">
              {/* Back Button */}
              <Button
                onClick={() => {
                  setSelectedEbook(null);
                  setCurrentPage(1);
                  setZoom(100);
                }}
                variant="outline"
                size="sm"
                className="gap-2 bg-[#212121] border-gray-600 text-white hover:bg-[#2a2a2a]"
              >
                <ArrowLeft size={16} />
                Library
              </Button>

              {/* Page Navigation */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => handlePageTurn('left')}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                  className="bg-[#212121] border-gray-600 text-white hover:bg-[#2a2a2a] disabled:opacity-30"
                >
                  <ChevronLeft size={18} />
                </Button>
                
                <span className="text-white text-sm font-medium px-3 py-1 bg-[#D32F2F] rounded-full">
                  {currentPage} / {selectedEbook.pages}
                </span>

                <Button
                  onClick={() => handlePageTurn('right')}
                  disabled={currentPage === selectedEbook.pages}
                  variant="outline"
                  size="sm"
                  className="bg-[#212121] border-gray-600 text-white hover:bg-[#2a2a2a] disabled:opacity-30"
                >
                  <ChevronRight size={18} />
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button 
                  onClick={handleZoomOut}
                  variant="outline" 
                  size="sm"
                  className="bg-[#212121] border-gray-600 text-white hover:bg-[#2a2a2a]"
                >
                  <ZoomOut size={16} />
                </Button>
                <span className="text-white text-xs px-2">{zoom}%</span>
                <Button 
                  onClick={handleZoomIn}
                  variant="outline" 
                  size="sm"
                  className="bg-[#212121] border-gray-600 text-white hover:bg-[#2a2a2a]"
                >
                  <ZoomIn size={16} />
                </Button>
                
                <Button 
                  onClick={handleShare} 
                  variant="outline" 
                  size="sm"
                  className="bg-[#212121] border-gray-600 text-white hover:bg-[#2a2a2a]"
                >
                  <Share2 size={16} />
                </Button>
                
                <Button 
                  onClick={handleDownload} 
                  className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white" 
                  size="sm"
                >
                  <Download size={16} />
                </Button>
              </div>
            </div>

            {/* Book Info Row */}
            <div className="text-center">
              <h2 className="text-white text-sm font-semibold truncate max-w-xl mx-auto">
                {selectedEbook.title}
              </h2>
              <p className="text-gray-400 text-xs">
                {selectedEbook.category} • {selectedEbook.language}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // E-Book Library View
  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-[#121212] pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-[#1E1E1E] shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate('/home')}
                variant="outline"
                size="sm"
              >
                <ArrowLeft size={18} className="mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-[#212121] dark:text-white">
                  E-Book Library
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Digital publications and magazines
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* E-Books Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedEBooks.map((ebook) => (
            <Card
              key={ebook.id}
              className="bg-white dark:bg-[#1E1E1E] border-none shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
              onClick={() => handleEbookSelect(ebook)}
            >
              {/* Cover Image */}
              <div className="relative h-80 bg-gray-200">
                <img
                  src={ebook.coverImage}
                  alt={ebook.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {ebook.enableFlipBook && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <BookOpen size={14} />
                    FLIP BOOK
                  </div>
                )}
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                  <span className="px-2 py-1 bg-[#D32F2F] text-white text-xs font-medium rounded">
                    {ebook.language}
                  </span>
                  <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded">
                    {ebook.pages} pages
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-[#212121] dark:text-white line-clamp-2 mb-2">
                  {ebook.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                  {ebook.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{ebook.fileSize}</span>
                  <span>{ebook.category}</span>
                </div>

                <Button className="w-full bg-[#D32F2F] hover:bg-[#B71C1C] text-white">
                  <BookOpen size={18} className="mr-2" />
                  Read Now
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {publishedEBooks.length === 0 && (
          <div className="text-center py-20">
            <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-[#212121] dark:text-white mb-2">
              No E-Books Available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Check back later for new publications
            </p>
          </div>
        )}
      </div>
    </div>
  );
}