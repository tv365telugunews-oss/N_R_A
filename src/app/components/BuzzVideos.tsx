import { Play, Eye, MessageCircle } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";

interface BuzzVideo {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  duration: string;
  category: string;
  isLive?: boolean;
}

interface BuzzVideosProps {
  videos: BuzzVideo[];
  onVideoClick: (id: string) => void;
}

export function BuzzVideos({ videos, onVideoClick }: BuzzVideosProps) {
  return (
    <div className="h-full overflow-y-auto pb-20">
      <div className="p-4">
        <h2 className="mb-4">🔥 Buzz Videos - Trending Now</h2>
        
        <div className="grid grid-cols-2 gap-3">
          {videos.map((video) => (
            <div
              key={video.id}
              onClick={() => onVideoClick(video.id)}
              className="relative rounded-lg overflow-hidden cursor-pointer group"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[9/16] bg-muted">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-primary/80 transition-colors">
                    <Play className="h-6 w-6 text-white fill-white ml-1" />
                  </div>
                </div>

                {/* Duration */}
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-xs text-white">
                  {video.duration}
                </div>

                {/* Live Badge */}
                {video.isLive && (
                  <Badge className="absolute top-2 left-2 bg-primary text-white animate-pulse">
                    🔴 LIVE
                  </Badge>
                )}

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-sm line-clamp-2 mb-1">
                    {video.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {video.views}
                    </span>
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
