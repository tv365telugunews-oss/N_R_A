import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, TrendingUp, Flame, Heart, Share2, MessageCircle, Eye } from 'lucide-react';
import { NewsRoboLogo } from '@/app/components/NewsRoboLogo';

export default function ViralPage() {
  const navigate = useNavigate();

  const viralNews = [
    {
      id: 1,
      title: 'Local Hero Saves Child from Traffic - Video Goes Viral!',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
      likes: '45K',
      shares: '12K',
      comments: '3.5K',
      views: '2.1M',
      trending: true
    },
    {
      id: 2,
      title: 'Street Food Vendor Becomes Overnight Sensation',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
      likes: '38K',
      shares: '9K',
      comments: '2.8K',
      views: '1.8M',
      trending: true
    },
    {
      id: 3,
      title: 'Unexpected Dance Performance at Railway Station',
      image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800',
      likes: '52K',
      shares: '15K',
      comments: '4.2K',
      views: '3.2M',
      trending: true
    },
    {
      id: 4,
      title: 'Teacher\'s Innovative Teaching Method Goes Viral',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
      likes: '29K',
      shares: '7K',
      comments: '1.9K',
      views: '1.5M',
      trending: false
    },
    {
      id: 5,
      title: 'Pet Dog Saves Family from Fire - Heartwarming Story',
      image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800',
      likes: '67K',
      shares: '22K',
      comments: '5.6K',
      views: '4.1M',
      trending: true
    },
    {
      id: 6,
      title: 'Young Entrepreneur\'s Success Story Inspires Thousands',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
      likes: '41K',
      shares: '11K',
      comments: '3.1K',
      views: '2.3M',
      trending: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-pink-600 to-red-600 px-4 py-4 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <NewsRoboLogo className="h-10 w-10" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#FFC107] animate-pulse" />
              <h1 className="text-white font-bold text-xl">Viral Stories</h1>
            </div>
            <p className="text-white/80 text-xs">Trending news across India</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 gap-4">
          {viralNews.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="relative">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-56 object-cover"
                />
                {story.trending && (
                  <div className="absolute top-3 right-3">
                    <div className="bg-gradient-to-r from-pink-600 to-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg animate-pulse">
                      <Flame className="w-4 h-4 text-[#FFC107]" />
                      TRENDING
                    </div>
                  </div>
                )}
                <div className="absolute bottom-3 left-3">
                  <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    {story.views} views
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-[#212121] font-bold text-lg mb-3">
                  {story.title}
                </h3>
                
                {/* Engagement Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <button className="flex items-center gap-2 text-[#D32F2F] hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
                    <Heart className="w-5 h-5" />
                    <span className="font-bold text-sm">{story.likes}</span>
                  </button>
                  
                  <button className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-bold text-sm">{story.comments}</span>
                  </button>
                  
                  <button className="flex items-center gap-2 text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span className="font-bold text-sm">{story.shares}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trending Banner */}
        <div className="mt-6 bg-gradient-to-r from-pink-600 to-red-600 rounded-2xl p-6 text-white text-center shadow-xl">
          <TrendingUp className="w-12 h-12 mx-auto mb-3 animate-bounce" />
          <h3 className="text-xl font-bold mb-2">Join the Conversation!</h3>
          <p className="text-white/90 text-sm">
            Share your local stories and become viral on NEWS ROBO
          </p>
        </div>
      </div>
    </div>
  );
}