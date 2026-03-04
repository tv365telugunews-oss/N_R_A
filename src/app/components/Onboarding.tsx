import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Globe, Sparkles, ChevronDown } from 'lucide-react';
import indianLocationData from '@/data/indianLocations';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface OnboardingProps {
  onComplete: (location: string, language: string) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const { t } = useLanguage();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  // Get all states from comprehensive data
  const states = Object.keys(indianLocationData);

  // Get cities/districts for selected state
  const cities: string[] = selectedState 
    ? Object.keys(indianLocationData[selectedState as keyof typeof indianLocationData] || {})
    : [];

  const languages = [
    { name: 'English', native: 'English' },
    { name: 'Hindi', native: 'हिन्दी' },
    { name: 'Telugu', native: 'తెలుగు' },
    { name: 'Tamil', native: 'தமிழ்' },
    { name: 'Kannada', native: 'ಕನ್ನಡ' },
    { name: 'Malayalam', native: 'മലയാളം' },
    { name: 'Bengali', native: 'বাংলা' },
    { name: 'Gujarati', native: 'ગુજરાતી' },
    { name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { name: 'Marathi', native: 'मराठी' }
  ];

  const handleComplete = () => {
    if (selectedLocation && selectedState && selectedLanguage) {
      onComplete(`${selectedLocation}, ${selectedState}`, selectedLanguage);
    }
  };

  const isCompleteDisabled = !selectedLocation || !selectedState || !selectedLanguage;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      {/* Header with Text Only */}
      <div className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-10 px-6 py-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-1">
            <span className="text-[#D32F2F]">NEWS</span>
            {' '}
            <span className="text-[#2196F3]">ROBO</span>
          </h1>
          <p className="text-xs text-gray-500">{t('setupPreferences')}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Location Selection Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#D32F2F]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#212121]">
                  {t('selectLocation')}
                </h2>
                <p className="text-gray-600 text-sm">{t('getNewsFromArea')}</p>
              </div>
            </div>

            {/* State Dropdown */}
            <div className="mb-4">
              <label className="block text-[#212121] font-semibold mb-3 text-base">
                {t('selectState')}
              </label>
              <div className="relative">
                <select
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedLocation(''); // Reset city when state changes
                  }}
                  className="w-full px-4 py-4 pr-10 text-base font-medium bg-white border-2 border-gray-300 rounded-xl appearance-none focus:outline-none focus:border-[#D32F2F] transition-all cursor-pointer hover:border-gray-400"
                >
                  <option value="">{t('selectState')}</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* City Dropdown */}
            {selectedState && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4"
              >
                <label className="block text-[#212121] font-semibold mb-3 text-base">
                  {t('selectCity')}
                </label>
                <div className="relative">
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-4 py-4 pr-10 text-base font-medium bg-white border-2 border-gray-300 rounded-xl appearance-none focus:outline-none focus:border-[#D32F2F] transition-all cursor-pointer hover:border-gray-400"
                  >
                    <option value="">{t('selectCity')}</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Language Selection Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-[#2196F3]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#212121]">
                  {t('chooseLanguage')}
                </h2>
                <p className="text-gray-600 text-sm">{t('readInLanguage')}</p>
              </div>
            </div>

            {/* Language Dropdown */}
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-4 py-4 pr-10 text-base font-medium bg-white border-2 border-gray-300 rounded-xl appearance-none focus:outline-none focus:border-[#2196F3] transition-all cursor-pointer hover:border-gray-400"
              >
                <option value="">{t('chooseLanguage')}</option>
                {languages.map((lang) => (
                  <option key={lang.name} value={lang.name}>
                    {lang.native} ({lang.name})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-500 text-sm text-center mt-4"
            >
              {t('changeSettingsLater')}
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl p-4 z-20">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={handleComplete}
          disabled={isCompleteDisabled}
          className={`w-full max-w-2xl mx-auto px-8 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all ${
            isCompleteDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] text-white hover:shadow-xl active:scale-98'
          }`}
        >
          <span>{t('getStarted')}</span>
          <Sparkles className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}