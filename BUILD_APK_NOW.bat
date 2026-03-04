@echo off
echo ========================================
echo    NEWS ROBO - COMPLETE APK BUILD
echo ========================================
echo.
echo This will build your APK with all fixes applied!
echo.
echo Fixes included:
echo - TypeScript installed
echo - Firebase disabled (not configured)
echo - Gradle configuration fixed
echo - GPS/Location enabled
echo.
pause

echo [1/5] Building Web Application...
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Web build failed!
    echo.
    echo Try running: npm install
    pause
    exit /b 1
)
echo ✓ Web build complete!
echo.

echo [2/5] Syncing to Android...
call npx cap sync android
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Capacitor sync failed!
    pause
    exit /b 1
)
echo ✓ Sync complete!
echo.

echo [3/5] Copying assets...
call npx cap copy android
echo ✓ Assets copied!
echo.

echo [4/5] Navigating to Android folder...
cd android
if %errorlevel% neq 0 (
    echo ERROR: Android folder not found!
    cd ..
    pause
    exit /b 1
)
echo ✓ In Android folder!
echo.

echo [5/5] Building APK...
echo This will take 5-15 minutes on first build.
echo Please be patient...
echo.

echo Cleaning previous builds...
call gradlew clean
echo ✓ Clean complete!
echo.

echo Building debug APK...
call gradlew assembleDebug --stacktrace
if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo    BUILD FAILED!
    echo ========================================
    echo.
    echo Common fixes:
    echo.
    echo 1. SDK location not found:
    echo    - Create android\local.properties
    echo    - Add: sdk.dir=C:\\Users\\MY PC\\AppData\\Local\\Android\\Sdk
    echo.
    echo 2. Gradle sync failed:
    echo    - Delete .gradle folder
    echo    - Run gradlew clean --refresh-dependencies
    echo.
    echo 3. Java version error:
    echo    - Make sure Java 17 is installed
    echo.
    echo See error above for specific issue.
    echo Check GRADLE_ERROR_FIXED.md for solutions.
    echo.
    cd ..
    pause
    exit /b 1
)

echo.
echo ========================================
echo    🎉 BUILD SUCCESS! 🎉
echo ========================================
echo.
echo APK Location:
echo %cd%\app\build\outputs\apk\debug\app-debug.apk
echo.

echo File size:
dir app\build\outputs\apk\debug\app-debug.apk | find "app-debug.apk"
echo.

echo ========================================
echo    NEXT STEPS:
echo ========================================
echo.
echo 1. Find your APK at:
echo    android\app\build\outputs\apk\debug\app-debug.apk
echo.
echo 2. Transfer to your phone
echo.
echo 3. Install and test!
echo.
echo Features included:
echo ✓ All 6 main features
echo ✓ GPS/Location auto-detect
echo ✓ Admin panel
echo ✓ Citizen journalism
echo ✓ E-Book system
echo ✓ Buzz/viral videos
echo ✓ Fixed logo (SVG)
echo.
echo Note: Firebase features disabled (not configured)
echo You can enable Firebase later by following GRADLE_ERROR_FIXED.md
echo.

cd ..
echo Press any key to open APK folder...
pause
explorer android\app\build\outputs\apk\debug
