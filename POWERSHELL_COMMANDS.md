# 🚀 POWERSHELL COMMANDS FOR APK BUILD

## ❌ **THE ERROR YOU SAW:**

```powershell
cd android && .\gradlew assembleDebug && cd ..
```

**Error:**
```
The token '&&' is not a valid statement separator in this version.
```

---

## ✅ **WHY IT HAPPENED:**

`&&` is **bash/cmd syntax**, not PowerShell!

**PowerShell uses semicolons (;) instead of &&**

---

## 🎯 **CORRECT POWERSHELL SYNTAX:**

### **Option 1: Separate Commands (Recommended)**

```powershell
# You're already in android folder, so just run:
.\gradlew clean
.\gradlew assembleDebug
```

---

### **Option 2: Use Semicolons**

```powershell
# From project root:
cd android; .\gradlew clean; .\gradlew assembleDebug; cd ..
```

---

### **Option 3: Use -and or line breaks**

```powershell
# Multiple lines:
cd android
.\gradlew clean
.\gradlew assembleDebug
cd ..
```

---

## 🚀 **QUICK BUILD COMMANDS:**

### **Since you're already in the android folder:**

```powershell
# Just run these two commands:
.\gradlew clean
.\gradlew assembleDebug
```

**Wait 5-15 minutes → Get APK!**

---

### **If you're in the project root (N_R_APP):**

```powershell
# Navigate to android folder first:
cd android

# Then build:
.\gradlew clean
.\gradlew assembleDebug

# Go back to root:
cd ..
```

---

### **Complete build from project root:**

```powershell
npm run build
npx cap sync android
cd android
.\gradlew clean
.\gradlew assembleDebug
cd ..
```

---

## 📋 **POWERSHELL BUILD METHODS:**

### **Method 1: PowerShell Script (Easiest)**

```powershell
# Run the PowerShell script I created:
.\BUILD_APK_POWERSHELL.ps1
```

**If you get "execution policy" error:**
```powershell
# Allow script execution:
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# Then run:
.\BUILD_APK_POWERSHELL.ps1
```

---

### **Method 2: Batch File (Alternative)**

```batch
# Just double-click in Windows Explorer:
BUILD_APK_NOW.bat
```

This uses CMD syntax, not PowerShell, so it works!

---

### **Method 3: Manual Commands**

```powershell
# From project root (N_R_APP):
npm run build
npx cap sync android
cd android
.\gradlew clean
.\gradlew assembleDebug
cd ..
```

---

## 🎯 **YOUR CURRENT SITUATION:**

You're here:
```
PS C:\Users\MY PC\Desktop\N_R_APP\android>
```

**Just run:**
```powershell
.\gradlew assembleDebug
```

**Or for clean build:**
```powershell
.\gradlew clean
.\gradlew assembleDebug
```

---

## 📊 **UNDERSTANDING GRADLE COMMANDS:**

### **Basic Commands:**

```powershell
# Clean previous builds (removes old files)
.\gradlew clean

# Build debug APK (unsigned, for testing)
.\gradlew assembleDebug

# Build release APK (signed, for production)
.\gradlew assembleRelease

# Clean and build in one go
.\gradlew clean assembleDebug
```

### **Useful Options:**

```powershell
# Show detailed error messages
.\gradlew assembleDebug --stacktrace

# Show all logs
.\gradlew assembleDebug --info

# Show debug logs
.\gradlew assembleDebug --debug

# Refresh dependencies
.\gradlew assembleDebug --refresh-dependencies

# Build offline (no internet needed)
.\gradlew assembleDebug --offline
```

---

## 🔧 **TROUBLESHOOTING COMMANDS:**

### **Check Gradle Version:**

```powershell
.\gradlew --version
```

### **List Available Tasks:**

```powershell
.\gradlew tasks
```

### **Check Dependencies:**

```powershell
.\gradlew dependencies
```

### **Clean Everything:**

```powershell
# Clean build
.\gradlew clean

# Delete .gradle folder
Remove-Item -Recurse -Force .gradle

# Clean and rebuild
.\gradlew clean assembleDebug --refresh-dependencies
```

---

## 📁 **NAVIGATION COMMANDS:**

### **Check Current Directory:**

```powershell
pwd
# or
Get-Location
```

### **List Files:**

```powershell
dir
# or
ls
# or
Get-ChildItem
```

### **Navigate to Project Root:**

```powershell
cd C:\Users\MY PC\Desktop\N_R_APP
```

### **Navigate to Android Folder:**

```powershell
cd android
```

### **Go Back One Level:**

```powershell
cd ..
```

---

## 🚀 **RECOMMENDED WORKFLOW:**

### **From Android Folder (where you are now):**

