#!/usr/bin/env node

/**
 * Export All Assets Script
 * Runs all export scripts to extract icons, images, and fonts
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.clear();
console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║                                                          ║');
console.log('║         📦 NEWS ROBO - EXPORT ALL ASSETS 📦             ║');
console.log('║                                                          ║');
console.log('║   Extracting Icons, Images, and Fonts...                ║');
console.log('║                                                          ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

// Create main export directory
const exportDir = path.join(process.cwd(), 'assets-export');
if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir, { recursive: true });
  console.log('✅ Created export directory: assets-export/\n');
}

const scripts = [
  { name: 'Icons', file: 'export-icons.js', emoji: '🎨' },
  { name: 'Fonts', file: 'export-fonts.js', emoji: '🔤' },
  { name: 'Images', file: 'export-images.js', emoji: '🖼️' }
];

let successCount = 0;
const results = [];

scripts.forEach((script, index) => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`${script.emoji} STEP ${index + 1}/${scripts.length}: Exporting ${script.name}`);
  console.log(`${'='.repeat(60)}\n`);
  
  try {
    execSync(`node scripts/${script.file}`, { stdio: 'inherit' });
    successCount++;
    results.push({ script: script.name, status: '✅ Success' });
  } catch (error) {
    results.push({ script: script.name, status: '❌ Failed' });
    console.error(`\n❌ Failed to export ${script.name}\n`);
  }
});

// Create master README
const masterReadme = `# NEWS ROBO - Assets Export

All assets have been documented and extracted!

## 📂 Export Structure

\`\`\`
assets-export/
├── icons/
│   └── lucide/
│       ├── README.md
│       ├── icons-list.json
│       ├── download-icons.sh
│       └── [SVG files if lucide-static installed]
├── fonts/
│   ├── README.md
│   ├── fonts-list.json
│   ├── download-links.md
│   └── local-fonts.css
└── images/
    ├── README.md
    ├── image-inventory.json
    └── optimization-guide.md
\`\`\`

## 🎯 What Was Exported

### Icons (${results.find(r => r.script === 'Icons')?.status})
- 50+ Lucide icons used in the app
- SVG format
- Location: \`assets-export/icons/lucide/\`
- See: \`assets-export/icons/lucide/README.md\`

### Fonts (${results.find(r => r.script === 'Fonts')?.status})
- 9 Google Font families
- Support for 10 languages
- Location: \`assets-export/fonts/\`
- See: \`assets-export/fonts/README.md\`

### Images (${results.find(r => r.script === 'Images')?.status})
- Documentation for all image types
- Unsplash, Figma, and static images
- Location: \`assets-export/images/\`
- See: \`assets-export/images/README.md\`

## 📖 Quick Start

### To Get Icons:
1. Read: \`assets-export/icons/lucide/README.md\`
2. Install lucide-static: \`npm install lucide-static\`
3. Re-run: \`npm run export:icons\`
4. Or download from: https://lucide.dev/icons

### To Get Fonts:
1. Read: \`assets-export/fonts/README.md\`
2. Visit links in: \`assets-export/fonts/download-links.md\`
3. Download from Google Fonts
4. Use \`local-fonts.css\` for offline setup

### To Get Images:
1. Read: \`assets-export/images/README.md\`
2. Download project from Figma Make
3. Check \`/public/\` and \`/src/imports/\` folders
4. Copy to \`assets-export/images/\`

## 🔧 Re-run Export

To export assets again:

\`\`\`bash
# Export all assets
npm run export:all

# Or export individually:
npm run export:icons
npm run export:fonts
npm run export:images
\`\`\`

## 📦 Asset Summary

### Icons:
- **Total:** 50+ icons
- **Format:** SVG (React components)
- **Library:** Lucide React
- **License:** ISC (free for commercial use)

### Fonts:
- **Families:** 9
- **Languages:** 10 (English + 9 Indian languages)
- **Weights:** 400, 500, 600, 700
- **License:** SIL Open Font License 1.1

### Images:
- **Unsplash:** Dynamic stock photos
- **Figma:** Design imports
- **Static:** Public folder assets
- **Format:** JPG, PNG, SVG

## 🎨 Brand Assets

### Colors:
- Primary Red: #D32F2F
- Dark Black: #212121
- Background: #F5F5F5
- Highlight: #FFC107

### Logo:
- "NEWS" - Red with white background
- "ROBO" - Blue
- Format: SVG recommended

### Typography:
- Headings: Inter (600/700)
- Body: Inter (400/500)
- Regional: Noto Sans variants

## 📱 Usage in App

All assets are already integrated in the NEWS ROBO app:
- Icons imported from lucide-react
- Fonts loaded from Google Fonts CDN
- Images via Unsplash API and Figma imports

## 🚀 For Production

### Icons:
- ✅ Already optimized as React components
- Keep using lucide-react package

### Fonts:
- Consider downloading for offline use
- Use \`local-fonts.css\` configuration
- Reduces Google Fonts API dependency

### Images:
- Optimize with compression tools
- Use WebP format when possible
- Implement lazy loading (already done)

## 📞 Need Help?

- Icons: See \`assets-export/icons/lucide/README.md\`
- Fonts: See \`assets-export/fonts/README.md\`
- Images: See \`assets-export/images/README.md\`

## ✨ Next Steps

1. Review each asset category's README
2. Download assets as needed
3. Optimize images for production
4. Consider offline font hosting for Android app

---

**Export completed:** ${new Date().toLocaleString()}
**Status:** ${successCount}/${scripts.length} successful
`;

fs.writeFileSync(path.join(exportDir, 'README.md'), masterReadme);

// Create summary report
console.log('\n\n');
console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║                                                          ║');
console.log('║         🎉 ASSET EXPORT COMPLETE! 🎉                    ║');
console.log('║                                                          ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

console.log('📊 Export Summary:\n');
results.forEach(result => {
  console.log(`  ${result.status} - ${result.script}`);
});

console.log(`\n✅ ${successCount}/${scripts.length} exports successful\n`);

console.log('📂 Assets Location:\n');
console.log('  assets-export/');
console.log('  ├── icons/lucide/');
console.log('  ├── fonts/');
console.log('  └── images/\n');

console.log('📖 Documentation:\n');
console.log('  Main Guide:    assets-export/README.md');
console.log('  Icons:         assets-export/icons/lucide/README.md');
console.log('  Fonts:         assets-export/fonts/README.md');
console.log('  Images:        assets-export/images/README.md\n');

console.log('🎯 Quick Actions:\n');
console.log('  1. Read:  assets-export/README.md');
console.log('  2. Icons: Install lucide-static & re-run export');
console.log('  3. Fonts: Download from Google Fonts');
console.log('  4. Images: Check /public/ after downloading project\n');

console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║                                                          ║');
console.log('║  All asset documentation is ready!                       ║');
console.log('║  Check the README files for detailed instructions.      ║');
console.log('║                                                          ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');
