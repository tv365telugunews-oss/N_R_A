#!/bin/bash

echo ""
echo "========================================================"
echo "   NEWS ROBO - APK Crash Fix Script (Mac/Linux)"
echo "========================================================"
echo ""
echo "This script will fix the 1-second crash issue by:"
echo " 1. Removing broken android folder"
echo " 2. Rebuilding your web app"
echo " 3. Regenerating clean Android project"
echo " 4. Opening in Android Studio"
echo ""
read -p "Press Enter to continue (Ctrl+C to cancel)..."

echo ""
echo "[1/5] Checking if android folder exists..."
if [ -d "android" ]; then
    echo "Found android folder. Removing..."
    rm -rf android
    echo "✓ Android folder removed"
else
    echo "No android folder found (that's okay)"
fi

echo ""
echo "[2/5] Cleaning previous builds..."
if [ -d "dist" ]; then
    rm -rf dist
    echo "✓ Cleaned dist folder"
fi

echo ""
echo "[3/5] Building web application..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix errors and try again."
    exit 1
fi
echo "✓ Web app built successfully"

echo ""
echo "[4/5] Creating clean Android project..."
npx cap add android
if [ $? -ne 0 ]; then
    echo "❌ Failed to add Android platform!"
    echo "Make sure Capacitor is installed."
    exit 1
fi
echo "✓ Android project created"

echo ""
echo "[5/5] Syncing files to Android..."
npx cap sync android
if [ $? -ne 0 ]; then
    echo "❌ Sync failed!"
    exit 1
fi
echo "✓ Files synced successfully"

echo ""
echo "========================================================"
echo "                   ✓ FIX COMPLETE!"
echo "========================================================"
echo ""
echo "Opening Android Studio..."
echo ""
echo "In Android Studio:"
echo " 1. Wait for Gradle sync to finish"
echo " 2. Click: Build → Build Bundle(s) / APK(s) → Build APK(s)"
echo " 3. Wait 2-3 minutes"
echo " 4. Your APK will be ready!"
echo ""
echo "Your APK should no longer crash! 🎉"
echo ""
read -p "Press Enter to open Android Studio..."

npx cap open android

echo ""
echo "Done! Android Studio is opening..."
echo ""
