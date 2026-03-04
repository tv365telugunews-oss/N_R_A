import { useState } from "react";
import { Sidebar } from "@/app/components/admin/Sidebar";
import { DashboardOverview } from "@/app/components/admin/DashboardOverview";
import { ContentManagement } from "@/app/components/admin/ContentManagement";
import { CategoryManagement } from "@/app/components/admin/CategoryManagement";
import { MediaLibrary } from "@/app/components/admin/MediaLibrary";
import { UserManagement } from "@/app/components/admin/UserManagement";
import { CitizenJournalism } from "@/app/components/admin/CitizenJournalism";
import { CommentsModeration } from "@/app/components/admin/CommentsModeration";
import { NotificationsManagement } from "@/app/components/admin/NotificationsManagement";
import { BuzzManagement } from "@/app/components/admin/BuzzManagement";
import { AdManagement } from "@/app/components/admin/AdManagement";
import { AnalyticsReports } from "@/app/components/admin/AnalyticsReports";
import { FactCheck } from "@/app/components/admin/FactCheck";
import { EBookManagement } from "@/app/components/admin/EBookManagement";
import { LocationManagement } from "@/app/components/admin/LocationManagement";
import { SettingsPanel } from "@/app/components/admin/SettingsPanel";
import { SystemPanel } from "@/app/components/admin/SystemPanel";

export type AdminView = 
  | "dashboard" 
  | "content" 
  | "categories"
  | "media"
  | "users" 
  | "citizen-journalism" 
  | "comments"
  | "notifications"
  | "buzz" 
  | "ads" 
  | "analytics"
  | "fact-check"
  | "ebook-management"
  | "locations" 
  | "settings"
  | "system";

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState<AdminView>("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardOverview />;
      case "content":
        return <ContentManagement />;
      case "categories":
        return <CategoryManagement />;
      case "media":
        return <MediaLibrary />;
      case "users":
        return <UserManagement />;
      case "citizen-journalism":
        return <CitizenJournalism />;
      case "comments":
        return <CommentsModeration />;
      case "notifications":
        return <NotificationsManagement />;
      case "buzz":
        return <BuzzManagement />;
      case "ads":
        return <AdManagement />;
      case "analytics":
        return <AnalyticsReports />;
      case "fact-check":
        return <FactCheck />;
      case "ebook-management":
        return <EBookManagement />;
      case "locations":
        return <LocationManagement />;
      case "settings":
        return <SettingsPanel />;
      case "system":
        return <SystemPanel />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F5F5F5] dark:bg-[#121212]">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      <main className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6">
          {renderView()}
        </div>
      </main>
    </div>
  );
}