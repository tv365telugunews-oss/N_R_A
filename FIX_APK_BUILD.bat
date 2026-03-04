@echo off
echo ========================================
echo    NEWS ROBO - APK BUILD FIX SCRIPT
echo ========================================
echo.

echo [1/6] Building Web Application...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Web build failed!
    pause
    exit /b 1
)
echo ✓ Web build complete!
echo.

echo [2/6] Syncing to Android...
call npx cap sync android
if %errorlevel% neq 0 (
    echo ERROR: Capacitor sync failed!
    pause
    exit /b 1
)
echo ✓ Sync complete!
echo.

echo [3/6] Copying assets...
call npx cap copy android
echo ✓ Assets copied!
echo.

echo [4/6] Navigating to Android folder...
cd android
if %errorlevel% neq 0 (
    echo ERROR: Android folder not found!
    cd ..
    pause
    exit /b 1
)
echo ✓ In Android folder!
echo.

echo [5/6] Cleaning previous builds...
call gradlew clean
echo ✓ Clean complete!
echo.

echo [6/6] Building APK (this may take 5-10 minutes)...
call gradlew assembleDebug
if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo    BUILD FAILED!
    echo ========================================
    echo.
    echo Common fixes:
    echo 1. Check if Android SDK is installed
    echo 2. Create android/local.properties with SDK path
    echo 3. Disable Firebase in app/build.gradle
    echo 4. Check error messages above
    echo.
    echo See APK_BUILD_TROUBLESHOOTING.md for detailed help
    cd ..
    pause
    exit /b 1
)

echo.
echo ========================================
echo    BUILD SUCCESS!
echo ========================================
echo.
echo APK Location:
echo %cd%\app\build\outputs\apk\debug\app-debug.apk
echo.
echo File size:
dir app\build\outputs\apk\debug\app-debug.apk
echo.
echo Next steps:
echo 1. Transfer APK to your phone
echo 2. Enable "Install from unknown sources"
echo 3. Open APK file on phone to install
echo 4. Test all features!
echo.

cd ..
pause
