import { useState } from 'react';
import { Send, Bell, Clock, Users, Target, Calendar, TrendingUp } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'breaking' | 'update' | 'promotional';
  audience: 'all' | 'state' | 'language' | 'custom';
  audienceDetails: string;
  scheduled: boolean;
  scheduledTime?: string;
  sent: boolean;
  sentAt?: string;
  delivered: number;
  opened: number;
  clicked: number;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: '🔴 Breaking: Major Policy Announcement',
    message: 'Government announces new economic reforms. Tap to read full story.',
    type: 'breaking',
    audience: 'all',
    audienceDetails: 'All users',
    scheduled: false,
    sent: true,
    sentAt: '2026-02-01T10:00:00',
    delivered: 45678,
    opened: 28934,
    clicked: 15234
  },
  {
    id: '2',
    title: 'Daily News Digest - Your Morning Brief',
    message: 'Top 10 stories you need to know today. Good morning!',
    type: 'update',
    audience: 'all',
    audienceDetails: 'All users',
    scheduled: true,
    scheduledTime: '2026-02-02T07:00:00',
    sent: false,
    delivered: 0,
    opened: 0,
    clicked: 0
  },
  {
    id: '3',
    title: 'హైదరాబాద్ స్థానిక వార్తలు',
    message: 'మీ ప్రాంతంలో నేడు జరిగిన ముఖ్య సంఘటనలు చూడండి',
    type: 'update',
    audience: 'state',
    audienceDetails: 'Telangana (Telugu)',
    scheduled: false,
    sent: true,
    sentAt: '2026-02-01T18:00:00',
    delivered: 12456,
    opened: 8234,
    clicked: 4521
  }
];

