# ⚡ APK BUILD COMMANDS - CHEAT SHEET

Copy and paste these commands in order!

---

## 🚀 **COMPLETE BUILD SEQUENCE:**

### **Quick Method (Recommended):**

```bash
# Step 1: Add Android platform
npm run cap:init

# Step 2: Build and sync (combined)
npm run android:build

# Step 3: Open Android Studio
npm run cap:open

# Step 4: In Android Studio → Build → Build APK
```

---

### **Manual Method (Step by Step):**

```bash
# Step 1: Add Android platform
npx cap add android

# Step 2: Build web app
npm run build

# Step 3: Sync to Android
npx cap sync android

# Step 4: Open Android Studio
npx cap open android

# Step 5: In Android Studio → Build → Build APK
```

---

## ⚡ **ONE-LINER (All at once):**

```bash
npx cap add android && npm run build && npx cap sync android && npx cap open android
```

---

## 🔄 **UPDATE APK (After making code changes):**

```bash
# Quick update and open
npm run android:open

# Or manual:
npm run build
npx cap sync android
npx cap open android
# Then rebuild APK in Android Studio
```

---

## 📱 **INSTALL APK ON PHONE:**

### **Via USB (ADB):**

```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### **Update existing app:**

```bash
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

### **Uninstall app:**

```bash
adb uninstall com.newsrobo.app
```

---

## 🔧 **TROUBLESHOOTING COMMANDS:**

### **Clean everything:**

```bash
# Clean web build
rm -rf dist

# Clean Android build
cd android
./gradlew clean
cd ..

# Rebuild everything
npm run build
npx cap sync android
```

### **Reset Android platform:**

```bash
# Remove Android
npx cap remove android

# Re-add Android
npx cap add android

# Sync
npx cap sync android
```

### **Check installations:**

```bash
# Check Node.js
node --version

# Check npm
npm --version

# Check Capacitor
npx cap --version

# List platforms
npx cap ls

# Doctor (check everything)
npx cap doctor android
```

---

## 🏗️ **BUILD COMMANDS IN ANDROID STUDIO:**

### **Via Terminal in Android Studio:**

```bash
# Navigate to android folder
cd android

# Build debug APK
./gradlew assembleDebug

# Build release APK
./gradlew assembleRelease

# Clean build
./gradlew clean

# Clean + rebuild
./gradlew clean assembleDebug
```

### **APK locations:**

```bash
# Debug APK
android/app/build/outputs/apk/debug/app-debug.apk

# Release APK
android/app/build/outputs/apk/release/app-release.apk
```

---

## 🔐 **SIGNING (For Play Store):**

### **Generate keystore (one time):**

```bash
keytool -genkey -v -keystore newsrobo-release-key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 -alias newsrobo
```

### **Build signed APK:**

```bash
cd android
./gradlew assembleRelease
cd ..
```

### **Build App Bundle (for Play Store):**

```bash
cd android
./gradlew bundleRelease
cd ..

# Output: android/app/build/outputs/bundle/release/app-release.aab
```

---

## 📊 **USEFUL INFO COMMANDS:**

### **Get app info:**

```bash
# List installed apps on phone
adb shell pm list packages | grep newsrobo

# Get app version
adb shell dumpsys package com.newsrobo.app | grep versionName

# Check app size
ls -lh android/app/build/outputs/apk/debug/app-debug.apk
```

### **View logs:**

```bash
# Real-time logs from your app
adb logcat | grep newsrobo

# Clear logs
adb logcat -c

# Save logs to file
adb logcat > app-logs.txt
```

---

## 🚀 **NPM SCRIPTS REFERENCE:**

I've added these to your `package.json`:

```bash
# Initialize Capacitor Android
npm run cap:init

# Sync web app to Android
npm run cap:sync

# Open Android Studio
npm run cap:open

# Build web + sync (combined)
npm run android:build

# Build web + sync + open (all in one)
npm run android:open
```

---

## 📱 **ADB USEFUL COMMANDS:**

### **Device management:**

