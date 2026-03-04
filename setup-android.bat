@echo off
echo ========================================
echo    NEWS ROBO - Android Setup Script
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

echo [Step 0/5] Verifying setup...
call npm run verify
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [WARNING] Some checks failed, but continuing...
    echo.
)

echo.
echo [Step 1/5] Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [Step 2/5] Building web application...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to build web app
    pause
    exit /b 1
)

echo.
echo [Step 3/5] Initializing Capacitor...
if not exist "android" (
    call npx cap init "NEWS ROBO" "com.newsrobo.app" --web-dir=dist
)

echo.
echo [Step 4/5] Adding Android platform...
if not exist "android" (
    call npx cap add android
)

echo.
echo [Step 5/5] Syncing project to Android...
call npx cap sync android

echo.
echo ========================================
echo    Setup Complete! 
echo ========================================
echo.
echo Next steps:
echo 1. The 'android' folder has been created
echo 2. Open Android Studio
echo 3. Click "Open an Existing Project"
echo 4. Select the 'android' folder from this directory
echo 5. Wait for Gradle sync to complete
echo 6. Click Build -^> Build Bundle / APK -^> Build APK
echo.
echo Your APK will be in: android\app\build\outputs\apk\debug\
echo.

choice /C YN /M "Do you want to open Android Studio now"
if errorlevel 2 goto end
if errorlevel 1 goto openandroid

:openandroid
echo Opening Android Studio...
call npx cap open android

:end
echo.
echo For detailed instructions, see ANDROID_BUILD_GUIDE.md
echo.
pause