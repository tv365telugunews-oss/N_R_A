# ✅ NEWS ROBO - Complete Setup Checklist

Print this out or keep it open while setting up your Android app!

---

## 📋 Phase 1: Prerequisites (15 min)

### System Requirements
- [ ] **Windows 10/11** or **macOS 10.15+** or **Linux**
- [ ] At least **8GB RAM** (16GB recommended)
- [ ] At least **10GB free disk space**
- [ ] Internet connection

### Software Installation
- [ ] **Node.js v18+** installed
  - Download: https://nodejs.org/
  - Verify: `node --version`
  
- [ ] **Android Studio** installed
  - Download: https://developer.android.com/studio
  - Include: Android SDK, SDK Platform, AVD
  
- [ ] **Java JDK 17** installed
  - Download: https://www.oracle.com/java/technologies/downloads/
  - Verify: `java -version`
  
- [ ] **Git** installed
  - Download: https://git-scm.com/
  - Verify: `git --version`

- [ ] **Visual Studio Code** (recommended)
  - Download: https://code.visualstudio.com/

---

## 📋 Phase 2: Project Setup (5 min)

### Get the Code
- [ ] Open terminal/command prompt
- [ ] Navigate to project folder: `cd path/to/news-robo`
- [ ] Install dependencies: `npm install`
- [ ] Verify no errors in installation

### Capacitor Setup
- [ ] Install Capacitor plugins:
  ```bash
  npm install @capacitor/splash-screen @capacitor/status-bar @capacitor/keyboard @capacitor/app @capacitor/haptics @capacitor/network @capacitor/camera @capacitor/filesystem @capacitor/share @capacitor/toast @capacitor/device
  ```
- [ ] Initialize Capacitor: `npm run cap:init`
- [ ] Add Android platform: `npm run cap:add`
- [ ] Verify `android/` folder created

---

## 📋 Phase 3: Firebase Setup (15 min)

### Create Firebase Project
- [ ] Go to https://console.firebase.google.com/
- [ ] Click "Add project"
- [ ] Enter project name: **NEWS ROBO**
- [ ] Disable/Enable Google Analytics (your choice)
- [ ] Click "Create project"
- [ ] Wait for project creation
- [ ] Click "Continue"

### Add Android App to Firebase
- [ ] In Firebase Console, click Android icon
- [ ] Enter Android package name: **`com.newsrobo.app`**
- [ ] Enter app nickname: **NEWS ROBO** (optional)
- [ ] Leave SHA-1 blank (for now)
- [ ] Click "Register app"
- [ ] Download **google-services.json**
- [ ] Place file in: `android/app/google-services.json`
- [ ] Click "Next" → "Next" → "Continue to console"

### Enable Firebase Services

#### Authentication
- [ ] Click "Authentication" in Firebase sidebar
- [ ] Click "Get started"
- [ ] Click "Email/Password"
- [ ] Enable "Email/Password"
- [ ] Click "Save"
- [ ] *Optional*: Enable "Phone" for SMS login

#### Firestore Database
- [ ] Click "Firestore Database" in sidebar
- [ ] Click "Create database"
- [ ] Select "Start in production mode"
- [ ] Choose location: **asia-south1 (Mumbai)** or closest to India
- [ ] Click "Enable"
- [ ] Wait for database creation

#### Storage
- [ ] Click "Storage" in sidebar
- [ ] Click "Get started"
- [ ] Start in production mode
- [ ] Click "Next"
- [ ] Choose same location as Firestore
- [ ] Click "Done"

#### Cloud Messaging
- [ ] Click "Cloud Messaging" in sidebar
- [ ] Already enabled by default ✓
- [ ] Note: You may need to enable Cloud Messaging API in Google Cloud Console

---

## 📋 Phase 4: Android Configuration (10 min)

### Build Web App
- [ ] Run: `npm run build`
- [ ] Verify `dist/` folder created
- [ ] No errors in build

### Sync to Android
- [ ] Run: `npm run cap:sync`
- [ ] Verify no errors
- [ ] Check `android/app/src/main/assets/public/` exists

### Configure Android Studio
- [ ] Set ANDROID_HOME environment variable (if not set)
  - Windows: Search "environment variables"
  - Mac/Linux: Add to `.bash_profile` or `.zshrc`
  
- [ ] Accept Android SDK licenses:
  ```bash
  cd android
  ./gradlew --stop
  cd ..
  ```

---

## 📋 Phase 5: Build & Test (15 min)

### Open in Android Studio
- [ ] Run: `npm run android:open`
- [ ] Android Studio opens
- [ ] Wait for Gradle sync (bottom right corner)
- [ ] Resolve any errors in Logcat

