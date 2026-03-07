import { useState } from 'react';

interface NewsRoboLogoProps {
  className?: string;
}

export function NewsRoboLogoEnhanced({ className = "h-14 w-14" }: NewsRoboLogoProps) {
  const [imageError, setImageError] = useState(false);

  // Fallback SVG logo inline
  const FallbackSVG = () => (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Red circular background */}
      <circle cx="100" cy="100" r="95" fill="#D32F2F" />
      
      {/* White text NEWS */}
      <text
        x="100"
        y="90"
        fontFamily="Arial, sans-serif"
        fontSize="40"
        fontWeight="bold"
        fill="#FFFFFF"
        textAnchor="middle"
      >
        NEWS
      </text>
      
      {/* Blue text ROBO */}
      <text
        x="100"
        y="130"
        fontFamily="Arial, sans-serif"
        fontSize="40"
        fontWeight="bold"
        fill="#2196F3"
        textAnchor="middle"
      >
        ROBO
      </text>
    </svg>
  );

  // Try to load from public folder first, then figma asset
  const logoSources = [
    '/logo.png',
    '/logo.svg',
  ];

  if (imageError) {
    return <FallbackSVG />;
  }

  return (
    <img
      src={logoSources[0]}
      alt="News Robo Logo"
      className={className}
      style={{ objectFit: 'contain' }}
      onError={() => {
        // Try next source or show fallback
        setImageError(true);
      }}
    />
  );
}
