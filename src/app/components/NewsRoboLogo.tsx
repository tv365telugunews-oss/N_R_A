import logoImage from '../../assets/logo.png';

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