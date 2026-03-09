import { useState } from 'react';
import logoImage from '../../assets/logo.png';

interface NewsRoboLogoProps {
  className?: string;
}

export function NewsRoboLogo({ className = "h-14 w-14" }: NewsRoboLogoProps) {
  const [imageError, setImageError] = useState(false);

  // Inline SVG fallback - Robot with newspaper logo (as backup)
  const FallbackSVG = () => (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ objectFit: 'contain' }}
    >
      {/* Red circular background */}
      <circle cx="100" cy="100" r="98" fill="#E51C23"/>
      
      {/* Shadow under robot */}
      <ellipse cx="100" cy="165" rx="50" ry="10" fill="#000000" opacity="0.2"/>
      
      {/* Robot Body - Main torso */}
      <rect x="65" y="95" width="70" height="50" rx="8" fill="#6B7280" stroke="#4B5563" strokeWidth="2"/>
      
      {/* Robot Head */}
      <rect x="72" y="40" width="56" height="50" rx="8" fill="#6B7280" stroke="#4B5563" strokeWidth="2"/>
      
      {/* Antenna */}
      <line x1="100" y1="40" x2="100" y2="25" stroke="#4B5563" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="100" cy="22" r="5" fill="#FFC107"/>
      
      {/* Robot Face - Eyes */}
      <ellipse cx="85" cy="60" rx="10" ry="12" fill="#FFFFFF"/>
      <ellipse cx="115" cy="60" rx="10" ry="12" fill="#FFFFFF"/>
      <circle cx="85" cy="62" r="5" fill="#212121"/>
      <circle cx="115" cy="62" r="5" fill="#212121"/>
      
      {/* Eye highlights */}
      <circle cx="87" cy="59" r="2" fill="#FFFFFF"/>
      <circle cx="117" cy="59" r="2" fill="#FFFFFF"/>
      
      {/* Mouth area */}
      <rect x="85" y="75" width="30" height="8" rx="4" fill="#212121"/>
      <line x1="92" y1="75" x2="92" y2="83" stroke="#4B5563" strokeWidth="1"/>
      <line x1="100" y1="75" x2="100" y2="83" stroke="#4B5563" strokeWidth="1"/>
      <line x1="108" y1="75" x2="108" y2="83" stroke="#4B5563" strokeWidth="1"/>
      
      {/* Robot Arms */}
      <rect x="50" y="95" width="15" height="35" rx="7" fill="#9CA3AF" stroke="#4B5563" strokeWidth="2"/>
      <circle cx="57" cy="95" r="6" fill="#6B7280" stroke="#4B5563" strokeWidth="2"/>
      <rect x="135" y="95" width="15" height="35" rx="7" fill="#9CA3AF" stroke="#4B5563" strokeWidth="2"/>
      <circle cx="143" cy="95" r="6" fill="#6B7280" stroke="#4B5563" strokeWidth="2"/>
      
      {/* Chest panel */}
      <rect x="78" y="105" width="44" height="30" rx="4" fill="#9CA3AF"/>
      <circle cx="90" cy="115" r="3" fill="#4ADE80"/>
      <circle cx="100" cy="115" r="3" fill="#FFC107"/>
      <circle cx="110" cy="115" r="3" fill="#EF4444"/>
      <line x1="100" y1="125" x2="100" y2="135" stroke="#4B5563" strokeWidth="2"/>
      
      {/* Newspaper held by robot */}
      <g transform="translate(70, 115)">
        <rect x="0" y="0" width="60" height="45" rx="2" fill="#FFFFFF" stroke="#212121" strokeWidth="1.5"/>
        <line x1="30" y1="0" x2="30" y2="45" stroke="#D1D5DB" strokeWidth="1"/>
        
        {/* Left page */}
        <rect x="3" y="3" width="24" height="18" fill="#EF4444"/>
        <text x="15" y="14" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">N</text>
        
        {/* Right page - "NR" */}
        <text x="42" y="14" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#E51C23" textAnchor="middle">NR</text>
        
        {/* Text lines */}
        <line x1="3" y1="24" x2="27" y2="24" stroke="#9CA3AF" strokeWidth="1"/>
        <line x1="3" y1="28" x2="27" y2="28" stroke="#9CA3AF" strokeWidth="1"/>
        <line x1="3" y1="32" x2="24" y2="32" stroke="#9CA3AF" strokeWidth="1"/>
        <line x1="3" y1="36" x2="27" y2="36" stroke="#9CA3AF" strokeWidth="1"/>
        <line x1="3" y1="40" x2="20" y2="40" stroke="#9CA3AF" strokeWidth="1"/>
        <line x1="33" y1="20" x2="57" y2="20" stroke="#9CA3AF" strokeWidth="1"/>
        <line x1="33" y1="24" x2="57" y2="24" stroke="#9CA3AF" strokeWidth="1"/>
        <line x1="33" y1="28" x2="54" y2="28" stroke="#9CA3AF" strokeWidth="1"/>
        <line x1="33" y1="32" x2="57" y2="32" stroke="#9CA3AF" strokeWidth="1"/>
        <line x1="33" y1="36" x2="57" y2="36" stroke="#9CA3AF" strokeWidth="1"/>
        <line x1="33" y1="40" x2="50" y2="40" stroke="#9CA3AF" strokeWidth="1"/>
      </g>
      
      {/* Robot hands */}
      <circle cx="65" cy="130" r="8" fill="#9CA3AF" stroke="#4B5563" strokeWidth="2"/>
      <circle cx="135" cy="130" r="8" fill="#9CA3AF" stroke="#4B5563" strokeWidth="2"/>
    </svg>
  );

  // If image failed to load, show SVG fallback
  if (imageError) {
    return <FallbackSVG />;
  }

  // Use the new uploaded logo image with fallback to inline SVG
  return (
    <img
      src={logoImage}
      alt="News Robo - Cute Robot with Newspaper"
      className={className}
      style={{ objectFit: 'contain' }}
      onError={() => setImageError(true)}
    />
  );
}

