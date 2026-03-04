#!/bin/bash

echo "========================================"
echo "   NEWS ROBO - Android Setup Script"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed!"
    echo "Please download and install Node.js from: https://nodejs.org/"
    exit 1
fi

echo "[Step 0/5] Verifying setup..."
npm run verify
if [ $? -ne 0 ]; then
    echo ""
    echo "[WARNING] Some checks failed, but continuing..."
    echo ""
fi

echo ""
echo "[Step 1/5] Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "[ERROR] Failed to install dependencies"
    exit 1
fi

echo ""
echo "[Step 2/5] Building web application..."
npm run build
if [ $? -ne 0 ]; then
    echo "[ERROR] Failed to build web app"
    exit 1
fi

echo ""
echo "[Step 3/5] Initializing Capacitor..."
if [ ! -d "android" ]; then
    npx cap init "NEWS ROBO" "com.newsrobo.app" --web-dir=dist
fi

echo ""
echo "[Step 4/5] Adding Android platform..."
if [ ! -d "android" ]; then
    npx cap add android
fi

echo ""
echo "[Step 5/5] Syncing project to Android..."
npx cap sync android

echo ""
echo "========================================"
echo "    Setup Complete! "
echo "========================================"
echo ""
echo "Next steps:"
echo "1. The 'android' folder has been created"
echo "2. Open Android Studio"
echo "3. Click 'Open an Existing Project'"
echo "4. Select the 'android' folder from this directory"
echo "5. Wait for Gradle sync to complete"
echo "6. Click Build -> Build Bundle / APK -> Build APK"
echo ""
echo "Your APK will be in: android/app/build/outputs/apk/debug/"
echo ""

read -p "Do you want to open Android Studio now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Opening Android Studio..."
    npx cap open android
fi

echo ""
echo "For detailed instructions, see ANDROID_BUILD_GUIDE.md"
echo ""