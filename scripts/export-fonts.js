#!/usr/bin/env node

/**
 * Export Fonts Script
 * Downloads all Google Fonts used in the project
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

console.log('🔤 Exporting Fonts...\n');

// Create export directory
const exportDir = path.join(process.cwd(), 'assets-export', 'fonts');
if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir, { recursive: true });
  console.log('✅ Created export directory:', exportDir);
}

// Google Fonts used in the project
const fonts = [
  {
    family: 'Inter',
    weights: [400, 500, 600, 700],
    description: 'Primary UI font',
    languages: ['English'],
    url: 'https://fonts.google.com/specimen/Inter'
  },
  {
    family: 'Noto Sans Devanagari',
    weights: [400, 500, 600, 700],
    description: 'Hindi and Marathi support',
    languages: ['Hindi', 'Marathi'],
    url: 'https://fonts.google.com/noto/specimen/Noto+Sans+Devanagari'
  },
  {
    family: 'Noto Sans Telugu',
    weights: [400, 500, 600, 700],
    description: 'Telugu language support',
    languages: ['Telugu'],
    url: 'https://fonts.google.com/noto/specimen/Noto+Sans+Telugu'
  },
  {
    family: 'Noto Sans Tamil',
    weights: [400, 500, 600, 700],
    description: 'Tamil language support',
    languages: ['Tamil'],
    url: 'https://fonts.google.com/noto/specimen/Noto+Sans+Tamil'
  },
  {
    family: 'Noto Sans Kannada',
    weights: [400, 500, 600, 700],
    description: 'Kannada language support',
    languages: ['Kannada'],
    url: 'https://fonts.google.com/noto/specimen/Noto+Sans+Kannada'
  },
  {
    family: 'Noto Sans Malayalam',
    weights: [400, 500, 600, 700],
    description: 'Malayalam language support',
    languages: ['Malayalam'],
    url: 'https://fonts.google.com/noto/specimen/Noto+Sans+Malayalam'
  },
  {
    family: 'Noto Sans Bengali',
    weights: [400, 500, 600, 700],
    description: 'Bengali language support',
    languages: ['Bengali'],
    url: 'https://fonts.google.com/noto/specimen/Noto+Sans+Bengali'
  },
  {
    family: 'Noto Sans Gujarati',
    weights: [400, 500, 600, 700],
    description: 'Gujarati language support',
    languages: ['Gujarati'],
    url: 'https://fonts.google.com/noto/specimen/Noto+Sans+Gujarati'
  },
  {
    family: 'Noto Sans Gurmukhi',
    weights: [400, 500, 600, 700],
    description: 'Punjabi language support',
    languages: ['Punjabi'],
    url: 'https://fonts.google.com/noto/specimen/Noto+Sans+Gurmukhi'
  }
];

console.log(`📦 Found ${fonts.length} font families used in project\n`);

// Create README
const readme = `# Fonts Used in NEWS ROBO

Total Font Families: ${fonts.length}

## Font Details:

${fonts.map((font, i) => `
### ${i + 1}. ${font.family}
- **Purpose:** ${font.description}
- **Languages:** ${font.languages.join(', ')}
- **Weights:** ${font.weights.join(', ')} (Regular, Medium, Semi-Bold, Bold)
- **Download:** ${font.url}
`).join('\n')}

## How to Download Fonts:

### Option 1: Google Fonts Website (Recommended)
1. Visit the URL for each font above
2. Click "Download family" button
3. Extract ZIP file
4. Copy TTF or WOFF2 files to your project

### Option 2: Google Fonts API
Use the Google Fonts Helper:
https://gwfh.mranftl.com/fonts

Select each font family and download in your preferred format.

### Option 3: Using google-webfonts-helper
1. Visit: https://gwfh.mranftl.com/fonts
2. Search for font name
3. Select character sets (latin, devanagari, etc.)
4. Select weights (400, 500, 600, 700)
5. Download WOFF2 files

## Current Implementation:

Fonts are loaded from Google Fonts CDN via:
\`/src/styles/fonts.css\`

\`\`\`css
${fonts.map(font => `@import url('https://fonts.googleapis.com/css2?family=${font.family.replace(/ /g, '+')}:wght@${font.weights.join(';')}&display=swap');`).join('\n')}
\`\`\`

## Font Formats:

- **WOFF2** - Best for web (smallest file size, modern browsers)
- **WOFF** - Fallback for older browsers
- **TTF** - Original format (larger file size)
- **OTF** - OpenType format (similar to TTF)

## Recommended Setup:

For offline/Android app use:
1. Download WOFF2 format for all fonts
2. Place in \`public/fonts/\` folder
3. Update \`fonts.css\` to use local files:

\`\`\`css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
\`\`\`

## License:

- **Inter:** SIL Open Font License 1.1
- **Noto Sans (all variants):** SIL Open Font License 1.1

All fonts are free for commercial use.

## File Sizes (Approximate):

- Inter (all weights): ~500 KB
- Each Noto Sans variant: ~200-400 KB per weight
- Total (all fonts, all weights): ~10-15 MB

## Character Sets:

Each Noto Sans font includes:
- Complete Unicode support for its language
- Latin characters (English)
- Numbers and punctuation
- Currency symbols

## Weight Mapping:

- 400 = Regular (normal text)
- 500 = Medium (slightly emphasized)
- 600 = Semi-Bold (headings, emphasis)
- 700 = Bold (strong emphasis)

## Usage in Code:

\`\`\`css
/* English text */
font-family: 'Inter', sans-serif;

