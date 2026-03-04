#!/usr/bin/env node

console.log('\n🔧 NEWS ROBO - Emergency Fix Script\n');
console.log('='.repeat(60));

const fs = require('fs');
const path = require('path');

let errors = 0;
let fixed = 0;

console.log('\n1️⃣  Checking for import path errors...\n');

// Files to check
const filesToCheck = [
  'src/app/App.tsx',
  'src/app/AppWithRouting.tsx',
  'src/app/components/ProfileMenu.tsx',
];

filesToCheck.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for old import path
    if (content.includes("from '@/app/context/AuthContext'")) {
      console.log(`❌ FOUND ERROR in ${file}`);
      console.log(`   → Using old path: '@/app/context/AuthContext'`);
      errors++;
    } else if (content.includes("from '@/app/contexts/AuthContext'")) {
      console.log(`✅ ${file} - Correct import path`);
      fixed++;
    }
  }
});

console.log('\n2️⃣  Checking context folders...\n');

if (fs.existsSync('src/app/context')) {
  console.log('❌ OLD FOLDER EXISTS: src/app/context/');
  console.log('   → This should be deleted!');
  errors++;
} else {
  console.log('✅ Old context folder removed');
  fixed++;
}

if (fs.existsSync('src/app/contexts')) {
  console.log('✅ Correct folder exists: src/app/contexts/');
  fixed++;
} else {
  console.log('❌ MISSING: src/app/contexts/');
  errors++;
}

console.log('\n3️⃣  Checking icon files...\n');

if (fs.existsSync('public/icon.svg')) {
  console.log('✅ App icon exists: public/icon.svg');
  fixed++;
} else {
  console.log('❌ MISSING: public/icon.svg');
  errors++;
}

console.log('\n4️⃣  Checking manifest.json...\n');

if (fs.existsSync('public/manifest.json')) {
  const manifest = fs.readFileSync('public/manifest.json', 'utf8');
  
  if (manifest.includes('icon.svg')) {
    console.log('✅ Manifest uses icon.svg');
    fixed++;
  } else {
    console.log('❌ Manifest not updated for icon.svg');
    errors++;
  }
} else {
  console.log('❌ MISSING: public/manifest.json');
  errors++;
}

console.log('\n5️⃣  Checking build files...\n');

if (fs.existsSync('vite.config.ts')) {
  console.log('✅ vite.config.ts exists');
  fixed++;
} else {
  console.log('❌ MISSING: vite.config.ts');
  errors++;
}

if (fs.existsSync('capacitor.config.ts')) {
  console.log('✅ capacitor.config.ts exists');
  fixed++;
} else {
  console.log('❌ MISSING: capacitor.config.ts');
  errors++;
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('\n📊 SUMMARY:\n');

if (errors === 0) {
  console.log('🎉 ALL CHECKS PASSED!');
  console.log(`✅ ${fixed} items verified`);
  console.log('\n✨ Your app is ready to build!');
  console.log('\nNext steps:');
  console.log('  1. npm run dev        # Test in browser');
  console.log('  2. npm run build      # Build for production');
  console.log('  3. npm run android:open  # Build APK');
  console.log('\n');
} else {
  console.log(`⚠️  Found ${errors} problems!`);
  console.log(`✅ ${fixed} items OK`);
  console.log('\n🔧 How to fix:');
  
  if (fs.existsSync('src/app/context')) {
    console.log('\n1. Delete old context folder:');
    console.log('   rm -rf src/app/context');
  }
  
  console.log('\n2. Check ✅_COMPLETE_FIX_SUMMARY.md for detailed solutions');
  console.log('\n3. Run this script again to verify fixes\n');
}

console.log('='.repeat(60) + '\n');

process.exit(errors === 0 ? 0 : 1);
