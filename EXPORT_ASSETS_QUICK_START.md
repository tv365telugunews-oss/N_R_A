# 📦 Export Assets - Quick Start Guide

## 🎯 How to Export Icons, Images, and Fonts

This guide shows you how to extract all assets from your NEWS ROBO project.

---

## ⚡ FASTEST WAY - One Command

After downloading the project to your computer:

```bash
npm run export:all
```

This will extract:
- ✅ Icons (SVG)
- ✅ Fonts (documentation & download links)
- ✅ Images (documentation & locations)

---

## 📋 Prerequisites

1. **Download project first** - See `HOW_TO_DOWNLOAD_PROJECT.md`
2. **Install Node.js** - Already required for building APK
3. **Open terminal** in project folder

---

## 🎨 Export Individual Asset Types

### Export Icons Only:
```bash
npm run export:icons
```
**Output:** `assets-export/icons/lucide/`
- 50+ Lucide icons used in app
- SVG format
- Download instructions included

### Export Fonts Only:
```bash
npm run export:fonts
```
**Output:** `assets-export/fonts/`
- 9 Google Font families
- Download links for all fonts
- Local hosting configuration

### Export Images Documentation:
```bash
npm run export:images
```
**Output:** `assets-export/images/`
- Complete image documentation
- Locations of all images
- Optimization guides

---

## 📂 What Gets Exported

```
assets-export/
├── icons/
│   └── lucide/
│       ├── README.md              ← How to get icons
│       ├── icons-list.json        ← List of all icons
│       ├── download-icons.sh      ← Download script
│       └── [SVG files]            ← Actual SVGs (if lucide-static installed)
│
├── fonts/
│   ├── README.md                  ← Complete font guide
│   ├── fonts-list.json            ← Font data
│   ├── download-links.md          ← Quick download links
│   └── local-fonts.css            ← Offline font config
│
└── images/
    ├── README.md                  ← Image documentation
    ├── image-inventory.json       ← Image catalog
    └── optimization-guide.md      ← How to optimize images
```

---

## 🎯 Step-by-Step Process

### **Step 1: Download Project**
```bash
# If using GitHub
git clone [your-repository-url]
cd news-robo

# Or extract ZIP file from Figma Make download
```

### **Step 2: Install Dependencies**
```bash
npm install
```

### **Step 3: Export All Assets**
```bash
npm run export:all
```

### **Step 4: Check Output**
```bash
# Open the export folder
cd assets-export

# On Windows
explorer .

# On Mac
open .

# On Linux
xdg-open .
```

---

## 📦 Detailed Asset Information

### **Icons (Lucide React)**

**What you get:**
- List of 50+ icons used in your app
- React component names
- Download instructions
- Actual SVG files (if lucide-static is installed)

**How to get SVG files:**

**Option 1: Install lucide-static**
```bash
npm install lucide-static
npm run export:icons
```
SVG files will be automatically copied!

**Option 2: Download manually**
1. Open: `assets-export/icons/lucide/README.md`
2. Visit: https://lucide.dev/icons
3. Search for each icon name
4. Click "Copy SVG" or "Download SVG"

**Option 3: Use download script**
```bash
cd assets-export/icons/lucide
chmod +x download-icons.sh
./download-icons.sh
```

---

### **Fonts (Google Fonts)**

**What you get:**
- List of 9 font families
- Download links for each font
- Configuration for offline use
- Font weights and variants

**How to download fonts:**

**Option 1: Google Fonts Website**
1. Open: `assets-export/fonts/download-links.md`
2. Click each download link
3. Save ZIP files
4. Extract font files (TTF/WOFF2)

**Option 2: Google Webfonts Helper**
1. Visit: https://gwfh.mranftl.com/fonts
2. Search for font name
3. Select weights (400, 500, 600, 700)
4. Download WOFF2 format

**Fonts included:**
- Inter (English UI)
- Noto Sans Devanagari (Hindi/Marathi)
- Noto Sans Telugu
- Noto Sans Tamil
- Noto Sans Kannada
- Noto Sans Malayalam
- Noto Sans Bengali
- Noto Sans Gujarati
- Noto Sans Gurmukhi (Punjabi)

---

### **Images**