/* Hindi/Marathi text */
font-family: 'Noto Sans Devanagari', sans-serif;

/* Auto-detect based on language prop */
.lang-hi { font-family: 'Noto Sans Devanagari', sans-serif; }
.lang-te { font-family: 'Noto Sans Telugu', sans-serif; }
.lang-ta { font-family: 'Noto Sans Tamil', sans-serif; }
.lang-kn { font-family: 'Noto Sans Kannada', sans-serif; }
.lang-ml { font-family: 'Noto Sans Malayalam', sans-serif; }
.lang-bn { font-family: 'Noto Sans Bengali', sans-serif; }
.lang-gu { font-family: 'Noto Sans Gujarati', sans-serif; }
.lang-pa { font-family: 'Noto Sans Gurmukhi', sans-serif; }
.lang-mr { font-family: 'Noto Sans Devanagari', sans-serif; }
\`\`\`
`;

fs.writeFileSync(path.join(exportDir, 'README.md'), readme);
console.log('✅ Created README.md\n');

// Create fonts data JSON
const fontsData = {
  totalFamilies: fonts.length,
  fonts: fonts.map(font => ({
    ...font,
    googleFontsUrl: `https://fonts.google.com/download?family=${encodeURIComponent(font.family)}`,
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=${font.family.replace(/ /g, '+')}:wght@${font.weights.join(';')}&display=swap');`
  }))
};

fs.writeFileSync(
  path.join(exportDir, 'fonts-list.json'),
  JSON.stringify(fontsData, null, 2)
);
console.log('✅ Created fonts-list.json\n');

// Create download links file
const downloadLinks = `# Font Download Links

Quick access to download all fonts:

${fonts.map((font, i) => `
## ${i + 1}. ${font.family}

**Google Fonts:**
${font.url}

**Direct Download (Google Fonts):**
https://fonts.google.com/download?family=${encodeURIComponent(font.family)}

**Google Webfonts Helper (WOFF2):**
https://gwfh.mranftl.com/fonts/${font.family.toLowerCase().replace(/ /g, '-')}

---
`).join('\n')}

## Bulk Download Tools:

### google-webfonts-helper
- Visit: https://gwfh.mranftl.com/fonts
- Search for font name
- Select charsets and weights
- Download all formats

### Google Fonts Downloader
- Chrome Extension: "Google Fonts Downloader"
- Allows batch downloading of multiple fonts

### Command Line (wget)
\`\`\`bash
# Example for Inter font
wget "https://fonts.google.com/download?family=Inter" -O Inter.zip
unzip Inter.zip -d Inter/
\`\`\`
`;

fs.writeFileSync(
  path.join(exportDir, 'download-links.md'),
  downloadLinks
);
console.log('✅ Created download-links.md\n');

// Create CSS file with local font references
const localFontsCSS = `/* 
 * Local Fonts Configuration
 * Replace CDN imports with these if you download fonts locally
 */

${fonts.map(font => `
/* ${font.family} */
${font.weights.map(weight => `
@font-face {
  font-family: '${font.family}';
  src: url('/fonts/${font.family.replace(/ /g, '')}-${weight}.woff2') format('woff2'),
       url('/fonts/${font.family.replace(/ /g, '')}-${weight}.woff') format('woff');
  font-weight: ${weight};
  font-style: normal;
  font-display: swap;
}
`).join('')}
`).join('\n')}
`;

fs.writeFileSync(
  path.join(exportDir, 'local-fonts.css'),
  localFontsCSS
);
console.log('✅ Created local-fonts.css (for offline use)\n');

console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║                                                          ║');
console.log('║  ✅ Fonts Export Complete!                              ║');
console.log('║                                                          ║');
console.log(`║  Location: assets-export/fonts/                          ║`);
console.log(`║  Total Font Families: ${fonts.length}                                    ║`);
console.log('║                                                          ║');
console.log('║  Files created:                                          ║');
console.log('║  - README.md (detailed guide)                            ║');
console.log('║  - fonts-list.json (font data)                           ║');
console.log('║  - download-links.md (quick download)                    ║');
console.log('║  - local-fonts.css (offline config)                      ║');
console.log('║                                                          ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

console.log('📖 Next Steps:\n');
console.log('1. Read: assets-export/fonts/README.md');
console.log('2. Visit: assets-export/fonts/download-links.md');
console.log('3. Download fonts from Google Fonts');
console.log('4. Use local-fonts.css for offline implementation\n');
