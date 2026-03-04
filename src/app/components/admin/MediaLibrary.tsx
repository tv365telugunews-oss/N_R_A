import { useState } from 'react';
import { Upload, Image as ImageIcon, Video, Trash2, Search, Filter, Download, Eye } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';

interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video';
  url: string;
  size: string;
  dimensions: string;
  uploadedAt: string;
  usedIn: number;
}

const mockMedia: MediaFile[] = [
  {
    id: '1',
    name: 'breaking-news-politics.jpg',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400',
    size: '2.4 MB',
    dimensions: '1920x1080',
    uploadedAt: '2026-02-01',
    usedIn: 5
  },
  {
    id: '2',
    name: 'sports-highlight.mp4',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
    size: '15.8 MB',
    dimensions: '1280x720',
    uploadedAt: '2026-02-01',
    usedIn: 2
  },
  {
    id: '3',
    name: 'business-meeting.jpg',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
    size: '1.9 MB',
    dimensions: '1920x1080',
    uploadedAt: '2026-01-31',
    usedIn: 8
  },
  {
    id: '4',
    name: 'tech-innovation.jpg',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
    size: '3.1 MB',
    dimensions: '2400x1600',
    uploadedAt: '2026-01-31',
    usedIn: 12
  },
  {
    id: '5',
    name: 'entertainment-event.mp4',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
    size: '22.5 MB',
    dimensions: '1920x1080',
    uploadedAt: '2026-01-30',
    usedIn: 3
  },
  {
    id: '6',
    name: 'health-wellness.jpg',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
    size: '2.7 MB',
    dimensions: '1920x1280',
    uploadedAt: '2026-01-30',
    usedIn: 6
  }
];

export function MediaLibrary() {
  const [media, setMedia] = useState<MediaFile[]>(mockMedia);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video'>('all');
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredMedia = media.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || file.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this file?')) {
      setMedia(media.filter(m => m.id !== id));
      selectedFiles.delete(id);
      setSelectedFiles(new Set(selectedFiles));
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedFiles.size} selected files?`)) {
      setMedia(media.filter(m => !selectedFiles.has(m.id)));
      setSelectedFiles(new Set());
    }
  };

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedFiles);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedFiles(newSelected);
  };

  const totalSize = media.reduce((sum, file) => {
    const sizeNum = parseFloat(file.size);
    return sum + sizeNum;
  }, 0);

  const imageCount = media.filter(m => m.type === 'image').length;
  const videoCount = media.filter(m => m.type === 'video').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#212121] dark:text-white">Media Library</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage images and videos
          </p>
        </div>
        <Button className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white">
          <Upload size={20} className="mr-2" />
          Upload Media
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4">
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <ImageIcon size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Images</p>
              <p className="text-2xl font-bold text-[#212121] dark:text-white">{imageCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Video size={24} className="text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Videos</p>
              <p className="text-2xl font-bold text-[#212121] dark:text-white">{videoCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Upload size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Files</p>
              <p className="text-2xl font-bold text-[#212121] dark:text-white">{media.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Download size={24} className="text-orange-600" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Size</p>
              <p className="text-2xl font-bold text-[#212121] dark:text-white">{totalSize.toFixed(1)} MB</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <Eye size={24} className="text-red-600" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Selected</p>
              <p className="text-2xl font-bold text-[#212121] dark:text-white">{selectedFiles.size}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search & Filter Bar */}
      <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search media files..."
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={filterType === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterType('all')}
              className={filterType === 'all' ? 'bg-[#D32F2F] text-white' : ''}
            >
              All
            </Button>
            <Button
              variant={filterType === 'image' ? 'default' : 'outline'}
              onClick={() => setFilterType('image')}
              className={filterType === 'image' ? 'bg-[#D32F2F] text-white' : ''}
            >
              <ImageIcon size={16} className="mr-2" />
              Images
            </Button>
            <Button
              variant={filterType === 'video' ? 'default' : 'outline'}
              onClick={() => setFilterType('video')}
              className={filterType === 'video' ? 'bg-[#D32F2F] text-white' : ''}
            >
              <Video size={16} className="mr-2" />
              Videos
            </Button>
          </div>

          {selectedFiles.size > 0 && (
            <Button
              onClick={handleBulkDelete}
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-50"
            >
              <Trash2 size={16} className="mr-2" />
              Delete ({selectedFiles.size})
            </Button>
          )}
        </div>
      </Card>

      {/* Media Grid */}
      <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
        <div className="grid grid-cols-4 gap-4">
          {filteredMedia.map((file) => (
            <div
              key={file.id}
              className={`relative group rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                selectedFiles.has(file.id)
                  ? 'border-[#D32F2F] ring-2 ring-[#D32F2F]/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-[#D32F2F]'
              }`}
              onClick={() => toggleSelection(file.id)}
            >
              {/* Image/Video Preview */}
              <div className="aspect-video relative bg-gray-100 dark:bg-gray-800">
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
                {file.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                      <Video size={24} className="text-[#D32F2F]" />
                    </div>
                  </div>
                )}

                {/* Selection Checkbox */}
                <div className="absolute top-2 left-2">
                  <input
                    type="checkbox"
                    checked={selectedFiles.has(file.id)}
                    onChange={() => toggleSelection(file.id)}
                    className="w-5 h-5 rounded border-2 border-white cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                {/* Actions Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="p-2 bg-white rounded-lg hover:bg-gray-100">
                    <Eye size={18} className="text-[#212121]" />
                  </button>
                  <button className="p-2 bg-white rounded-lg hover:bg-gray-100">
                    <Download size={18} className="text-[#212121]" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(file.id);
                    }}
                    className="p-2 bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    <Trash2 size={18} className="text-white" />
                  </button>
                </div>
              </div>

              {/* File Info */}
              <div className="p-3 bg-white dark:bg-[#2A2A2A]">
                <h4 className="font-medium text-sm text-[#212121] dark:text-white truncate" title={file.name}>
                  {file.name}
                </h4>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
                  <span>{file.size}</span>
                  <span>{file.dimensions}</span>
                </div>
                <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                  <span>Used in {file.usedIn} articles</span>
                  <span>{new Date(file.uploadedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMedia.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon size={64} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
            <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-2">No media files found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery ? 'Try a different search term' : 'Upload your first media file'}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