export function NotificationsManagement() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState<'send' | 'scheduled' | 'history'>('send');
  
  const [newNotif, setNewNotif] = useState({
    title: '',
    message: '',
    type: 'update' as const,
    audience: 'all' as const,
    audienceDetails: 'All users',
    scheduled: false,
    scheduledTime: ''
  });

  const handleSendNotification = () => {
    if (!newNotif.title || !newNotif.message) {
      alert('Please fill in all required fields');
      return;
    }

    const notification: Notification = {
      id: Date.now().toString(),
      ...newNotif,
      sent: !newNotif.scheduled,
      sentAt: newNotif.scheduled ? undefined : new Date().toISOString(),
      delivered: newNotif.scheduled ? 0 : Math.floor(Math.random() * 50000),
      opened: 0,
      clicked: 0
    };

    setNotifications([notification, ...notifications]);
    setNewNotif({
      title: '',
      message: '',
      type: 'update',
      audience: 'all',
      audienceDetails: 'All users',
      scheduled: false,
      scheduledTime: ''
    });
    setIsCreating(false);
    
    alert(newNotif.scheduled ? 'Notification scheduled successfully!' : 'Notification sent successfully!');
  };

  const totalDelivered = notifications.filter(n => n.sent).reduce((sum, n) => sum + n.delivered, 0);
  const totalOpened = notifications.filter(n => n.sent).reduce((sum, n) => sum + n.opened, 0);
  const scheduledCount = notifications.filter(n => n.scheduled && !n.sent).length;
  const avgOpenRate = totalDelivered > 0 ? ((totalOpened / totalDelivered) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#212121] dark:text-white">Notifications Management</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Send push notifications and manage campaigns
          </p>
        </div>
        <Button
          onClick={() => setIsCreating(true)}
          className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white"
        >
          <Send size={20} className="mr-2" />
          Send Notification
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Send size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Sent</p>
              <p className="text-2xl font-bold text-[#212121] dark:text-white">
                {notifications.filter(n => n.sent).length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Users size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Delivered</p>
              <p className="text-2xl font-bold text-[#212121] dark:text-white">
                {(totalDelivered / 1000).toFixed(1)}k
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <TrendingUp size={24} className="text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Open Rate</p>
              <p className="text-2xl font-bold text-[#212121] dark:text-white">{avgOpenRate}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Clock size={24} className="text-orange-600" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Scheduled</p>
              <p className="text-2xl font-bold text-[#212121] dark:text-white">{scheduledCount}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Create Notification Form */}
      {isCreating && (
        <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-4">Create New Notification</h3>
          
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Title *
              </label>
              <Input
                value={newNotif.title}
                onChange={(e) => setNewNotif({ ...newNotif, title: e.target.value })}
                placeholder="Enter notification title..."
                maxLength={50}
              />
              <p className="text-xs text-gray-500 mt-1">{newNotif.title.length}/50 characters</p>
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Message *
              </label>
              <textarea
                value={newNotif.message}
                onChange={(e) => setNewNotif({ ...newNotif, message: e.target.value })}
                placeholder="Enter notification message..."
                maxLength={200}
                rows={3}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#D32F2F] outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">{newNotif.message.length}/200 characters</p>
            </div>

            {/* Type & Audience */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Type
                </label>
                <select
                  value={newNotif.type}
                  onChange={(e) => setNewNotif({ ...newNotif, type: e.target.value as any })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#D32F2F] outline-none"
                >
                  <option value="breaking">🔴 Breaking News</option>
                  <option value="update">📰 News Update</option>
                  <option value="promotional">🎉 Promotional</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Audience
                </label>
                <select
                  value={newNotif.audience}
                  onChange={(e) => setNewNotif({ ...newNotif, audience: e.target.value as any })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#D32F2F] outline-none"
                >
                  <option value="all">All Users</option>
                  <option value="state">Specific State</option>
                  <option value="language">Specific Language</option>
                  <option value="custom">Custom Segment</option>
                </select>
              </div>
            </div>

            {/* Schedule */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="schedule"
                checked={newNotif.scheduled}
                onChange={(e) => setNewNotif({ ...newNotif, scheduled: e.target.checked })}
                className="w-5 h-5 rounded cursor-pointer"
              />
              <label htmlFor="schedule" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                Schedule for later
              </label>
              {newNotif.scheduled && (
                <Input
                  type="datetime-local"
                  value={newNotif.scheduledTime}
                  onChange={(e) => setNewNotif({ ...newNotif, scheduledTime: e.target.value })}
                  className="flex-1"
                />
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSendNotification}
                className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white"
              >
                <Send size={18} className="mr-2" />
                {newNotif.scheduled ? 'Schedule Notification' : 'Send Now'}
              </Button>
              <Button onClick={() => setIsCreating(false)} variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Notifications List */}
      <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
        {/* Tabs */}
        <div className="flex items-center gap-4 mb-6 border-b dark:border-gray-700">
          <button
            onClick={() => setActiveTab('send')}
            className={`pb-3 px-2 font-medium transition-colors ${
              activeTab === 'send'
                ? 'text-[#D32F2F] border-b-2 border-[#D32F2F]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sent Notifications
          </button>
          <button
            onClick={() => setActiveTab('scheduled')}
            className={`pb-3 px-2 font-medium transition-colors ${
              activeTab === 'scheduled'
                ? 'text-[#D32F2F] border-b-2 border-[#D32F2F]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Scheduled ({scheduledCount})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 px-2 font-medium transition-colors ${
              activeTab === 'history'
                ? 'text-[#D32F2F] border-b-2 border-[#D32F2F]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            History
          </button>
        </div>

        {/* Notifications */}
        <div className="space-y-3">
          {notifications
            .filter(n => {
              if (activeTab === 'scheduled') return n.scheduled && !n.sent;
              if (activeTab === 'history') return n.sent;
              return n.sent;
            })
            .map((notif) => (
              <div
                key={notif.id}
                className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-[#D32F2F] transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-[#212121] dark:text-white">{notif.title}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        notif.type === 'breaking' 
                          ? 'bg-red-100 text-red-600'
                          : notif.type === 'promotional'
                          ? 'bg-purple-100 text-purple-600'
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        {notif.type}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{notif.message}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Target size={12} />
                        {notif.audienceDetails}
                      </span>
                      {notif.sent && notif.sentAt && (
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(notif.sentAt).toLocaleString('en-IN')}
                        </span>
                      )}
                      {notif.scheduled && !notif.sent && notif.scheduledTime && (
                        <span className="flex items-center gap-1 text-orange-600">
                          <Clock size={12} />
                          Scheduled: {new Date(notif.scheduledTime).toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {notif.sent && (
                  <div className="grid grid-cols-3 gap-4 pt-3 border-t dark:border-gray-700">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#212121] dark:text-white">
                        {notif.delivered.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Delivered</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        {notif.opened.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Opened ({notif.delivered > 0 ? ((notif.opened / notif.delivered) * 100).toFixed(1) : 0}%)
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        {notif.clicked.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Clicked ({notif.delivered > 0 ? ((notif.clicked / notif.delivered) * 100).toFixed(1) : 0}%)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}
