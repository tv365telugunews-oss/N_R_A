import { ExternalLink, X } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface FullScreenAdProps {
  adContent: {
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    advertiser: string;
  };
  image: string;
  onSkip?: () => void;
}

export function FullScreenAd({ adContent, image, onSkip }: FullScreenAdProps) {
  const handleCTAClick = () => {
    window.open(adContent.ctaLink, '_blank');
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#212121] to-[#000000]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={image}
          alt={adContent.title}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* Skip Button */}
      {onSkip && (
        <button
          onClick={onSkip}
          className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-all z-20"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      )}

      {/* Ad Badge */}
      <div className="absolute top-4 left-4 bg-[#FFC107] px-3 py-1 rounded-full z-20">
        <span className="text-[#212121] text-xs font-bold">SPONSORED</span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        {/* Advertiser */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm" />
          <span className="text-white/80 text-sm font-medium">
            {adContent.advertiser}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-white text-3xl font-bold mb-3 leading-tight">
          {adContent.title}
        </h2>

        {/* Description */}
        <p className="text-white/90 text-base mb-6 leading-relaxed">
          {adContent.description}
        </p>

        {/* CTA Button */}
        <button
          onClick={handleCTAClick}
          className="w-full bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-lg"
        >
          <span>{adContent.ctaText}</span>
          <ExternalLink className="w-5 h-5" />
        </button>

        {/* Privacy Notice */}
        <p className="text-white/50 text-xs text-center mt-4">
          Private Ad Space • Swipe up to continue reading news
        </p>
      </div>
    </div>
  );
}
