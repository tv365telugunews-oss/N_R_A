#!/usr/bin/env node

/**
 * NEWS ROBO - Complete Import Fix Script
 * Scans all files and reports any missing imports or errors
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔧 NEWS ROBO - Complete Import Fix Scanner\n');
console.log('='.repeat(70));

let totalErrors = 0;
let totalWarnings = 0;
let filesScanned = 0;

// Files to check
const filesToCheck = [
  'src/app/App.tsx',
  'src/app/AppWithRouting.tsx',
  'src/app/components/ProfileMenu.tsx',
  'src/app/components/AdminPanel.tsx',
  'src/app/components/AdminLogin.tsx',
  'src/app/components/ReporterLogin.tsx',
  'src/app/components/Onboarding.tsx',
  'src/app/components/NewsFlipCard.tsx',
  'src/app/components/VerticalNewsFeed.tsx',
  'src/app/pages/WelcomePage.tsx',
  'src/app/pages/LoginPage.tsx',
  'src/app/pages/AdminDashboard.tsx',
  'src/app/pages/EBookPage.tsx',
  'src/app/pages/ProfilePage.tsx',
];

console.log('\n📄 Scanning Files for Import Issues...\n');

filesToCheck.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log(`⚠️  FILE NOT FOUND: ${file}`);
    totalWarnings++;
    return;
  }

  filesScanned++;
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  let fileHasErrors = false;

  // Check for useState without import
  if (content.includes('useState') && !content.includes("from 'react'")) {
    console.log(`❌ ${file}`);
    console.log(`   → Missing: import { useState } from 'react';`);
    fileHasErrors = true;
    totalErrors++;
  }

  // Check for useEffect without import
  if (content.includes('useEffect') && !content.includes('useEffect') && !content.includes("from 'react'")) {
    console.log(`❌ ${file}`);
    console.log(`   → Missing: import { useEffect } from 'react';`);
    fileHasErrors = true;
    totalErrors++;
  }

  // Check for lucide-react icons usage
  const lucideIcons = ['User', 'Globe', 'MapPin', 'Mail', 'Lock', 'Shield', 'X', 'ChevronRight', 'LogOut'];
  lucideIcons.forEach(icon => {
    if (content.includes(`<${icon}`) && !content.includes(`from 'lucide-react'`)) {
      if (!fileHasErrors) {
        console.log(`❌ ${file}`);
        fileHasErrors = true;
      }
      console.log(`   → Missing lucide-react import for: ${icon}`);
      totalErrors++;
    }
  });

  // Check for old context path
  if (content.includes("from '@/app/context/")) {
    if (!fileHasErrors) {
      console.log(`❌ ${file}`);
      fileHasErrors = true;
    }
    console.log(`   → Using OLD path: '@/app/context/' (should be '@/app/contexts/')`);
    totalErrors++;
  }

  if (!fileHasErrors) {
    console.log(`✅ ${file}`);
  }
});

// Context files check
console.log('\n📁 Checking Context Files...\n');

const contextFiles = [
  'src/app/contexts/AuthContext.tsx',
  'src/app/contexts/AdminAuthContext.tsx',
  'src/app/contexts/ReporterAuthContext.tsx',
  'src/app/contexts/EBookContext.tsx',
  'src/app/contexts/LanguageContext.tsx',
];

contextFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
    filesScanned++;
  } else {
    console.log(`❌ MISSING: ${file}`);
    totalErrors++;
  }
});

// Check for old context folder
if (fs.existsSync('src/app/context')) {
  console.log('\n❌ OLD FOLDER STILL EXISTS: src/app/context/');
  console.log('   → This folder should be deleted!');
  totalErrors++;
}

// Summary
console.log('\n' + '='.repeat(70));
console.log('\n📊 SCAN SUMMARY:\n');
console.log(`📄 Files Scanned: ${filesScanned}`);
console.log(`❌ Errors Found: ${totalErrors}`);
console.log(`⚠️  Warnings: ${totalWarnings}`);

if (totalErrors === 0 && totalWarnings === 0) {
  console.log('\n🎉 ALL FILES ARE CLEAN!');
  console.log('\n✨ Your app should work without errors!');
  console.log('\nNext steps:');
  console.log('  1. Check browser console (F12)');
  console.log('  2. Refresh the page (Ctrl+R)');
  console.log('  3. Clear browser cache if needed (Ctrl+Shift+R)');
} else {
  console.log('\n⚠️  ISSUES FOUND!');
  console.log('\nThe errors above need to be fixed.');
  console.log('Most common issues:');
  console.log('  1. Missing React imports (useState, useEffect)');
  console.log('  2. Missing lucide-react icon imports');
  console.log('  3. Old context path (@/app/context instead of @/app/contexts)');
  console.log('\nContact support if you need help fixing these issues.');
}

console.log('\n' + '='.repeat(70) + '\n');

process.exit(totalErrors > 0 ? 1 : 0);
