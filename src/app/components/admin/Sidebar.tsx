import { AdminView } from "@/app/pages/AdminDashboard";
import { useAdminAuth } from "@/app/contexts/AdminAuthContext";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  LayoutDashboard,
  FileText,
  Grid,
  Image,
  Users,
  UserCheck,
  MessageSquare,
  Bell,
  Video,
  DollarSign,
  TrendingUp,
  CheckCircle,
  BookOpen,
  MapPin,
  Settings,
  Database,
  ChevronRight,
  ChevronLeft,
  LogOut
} from "lucide-react";

interface SidebarProps {
  activeView: AdminView;
  setActiveView: (view: AdminView) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { id: "dashboard" as AdminView, label: "Dashboard", icon: LayoutDashboard },
  { id: "content" as AdminView, label: "News Management", icon: FileText },
  { id: "categories" as AdminView, label: "Categories", icon: Grid },
  { id: "media" as AdminView, label: "Media Library", icon: Image },
  { id: "users" as AdminView, label: "Users", icon: Users },
  { id: "citizen-journalism" as AdminView, label: "Citizen Reports", icon: UserCheck },
  { id: "comments" as AdminView, label: "Comments", icon: MessageSquare },
  { id: "notifications" as AdminView, label: "Notifications", icon: Bell },
  { id: "buzz" as AdminView, label: "Buzz Videos", icon: Video },
  { id: "ads" as AdminView, label: "Ads", icon: DollarSign },
  { id: "analytics" as AdminView, label: "Analytics", icon: TrendingUp },
  { id: "fact-check" as AdminView, label: "Fact Check", icon: CheckCircle },
  { id: "ebook-management" as AdminView, label: "E-Book", icon: BookOpen },
  { id: "locations" as AdminView, label: "Locations", icon: MapPin },
  { id: "settings" as AdminView, label: "Settings", icon: Settings },
  { id: "system" as AdminView, label: "System", icon: Database },
];

export function Sidebar({ activeView, setActiveView, isCollapsed, setIsCollapsed }: SidebarProps) {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Admin logged out successfully!");
    // Close any open modals/panels and navigate
    setTimeout(() => {
      navigate("/home");
      window.location.reload(); // Force refresh to ensure clean state
    }, 500);
  };

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-[#212121] text-white transition-all duration-300 z-50 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!isCollapsed && (
          <div>
            <h1 className="text-xl font-bold text-[#D32F2F]">NEWS ROBO</h1>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-800 transition-colors ml-auto"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-[#D32F2F] text-white shadow-lg' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!isCollapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
        {!isCollapsed ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D32F2F] flex items-center justify-center text-sm font-bold">
                A
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-400">admin@newsrobo.com</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all bg-red-600 hover:bg-red-700 text-white shadow-lg"
            >
              <LogOut size={18} className="flex-shrink-0" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-3 rounded-lg transition-all bg-red-600 hover:bg-red-700 text-white shadow-lg"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        )}
      </div>
    </aside>
  );
}