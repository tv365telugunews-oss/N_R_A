// PRODUCTION VERSION - Use this after saving logo to public/logo.png
// Copy this to NewsRoboLogo.tsx before building APK

import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function NewsRoboLogo({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <ImageWithFallback 
      src="/logo.png"
      alt="News Robo Logo - Cute Robot with Newspaper" 
      className={className}
      style={{
        objectFit: 'contain',
      }}
    />
  );
}