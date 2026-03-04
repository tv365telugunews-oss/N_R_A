# NEWS ROBO - PowerShell APK Build Script
# Run this with: .\BUILD_APK_POWERSHELL.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   NEWS ROBO - APK BUILD (PowerShell)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-Not (Test-Path "package.json")) {
    Write-Host "ERROR: package.json not found!" -ForegroundColor Red
    Write-Host "Please run this script from the project root." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[1/5] Building Web Application..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ERROR: Web build failed!" -ForegroundColor Red
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ Web build complete!" -ForegroundColor Green
Write-Host ""

Write-Host "[2/5] Syncing to Android..." -ForegroundColor Yellow
npx cap sync android
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ERROR: Capacitor sync failed!" -ForegroundColor Red
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ Sync complete!" -ForegroundColor Green
Write-Host ""

Write-Host "[3/5] Copying assets..." -ForegroundColor Yellow
npx cap copy android
Write-Host "✓ Assets copied!" -ForegroundColor Green
Write-Host ""

Write-Host "[4/5] Navigating to Android folder..." -ForegroundColor Yellow
if (-Not (Test-Path "android")) {
    Write-Host "ERROR: Android folder not found!" -ForegroundColor Red
    Write-Host "Run: npx cap add android" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}
Set-Location android
Write-Host "✓ In Android folder!" -ForegroundColor Green
Write-Host ""

Write-Host "[5/5] Building APK..." -ForegroundColor Yellow
Write-Host "This will take 5-15 minutes on first build." -ForegroundColor Cyan
Write-Host "Please be patient..." -ForegroundColor Cyan
Write-Host ""

Write-Host "Cleaning previous builds..." -ForegroundColor Yellow
.\gradlew clean
Write-Host "✓ Clean complete!" -ForegroundColor Green
Write-Host ""

Write-Host "Building debug APK..." -ForegroundColor Yellow
.\gradlew assembleDebug --stacktrace
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "   BUILD FAILED!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Common fixes:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. SDK location not found:" -ForegroundColor Cyan
    Write-Host "   - Create android\local.properties" -ForegroundColor White
    Write-Host "   - Add: sdk.dir=C:\\Users\\MY PC\\AppData\\Local\\Android\\Sdk" -ForegroundColor White
    Write-Host ""
    Write-Host "2. Gradle sync failed:" -ForegroundColor Cyan
    Write-Host "   - Delete .gradle folder" -ForegroundColor White
    Write-Host "   - Run: .\gradlew clean --refresh-dependencies" -ForegroundColor White
    Write-Host ""
    Write-Host "3. Java version error:" -ForegroundColor Cyan
    Write-Host "   - Make sure Java 17 is installed" -ForegroundColor White
    Write-Host ""
    Write-Host "See error above for specific issue." -ForegroundColor Yellow
    Write-Host "Check GRADLE_ERROR_FIXED.md for solutions." -ForegroundColor Yellow
    Write-Host ""
    Set-Location ..
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   🎉 BUILD SUCCESS! 🎉" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

$apkPath = "app\build\outputs\apk\debug\app-debug.apk"
Write-Host "APK Location:" -ForegroundColor Cyan
Write-Host "$PWD\$apkPath" -ForegroundColor White
Write-Host ""

if (Test-Path $apkPath) {
    $apkSize = (Get-Item $apkPath).Length / 1MB
    Write-Host "APK Size: $([math]::Round($apkSize, 2)) MB" -ForegroundColor Cyan
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   NEXT STEPS:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Find your APK at:" -ForegroundColor Yellow
Write-Host "   android\app\build\outputs\apk\debug\app-debug.apk" -ForegroundColor White
Write-Host ""
Write-Host "2. Transfer to your phone" -ForegroundColor Yellow
Write-Host ""
Write-Host "3. Install and test!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Features included:" -ForegroundColor Cyan
Write-Host "✓ All 6 main features" -ForegroundColor Green
Write-Host "✓ GPS/Location auto-detect" -ForegroundColor Green
Write-Host "✓ Admin panel" -ForegroundColor Green
Write-Host "✓ Citizen journalism" -ForegroundColor Green
Write-Host "✓ E-Book system" -ForegroundColor Green
Write-Host "✓ Buzz/viral videos" -ForegroundColor Green
Write-Host "✓ Fixed logo (SVG)" -ForegroundColor Green
Write-Host ""
Write-Host "Note: Firebase features disabled (not configured)" -ForegroundColor Yellow
Write-Host "You can enable Firebase later by following GRADLE_ERROR_FIXED.md" -ForegroundColor Yellow
Write-Host ""

Set-Location ..
Write-Host "Opening APK folder..." -ForegroundColor Yellow
Start-Process explorer.exe "android\app\build\outputs\apk\debug"

Write-Host ""
Write-Host "Done! Press Enter to exit..." -ForegroundColor Green
Read-Host
