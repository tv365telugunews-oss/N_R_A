import { useState } from 'react';
import { TrendingUp, Users, Eye, BarChart3, Download, Calendar, MapPin, Globe } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const dailyViewsData = [
  { date: 'Jan 26', views: 12450, users: 8930 },
  { date: 'Jan 27', views: 15230, users: 10450 },
  { date: 'Jan 28', views: 18900, users: 12340 },
  { date: 'Jan 29', views: 16780, users: 11200 },
  { date: 'Jan 30', views: 21450, users: 14560 },
  { date: 'Jan 31', views: 24890, users: 16780 },
  { date: 'Feb 1', views: 28340, users: 19230 }
];

const categoryData = [
  { name: 'Politics', views: 45678, color: '#D32F2F' },
  { name: 'Business', views: 34567, color: '#1976D2' },
  { name: 'Sports', views: 28934, color: '#388E3C' },
  { name: 'Entertainment', views: 23456, color: '#E91E63' },
  { name: 'Technology', views: 18765, color: '#7B1FA2' },
  { name: 'Health', views: 15432, color: '#00796B' }
];

const locationData = [
  { state: 'Telangana', users: 45678, revenue: 234567 },
  { state: 'Andhra Pradesh', users: 38945, revenue: 198765 },
  { state: 'Karnataka', users: 32456, revenue: 165432 },
  { state: 'Tamil Nadu', users: 28934, revenue: 145678 },
  { state: 'Maharashtra', users: 25678, revenue: 132456 },
  { state: 'Kerala', users: 21345, revenue: 109876 }
];

const languageData = [
  { language: 'English', users: 56789, percentage: 35 },
  { language: 'Telugu', users: 42345, percentage: 26 },
  { language: 'Hindi', users: 32456, percentage: 20 },
  { language: 'Tamil', users: 18765, percentage: 12 },
  { language: 'Kannada', users: 11234, percentage: 7 }
];

export function AnalyticsReports() {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('7d');
  const [activeReport, setActiveReport] = useState<'overview' | 'users' | 'content' | 'revenue'>('overview');

  const handleExportReport = (format: 'csv' | 'pdf') => {
    alert(`Exporting report as ${format.toUpperCase()}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#212121] dark:text-white">Analytics & Reports</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Detailed insights and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as any)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D32F2F] outline-none"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <Button
            onClick={() => handleExportReport('csv')}
            variant="outline"
          >
            <Download size={18} className="mr-2" />
            Export CSV
          </Button>
          <Button
            onClick={() => handleExportReport('pdf')}
            className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white"
          >
            <Download size={18} className="mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-5 gap-4">
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Users size={20} className="text-blue-600" />
            </div>
            <TrendingUp size={16} className="text-green-600" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Total Users</p>
          <p className="text-2xl font-bold text-[#212121] dark:text-white mt-1">162K</p>
          <p className="text-xs text-green-600 mt-1">+12.5% from last period</p>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Eye size={20} className="text-purple-600" />
            </div>
            <TrendingUp size={16} className="text-green-600" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Page Views</p>
          <p className="text-2xl font-bold text-[#212121] dark:text-white mt-1">2.8M</p>
          <p className="text-xs text-green-600 mt-1">+18.3% from last period</p>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <BarChart3 size={20} className="text-green-600" />
            </div>
            <TrendingUp size={16} className="text-green-600" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Avg. Session</p>
          <p className="text-2xl font-bold text-[#212121] dark:text-white mt-1">8.5min</p>
          <p className="text-xs text-green-600 mt-1">+5.2% from last period</p>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Download size={20} className="text-orange-600" />
            </div>
            <TrendingUp size={16} className="text-green-600" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">App Downloads</p>
          <p className="text-2xl font-bold text-[#212121] dark:text-white mt-1">45.2K</p>
          <p className="text-xs text-green-600 mt-1">+23.7% from last period</p>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <TrendingUp size={20} className="text-red-600" />
            </div>
            <TrendingUp size={16} className="text-green-600" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Ad Revenue</p>
          <p className="text-2xl font-bold text-[#212121] dark:text-white mt-1">₹12.4L</p>
          <p className="text-xs text-green-600 mt-1">+15.8% from last period</p>
        </Card>
      </div>

      {/* Report Tabs */}
      <div className="flex items-center gap-4 border-b dark:border-gray-700">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'users', label: 'User Analytics' },
          { id: 'content', label: 'Content Performance' },
          { id: 'revenue', label: 'Revenue Reports' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveReport(tab.id as any)}
            className={`pb-3 px-2 font-medium transition-colors ${
              activeReport === tab.id
                ? 'text-[#D32F2F] border-b-2 border-[#D32F2F]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Daily Views Trend */}
        <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg col-span-2">
          <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-4">Daily Views & Users Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyViewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1E1E1E', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="views" stroke="#D32F2F" strokeWidth={3} name="Page Views" />
              <Line type="monotone" dataKey="users" stroke="#1976D2" strokeWidth={3} name="Active Users" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Performance */}
        <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-4">Category Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1E1E1E', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Bar dataKey="views" name="Views">
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Language Distribution */}
        <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-4">Language Distribution</h3>
          <div className="space-y-3">
            {languageData.map((lang) => (
              <div key={lang.language}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {lang.language}
                  </span>
                  <span className="text-sm font-bold text-[#212121] dark:text-white">
                    {lang.users.toLocaleString()} ({lang.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-[#D32F2F] h-2 rounded-full transition-all"
                    style={{ width: `${lang.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Location-wise Analytics */}
      <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
        <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-4">Location-wise Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">State</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Active Users</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Ad Revenue</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Avg. per User</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Growth</th>
              </tr>
            </thead>
            <tbody>
              {locationData.map((location, index) => (
                <tr key={location.state} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-[#D32F2F]" />
                      <span className="font-medium text-[#212121] dark:text-white">{location.state}</span>
                    </div>
                  </td>
                  <td className="text-right py-3 px-4 text-gray-700 dark:text-gray-300">
                    {location.users.toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-700 dark:text-gray-300">
                    ₹{(location.revenue / 100000).toFixed(1)}L
                  </td>
                  <td className="text-right py-3 px-4 text-gray-700 dark:text-gray-300">
                    ₹{(location.revenue / location.users).toFixed(0)}
                  </td>
                  <td className="text-right py-3 px-4">
                    <span className="text-green-600 font-medium">
                      +{(Math.random() * 20 + 5).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* User Retention */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <h4 className="font-medium text-gray-600 dark:text-gray-400 mb-2">Daily Active Users</h4>
          <p className="text-3xl font-bold text-[#212121] dark:text-white">89.2K</p>
          <p className="text-sm text-green-600 mt-1">55% of total users</p>
        </Card>

        <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <h4 className="font-medium text-gray-600 dark:text-gray-400 mb-2">Weekly Active Users</h4>
          <p className="text-3xl font-bold text-[#212121] dark:text-white">124K</p>
          <p className="text-sm text-green-600 mt-1">76% of total users</p>
        </Card>

        <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <h4 className="font-medium text-gray-600 dark:text-gray-400 mb-2">Monthly Active Users</h4>
          <p className="text-3xl font-bold text-[#212121] dark:text-white">145K</p>
          <p className="text-sm text-green-600 mt-1">89% of total users</p>
        </Card>
      </div>
    </div>
  );
}
