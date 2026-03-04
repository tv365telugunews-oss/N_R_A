#!/usr/bin/env node

/**
 * NEWS ROBO - Instant APK Builder
 * This script guides you through building your APK step-by-step
 */

const readline = require('readline');
const { execSync } = require('child_process');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function exec(command, description) {
  console.log(`\n🔄 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} - Done!\n`);
    return true;
  } catch (error) {
    console.log(`❌ ${description} - Failed!\n`);
    return false;
  }
}

async function main() {
  console.clear();
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║                                                          ║');
  console.log('║           📱 NEWS ROBO - INSTANT APK BUILDER 📱         ║');
  console.log('║                                                          ║');
  console.log('║              Build Your APK in 20 Minutes!              ║');
  console.log('║                                                          ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  console.log('This wizard will guide you through building your Android APK.\n');

  // Check prerequisites
  console.log('🔍 Checking prerequisites...\n');

  // Check Node.js
  try {
    const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
    console.log(`✅ Node.js installed: ${nodeVersion}`);
  } catch {
    console.log('❌ Node.js not found!');
    console.log('📥 Please install Node.js from: https://nodejs.org/\n');
    process.exit(1);
  }

  // Check if Android Studio is installed (optional check)
  console.log('⚠️  Make sure Android Studio is installed');
  console.log('📥 Download from: https://developer.android.com/studio\n');

  const answer = await ask('Do you have Android Studio installed? (y/n): ');
  
  if (answer.toLowerCase() !== 'y') {
    console.log('\n⚠️  Please install Android Studio first, then run this script again.\n');
    rl.close();
    return;
  }

  console.log('\n🚀 Great! Let\'s start building...\n');
  await ask('Press Enter to continue...');

  // Step 1: Install dependencies
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('STEP 1/6: Installing Dependencies');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  if (!exec('npm install', 'Installing dependencies')) {
    console.log('Please fix the error and try again.\n');
    rl.close();
    return;
  }

  await ask('Press Enter to continue to Step 2...');

  // Step 2: Build web app
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('STEP 2/6: Building Web Application');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  if (!exec('npm run build', 'Building web app')) {
    console.log('Please fix the error and try again.\n');
    rl.close();
    return;
  }

  await ask('Press Enter to continue to Step 3...');

  // Step 3: Initialize Capacitor (if not done)
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('STEP 3/6: Initializing Capacitor');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (!fs.existsSync('capacitor.config.ts') && !fs.existsSync('capacitor.config.json')) {
    exec('npx cap init "NEWS ROBO" "com.newsrobo.app" --web-dir=dist', 'Initializing Capacitor');
  } else {
    console.log('✅ Capacitor already initialized\n');
  }

  await ask('Press Enter to continue to Step 4...');

  // Step 4: Add Android platform
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('STEP 4/6: Adding Android Platform');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (!fs.existsSync('android')) {
    exec('npx cap add android', 'Adding Android platform');
  } else {
    console.log('✅ Android platform already added\n');
  }

  await ask('Press Enter to continue to Step 5...');

  // Step 5: Sync
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('STEP 5/6: Syncing to Android');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  exec('npx cap sync android', 'Syncing to Android');

  await ask('Press Enter to continue to final step...');

  // Step 6: Open Android Studio
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('STEP 6/6: Opening Android Studio');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('🎉 Almost done! Android Studio will open now.\n');
  console.log('📱 IN ANDROID STUDIO:\n');
  console.log('   1. Wait for Gradle sync to finish (5-10 minutes)');
  console.log('   2. Click: Build → Build Bundle(s) / APK(s) → Build APK(s)');
  console.log('   3. Wait 2-3 minutes');
  console.log('   4. Click "locate" in the notification\n');
  console.log('📂 Your APK will be in:');
  console.log('   android/app/build/outputs/apk/debug/app-debug.apk\n');

  await ask('Press Enter to open Android Studio...');

  exec('npx cap open android', 'Opening Android Studio');

  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║                                                          ║');
  console.log('║                   🎊 SETUP COMPLETE! 🎊                 ║');
  console.log('║                                                          ║');
  console.log('║   Android Studio is opening. Follow the steps above     ║');
  console.log('║   to build your APK!                                    ║');
  console.log('║                                                          ║');
  console.log('║   Expected time: 10-15 more minutes                     ║');
  console.log('║                                                          ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  console.log('Need help? Check these guides:');
  console.log('  📄 MANUAL_BUILD_COMMANDS.md');
  console.log('  📄 ANDROID_BUILD_GUIDE.md');
  console.log('  📄 START_HERE_FIXED.md\n');

  rl.close();
}

main().catch(console.error);
