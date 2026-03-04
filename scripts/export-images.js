#!/usr/bin/env node

/**
 * Export Images Script
 * Documents all images used in the project
 */

const fs = require('fs');
const path = require('path');

console.log('🖼️  Exporting Images...\n');

// Create export directory
const exportDir = path.join(process.cwd(), 'assets-export', 'images');
if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir, { recursive: true });
  console.log('✅ Created export directory:', exportDir);
}

console.log('\n📸 Analyzing images used in NEWS ROBO...\n');

// Image categories
const imageCategories = {
  unsplash: {
    description: 'Stock photos from Unsplash API',
    format: 'JPG',
    source: 'Dynamic from Unsplash',
    examples: [
      'news-india',
      'politics-india',
      'sports-cricket',
      'technology-mobile',
      'business-market',
      'entertainment-bollywood',
      'local-news-village'
    ]
  },
  figma: {
    description: 'Images imported from Figma designs',
    format: 'PNG/JPG',
    source: 'figma:asset/ scheme',
    location: 'Referenced via virtual module'
  },
  static: {
    description: 'Static assets in public folder',
    format: 'PNG/JPG/SVG',
    source: '/public/ directory',
    location: path.join(process.cwd(), 'public')
  },
  generated: {
    description: 'Placeholder and avatar images',
    format: 'SVG/Data URLs',
    source: 'Generated programmatically'
  }
};

