# 🚪 Double Back Press to Exit Feature

## Overview
The NEWS ROBO app now includes a native Android-style **double back press to exit** functionality. This prevents accidental app exits and provides a better user experience.

## How It Works

### User Experience Flow:
1. **First Back Press**: User presses the Android back button
   - Shows toast notification: "Press back again to exit"
   - Starts a 2-second timer
   
2. **Second Back Press (within 2 seconds)**: User presses back again
   - App exits immediately
   
3. **Timeout**: If user doesn't press back within 2 seconds
   - Timer resets
   - User needs to press back twice again to exit

### Navigation Behavior:
- **When in-app navigation available**: Back button navigates to previous page
- **When at root page**: Back button triggers exit confirmation

## Implementation Details

### Files Created:
1. **`/src/app/hooks/useBackButtonExit.tsx`**
   - Custom React hook
   - Integrates with Capacitor App plugin
   - Handles back button events
   - Manages exit timer logic

2. **`/src/app/components/ExitIndicator.tsx`**
   - Optional visual component
   - Shows animated toast message
   - Auto-dismisses after 2 seconds

### Integration:
The hook is integrated in `/src/app/App.tsx`:
```typescript
import { useBackButtonExit } from '@/app/hooks/useBackButtonExit';

export default function App() {
  useBackButtonExit(); // Enable double back exit
  // ... rest of app
}
```

### Dependencies:
- ✅ **@capacitor/app** - Installed (v8.0.1)
- ✅ **@capacitor/core** - Already installed
- ✅ **sonner** - For toast notifications

## Testing

### On Android Device/Emulator:
1. Build and run the app: `npm run android:build`
2. Navigate to any page in the app
3. Press the Android back button once
4. See toast: "Press back again to exit"
5. Press back again within 2 seconds
6. App should exit

### Expected Behavior:
- ✅ Toast appears on first back press
- ✅ App exits on second back press (within 2 seconds)
- ✅ Timer resets if user waits more than 2 seconds
- ✅ Normal navigation works when not at root page

## Configuration

### Exit Delay (Default: 2 seconds)
To change the exit delay, edit `/src/app/hooks/useBackButtonExit.tsx`:
```typescript
const EXIT_DELAY = 2000; // Change to desired milliseconds
```

### Toast Message
To customize the message, edit the toast in the hook:
```typescript
toast.info('Your custom message here', {
  duration: 2000,
  position: 'bottom-center',
});
```

## Web Browser Behavior
- On web browsers (non-Capacitor environment), the hook does nothing
- Standard browser back button behavior applies
- No exit confirmation needed (user can close tab normally)

## Benefits
✅ Prevents accidental app exits
✅ Follows Android UX best practices
✅ Provides clear user feedback
✅ Non-intrusive design
✅ Fully integrated with navigation

## Future Enhancements
- [ ] Add haptic feedback on back press
- [ ] Customize toast styling per brand colors
- [ ] Add animation to exit indicator
- [ ] Support for iOS back gesture (swipe)
- [ ] Admin setting to enable/disable feature

---

**Status**: ✅ Fully Implemented and Ready for Testing
**Platform**: Android (via Capacitor)
**Version**: 1.0
**Last Updated**: March 4, 2026
