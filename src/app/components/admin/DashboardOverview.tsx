import { 
  TrendingUp, 
  Users, 
  FileText, 
  Video,
  Eye,
  Clock,
  Globe,
  MapPin
} from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

const statsCards = [
  { 
    title: "Total Users", 
    value: "2.4M", 
    change: "+12.5%", 
    icon: Users, 
    color: "#D32F2F" 
  },
  { 
    title: "News Articles", 
    value: "45,230", 
    change: "+8.3%", 
    icon: FileText, 
    color: "#FFC107" 
  },
  { 
    title: "Buzz Videos", 
    value: "12,450", 
    change: "+15.7%", 
    icon: Video, 
    color: "#4CAF50" 
  },
  { 
    title: "Daily Views", 
    value: "8.9M", 
    change: "+23.1%", 
    icon: Eye, 
    color: "#2196F3" 
  },
];

const viewsData = [
  { name: "Mon", views: 4200, users: 2800 },
  { name: "Tue", views: 5300, users: 3200 },
  { name: "Wed", views: 6100, users: 3900 },
  { name: "Thu", views: 7200, users: 4500 },
  { name: "Fri", views: 8900, users: 5800 },
  { name: "Sat", views: 9500, users: 6200 },
  { name: "Sun", views: 8100, users: 5400 },
];

const languageData = [
  { name: "Hindi", value: 35, color: "#D32F2F" },
  { name: "English", value: 25, color: "#FFC107" },
  { name: "Tamil", value: 15, color: "#4CAF50" },
  { name: "Telugu", value: 10, color: "#2196F3" },
  { name: "Bengali", value: 8, color: "#9C27B0" },
  { name: "Others", value: 7, color: "#FF5722" },
];

const categoryData = [
  { category: "Politics", articles: 3200 },
  { category: "Sports", articles: 2800 },
  { category: "Business", articles: 2400 },
  { category: "Technology", articles: 2100 },
  { category: "Entertainment", articles: 1900 },
  { category: "Health", articles: 1600 },
];

const recentActivity = [
  { action: "New article published", user: "Rahul Kumar", time: "2 mins ago", type: "content" },
  { action: "Citizen report approved", user: "Priya Sharma", time: "15 mins ago", type: "report" },
  { action: "Buzz video uploaded", user: "Amit Patel", time: "32 mins ago", type: "buzz" },
  { action: "New user registered", user: "Sneha Gupta", time: "1 hour ago", type: "user" },
  { action: "Ad campaign started", user: "Admin", time: "2 hours ago", type: "ad" },
];

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#212121] dark:text-white">Dashboard Overview</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back, Admin! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Clock size={16} />
          <span>Last updated: 2 mins ago</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={stat.title}
              className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg hover:shadow-xl transition-all"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%)`,
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <h3 className="text-3xl font-bold mt-2 text-[#212121] dark:text-white">{stat.value}</h3>
                  <p className="text-sm mt-2 text-green-600 font-medium">{stat.change} from last week</p>
                </div>
                <div 
                  className="p-3 rounded-lg" 
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Icon size={24} style={{ color: stat.color }} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views & Users Trend */}
        <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-4">Views & Users (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={viewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="views" 
                stroke="#D32F2F" 
                strokeWidth={3} 
                dot={{ fill: '#D32F2F', r: 5 }}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#FFC107" 
                strokeWidth={3}
                dot={{ fill: '#FFC107', r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Language Distribution */}
        <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-4">Language Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={languageData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {languageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Category Performance & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Performance */}
        <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-4">Articles by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="category" stroke="#666" angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }} 
              />
              <Bar dataKey="articles" fill="#D32F2F" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  activity.type === 'content' ? 'bg-[#D32F2F]' :
                  activity.type === 'report' ? 'bg-[#FFC107]' :
                  activity.type === 'buzz' ? 'bg-[#4CAF50]' :
                  activity.type === 'user' ? 'bg-[#2196F3]' :
                  'bg-[#9C27B0]'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#212121] dark:text-white">{activity.action}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">by {activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-[#D32F2F] to-[#B71C1C] text-white border-none shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Pending Approvals</p>
              <h3 className="text-4xl font-bold mt-2">24</h3>
            </div>
            <TrendingUp size={40} className="opacity-80" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-[#FFC107] to-[#FFA000] text-white border-none shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Active Languages</p>
              <h3 className="text-4xl font-bold mt-2">12</h3>
            </div>
            <Globe size={40} className="opacity-80" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-[#4CAF50] to-[#388E3C] text-white border-none shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Active Locations</p>
              <h3 className="text-4xl font-bold mt-2">2,456</h3>
            </div>
            <MapPin size={40} className="opacity-80" />
          </div>
        </Card>
      </div>
    </div>
  );
}
