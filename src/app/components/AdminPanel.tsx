import { useState } from "react";
import {
  LayoutDashboard,
  Newspaper,
  Users,
  TrendingUp,
  Upload,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Calendar,
  BarChart3,
  Settings,
  BookOpen,
  FileText,
  AlertTriangle,
  MapPin,
  Globe,
  LogOut,
  Menu,
  X,
  UserCheck,
  Database,
  ArrowLeft,
  Home,
} from "lucide-react";
import { toast } from "sonner";
import { useAdminAuth } from '@/app/contexts/AdminAuthContext';
import { AdminLogin } from '@/app/components/AdminLogin';
import { ReporterApplications } from '@/app/components/admin/ReporterApplications';
import { ReporterData } from '@/app/components/admin/ReporterData';
import { EBookManagement } from '@/app/components/admin/EBookManagement';
import { ComprehensiveUploadModal } from '@/app/components/admin/ComprehensiveUploadModal';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "dashboard" | "news" | "submissions" | "users" | "analytics" | "ebooks" | "settings" | "reporter-applications" | "reporter-data";

interface NewsItem {
  id: string;
  title: string;
  category: string;
  status: "published" | "draft" | "pending";
  views: number;
  date: string;
  author: string;
}

interface Submission {
  id: string;
  title: string;
  author: string;
  location: string;
  status: "pending" | "approved" | "rejected";
  date: string;
  trustScore: number;
}

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const { isAuthenticated, logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  if (!isOpen) return null;

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => {}} />;
  }

  const handleLogout = () => {
    logout();
    onClose();
    toast.success('Admin logged out successfully!');
    // Force clean state after logout
    setTimeout(() => {
      window.location.href = '/home';
    }, 500);
  };

  // Mock data
  const stats = {
    totalNews: 1247,
    activeUsers: 45823,
    pendingSubmissions: 23,
    todayViews: 128450,
  };

  const recentNews: NewsItem[] = [
    {
      id: "1",
      title: "Indian Startup Raises $150M in Series C Funding",
      category: "Business",
      status: "published",
      views: 12450,
      date: "2026-01-23",
      author: "Admin",
    },
    {
      id: "2",
      title: "New Metro Line Opens in Hyderabad",
      category: "Local News",
      status: "published",
      views: 8920,
      date: "2026-01-23",
      author: "Admin",
    },
    {
      id: "3",
      title: "Tech Giant Announces AI Research Center",
      category: "Technology",
      status: "draft",
      views: 0,
      date: "2026-01-23",
      author: "Admin",
    },
  ];

  const pendingSubmissions: Submission[] = [
    {
      id: "1",
      title: "Local Festival Celebration in Village",
      author: "Rajesh Kumar",
      location: "Warangal, Telangana",
      status: "pending",
      date: "2026-01-23",
      trustScore: 78,
    },
    {
      id: "2",
      title: "Road Accident Near Highway",
      author: "Priya Sharma",
      location: "Bengaluru, Karnataka",
      status: "pending",
      date: "2026-01-23",
      trustScore: 92,
    },
  ];

  const handleApprove = (id: string, title: string) => {
    toast.success(`Approved: ${title}`);
  };

  const handleReject = (id: string, title: string) => {
    toast.error(`Rejected: ${title}`);
  };

  const handleDelete = (id: string, title: string) => {
    toast.success(`Deleted: ${title}`);
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "news", label: "News Management", icon: Newspaper },
    { id: "submissions", label: "Citizen Reports", icon: Upload },
    { id: "users", label: "Users", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "ebooks", label: "E-Books", icon: BookOpen },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "reporter-applications", label: "Reporter Applications", icon: UserCheck },
    { id: "reporter-data", label: "Reporter Data", icon: Database },
  ];

  return (
    <div className="fixed inset-0 z-[200] bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          {/* Back Button - Show when not on dashboard */}
          {activeTab !== "dashboard" && (
            <button
              onClick={() => setActiveTab("dashboard")}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">NEWS ROBO</h1>
            <p className="text-white/80 text-sm">Admin Control Panel</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Live</span>
          </div>
          {/* Close/Exit Button - More prominent and always visible */}
          <button
            onClick={onClose}
            className="bg-white hover:bg-white/90 text-[#D32F2F] px-3 md:px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-semibold shadow-lg"
            aria-label="Exit to Main App"
          >
            <X className="h-5 w-5" />
            <span className="text-xs md:text-sm">Exit</span>
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <div
          className={`${
            showMobileMenu ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:relative z-50 w-64 bg-[#212121] text-white h-full transition-transform duration-300 overflow-y-auto`}
        >
          <div className="p-4 space-y-2">
            {/* Back to Main App Button at top of sidebar */}
            <button
              onClick={onClose}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 transition-all shadow-md mb-6"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Main App</span>
            </button>

            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as TabType);
                  setShowMobileMenu(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-[#D32F2F] text-white shadow-lg"
                    : "hover:bg-white/10"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}

            <div className="pt-4 mt-4 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/20 text-red-400 transition-all"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Exit Admin</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-[#F5F5F5]">
          {/* Breadcrumb Navigation */}
          {activeTab !== "dashboard" && (
            <div className="bg-white border-b border-gray-200 px-6 py-3">
              <div className="flex items-center gap-2 text-sm">
                <button 
                  onClick={() => setActiveTab("dashboard")}
                  className="text-[#D32F2F] hover:underline flex items-center gap-1"
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </button>
                <span className="text-gray-400">/</span>
                <span className="text-gray-700 font-medium">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </span>
              </div>
            </div>
          )}
          
          <div className="p-6">
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#212121]">Dashboard Overview</h2>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Total News</p>
                        <p className="text-3xl font-bold text-[#212121] mt-1">
                          {stats.totalNews.toLocaleString()}
                        </p>
                      </div>
                      <Newspaper className="h-12 w-12 text-blue-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Active Users</p>
                        <p className="text-3xl font-bold text-[#212121] mt-1">
                          {stats.activeUsers.toLocaleString()}
                        </p>
                      </div>
                      <Users className="h-12 w-12 text-green-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-orange-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Pending Reviews</p>
                        <p className="text-3xl font-bold text-[#212121] mt-1">
                          {stats.pendingSubmissions}
                        </p>
                      </div>
                      <AlertTriangle className="h-12 w-12 text-orange-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-[#D32F2F]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Today's Views</p>
                        <p className="text-3xl font-bold text-[#212121] mt-1">
                          {stats.todayViews.toLocaleString()}
                        </p>
                      </div>
                      <TrendingUp className="h-12 w-12 text-[#D32F2F]" />
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent News */}
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-[#212121] mb-4">Recent News</h3>
                    <div className="space-y-3">
                      {recentNews.slice(0, 3).map((news) => (
                        <div key={news.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-semibold text-sm text-[#212121]">{news.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{news.category} • {news.views.toLocaleString()} views</p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              news.status === "published"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {news.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pending Submissions */}
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-[#212121] mb-4">Pending Submissions</h3>
                    <div className="space-y-3">
                      {pendingSubmissions.map((sub) => (
                        <div key={sub.id} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <div className="flex items-start justify-between mb-2">
                            <p className="font-semibold text-sm text-[#212121] flex-1">{sub.title}</p>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                              {sub.trustScore}% trust
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">by {sub.author}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => handleApprove(sub.id, sub.title)}
                              className="flex-1 bg-green-600 text-white text-xs py-1.5 rounded hover:bg-green-700"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(sub.id, sub.title)}
                              className="flex-1 bg-red-600 text-white text-xs py-1.5 rounded hover:bg-red-700"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* News Management Tab */}
            {activeTab === "news" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h2 className="text-2xl font-bold text-[#212121]">News Management</h2>
                  <button 
                    onClick={() => setShowUploadModal(true)}
                    className="bg-[#D32F2F] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#B71C1C] transition-colors flex items-center gap-2"
                  >
                    <Upload className="h-5 w-5" />
                    Add New Article
                  </button>
                </div>

                {/* Search & Filter */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search news articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#D32F2F] outline-none"
                      />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 border-2 border-gray-200 rounded-lg hover:border-[#D32F2F] transition-colors">
                      <Filter className="h-5 w-5" />
                      <span className="font-medium">Filter</span>
                    </button>
                  </div>
                </div>

                {/* News Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Title</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Category</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Views</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Date</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentNews.map((news) => (
                          <tr key={news.id} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <p className="font-medium text-[#212121]">{news.title}</p>
                            </td>
                            <td className="px-6 py-4">
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                                {news.category}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  news.status === "published"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {news.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-700">{news.views.toLocaleString()}</td>
                            <td className="px-6 py-4 text-gray-700">{news.date}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                                  <Eye className="h-4 w-4 text-blue-600" />
                                </button>
                                <button className="p-2 hover:bg-green-50 rounded-lg transition-colors">
                                  <Edit className="h-4 w-4 text-green-600" />
                                </button>
                                <button
                                  onClick={() => handleDelete(news.id, news.title)}
                                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <Trash2 className="h-4 w-4 text-red-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Citizen Reports Tab */}
            {activeTab === "submissions" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#212121]">Citizen Journalism Reports</h2>

                <div className="grid gap-4">
                  {pendingSubmissions.map((sub) => (
                    <div key={sub.id} className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-bold text-[#212121]">{sub.title}</h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                sub.trustScore >= 80
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              Trust: {sub.trustScore}%
                            </span>
                          </div>

                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>Submitted by: {sub.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{sub.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{sub.date}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex md:flex-col gap-2">
                          <button
                            onClick={() => handleApprove(sub.id, sub.title)}
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(sub.id, sub.title)}
                            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <XCircle className="h-4 w-4" />
                            Reject
                          </button>
                          <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                            <Eye className="h-4 w-4" />
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other tabs placeholder */}
            {activeTab === "users" && (
              <div className="bg-white rounded-xl p-12 shadow-sm text-center">
                <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-bold text-[#212121] mb-2">User Management</h3>
                <p className="text-gray-600">Manage users, roles, and permissions</p>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="bg-white rounded-xl p-12 shadow-sm text-center">
                <BarChart3 className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-bold text-[#212121] mb-2">Analytics Dashboard</h3>
                <p className="text-gray-600">View detailed statistics and reports</p>
              </div>
            )}

            {activeTab === "ebooks" && (
              <EBookManagement />
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#212121]">Settings</h2>
                
                <div className="grid gap-4">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <Globe className="h-6 w-6 text-blue-600" />
                      <h3 className="text-lg font-bold text-[#212121]">Regional Settings</h3>
                    </div>
                    <p className="text-gray-600 text-sm">Configure languages and locations</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <Settings className="h-6 w-6 text-gray-600" />
                      <h3 className="text-lg font-bold text-[#212121]">App Configuration</h3>
                    </div>
                    <p className="text-gray-600 text-sm">General app settings and preferences</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <AlertTriangle className="h-6 w-6 text-orange-600" />
                      <h3 className="text-lg font-bold text-[#212121]">Content Moderation</h3>
                    </div>
                    <p className="text-gray-600 text-sm">Configure content filters and moderation rules</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reporter-applications" && (
              <ReporterApplications />
            )}

            {activeTab === "reporter-data" && (
              <ReporterData />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div
          onClick={() => setShowMobileMenu(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Floating Exit Button - Always visible for easy access */}
      <button
        onClick={onClose}
        className="fixed bottom-6 right-6 z-[250] bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110 flex items-center gap-2 group"
        aria-label="Exit Admin Panel"
      >
        <Home className="h-6 w-6" />
        <span className="hidden group-hover:inline-block text-sm font-semibold whitespace-nowrap">
          Exit to Home
        </span>
      </button>

      {/* Upload Modal */}
      <ComprehensiveUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      />
    </div>
  );
}