### Verify Configuration
- [ ] Check `google-services.json` is in `android/app/`
- [ ] Check package name in `AndroidManifest.xml`: `com.newsrobo.app`
- [ ] Check all required files exist:
  - [ ] `android/build.gradle`
  - [ ] `android/app/build.gradle`
  - [ ] `android/variables.gradle`
  - [ ] `android/app/src/main/AndroidManifest.xml`

### Build Debug APK
- [ ] In Android Studio: **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
- [ ] Wait for build (1-3 minutes)
- [ ] Build successful (check bottom right notification)
- [ ] Click "locate" to find APK
- [ ] APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

### Test on Device

#### USB Method
- [ ] Enable Developer Options on Android phone:
  - Settings → About Phone
  - Tap "Build number" 7 times
  
- [ ] Enable USB Debugging:
  - Settings → Developer Options
  - Enable "USB debugging"
  
- [ ] Connect phone via USB cable
- [ ] Allow USB debugging on phone when prompted
- [ ] In Android Studio, click green ▶️ Run button
- [ ] Select your device from list
- [ ] App installs and opens
- [ ] Test all features

#### APK Method
- [ ] Transfer `app-debug.apk` to phone (email, Drive, USB, etc.)
- [ ] On phone, find APK file
- [ ] Allow "Install from unknown sources" if prompted
- [ ] Click Install
- [ ] Open app
- [ ] Test all features

---

## 📋 Phase 6: Customization (20 min)

### App Icon
- [ ] Create 512x512px icon with NEWS ROBO logo
- [ ] Use icon generator: https://romannurik.github.io/AndroidAssetStudio/
- [ ] Download all sizes
- [ ] Replace icons in:
  - [ ] `android/app/src/main/res/mipmap-hdpi/ic_launcher.png`
  - [ ] `android/app/src/main/res/mipmap-mdpi/ic_launcher.png`
  - [ ] `android/app/src/main/res/mipmap-xhdpi/ic_launcher.png`
  - [ ] `android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png`
  - [ ] `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png`

### Splash Screen
- [ ] Create 2732x2732px image
  - Background: #D32F2F (red)
  - Center: NEWS ROBO logo
- [ ] Save as: `android/app/src/main/res/drawable/splash.png`
- [ ] Verify splash config in `capacitor.config.ts`

### App Details
- [ ] Edit `android/app/src/main/res/values/strings.xml`
  - [ ] Set app_name: "NEWS ROBO"
  - [ ] Verify package_name: "com.newsrobo.app"
  
- [ ] Edit `android/app/build.gradle`
  - [ ] Set versionCode: 1
  - [ ] Set versionName: "1.0.0"

---

## 📋 Phase 7: Testing Checklist (30 min)

### Functionality Tests
- [ ] **App Launch**
  - [ ] Splash screen displays correctly
  - [ ] App doesn't crash on startup
  - [ ] Main screen loads

- [ ] **News Feed**
  - [ ] News articles load
  - [ ] Vertical flip gesture works
  - [ ] Images load correctly
  - [ ] Category badges show

- [ ] **User Actions**
  - [ ] Like/dislike works
  - [ ] Comments section opens
  - [ ] Share functionality works
  - [ ] Bookmark saves

- [ ] **Language Selector**
  - [ ] Opens language menu
  - [ ] All 8+ languages listed
  - [ ] Switching language works

- [ ] **Location Selector**
  - [ ] Opens location menu
  - [ ] Can select State/District/Mandal/Village
  - [ ] Location updates

- [ ] **Reporter System**
  - [ ] Camera icon visible
  - [ ] Clicking shows reporter login
  - [ ] Can register new reporter
  - [ ] Application form submits
  - [ ] Login works for approved reporters
  - [ ] Camera opens after login
  - [ ] Photo upload works

- [ ] **Admin Panel**
  - [ ] Admin login works (admin@newsrobo.com / admin123)
  - [ ] Dashboard loads
  - [ ] All tabs accessible
  - [ ] Reporter applications visible
  - [ ] Can approve/reject reporters
  - [ ] Reporter data shows by location
  - [ ] Logout works

- [ ] **Permissions**
  - [ ] Camera permission requested
  - [ ] Location permission requested
  - [ ] Storage permission requested
  - [ ] All permissions work after granted

### Performance Tests
- [ ] App opens in < 3 seconds
- [ ] News scrolling is smooth
- [ ] No lag when switching tabs
- [ ] Images load reasonably fast
- [ ] No memory leaks (check in Android Studio Profiler)

