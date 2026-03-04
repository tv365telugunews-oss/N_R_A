import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  Globe, 
  MapPin, 
  Bell, 
  Eye, 
  Moon, 
  Volume2, 
  Smartphone,
  Wifi,
  Download,
  Shield,
  Languages,
  Save,
  Check
} from 'lucide-react';
import { toast } from 'sonner';
import { NewsRoboLogo } from '@/app/components/NewsRoboLogo';

export default function PreferencesPage() {
  const navigate = useNavigate();
  
  // Load preferences from localStorage
  const [language, setLanguage] = useState(() => 
    localStorage.getItem('newsrobo_language') || 'English'
  );
  const [location, setLocation] = useState(() => 
    localStorage.getItem('newsrobo_location') || 'Hyderabad, Telangana'
  );
  const [notifications, setNotifications] = useState(() => 
    localStorage.getItem('newsrobo_notifications') === 'true'
  );
  const [darkMode, setDarkMode] = useState(() => 
    localStorage.getItem('newsrobo_darkmode') === 'true'
  );
  const [autoPlay, setAutoPlay] = useState(() => 
    localStorage.getItem('newsrobo_autoplay') === 'true'
  );
  const [dataMode, setDataMode] = useState(() => 
    localStorage.getItem('newsrobo_datamode') || 'auto'
  );
  const [offlineMode, setOfflineMode] = useState(() => 
    localStorage.getItem('newsrobo_offline') === 'true'
  );

  const languages = [
    'English',
    'हिंदी (Hindi)',
    'తెలుగు (Telugu)',
    'தமிழ் (Tamil)',
    'ಕನ್ನಡ (Kannada)',
    'മലയാളം (Malayalam)',
    'বাংলা (Bengali)',
    'ગુજરાતી (Gujarati)',
    'ਪੰਜਾਬੀ (Punjabi)',
    'मराठी (Marathi)'
  ];

  const states = [
    'Andhra Pradesh',
    'Telangana',
    'Karnataka',
    'Tamil Nadu',
    'Kerala',
    'Maharashtra',
    'Gujarat',
    'Punjab',
    'West Bengal'
  ];

  const savePreferences = () => {
    localStorage.setItem('newsrobo_language', language);
    localStorage.setItem('newsrobo_location', location);
    localStorage.setItem('newsrobo_notifications', String(notifications));
    localStorage.setItem('newsrobo_darkmode', String(darkMode));
    localStorage.setItem('newsrobo_autoplay', String(autoPlay));
    localStorage.setItem('newsrobo_datamode', dataMode);
    localStorage.setItem('newsrobo_offline', String(offlineMode));
    
    toast.success('Preferences saved successfully!', {
      icon: <Check className="w-5 h-5" />
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-[#D32F2F] to-[#C62828] px-4 py-4 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <NewsRoboLogo className="h-10 w-10" />
          <div className="flex-1">
            <h1 className="text-white font-bold text-xl">Preferences</h1>
            <p className="text-white/80 text-xs">Customize your experience</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24 max-w-2xl mx-auto">
        {/* Language Section */}
        <div className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Languages className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Language</h2>
              <p className="text-white/80 text-xs">Select your preferred language</p>
            </div>
          </div>
          <div className="p-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-[#212121] font-semibold"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Location Section */}
        <div className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-3 flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Location</h2>
              <p className="text-white/80 text-xs">Get hyperlocal news</p>
            </div>
          </div>
          <div className="p-4">
            <select
              value={location.split(',')[0].trim()}
              onChange={(e) => setLocation(`${e.target.value}, India`)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-[#212121] font-semibold"
            >
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-4 py-3 flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Notifications</h2>
              <p className="text-white/80 text-xs">Breaking news alerts</p>
            </div>
          </div>
          <div className="p-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-[#212121] font-semibold">Push Notifications</p>
                <p className="text-[#212121]/60 text-xs">Get breaking news alerts</p>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="w-12 h-6 rounded-full appearance-none bg-gray-300 checked:bg-[#D32F2F] relative cursor-pointer transition-colors
                  before:content-[''] before:absolute before:w-5 before:h-5 before:rounded-full before:bg-white before:top-0.5 before:left-0.5
                  before:transition-transform checked:before:translate-x-6 before:shadow-md"
              />
            </label>
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-3 flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Display</h2>
              <p className="text-white/80 text-xs">Customize appearance</p>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-[#212121] font-semibold">Dark Mode</p>
                  <p className="text-[#212121]/60 text-xs">Eye-friendly display</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                className="w-12 h-6 rounded-full appearance-none bg-gray-300 checked:bg-purple-600 relative cursor-pointer transition-colors
                  before:content-[''] before:absolute before:w-5 before:h-5 before:rounded-full before:bg-white before:top-0.5 before:left-0.5
                  before:transition-transform checked:before:translate-x-6 before:shadow-md"
              />
            </label>
          </div>
        </div>

        {/* Media Settings */}
        <div className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-3 flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Volume2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Media</h2>
              <p className="text-white/80 text-xs">Video & audio settings</p>
            </div>
          </div>
          <div className="p-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-[#212121] font-semibold">Auto-play Videos</p>
                <p className="text-[#212121]/60 text-xs">Automatically play video news</p>
              </div>
              <input
                type="checkbox"
                checked={autoPlay}
                onChange={(e) => setAutoPlay(e.target.checked)}
                className="w-12 h-6 rounded-full appearance-none bg-gray-300 checked:bg-red-600 relative cursor-pointer transition-colors
                  before:content-[''] before:absolute before:w-5 before:h-5 before:rounded-full before:bg-white before:top-0.5 before:left-0.5
                  before:transition-transform checked:before:translate-x-6 before:shadow-md"
              />
            </label>
          </div>
        </div>

        {/* Data Settings */}
        <div className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-4 py-3 flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Wifi className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Data Usage</h2>
              <p className="text-white/80 text-xs">Manage data consumption</p>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <p className="text-[#212121] font-semibold mb-2">Data Saver Mode</p>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="dataMode"
                    value="auto"
                    checked={dataMode === 'auto'}
                    onChange={(e) => setDataMode(e.target.value)}
                    className="w-5 h-5 text-[#D32F2F]"
                  />
                  <div>
                    <p className="text-[#212121] font-medium">Automatic</p>
                    <p className="text-[#212121]/60 text-xs">System decides quality</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="dataMode"
                    value="wifi"
                    checked={dataMode === 'wifi'}
                    onChange={(e) => setDataMode(e.target.value)}
                    className="w-5 h-5 text-[#D32F2F]"
                  />
                  <div>
                    <p className="text-[#212121] font-medium">Wi-Fi Only</p>
                    <p className="text-[#212121]/60 text-xs">Load media on Wi-Fi only</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="dataMode"
                    value="always"
                    checked={dataMode === 'always'}
                    onChange={(e) => setDataMode(e.target.value)}
                    className="w-5 h-5 text-[#D32F2F]"
                  />
                  <div>
                    <p className="text-[#212121] font-medium">Always Load</p>
                    <p className="text-[#212121]/60 text-xs">Full quality everywhere</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Offline Mode */}
        <div className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 py-3 flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Offline Reading</h2>
              <p className="text-white/80 text-xs">Save articles for offline</p>
            </div>
          </div>
          <div className="p-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-[#212121] font-semibold">Enable Offline Mode</p>
                <p className="text-[#212121]/60 text-xs">Auto-download daily news</p>
              </div>
              <input
                type="checkbox"
                checked={offlineMode}
                onChange={(e) => setOfflineMode(e.target.checked)}
                className="w-12 h-6 rounded-full appearance-none bg-gray-300 checked:bg-indigo-600 relative cursor-pointer transition-colors
                  before:content-[''] before:absolute before:w-5 before:h-5 before:rounded-full before:bg-white before:top-0.5 before:left-0.5
                  before:transition-transform checked:before:translate-x-6 before:shadow-md"
              />
            </label>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-3 flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Privacy & Security</h2>
              <p className="text-white/80 text-xs">Manage your data</p>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <p className="text-[#212121] font-semibold">Clear Cache</p>
              <p className="text-[#212121]/60 text-xs">Free up storage space</p>
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <p className="text-[#212121] font-semibold">Privacy Policy</p>
              <p className="text-[#212121]/60 text-xs">Read our privacy policy</p>
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <button
          onClick={savePreferences}
          className="w-full bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          Save Preferences
        </button>
      </div>
    </div>
  );
}