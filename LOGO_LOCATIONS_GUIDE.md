# 🎨 NEWS ROBO LOGO LOCATIONS GUIDE

## 📍 **ALL LOGO LOCATIONS IN YOUR CODE**

---

## **1. 🖼️ IMAGE LOGO (PNG)**

### **Location:** 
```
/src/app/components/NewsRoboLogo.tsx
```

### **Code:**
```tsx
import logoImage from 'figma:asset/5819481f86eae6047fadae2be62c5eb64205594b.png';

export function NewsRoboLogo({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <img 
      src={logoImage} 
      alt="NEWS ROBO Logo" 
      className={className}
    />
  );
}
```

### **Used In:**
1. **News Cards** (`NewsFlipCard.tsx` line 152, 199)
2. **Headers and UI Components**

### **Asset Reference:**
- **Figma Asset ID:** `5819481f86eae6047fadae2be62c5eb64205594b.png`
- **Type:** PNG Image
- **Import:** Virtual module `figma:asset/...`

---

## **2. 📝 TEXT LOGO (NEWS + ROBO)**

### **Branding Guidelines:**
> **"NEWS" text in RED (#D32F2F) with WHITE background**  
> **"ROBO" text in BLUE**

### **Where Used:**

#### **A. News Cards - Top Source Badge**
**File:** `/src/app/components/NewsFlipCard.tsx` (Line 152-153)

```tsx
<div className="flex items-center gap-1.5">
  <NewsRoboLogo className="h-4 w-4" />
  <span className="text-[#D32F2F] font-bold text-xs">NEWS ROBO</span>
</div>
```

**Display:** 🖼️ [Logo] NEWS ROBO (red text)

---

#### **B. News Cards - Center Logo Badge**
**File:** `/src/app/components/NewsFlipCard.tsx` (Line 197-200)

```tsx
{/* Logo - Positioned at boundary between text and black bar */}
<div className="absolute bottom-[3vh] left-1/2 -translate-x-1/2 z-40">
  <div className="relative w-16 h-16 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white flex items-center justify-center">
    <NewsRoboLogo className="w-12 h-12" />
  </div>
</div>
```

**Display:** Large circular logo badge in center

---

#### **C. Profile Menu Header**
**File:** `/src/app/components/ProfileMenu.tsx` (Line 205-206)

```tsx
<div>
  <h2 className="text-white font-bold text-xl">Menu</h2>
  <p className="text-white/80 text-sm mt-0.5">NEWS ROBO</p>
</div>
```

**Display:** White text on red gradient background

---

#### **D. Profile Menu Footer**
**File:** `/src/app/components/ProfileMenu.tsx` (Line 367)

```tsx
<p className="text-center text-[#212121]/50 text-xs">
  NEWS ROBO v2.0 © 2026
</p>
```

**Display:** Gray text, version info

---

#### **E. Admin Panel Header**
**File:** `/src/app/components/AdminPanel.tsx` (Line 192)

```tsx
<div>
  <h1 className="text-2xl font-bold">NEWS ROBO</h1>
  <p className="text-white/80 text-sm">Admin Control Panel</p>
</div>
```

**Display:** White text on gradient background

---

#### **F. Admin Sidebar**
**File:** `/src/app/components/admin/Sidebar.tsx` (Line 77)

```tsx
{!isCollapsed && (
  <div>
    <h1 className="text-xl font-bold text-[#D32F2F]">NEWS ROBO</h1>
    <p className="text-xs text-gray-400">Admin Panel</p>
  </div>
)}
```

**Display:** Red text logo

---

## **3. 🎯 APP ICON (SVG)**

### **Location:**
```
/public/icon.svg
```

### **Code:**
```svg
<svg width="192" height="192" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="192" height="192" fill="#D32F2F"/>
  
  <!-- NEWS text in white box -->
  <rect x="20" y="50" width="70" height="40" fill="white" rx="4"/>
  <text x="55" y="78" font-family="Arial, sans-serif" font-size="20" 
        font-weight="bold" fill="#D32F2F" text-anchor="middle">NEWS</text>
  
  <!-- ROBO text -->
  <text x="140" y="78" font-family="Arial, sans-serif" font-size="20" 
        font-weight="bold" fill="#2196F3" text-anchor="middle">ROBO</text>
  
  <!-- Decorative element -->
  <circle cx="96" cy="120" r="30" fill="#FFC107" opacity="0.9"/>
  <path d="M 96 100 L 111 120 L 96 140 L 81 120 Z" fill="#212121"/>
</svg>
```

### **Branding Compliance:**
✅ **"NEWS"** - Red text (#D32F2F) on white background  
✅ **"ROBO"** - Blue text (#2196F3)  
✅ Red background (#D32F2F)  
✅ Yellow accent (#FFC107)  

### **Used For:**
- Web app favicon
- PWA icon
- Browser tab icon
- Manifest icon reference

---

## **4. 🤖 ANDROID APP ICON**

### **Location:**
```
android/app/src/main/res/
  ├── mipmap-hdpi/ic_launcher.png
  ├── mipmap-mdpi/ic_launcher.png
  ├── mipmap-xhdpi/ic_launcher.png
  ├── mipmap-xxhdpi/ic_launcher.png
  └── mipmap-xxxhdpi/ic_launcher.png
```

### **How to Update:**

1. **Use Android Asset Studio:**
   - Go to: https://romannurik.github.io/AndroidAssetStudio/
   - Upload your logo PNG or use `icon.svg`
   - Generate all sizes
   - Download and replace files

2. **OR Use This Command:**
   ```bash
   # Generate from icon.svg
   npx @capacitor/assets generate --android
   ```

3. **Manual Generation:**
   - 48x48 (mdpi)
   - 72x72 (hdpi)
   - 96x96 (xhdpi)
   - 144x144 (xxhdpi)
   - 192x192 (xxxhdpi)

### **Current Status:**
Check if icons exist:
```bash
ls -la android/app/src/main/res/mipmap-*/
```

---

## **5. 📱 BRANDING SPECIFICATIONS**

### **Official Colors:**
```css
--primary-red: #D32F2F
--dark-black: #212121
--background: #F5F5F5
--highlight-yellow: #FFC107
--robo-blue: #2196F3
```

### **Logo Usage Rules:**

#### **✅ CORRECT USAGE:**
```
┌──────────┬─────────┐
│   NEWS   │  ROBO   │
│  (RED)   │ (BLUE)  │
│  on      │         │
│  WHITE   │         │
└──────────┴─────────┘
```

#### **❌ INCORRECT:**
- Don't change colors
- Don't separate NEWS from ROBO
- Don't use gradients on text
- Don't rotate or skew

---

## **6. 🔍 QUICK REFERENCE TABLE**

| Location | File | Line | Type | Colors |
|----------|------|------|------|--------|
| Logo Component | `NewsRoboLogo.tsx` | 1-11 | PNG Image | - |
| News Card Top | `NewsFlipCard.tsx` | 152 | Text + Logo | Red text |
| News Card Center | `NewsFlipCard.tsx` | 199 | Logo Image | Full color |
| Profile Menu | `ProfileMenu.tsx` | 206 | Text | White |
| Profile Footer | `ProfileMenu.tsx` | 367 | Text | Gray |
| Admin Header | `AdminPanel.tsx` | 192 | Text | White |
| Admin Sidebar | `admin/Sidebar.tsx` | 77 | Text | Red |
| App Icon | `public/icon.svg` | 1-16 | SVG | Full branding |
| Android Icon | `android/.../res/` | Multiple | PNG | Full branding |

---

## **7. 🎨 HOW TO UPDATE THE LOGO**

### **A. Update PNG Image Logo:**

**Option 1: Replace Figma Asset**
1. Export new logo from Figma
2. Get new asset hash
3. Update in `NewsRoboLogo.tsx`:
```tsx
import logoImage from 'figma:asset/YOUR_NEW_HASH.png';
```

**Option 2: Use Local File**
1. Add logo to `/public/logo.png`
2. Update component:
```tsx
export function NewsRoboLogo({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <img 
      src="/logo.png" 
      alt="NEWS ROBO Logo" 
      className={className}
    />
  );
}
```

### **B. Update SVG Icon:**

1. **Edit:** `/public/icon.svg`
2. **Change colors, text, or design**
3. **Save file**
4. **Clear browser cache** (Ctrl+Shift+R)

### **C. Update Android Icons:**

1. **Create new icon.png (512x512)**
2. **Use Android Asset Studio:**
   ```
   https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html
   ```
3. **Upload your 512x512 logo**
4. **Download generated icons**
5. **Replace files in:**
   ```
   android/app/src/main/res/mipmap-*/ic_launcher.png
   ```
6. **Sync and rebuild:**
   ```bash
   npx cap sync android
   cd android
   .\gradlew.bat assembleDebug
   ```

---

## **8. 🖼️ CREATE CUSTOM TEXT LOGO COMPONENT**

If you want a pure text logo (no image):

```tsx
// /src/app/components/NewsRoboTextLogo.tsx

export function NewsRoboTextLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {/* NEWS - Red on White */}
      <div className="bg-white px-2 py-1 rounded">
        <span className="text-[#D32F2F] font-bold text-lg">NEWS</span>
      </div>
      
      {/* ROBO - Blue */}
      <span className="text-[#2196F3] font-bold text-lg">ROBO</span>
    </div>
  );
}
```

**Usage:**
```tsx
import { NewsRoboTextLogo } from '@/app/components/NewsRoboTextLogo';

<NewsRoboTextLogo className="h-8" />
```

---

## **9. 📂 FILE STRUCTURE**

```
📦 NEWS ROBO Project
├── 📂 src/
│   └── 📂 app/
│       └── 📂 components/
│           └── 📄 NewsRoboLogo.tsx          ← Main Logo Component
│
├── 📂 public/
│   └── 📄 icon.svg                         ← Web App Icon
│
├── 📂 android/
│   └── 📂 app/
│       └── 📂 src/
│           └── 📂 main/
│               └── 📂 res/
│                   ├── 📂 mipmap-mdpi/
│                   │   └── ic_launcher.png  ← 48x48
│                   ├── 📂 mipmap-hdpi/
│                   │   └── ic_launcher.png  ← 72x72
│                   ├── 📂 mipmap-xhdpi/
│                   │   └── ic_launcher.png  ← 96x96
│                   ├── 📂 mipmap-xxhdpi/
│                   │   └── ic_launcher.png  ← 144x144
│                   └── 📂 mipmap-xxxhdpi/
│                       └── ic_launcher.png  ← 192x192
│
└── 📄 figma:asset/5819481f...png           ← Virtual Asset (imported)
```

---

## **10. ✅ LOGO CHECKLIST**

### **Web App:**
- [✅] Logo component exists (`NewsRoboLogo.tsx`)
- [✅] Logo displays in news cards
- [✅] Logo shows in profile menu
- [✅] Logo appears in admin panel
- [✅] SVG icon in public folder
- [✅] Branding colors correct

### **Android App:**
- [?] App icon in all sizes
- [?] Icon follows branding
- [?] Icon visible on launcher
- [?] Icon visible in settings

### **To Check Android Icons:**
```bash
# Open Android project
cd android

# Check if icons exist
ls -la app/src/main/res/mipmap-*/ic_launcher.png
```

If missing, generate them!

---

## **11. 🚀 QUICK ACTIONS**

### **Need to change logo?**
```bash
# 1. Edit the component
nano /src/app/components/NewsRoboLogo.tsx

# 2. Or edit SVG icon
nano /public/icon.svg

# 3. Rebuild
npm run build
```

### **Need to update Android icon?**
```bash
# Generate from SVG
npx @capacitor/assets generate --android

# Or manually replace files in:
# android/app/src/main/res/mipmap-*/ic_launcher.png
```

### **Need to create new icon?**
```bash
# Use online tool:
open https://romannurik.github.io/AndroidAssetStudio/

# Upload your 512x512 logo
# Download generated pack
# Replace files
```

---

## **12. 🎯 SUMMARY**

### **Your Logo Lives In:**

1. **📱 React Component** → `/src/app/components/NewsRoboLogo.tsx`
2. **🌐 Web Icon** → `/public/icon.svg`
3. **🤖 Android Icons** → `android/app/src/main/res/mipmap-*/`
4. **🎨 Figma Asset** → `figma:asset/5819481f...png`

### **Logo Appears:**
- ✅ News cards (top badge)
- ✅ News cards (center circular badge)
- ✅ Profile menu
- ✅ Admin panel
- ✅ Admin sidebar
- ✅ Browser tab (icon.svg)
- ✅ Android launcher (app icons)

### **Branding:**
- ✅ NEWS = Red (#D32F2F) on White
- ✅ ROBO = Blue (#2196F3)
- ✅ Consistent across all locations

---

## **📞 NEED HELP?**

**To update logo:**
1. Replace image in `NewsRoboLogo.tsx`
2. Update `icon.svg` for web
3. Generate new Android icons
4. Rebuild app

**To change branding:**
1. Update colors in components
2. Update SVG icon colors
3. Regenerate Android icons
4. Clear cache and rebuild

---

**ALL LOGO LOCATIONS DOCUMENTED!** ✅🎨

**Ready to customize your branding!** 🚀
