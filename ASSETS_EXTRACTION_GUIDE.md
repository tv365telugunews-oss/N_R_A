# 📦 NEWS ROBO - Assets Extraction Guide

## 🎯 Complete Guide to Export Icons, Images, and Fonts

This guide explains how to extract all assets from your NEWS ROBO project after downloading it to your computer.

---

## 📥 IMPORTANT: Download Project First

Before extracting assets, you must download the project to your computer:
- See **`HOW_TO_DOWNLOAD_PROJECT.md`** for instructions
- Once downloaded, assets will be in specific folders

---

## 🎨 ASSETS IN YOUR PROJECT

### **1. Icons (SVG Format)**

Your project uses icons from two sources:

#### **A) Lucide React Icons (Vector Icons)**
- **Library:** `lucide-react` package
- **Format:** SVG components
- **Location:** Imported dynamically in code
- **Count:** 1000+ icons available

**How to export:**
```bash
# After downloading project, run:
npm run export:icons
```

This will create SVG files in: `assets-export/icons/`

#### **B) Custom SVG Icons**
- **Location:** `/src/imports/` folder (if Figma designs imported)
- **Format:** Already SVG files
- **Naming:** `svg-[hash].tsx` files

---

### **2. Images (PNG Format)**

#### **A) Figma Imported Images**
- **Location:** Referenced via `figma:asset/` scheme
- **Format:** PNG/JPG
- **Type:** Raster images from Figma designs

**These will be in your project after download**

#### **B) Unsplash Images**
- **Source:** Dynamic from Unsplash API
- **Format:** JPG (from web)
- **Type:** Stock photos

**To download used images:**
```bash
npm run export:images
```

---

### **3. Fonts**

Your project uses these fonts:

#### **A) Google Fonts (Web Fonts)**
- **Inter** - Primary UI font
- **Noto Sans Devanagari** - Hindi support
- **Noto Sans Telugu** - Telugu support
- **Noto Sans Tamil** - Tamil support
- **Noto Sans Kannada** - Kannada support
- **Noto Sans Malayalam** - Malayalam support
- **Noto Sans Bengali** - Bengali support
- **Noto Sans Gujarati** - Gujarati support
- **Noto Sans Gurmukhi** - Punjabi support
- **Noto Sans Devanagari** - Marathi support (shared with Hindi)

**Fonts are loaded from Google Fonts CDN**

**To download all fonts:**
```bash
npm run export:fonts
```

This will download TTF/WOFF2 files to: `assets-export/fonts/`

---

## 🛠️ EXTRACTION SCRIPTS

I'll create automated scripts to extract all assets.

---

## 📂 FOLDER STRUCTURE AFTER EXTRACTION

```
assets-export/
├── icons/
│   ├── lucide/
│   │   ├── home.svg
│   │   ├── menu.svg
│   │   ├── user.svg
│   │   ├── settings.svg
│   │   └── ... (all used icons)
│   └── custom/
│       └── ... (custom SVG icons)
├── images/
│   ├── figma/
│   │   └── ... (Figma imported PNGs)
│   └── unsplash/
│       └── ... (Downloaded stock images)
└── fonts/
    ├── Inter/
    │   ├── Inter-Regular.ttf
    │   ├── Inter-Medium.ttf
    │   ├── Inter-Bold.ttf
    │   └── Inter-SemiBold.ttf
    ├── NotoSansDevanagari/
    │   └── ... (Hindi/Marathi font files)
    ├── NotoSansTelugu/
    ├── NotoSansTamil/
    ├── NotoSansKannada/
    ├── NotoSansMalayalam/
    ├── NotoSansBengali/
    ├── NotoSansGujarati/
    └── NotoSansGurmukhi/
```

---

## 🚀 QUICK EXTRACTION COMMANDS

After downloading the project:

```bash
# Extract all assets at once
npm run export:all

# Or extract individually:
npm run export:icons     # Export SVG icons
npm run export:images    # Export PNG images  
npm run export:fonts     # Download fonts
```

---

## 📋 DETAILED EXTRACTION STEPS

### **Step 1: Download Project**
See `HOW_TO_DOWNLOAD_PROJECT.md`

### **Step 2: Install Dependencies**
```bash
npm install
```

### **Step 3: Run Asset Extraction**
```bash
npm run export:all
```

### **Step 4: Find Your Assets**
Check the `assets-export/` folder in your project directory.

---

## 🎨 ICONS USED IN PROJECT

Your NEWS ROBO app uses these Lucide icons:

### **Main Navigation:**
- `Home` - Home icon
- `TrendingUp` - Trending/Buzz section
- `Globe` - Language selector
- `MapPin` - Location selector
- `User` - Profile/Account
- `Menu` - Hamburger menu
- `Bell` - Notifications

### **Content:**
- `Play` - Video play button
- `Heart` - Like/favorite
- `Share2` - Share content
- `Bookmark` - Save for later
- `ThumbsUp` - Upvote
- `MessageCircle` - Comments
- `Eye` - Views count

