import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Plus, Eye, Edit, Trash2, TrendingUp, DollarSign, Target, BarChart3 } from "lucide-react";

const mockAds = [
  {
    id: 1,
    name: "E-commerce Festival Sale",
    type: "Native",
    advertiser: "ShopKart India",
    startDate: "2026-02-01",
    endDate: "2026-02-15",
    budget: "₹2,50,000",
    spent: "₹45,000",
    impressions: 1250000,
    clicks: 23400,
    ctr: "1.87%",
    status: "Active"
  },
  {
    id: 2,
    name: "Mobile Banking Campaign",
    type: "Interstitial",
    advertiser: "PayNow Bank",
    startDate: "2026-01-25",
    endDate: "2026-02-10",
    budget: "₹5,00,000",
    spent: "₹3,20,000",
    impressions: 3400000,
    clicks: 87500,
    ctr: "2.57%",
    status: "Active"
  },
  {
    id: 3,
    name: "Local Restaurant Launch",
    type: "Native",
    advertiser: "Spice Garden",
    startDate: "2026-02-05",
    endDate: "2026-02-20",
    budget: "₹75,000",
    spent: "₹0",
    impressions: 0,
    clicks: 0,
    ctr: "0%",
    status: "Scheduled"
  },
  {
    id: 4,
    name: "Education App Download",
    type: "Roadblock",
    advertiser: "LearnFast",
    startDate: "2026-01-20",
    endDate: "2026-01-31",
    budget: "₹8,00,000",
    spent: "₹8,00,000",
    impressions: 5600000,
    clicks: 168000,
    ctr: "3.00%",
    status: "Completed"
  },
];

export function AdManagement() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Scheduled": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Completed": return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Native": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "Interstitial": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "Roadblock": return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#212121] dark:text-white">Ad Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage digital advertising campaigns</p>
        </div>
        <Button className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white">
          <Plus size={20} className="mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-[#D32F2F] to-[#B71C1C] text-white border-none shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Revenue</p>
              <p className="text-3xl font-bold mt-1">₹24.5L</p>
              <p className="text-xs opacity-90 mt-1">This month</p>
            </div>
            <DollarSign size={40} className="opacity-80" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-[#FFC107] to-[#FFA000] text-white border-none shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Active Campaigns</p>
              <p className="text-3xl font-bold mt-1">18</p>
              <p className="text-xs opacity-90 mt-1">2 starting today</p>
            </div>
            <Target size={40} className="opacity-80" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-[#4CAF50] to-[#388E3C] text-white border-none shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Impressions</p>
              <p className="text-3xl font-bold mt-1">89.2M</p>
              <p className="text-xs opacity-90 mt-1">Last 30 days</p>
            </div>
            <Eye size={40} className="opacity-80" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-[#2196F3] to-[#1976D2] text-white border-none shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Avg CTR</p>
              <p className="text-3xl font-bold mt-1">2.34%</p>
              <p className="text-xs opacity-90 mt-1">+0.45% vs last month</p>
            </div>
            <TrendingUp size={40} className="opacity-80" />
          </div>
        </Card>
      </div>

      {/* Ad Formats Guide */}
      <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
        <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-4">Ad Format Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 mb-2">
              Native
            </Badge>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Seamlessly integrated ads that match the app's content flow. Best for user engagement.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
            <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300 mb-2">
              Interstitial
            </Badge>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Full-screen ads shown during natural transitions. High visibility and impact.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800">
            <Badge className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300 mb-2">
              Roadblock
            </Badge>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Premium placement across all inventory. Maximum reach for major launches.
            </p>
          </div>
        </div>
      </Card>

      {/* Campaigns Table */}
      <Card className="bg-white dark:bg-[#1E1E1E] border-none shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Campaign
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Duration
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Budget / Spent
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Performance
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockAds.map((ad) => (
                <tr key={ad.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-[#212121] dark:text-white">{ad.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{ad.advertiser}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={getTypeColor(ad.type)}>
                      {ad.type}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    <div>
                      <p>{ad.startDate}</p>
                      <p className="text-xs">to {ad.endDate}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-[#212121] dark:text-white">{ad.budget}</p>
                      <p className="text-sm text-green-600">{ad.spent} spent</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-gray-600 dark:text-gray-400">
                        {formatNumber(ad.impressions)} impressions
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {formatNumber(ad.clicks)} clicks • <span className="font-medium text-[#D32F2F]">{ad.ctr} CTR</span>
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={getStatusColor(ad.status)}>
                      {ad.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="hover:bg-blue-50 dark:hover:bg-blue-900">
                        <BarChart3 size={16} className="text-blue-600" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-green-50 dark:hover:bg-green-900">
                        <Edit size={16} className="text-green-600" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-red-50 dark:hover:bg-red-900">
                        <Trash2 size={16} className="text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
