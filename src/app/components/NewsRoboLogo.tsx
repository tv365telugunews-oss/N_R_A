export function NewsRoboLogo({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <img 
      src="/logo.png"
      alt="News Robo Logo - Cute Robot with Newspaper" 
      className={className}
      style={{
        objectFit: 'contain',
      }}
    />
  );
}