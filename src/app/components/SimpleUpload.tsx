import { useState } from "react";
import { Camera, Video, X, MapPin, Send, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useReporterAuth } from '@/app/contexts/ReporterAuthContext';
import { ReporterLogin } from '@/app/components/ReporterLogin';

interface UploadStep {
  step: number;
  title: string;
}

const steps: UploadStep[] = [
  { step: 1, title: "Upload Media" },
  { step: 2, title: "Add Details" },
  { step: 3, title: "Submit" },
];

interface SimpleUploadProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SimpleUpload({ isOpen, onClose }: SimpleUploadProps) {
  const { isAuthenticated } = useReporterAuth();
  const [showReporterLogin, setShowReporterLogin] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  if (!isOpen) return null;

  // Check if reporter is authenticated, if not show login
  if (!isAuthenticated) {
    return (
      <ReporterLogin 
        onLoginSuccess={() => {
          toast.success('Login successful! You can now submit news.');
        }} 
        onClose={onClose} 
      />
    );
  }

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setMediaFiles([...mediaFiles, ...files]);
      toast.success(`${files.length} file(s) added`);
    }
  };

  const removeMedia = (index: number) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (currentStep === 1 && mediaFiles.length === 0) {
      toast.error("Please upload at least one photo or video");
      return;
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
    if (!title || !description || !location) {
      toast.error("Please fill all fields");
      return;
    }

    toast.success("News submitted successfully!", {
      description: "Our team will verify and publish it shortly.",
    });

    handleClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    setMediaFiles([]);
    setTitle("");
    setDescription("");
    setLocation("");
    onClose();
  };

  const getMediaIcon = (file: File) => {
    if (file.type.startsWith("video/")) {
      return <Video className="h-4 w-4 text-red-500" />;
    }
    return <ImageIcon className="h-4 w-4 text-blue-500" />;
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0" 
        onClick={handleClose}
      />

      {/* Upload Panel */}
      <div className="relative w-full bg-white rounded-t-3xl shadow-2xl max-h-[92vh] flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] text-white px-6 py-5 rounded-t-3xl flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">📰 Report News</h2>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-2">
            {steps.map((s) => (
              <div key={s.step} className="flex-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      currentStep >= s.step
                        ? "bg-white text-[#D32F2F]"
                        : "bg-white/20 text-white/50"
                    }`}
                  >
                    {currentStep > s.step ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      s.step
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <p className={`text-xs ${currentStep >= s.step ? "text-white" : "text-white/50"}`}>
                      {s.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Upload Media */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Upload Photos or Videos</h3>
              <p className="text-sm text-gray-600">
                Add media to your news report (required)
              </p>

              {/* Upload Buttons */}
              <div className="grid grid-cols-2 gap-3">
                {/* Photo Upload */}
                <label className="relative group cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMediaChange}
                    className="hidden"
                    multiple
                  />
                  <div className="border-2 border-dashed border-blue-300 rounded-2xl p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all group-hover:border-blue-500 group-hover:scale-105">
                    <Camera className="h-12 w-12 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm font-bold text-blue-700">Photos</p>
                    <p className="text-xs text-blue-600 mt-1">JPG, PNG</p>
                  </div>
                </label>

                {/* Video Upload */}
                <label className="relative group cursor-pointer">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleMediaChange}
                    className="hidden"
                    multiple
                  />
                  <div className="border-2 border-dashed border-red-300 rounded-2xl p-6 text-center bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 transition-all group-hover:border-red-500 group-hover:scale-105">
                    <Video className="h-12 w-12 mx-auto mb-2 text-red-600" />
                    <p className="text-sm font-bold text-red-700">Videos</p>
                    <p className="text-xs text-red-600 mt-1">MP4, MOV</p>
                  </div>
                </label>
              </div>

              {/* Selected Files */}
              {mediaFiles.length > 0 && (
                <div className="mt-6 space-y-2">
                  <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    {mediaFiles.length} file(s) selected
                  </p>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {mediaFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border"
                      >
                        {getMediaIcon(file)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          onClick={() => removeMedia(index)}
                          className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center hover:bg-red-200 transition-colors flex-shrink-0"
                        >
                          <X className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Add Details */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-gray-900">Add News Details</h3>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  News Headline *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a compelling headline..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#D32F2F] focus:ring-0 outline-none text-base"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what happened, when, and where..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#D32F2F] focus:ring-0 outline-none min-h-[120px] text-base resize-none"
                  maxLength={600}
                />
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500">
                    {description.length}/600 characters
                  </span>
                  {description.length >= 50 && (
                    <span className="text-xs text-green-600 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Good length
                    </span>
                  )}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#D32F2F]" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, State (e.g., Mumbai, Maharashtra)"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#D32F2F] focus:ring-0 outline-none text-base"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-gray-900">Review Your Submission</h3>

              {/* Media Preview */}
              <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">Media Files</p>
                <p className="text-base text-gray-900">{mediaFiles.length} files uploaded</p>
              </div>

              {/* Title Preview */}
              <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">Headline</p>
                <p className="text-base text-gray-900">{title}</p>
              </div>

              {/* Description Preview */}
              <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">Description</p>
                <p className="text-base text-gray-900">{description}</p>
              </div>

              {/* Location Preview */}
              <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">Location</p>
                <p className="text-base text-gray-900 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#D32F2F]" />
                  {location}
                </p>
              </div>

              {/* Verification Notice */}
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-amber-900 mb-2">
                  📋 Verification Process
                </p>
                <ul className="text-sm text-amber-800 space-y-1 ml-4 list-disc">
                  <li>Your report will be reviewed within 24 hours</li>
                  <li>You'll earn trust points for verified news</li>
                  <li>Ensure all information is accurate</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex-shrink-0 p-6 border-t bg-gray-50 flex gap-3">
          <button
            onClick={handleBack}
            className="flex-1 py-3 px-6 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
          >
            {currentStep === 1 ? "Cancel" : "Back"}
          </button>
          
          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              className="flex-1 py-3 px-6 bg-[#D32F2F] text-white rounded-xl font-semibold hover:bg-[#B71C1C] transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 px-6 bg-[#D32F2F] text-white rounded-xl font-semibold hover:bg-[#B71C1C] transition-colors flex items-center justify-center gap-2"
            >
              <Send className="h-5 w-5" />
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}