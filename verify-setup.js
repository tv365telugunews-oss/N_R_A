#!/usr/bin/env node

/**
 * NEWS ROBO - Setup Verification Script
 * Checks if everything is properly configured
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 NEWS ROBO - Verifying Android Build Setup...\n');

let allGood = true;
const checks = [];

// Check 1: package.json exists
const check1 = fs.existsSync('package.json');
checks.push({ name: 'package.json', status: check1 });
if (!check1) allGood = false;

// Check 2: capacitor.config.ts exists
const check2 = fs.existsSync('capacitor.config.ts');
checks.push({ name: 'capacitor.config.ts', status: check2 });
if (!check2) allGood = false;

// Check 3: vite.config.ts exists
const check3 = fs.existsSync('vite.config.ts');
checks.push({ name: 'vite.config.ts', status: check3 });
if (!check3) allGood = false;

// Check 4: tsconfig.json exists
const check4 = fs.existsSync('tsconfig.json');
checks.push({ name: 'tsconfig.json', status: check4 });
if (!check4) allGood = false;

// Check 5: index.html exists
const check5 = fs.existsSync('index.html');
checks.push({ name: 'index.html', status: check5 });
if (!check5) allGood = false;

// Check 6: src/main.tsx exists
const check6 = fs.existsSync('src/main.tsx');
checks.push({ name: 'src/main.tsx', status: check6 });
if (!check6) allGood = false;

// Check 7: src/app/App.tsx exists
const check7 = fs.existsSync('src/app/App.tsx');
checks.push({ name: 'src/app/App.tsx', status: check7 });
if (!check7) allGood = false;

// Check 8: node_modules exists
const check8 = fs.existsSync('node_modules');
checks.push({ name: 'Dependencies installed', status: check8 });
if (!check8) allGood = false;

// Check 9: App.tsx uses HashRouter
let check9 = false;
if (check7) {
  const appContent = fs.readFileSync('src/app/App.tsx', 'utf8');
  check9 = appContent.includes('HashRouter');
  checks.push({ name: 'HashRouter configured', status: check9 });
  if (!check9) allGood = false;
}

// Check 10: Capacitor dependencies
let check10 = false;
if (check1) {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  check10 = packageJson.dependencies['@capacitor/core'] && 
            packageJson.dependencies['@capacitor/android'];
  checks.push({ name: 'Capacitor dependencies', status: check10 });
  if (!check10) allGood = false;
}

// Display results
console.log('Configuration Checks:\n');
checks.forEach((check, index) => {
  const icon = check.status ? '✅' : '❌';
  console.log(`${icon} ${index + 1}. ${check.name}`);
});

console.log('\n' + '='.repeat(50) + '\n');

if (allGood) {
  console.log('🎉 All checks passed! Your setup is ready!\n');
  console.log('Next steps:');
  console.log('1. Run: npm install (if not done)');
  console.log('2. Run: npm run android:build');
  console.log('3. Run: npm run android:open');
  console.log('4. Build APK in Android Studio\n');
} else {
  console.log('⚠️  Some checks failed. Please fix the issues above.\n');
  console.log('Common solutions:');
  console.log('- Run: npm install');
  console.log('- Make sure all required files exist');
  console.log('- Check the FIXES_APPLIED.md file for details\n');
}

console.log('For detailed instructions, see:');
console.log('- QUICK_START.md');
console.log('- ANDROID_BUILD_GUIDE.md');
console.log('- FIXES_APPLIED.md\n');

process.exit(allGood ? 0 : 1);