// Create comprehensive README
const readme = `# Images Used in NEWS ROBO

## Image Categories

### 1. Unsplash Stock Photos
- **Source:** Unsplash API
- **Format:** JPG
- **Usage:** News articles, category banners, backgrounds
- **Access:** Dynamic, fetched via unsplash_tool

**Common Search Queries:**
${imageCategories.unsplash.examples.map(q => `- "${q.replace(/-/g, ' ')}"`).join('\n')}

**To Download:**
1. Images are fetched dynamically from Unsplash
2. Visit: https://unsplash.com/
3. Search for relevant keywords
4. Download high-quality versions

### 2. Figma Imported Images
- **Source:** Figma design files
- **Format:** PNG (raster) or SVG (vector)
- **Location:** Referenced via \`figma:asset/\` import scheme
- **Access:** Available after downloading project from Figma Make

**How to Find:**
- Check \`/src/imports/\` folder after download
- Files named like: \`figma:asset/[hash].png\`
- SVG vectors in: \`@/imports/svg-[hash]\`

**To Extract:**
\`\`\`bash
# After downloading project
# Look in src/imports/ folder
ls src/imports/
\`\`\`

### 3. Static Assets
- **Source:** Stored in \`/public/\` folder
- **Format:** PNG, JPG, SVG
- **Usage:** Logos, icons, fixed images

**Location:**
\`/public/images/\`

**To Extract:**
Simply copy files from \`/public/\` folder after downloading project.

### 4. Generated Images
- **Source:** Programmatically created
- **Format:** SVG, Data URLs, Canvas
- **Usage:** Avatars, placeholders, thumbnails

**Examples:**
- User avatar placeholders (SVG circles with initials)
- Category icon backgrounds
- Loading placeholders

## Image Specifications

### News Article Images
- **Recommended Size:** 1200 x 800 px (3:2 ratio)
- **Format:** JPG (optimized for web)
- **Max File Size:** 200 KB
- **Quality:** 80-85%

### Video Thumbnails (Buzz Section)
- **Recommended Size:** 1080 x 1920 px (9:16 ratio - vertical)
- **Format:** JPG
- **Max File Size:** 150 KB

### Category Icons
- **Size:** 100 x 100 px
- **Format:** SVG (preferred) or PNG
- **Background:** Transparent

### User Avatars
- **Size:** 200 x 200 px
- **Format:** JPG or PNG
- **Shape:** Circle (cropped in CSS)

### Logo Images
- **NEWS ROBO Logo**
  - Full logo: 300 x 100 px
  - Icon only: 100 x 100 px
  - Format: SVG or PNG with transparent background
  - Colors: Red (#D32F2F) and Blue

### E-Paper Images
- **Page Images:** Variable (PDF converted to images)
- **Format:** JPG or PNG
- **Size:** A4 ratio (210:297)

## Unsplash Images Used

The app uses Unsplash for dynamic content. Common searches:

### Main Categories:
1. **Politics** - "india politics parliament"
2. **Sports** - "cricket india sports"
3. **Technology** - "technology smartphone india"
4. **Business** - "india business stock market"
5. **Entertainment** - "bollywood cinema india"
6. **Local News** - "indian village rural"
7. **Health** - "healthcare hospital india"
8. **Education** - "education school india"

### Regional:
- "mumbai city" (Maharashtra)
- "bangalore tech" (Karnataka)
- "delhi landmarks" (Delhi)
- "kolkata culture" (West Bengal)
- "chennai temple" (Tamil Nadu)
- "hyderabad city" (Telangana)

## How to Replace Unsplash Images

If you want to use custom images instead of Unsplash:

1. **Prepare Images:**
   - Size: 1200 x 800 px minimum
   - Format: JPG (optimized)
   - Quality: 80-85%
   - File size: < 200 KB

2. **Place in Public Folder:**
   \`\`\`
   /public/images/news/
   ├── article-1.jpg
   ├── article-2.jpg
   └── ...
   \`\`\`

3. **Update Code:**
   Replace Unsplash URLs with local paths:
   \`\`\`tsx
   // Instead of:
   <img src={unsplashUrl} />
   
   // Use:
   <img src="/images/news/article-1.jpg" />
   \`\`\`

## Image Optimization Tips

### For Web/Android:
1. **Use WebP Format:**
   - Better compression than JPG
   - Supported in modern browsers
   - ~30% smaller file size

2. **Provide Multiple Sizes:**
   \`\`\`html
   <img 
     srcset="
       image-400.jpg 400w,
       image-800.jpg 800w,
       image-1200.jpg 1200w"
     sizes="(max-width: 600px) 400px, 800px"
     src="image-800.jpg"
   />
   \`\`\`

3. **Lazy Loading:**
   Already implemented:
   \`\`\`tsx
   <img loading="lazy" src="..." />
   \`\`\`

4. **Compression Tools:**
   - TinyPNG: https://tinypng.com/
   - Squoosh: https://squoosh.app/
   - ImageOptim (Mac)

## Extracting Images from Project

After downloading the project:

\`\`\`bash
# 1. Navigate to project folder
cd news-robo

# 2. Check public folder
ls -la public/images/

# 3. Check imports folder (Figma assets)
ls -la src/imports/

# 4. Copy all images to export folder
cp -r public/images/* assets-export/images/static/
\`\`\`

## Image Attribution

### Unsplash:
- All Unsplash photos are free to use
- Attribution appreciated but not required
- License: Unsplash License (free for commercial use)
- Credit format: "Photo by [Photographer] on Unsplash"

### Custom Images:
- Ensure you have rights to use images
- Provide attribution if required
- Check licenses for stock photos

## Creating Placeholder Images

For development/testing:

### Online Tools:
1. **Placeholder.com:** https://placeholder.com/
   - \`https://via.placeholder.com/1200x800\`

2. **Lorem Picsum:** https://picsum.photos/
   - \`https://picsum.photos/1200/800\`

3. **Unsplash Source:** 
   - \`https://source.unsplash.com/1200x800/?india,news\`

## Image Formats Comparison

| Format | Best For | Pros | Cons |
|--------|----------|------|------|
| JPG | Photos, complex images | Small file size, wide support | Lossy compression |
| PNG | Graphics, transparency | Lossless, supports alpha | Larger file size |
| SVG | Icons, logos, illustrations | Scalable, tiny file size | Not for photos |
| WebP | Modern web images | Best compression, quality | Limited old browser support |

## Recommended Image Structure

\`\`\`
public/
├── images/
│   ├── news/
│   │   ├── politics/
│   │   ├── sports/
│   │   ├── technology/
│   │   └── ...
│   ├── categories/
│   │   └── icons/
│   ├── buzz/
│   │   └── thumbnails/
│   ├── avatars/
│   │   └── defaults/
│   └── logos/
│       ├── logo-full.svg
│       └── logo-icon.svg
\`\`\`

## Next Steps

1. Download project from Figma Make
2. Check \`/public/\` and \`/src/imports/\` folders
3. Copy images to \`assets-export/images/\`
4. Optimize images using compression tools
5. Document custom images and their sources
`;

