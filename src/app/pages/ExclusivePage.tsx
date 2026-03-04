import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Star, Crown, Lock, CheckCircle, Zap } from 'lucide-react';
import { NewsRoboLogo } from '@/app/components/NewsRoboLogo';

export default function ExclusivePage() {
  const navigate = useNavigate();
  const [isPremium] = useState(false); // In real app, check subscription status

  const exclusiveNews = [
    {
      id: 1,
      title: 'Exclusive Interview: Tech CEO Reveals Future Plans',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
      category: 'Business',
      isPremium: true,
      readTime: '8 min'
    },
    {
      id: 2,
      title: 'Behind the Scenes: Political Decision Making',
      image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800',
      category: 'Politics',
      isPremium: true,
      readTime: '12 min'
    },
    {
      id: 3,
      title: 'Investigative Report: Uncovering Local Corruption',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
      category: 'Investigation',
      isPremium: true,
      readTime: '15 min'
    },
    {
      id: 4,
      title: 'Expert Analysis: Market Trends for 2026',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      category: 'Finance',
      isPremium: false,
      readTime: '6 min'
    }
  ];

  const premiumFeatures = [
    'Ad-free experience',
    'Exclusive investigative reports',
    'Early access to breaking news',
    'Premium video content',
    'Offline reading mode',
    'Priority customer support'
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-[#FFC107] via-[#FFB300] to-[#FFA000] px-4 py-4 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-[#212121] hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <NewsRoboLogo className="h-10 w-10" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-[#212121]" />
              <h1 className="text-[#212121] font-bold text-xl">Exclusive Content</h1>
            </div>
            <p className="text-[#212121]/70 text-xs">Premium stories & insights</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24 max-w-4xl mx-auto">
        {/* Premium Banner */}
        {!isPremium && (
          <div className="bg-gradient-to-br from-[#212121] via-[#424242] to-[#616161] rounded-3xl p-6 mb-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC107] rounded-full -mr-16 -mt-16 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#D32F2F] rounded-full -ml-12 -mb-12 opacity-20"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-[#FFC107] rounded-full p-4">
                  <Crown className="w-12 h-12 text-[#212121]" />
                </div>
              </div>
              
              <h2 className="text-white text-2xl font-bold text-center mb-2">
                Upgrade to Premium
              </h2>
              <p className="text-white/80 text-center mb-6">
                Get unlimited access to exclusive content and premium features
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                {premiumFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#FFC107] flex-shrink-0 mt-0.5" />
                    <span className="text-white text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full bg-gradient-to-r from-[#FFC107] to-[#FFB300] text-[#212121] py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2">
                <Zap className="w-6 h-6" />
                Subscribe Now - ₹99/month
              </button>
              
              <p className="text-white/60 text-xs text-center mt-3">
                7-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        )}

        {/* Exclusive Articles */}
        <div className="space-y-4">
          {exclusiveNews.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all relative"
            >
              {article.isPremium && !isPremium && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center">
                    <Lock className="w-12 h-12 text-[#FFC107] mx-auto mb-3" />
                    <p className="text-white font-bold text-lg mb-2">Premium Content</p>
                    <button className="bg-[#FFC107] text-[#212121] px-6 py-2 rounded-full font-bold text-sm hover:bg-[#FFB300] transition-colors">
                      Unlock Now
                    </button>
                  </div>
                </div>
              )}
              
              <div className="md:flex">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full md:w-64 h-48 object-cover"
                />
                <div className="flex-1 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      article.isPremium 
                        ? 'bg-[#FFC107] text-[#212121]' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {article.category}
                    </span>
                    {article.isPremium && (
                      <div className="flex items-center gap-1 text-[#FFC107]">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-xs font-bold">PREMIUM</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-[#212121] font-bold text-xl mb-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-[#212121]/60 text-sm mb-3">
                    Deep dive analysis with exclusive insights from industry experts and insider perspectives.
                  </p>
                  
                  <div className="flex items-center gap-4 text-[#212121]/50 text-xs">
                    <span>📖 {article.readTime} read</span>
                    <span>⭐ Exclusive</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Footer */}
        {!isPremium && (
          <div className="mt-8 bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] rounded-2xl p-6 text-white text-center shadow-xl">
            <Star className="w-12 h-12 mx-auto mb-3 text-[#FFC107]" />
            <h3 className="text-xl font-bold mb-2">Don't Miss Out!</h3>
            <p className="text-white/90 text-sm mb-4">
              Join thousands of readers getting premium news content
            </p>
            <button className="bg-white text-[#D32F2F] px-8 py-3 rounded-xl font-bold hover:shadow-xl transition-all">
              Start Free Trial
            </button>
          </div>
        )}
      </div>
    </div>
  );
}