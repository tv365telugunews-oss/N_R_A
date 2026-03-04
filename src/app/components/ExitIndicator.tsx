import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ExitIndicatorProps {
  show: boolean;
}

/**
 * Visual indicator shown when user presses back button once
 * Reminds them to press again to exit
 */
export function ExitIndicator({ show }: ExitIndicatorProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[500] pointer-events-none"
        >
          <div className="bg-[#212121] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
            <X className="h-5 w-5 text-[#D32F2F]" />
            <span className="text-sm font-medium">Press back again to exit</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
