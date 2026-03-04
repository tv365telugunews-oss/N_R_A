# 🎯 MANUAL APK BUILD GUIDE - Step by Step

## Follow these exact commands to build your APK

---

## ✅ STEP 1: Prerequisites

Make sure you have installed:
- [ ] Node.js (https://nodejs.org/)
- [ ] Android Studio (https://developer.android.com/studio)

---

## ✅ STEP 2: Open Terminal/Command Prompt

1. Navigate to your project folder
2. Open Terminal (Mac/Linux) or Command Prompt (Windows)

---

## ✅ STEP 3: Install Dependencies

```bash
npm install
```

**Wait for:** "added XXX packages" message

---

## ✅ STEP 4: Verify Setup

```bash
npm run verify
```

**Expected:** All checkmarks (✅)

---

## ✅ STEP 5: Build Web Application

```bash
npm run build
```

**Wait for:** "✓ built in XXXXms" message
**Look for:** A new `dist` folder should appear

---

## ✅ STEP 6: Initialize Capacitor (First Time Only)

```bash
npx cap init "NEWS ROBO" "com.newsrobo.app" --web-dir=dist
```

**Expected:** "✔ Capacitor initialized" message

---

## ✅ STEP 7: Add Android Platform (First Time Only)

```bash
npx cap add android
```

**Wait for:** This might take 2-3 minutes
**Expected:** A new `android` folder should appear

---

## ✅ STEP 8: Sync to Android

```bash
npx cap sync android
```

**Expected:** "✔ Syncing complete" message

---

## ✅ STEP 9: Open in Android Studio

```bash
npx cap open android
```

**This will automatically open Android Studio**

---

## ✅ STEP 10: Wait for Gradle Sync

In Android Studio (bottom status bar):
- You'll see "Gradle sync" running
- **Wait 5-10 minutes** (first time only)
- Look for "Gradle sync finished" message

**Common issues:**
- If it asks to update Gradle → Click "Update"
- If SDK is missing → Tools → SDK Manager → Install Android SDK

---

## ✅ STEP 11: Build APK

In Android Studio:

1. **Click:** Build (top menu)
2. **Click:** Build Bundle(s) / APK(s)
3. **Click:** Build APK(s)
4. **Wait:** 2-3 minutes for build to complete
5. **Look for:** Notification in bottom-right corner
6. **Click:** "locate" link in notification

---

## ✅ STEP 12: Find Your APK

Your APK file is located at:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

**File size:** ~50-100 MB (approximately)

---

## 🎉 DONE!

You now have your APK file!

### To Install on Phone:
1. Copy `app-debug.apk` to your Android phone
2. Open file manager on phone
3. Tap the APK file
4. Allow "Install from Unknown Sources" if prompted
5. Tap "Install"

---

## ⚠️ Troubleshooting

### Issue: "npm: command not found"
**Fix:** Install Node.js from https://nodejs.org/

### Issue: "Gradle sync failed"
**Fix:** 
- Tools → SDK Manager
- Install "Android SDK Platform 34"
- Install "Android SDK Build-Tools"

### Issue: "SDK location not found"
**Fix:**
- File → Project Structure
- Set Android SDK location (usually: C:\Users\YourName\AppData\Local\Android\Sdk)

### Issue: "Build failed"
**Fix:**
```bash
cd android
./gradlew clean
cd ..
npm run build
npx cap sync android
```

### Issue: "Can't find android folder"
**Fix:** Make sure you ran Step 7 (npx cap add android)

---

## 📞 Still Having Issues?

Run these diagnostic commands:

```bash
npm run verify
npm run android:doctor
```

---

## ⏱️ Time Estimate

| Step | Time |
|------|------|
| Install dependencies | 3-5 min |
| Build web app | 1-2 min |
| Add Android platform | 2-3 min |
| Gradle sync (first time) | 5-10 min |
| Build APK | 2-3 min |
| **TOTAL** | **15-25 min** |

---

## 🚀 For Next Time (After Changes)

After you make changes to your code:

```bash
npm run build
npx cap sync android
npx cap open android
# Then Build → Build APK
```

---

## ✨ You've Got This!

Follow each step carefully and you'll have your APK in ~20 minutes!

**Good luck!** 🎯
