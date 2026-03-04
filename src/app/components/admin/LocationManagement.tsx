import { useState } from "react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { Search, MapPin, Plus, Edit, ChevronRight } from "lucide-react";

const mockLocations = [
  {
    state: "Maharashtra",
    districts: 36,
    villages: 43654,
    activeUsers: 345000,
    newsArticles: 8920
  },
  {
    state: "Uttar Pradesh",
    districts: 75,
    villages: 97941,
    activeUsers: 582000,
    newsArticles: 12340
  },
  {
    state: "Tamil Nadu",
    districts: 38,
    villages: 15979,
    activeUsers: 289000,
    newsArticles: 7650
  },
  {
    state: "Karnataka",
    districts: 31,
    villages: 29406,
    activeUsers: 267000,
    newsArticles: 6890
  },
  {
    state: "West Bengal",
    districts: 23,
    villages: 40782,
    activeUsers: 234000,
    newsArticles: 5430
  },
  {
    state: "Gujarat",
    districts: 33,
    villages: 18618,
    activeUsers: 198000,
    newsArticles: 4920
  },
];

const sampleDistricts = {
  "Maharashtra": [
    { name: "Mumbai", villages: 1, users: 45000, articles: 1200 },
    { name: "Pune", villages: 1842, users: 38000, articles: 980 },
    { name: "Nagpur", villages: 1642, users: 28000, articles: 750 },
    { name: "Thane", villages: 1202, users: 35000, articles: 890 },
  ],
  "Uttar Pradesh": [
    { name: "Lucknow", villages: 829, users: 42000, articles: 1100 },
    { name: "Kanpur", villages: 1124, users: 35000, articles: 920 },
    { name: "Varanasi", villages: 1542, users: 31000, articles: 850 },
    { name: "Agra", villages: 896, users: 29000, articles: 780 },
  ],
};

export function LocationManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const filteredLocations = mockLocations.filter(location =>
    location.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#212121] dark:text-white">Location Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage hyperlocal coverage down to village level</p>
        </div>
        <Button className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white">
          <Plus size={20} className="mr-2" />
          Add Location
        </Button>
      </div>

      {/* Coverage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-md">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total States</p>
          <p className="text-2xl font-bold text-[#212121] dark:text-white mt-1">28</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">+ 8 Union Territories</p>
        </Card>
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-md">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Districts</p>
          <p className="text-2xl font-bold text-[#D32F2F] mt-1">742</p>
          <p className="text-xs text-green-600 mt-1">100% coverage</p>
        </Card>
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-md">
          <p className="text-sm text-gray-600 dark:text-gray-400">Villages Covered</p>
          <p className="text-2xl font-bold text-[#4CAF50] mt-1">2,456</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Growing daily</p>
        </Card>
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-md">
          <p className="text-sm text-gray-600 dark:text-gray-400">Active Locations</p>
          <p className="text-2xl font-bold text-[#FFC107] mt-1">1,892</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">With daily updates</p>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Search states, districts, or villages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* State List */}
      {!selectedState ? (
        <div className="space-y-4">
          {filteredLocations.map((location) => (
            <Card 
              key={location.state} 
              className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setSelectedState(location.state)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#D32F2F] bg-opacity-10 flex items-center justify-center">
                    <MapPin size={24} className="text-[#D32F2F]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#212121] dark:text-white">{location.state}</h3>
                    <div className="flex gap-4 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {location.districts} Districts
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {location.villages.toLocaleString()} Villages
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#D32F2F]">{(location.activeUsers / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Users</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#FFC107]">{(location.newsArticles / 1000).toFixed(1)}K</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Articles</p>
                  </div>
                  <ChevronRight size={24} className="text-gray-400" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        // District View
        <div className="space-y-4">
          <Button 
            variant="outline" 
            onClick={() => setSelectedState(null)}
            className="mb-4"
          >
            ← Back to States
          </Button>

          <h2 className="text-2xl font-bold text-[#212121] dark:text-white mb-4">
            {selectedState} - Districts
          </h2>

          {sampleDistricts[selectedState as keyof typeof sampleDistricts]?.map((district) => (
            <Card 
              key={district.name}
              className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <MapPin size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#212121] dark:text-white">{district.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {district.villages.toLocaleString()} villages covered
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-xl font-bold text-[#D32F2F]">{(district.users / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Users</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-[#FFC107]">{district.articles}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Articles</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Map Visualization Placeholder */}
      <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
        <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-4">Coverage Map</h3>
        <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600 dark:text-gray-400">Interactive map visualization</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Coming soon with real-time coverage data</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
