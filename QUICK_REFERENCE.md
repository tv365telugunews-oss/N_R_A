# ⚡ NEWS ROBO - QUICK REFERENCE CARD

## 🎯 ONE-LINE COMMANDS

```bash
# Development
npm run dev                           # Start dev server (localhost:5173)

# Build
npm run build                         # Build for production

# Android
npm run android:open                  # Build APK (opens Android Studio)
npm run android:dev                   # Live reload on device
npm run fix-crash                     # Fix APK crash

# Deploy
npm run netlify:deploy                # Deploy to Netlify
npm run firebase:deploy               # Deploy to Firebase
npm run deploy:all                    # Deploy to both

# Workflow
npm run workflow:complete             # Build + sync + deploy
npm run verify:workflow               # Verify setup

# Git
git push origin main                  # Netlify auto-deploys!
```

---

## 📁 YOUR WORKFLOW

```
1. Code in VS Code → npm run dev
2. Test locally → http://localhost:5173
3. Push to GitHub → git push
4. Auto-deploy to Netlify → ✅
5. Build APK → npm run android:open
```

---

## 🔧 COMMON TASKS

### **Start Development**
```bash
npm run dev
```

### **Fix APK Crash**
```bash
npm run fix-crash
npx cap open android
```

### **Deploy Everything**
```bash
npm run workflow:complete
```

### **Build APK**
```bash
npm run android:open
# In Android Studio: Build → Build APK
```

---

## 📖 KEY DOCUMENTATION

| Document | Purpose |
|----------|---------|
| 🚀_WORKFLOW_START_HERE.md | Start here! |
| COMPLETE_WORKFLOW_GUIDE.md | Full workflow |
| ASSET_FIX_COMPLETE.md | Asset guide |
| 🔧_APK_CRASH_FIX_START_HERE.md | Crash fixes |

---

## 🌐 YOUR URLS

- **Dev:** http://localhost:5173
- **Netlify:** https://news-robo.netlify.app
- **Firebase:** https://news-robo.web.app
- **GitHub:** https://github.com/your-username/news-robo

---

## ✅ ASSET LOCATIONS

| Type | Location | Example |
|------|----------|---------|
| Static | `/public/` | manifest.json |
| Images | Import from `/src/assets/` | `import logo from '@/assets/logo.png'` |
| Icons | `lucide-react` | `import { Menu } from 'lucide-react'` |
| Figma SVG | `/src/imports/` | `import svg from '@/imports/svg-xxx'` |

---

## 🚨 QUICK FIXES

**APK crashes?**
```bash
npm run fix-crash
```

**Assets 404?**
```bash
npm run build
npx cap sync android
```

**Build fails?**
```bash
npm install
npm run build
```

**Git push fails?**
```bash
git pull origin main --rebase
git push origin main
```

---

## 📊 BUILD PROCESS

```
npm run build
  ↓
/dist/ created
  ↓
npx cap sync android
  ↓
/android/app/src/main/assets/public/
  ↓
Android Studio → Build APK
  ↓
APK ready! ✅
```

---

## 🎯 DAILY CHECKLIST

- [ ] `git pull` (get latest)
- [ ] `npm run dev` (start dev)
- [ ] Make changes
- [ ] Test in browser
- [ ] `git commit` and `git push`
- [ ] Netlify auto-deploys ✅

---

## 💡 PRO TIPS

**Fast iteration:** `npm run android:dev`
**Quick deploy:** `git push` (Netlify auto-deploys)
**Deploy all:** `npm run deploy:all`
**Fix issues:** `npm run fix-crash`
**Verify setup:** `npm run verify:workflow`

---

**Print this for quick reference! 📄**