**What you get:**
- Documentation of all image types
- Locations where images are stored
- Optimization guidelines
- Image specifications

**Image sources:**

1. **Unsplash** - Dynamic stock photos
   - Not stored locally
   - Fetched via API
   - See list of common searches in README

2. **Figma imports** - Design assets
   - Location: `/src/imports/` folder
   - Check after downloading project
   - Already in PNG/SVG format

3. **Static assets** - Public images
   - Location: `/public/` folder
   - Copy directly from there

**To extract images:**
```bash
# After downloading project
# Copy Figma imports
cp -r src/imports/* assets-export/images/figma/

# Copy public assets
cp -r public/images/* assets-export/images/static/
```

---

## 🔧 Advanced Options

### Get Only Icon Names (No Download):
```bash
npm run export:icons
cat assets-export/icons/lucide/icons-list.json
```

### Download Specific Font:
```bash
# Open download links file
cat assets-export/fonts/download-links.md

# Or visit directly
open https://fonts.google.com/download?family=Inter
```

### Create Local Font Setup:
```bash
# After downloading fonts to public/fonts/
# Use the generated config
cp assets-export/fonts/local-fonts.css src/styles/
```

---

## 📊 Asset Summary

### Icons:
- **Total:** 50+ icons
- **Format:** SVG (React components via lucide-react)
- **Size:** ~1-2 KB each
- **License:** ISC (free for commercial use)

### Fonts:
- **Families:** 9
- **Total Weights:** 36 (4 weights × 9 families)
- **Format:** TTF, WOFF, WOFF2
- **Total Size:** ~10-15 MB (all fonts, all weights)
- **License:** SIL Open Font License 1.1

### Images:
- **Unsplash:** Dynamic (varies)
- **Figma:** Check `/src/imports/`
- **Static:** Check `/public/`
- **Formats:** JPG, PNG, SVG

---

## ⚠️ Important Notes

### Icons:
- Icons are currently used as React components
- Lucide React package is already installed
- Export creates reference and documentation
- Actual SVG files only if lucide-static installed

### Fonts:
- Currently loaded from Google Fonts CDN
- Export creates download instructions
- For offline use, download and use local-fonts.css
- Useful for Android app deployment

### Images:
- Unsplash images are dynamic (not stored)
- Figma images available after project download
- Static images in /public/ folder
- Export script documents locations

---

## 🎯 Common Use Cases

### "I want all icons as SVG files"
```bash
npm install lucide-static
npm run export:icons
# SVG files will be in: assets-export/icons/lucide/
```

### "I need fonts for offline use"
```bash
npm run export:fonts
# Open: assets-export/fonts/download-links.md
# Download fonts from Google Fonts
# Use: assets-export/fonts/local-fonts.css
```

### "Where are the images?"
```bash
npm run export:images
# Read: assets-export/images/README.md
# Check: /public/ and /src/imports/ folders
```

### "I need everything"
```bash
npm run export:all
# Check: assets-export/ folder
# Read: assets-export/README.md
```

---

## 📖 Documentation Files

After export, read these files:

| File | Purpose |
|------|---------|
| `assets-export/README.md` | Master overview |
| `assets-export/icons/lucide/README.md` | Icon details |
| `assets-export/fonts/README.md` | Font guide |
| `assets-export/images/README.md` | Image documentation |

---

## 🚀 Quick Commands Reference

```bash
# Export everything
npm run export:all

# Export individually
npm run export:icons
npm run export:fonts
npm run export:images

# View exported assets
cd assets-export
ls -la
```

---

## ✨ Summary

```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║  📦 ASSET EXPORT - SIMPLE PROCESS                       ║
║                                                          ║
║  1. Download project                                    ║
║  2. Run: npm install                                    ║
║  3. Run: npm run export:all                             ║
║  4. Check: assets-export/ folder                        ║
║                                                          ║
║  All assets will be documented with instructions!       ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

---

## 📞 Need Help?

- **Icons:** See `assets-export/icons/lucide/README.md`
- **Fonts:** See `assets-export/fonts/README.md`
- **Images:** See `assets-export/images/README.md`
- **General:** See `assets-export/README.md`

**Start here:** Run `npm run export:all` and read the generated README files!
