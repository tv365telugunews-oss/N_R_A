export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  image: string;
  video?: string; // Optional video URL for video-based news
  photoGallery?: string[]; // Array of photos for gallery mode (up to 6)
  category: string;
  location: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  comments: number;
  trustScore: number;
  source: string;
  language: string;
  isBreaking?: boolean;
  tags?: string[];
  mediaType?: 'image' | 'video' | 'video-text' | 'photo-gallery' | 'full-video' | 'ad'; // Type of media to display
  adContent?: {
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    advertiser: string;
  };
}

export type Category = 
  | 'All News'
  | 'Breaking'
  | 'Politics'
  | 'Cinema'
  | 'Business'
  | 'Sports'
  | 'Technology'
  | 'Education'
  | 'Crime'
  | 'Health';