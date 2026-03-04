import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useNavigate } from "react-router";

interface PageNavigationProps {
  showBack?: boolean;
  showHome?: boolean;
  onBack?: () => void;
  backLabel?: string;
  className?: string;
}

export function PageNavigation({
  showBack = true,
  showHome = true,
  onBack,
  backLabel = "Back",
  className = ""
}: PageNavigationProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showBack && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">{backLabel}</span>
        </Button>
      )}
      
      {showHome && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleHome}
          className="gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white"
        >
          <Home className="h-4 w-4" />
          <span className="hidden sm:inline">Home</span>
        </Button>
      )}
    </div>
  );
}