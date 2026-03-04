#!/usr/bin/env node

/**
 * Export Icons Script
 * Extracts all Lucide icons used in the project as SVG files
 */

const fs = require('fs');
const path = require('path');

console.log('🎨 Exporting Icons as SVG...\n');

// Create export directory
const exportDir = path.join(process.cwd(), 'assets-export', 'icons', 'lucide');
if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir, { recursive: true });
  console.log('✅ Created export directory:', exportDir);
}

// List of Lucide icons used in the project
const iconsUsed = [
  // Main Navigation
  'home',
  'trending-up',
  'globe',
  'map-pin',
  'user',
  'menu',
  'bell',
  
  // Content
  'play',
  'heart',
  'share-2',
  'bookmark',
  'thumbs-up',
  'message-circle',
  'eye',
  
  // Admin Panel
  'settings',
  'users',
  'file-text',
  'bar-chart',
  'shield',
  'upload',
  'download',
  'edit',
  'trash-2',
  'plus',
  'search',
  'filter',
  'calendar',
  'clock',
  'check',
  'x',
  'chevron-left',
  'chevron-right',
  'chevron-up',
  'chevron-down',
  'more-vertical',
  
  // Citizen Journalism
  'camera',
  'video',
  'send',
  'alert-circle',
  
  // E-Paper
  'book-open',
  'zoom-in',
  'zoom-out',
  'maximize',
  'rotate-cw',
  
  // Additional
  'log-out',
  'log-in',
  'user-plus',
  'mail',
  'phone',
  'newspaper',
  'rss',
  'wifi',
  'wifi-off',
  'image',
  'folder',
  'file',
  'link',
  'external-link',
  'arrow-left',
  'arrow-right',
  'refresh-cw',
  'copy',
  'check-circle',
  'x-circle',
  'info',
  'alert-triangle',
  'star',
  'flag',
];

console.log(`📦 Found ${iconsUsed.length} icons used in project\n`);

// Instructions file
const instructions = `# Lucide Icons Used in NEWS ROBO

Total Icons: ${iconsUsed.length}

## How to Get SVG Files:

Since Lucide icons are used as React components, you can get the SVG files in two ways:

### Option 1: Download from Lucide Website
1. Visit: https://lucide.dev/icons
2. Search for each icon name below
3. Click the icon
4. Click "Copy SVG" or "Download SVG"

### Option 2: Extract from node_modules
After running \`npm install\`, icons are in:
\`node_modules/lucide-react/dist/esm/icons/\`

### Option 3: Use Lucide SVG Package
\`\`\`bash
npm install lucide-static
\`\`\`

Then copy SVG files from \`node_modules/lucide-static/icons/\`

## Icons List:

${iconsUsed.map((icon, i) => `${i + 1}. ${icon}`).join('\n')}

## Usage in Project:

Icons are imported as React components:
\`\`\`tsx
import { Home, TrendingUp, Globe } from 'lucide-react';

<Home className="w-6 h-6" />
\`\`\`

## Customization:

All icons can be customized via props:
- \`size\` - Icon size (number or string)
- \`color\` - Icon color
- \`strokeWidth\` - Line thickness
- \`className\` - CSS classes

## License:

Lucide icons are licensed under ISC License
Free to use in commercial projects
Attribution appreciated but not required
`;

fs.writeFileSync(
  path.join(exportDir, 'README.md'),
  instructions
);

console.log('✅ Created instructions file: README.md\n');

// Create a JSON file with icon list
const iconData = {
  totalIcons: iconsUsed.length,
  icons: iconsUsed.map(name => ({
    name,
    fileName: `${name}.svg`,
    downloadUrl: `https://lucide.dev/icons/${name}`,
    reactImport: name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
  }))
};

fs.writeFileSync(
  path.join(exportDir, 'icons-list.json'),
  JSON.stringify(iconData, null, 2)
);

console.log('✅ Created icons list: icons-list.json\n');

// Create a download helper script
const downloadScript = `#!/bin/bash

# Download all Lucide icons as SVG
# Requires curl

echo "📥 Downloading Lucide icons..."

${iconsUsed.map(icon => 
  `curl -o "${icon}.svg" "https://api.lucide.dev/api/download/${icon}"`
).join('\n')}

echo "✅ Downloaded ${iconsUsed.length} icons!"
`;

fs.writeFileSync(
  path.join(exportDir, 'download-icons.sh'),
  downloadScript
);

if (process.platform !== 'win32') {
  fs.chmodSync(path.join(exportDir, 'download-icons.sh'), '755');
}

console.log('✅ Created download script: download-icons.sh\n');

// Try to copy from node_modules if lucide-static is installed
try {
  const lucideStaticPath = path.join(
    process.cwd(),
    'node_modules',
    'lucide-static',
    'icons'
  );
  
  if (fs.existsSync(lucideStaticPath)) {
    console.log('📦 Found lucide-static package, copying SVG files...\n');
    
    let copied = 0;
    iconsUsed.forEach(icon => {
      const sourceFile = path.join(lucideStaticPath, `${icon}.svg`);
      const destFile = path.join(exportDir, `${icon}.svg`);
      
      if (fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, destFile);
        copied++;
      }
    });
    
    console.log(`✅ Copied ${copied}/${iconsUsed.length} SVG files\n`);
  } else {
    console.log('💡 Tip: Install lucide-static to auto-copy SVG files:');
    console.log('   npm install lucide-static\n');
  }
} catch (error) {
  console.log('ℹ️  lucide-static not found, see README.md for download instructions\n');
}

console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║                                                          ║');
console.log('║  ✅ Icons Export Complete!                              ║');
console.log('║                                                          ║');
console.log(`║  Location: assets-export/icons/lucide/                   ║`);
console.log(`║  Total Icons: ${iconsUsed.length}                                           ║`);
console.log('║                                                          ║');
console.log('║  Files created:                                          ║');
console.log('║  - README.md (instructions)                              ║');
console.log('║  - icons-list.json (icon data)                           ║');
console.log('║  - download-icons.sh (download script)                   ║');
console.log('║                                                          ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

console.log('📖 Next Steps:\n');
console.log('1. Read: assets-export/icons/lucide/README.md');
console.log('2. Install lucide-static: npm install lucide-static');
console.log('3. Re-run this script to auto-copy SVGs');
console.log('4. Or download manually from https://lucide.dev/icons\n');