### **Admin Panel:**
- `Settings` - Settings
- `Users` - User management
- `FileText` - Content management
- `BarChart` - Analytics
- `Shield` - Security
- `Upload` - Upload files
- `Download` - Download
- `Edit` - Edit content
- `Trash2` - Delete
- `Plus` - Add new
- `Search` - Search
- `Filter` - Filter options
- `Calendar` - Date picker
- `Clock` - Time/history
- `Check` - Approve
- `X` - Cancel/close
- `ChevronLeft/Right/Up/Down` - Navigation arrows
- `MoreVertical` - More options menu

### **Citizen Journalism:**
- `Camera` - Photo upload
- `Video` - Video upload
- `Send` - Submit report
- `AlertCircle` - Alerts/warnings

### **E-Paper:**
- `BookOpen` - E-book reader
- `ZoomIn/ZoomOut` - Zoom controls
- `Maximize` - Fullscreen
- `RotateCw` - Rotate page

---

## 🖼️ IMAGES USED IN PROJECT

### **Types:**

1. **News Article Images** - Stock photos from Unsplash
2. **Category Icons** - Custom SVG icons
3. **User Avatars** - Default placeholder images
4. **Video Thumbnails** - For Buzz section
5. **Banner Images** - Hero sections
6. **Logo** - NEWS ROBO branding

---

## 🔤 FONTS CONFIGURATION

### **Font Families Used:**

```css
/* Primary Font */
font-family: 'Inter', sans-serif;

/* Regional Language Fonts */
/* Hindi & Marathi */
font-family: 'Noto Sans Devanagari', sans-serif;

/* Telugu */
font-family: 'Noto Sans Telugu', sans-serif;

/* Tamil */
font-family: 'Noto Sans Tamil', sans-serif;

/* Kannada */
font-family: 'Noto Sans Kannada', sans-serif;

/* Malayalam */
font-family: 'Noto Sans Malayalam', sans-serif;

/* Bengali */
font-family: 'Noto Sans Bengali', sans-serif;

/* Gujarati */
font-family: 'Noto Sans Gujarati', sans-serif;

/* Punjabi */
font-family: 'Noto Sans Gurmukhi', sans-serif;
```

### **Font Weights Used:**
- 400 (Regular)
- 500 (Medium)
- 600 (Semi-Bold)
- 700 (Bold)

---

## 📥 MANUAL EXTRACTION (Without Scripts)

### **Extract Icons Manually:**

1. Navigate to project folder
2. Search for `.tsx` files containing Lucide imports
3. Note which icons are used
4. Visit: https://lucide.dev/icons
5. Download individual SVGs

### **Extract Images Manually:**

1. Check `/public/` folder for static images
2. Check `/src/imports/` for Figma assets
3. Copy PNG files to your assets folder

### **Download Fonts Manually:**

1. Visit: https://fonts.google.com/
2. Search for each font family
3. Download font families
4. Select required weights (400, 500, 600, 700)

---

## 🎯 ICON EXPORT FORMATS

When exporting icons, you can choose formats:

- **SVG** - Recommended for web (scalable, small file size)
- **PNG** - For raster graphics (specify size: 24x24, 48x48, etc.)
- **React Components** - Already in your code via lucide-react

---

## 📦 ASSET OPTIMIZATION TIPS

### **Icons:**
- Keep as SVG for best quality
- Optimize with SVGO if needed
- Use consistent viewBox (24x24)

### **Images:**
- Compress PNGs (use TinyPNG or similar)
- Use WebP format for web (better compression)
- Provide multiple sizes for responsive design

### **Fonts:**
- Use WOFF2 format (best compression)
- Subset fonts (include only needed characters)
- Consider variable fonts for weight flexibility

---

## 🔧 TROUBLESHOOTING

### **Scripts not working?**
```bash
# Make sure dependencies are installed
npm install

# Check if script exists in package.json
cat package.json | grep export
```

### **Can't find certain assets?**
- Check if they're loaded from CDN (fonts, some images)
- Some assets may be dynamically generated
- Figma assets need project to be downloaded first

### **Want to add custom assets?**
- Place in `/public/` folder for static assets
- Use `/src/assets/` for imported assets
- Reference in code using appropriate import method

---

## 📞 NEXT STEPS

1. **Download project** - See `HOW_TO_DOWNLOAD_PROJECT.md`
2. **Run extraction scripts** - `npm run export:all`
3. **Find assets** - In `assets-export/` folder
4. **Use as needed** - For documentation, redesign, etc.

---

## ✨ SUMMARY

```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║  📦 ALL ASSETS WILL BE EXTRACTED TO:                    ║
║                                                          ║
║  assets-export/                                         ║
║  ├── icons/      (SVG files)                            ║
║  ├── images/     (PNG files)                            ║
║  └── fonts/      (TTF/WOFF2 files)                      ║
║                                                          ║
║  Run: npm run export:all                                ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

**All assets are ready to extract once you download the project!**
