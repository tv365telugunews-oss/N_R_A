# NEWS ROBO - Android App Setup Guide

## Prerequisites
- ✅ Node.js (v18+)
- ✅ Visual Studio Code
- ✅ Android Studio (latest version)
- ✅ JDK 17+
- ✅ Git installed

---

## Step 1: Install Capacitor Dependencies

Open your terminal in the project root and run:

```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli

# Install Android platform
npm install @capacitor/android

# Install essential Capacitor plugins
npm install @capacitor/splash-screen @capacitor/status-bar @capacitor/keyboard @capacitor/app @capacitor/haptics @capacitor/network @capacitor/camera @capacitor/filesystem @capacitor/share @capacitor/toast @capacitor/device

# Install Firebase for Capacitor
npm install @capacitor-firebase/authentication @capacitor-firebase/analytics @capacitor-firebase/messaging @capacitor-firebase/firestore
```

---

## Step 2: Initialize Capacitor

```bash
# Initialize Capacitor (if not already done)
npx cap init "NEWS ROBO" "com.newsrobo.app"

# Add Android platform
npx cap add android
```

---

## Step 3: Build Your React App

```bash
# Build the production version
npm run build

# Sync the web app to Android
npx cap sync android
```

---

## Step 4: Configure Firebase for Android

### A. Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click "Add project" → Name it "NEWS ROBO"
3. Enable Google Analytics (optional)
4. Click "Create project"

### B. Add Android App to Firebase
1. In Firebase Console → Click "Add app" → Select Android
2. Enter package name: `com.newsrobo.app`
3. Download `google-services.json`
4. Place it in: `android/app/google-services.json`

### C. Enable Firebase Services
In Firebase Console, enable:
- **Authentication** → Email/Password, Phone
- **Firestore Database** → Start in production mode
- **Cloud Storage** → For images/videos
- **Cloud Messaging** → For push notifications
- **Analytics** → Enabled by default

---

## Step 5: Update Android Manifest

The `AndroidManifest.xml` file should include:

```xml
<!-- Required Permissions -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.VIBRATE" />

<!-- For Android 13+ photo picker -->
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
<uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />
```

---

## Step 6: Open in Android Studio

```bash
# Open Android Studio
npx cap open android
```

This will open the `android` folder in Android Studio.

---

## Step 7: Configure Android Studio

### A. Update build.gradle (Project level)
File: `android/build.gradle`

```gradle
buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.1.1'
        classpath 'com.google.gms:google-services:4.4.0'
        classpath 'com.google.firebase:firebase-crashlytics-gradle:2.9.9'
    }
}
```

### B. Update build.gradle (App level)
File: `android/app/build.gradle`

Add at the top:
```gradle
apply plugin: 'com.android.application'
apply plugin: 'com.google.gms.google-services'
```

Update `defaultConfig`:
```gradle
android {
    namespace "com.newsrobo.app"
    compileSdkVersion 34
    
    defaultConfig {
        applicationId "com.newsrobo.app"
        minSdkVersion 24
        targetSdkVersion 34
        versionCode 1
        versionName "1.0.0"
        multiDexEnabled true
    }
}

dependencies {
    // Firebase
    implementation platform('com.google.firebase:firebase-bom:32.7.0')
    implementation 'com.google.firebase:firebase-analytics'
    implementation 'com.google.firebase:firebase-auth'
    implementation 'com.google.firebase:firebase-firestore'
    implementation 'com.google.firebase:firebase-storage'
    implementation 'com.google.firebase:firebase-messaging'
}
```

---

## Step 8: Update App Icons and Splash Screen

### A. App Icons
Replace icons in: `android/app/src/main/res/`
- `mipmap-hdpi/` - 72x72
- `mipmap-mdpi/` - 48x48
- `mipmap-xhdpi/` - 96x96
- `mipmap-xxhdpi/` - 144x144
- `mipmap-xxxhdpi/` - 192x192

Use https://romannurik.github.io/AndroidAssetStudio/ to generate icons.

### B. Splash Screen
Create `android/app/src/main/res/drawable/splash.png`
Recommended size: 2732x2732px with NEWS ROBO logo centered

---

## Step 9: Build APK

### Development Build
In Android Studio:
1. Click **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Wait for build to complete
3. Click "locate" to find the APK
4. APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

### Production Build (Signed)
1. **Generate Keystore:**
```bash
cd android/app
keytool -genkey -v -keystore newsrobo-release.keystore -alias newsrobo -keyalg RSA -keysize 2048 -validity 10000
```

2. **Create key.properties:**
File: `android/key.properties`
```properties
storePassword=YOUR_KEYSTORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=newsrobo
storeFile=newsrobo-release.keystore
```

