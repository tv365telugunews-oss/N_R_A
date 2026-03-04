import { useState } from "react";
import { CheckCircle, XCircle, Clock, Image as ImageIcon, MapPin, Calendar } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { 
  ApproveReportModal, 
  RequestChangesModal, 
  RejectReportModal 
} from "@/app/components/admin/CitizenJournalismModals";
import { toast } from "sonner";

const mockReports = [
  {
    id: 1,
    title: "गांव में नई सड़क निर्माण शुरू",
    description: "हमारे गांव में आखिरकार नई सड़क का निर्माण शुरू हो गया है। यह ग्रामीणों के लिए बहुत बड़ी खुशी की बात है।",
    reporter: "Ramesh Yadav",
    location: "Sultanpur Village, Uttar Pradesh",
    language: "Hindi",
    category: "Infrastructure",
    status: "Pending",
    submittedDate: "2026-02-01 10:30",
    images: 3,
    verified: false
  },
  {
    id: 2,
    title: "Local School Receives Donations",
    description: "Community members came together to donate books, computers, and school supplies to our village school.",
    reporter: "Kavita Singh",
    location: "Ramnagar, Bihar",
    language: "English",
    category: "Education",
    status: "Approved",
    submittedDate: "2026-02-01 09:15",
    images: 5,
    verified: true
  },
  {
    id: 3,
    title: "వరద బాధితులకు సహాయం",
    description: "స్థానిక పరిపాలన వరద బాధితులకు ఆహారం మరియు నివాస సౌకర్యాలు అందిస్తోంది.",
    reporter: "Srinivas Murthy",
    location: "Vijayawada, Andhra Pradesh",
    language: "Telugu",
    category: "Disaster",
    status: "Pending",
    submittedDate: "2026-02-01 08:45",
    images: 8,
    verified: false
  },
  {
    id: 4,
    title: "স্বাস্থ্য শিবির সফল",
    description: "গ্রামে বিনামূল্যে স্বাস্থ্য পরীক্ষা শিবির অনুষ্ঠিত হয়েছে যেখানে 200+ মানুষ উপকৃত হয়েছেন।",
    reporter: "Dipak Banerjee",
    location: "Malda, West Bengal",
    language: "Bengali",
    category: "Health",
    status: "Rejected",
    submittedDate: "2026-01-31 16:20",
    images: 4,
    verified: false
  },
];

