import { useState } from "react";
import { X, CheckCircle, XCircle, AlertCircle, Calendar, Tag, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card } from "@/app/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

interface Report {
  id: number;
  title: string;
  description: string;
  reporter: string;
  location: string;
  language: string;
  category: string;
  status: string;
  submittedDate: string;
  images: number;
  verified: boolean;
}

interface ApproveModalProps {
  report: Report | null;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ApproveReportModal({ report, isOpen, onConfirm, onCancel }: ApproveModalProps) {
  const [publishOption, setPublishOption] = useState("now");
  const [category, setCategory] = useState(report?.category || "General");
  const [isFeatured, setIsFeatured] = useState(false);

  if (!isOpen || !report) return null;

  const handleApprove = () => {
    toast.success("Report Approved & Published!", {
      description: `"${report.title}" is now live and visible to users`,
    });
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onCancel} />

      <Card className="relative w-full max-w-2xl bg-white dark:bg-[#1E1E1E] p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#212121] dark:text-white">Approve & Publish</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Review and publish this citizen report
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X size={20} />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Report Preview */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-[#212121] dark:text-white mb-2">{report.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{report.description}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>By {report.reporter}</span>
              <span>•</span>
              <span>{report.location}</span>
              <span>•</span>
              <span>{report.images} images</span>
            </div>
          </div>

          {/* Publishing Options */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Publication Timing
            </label>
            <Select value={publishOption} onValueChange={setPublishOption}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="now">Publish Immediately</SelectItem>
                <SelectItem value="schedule">Schedule for Later</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {publishOption === "schedule" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <Calendar size={16} className="inline mr-2" />
                Schedule Date & Time
              </label>
              <Input type="datetime-local" />
            </div>
          )}

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <Tag size={16} className="inline mr-2" />
              Category
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General">General News</SelectItem>
                <SelectItem value="Politics">Politics</SelectItem>
                <SelectItem value="Sports">Sports</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
                <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                <SelectItem value="Disaster">Disaster & Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2">
              <Star size={20} className="text-blue-600" />
              <div>
                <p className="font-semibold text-blue-900 dark:text-blue-100">Mark as Featured</p>
                <p className="text-xs text-blue-700 dark:text-blue-300">Show this report prominently to users</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-5 h-5 rounded"
            />
          </div>

          {/* Verification Notice */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <p className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">
              ✓ Verification Complete
            </p>
            <ul className="text-sm text-green-800 dark:text-green-200 space-y-1 ml-4 list-disc">
              <li>Reporter identity verified</li>
              <li>Location confirmed: {report.location}</li>
              <li>Content reviewed for accuracy</li>
              <li>Images validated</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6 pt-6 border-t dark:border-gray-700">
          <Button
            onClick={handleApprove}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            <CheckCircle size={18} className="mr-2" />
            Approve & Publish
          </Button>
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
}

interface RequestChangesModalProps {
  report: Report | null;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function RequestChangesModal({ report, isOpen, onConfirm, onCancel }: RequestChangesModalProps) {
  const [feedback, setFeedback] = useState("");
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);

  if (!isOpen || !report) return null;

  const issues = [
    "Incomplete information",
    "Unclear images/videos",
    "Location details missing",
    "Need more context",
    "Incorrect category",
    "Language/grammar issues",
  ];

  const toggleIssue = (issue: string) => {
    setSelectedIssues(prev =>
      prev.includes(issue) ? prev.filter(i => i !== issue) : [...prev, issue]
    );
  };

  const handleSubmit = () => {
    if (!feedback && selectedIssues.length === 0) {
      toast.error("Please provide feedback or select issues");
      return;
    }

    toast.success("Change Request Sent!", {
      description: `${report.reporter} will be notified to make the requested changes`,
    });
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onCancel} />

      <Card className="relative w-full max-w-2xl bg-white dark:bg-[#1E1E1E] p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
              <AlertCircle size={24} className="text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#212121] dark:text-white">Request Changes</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Send feedback to the reporter
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X size={20} />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Report Info */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-[#212121] dark:text-white mb-1">{report.title}</h3>
            <p className="text-xs text-gray-500">By {report.reporter}</p>
          </div>

          {/* Common Issues Checklist */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Select Issues (Optional)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {issues.map((issue) => (
                <label
                  key={issue}
                  className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedIssues.includes(issue)
                      ? "border-[#D32F2F] bg-red-50 dark:bg-red-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedIssues.includes(issue)}
                    onChange={() => toggleIssue(issue)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{issue}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Detailed Feedback */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Additional Feedback
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide specific details about what needs to be changed..."
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-[#D32F2F] focus:ring-0 outline-none min-h-[120px] text-base resize-none bg-white dark:bg-gray-800 dark:text-white"
            />
            <p className="text-xs text-gray-500 mt-1">{feedback.length}/500 characters</p>
          </div>

          {/* Info Notice */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              📧 The reporter will receive an email notification with your feedback and can resubmit the report after making changes.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6 pt-6 border-t dark:border-gray-700">
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
          >
            <AlertCircle size={18} className="mr-2" />
            Send Change Request
          </Button>
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
}

interface RejectModalProps {
  report: Report | null;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function RejectReportModal({ report, isOpen, onConfirm, onCancel }: RejectModalProps) {
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  if (!isOpen || !report) return null;

  const handleReject = () => {
    if (!reason) {
      toast.error("Please select a rejection reason");
      return;
    }

    toast.success("Report Rejected", {
      description: `"${report.title}" has been rejected. Reporter will be notified.`,
    });
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onCancel} />

      <Card className="relative w-full max-w-2xl bg-white dark:bg-[#1E1E1E] p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <XCircle size={24} className="text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#212121] dark:text-white">Reject Report</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                This report will be permanently rejected
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X size={20} />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Report Info */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-[#212121] dark:text-white mb-2">{report.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{report.description}</p>
            <p className="text-xs text-gray-500 mt-2">By {report.reporter} • {report.location}</p>
          </div>

          {/* Rejection Reason */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Rejection Reason *
            </label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fake">Fake or Misleading Information</SelectItem>
                <SelectItem value="inappropriate">Inappropriate Content</SelectItem>
                <SelectItem value="duplicate">Duplicate Report</SelectItem>
                <SelectItem value="irrelevant">Irrelevant or Off-topic</SelectItem>
                <SelectItem value="poor-quality">Poor Quality</SelectItem>
                <SelectItem value="violation">Policy Violation</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Provide additional context for the rejection..."
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-[#D32F2F] focus:ring-0 outline-none min-h-[100px] text-base resize-none bg-white dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Warning Notice */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-2">
              ⚠️ Warning
            </p>
            <ul className="text-sm text-red-800 dark:text-red-200 space-y-1 ml-4 list-disc">
              <li>This action cannot be undone</li>
              <li>The reporter will be notified via email</li>
              <li>The report will be permanently removed from the review queue</li>
              <li>Multiple rejections may affect the reporter's trust score</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6 pt-6 border-t dark:border-gray-700">
          <Button
            onClick={handleReject}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            <XCircle size={18} className="mr-2" />
            Confirm Rejection
          </Button>
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
}
