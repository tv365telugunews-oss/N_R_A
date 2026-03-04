import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Play, Eye, Clock, TrendingUp } from 'lucide-react';
import { NewsRoboLogo } from '@/app/components/NewsRoboLogo';

export default function VideosPage() {
  const navigate = useNavigate();

  const videoNews = [
    {
      id: 1,
      title: 'Breaking: Major Tech Innovation Announced',
      thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
      duration: '3:45',
      views: '125K',
      category: 'Technology'
    },
    {
      id: 2,
      title: 'Sports: Cricket Match Highlights',
      thumbnail: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
      duration: '5:20',
      views: '89K',
      category: 'Sports'
    },
    {
      id: 3,
      title: 'Local News: City Development Updates',
      thumbnail: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800',
      duration: '2:30',
      views: '45K',
      category: 'Local'
    },
    {
      id: 4,
      title: 'Entertainment: Movie Review',
      thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
      duration: '4:15',
      views: '67K',
      category: 'Entertainment'
    },
    {
      id: 5,
      title: 'Health: Wellness Tips for 2026',
      thumbnail: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800',
      duration: '3:00',
      views: '52K',
      category: 'Health'
    },
    {
      id: 6,
      title: 'Business: Market Analysis Today',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      duration: '6:10',
      views: '38K',
      category: 'Business'
    }
  ];

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
            <h1 className="text-white font-bold text-xl">Video News</h1>
            <p className="text-white/80 text-xs">Watch latest news videos</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videoNews.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group hover:bg-black/50 transition-all">
                  <div className="bg-[#D32F2F] rounded-full p-4 group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </div>
                <div className="absolute top-2 left-2">
                  <span className="bg-[#D32F2F] text-white px-3 py-1 rounded-full text-xs font-bold">
                    {video.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-[#212121] font-bold text-base mb-2 line-clamp-2">
                  {video.title}
                </h3>
                <div className="flex items-center gap-4 text-[#212121]/60 text-xs">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{video.views} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Trending</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}