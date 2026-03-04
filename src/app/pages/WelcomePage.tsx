import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { MapPin, Globe, TrendingUp, Sparkles } from 'lucide-react';
import { NewsRoboLogo } from '@/app/components/NewsRoboLogo';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';

export function WelcomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <MapPin className="w-5 h-5" />,
      title: 'Hyperlocal News',
      description: 'Get news from your village, city, and state',
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: '10+ Languages',
      description: 'Read news in your preferred regional language',
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: 'AI Personalized',
      description: 'Smart feed that learns what you love',
    },
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto text-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          className="mb-6"
        >
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg mb-4">
            <NewsRoboLogo className="w-24 h-24" />
          </div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-[#D32F2F]">NEWS</span>
            <span className="text-[#2196F3]">ROBO</span>
            <sup className="text-xs font-normal text-gray-600 ml-0.5">TM</sup>
          </h1>
          <p className="text-base text-black/80 font-medium mb-1">
            Your Hyperlocal News Companion
          </p>
          <p className="text-sm text-black/60">
            Swipe. Read. Stay Informed. 🇮🇳
          </p>
        </motion.div>

        {/* Features in One Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <Card className="p-5 bg-gray-50 border-2 border-gray-200 shadow-md">
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3 text-left"
                >
                  <div className="w-9 h-9 flex-shrink-0 bg-[#FFC107] rounded-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-black mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-black/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          {/* Use for Free Button */}
          <Button
            onClick={() => navigate('/terms')}
            className="w-full py-5 text-base font-semibold bg-[#D32F2F] text-white hover:bg-[#B71C1C] rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Use for Free
            </span>
          </Button>

          {/* Login Button */}
          <Button
            onClick={() => navigate('/login')}
            variant="outline"
            className="w-full py-5 text-base font-semibold bg-white text-[#D32F2F] border-2 border-[#D32F2F] hover:bg-[#D32F2F] hover:text-white rounded-full transition-all hover:scale-105 active:scale-95 shadow-md"
          >
            Login
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-black/50 text-xs mt-6"
        >
          Join millions of Indians staying informed with NEWS ROBO
        </motion.p>
      </div>
    </div>
  );
}