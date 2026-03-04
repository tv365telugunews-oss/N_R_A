import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Edit, Camera, MapPin, Globe, Calendar, Mail, Phone, Bookmark, FileText, Video } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { bookmarkManager } from '@/app/utils/bookmarkManager';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // Load user data from localStorage
  const [userData, setUserData] = useState({
    name: localStorage.getItem('user_name') || 'User',
    email: localStorage.getItem('user_email') || 'user@newsrobo.com',
    phone: localStorage.getItem('user_phone') || '+91 98765 43210',
    location: localStorage.getItem('newsrobo_location') || 'Hyderabad, Telangana',
    language: localStorage.getItem('newsrobo_language') || 'English',
    joinedDate: localStorage.getItem('user_joined_date') || '2026-01-01',
    avatar: localStorage.getItem('user_avatar') || ''
  });

  const [editData, setEditData] = useState({ ...userData });
  const bookmarksCount = bookmarkManager.getCount();

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('user_name', editData.name);
    localStorage.setItem('user_email', editData.email);
    localStorage.setItem('user_phone', editData.phone);
    localStorage.setItem('newsrobo_location', editData.location);
    localStorage.setItem('newsrobo_language', editData.language);
    
    setUserData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...userData });
    setIsEditing(false);
  };

  const getInitials = () => {
    return userData.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const stats = [
    { label: 'Bookmarks', value: bookmarksCount, icon: Bookmark, color: 'text-[#D32F2F]' },
    { label: 'Articles Read', value: '142', icon: FileText, color: 'text-blue-600' },
    { label: 'Videos Watched', value: '38', icon: Video, color: 'text-green-600' }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-[#121212]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] text-white px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">My Profile</h1>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Profile Card */}
        <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex flex-col items-center">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D32F2F] to-[#B71C1C] flex items-center justify-center text-white text-3xl font-bold">
                {userData.avatar ? (
                  <img src={userData.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  getInitials()
                )}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#D32F2F] rounded-full flex items-center justify-center shadow-lg">
                  <Camera size={16} className="text-white" />
                </button>
              )}
            </div>

            {/* Name */}
            {isEditing ? (
              <Input
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="mt-4 text-center text-xl font-bold"
              />
            ) : (
              <h2 className="mt-4 text-2xl font-bold text-[#212121] dark:text-white">{userData.name}</h2>
            )}

            {/* Member Since */}
            <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-400">
              <Calendar size={16} />
              <span className="text-sm">Member since {new Date(userData.joinedDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-gray-500" />
              {isEditing ? (
                <Input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="flex-1"
                />
              ) : (
                <span className="text-gray-700 dark:text-gray-300">{userData.email}</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Phone size={20} className="text-gray-500" />
              {isEditing ? (
                <Input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  className="flex-1"
                />
              ) : (
                <span className="text-gray-700 dark:text-gray-300">{userData.phone}</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-gray-500" />
              {isEditing ? (
                <Input
                  value={editData.location}
                  onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                  className="flex-1"
                />
              ) : (
                <span className="text-gray-700 dark:text-gray-300">{userData.location}</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Globe size={20} className="text-gray-500" />
              {isEditing ? (
                <Input
                  value={editData.language}
                  onChange={(e) => setEditData({ ...editData, language: e.target.value })}
                  className="flex-1"
                />
              ) : (
                <span className="text-gray-700 dark:text-gray-300">{userData.language}</span>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex gap-3">
              <Button
                onClick={handleSave}
                className="flex-1 bg-[#D32F2F] hover:bg-[#B71C1C] text-white"
              >
                Save Changes
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          )}
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg text-center">
                <Icon size={24} className={`mx-auto ${stat.color} mb-2`} />
                <p className="text-2xl font-bold text-[#212121] dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <h3 className="font-bold text-lg text-[#212121] dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/bookmarks')}
              className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Bookmark size={20} className="text-[#D32F2F]" />
              <span className="text-gray-700 dark:text-gray-300">My Bookmarks ({bookmarksCount})</span>
            </button>
            <button
              onClick={() => navigate('/reading-history')}
              className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <FileText size={20} className="text-blue-600" />
              <span className="text-gray-700 dark:text-gray-300">Reading History</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Video size={20} className="text-green-600" />
              <span className="text-gray-700 dark:text-gray-300">Watched Videos</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}