```bash
# List connected devices
adb devices

# Connect device over WiFi
adb tcpip 5555
adb connect 192.168.1.100:5555

# Restart ADB
adb kill-server
adb start-server
```

### **App management:**

```bash
# Install APK
adb install path/to/app.apk

# Install (replace existing)
adb install -r path/to/app.apk

# Uninstall app
adb uninstall com.newsrobo.app

# Launch app
adb shell am start -n com.newsrobo.app/.MainActivity

# Stop app
adb shell am force-stop com.newsrobo.app
```

### **File operations:**

```bash
# Copy APK from computer to phone
adb push app-debug.apk /sdcard/Download/

# Copy file from phone to computer
adb pull /sdcard/Download/screenshot.png

# List files on phone
adb shell ls /sdcard/Download/
```

---

## 🧪 **TESTING COMMANDS:**

### **Take screenshot:**

```bash
adb shell screencap /sdcard/screenshot.png
adb pull /sdcard/screenshot.png
```

### **Record screen:**

```bash
adb shell screenrecord /sdcard/demo.mp4
# Press Ctrl+C to stop
adb pull /sdcard/demo.mp4
```

### **Monitor app performance:**

```bash
# CPU usage
adb shell top | grep newsrobo

# Memory usage
adb shell dumpsys meminfo com.newsrobo.app

# Battery usage
adb shell dumpsys batterystats com.newsrobo.app
```

---

## 🔄 **COMPLETE WORKFLOW:**

### **First time setup:**

```bash
# 1. Add Android
npm run cap:init

# 2. Build and open
npm run android:open

# 3. Build APK in Android Studio
# 4. Install on phone
```

### **Daily development:**

```bash
# Make code changes...

# Rebuild and open
npm run android:open

# Rebuild APK in Android Studio
# Install on phone
```

### **Before sharing APK:**

```bash
# Clean build
cd android && ./gradlew clean && cd ..

# Fresh build
npm run android:build

# Open and build APK
npm run cap:open

# APK: android/app/build/outputs/apk/debug/app-debug.apk
```

---

## ⚡ **COPY-PASTE READY COMMANDS:**

### **Initial build:**

```bash
npm run cap:init && npm run android:open
```

### **Rebuild after changes:**

```bash
npm run android:open
```

### **Clean and rebuild:**

```bash
rm -rf dist && cd android && ./gradlew clean && cd .. && npm run android:build
```

### **Install on phone:**

```bash
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📋 **QUICK REFERENCE TABLE:**

| Command | What it does |
|---------|-------------|
| `npm run cap:init` | Add Android platform |
| `npm run build` | Build web app |
| `npm run cap:sync` | Sync to Android |
| `npm run cap:open` | Open Android Studio |
| `npm run android:build` | Build + sync |
| `npm run android:open` | Build + sync + open |
| `adb install app.apk` | Install APK on phone |
| `./gradlew assembleDebug` | Build APK from terminal |
| `npx cap doctor android` | Check setup |

---

## 🆘 **EMERGENCY FIXES:**

### **Everything is broken:**

```bash
# Nuclear option - start fresh
npx cap remove android
rm -rf dist
rm -rf node_modules
npm install
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

### **Gradle issues:**

```bash
cd android
./gradlew clean
./gradlew --stop
cd ..
npx cap sync android
npx cap open android
```

### **Can't find APK:**

```bash
find . -name "*.apk"
# Or on Windows:
dir /s *.apk
```

---

## ✅ **SUCCESS CHECK:**

Run these to verify everything works:

```bash
# Check Node/npm
node --version && npm --version

# Check Capacitor
npx cap --version

# Check platforms
npx cap ls

# Check Android setup
npx cap doctor android

# All green? You're ready! 🎉
```

---

## 🎊 **YOU'RE READY!**

**Start building:**
```bash
npm run cap:init
```

**Then follow the interactive guide:**
See: `/BUILD_STEPS_INTERACTIVE.md`

---

**Save this file for quick reference during development!** 📌
