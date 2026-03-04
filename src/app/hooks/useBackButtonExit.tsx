import { useEffect, useRef } from 'react';
import { App } from '@capacitor/app';
import { toast } from 'sonner';

/**
 * Custom hook to handle double back press to exit app
 * Shows a toast on first press, exits on second press within 2 seconds
 */
export function useBackButtonExit() {
  const lastBackPress = useRef<number>(0);
  const EXIT_DELAY = 2000; // 2 seconds

  useEffect(() => {
    const handleBackButton = App.addListener('backButton', ({ canGoBack }) => {
      // If we can go back in browser history, do that
      if (canGoBack) {
        window.history.back();
        return;
      }

      // Otherwise, handle double back press to exit
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - lastBackPress.current;

      if (timeDifference < EXIT_DELAY) {
        // Second press within 2 seconds - exit the app
        App.exitApp();
      } else {
        // First press - show toast message
        lastBackPress.current = currentTime;
        toast.info('Press back again to exit', {
          duration: 2000,
          position: 'bottom-center',
        });
      }
    });

    return () => {
      handleBackButton.remove();
    };
  }, []);
}
