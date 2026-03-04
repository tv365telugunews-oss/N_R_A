# 🚀 NEWS ROBO - Quick Start Guide for Android

## ⚡ Fast Track to Android App (30 minutes)

### Step 1: Install Capacitor (2 min)
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/splash-screen @capacitor/status-bar @capacitor/keyboard @capacitor/app @capacitor/haptics @capacitor/network @capacitor/camera @capacitor/filesystem @capacitor/share @capacitor/toast @capacitor/device
```

### Step 2: Initialize Android Platform (1 min)
```bash
npx cap init "NEWS ROBO" "com.newsrobo.app"
npx cap add android
```

### Step 3: Build & Sync (2 min)
```bash
npm run build
npx cap sync android
```

### Step 4: Setup Firebase (10 min)
1. **Go to**: https://console.firebase.google.com/
2. **Create project**: "NEWS ROBO"
3. **Add Android app**: Package name = `com.newsrobo.app`
4. **Download**: `google-services.json`
5. **Place file in**: `android/app/google-services.json`
6. **Enable in Firebase Console**:
   - Authentication → Email/Password
   - Firestore Database
   - Storage
   - Cloud Messaging

### Step 5: Open in Android Studio (1 min)
```bash
npx cap open android
```

### Step 6: Build APK (5 min)
In Android Studio:
1. Click **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Wait for build
3. Click "locate" to find APK
4. APK at: `android/app/build/outputs/apk/debug/app-debug.apk`

### Step 7: Install on Phone (2 min)
**Option A - USB:**
1. Enable Developer Options + USB Debugging on phone
2. Connect USB cable
3. In Android Studio: Click **Run** (green play button)

**Option B - APK File:**
1. Transfer `app-debug.apk` to phone
2. Open file and install

---

## 📱 Test Your App

Your NEWS ROBO Android app should now:
- ✅ Show splash screen with red background
- ✅ Display news feed with flip gesture
- ✅ Allow camera access for citizen journalism
- ✅ Show location-based news
- ✅ Support 8+ languages
- ✅ Admin panel access
- ✅ Reporter application system

---

## 🔄 Making Updates

Whenever you change React code:
```bash
npm run build
npx cap sync android
npx cap open android
# Then click Run in Android Studio
```

---

## 🛠️ Useful Commands

```bash
# Check if everything is configured correctly
npx cap doctor

# Live reload during development
npx cap run android --livereload

# Clean build (if errors occur)
cd android && ./gradlew clean && cd ..
npx cap sync android

# Update Capacitor
npm install @capacitor/cli@latest @capacitor/core@latest
npm install @capacitor/android@latest
npx cap sync
```

---

## 📦 Build for Production

### Create Signed APK for Play Store:

1. **Generate Keystore:**
```bash
cd android/app
keytool -genkey -v -keystore newsrobo-release.keystore -alias newsrobo -keyalg RSA -keysize 2048 -validity 10000
```
Enter password and details when prompted

2. **Build Release APK:**
In Android Studio:
- **Build** → **Generate Signed Bundle / APK**
- Select **APK**
- Choose keystore file
- Enter passwords
- Select **release** build variant
- Click **Finish**

3. **Find APK:**
`android/app/build/outputs/apk/release/app-release.apk`

---

## 🚀 Deploy to Google Play Store

### Prerequisites:
- Google Play Developer account ($25 one-time fee)
- Privacy Policy URL (required)
- App screenshots (at least 2)
- Feature graphic (1024x500px)
- App icon (512x512px)

### Steps:
1. Go to https://play.google.com/console
2. Create app
3. Upload screenshots and graphics
4. Set content rating
5. Upload your signed APK/AAB
6. Complete all sections
7. Submit for review (1-3 days)

---

## 🔧 Common Issues & Fixes

### Issue: Build fails
```bash
cd android
./gradlew clean
cd ..
npx cap sync android
```

### Issue: Firebase not working
- Verify `google-services.json` is in `android/app/`
- Check package name is exactly: `com.newsrobo.app`
- Sync gradle files in Android Studio

### Issue: Camera not working
- Check permissions in AndroidManifest.xml
- Grant camera permission in phone settings

### Issue: Can't install APK
- Enable "Install from unknown sources" in phone settings
- Check APK is not corrupted

---

## 📁 Important Files

```
Your Project/
├── android/                          # Android native code
│   ├── app/
│   │   ├── google-services.json     # ⚠️ ADD THIS FROM FIREBASE
│   │   ├── build.gradle             # ✅ Already configured
│   │   └── src/main/
│   │       ├── AndroidManifest.xml  # ✅ Already configured
│   │       └── res/                 # Icons, splash, etc.
│   └── build.gradle                 # ✅ Already configured
├── src/                             # Your React code
├── capacitor.config.ts              # ✅ Already configured
└── firebase.config.ts               # ⚠️ ADD YOUR FIREBASE KEYS
```

---

## 🎨 Customize App Icon & Splash

### App Icon:
1. Create 512x512px icon with NEWS ROBO logo
2. Use: https://romannurik.github.io/AndroidAssetStudio/
3. Replace icons in `android/app/src/main/res/mipmap-*` folders

### Splash Screen:
1. Create 2732x2732px image (red background + logo)
2. Save as: `android/app/src/main/res/drawable/splash.png`

---

## 📊 Firebase Setup Details

In Firebase Console, configure:

### 1. Authentication
- Enable Email/Password
- Enable Phone (optional, for SMS login)

### 2. Firestore Database
- Create database in production mode
- Add these collections:
  - `news` - news articles
  - `users` - user data
  - `reporters` - reporter applications
  - `submissions` - citizen journalism posts

### 3. Storage
- Create default bucket
- For images/videos from reporters

### 4. Cloud Messaging
- For push notifications
- Already configured in AndroidManifest.xml

---

## 🎯 Next Steps After APK

1. ✅ Test thoroughly on multiple devices
2. ✅ Get feedback from beta testers
3. ✅ Fix bugs and polish UI
4. ✅ Create marketing materials
5. ✅ Prepare Play Store listing
6. ✅ Submit to Google Play
7. 🚀 Launch!

---

## 📞 Support Resources

- **Capacitor Docs**: https://capacitorjs.com/docs
- **Firebase Android**: https://firebase.google.com/docs/android/setup
- **Android Studio**: https://developer.android.com/studio
- **Play Console**: https://play.google.com/console

---

## ✅ Checklist

- [ ] Installed Capacitor dependencies
- [ ] Initialized Android platform
- [ ] Built and synced web app
- [ ] Setup Firebase project
- [ ] Added google-services.json
- [ ] Opened in Android Studio
- [ ] Built debug APK
- [ ] Tested on device
- [ ] Created app icons
- [ ] Created splash screen
- [ ] Generated release keystore
- [ ] Built signed APK
- [ ] Tested release build
- [ ] Created Play Store assets
- [ ] Submitted to Play Store

---

**Good luck with your NEWS ROBO Android app! 🎉📱**
