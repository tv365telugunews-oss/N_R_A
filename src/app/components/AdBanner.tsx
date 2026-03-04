import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";

interface AdBannerProps {
  type: "native" | "interstitial" | "roadblock";
  onClose?: () => void;
}

export function AdBanner({ type, onClose }: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  if (type === "native") {
    return (
      <div className="relative bg-gradient-to-r from-accent/10 to-primary/10 backdrop-blur-md border border-accent/20 rounded-lg p-3 shadow-lg">
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-1 right-1 h-6 w-6"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded bg-accent/20 flex items-center justify-center">
            <span className="text-2xl">📱</span>
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-0.5">Sponsored</p>
            <p className="text-sm">NEWS ROBO Gold - Go Ad-Free! ⭐</p>
            <p className="text-xs text-muted-foreground">₹99/month only</p>
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Subscribe
          </Button>
        </div>
      </div>
    );
  }

  if (type === "interstitial") {
    return (
      <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="relative bg-card max-w-md w-full rounded-xl overflow-hidden shadow-2xl">
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 z-10 h-8 w-8 bg-white/10 hover:bg-white/20"
            onClick={handleClose}
          >
            <X className="h-5 w-5" />
          </Button>
          
          <div className="aspect-video bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <div className="text-center text-white p-6">
              <h3 className="mb-2">🎉 Special Offer!</h3>
              <p className="text-sm mb-4">Get NEWS ROBO Premium</p>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4">
                <p className="text-lg mb-1">₹99/month</p>
                <ul className="text-xs space-y-1">
                  <li>✓ Ad-Free Experience</li>
                  <li>✓ Offline Reading</li>
                  <li>✓ Premium Content</li>
                  <li>✓ Early Access to News</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="p-4 flex gap-2">
            <Button variant="outline" className="flex-1" onClick={handleClose}>
              Not Now
            </Button>
            <Button className="flex-1 bg-primary hover:bg-primary/90">
              Subscribe Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Roadblock ad (full takeover)
  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center p-4">
      <div className="text-center text-white max-w-md">
        <div className="mb-6">
          <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
            <span className="text-4xl">⭐</span>
          </div>
          <h2 className="mb-2">NEWS ROBO PREMIUM</h2>
          <p className="text-sm opacity-90 mb-6">
            Experience news like never before
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6">
          <div className="text-3xl mb-2">₹99<span className="text-sm">/month</span></div>
          <ul className="space-y-2 text-sm">
            <li>✓ Zero Advertisements</li>
            <li>✓ Unlimited Offline Reading</li>
            <li>✓ Exclusive Premium Content</li>
            <li>✓ Early Breaking News Alerts</li>
            <li>✓ Priority Customer Support</li>
          </ul>
        </div>

        <div className="space-y-2">
          <Button
            className="w-full bg-white text-primary hover:bg-white/90"
            size="lg"
          >
            Start Free Trial - 7 Days
          </Button>
          <button
            onClick={handleClose}
            className="text-sm text-white/70 hover:text-white underline"
          >
            Continue with ads
          </button>
        </div>
      </div>
    </div>
  );
}