export function CitizenJournalism() {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRequestChangesModalOpen, setIsRequestChangesModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const filteredReports = filterStatus === "all" 
    ? mockReports 
    : mockReports.filter(report => report.status === filterStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Rejected": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleApprove = (report: any) => {
    setSelectedReport(report);
    setIsApproveModalOpen(true);
  };

  const handleRequestChanges = (report: any) => {
    setSelectedReport(report);
    setIsRequestChangesModalOpen(true);
  };

  const handleReject = (report: any) => {
    setSelectedReport(report);
    setIsRejectModalOpen(true);
  };

  const handleApproveConfirm = () => {
    setIsApproveModalOpen(false);
    setSelectedReport(null);
  };

  const handleRequestChangesConfirm = () => {
    setIsRequestChangesModalOpen(false);
    setSelectedReport(null);
  };

  const handleRejectConfirm = () => {
    setIsRejectModalOpen(false);
    setSelectedReport(null);
  };

  const pendingCount = mockReports.filter(r => r.status === "Pending").length;
  const approvedCount = mockReports.filter(r => r.status === "Approved").length;
  const rejectedCount = mockReports.filter(r => r.status === "Rejected").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#212121] dark:text-white">Citizen Journalism</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Review and approve community-submitted news reports</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card 
          className={`p-4 border-none shadow-md cursor-pointer transition-all ${
            filterStatus === "all" ? "ring-2 ring-[#D32F2F]" : ""
          }`}
          onClick={() => setFilterStatus("all")}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Reports</p>
          <p className="text-2xl font-bold text-[#212121] dark:text-white mt-1">{mockReports.length}</p>
        </Card>
        <Card 
          className={`p-4 border-none shadow-md cursor-pointer transition-all ${
            filterStatus === "Pending" ? "ring-2 ring-[#FFC107]" : ""
          }`}
          onClick={() => setFilterStatus("Pending")}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">Pending Review</p>
          <p className="text-2xl font-bold text-[#FFC107] mt-1">{pendingCount}</p>
        </Card>
        <Card 
          className={`p-4 border-none shadow-md cursor-pointer transition-all ${
            filterStatus === "Approved" ? "ring-2 ring-green-500" : ""
          }`}
          onClick={() => setFilterStatus("Approved")}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{approvedCount}</p>
        </Card>
        <Card 
          className={`p-4 border-none shadow-md cursor-pointer transition-all ${
            filterStatus === "Rejected" ? "ring-2 ring-red-500" : ""
          }`}
          onClick={() => setFilterStatus("Rejected")}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">Rejected</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{rejectedCount}</p>
        </Card>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-[#212121] dark:text-white">{report.title}</h3>
                  <Badge className={getStatusColor(report.status)}>
                    {report.status}
                  </Badge>
                  {report.verified && (
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{report.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 rounded-full bg-[#D32F2F] flex items-center justify-center text-white font-bold text-xs">
                  {report.reporter.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-500 text-xs">Reporter</p>
                  <p className="font-medium text-[#212121] dark:text-white">{report.reporter}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <MapPin size={16} className="text-gray-500" />
                <div>
                  <p className="text-gray-500 dark:text-gray-500 text-xs">Location</p>
                  <p className="font-medium text-[#212121] dark:text-white">{report.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <ImageIcon size={16} className="text-gray-500" />
                <div>
                  <p className="text-gray-500 dark:text-gray-500 text-xs">Images</p>
                  <p className="font-medium text-[#212121] dark:text-white">{report.images} photos</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar size={16} className="text-gray-500" />
                <div>
                  <p className="text-gray-500 dark:text-gray-500 text-xs">Submitted</p>
                  <p className="font-medium text-[#212121] dark:text-white">{report.submittedDate}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="text-xs">
                {report.language}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {report.category}
              </Badge>
            </div>

            {/* Action Buttons */}
            {report.status === "Pending" && (
              <div className="flex gap-3 pt-4 border-t dark:border-gray-700">
                <Button variant="outline" className="flex-1" onClick={() => handleApprove(report)}>
                  Approve
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => handleRequestChanges(report)}>
                  Request Changes
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => handleReject(report)}>
                  Reject
                </Button>
              </div>
            )}

            {report.status === "Approved" && (
              <div className="flex gap-3 pt-4 border-t dark:border-gray-700">
                <Button variant="outline" className="flex-1">
                  View Published Article
                </Button>
                <Button variant="outline" className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900">
                  Unpublish
                </Button>
              </div>
            )}

            {report.status === "Rejected" && (
              <div className="pt-4 border-t dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Rejection reason: Does not meet editorial standards
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <Card className="p-12 text-center bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <Clock size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-400">No reports found</p>
        </Card>
      )}

      {/* Modals */}
      <ApproveReportModal 
        report={selectedReport}
        isOpen={isApproveModalOpen}
        onConfirm={handleApproveConfirm}
        onCancel={() => setIsApproveModalOpen(false)}
      />
      <RequestChangesModal 
        report={selectedReport}
        isOpen={isRequestChangesModalOpen}
        onConfirm={handleRequestChangesConfirm}
        onCancel={() => setIsRequestChangesModalOpen(false)}
      />
      <RejectReportModal 
        report={selectedReport}
        isOpen={isRejectModalOpen}
        onConfirm={handleRejectConfirm}
        onCancel={() => setIsRejectModalOpen(false)}
      />
    </div>
  );
}