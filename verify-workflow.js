#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('\n🔍 NEWS ROBO - Workflow Verification\n');
console.log('=' .repeat(60));

let allGood = true;

// Check required files
const requiredFiles = [
  { path: 'package.json', name: 'Package.json' },
  { path: 'vite.config.ts', name: 'Vite config' },
  { path: 'capacitor.config.ts', name: 'Capacitor config' },
  { path: 'netlify.toml', name: 'Netlify config' },
  { path: 'firebase.json', name: 'Firebase config' },
  { path: 'src/main.tsx', name: 'Main entry point' },
  { path: 'src/app/App.tsx', name: 'App component' },
  { path: 'public/manifest.json', name: 'PWA manifest' },
  { path: 'public/sw.js', name: 'Service Worker' },
];

console.log('\n📁 Checking Required Files:\n');

requiredFiles.forEach(({ path: filePath, name }) => {
  const exists = fs.existsSync(filePath);
  const icon = exists ? '✅' : '❌';
  console.log(`${icon} ${name.padEnd(30)} ${exists ? 'Found' : 'MISSING'}`);
  if (!exists) allGood = false;
});

// Check package.json scripts
console.log('\n📜 Checking NPM Scripts:\n');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredScripts = [
  'build',
  'dev',
  'fix-crash',
  'android:open',
  'netlify:deploy',
  'firebase:deploy',
  'workflow:complete',
];

requiredScripts.forEach(script => {
  const exists = packageJson.scripts && packageJson.scripts[script];
  const icon = exists ? '✅' : '❌';
  console.log(`${icon} ${script.padEnd(30)} ${exists ? 'Configured' : 'MISSING'}`);
  if (!exists) allGood = false;
});

// Check dependencies
console.log('\n📦 Checking Key Dependencies:\n');

const requiredDeps = [
  '@capacitor/core',
  '@capacitor/android',
  'react',
  'react-dom',
  'react-router-dom',
];

requiredDeps.forEach(dep => {
  const exists = packageJson.dependencies && packageJson.dependencies[dep];
  const icon = exists ? '✅' : '❌';
  console.log(`${icon} ${dep.padEnd(30)} ${exists ? 'Installed' : 'MISSING'}`);
  if (!exists) allGood = false;
});

// Check directories
console.log('\n📂 Checking Directories:\n');

const requiredDirs = [
  { path: 'src', name: 'Source directory' },
  { path: 'src/app', name: 'App directory' },
  { path: 'src/styles', name: 'Styles directory' },
  { path: 'public', name: 'Public directory' },
];

requiredDirs.forEach(({ path: dirPath, name }) => {
  const exists = fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  const icon = exists ? '✅' : '❌';
  console.log(`${icon} ${name.padEnd(30)} ${exists ? 'Found' : 'MISSING'}`);
  if (!exists) allGood = false;
});

// Check vite.config.ts content
console.log('\n⚙️  Checking Configuration:\n');

try {
  const viteConfig = fs.readFileSync('vite.config.ts', 'utf8');
  const hasBase = viteConfig.includes("base: './'");
  const hasAlias = viteConfig.includes('@');
  
  console.log(`${hasBase ? '✅' : '❌'} Vite base URL configured      ${hasBase ? 'Correct' : 'NEEDS FIX'}`);
  console.log(`${hasAlias ? '✅' : '❌'} Vite @ alias configured      ${hasAlias ? 'Correct' : 'NEEDS FIX'}`);
  
  if (!hasBase || !hasAlias) allGood = false;
} catch (e) {
  console.log('❌ Error reading vite.config.ts');
  allGood = false;
}

// Check capacitor.config.ts
try {
  const capConfig = fs.readFileSync('capacitor.config.ts', 'utf8');
  const hasWebDir = capConfig.includes("webDir: 'dist'");
  const hasAppId = capConfig.includes('com.newsrobo.app');
  
  console.log(`${hasWebDir ? '✅' : '❌'} Capacitor webDir set          ${hasWebDir ? 'Correct' : 'NEEDS FIX'}`);
  console.log(`${hasAppId ? '✅' : '❌'} Capacitor appId set           ${hasAppId ? 'Correct' : 'NEEDS FIX'}`);
  
  if (!hasWebDir || !hasAppId) allGood = false;
} catch (e) {
  console.log('❌ Error reading capacitor.config.ts');
  allGood = false;
}

// Check for android folder
console.log('\n📱 Checking Android Setup:\n');

const androidExists = fs.existsSync('android');
if (androidExists) {
  console.log('✅ Android folder exists');
  console.log('   ℹ️  If APK crashes, run: npm run fix-crash');
} else {
  console.log('⚠️  Android folder not found');
  console.log('   ℹ️  Run: npx cap add android');
}

// Check for dist folder
console.log('\n🏗️  Checking Build Output:\n');

const distExists = fs.existsSync('dist');
if (distExists) {
  console.log('✅ Dist folder exists');
  const indexExists = fs.existsSync('dist/index.html');
  console.log(`${indexExists ? '✅' : '⚠️ '} ${indexExists ? 'index.html found' : 'index.html not found - run: npm run build'}`);
} else {
  console.log('⚠️  Dist folder not found');
  console.log('   ℹ️  Run: npm run build');
}

// Documentation check
console.log('\n📚 Checking Documentation:\n');

const docs = [
  '🚀_WORKFLOW_START_HERE.md',
  'COMPLETE_WORKFLOW_GUIDE.md',
  'ASSET_FIX_COMPLETE.md',
  '🔧_APK_CRASH_FIX_START_HERE.md',
];

docs.forEach(doc => {
  const exists = fs.existsSync(doc);
  const icon = exists ? '✅' : '⚠️ ';
  console.log(`${icon} ${doc}`);
});

// Summary
console.log('\n' + '='.repeat(60));
console.log('\n📊 VERIFICATION SUMMARY:\n');

if (allGood) {
  console.log('🎉 All critical checks passed!');
  console.log('\n✅ Your workflow is ready!');
  console.log('\n📖 Next steps:');
  console.log('   1. Read: 🚀_WORKFLOW_START_HERE.md');
  console.log('   2. Start dev: npm run dev');
  console.log('   3. Build APK: npm run android:open');
} else {
  console.log('⚠️  Some checks failed!');
  console.log('\n🔧 To fix issues:');
  console.log('   1. Run: npm install');
  console.log('   2. Run: npm run build');
  console.log('   3. Check missing files above');
  console.log('\n📖 See COMPLETE_WORKFLOW_GUIDE.md for help');
}

console.log('\n' + '='.repeat(60) + '\n');

process.exit(allGood ? 0 : 1);
