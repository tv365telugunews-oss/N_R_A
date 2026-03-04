import { AdminPanel } from '@/app/components/AdminPanel';
import { useAuth } from '@/app/contexts/AuthContext';
import { useNavigate } from 'react-router';
import { useAdminAuth } from '@/app/contexts/AdminAuthContext';
import { useState } from 'react';
import { 
  User, 
  Globe, 
  MapPin, 
  Grid, 
  BookOpen, 
  Video, 
  TrendingUp, 
  Star, 
  Mail, 
  X, 
  ChevronRight, 
  Shield, 
  LogOut,
  Settings,
  Navigation,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { AdminLogin } from '@/app/components/AdminLogin';
import indianLocationData from '@/data/indianLocations';
import { useGeolocation } from '@/app/hooks/useGeolocation';

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: string;
  currentLocation: string;
  onLanguageChange: (language: string) => void;
  onLocationChange: (location: string) => void;
}

const languages = [
  'English',
  'हिंदी (Hindi)',
  'తెలుగు (Telugu)',
  'தమிழ் (Tamil)',
  'ಕನ್ನಡ (Kannada)',
  'മലയാളം (Malayalam)',
  'বাংলা (Bengali)',
  'ગુજરાતી (Gujarati)',
  'ਪੰਜਾਬੀ (Punjabi)',
  'मराठी (Marathi)'
];

// Extract ALL Indian states and union territories from the data (36 total)
const allStates = Object.keys(indianLocationData).sort();

const categories = [
  'All News',
  'Breaking News',
  'Politics',
  'Business',
  'Technology',
  'Health',
  'Sports',
  'Entertainment',
  'Movies',
  'Govt Schemes',
  'Education',
  'Crime',
  'Environment'
];

