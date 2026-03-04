# 🔧 UPDATE ANDROID PERMISSIONS FOR GPS

## **CRITICAL: YOU MUST UPDATE AndroidManifest.xml**

---

## **📁 FILE TO EDIT:**

```
android/app/src/main/AndroidManifest.xml
```

---

## **✏️ WHAT TO ADD:**

Add these 3 lines **AFTER** the `<uses-permission android:name="android.permission.INTERNET" />` line:

```xml
<!-- GPS Permissions for Geolocation -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" android:required="false" />
```

---

## **📝 STEP-BY-STEP:**

### **1. Open File:**
Navigate to: `android/app/src/main/AndroidManifest.xml` in Android Studio

### **2. Find This Section:**
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
```

### **3. Change To:**
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />
    
    <!-- GPS Permissions for Geolocation -->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-feature android:name="android.hardware.location.gps" android:required="false" />

    <application
```

---

## **💾 AFTER EDITING:**

### **1. Save the file**

### **2. Sync Capacitor:**
```bash
npm run build
npx cap sync android
```

### **3. Rebuild APK:**
```bash
cd android
.\gradlew.bat assembleDebug
```

---

## **✅ VERIFY:**

After rebuilding, when you click "📍 Use My Current Location", Android should ask for permission!

---

## **🎯 WHAT EACH PERMISSION DOES:**

1. **ACCESS_FINE_LOCATION** - High accuracy GPS (uses GPS chip)
2. **ACCESS_COARSE_LOCATION** - Low accuracy GPS (uses cell towers/WiFi)
3. **android.hardware.location.gps** - Declares GPS feature (optional)

---

**This is the ONLY manual step required! Everything else is done!** 🚀