fs.writeFileSync(path.join(exportDir, 'README.md'), readme);
console.log('✅ Created README.md\n');

// Create image inventory template
const inventory = {
  unsplash: {
    description: 'Dynamic stock photos',
    count: 'Variable (fetched as needed)',
    searches: imageCategories.unsplash.examples
  },
  figma: {
    description: 'Imported from Figma designs',
    location: 'src/imports/',
    note: 'Available after downloading project'
  },
  static: {
    description: 'Static assets',
    location: 'public/images/',
    note: 'Check after downloading project'
  },
  generated: {
    description: 'Programmatically created',
    examples: ['Avatar placeholders', 'Category backgrounds', 'Loading states']
  }
};

fs.writeFileSync(
  path.join(exportDir, 'image-inventory.json'),
  JSON.stringify(inventory, null, 2)
);
console.log('✅ Created image-inventory.json\n');

// Create optimization guide
const optimizationGuide = `# Image Optimization Guide

## Quick Commands

### Using ImageMagick:
\`\`\`bash
# Resize to 1200px width, maintain aspect ratio
magick convert input.jpg -resize 1200x output.jpg

# Compress to 85% quality
magick convert input.jpg -quality 85 output.jpg

# Convert to WebP
magick convert input.jpg -quality 85 output.webp
\`\`\`

### Using FFmpeg (for video thumbnails):
\`\`\`bash
# Extract thumbnail from video at 1 second
ffmpeg -i video.mp4 -ss 00:00:01 -vframes 1 thumbnail.jpg
\`\`\`

## Batch Processing

### Optimize all JPGs in folder:
\`\`\`bash
for img in *.jpg; do
  magick convert "$img" -resize 1200x -quality 85 "optimized/$img"
done
\`\`\`

### Convert all to WebP:
\`\`\`bash
for img in *.jpg; do
  magick convert "$img" -quality 85 "\${img%.jpg}.webp"
done
\`\`\`

## Online Tools

1. **TinyPNG** - https://tinypng.com/
   - Drag & drop compression
   - Preserves quality
   - Free for up to 20 images at a time

2. **Squoosh** - https://squoosh.app/
   - Google's image optimizer
   - Real-time preview
   - Multiple format support

3. **Cloudinary** - https://cloudinary.com/
   - Automatic optimization
   - CDN delivery
   - Free tier available

## Recommended Settings

### News Articles:
- Dimensions: 1200 x 800 px
- Format: JPG or WebP
- Quality: 80-85%
- File size target: < 150 KB

### Thumbnails:
- Dimensions: 400 x 267 px
- Format: JPG or WebP
- Quality: 75-80%
- File size target: < 50 KB

### Icons/Graphics:
- Format: SVG (preferred)
- Or PNG with transparency
- Size: As needed (usually 100x100 or less)
`;

fs.writeFileSync(
  path.join(exportDir, 'optimization-guide.md'),
  optimizationGuide
);
console.log('✅ Created optimization-guide.md\n');

console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║                                                          ║');
console.log('║  ✅ Images Documentation Complete!                      ║');
console.log('║                                                          ║');
console.log(`║  Location: assets-export/images/                         ║`);
console.log('║                                                          ║');
console.log('║  Files created:                                          ║');
console.log('║  - README.md (comprehensive guide)                       ║');
console.log('║  - image-inventory.json (image catalog)                  ║');
console.log('║  - optimization-guide.md (how to optimize)               ║');
console.log('║                                                          ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

console.log('📖 Next Steps:\n');
console.log('1. Download project from Figma Make');
console.log('2. Check /public/ and /src/imports/ folders for images');
console.log('3. Copy images to assets-export/images/');
console.log('4. Use optimization-guide.md to compress images\n');
