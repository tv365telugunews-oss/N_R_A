import { useState } from "react";
import { createPortal } from "react-dom";
import { 
  Camera, 
  Video, 
  X, 
  MapPin, 
  CheckCircle2, 
  Image as ImageIcon, 
  Send, 
  Images,
  Play,
  DollarSign,
  FileText,
  Upload,
  BookOpen
} from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Button } from "@/app/components/ui/button";

interface ComprehensiveUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ContentType = 'standard' | 'video-text' | 'full-video' | 'photo-gallery' | 'ad' | 'ebook';

export function ComprehensiveUploadModal({ isOpen, onClose }: ComprehensiveUploadModalProps) {
  const [contentType, setContentType] = useState<ContentType>('standard');
  const [currentStep, setCurrentStep] = useState(1);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    language: "English",
    category: "Politics",
    status: "Draft",
    // Ad specific fields
    advertiser: "",
    ctaText: "",
    ctaLink: "",
    // E-book specific fields
    author: "",
    isbn: "",
    publisher: "",
    pageCount: "",
  });

  if (!isOpen) return null;

  const handleContentTypeSelect = (type: ContentType) => {
    setContentType(type);
    setCurrentStep(2); // Automatically move to upload step
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validation based on content type
    if (contentType === 'photo-gallery' && mediaFiles.length + files.length > 6) {
      toast.error("Photo Gallery can have maximum 6 photos");
      return;
    }
    if (contentType === 'full-video' && mediaFiles.length > 0) {
      toast.error("Full Video can have only 1 video");
      return;
    }
    if (contentType === 'video-text' && mediaFiles.length > 0) {
      toast.error("Video+Text can have only 1 video");
      return;
    }

    if (files.length > 0) {
      setMediaFiles([...mediaFiles, ...files]);
      toast.success(`${files.length} file(s) added`);
    }
  };

  const removeMedia = (index: number) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (currentStep === 2 && mediaFiles.length === 0 && contentType !== 'ad' && contentType !== 'ebook') {
      toast.error("Please upload at least one media file");
      return;
    }
    if (currentStep === 2 && contentType === 'photo-gallery' && mediaFiles.length < 2) {
      toast.error("Photo Gallery needs at least 2 photos");
      return;
    }
    if (currentStep === 3) {
      if (!formData.title || !formData.description || !formData.location) {
        toast.error("Please fill all required fields");
        return;
      }
      if (contentType === 'ad' && (!formData.advertiser || !formData.ctaText || !formData.ctaLink)) {
        toast.error("Please fill all ad-specific fields");
        return;
      }
      if (contentType === 'ebook' && (!formData.author || !formData.isbn || !formData.publisher || !formData.pageCount)) {
        toast.error("Please fill all e-book-specific fields");
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      handleClose();
    }
  };

  const handleSubmit = () => {
    const statusText = formData.status === "Published" ? "published" : "saved as draft";
    toast.success(`${getContentTypeLabel()} ${statusText} successfully!`, {
      description: formData.status === "Published" ? "Your content is now live." : "You can publish it later.",
    });
    handleClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    setMediaFiles([]);
    setFormData({
      title: "",
      description: "",
      location: "",
      language: "English",
      category: "Politics",
      status: "Draft",
      advertiser: "",
      ctaText: "",
      ctaLink: "",
      author: "",
      isbn: "",
      publisher: "",
      pageCount: "",
    });
    setContentType('standard');
    onClose();
  };

  const getMediaIcon = (file: File) => {
    if (file.type.startsWith("video/")) {
      return <Video className="h-4 w-4 text-red-500" />;
    }
    return <ImageIcon className="h-4 w-4 text-blue-500" />;
  };

  const getContentTypeLabel = () => {
    switch (contentType) {
      case 'standard': return 'Standard News';
      case 'video-text': return 'Video + Text News';
      case 'full-video': return 'Full Video';
      case 'photo-gallery': return 'Photo Gallery';
      case 'ad': return 'Sponsored Content';
      case 'ebook': return 'E-book';
      default: return 'Content';
    }
  };

  const getContentTypeDescription = () => {
    switch (contentType) {
      case 'standard': return 'Image or video with text description (42% media, 52% text)';
      case 'video-text': return 'Video on top with text below (42% video, 52% text)';
      case 'full-video': return 'Full-screen immersive video (94% video with overlay)';
      case 'photo-gallery': return 'Up to 6 photos with horizontal swipe (42% gallery, 52% text)';
      case 'ad': return 'Full-screen sponsored advertisement';
      case 'ebook': return 'Full-screen digital e-book with single-page slide navigation';
      default: return '';
    }
  };

  const getAcceptedFileTypes = () => {
    switch (contentType) {
      case 'full-video':
      case 'video-text':
        return 'video/*';
      case 'photo-gallery':
        return 'image/*';
      case 'standard':
        return 'image/*,video/*';
      case 'ad':
        return 'image/*';
      case 'ebook':
        return 'application/pdf';
      default:
        return 'image/*,video/*';
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[300] bg-black/80 flex items-center justify-center p-4 pointer-events-auto">
      {/* Backdrop */}
      <div className="absolute inset-0 pointer-events-auto" onClick={handleClose} />

      {/* Upload Panel */}
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-2xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-300 pointer-events-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-[#212121] dark:text-white">
              Upload Content
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Create and publish content with multiple format options
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Content Type Selection (Step 0) */}
        {currentStep === 1 && (
          <div className="p-6 border-b dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-[#212121] dark:text-white">
              Select Content Type
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{/* Changed from md:grid-cols-5 to md:grid-cols-3 */}
              <button
                onClick={() => handleContentTypeSelect('standard')}
                className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                  contentType === 'standard'
                    ? 'border-[#D32F2F] bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <ImageIcon className="h-8 w-8 mx-auto mb-2 text-[#D32F2F]" />
                <p className="text-sm font-medium text-center">Standard</p>
                <p className="text-xs text-gray-500 mt-1 text-center">Image/Video + Text</p>
              </button>

              <button
                onClick={() => handleContentTypeSelect('video-text')}
                className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                  contentType === 'video-text'
                    ? 'border-[#D32F2F] bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <Video className="h-8 w-8 mx-auto mb-2 text-[#D32F2F]" />
                <p className="text-sm font-medium text-center">Video + Text</p>
                <p className="text-xs text-gray-500 mt-1 text-center">Video with text</p>
              </button>

              <button
                onClick={() => handleContentTypeSelect('full-video')}
                className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                  contentType === 'full-video'
                    ? 'border-[#D32F2F] bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <Play className="h-8 w-8 mx-auto mb-2 text-[#D32F2F]" />
                <p className="text-sm font-medium text-center">Full Video</p>
                <p className="text-xs text-gray-500 mt-1 text-center">100% Video</p>
              </button>

              <button
                onClick={() => handleContentTypeSelect('photo-gallery')}
                className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                  contentType === 'photo-gallery'
                    ? 'border-[#D32F2F] bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <Images className="h-8 w-8 mx-auto mb-2 text-[#D32F2F]" />
                <p className="text-sm font-medium text-center">Photo Gallery</p>
                <p className="text-xs text-gray-500 mt-1 text-center">Up to 6 photos</p>
              </button>

              <button
                onClick={() => handleContentTypeSelect('ad')}
                className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                  contentType === 'ad'
                    ? 'border-[#D32F2F] bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-[#FFC107]" />
                <p className="text-sm font-medium text-center">Sponsored Ad</p>
                <p className="text-xs text-gray-500 mt-1 text-center">Full-screen ad</p>
              </button>

              <button
                onClick={() => handleContentTypeSelect('ebook')}
                className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                  contentType === 'ebook'
                    ? 'border-[#D32F2F] bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <BookOpen className="h-8 w-8 mx-auto mb-2 text-[#D32F2F]" />
                <p className="text-sm font-medium text-center">E-book</p>
                <p className="text-xs text-gray-500 mt-1 text-center">Digital e-book</p>
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <strong>{getContentTypeLabel()}:</strong> {getContentTypeDescription()}
            </p>
          </div>
        )}

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 p-4 bg-gray-50 dark:bg-gray-900">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${
                  currentStep >= step
                    ? "bg-[#D32F2F] text-white"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
              >
                {step}
              </div>
              {step < 4 && (
                <div
                  className={`w-16 h-1 mx-2 transition-colors ${
                    currentStep > step ? "bg-[#D32F2F]" : "bg-gray-300 dark:bg-gray-700"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 2: Upload Media */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#212121] dark:text-white">
                Step 2: Upload Media
              </h3>

              {/* Upload Area */}
              <label className="block">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-[#D32F2F] transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {contentType === 'photo-gallery' 
                      ? 'Upload 2-6 photos'
                      : contentType === 'full-video' || contentType === 'video-text'
                      ? 'Upload 1 video'
                      : contentType === 'ad'
                      ? 'Upload 1 image'
                      : contentType === 'ebook'
                      ? 'Upload 1 PDF'
                      : 'Upload image or video'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Click to browse or drag and drop
                  </p>
                  <input
                    type="file"
                    multiple={contentType === 'photo-gallery' || contentType === 'standard'}
                    accept={getAcceptedFileTypes()}
                    onChange={handleMediaChange}
                    className="hidden"
                  />
                </div>
              </label>

              {/* Media Preview */}
              {mediaFiles.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Uploaded Files ({mediaFiles.length})
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {mediaFiles.map((file, index) => (
                      <div
                        key={index}
                        className="relative group bg-gray-100 dark:bg-gray-800 rounded-lg p-3"
                      >
                        <div className="flex items-center gap-3">
                          {getMediaIcon(file)}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeMedia(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Add Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#212121] dark:text-white">
                Step 3: Add Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Enter title..."
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Enter description..."
                  />
                </div>

                {/* Ad-specific fields */}
                {contentType === 'ad' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Advertiser Name *
                      </label>
                      <input
                        type="text"
                        value={formData.advertiser}
                        onChange={(e) => setFormData({ ...formData, advertiser: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Company name..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        CTA Button Text *
                      </label>
                      <input
                        type="text"
                        value={formData.ctaText}
                        onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Shop Now, Learn More, etc."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        CTA Link *
                      </label>
                      <input
                        type="url"
                        value={formData.ctaLink}
                        onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="https://..."
                      />
                    </div>
                  </>
                )}

                {/* E-book-specific fields */}
                {contentType === 'ebook' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Author Name *
                      </label>
                      <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Author name..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        ISBN *
                      </label>
                      <input
                        type="text"
                        value={formData.isbn}
                        onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="ISBN number..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Publisher *
                      </label>
                      <input
                        type="text"
                        value={formData.publisher}
                        onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Publisher name..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Page Count *
                      </label>
                      <input
                        type="text"
                        value={formData.pageCount}
                        onChange={(e) => setFormData({ ...formData, pageCount: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Number of pages..."
                      />
                    </div>
                  </>
                )}

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="City, State"
                    />
                  </div>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Language
                  </label>
                  <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Hindi">हिंदी (Hindi)</SelectItem>
                      <SelectItem value="Tamil">தமிழ் (Tamil)</SelectItem>
                      <SelectItem value="Telugu">తెలుగు (Telugu)</SelectItem>
                      <SelectItem value="Kannada">ಕನ್ನಡ (Kannada)</SelectItem>
                      <SelectItem value="Malayalam">മലയാളം (Malayalam)</SelectItem>
                      <SelectItem value="Marathi">मराठी (Marathi)</SelectItem>
                      <SelectItem value="Bengali">বাংলা (Bengali)</SelectItem>
                      <SelectItem value="Gujarati">ગુજરાતી (Gujarati)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Politics">Politics</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Entertainment">Entertainment</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Culture">Culture</SelectItem>
                      {contentType === 'ad' && <SelectItem value="Sponsored">Sponsored</SelectItem>}
                    </SelectContent>
                  </Select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Publish */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#212121] dark:text-white">
                Step 4: Review & Publish
              </h3>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">Content Type</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{getContentTypeLabel()}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">Media Files</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {mediaFiles.length} file(s) uploaded
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">Title</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{formData.title}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">Category & Language</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formData.category} • {formData.language}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">Location</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{formData.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">Status</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formData.status === "Published" ? "Will be published immediately" : "Saved as draft"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t dark:border-gray-700">
          <Button
            onClick={handleBack}
            variant="outline"
            className="gap-2"
          >
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </Button>

          {currentStep < 4 ? (
            <Button
              onClick={handleNext}
              className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white gap-2"
            >
              Next
              <Send className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white gap-2"
            >
              {formData.status === "Published" ? "Publish Now" : "Save Draft"}
              <CheckCircle2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}