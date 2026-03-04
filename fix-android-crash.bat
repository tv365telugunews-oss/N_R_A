@echo off
echo.
echo ========================================================
echo    NEWS ROBO - APK Crash Fix Script (Windows)
echo ========================================================
echo.
echo This script will fix the 1-second crash issue by:
echo  1. Removing broken android folder
echo  2. Rebuilding your web app
echo  3. Regenerating clean Android project
echo  4. Opening in Android Studio
echo.
echo Press Ctrl+C to cancel, or
pause

echo.
echo [1/5] Checking if android folder exists...
if exist "android" (
    echo Found android folder. Removing...
    rmdir /s /q android
    echo ✓ Android folder removed
) else (
    echo No android folder found (that's okay)
)

echo.
echo [2/5] Cleaning previous builds...
if exist "dist" (
    rmdir /s /q dist
    echo ✓ Cleaned dist folder
)

echo.
echo [3/5] Building web application...
call npm run build
if errorlevel 1 (
    echo ❌ Build failed! Please fix errors and try again.
    pause
    exit /b 1
)
echo ✓ Web app built successfully

echo.
echo [4/5] Creating clean Android project...
call npx cap add android
if errorlevel 1 (
    echo ❌ Failed to add Android platform!
    echo Make sure Capacitor is installed.
    pause
    exit /b 1
)
echo ✓ Android project created

echo.
echo [5/5] Syncing files to Android...
call npx cap sync android
if errorlevel 1 (
    echo ❌ Sync failed!
    pause
    exit /b 1
)
echo ✓ Files synced successfully

echo.
echo ========================================================
echo                    ✓ FIX COMPLETE!
echo ========================================================
echo.
echo Opening Android Studio...
echo.
echo In Android Studio:
echo  1. Wait for Gradle sync to finish
echo  2. Click: Build → Build Bundle(s) / APK(s) → Build APK(s)
echo  3. Wait 2-3 minutes
echo  4. Your APK will be ready!
echo.
echo Your APK should no longer crash! 🎉
echo.
pause

call npx cap open android

echo.
echo Done! Android Studio is opening...
echo.
pause
