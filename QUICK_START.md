# NEWS ROBO - Quick Start Guide

## 🚀 Fast Track to Android APK

### For Windows Users:

1. **Double-click** `setup-android.bat` file
2. Wait for the setup to complete
3. Android Studio will open automatically
4. Wait for Gradle sync (5-10 minutes first time)
5. Click: **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
6. Done! Your APK is in: `android\app\build\outputs\apk\debug\app-debug.apk`

### For Mac/Linux Users:

1. Open Terminal in project folder
2. Run: `chmod +x setup-android.sh`
3. Run: `./setup-android.sh`
4. Wait for the setup to complete
5. Android Studio will open automatically
6. Wait for Gradle sync (5-10 minutes first time)
7. Click: **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
8. Done! Your APK is in: `android/app/build/outputs/apk/debug/app-debug.apk`

### Manual Setup (if scripts don't work):

```bash
# Step 1: Install dependencies
npm install

# Step 2: Build the web app
npm run build

# Step 3: Initialize Capacitor (first time only)
npx cap init "NEWS ROBO" "com.newsrobo.app" --web-dir=dist

# Step 4: Add Android platform (first time only)
npx cap add android

# Step 5: Sync to Android
npx cap sync android

# Step 6: Open in Android Studio
npx cap open android
```

## ⚡ After Making Code Changes

Every time you update your code, run:

```bash
npm run android:build
```

This will rebuild and sync your changes to the Android project.

## 📱 Testing Your App

### On Emulator:
1. In Android Studio toolbar, click the phone icon (AVD Manager)
2. Create/select an emulator
3. Click the green play button

### On Real Phone:
1. Enable Developer Options on your phone (Google how for your specific phone)
2. Enable USB Debugging
3. Connect phone to computer
4. Click the green play button in Android Studio

## 🎯 Building Release APK (for Play Store)

See the complete guide in `ANDROID_BUILD_GUIDE.md` - Section "Build Release APK"

## ❓ Having Issues?

### "Android folder not found"
Run: `npm run android:setup`

### "Gradle sync failed"
1. Wait for internet download to complete
2. If still fails: File → Invalidate Caches → Restart

### "SDK not found"
1. In Android Studio: Tools → SDK Manager
2. Install Android SDK (API 34 recommended)

### Still stuck?
Check the detailed guide: `ANDROID_BUILD_GUIDE.md`

## 📞 Need Help?

1. Run: `npm run android:doctor` - This checks your setup
2. Read: `ANDROID_BUILD_GUIDE.md` - Complete step-by-step guide
3. Check Android Studio's "Build" panel for specific errors

---

**That's it! Your NEWS ROBO app is ready for Android! 📱✨**