```powershell
# 1. Clean previous builds
.\gradlew clean

# 2. Build APK
.\gradlew assembleDebug

# 3. Find APK
dir app\build\outputs\apk\debug\app-debug.apk

# 4. Open folder
explorer app\build\outputs\apk\debug
```

---

### **From Project Root:**

```powershell
# 1. Build web app
npm run build

# 2. Sync to Android
npx cap sync android

# 3. Navigate to Android
cd android

# 4. Clean
.\gradlew clean

# 5. Build APK
.\gradlew assembleDebug

# 6. Go back
cd ..
```

---

## 🎯 **QUICK REFERENCE:**

| Bash/CMD | PowerShell | What it does |
|----------|-----------|--------------|
| `cmd1 && cmd2` | `cmd1; cmd2` | Run commands in sequence |
| `cd dir && cmd` | `cd dir; cmd` | Change dir and run command |
| `ls` | `dir` or `ls` | List files |
| `cat file` | `type file` or `Get-Content file` | Read file |
| `rm file` | `del file` or `Remove-Item file` | Delete file |

---

## 💡 **PRO TIPS:**

### **1. Tab Completion:**

Type `.\grad` and press **Tab** → completes to `.\gradlew`

### **2. Command History:**

Press **↑** (up arrow) to see previous commands

### **3. Copy from PowerShell:**

Select text → Right-click (auto-copies)

### **4. Paste into PowerShell:**

Right-click in PowerShell window

### **5. Clear Screen:**

```powershell
cls
# or
Clear-Host
```

---

## ✅ **WHAT TO DO RIGHT NOW:**

Since you're already in the android folder:

```powershell
# Just run this:
.\gradlew assembleDebug
```

**Or if you want a clean build:**

```powershell
.\gradlew clean
.\gradlew assembleDebug
```

**Wait 5-15 minutes, then get your APK!**

---

## 📍 **APK LOCATION:**

After build completes:

```
C:\Users\MY PC\Desktop\N_R_APP\android\app\build\outputs\apk\debug\app-debug.apk
```

**From android folder, open it:**

```powershell
explorer app\build\outputs\apk\debug
```

---

## 🎁 **ALTERNATIVE BUILD METHODS:**

### **Option 1: Use PowerShell Script**

```powershell
# First go back to project root:
cd ..

# Then run:
.\BUILD_APK_POWERSHELL.ps1
```

### **Option 2: Use Batch File**

```batch
# Go back to project root:
cd ..

# Double-click in Explorer:
BUILD_APK_NOW.bat
```

### **Option 3: Use Android Studio**

```powershell
# Go back to project root:
cd ..

# Open Android Studio:
npx cap open android

# Then in Android Studio: Build → Build APK(s)
```

---

## 🆘 **COMMON ERRORS & FIXES:**

### **"gradlew is not recognized"**

**You're not in android folder!**

```powershell
# Check where you are:
pwd

# Go to android folder:
cd android

# Then try again:
.\gradlew assembleDebug
```

---

### **"SDK location not found"**

**Create local.properties:**

```powershell
# Create file:
New-Item -Path "local.properties" -ItemType File

# Add content:
Set-Content local.properties "sdk.dir=C:\\Users\\MY PC\\AppData\\Local\\Android\\Sdk"
```

---

### **"Permission denied"**

**Make gradlew executable:**

```powershell
# This is usually automatic on Windows, but if needed:
icacls gradlew /grant Everyone:F
```

---

### **"Build failed" with no clear error**

**Try clean build:**

```powershell
.\gradlew clean --refresh-dependencies
.\gradlew assembleDebug --stacktrace --info
```

---

## 📚 **DOCUMENTATION:**

For more help, check these files:

- `POWERSHELL_COMMANDS.md` - This file
- `GRADLE_ERROR_FIXED.md` - Gradle fixes
- `APK_BUILD_TROUBLESHOOTING.md` - All errors
- `COMPLETE_APK_BUILD_GUIDE.md` - Full guide

---

## 🎯 **SUMMARY:**

### **You're here:**
```
PS C:\Users\MY PC\Desktop\N_R_APP\android>
```

### **Just run:**
```powershell
.\gradlew assembleDebug
```

### **Wait:**
5-15 minutes

### **Get APK:**
```
app\build\outputs\apk\debug\app-debug.apk
```

---

## 🚀 **BUILD NOW!**

**Copy and paste this command:**

```powershell
.\gradlew clean; .\gradlew assembleDebug
```

**Or run separately:**

```powershell
.\gradlew clean
.\gradlew assembleDebug
```

**Then get your APK and install on phone!** 🎉

---

**Happy building!** 😊

**Your NEWS ROBO APK is almost ready!** ✨
