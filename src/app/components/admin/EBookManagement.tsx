import { useState } from 'react';
import { Upload, BookOpen, Download, Eye, EyeOff, Trash2, Edit, Calendar, FileText, BookMarked } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { toast } from 'sonner';
import { useEBooks, EBook } from '@/app/contexts/EBookContext';

export function EBookManagement() {
  const { ebooks, addEBook, updateEBook, deleteEBook } = useEBooks();
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [enableFlipBook, setEnableFlipBook] = useState(false);
  const [newEbook, setNewEbook] = useState({
    title: '',
    description: '',
    language: 'English',
    category: 'Weekly Digest',
    scheduledDate: ''
  });

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        return;
      }
      if (file.size > 50 * 1024 * 1024) { // 50MB
        toast.error('File size must be less than 50MB');
        return;
      }
      setPdfFile(file);
      toast.success(`PDF uploaded: ${file.name}`);
    }
  };

  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB
        toast.error('Image size must be less than 5MB');
        return;
      }
      setCoverImage(file);
      toast.success(`Cover image uploaded: ${file.name}`);
    }
  };

  const handleUpload = () => {
    if (!newEbook.title) {
      toast.error('Please enter e-book title');
      return;
    }

    if (!pdfFile) {
      toast.error('Please upload a PDF file');
      return;
    }

    const ebook: EBook = {
      id: Date.now().toString(),
      title: newEbook.title,
      description: newEbook.description,
      coverImage: coverImage ? URL.createObjectURL(coverImage) : 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400',
      fileUrl: URL.createObjectURL(pdfFile),
      fileName: pdfFile.name,
      fileSize: (pdfFile.size / (1024 * 1024)).toFixed(2) + ' MB',
      pages: 40,
      language: newEbook.language,
      category: newEbook.category,
      published: !newEbook.scheduledDate,
      downloads: 0,
      views: 0,
      uploadedAt: new Date().toISOString(),
      scheduledDate: newEbook.scheduledDate || undefined,
      enableFlipBook: enableFlipBook
    };

    addEBook(ebook);
    setNewEbook({ title: '', description: '', language: 'English', category: 'Weekly Digest', scheduledDate: '' });
    setPdfFile(null);
    setCoverImage(null);
    setEnableFlipBook(false);
    setIsUploading(false);
    toast.success('E-Book uploaded successfully!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this e-book?')) {
      deleteEBook(id);
    }
  };

  const handleTogglePublish = (id: string) => {
    updateEBook(id, { published: !ebooks.find(e => e.id === id)?.published });
  };

  const stats = {
    total: ebooks.length,
    published: ebooks.filter(e => e.published).length,
    scheduled: ebooks.filter(e => !e.published && e.scheduledDate).length,
    totalDownloads: ebooks.reduce((sum, e) => sum + e.downloads, 0),
    totalViews: ebooks.reduce((sum, e) => sum + e.views, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#212121] dark:text-white">E-Book Management</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Upload and manage digital publications
          </p>
        </div>
        <Button
          onClick={() => setIsUploading(true)}
          className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white"
        >
          <Upload size={20} className="mr-2" />
          Upload E-Book
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4">
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <BookOpen size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total E-Books</p>
              <p className="text-2xl font-bold text-[#212121] dark:text-white">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Eye size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Published</p>
              <p className="text-2xl font-bold text-[#212121] dark:text-white">{stats.published}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Calendar size={24} className="text-orange-600" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Scheduled</p>
              <p className="text-2xl font-bold text-[#212121] dark:text-white">{stats.scheduled}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Download size={24} className="text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Downloads</p>
              <p className="text-2xl font-bold text-[#212121] dark:text-white">{(stats.totalDownloads / 1000).toFixed(1)}k</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <Eye size={24} className="text-red-600" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Views</p>
              <p className="text-2xl font-bold text-[#212121] dark:text-white">{(stats.totalViews / 1000).toFixed(1)}k</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Upload Form */}
      {isUploading && (
        <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-4">Upload New E-Book</h3>
          
          <div className="space-y-4">
            {/* File Upload */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                PDF File *
              </label>
              <label htmlFor="pdf-upload" className="block border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-[#D32F2F] transition-colors cursor-pointer">
                <FileText size={48} className="mx-auto text-gray-400 mb-3" />
                {pdfFile ? (
                  <>
                    <p className="text-green-600 dark:text-green-400 mb-1 font-medium">✓ {pdfFile.name}</p>
                    <p className="text-sm text-gray-500">{(pdfFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </>
                ) : (
                  <>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PDF files up to 50MB</p>
                  </>
                )}
                <input
                  id="pdf-upload"
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Title */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Title *
              </label>
              <Input
                value={newEbook.title}
                onChange={(e) => setNewEbook({ ...newEbook, title: e.target.value })}
                placeholder="Enter e-book title..."
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Description
              </label>
              <textarea
                value={newEbook.description}
                onChange={(e) => setNewEbook({ ...newEbook, description: e.target.value })}
                placeholder="Enter e-book description..."
                rows={3}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#D32F2F] outline-none"
              />
            </div>

            {/* Language & Category */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Language
                </label>
                <select
                  value={newEbook.language}
                  onChange={(e) => setNewEbook({ ...newEbook, language: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#D32F2F] outline-none"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Telugu">Telugu</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Kannada">Kannada</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Category
                </label>
                <select
                  value={newEbook.category}
                  onChange={(e) => setNewEbook({ ...newEbook, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#D32F2F] outline-none"
                >
                  <option value="Weekly Digest">Weekly Digest</option>
                  <option value="Special Report">Special Report</option>
                  <option value="Monthly Magazine">Monthly Magazine</option>
                  <option value="Annual Review">Annual Review</option>
                </select>
              </div>
            </div>

            {/* Cover Image Upload */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Cover Image
              </label>
              <label htmlFor="cover-image-upload" className="block border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-[#D32F2F] transition-colors cursor-pointer">
                <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                {coverImage ? (
                  <p className="text-green-600 dark:text-green-400 font-medium">✓ {coverImage.name}</p>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400">Upload cover image (JPG, PNG)</p>
                )}
                <input
                  id="cover-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Flip Book Option */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="enable-flipbook"
                  checked={enableFlipBook}
                  onChange={(e) => setEnableFlipBook(e.target.checked)}
                  className="w-5 h-5 mt-0.5 rounded cursor-pointer accent-[#D32F2F]"
                />
                <div className="flex-1">
                  <label htmlFor="enable-flipbook" className="flex items-center gap-2 text-sm font-semibold text-blue-900 dark:text-blue-100 cursor-pointer mb-1">
                    <BookMarked size={18} className="text-blue-600 dark:text-blue-400" />
                    Enable Flip Book Mode
                  </label>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    Interactive page-flipping experience with realistic page turn animations. Readers can flip pages like a real book!
                  </p>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="schedule-ebook"
                checked={!!newEbook.scheduledDate}
                onChange={(e) => setNewEbook({ ...newEbook, scheduledDate: e.target.checked ? '' : '' })}
                className="w-5 h-5 rounded cursor-pointer"
              />
              <label htmlFor="schedule-ebook" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                Schedule for later
              </label>
              {newEbook.scheduledDate !== undefined && (
                <Input
                  type="datetime-local"
                  value={newEbook.scheduledDate}
                  onChange={(e) => setNewEbook({ ...newEbook, scheduledDate: e.target.value })}
                  className="flex-1"
                />
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button onClick={handleUpload} className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white">
                <Upload size={18} className="mr-2" />
                Upload E-Book
              </Button>
              <Button onClick={() => setIsUploading(false)} variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* E-Books Grid */}
      <div className="grid grid-cols-3 gap-6">
        {ebooks.map((ebook) => (
          <Card key={ebook.id} className="bg-white dark:bg-[#1E1E1E] border-none shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            {/* Cover Image */}
            <div className="relative h-64 bg-gray-200">
              <img
                src={ebook.coverImage}
                alt={ebook.title}
                className="w-full h-full object-cover"
              />
              {!ebook.published && (
                <div className="absolute top-3 right-3 px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded-full">
                  {ebook.scheduledDate ? 'SCHEDULED' : 'DRAFT'}
                </div>
              )}
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                <span className="px-2 py-1 bg-[#D32F2F] text-white text-xs font-medium rounded">
                  {ebook.language}
                </span>
                <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded">
                  {ebook.pages} pages
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-[#212121] dark:text-white line-clamp-2 mb-2">
                {ebook.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                {ebook.description}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>{ebook.fileSize}</span>
                <span>{ebook.category}</span>
              </div>

              {/* Stats */}
              {ebook.published && (
                <div className="flex items-center justify-between mb-4 pb-4 border-b dark:border-gray-700">
                  <div className="text-center">
                    <p className="text-lg font-bold text-[#212121] dark:text-white">{ebook.views.toLocaleString()}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Views</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-[#D32F2F]">{ebook.downloads.toLocaleString()}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Downloads</p>
                  </div>
                </div>
              )}

              {ebook.scheduledDate && !ebook.published && (
                <div className="mb-4 pb-4 border-b dark:border-gray-700">
                  <p className="text-xs text-orange-600 dark:text-orange-400">
                    Scheduled: {new Date(ebook.scheduledDate).toLocaleString('en-IN')}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleTogglePublish(ebook.id)}
                  size="sm"
                  variant="outline"
                  className={ebook.published ? 'border-orange-600 text-orange-600' : 'border-green-600 text-green-600'}
                >
                  {ebook.published ? <EyeOff size={16} className="mr-1" /> : <Eye size={16} className="mr-1" />}
                  {ebook.published ? 'Unpublish' : 'Publish'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-600 text-blue-600"
                >
                  <Edit size={16} className="mr-1" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(ebook.id)}
                  size="sm"
                  variant="outline"
                  className="border-red-600 text-red-600"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}