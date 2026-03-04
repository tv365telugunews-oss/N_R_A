import { useState } from "react";
import { Upload, FileText, Eye, Download, Trash2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { toast } from "sonner";

interface EPaper {
  id: string;
  name: string;
  date: string;
  url: string;
  uploadedBy: string;
}

const mockEPapers: EPaper[] = [
  {
    id: "1",
    name: "News Robo - January 18, 2026",
    date: "2026-01-18",
    url: "#",
    uploadedBy: "admin",
  },
  {
    id: "2",
    name: "News Robo - January 17, 2026",
    date: "2026-01-17",
    url: "#",
    uploadedBy: "admin",
  },
];

export function EPaperViewer() {
  const [ePapers, setEPapers] = useState<EPaper[]>(mockEPapers);
  const [isAdmin] = useState(true); // For demo purposes, set to true. In production, this would be from auth
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      toast.success(`Selected: ${file.name}`);
    } else {
      toast.error("Please select a valid PDF file");
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error("Please select a PDF file first");
      return;
    }

    // In production, this would upload to a server
    const newEPaper: EPaper = {
      id: Date.now().toString(),
      name: selectedFile.name,
      date: new Date().toISOString().split("T")[0],
      url: URL.createObjectURL(selectedFile),
      uploadedBy: "admin",
    };

    setEPapers([newEPaper, ...ePapers]);
    setSelectedFile(null);
    toast.success("E-Paper uploaded successfully!");
  };

  const handleView = (ePaper: EPaper) => {
    toast.info(`Opening: ${ePaper.name}`);
    // In production, this would open the PDF in a viewer
    window.open(ePaper.url, "_blank");
  };

  const handleDownload = (ePaper: EPaper) => {
    toast.success(`Downloading: ${ePaper.name}`);
    // In production, this would download the PDF
  };

  const handleDelete = (id: string) => {
    if (!isAdmin) {
      toast.error("Only admins can delete E-Papers");
      return;
    }
    setEPapers(ePapers.filter((ep) => ep.id !== id));
    toast.success("E-Paper deleted successfully");
  };

  return (
    <div className="h-full w-full bg-background p-6 overflow-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">E-Paper</h1>
          <p className="text-sm text-muted-foreground">
            View and download digital newspaper editions
          </p>
        </div>

        {/* Admin Upload Section */}
        {isAdmin && (
          <div className="mb-6 p-6 bg-card border rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Upload E-Paper (Admin Only)
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <label
                  htmlFor="pdf-upload"
                  className="cursor-pointer px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Select PDF File
                </label>
                <input
                  id="pdf-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                {selectedFile && (
                  <span className="text-sm text-muted-foreground">
                    {selectedFile.name}
                  </span>
                )}
              </div>
              {selectedFile && (
                <Button onClick={handleUpload} className="w-full sm:w-auto">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload E-Paper
                </Button>
              )}
            </div>
          </div>
        )}

        {/* E-Paper List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Available E-Papers</h2>
          {ePapers.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No E-Papers available yet</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {ePapers.map((ePaper) => (
                <div
                  key={ePaper.id}
                  className="p-4 bg-card border rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          {ePaper.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(ePaper.date).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleView(ePaper)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(ePaper)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      {isAdmin && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(ePaper.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
