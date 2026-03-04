# NEWS ROBO - Android APK Build Guide

## 🚀 Complete Guide to Build Android APK

This guide will help you convert the NEWS ROBO web application into a native Android APK file.

---

## 📋 Prerequisites

Before starting, make sure you have:

1. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
2. **Android Studio** (Latest version) - [Download here](https://developer.android.com/studio)
3. **JDK 17** (Required for Android development) - Usually comes with Android Studio
4. **Git** (Optional but recommended)

---

## 🔧 Step 1: Install Dependencies

Open terminal/command prompt in the project root folder and run:

```bash
npm install
```

Or if using pnpm:

```bash
pnpm install
```

---

## 📱 Step 2: Initialize Capacitor (First Time Only)

If you haven't initialized the Android project yet, run:

```bash
npm run android:setup
```

This command will:
- Initialize Capacitor with app ID: `com.newsrobo.app`
- Add Android platform
- Create the `android` folder

---

## 🏗️ Step 3: Build Web App & Sync to Android

Every time you make changes to your web code, run:

```bash
npm run android:build
```

This command will:
- Build your React/Vite web app
- Copy the built files to the Android project
- Sync all changes

---

## 📂 Step 4: Open in Android Studio

Run this command to open the Android project:

```bash
npm run android:open
```

Or manually:
1. Open **Android Studio**
2. Click **"Open an Existing Project"**
3. Navigate to your project folder
4. Select the `android` folder (NOT the root folder)
5. Click **"Open"**

---

## ⚙️ Step 5: Configure Android Studio (First Time)

### 5.1 Wait for Gradle Sync
- Android Studio will automatically start syncing Gradle
- This may take 5-10 minutes on first run
- Wait until you see "Gradle sync finished" at the bottom

### 5.2 Set Up Android SDK
If you see SDK errors:
1. Click **"File"** → **"Project Structure"**
2. Go to **"SDK Location"**
3. Make sure Android SDK path is set (usually `C:\Users\YourName\AppData\Local\Android\Sdk` on Windows)
4. Click **"OK"**

### 5.3 Download Required SDK Components
1. Click **"Tools"** → **"SDK Manager"**
2. In **"SDK Platforms"** tab, check:
   - ✅ Android 14.0 (API 34) - Recommended
   - ✅ Android 13.0 (API 33)
3. In **"SDK Tools"** tab, check:
   - ✅ Android SDK Build-Tools
   - ✅ Android SDK Platform-Tools
   - ✅ Android Emulator
   - ✅ Google Play Services
4. Click **"Apply"** and wait for download

---

## 🎯 Step 6: Build APK

### Option A: Build Debug APK (For Testing)

1. In Android Studio, click **"Build"** → **"Build Bundle(s) / APK(s)"** → **"Build APK(s)"**
2. Wait for build to complete (you'll see a notification)
3. Click **"locate"** in the notification to find your APK

**APK Location:**
```
/android/app/build/outputs/apk/debug/app-debug.apk
```

### Option B: Build Release APK (For Distribution)

#### Step 6.1: Generate Signing Key

Run this command in terminal (from project root):

**For Windows:**
```bash
keytool -genkey -v -keystore news-robo-key.keystore -alias newsrobo -keyalg RSA -keysize 2048 -validity 10000
```

**For Mac/Linux:**
```bash
keytool -genkey -v -keystore ~/news-robo-key.keystore -alias newsrobo -keyalg RSA -keysize 2048 -validity 10000
```

Follow the prompts:
- Enter keystore password (remember this!)
- Enter personal details
- Type "yes" to confirm

#### Step 6.2: Configure Signing in Android Studio

1. Copy the `news-robo-key.keystore` file to `android/app/` folder
2. Open `android/app/build.gradle` file
3. Add this before `android {` block:

```gradle
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

4. Inside `android {` block, add:

```gradle
signingConfigs {
    release {
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storeFile file(keystoreProperties['storeFile'])
        storePassword keystoreProperties['storePassword']
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

5. Create `android/keystore.properties` file:

```properties
storePassword=YOUR_KEYSTORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=newsrobo
storeFile=app/news-robo-key.keystore
```

#### Step 6.3: Build Release APK

In Android Studio:
1. Click **"Build"** → **"Select Build Variant"**
2. Change from "debug" to "release"
3. Click **"Build"** → **"Build Bundle(s) / APK(s)"** → **"Build APK(s)"**
4. Wait for build to complete

**Release APK Location:**
```
/android/app/build/outputs/apk/release/app-release.apk
```

---

## 📦 Step 7: Test Your APK

### Test on Emulator
1. In Android Studio, click **"AVD Manager"** (phone icon in toolbar)
2. Create a new virtual device if needed
3. Click the green play button to run

### Test on Real Device
1. Enable **Developer Options** on your Android phone:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
2. Enable **USB Debugging**:
   - Go to Settings → Developer Options
   - Enable "USB Debugging"
3. Connect phone to computer via USB
4. Allow USB debugging on phone
5. Click **"Run"** (green play button) in Android Studio

---

## 🎨 Customize App Icon & Splash Screen

### App Icon
1. Right-click `android/app/src/main/res` in Android Studio
2. Click **"New"** → **"Image Asset"**
3. Choose "Launcher Icons"
4. Upload your icon image (1024x1024 PNG recommended)
5. Click **"Next"** → **"Finish"**

### Splash Screen
1. Place your splash screen image in:
   - `android/app/src/main/res/drawable/splash.png` (800x800 recommended)
2. Background color is already set to NEWS ROBO red (#D32F2F) in `capacitor.config.ts`

---

## 🐛 Common Issues & Solutions

### Issue 1: "SDK location not found"
**Solution:** Set Android SDK path in Android Studio:
- File → Project Structure → SDK Location → Set path

### Issue 2: "Gradle sync failed"
**Solution:**
```bash
cd android
./gradlew clean
cd ..
npm run android:build
```

### Issue 3: "Could not find com.android.tools.build:gradle"
**Solution:** Update Gradle version in `android/build.gradle`:
```gradle
classpath 'com.android.tools.build:gradle:8.2.0'
```

### Issue 4: "AAPT error"
**Solution:** In Android Studio:
- Tools → SDK Manager → SDK Tools
- Install/Update "Android SDK Build-Tools"

### Issue 5: APK not installing on phone
**Solution:** 
- Enable "Install from Unknown Sources" in phone settings
- Use `adb install app-debug.apk` command

---

## 📝 Quick Command Reference

| Command | Description |
|---------|-------------|
| `npm run android:setup` | Initialize Android (first time only) |
| `npm run android:build` | Build web app + sync to Android |
| `npm run android:open` | Open in Android Studio |
| `npm run android:dev` | Run with live reload on device |
| `npm run android:clean` | Clean Android build cache |
| `npm run android:doctor` | Check Capacitor setup |

---

## 📱 App Information

- **App Name:** NEWS ROBO
- **Package ID:** com.newsrobo.app
- **Version:** 0.0.1
- **Min Android Version:** Android 7.0 (API 24)
- **Target Android Version:** Android 14 (API 34)

---

## 🌐 Building for Production

Before releasing on Google Play Store:

1. ✅ Build **Release APK** with signing key
2. ✅ Test thoroughly on multiple devices
3. ✅ Update version number in `android/app/build.gradle`:
   ```gradle
   versionCode 1
   versionName "1.0.0"
   ```
4. ✅ Create Privacy Policy (required for Play Store)
5. ✅ Create promotional graphics (512x512 icon, screenshots, banner)
6. ✅ Consider building **AAB** (Android App Bundle) instead of APK:
   - In Android Studio: Build → Generate Signed Bundle / APK → Android App Bundle

---

## 📞 Support

If you encounter any issues:
1. Run `npm run android:doctor` to check setup
2. Check Android Studio's "Build" panel for error details
3. Clean and rebuild: `npm run android:clean` then `npm run android:build`

---

## 🎉 Success!

Once you have your APK:
- **Debug APK:** Share with testers
- **Release APK:** Install on any Android device
- **For Play Store:** Upload AAB file to Google Play Console

**Your NEWS ROBO app is ready to go!** 🚀

---

**Built with ❤️ using:**
- React + TypeScript
- Vite
- Capacitor
- Tailwind CSS