### Device Tests
- [ ] Works on Android 7.0+ (API 24+)
- [ ] Works on different screen sizes
- [ ] Works in portrait orientation
- [ ] Works in landscape orientation (if applicable)
- [ ] Back button works correctly
- [ ] Home button works correctly

---

## 📋 Phase 8: Production Build (30 min)

### Generate Keystore
- [ ] Navigate to android/app: `cd android/app`
- [ ] Generate keystore:
  ```bash
  keytool -genkey -v -keystore newsrobo-release.keystore -alias newsrobo -keyalg RSA -keysize 2048 -validity 10000
  ```
- [ ] Enter password (SAVE THIS!)
- [ ] Enter your details
- [ ] Keystore created: `newsrobo-release.keystore`
- [ ] **BACKUP THIS FILE!** You'll need it for ALL future updates

### Sign APK
- [ ] In Android Studio: **Build** → **Generate Signed Bundle / APK**
- [ ] Select **APK**
- [ ] Click "Create new..."
- [ ] Key store path: Browse to `newsrobo-release.keystore`
- [ ] Enter password
- [ ] Key alias: newsrobo
- [ ] Enter key password
- [ ] Click "Next"
- [ ] Select **release** build variant
- [ ] Check **V1** and **V2** signatures
- [ ] Click "Finish"
- [ ] Wait for build
- [ ] Signed APK: `android/app/build/outputs/apk/release/app-release.apk`

### Test Signed APK
- [ ] Install signed APK on device
- [ ] Test ALL features again
- [ ] Verify no crashes
- [ ] Check app size (should be reasonable)

---

## 📋 Phase 9: Play Store Assets (60 min)

### Required Assets

#### App Icon (High Res)
- [ ] Create 512x512px PNG
- [ ] Transparent background or white
- [ ] NEWS ROBO logo centered
- [ ] Save as: `playstore-icon.png`

#### Feature Graphic
- [ ] Create 1024x500px image
- [ ] NEWS ROBO branding
- [ ] Catchy tagline
- [ ] Save as: `feature-graphic.png`

#### Screenshots (Phone)
- [ ] Take at least 2 screenshots (1080x1920 or similar)
  - [ ] Screenshot 1: News feed
  - [ ] Screenshot 2: Admin panel or Reporter form
  - [ ] Screenshot 3: Language selector (optional)
  - [ ] Screenshot 4: Location selector (optional)

#### Screenshots (Tablet) - Optional
- [ ] Take 1-2 screenshots on 7" or 10" tablet

#### App Description
- [ ] **Short description** (80 chars max):
  ```
  Hyperlocal multilingual news for India. Flip-to-read news like TikTok!
  ```

- [ ] **Full description** (4000 chars max):
  ```
  📰 NEWS ROBO - India's First Vertical Flip-to-Read News App
  
  Get hyperlocal news in 8+ regional languages with a unique vertical 
  flip gesture, just like TikTok but for news!
  
  🌍 HYPERLOCAL NEWS
  News from your exact location - State, District, Mandal, even Village level!
  
  🗣️ 8+ LANGUAGES
  English, Hindi, Telugu, Tamil, Kannada, Malayalam, Bengali, Marathi, 
  Gujarati and more!
  
  📸 CITIZEN JOURNALISM
  Become a verified reporter and submit local news with photos/videos
  
  ✅ TRUST SCORE
  Every news article has a trust score for credibility
  
  📱 MODERN UI
  Glassmorphism, dark mode, micro-interactions - designed for 2026!
  
  Download NOW and stay informed! 🚀
  ```

- [ ] **What's New** (500 chars):
  ```
  🎉 First Release - v1.0.0
  
  ✅ Vertical flip-to-read gesture
  ✅ 8+ regional languages
  ✅ Hyperlocal news down to village level
  ✅ Citizen journalism portal
  ✅ Admin and reporter systems
  ✅ Trust score for every article
  ✅ Dark mode optimized
  
  More features coming soon!
  ```

#### Privacy Policy
- [ ] Create privacy policy URL
  - Use generator: https://www.privacypolicygenerator.info/
  - Host on your website or GitHub Pages
  - Must include: data collection, usage, third-party services
- [ ] Privacy policy URL: ________________

#### Contact Details
- [ ] Developer email: ________________
- [ ] Developer website (optional): ________________
- [ ] Support phone (optional): ________________

---

## 📋 Phase 10: Google Play Console (45 min)

### Create Account
- [ ] Go to https://play.google.com/console/signup
- [ ] Pay $25 registration fee (one-time)
- [ ] Complete developer profile
- [ ] Verify email address

### Create App
- [ ] In Play Console, click "Create app"
- [ ] App name: **NEWS ROBO**
- [ ] Default language: **English (United States)**
- [ ] App or game: **App**
- [ ] Free or paid: **Free**
- [ ] Accept declarations
- [ ] Click "Create app"

