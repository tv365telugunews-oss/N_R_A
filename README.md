# 📰 NEWS ROBO - Hyperlocal Multilingual News Platform

![NEWS ROBO Logo](https://img.shields.io/badge/NEWS-ROBO-D32F2F?style=for-the-badge&logo=react&logoColor=white)

## 🚀 Overview

**NEWS ROBO** is a revolutionary hyperlocal multilingual short-news application optimized for the Indian market. Built with modern web technologies, it offers a unique vertical 'flip-to-read' gesture (similar to TikTok/Reels) for consuming bite-sized news content.

### ✨ Key Features

- 📱 **Vertical Flip-to-Read Experience** - Intuitive swipe navigation
- 🎉 **Beautiful Onboarding Flow** - 3-page welcome experience for first-time users
- 🌍 **10+ Regional Languages** - English, Hindi, Telugu, Tamil, Kannada, Malayalam, Bengali, Gujarati, Punjabi, Marathi
- 📍 **Granular Location Selection** - From state to village level
- 🤖 **AI-Driven Personalization** - Smart content recommendations
- 📸 **Citizen Journalism Portal** - Community-driven local reporting with trust scores
- 🎥 **Buzz Section** - Viral short video news
- ✅ **Fact Check Integration** - Combat misinformation
- 📚 **E-Book/Digital Magazine** - Read offline publications
- 🛡️ **Admin Control Panel** - Complete content management system

### 🎨 Design System

- **Primary Red:** #D32F2F (Brand identity)
- **Dark Black:** #212121 (Text & navigation)
- **Background:** #F5F5F5 (Clean interface)
- **Highlight Yellow:** #FFC107 (Trust scores & accents)
- **Screen Layout:** 42% photo, 52% text, 6% UI/padding

### 🛠️ Tech Stack

- **Framework:** React 18.3.1
- **Build Tool:** Vite 6.3.5
- **Styling:** Tailwind CSS 4.1.12
- **UI Components:** Radix UI, Lucide Icons
- **Animations:** Motion (Framer Motion)
- **Forms:** React Hook Form
- **Charts:** Recharts
- **Notifications:** Sonner

---

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Setup

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/news-robo.git
cd news-robo

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## 🚀 Deployment

For the current end-to-end deployment workflow, see [DEPLOY_RUNBOOK.md](./DEPLOY_RUNBOOK.md).

### Frontend API Connection (Render)

Set the frontend API base URL using Vite environment variables.

1. Create a local env file from `.env.example`.
2. Use this value:

```env
VITE_API_URL=https://news-robo-api.onrender.com
```

The frontend reads `VITE_API_URL` and also supports `VITE_API_BASE_URL`.

If requests fail on Render:

1. Open Render dashboard.
2. Check Logs for startup errors and API request errors.
3. In Settings -> Environment, add required variables and redeploy.

Optional cold-start mitigation for free tier:

- Ping `https://news-robo-api.onrender.com` every 5 minutes using UptimeRobot or Cron-job.org.

### Deploy to Netlify (Recommended)

This project is configured for instant Netlify deployment:

```bash
# Build
npm run build

# Deploy
# Drag 'dist' folder to https://app.netlify.com/drop

# Or use Netlify CLI
npm install -g netlify-cli
netlify deploy --prod
```

📖 **Full deployment guide:** See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

### Configuration Files
- `netlify.toml` - Build settings & redirects
- `_redirects` - React Router support

---

## 📂 Project Structure

```
news-robo/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── AdminPanel.tsx         # Admin dashboard
│   │   │   ├── ProfileMenu.tsx        # User menu & settings
│   │   │   ├── SimpleUpload.tsx       # Citizen journalism upload
│   │   │   └── ...
│   │   └── App.tsx                    # Main app component
│   ├── styles/
│   │   ├── theme.css                  # Design tokens
│   │   ├── fonts.css                  # Typography
│   │   └── global.css                 # Base styles
│   └── main.tsx                       # Entry point
├── public/                            # Static assets
├── netlify.toml                       # Netlify configuration
├── package.json                       # Dependencies
└── README.md                          # You are here!
```

---

## 🎯 Core Features

### 1. Vertical News Feed
Swipe vertically to browse news stories with smooth animations and intuitive gestures.

### 2. Multi-Language Support
Seamlessly switch between 10 Indian languages with content translated in real-time.

### 3. Location-Based Content
Select your state, district, city, or village to get hyperlocal news relevant to your area.

### 4. Citizen Journalism
**3-Step Upload Process:**
1. Upload media (photo/video)
2. Add details (title, category, location)
3. Review & submit

**Trust Score System:**
- Verified reporters get higher visibility
- Community-driven content moderation
- Admin approval workflow

### 5. Admin Control Panel
**Dashboard Features:**
- Real-time statistics
- Content management (news, submissions, e-books)
- User management
- Analytics & insights
- Settings & configuration

**Access:** Profile Menu → Admin Control Panel button

### 6. News Categories
Politics, Business, Technology, Health, Sports, Entertainment, Movies, Government Schemes, Education, Crime, Environment

---

## 🔐 Security Features

- XSS Protection headers
- Content Security Policy
- HTTPS by default
- Secure cookie handling
- Input sanitization
- Admin authentication (ready for backend integration)

---

## 🎨 UI/UX Highlights

### 2026 Design Trends
- ✨ Glassmorphism effects
- 🌓 Dark mode optimization
- 🎭 Micro-interactions
- 📱 Mobile-first approach
- ⚡ Smooth animations

### Responsive Design
- Mobile: 360px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

---

## 🔌 Future Backend Integration

Ready for integration with:

### Supabase (Recommended)
- User authentication
- Database (PostgreSQL)
- Real-time subscriptions
- Storage for media uploads
- Edge functions

### Features to Add:
```typescript
// User authentication
const { user, session } = await supabase.auth.signIn()

// Fetch news
const { data: news } = await supabase.from('news').select('*')

// Submit citizen report
await supabase.from('submissions').insert({ title, content, location })

// Real-time updates
supabase.from('news').on('INSERT', payload => {
  // New news added
})
```

---

## 📊 Performance Metrics

### Target Scores:
- ⚡ Performance: 90+
- ♿ Accessibility: 95+
- 🎯 Best Practices: 90+
- 🔍 SEO: 90+

### Optimizations:
- Code splitting
- Lazy loading
- Image optimization
- CDN delivery (via Netlify)
- Gzip compression
- Browser caching

---

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Samsung Internet
- ✅ Opera

---

## 🌍 Indian Market Optimization

### Regional Language Support:
- Unicode font rendering
- RTL language support (future)
- Local date/time formats
- Regional news sources

### Low Bandwidth Mode:
- Optimized images
- Lazy loading
- Progressive enhancement
- Offline PWA support (future)

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is proprietary software for NEWS ROBO platform.

---

## 📞 Contact & Support

- **Website:** newsrobo.in (coming soon)
- **Email:** contact@newsrobo.in
- **Twitter:** @newsrobo
- **Instagram:** @newsrobo

---

## 🎉 Acknowledgments

- Design inspired by modern news consumption patterns
- Built for the diverse Indian market
- Powered by open-source technologies
- Community-driven content philosophy

---

## 🚀 Quick Start Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build           # Build for production
npm run preview         # Preview production build

# Deployment
netlify deploy --prod   # Deploy to Netlify

# Code Quality
npm run lint            # Lint code (if configured)
npm run format          # Format code (if configured)
```

---

## 📈 Roadmap

### Phase 1: MVP (Current)
- ✅ Vertical news feed
- ✅ Multi-language support
- ✅ Location selection
- ✅ Citizen journalism
- ✅ Admin panel

### Phase 2: Backend Integration
- [ ] Supabase setup
- [ ] User authentication
- [ ] Real news API integration
- [ ] Database migration
- [ ] Push notifications

### Phase 3: Advanced Features
- [ ] AI personalization engine
- [ ] Video news (Buzz section)
- [ ] Fact-checking system
- [ ] E-book/magazine reader
- [ ] Monetization (ads)

### Phase 4: Native Apps
- [ ] React Native conversion
- [ ] Android app (Google Play)
- [ ] iOS app (App Store)
- [ ] PWA optimization

---

## 💡 Tips for Deployment

1. **Use Environment Variables** for API keys
2. **Enable Analytics** to track user behavior
3. **Set up monitoring** for uptime/performance
4. **Configure CDN** for faster global delivery
5. **Implement caching** strategies
6. **Add error tracking** (Sentry, LogRocket)
7. **Test on real devices** before launch

---

## 🎯 Success Metrics

Track these KPIs:
- Daily Active Users (DAU)
- Average session duration
- News articles read per session
- Citizen journalism submissions
- Language/location distribution
- Page load time
- Bounce rate

---

**Built with ❤️ for the Indian news ecosystem**

🇮🇳 **Empowering hyperlocal journalism, one swipe at a time!** 🇮🇳