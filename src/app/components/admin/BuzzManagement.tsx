import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Play, Eye, Heart, Share2, Trash2, CheckCircle, XCircle } from "lucide-react";

const mockBuzzVideos = [
  {
    id: 1,
    title: "Street Food Festival Highlights",
    thumbnail: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
    uploader: "Rohit Mehta",
    location: "Mumbai, Maharashtra",
    duration: "0:45",
    views: 125000,
    likes: 8900,
    shares: 450,
    status: "Published",
    uploadDate: "2026-02-01"
  },
  {
    id: 2,
    title: "Traditional Dance Performance",
    thumbnail: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400",
    uploader: "Lakshmi Iyer",
    location: "Kochi, Kerala",
    duration: "1:12",
    views: 98000,
    likes: 6700,
    shares: 320,
    status: "Published",
    uploadDate: "2026-02-01"
  },
  {
    id: 3,
    title: "Village Cricket Match",
    thumbnail: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400",
    uploader: "Arjun Patel",
    location: "Ahmedabad, Gujarat",
    duration: "0:58",
    views: 156000,
    likes: 12400,
    shares: 680,
    status: "Published",
    uploadDate: "2026-01-31"
  },
  {
    id: 4,
    title: "Local Market Tour",
    thumbnail: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400",
    uploader: "Meena Kumari",
    location: "Jaipur, Rajasthan",
    duration: "1:05",
    views: 0,
    likes: 0,
    shares: 0,
    status: "Pending",
    uploadDate: "2026-02-01"
  },
];

export function BuzzManagement() {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const getStatusColor = (status: string) => {
    return status === "Published" 
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#212121] dark:text-white">Buzz Videos Management</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage viral short-form video content</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-md">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Videos</p>
          <p className="text-2xl font-bold text-[#212121] dark:text-white mt-1">12,450</p>
          <p className="text-xs text-green-600 mt-1">+15.7% this week</p>
        </Card>
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-md">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
          <p className="text-2xl font-bold text-[#D32F2F] mt-1">45.2M</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Last 30 days</p>
        </Card>
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-md">
          <p className="text-sm text-gray-600 dark:text-gray-400">Pending Review</p>
          <p className="text-2xl font-bold text-[#FFC107] mt-1">38</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Awaiting approval</p>
        </Card>
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-md">
          <p className="text-sm text-gray-600 dark:text-gray-400">Avg Engagement</p>
          <p className="text-2xl font-bold text-[#4CAF50] mt-1">8.4%</p>
          <p className="text-xs text-green-600 mt-1">+2.3% improvement</p>
        </Card>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBuzzVideos.map((video) => (
          <Card key={video.id} className="bg-white dark:bg-[#1E1E1E] border-none shadow-lg hover:shadow-xl transition-all overflow-hidden">
            {/* Thumbnail */}
            <div className="relative group">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="lg" className="rounded-full w-16 h-16 bg-white hover:bg-gray-100">
                  <Play size={28} className="text-[#D32F2F] fill-current" />
                </Button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
              <Badge className={`absolute top-2 right-2 ${getStatusColor(video.status)}`}>
                {video.status}
              </Badge>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-[#212121] dark:text-white mb-2">{video.title}</h3>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#D32F2F] flex items-center justify-center text-white font-bold text-xs">
                  {video.uploader.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="text-sm">
                  <p className="font-medium text-[#212121] dark:text-white">{video.uploader}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{video.location}</p>
                </div>
              </div>

              {/* Stats */}
              {video.status === "Published" && (
                <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b dark:border-gray-700">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400">
                      <Eye size={14} />
                      <span className="text-xs">{formatNumber(video.views)}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400">
                      <Heart size={14} />
                      <span className="text-xs">{formatNumber(video.likes)}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400">
                      <Share2 size={14} />
                      <span className="text-xs">{formatNumber(video.shares)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              {video.status === "Published" ? (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye size={14} className="mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900">
                    <Trash2 size={14} />
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                    <CheckCircle size={14} className="mr-1" />
                    Approve
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900">
                    <XCircle size={14} />
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
