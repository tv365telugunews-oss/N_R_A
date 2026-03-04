import logoImage from "figma:asset/60cc8bb3430c288a3c24a1e0b39148e381fa1981.png";

export function NewsRoboLogo({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <img 
      src={logoImage}
      alt="News Robo Logo - Cute Robot with Newspaper" 
      className={className}
      style={{
        objectFit: 'contain',
      }}
    />
  );
}