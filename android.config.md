# Android Configuration Settings

## App Details
- **App Name**: NEWS ROBO
- **Package ID**: com.newsrobo.app
- **Version Code**: 1
- **Version Name**: 1.0.0

## Build Configuration
- **Min SDK**: 24 (Android 7.0)
- **Target SDK**: 34 (Android 14)
- **Compile SDK**: 34

## Required Permissions
The app requires the following permissions (already configured in AndroidManifest.xml):
- INTERNET
- ACCESS_NETWORK_STATE
- READ_EXTERNAL_STORAGE
- WRITE_EXTERNAL_STORAGE
- CAMERA (for citizen journalism)

## Brand Colors
- Primary Red: #D32F2F
- Dark Black: #212121
- Background: #F5F5F5
- Highlight: #FFC107

## Capacitor Plugins Used
- @capacitor/core
- @capacitor/android
- @capacitor/cli

## Important Notes
1. The app uses HashRouter for compatibility with Capacitor
2. Service Worker is disabled in Capacitor (web-only)
3. All data is stored in localStorage (no backend required for basic functionality)
4. The app is fully functional offline after first load