3. **Update build.gradle:**
```gradle
android {
    signingConfigs {
        release {
            storeFile file('newsrobo-release.keystore')
            storePassword System.getenv("KEYSTORE_PASSWORD")
            keyAlias 'newsrobo'
            keyPassword System.getenv("KEY_PASSWORD")
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

4. **Build Release APK:**
In Android Studio: **Build** → **Generate Signed Bundle / APK** → **APK** → Select keystore → **Release** → **Finish**

APK location: `android/app/build/outputs/apk/release/app-release.apk`

---

## Step 10: Test on Android Device

### Via USB (Recommended)
1. Enable **Developer Options** on your Android phone
2. Enable **USB Debugging**
3. Connect phone to computer via USB
4. In Android Studio: Click **Run** (Green play button)
5. Select your device from the list

### Via APK Install
1. Transfer `app-debug.apk` to your phone
2. Open the APK file
3. Click "Install" (Enable "Install from Unknown Sources" if needed)

---

## Step 11: Push to GitHub

```bash
# Initialize git (if not already)
git init

# Create .gitignore
echo "node_modules/
dist/
android/app/build/
android/app/google-services.json
android/key.properties
android/*.keystore
.env" > .gitignore

# Commit and push
git add .
git commit -m "Initial commit - NEWS ROBO Android App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/news-robo-android.git
git push -u origin main
```

---

## Step 12: Deploy to Google Play Store

### A. Prepare Store Listing
Create the following assets:
1. **App Icon**: 512x512px PNG
2. **Feature Graphic**: 1024x500px
3. **Screenshots**: 
   - Phone: At least 2 (1080x1920 or similar)
   - Tablet (optional): 7-10 inch screenshots
4. **App Description** (Max 4000 chars)
5. **Short Description** (Max 80 chars)

### B. Create Google Play Console Account
1. Go to https://play.google.com/console
2. Pay one-time $25 fee
3. Create developer account

### C. Create App
1. Click "Create app"
2. Fill in app details
3. Upload screenshots and graphics
4. Set content rating
5. Set target audience
6. Complete privacy policy (required)

### D. Upload AAB (Android App Bundle)
Build AAB instead of APK for Play Store:
```bash
# In Android Studio
Build → Generate Signed Bundle / APK → Android App Bundle → Release
```

Upload the `.aab` file to Play Console under "Release" → "Production"

### E. Submit for Review
1. Complete all required sections (green checkmarks)
2. Click "Submit for review"
3. Wait 1-3 days for approval

---

## Step 13: Continuous Development

### Make Changes to Web Code
```bash
# 1. Edit React components in /src
# 2. Build
npm run build

# 3. Sync to Android
npx cap sync android

# 4. Open in Android Studio
npx cap open android

# 5. Run on device
```

### Hot Reload During Development
```bash
# Start dev server
npm run dev

# In another terminal
npx cap run android --livereload --external
```

---

## Troubleshooting

### Build Errors
```bash
# Clean build
cd android
./gradlew clean

# Sync again
npx cap sync android
```

### Network Issues in App
Add to `capacitor.config.ts`:
```typescript
server: {
  cleartext: true,
  androidScheme: 'https'
}
```

### Firebase Not Working
1. Verify `google-services.json` is in `android/app/`
2. Check package name matches: `com.newsrobo.app`
3. Sync gradle files in Android Studio

---

## Project Structure

```
news-robo/
├── src/                    # React source code
├── android/                # Android native project
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml
│   │   │   ├── res/       # Icons, splash, etc.
│   │   ├── build.gradle
│   │   └── google-services.json
│   └── build.gradle
├── dist/                   # Built web app
├── capacitor.config.ts    # Capacitor configuration
└── package.json
```

---

## Useful Commands

```bash
# Build web app
npm run build

# Sync to Android
npx cap sync android

# Open Android Studio
npx cap open android

# Run on device
npx cap run android

# Update Capacitor
npm install @capacitor/cli@latest @capacitor/core@latest
npm install @capacitor/android@latest
npx cap sync

# Check doctor (diagnose issues)
npx cap doctor
```

---

## Firebase Integration Files

See:
- `/firebase.config.ts` - Firebase configuration
- `/src/services/firebase/` - Firebase service modules

---

## Support

- **Capacitor Docs**: https://capacitorjs.com/docs
- **Firebase Android Docs**: https://firebase.google.com/docs/android/setup
- **Android Studio**: https://developer.android.com/studio

---

## Next Steps

1. ✅ Install dependencies (Step 1)
2. ✅ Initialize Capacitor (Step 2)
3. ✅ Build and sync (Step 3)
4. ✅ Setup Firebase (Step 4)
5. ✅ Open in Android Studio (Step 6)
6. ✅ Build APK (Step 9)
7. ✅ Test on device (Step 10)
8. 🚀 Deploy to Play Store (Step 12)

Good luck with your Android app! 🎉
