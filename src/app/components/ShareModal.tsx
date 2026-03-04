import { X, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { FaWhatsapp, FaFacebookF, FaTwitter, FaTelegramPlane, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  url: string;
}

export function ShareModal({ isOpen, onClose, title, content, url }: ShareModalProps) {
  if (!isOpen) return null;

  // Safe copy to clipboard with fallback
  const copyToClipboard = async (text: string) => {
    try {
      // Try modern clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        toast.success('Link copied to clipboard!');
        return true;
      }
    } catch (err) {
      console.log('Clipboard API failed, using fallback');
    }

    // Fallback method using textarea
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.top = '0';
      textarea.style.left = '0';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      
      if (successful) {
        toast.success('Link copied to clipboard!');
        return true;
      }
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }

    // If all else fails, show the URL to user
    toast.error(`Copy this link: ${text}`);
    return false;
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: content.substring(0, 200) + '...',
          url: url || window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      await copyToClipboard(url || window.location.href);
    }
    onClose();
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      color: '#25D366',
      url: `https://wa.me/?text=${encodeURIComponent(title + ' - ' + (url || window.location.href))}`
    },
    {
      name: 'Facebook',
      icon: FaFacebookF,
      color: '#1877F2',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url || window.location.href)}`
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      color: '#1DA1F2',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url || window.location.href)}`
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      color: '#E4405F',
      url: `https://www.instagram.com/` // Instagram doesn't allow direct sharing via URL
    },
    {
      name: 'Telegram',
      icon: FaTelegramPlane,
      color: '#0088cc',
      url: `https://t.me/share/url?url=${encodeURIComponent(url || window.location.href)}&text=${encodeURIComponent(title)}`
    },
    {
      name: 'Gmail',
      icon: SiGmail,
      color: '#EA4335',
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(content.substring(0, 200) + '...\n\n' + (url || window.location.href))}`
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedinIn,
      color: '#0077B5',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url || window.location.href)}`
    }
  ];

  const handleShareOption = (shareUrl: string, name: string) => {
    if (name === 'Instagram') {
      toast.info('Instagram sharing is not available via web. Please use the Instagram app.');
      return;
    }
    window.open(shareUrl, '_blank', 'width=600,height=400');
    onClose();
  };

  const copyLink = async () => {
    await copyToClipboard(url || window.location.href);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl animate-slide-up p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#212121]">Share this news</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Native Share Button (if supported) */}
        {navigator.share && (
          <button
            onClick={handleNativeShare}
            className="w-full mb-4 bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Share2 size={20} />
            Share via...
          </button>
        )}

        {/* Share Options Grid */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => handleShareOption(option.url, option.name)}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md"
                style={{ backgroundColor: option.color }}
              >
                <option.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-medium text-gray-700">{option.name}</span>
            </button>
          ))}
        </div>

        {/* Copy Link Button */}
        <button
          onClick={copyLink}
          className="w-full border-2 border-[#D32F2F] text-[#D32F2F] py-3 rounded-xl font-bold hover:bg-[#D32F2F] hover:text-white transition-all"
        >
          Copy Link
        </button>
      </div>
    </div>
  );
}
