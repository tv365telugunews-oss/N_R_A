#!/usr/bin/env node

/**
 * NEWS ROBO - Complete Diagnostic Check
 * Verifies all files, imports, routes, and components
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 NEWS ROBO - Complete Diagnostic Check\n');
console.log('='.repeat(70));

let totalErrors = 0;
let totalSuccess = 0;

// Check 1: All Page Files Exist
console.log('\n📄 Checking Page Files...\n');

const pages = [
  'src/app/pages/WelcomePage.tsx',
  'src/app/pages/LoginPage.tsx',
  'src/app/pages/OnboardingPage.tsx',
  'src/app/pages/TermsAndConditionsPage.tsx',
  'src/app/pages/AdminDashboard.tsx',
  'src/app/pages/ProfilePage.tsx',
  'src/app/pages/BookmarksPage.tsx',
  'src/app/pages/ContactUsPage.tsx',
  'src/app/pages/EBookPage.tsx',
  'src/app/pages/PreferencesPage.tsx',
  'src/app/pages/VideosPage.tsx',
  'src/app/pages/ViralPage.tsx',
  'src/app/pages/ExclusivePage.tsx'
];

pages.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
    totalSuccess++;
  } else {
    console.log(`❌ MISSING: ${file}`);
    totalErrors++;
  }
});

// Check 2: Logo Component
console.log('\n🎨 Checking Logo Component...\n');

if (fs.existsSync('src/app/components/NewsRoboLogo.tsx')) {
  const logoContent = fs.readFileSync('src/app/components/NewsRoboLogo.tsx', 'utf8');
  if (logoContent.includes('NEWS') && logoContent.includes('ROBO')) {
    console.log('✅ Logo component exists with correct branding');
    if (logoContent.includes('#D32F2F')) {
      console.log('✅ Primary red color (#D32F2F) present');
      totalSuccess++;
    }
    if (logoContent.includes('#2196F3') || logoContent.includes('blue')) {
      console.log('✅ Blue color for ROBO text present');
      totalSuccess++;
    }
  } else {
    console.log('❌ Logo component missing branding');
    totalErrors++;
  }
} else {
  console.log('❌ Logo component not found');
  totalErrors++;
}

// Check 3: Routes in App.tsx
console.log('\n🛣️  Checking Routes in App.tsx...\n');

if (fs.existsSync('src/app/App.tsx')) {
  const appContent = fs.readFileSync('src/app/App.tsx', 'utf8');
  
  const routes = [
    '/home',
    '/admin',
    '/profile',
    '/bookmarks',
    '/contact',
    '/ebook',
    '/preferences',
    '/videos',
    '/viral',
    '/exclusive'
  ];
  
  routes.forEach(route => {
    if (appContent.includes(`path="${route}"`)) {
      console.log(`✅ Route "${route}" configured`);
      totalSuccess++;
    } else {
      console.log(`❌ Route "${route}" missing`);
      totalErrors++;
    }
  });
} else {
  console.log('❌ App.tsx not found');
  totalErrors++;
}

// Check 4: Key Components
console.log('\n🧩 Checking Key Components...\n');

const components = [
  'src/app/components/ProfileMenu.tsx',
  'src/app/components/AdminPanel.tsx',
  'src/app/components/AdminLogin.tsx',
  'src/app/components/NewsFlipCard.tsx',
  'src/app/components/CategoryMenu.tsx',
  'src/app/components/Onboarding.tsx'
];

components.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
    totalSuccess++;
  } else {
    console.log(`❌ MISSING: ${file}`);
    totalErrors++;
  }
});

// Check 5: Context Files
console.log('\n📦 Checking Context Files...\n');

const contexts = [
  'src/app/contexts/AuthContext.tsx',
  'src/app/contexts/AdminAuthContext.tsx',
  'src/app/contexts/ReporterAuthContext.tsx',
  'src/app/contexts/EBookContext.tsx',
  'src/app/contexts/LanguageContext.tsx'
];

contexts.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
    totalSuccess++;
  } else {
    console.log(`❌ MISSING: ${file}`);
    totalErrors++;
  }
});

// Check 6: Import Consistency
console.log('\n🔗 Checking Import Consistency...\n');

let importErrors = 0;

pages.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for useState import
    if (content.includes('useState') && !content.includes("from 'react'")) {
      console.log(`⚠️  ${file} - useState used but React import may be incomplete`);
      importErrors++;
    }
    
    // Check for useNavigate import
    if (content.includes('useNavigate') && !content.includes("from 'react-router-dom'")) {
      console.log(`⚠️  ${file} - useNavigate used but react-router-dom import missing`);
      importErrors++;
    }
  }
});

if (importErrors === 0) {
  console.log('✅ All imports appear consistent');
  totalSuccess++;
} else {
  console.log(`⚠️  Found ${importErrors} potential import issues`);
  totalErrors += importErrors;
}

// Summary
console.log('\n' + '='.repeat(70));
console.log('\n📊 DIAGNOSTIC SUMMARY:\n');
console.log(`✅ Checks Passed: ${totalSuccess}`);
console.log(`❌ Issues Found: ${totalErrors}`);

if (totalErrors === 0) {
  console.log('\n🎉 ALL SYSTEMS GO!');
  console.log('\n✨ Your NEWS ROBO app is ready!');
  console.log('\n🚀 Next Steps:');
  console.log('  1. Run: npm run dev');
  console.log('  2. Open: http://localhost:5173');
  console.log('  3. Test all pages and features');
  console.log('  4. Build APK: npm run android:open');
} else {
  console.log('\n⚠️  FOUND ISSUES!');
  console.log('\nSome files or configurations need attention.');
  console.log('Review the errors above and fix them.');
}

console.log('\n' + '='.repeat(70) + '\n');

process.exit(totalErrors > 0 ? 1 : 0);
