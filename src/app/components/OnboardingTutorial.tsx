import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp, ChevronDown, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface OnboardingTutorialProps {
  onComplete: () => void;
}

export function OnboardingTutorial({ onComplete }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const steps = [
    {
      title: "Welcome to NEWS ROBO! 🤖",
      description: "Get hyperlocal news in your language, tailored just for you.",
      icon: "📰",
    },
    {
      title: "Swipe to Read",
      description: "Swipe up for next article, swipe down for previous",
      icon: <div className="flex flex-col items-center gap-2">
        <ChevronUp className="h-8 w-8 animate-bounce" />
        <ChevronDown className="h-8 w-8 animate-bounce delay-150" />
      </div>,
    },
    {
      title: "Personalize Your Feed",
      description: "Select your location and language preferences to get relevant news",
      icon: "📍",
    },
    {
      title: "Become a Reporter",
      description: "Report local news from your area and build your trust score",
      icon: "📸",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
      localStorage.setItem("newsrobo_onboarding_completed", "true");
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center p-6"
    >
      <button
        onClick={handleComplete}
        className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-md transition-colors"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="max-w-md w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center text-white"
          >
            <div className="mb-6 text-6xl">
              {typeof steps[currentStep].icon === 'string' 
                ? steps[currentStep].icon 
                : steps[currentStep].icon}
            </div>
            <h2 className="mb-3 text-white">{steps[currentStep].title}</h2>
            <p className="text-white/90 mb-8 leading-relaxed">
              {steps[currentStep].description}
            </p>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentStep
                      ? "w-8 bg-white"
                      : "w-2 bg-white/30"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white border-white/30"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Back
                </Button>
              )}
              <Button
                className="flex-1 bg-white text-primary hover:bg-white/90"
                onClick={handleNext}
              >
                {currentStep === steps.length - 1 ? "Get Started" : "Next"}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
