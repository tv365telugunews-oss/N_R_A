import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp } from "lucide-react";

export function SwipeHint() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasSeenHint = localStorage.getItem("newsrobo_swipe_hint_seen");
    if (hasSeenHint) {
      setIsVisible(false);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
        localStorage.setItem("newsrobo_swipe_hint_seen", "true");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-24 z-30 pointer-events-none"
        >
          <div className="bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
            <ChevronUp className="h-4 w-4 animate-bounce" />
            <span className="text-sm">Swipe up for next story</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