export function ProfileMenu({ 
  isOpen, 
  onClose, 
  currentLanguage,
  currentLocation,
  onLanguageChange,
  onLocationChange 
}: ProfileMenuProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const { logout } = useAuth();
  const { isAuthenticated: isAdminAuthenticated, logout: adminLogout } = useAdminAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSectionClick = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleLanguageSelect = (language: string) => {
    onLanguageChange(language);
    setActiveSection(null);
  };

  const handleLocationSelect = (location: string) => {
    onLocationChange(location);
    setActiveSection(null);
  };

  const menuSections = [
    {
      id: 'profile',
      icon: User,
      title: 'My Profile',
      color: 'text-[#D32F2F]',
      action: 'profile',
      description: 'View and edit your profile'
    },
    {
      id: 'language',
      icon: Globe,
      title: 'Language',
      color: 'text-blue-600',
      hasSubmenu: true,
      currentValue: currentLanguage
    },
    {
      id: 'location',
      icon: MapPin,
      title: 'Area Selection',
      color: 'text-green-600',
      hasSubmenu: true,
      currentValue: currentLocation
    },
    {
      id: 'categories',
      icon: Grid,
      title: 'Categories',
      color: 'text-purple-600',
      hasSubmenu: true
    },
    {
      id: 'ebook',
      icon: BookOpen,
      title: 'E-Book',
      color: 'text-orange-600',
      action: 'ebook',
      description: 'Read latest edition'
    },
    {
      id: 'videos',
      icon: Video,
      title: 'Videos',
      color: 'text-red-600',
      action: 'videos',
      description: 'Watch news videos'
    },
    {
      id: 'viral',
      icon: TrendingUp,
      title: 'Viral',
      color: 'text-pink-600',
      action: 'viral',
      description: 'Trending stories'
    },
    {
      id: 'exclusive',
      icon: Star,
      title: 'Exclusive',
      color: 'text-[#FFC107]',
      action: 'exclusive',
      description: 'Premium content'
    },
    {
      id: 'contact',
      icon: Mail,
      title: 'Contact Us',
      color: 'text-gray-600',
      action: 'contact',
      description: 'Get in touch'
    }
  ];

  const handleMenuAction = (action: string) => {
    onClose();
    switch (action) {
      case 'profile':
        navigate('/profile');
        break;
      case 'ebook':
        navigate('/ebook');
        break;
      case 'videos':
        navigate('/videos');
        break;
      case 'viral':
        navigate('/viral');
        break;
      case 'exclusive':
        navigate('/exclusive');
        break;
      case 'contact':
        navigate('/contact');
        break;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
      <div className="absolute top-0 left-0 w-[85vw] max-w-md h-full bg-white shadow-2xl overflow-y-auto animate-slide-in-left">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#D32F2F] to-[#C62828] px-6 py-5 flex items-center justify-between z-10">
          <div>
            <h2 className="text-white font-bold text-xl">Menu</h2>
            <p className="text-white/80 text-sm mt-0.5">NEWS ROBO</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="px-4 py-4">
          {menuSections.map((section) => (
            <div key={section.id} className="mb-2">
              <button
                onClick={() => section.hasSubmenu ? handleSectionClick(section.id) : handleMenuAction(section.action || '')}
                className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-[#F5F5F5] rounded-xl transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className={`${section.color} bg-gray-50 p-2.5 rounded-lg group-hover:scale-110 transition-transform`}>
                    <section.icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-[#212121] font-semibold text-base">
                        {section.title}
                      </span>
                      {section.adminOnly && (
                        <span className="text-[9px] bg-[#FFC107] text-[#212121] px-1.5 py-0.5 rounded-full font-bold">
                          ADMIN
                        </span>
                      )}
                    </div>
                    {section.description && (
                      <span className="text-[#212121]/50 text-xs">
                        {section.description}
                      </span>
                    )}
                    {section.currentValue && (
                      <span className="text-[#D32F2F] text-xs font-medium">
                        {section.currentValue}
                      </span>
                    )}
                  </div>
                </div>
                {section.hasSubmenu && (
                  <ChevronRight className={`w-5 h-5 text-[#212121]/40 transition-transform ${activeSection === section.id ? 'rotate-90' : ''}`} />
                )}
              </button>

              {/* Submenu */}
              {section.hasSubmenu && activeSection === section.id && (
                <div className="ml-4 mt-2 bg-[#F5F5F5] rounded-lg p-2 animate-slide-down">
                  {section.id === 'language' && (
                    <div className="max-h-64 overflow-y-auto">
                      {languages.map((lang) => (
                        <button
                          key={lang}
                          onClick={() => handleLanguageSelect(lang)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
                            currentLanguage === lang 
                              ? 'bg-[#D32F2F] text-white font-semibold' 
                              : 'hover:bg-white text-[#212121]'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  )}

                  {section.id === 'location' && (
                    <div>
                      <div className="px-3 py-2 text-xs text-gray-600 font-semibold flex items-center justify-between border-b border-gray-300 mb-2">
                        <span>ALL INDIAN STATES & UTs</span>
                        <span className="bg-green-600 text-white px-2 py-0.5 rounded-full text-[10px]">
                          {allStates.length} States
                        </span>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {allStates.map((state) => (
                          <button
                            key={state}
                            onClick={() => handleLocationSelect(state)}
                            className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors text-sm ${
                              currentLocation.includes(state)
                                ? 'bg-[#D32F2F] text-white font-semibold' 
                                : 'hover:bg-white text-[#212121]'
                            }`}
                          >
                            {state}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {section.id === 'categories' && (
                    <div className="max-h-64 overflow-y-auto">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            alert(`Navigating to ${category}`);
                            setActiveSection(null);
                          }}
                          className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white text-[#212121] transition-colors"
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Admin Control Panel Access */}
          <div className="mt-6 mb-4">
            <button
              onClick={() => {
                if (isAdminAuthenticated) {
                  navigate('/admin');
                  onClose();
                } else {
                  setShowAdminLogin(true);
                }
              }}
              className="w-full bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] text-white px-4 py-4 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-3 group"
            >
              <Shield className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-base">Admin Dashboard</div>
                <div className="text-xs text-white/80">Manage content & users</div>
              </div>
            </button>
          </div>

          {/* Logout Button */}
          <div className="mt-6">
            <button
              onClick={() => {
                logout();
                onClose();
                navigate('/');
              }}
              className="w-full bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] text-white px-4 py-4 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-3 group"
            >
              <LogOut className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-base">Logout</div>
                <div className="text-xs text-white/80">Sign out of your account</div>
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <p className="text-center text-[#212121]/50 text-xs">
            NEWS ROBO v2.0 © 2026
          </p>
          <p className="text-center text-[#212121]/40 text-xs mt-1">
            Hyperlocal Multilingual News
          </p>
        </div>
      </div>

      {/* Admin Panel */}
      <AdminPanel isOpen={showAdminPanel} onClose={() => setShowAdminPanel(false)} />
      
      {/* Admin Login Modal */}
      <AdminLogin 
        isOpen={showAdminLogin} 
        onClose={() => setShowAdminLogin(false)} 
        onLogin={() => {
          setShowAdminLogin(false);
          navigate('/admin');
          onClose();
        }} 
      />
    </div>
  );
}