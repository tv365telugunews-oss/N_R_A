@echo off
echo ========================================
echo    FIXING TYPESCRIPT ERROR
echo ========================================
echo.

echo [1/3] Installing TypeScript...
call npm install -D typescript
if %errorlevel% neq 0 (
    echo ERROR: TypeScript installation failed!
    pause
    exit /b 1
)
echo ✓ TypeScript installed!
echo.

echo [2/3] Building project...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)
echo ✓ Build complete!
echo.

echo [3/3] Syncing to Android...
call npx cap sync android
if %errorlevel% neq 0 (
    echo ERROR: Sync failed!
    pause
    exit /b 1
)
echo ✓ Sync complete!
echo.

echo ========================================
echo    SUCCESS!
echo ========================================
echo.
echo Now opening Android Studio...
call npx cap open android
echo.
pause
