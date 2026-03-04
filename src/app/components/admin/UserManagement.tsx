import { useState } from "react";
import { Search, UserPlus, Shield, Ban, Mail, Download, FileSpreadsheet } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { AddUserModal } from "@/app/components/admin/AddUserModal";
import { toast } from "sonner";
import * as XLSX from 'xlsx';

const mockUsers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    state: "Maharashtra",
    district: "Mumbai",
    city: "Andheri",
    language: "Hindi",
    joined: "2025-12-15",
    status: "Active",
    articles: 45,
    role: "User"
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43211",
    location: "Delhi, NCR",
    state: "Delhi",
    district: "Central Delhi",
    city: "Connaught Place",
    language: "English",
    joined: "2025-11-20",
    status: "Active",
    articles: 32,
    role: "Reporter"
  },
  {
    id: 3,
    name: "Venkat Ramanan",
    email: "venkat.r@email.com",
    phone: "+91 98765 43212",
    location: "Chennai, Tamil Nadu",
    state: "Tamil Nadu",
    district: "Chennai",
    city: "T Nagar",
    language: "Tamil",
    joined: "2026-01-05",
    status: "Active",
    articles: 28,
    role: "User"
  },
  {
    id: 4,
    name: "Ananya Das",
    email: "ananya.das@email.com",
    phone: "+91 98765 43213",
    location: "Kolkata, West Bengal",
    state: "West Bengal",
    district: "Kolkata",
    city: "Salt Lake",
    language: "Bengali",
    joined: "2025-10-10",
    status: "Suspended",
    articles: 12,
    role: "User"
  },
  {
    id: 5,
    name: "Kiran Reddy",
    email: "kiran.reddy@email.com",
    phone: "+91 98765 43214",
    location: "Hyderabad, Telangana",
    state: "Telangana",
    district: "Hyderabad",
    city: "Gachibowli",
    language: "Telugu",
    joined: "2025-12-28",
    status: "Active",
    articles: 67,
    role: "Editor"
  },
];

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    return status === "Active" 
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Editor": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "Reporter": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  const exportToExcel = () => {
    // Prepare data for export
    const exportData = filteredUsers.map(user => ({
      "User ID": user.id,
      "Name": user.name,
      "Email": user.email,
      "Phone Number": user.phone,
      "State": user.state,
      "District": user.district,
      "City/Village": user.city,
      "Full Location": user.location,
      "Language": user.language,
      "Role": user.role,
      "Status": user.status,
      "Articles Published": user.articles,
      "Joined Date": user.joined,
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Set column widths
    const colWidths = [
      { wch: 10 }, // User ID
      { wch: 20 }, // Name
      { wch: 30 }, // Email
      { wch: 18 }, // Phone
      { wch: 15 }, // State
      { wch: 15 }, // District
      { wch: 20 }, // City/Village
      { wch: 35 }, // Full Location
      { wch: 12 }, // Language
      { wch: 12 }, // Role
      { wch: 10 }, // Status
      { wch: 15 }, // Articles
      { wch: 12 }, // Joined Date
    ];
    ws['!cols'] = colWidths;

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users Data");

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `NewsRobo_Users_${timestamp}.xlsx`;

    // Save file
    XLSX.writeFile(wb, filename);

    toast.success("Users data exported successfully!", {
      description: `${filteredUsers.length} users exported to ${filename}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Add User Modal */}
      <AddUserModal 
        isOpen={showAddUserModal} 
        onSuccess={() => {
          setShowAddUserModal(false);
          toast.success("User added successfully!");
        }}
        onCancel={() => setShowAddUserModal(false)}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#212121] dark:text-white">User Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage registered users and their permissions</p>
        </div>
        <Button 
          className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white"
          onClick={() => setShowAddUserModal(true)}
        >
          <UserPlus size={20} className="mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-md">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
          <p className="text-2xl font-bold text-[#212121] dark:text-white mt-1">2.4M</p>
          <p className="text-xs text-green-600 mt-1">+12.5% this month</p>
        </Card>
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-md">
          <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
          <p className="text-2xl font-bold text-green-600 mt-1">1.8M</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">75% engagement</p>
        </Card>
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-md">
          <p className="text-sm text-gray-600 dark:text-gray-400">Reporters</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">12,450</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Citizen journalists</p>
        </Card>
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-md">
          <p className="text-sm text-gray-600 dark:text-gray-400">New Today</p>
          <p className="text-2xl font-bold text-[#FFC107] mt-1">324</p>
          <p className="text-xs text-green-600 mt-1">+8.2% vs yesterday</p>
        </Card>
      </div>

      {/* Search & Export */}
      <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search users by name, email or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button 
            variant="outline" 
            className="gap-2 bg-green-50 border-green-300 text-green-700 hover:bg-green-100"
            onClick={exportToExcel}
          >
            <FileSpreadsheet size={20} />
            Export to Excel
          </Button>
        </div>
      </Card>

      {/* Users Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14 bg-[#D32F2F] text-white">
                  <AvatarFallback className="bg-[#D32F2F] text-white text-lg">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-bold text-[#212121] dark:text-white text-lg">{user.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                    <Badge className={getRoleColor(user.role)}>
                      {user.role}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Mail size={16} />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="font-medium">Phone:</span>
                <span>{user.phone}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-gray-600 dark:text-gray-400">
                <div>
                  <span className="font-medium">State:</span> {user.state}
                </div>
                <div>
                  <span className="font-medium">District:</span> {user.district}
                </div>
                <div className="col-span-2">
                  <span className="font-medium">City/Village:</span> {user.city}
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="font-medium">Language:</span>
                <span>{user.language}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm">
                <span className="text-gray-600 dark:text-gray-400">Joined: </span>
                <span className="text-[#212121] dark:text-white font-medium">{user.joined}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600 dark:text-gray-400">Articles: </span>
                <span className="text-[#D32F2F] font-bold">{user.articles}</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Shield size={16} className="mr-2" />
                Edit Role
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Mail size={16} className="mr-2" />
                Message
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900">
                <Ban size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredUsers.length} of {mockUsers.length} users
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="outline" size="sm" className="bg-[#D32F2F] text-white">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
}
