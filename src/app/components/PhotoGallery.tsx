import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface PhotoGalleryProps {
  photos: string[];
  className?: string;
}

export function PhotoGallery({ photos, className = '' }: PhotoGalleryProps) {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0 && currentPhoto < photos.length - 1) {
        // Swipe left - next photo
        setCurrentPhoto(currentPhoto + 1);
      } else if (swipeDistance < 0 && currentPhoto > 0) {
        // Swipe right - previous photo
        setCurrentPhoto(currentPhoto - 1);
      }
    }
  };

  const goToNext = () => {
    if (currentPhoto < photos.length - 1) {
      setCurrentPhoto(currentPhoto + 1);
    }
  };

  const goToPrevious = () => {
    if (currentPhoto > 0) {
      setCurrentPhoto(currentPhoto - 1);
    }
  };

  return (
    <div 
      className={`relative w-full h-full overflow-hidden ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main Photo */}
      <div className="relative w-full h-full">
        <ImageWithFallback
          src={photos[currentPhoto]}
          alt={`Photo ${currentPhoto + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Navigation Arrows */}
        {currentPhoto > 0 && (
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-sm p-3 rounded-full hover:bg-black/80 transition-all hover:scale-110 z-10"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        )}

        {currentPhoto < photos.length - 1 && (
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-sm p-3 rounded-full hover:bg-black/80 transition-all hover:scale-110 z-10"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        )}

        {/* Photo Counter */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
          <span className="text-white text-sm font-medium">
            {currentPhoto + 1} / {photos.length}
          </span>
        </div>

        {/* Progress Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPhoto(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentPhoto 
                  ? 'w-8 bg-[#D32F2F]' 
                  : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