### Complete Setup

#### Store Presence
- [ ] **Main store listing**
  - [ ] App name: NEWS ROBO
  - [ ] Short description: (paste from above)
  - [ ] Full description: (paste from above)
  - [ ] Upload app icon (512x512)
  - [ ] Upload feature graphic (1024x500)
  - [ ] Upload phone screenshots (at least 2)
  - [ ] Upload tablet screenshots (optional)
  - [ ] App category: **News & Magazines**
  - [ ] Contact email: (your email)
  - [ ] Privacy policy URL: (your URL)
  - [ ] Click "Save"

#### Store Settings
- [ ] **App access**
  - [ ] All features available without restrictions
  - [ ] Or: Specify restricted features
  - [ ] Click "Save"

- [ ] **Ads**
  - [ ] Select: "Yes, my app contains ads" (if you have ads)
  - [ ] Or: "No, my app does not contain ads"
  - [ ] Click "Save"

#### Content Ratings
- [ ] Click "Start questionnaire"
- [ ] Select category: **News**
- [ ] Answer all questions honestly
- [ ] Submit
- [ ] Get rating
- [ ] Click "Apply rating"

#### Target Audience
- [ ] Select target age groups:
  - [ ] 13+ recommended for news app
- [ ] Specify if app appeals to children
- [ ] Click "Save"

- [ ] **App content**
  - [ ] Complete "Privacy policy" section
  - [ ] Complete "App access" section
  - [ ] Complete "Ads" section
  - [ ] Complete "Content ratings" section
  - [ ] Complete "Target audience" section
  - [ ] Complete "News apps" section (if applicable)

#### Data Safety
- [ ] Complete data safety form
  - [ ] List data collected (emails, names, locations, etc.)
  - [ ] Specify data usage
  - [ ] Security practices
  - [ ] Data deletion policy
- [ ] Submit

### Upload APK
- [ ] **Production** → **Create new release**
- [ ] Upload `app-release.apk`
- [ ] Or build AAB:
  ```bash
  # In Android Studio
  Build → Generate Signed Bundle / APK → Android App Bundle → Release
  ```
- [ ] Upload AAB file (recommended over APK)
- [ ] Enter release name: "1.0.0"
- [ ] Enter release notes: (paste from "What's New" above)
- [ ] Click "Save"

### Review & Publish
- [ ] Check all sections have green checkmarks
- [ ] Fix any errors (red marks)
- [ ] Review submission
- [ ] Click "Submit for review"
- [ ] Wait 1-3 days for approval

---

## 📋 Phase 11: Post-Launch (Ongoing)

### Monitor
- [ ] Check Play Console daily for reviews
- [ ] Monitor crash reports in Firebase
- [ ] Check analytics in Firebase Analytics
- [ ] Respond to user reviews

### Marketing
- [ ] Share on social media
- [ ] Create demo video
- [ ] Post on Product Hunt
- [ ] Contact tech bloggers
- [ ] Create landing page

### Updates
- [ ] Fix bugs reported by users
- [ ] Add requested features
- [ ] Improve performance
- [ ] Release updates regularly

---

## ✅ Final Checklist

Before submitting to Play Store, ensure:

- [ ] App installs without errors
- [ ] All features work correctly
- [ ] No crashes or bugs
- [ ] Tested on multiple devices
- [ ] Tested on multiple Android versions
- [ ] All permissions work
- [ ] Firebase integration works
- [ ] Admin panel accessible
- [ ] Reporter system functional
- [ ] Good app performance
- [ ] Smooth animations
- [ ] Professional appearance
- [ ] Privacy policy created
- [ ] All Play Store assets ready
- [ ] Signed APK/AAB created
- [ ] Keystore backed up securely

---

## 🎉 CONGRATULATIONS!

If you've checked all boxes, your NEWS ROBO Android app is ready!

### What's Next?
1. ✅ Submit to Google Play Store
2. ✅ Wait for approval (1-3 days)
3. ✅ App goes live!
4. ✅ Users can download
5. ✅ Monitor and improve

---

## 📞 Need Help?

**Documentation:**
- START_HERE.md
- README_ANDROID.md
- QUICK_START_ANDROID.md
- android-setup.md

**Resources:**
- Capacitor: https://capacitorjs.com/docs
- Firebase: https://firebase.google.com/docs
- Play Console: https://support.google.com/googleplay/android-developer

---

**Good luck with your launch! 🚀📱🎊**

---

### Print This Checklist
Save this file and print it out for easy reference during setup!

*Last updated: 2026*
