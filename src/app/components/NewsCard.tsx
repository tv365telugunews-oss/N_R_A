import { ThumbsUp, ThumbsDown, Share2, MoreVertical, Download, Flag, MessageCircle, Bookmark } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Badge } from "@/app/components/ui/badge";

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  image: string;
  category: string;
  location: string;
  timeAgo: string;
  isBreaking?: boolean;
  language: string;
  likes: number;
  dislikes: number;
  source: string;
  trustScore?: number;
  comments?: number;
}

interface NewsCardProps {
  article: NewsArticle;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onShare: (id: string) => void;
  onReport: (id: string) => void;
  onDownloadImage: (id: string) => void;
  onComment?: (id: string) => void;
  onBookmark?: (id: string) => void;
  isLiked?: boolean;
  isDisliked?: boolean;
  isBookmarked?: boolean;
}

export function NewsCard({
  article,
  onLike,
  onDislike,
  onShare,
  onReport,
  onDownloadImage,
  onComment,
  onBookmark,
  isLiked,
  isDisliked,
  isBookmarked,
}: NewsCardProps) {
  return (
    <div className="h-full w-full bg-card relative flex flex-col snap-start snap-always">
      {/* Image Section - 38% */}
      <div className="relative h-[38%] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        
        {/* Breaking News Badge */}
        {article.isBreaking && (
          <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground animate-pulse">
            ⚡ BREAKING
          </Badge>
        )}
        
        {/* Top Navigation */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 text-white"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onReport(article.id)}>
                <Flag className="mr-2 h-4 w-4" />
                Report Story
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDownloadImage(article.id)}>
                <Download className="mr-2 h-4 w-4" />
                Download Image
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Category & Location */}
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <Badge variant="secondary" className="bg-primary text-primary-foreground">
            {article.category}
          </Badge>
          <span className="text-xs text-white/90 bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
            📍 {article.location}
          </span>
        </div>
      </div>

      {/* Content Section - 48% */}
      <div className="h-[48%] px-5 py-4 flex flex-col overflow-hidden">
        {/* Header Info */}
        <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            {article.source}
            {article.trustScore && (
              <span className="text-accent">✓ {article.trustScore}%</span>
            )}
          </span>
          <span>{article.timeAgo}</span>
        </div>

        {/* Title */}
        <h2 className="mb-3 line-clamp-2 leading-tight text-foreground">
          {article.title}
        </h2>

        {/* Summary */}
        <p className="flex-1 text-sm text-muted-foreground line-clamp-4 leading-relaxed">
          {article.summary}
        </p>

        {/* Stats */}
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span>{article.likes} likes</span>
          <span>•</span>
          <span className="px-2 py-1 rounded bg-muted/50">{article.language}</span>
        </div>
      </div>

      {/* Action Buttons - Vertical Stack (14% - UI/Padding) */}
      <div className="absolute right-3 bottom-[16%] flex flex-col items-center gap-4">
        <button
          onClick={() => onLike(article.id)}
          className="flex flex-col items-center gap-1 group"
        >
          <div
            className={`h-12 w-12 rounded-full flex items-center justify-center transition-all ${
              isLiked
                ? "bg-primary text-white scale-110"
                : "bg-white/90 backdrop-blur-md hover:bg-primary hover:text-white shadow-lg"
            }`}
          >
            <ThumbsUp className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} />
          </div>
          <span className="text-xs">{article.likes}</span>
        </button>

        <button
          onClick={() => onDislike(article.id)}
          className="flex flex-col items-center gap-1 group"
        >
          <div
            className={`h-12 w-12 rounded-full flex items-center justify-center transition-all ${
              isDisliked
                ? "bg-secondary text-white scale-110"
                : "bg-white/90 backdrop-blur-md hover:bg-secondary hover:text-white shadow-lg"
            }`}
          >
            <ThumbsDown className="h-5 w-5" fill={isDisliked ? "currentColor" : "none"} />
          </div>
        </button>

        <button
          onClick={() => onShare(article.id)}
          className="flex flex-col items-center gap-1 group"
        >
          <div className="h-12 w-12 rounded-full bg-white/90 backdrop-blur-md hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all shadow-lg">
            <Share2 className="h-5 w-5" />
          </div>
        </button>

        {onComment && (
          <button
            onClick={() => onComment(article.id)}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="h-12 w-12 rounded-full bg-white/90 backdrop-blur-md hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all shadow-lg">
              <MessageCircle className="h-5 w-5" />
            </div>
            <span className="text-xs">{article.comments}</span>
          </button>
        )}

        {onBookmark && (
          <button
            onClick={() => onBookmark(article.id)}
            className="flex flex-col items-center gap-1 group"
          >
            <div
              className={`h-12 w-12 rounded-full flex items-center justify-center transition-all ${
                isBookmarked
                  ? "bg-accent text-white scale-110"
                  : "bg-white/90 backdrop-blur-md hover:bg-accent hover:text-white shadow-lg"
              }`}
            >
              <Bookmark className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}