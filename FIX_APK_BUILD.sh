#!/bin/bash

echo "========================================"
echo "   NEWS ROBO - APK BUILD FIX SCRIPT"
echo "========================================"
echo ""

echo "[1/6] Building Web Application..."
npm run build
if [ $? -ne 0 ]; then
    echo "ERROR: Web build failed!"
    exit 1
fi
echo "✓ Web build complete!"
echo ""

echo "[2/6] Syncing to Android..."
npx cap sync android
if [ $? -ne 0 ]; then
    echo "ERROR: Capacitor sync failed!"
    exit 1
fi
echo "✓ Sync complete!"
echo ""

echo "[3/6] Copying assets..."
npx cap copy android
echo "✓ Assets copied!"
echo ""

echo "[4/6] Navigating to Android folder..."
cd android
if [ $? -ne 0 ]; then
    echo "ERROR: Android folder not found!"
    exit 1
fi
echo "✓ In Android folder!"
echo ""

echo "[5/6] Cleaning previous builds..."
./gradlew clean
echo "✓ Clean complete!"
echo ""

echo "[6/6] Building APK (this may take 5-10 minutes)..."
./gradlew assembleDebug
if [ $? -ne 0 ]; then
    echo ""
    echo "========================================"
    echo "   BUILD FAILED!"
    echo "========================================"
    echo ""
    echo "Common fixes:"
    echo "1. Check if Android SDK is installed"
    echo "2. Create android/local.properties with SDK path"
    echo "3. Disable Firebase in app/build.gradle"
    echo "4. Check error messages above"
    echo ""
    echo "See APK_BUILD_TROUBLESHOOTING.md for detailed help"
    cd ..
    exit 1
fi

echo ""
echo "========================================"
echo "   BUILD SUCCESS!"
echo "========================================"
echo ""
echo "APK Location:"
echo "$(pwd)/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "File size:"
ls -lh app/build/outputs/apk/debug/app-debug.apk
echo ""
echo "Next steps:"
echo "1. Transfer APK to your phone"
echo "2. Enable 'Install from unknown sources'"
echo "3. Open APK file on phone to install"
echo "4. Test all features!"
echo ""

cd ..
