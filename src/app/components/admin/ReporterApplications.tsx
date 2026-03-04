import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Eye, User, Mail, Phone, MapPin, Calendar, Image as ImageIcon, FileText } from 'lucide-react';
import { Reporter } from '@/app/contexts/ReporterAuthContext';
import { toast } from 'sonner';

export function ReporterApplications() {
  const [applications, setApplications] = useState<Reporter[]>([]);
  const [selectedApp, setSelectedApp] = useState<Reporter | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = () => {
    const data = localStorage.getItem('newsrobo_reporters');
    if (data) {
      setApplications(JSON.parse(data));
    }
  };

  const handleApprove = (reporter: Reporter) => {
    const updatedReporter = {
      ...reporter,
      status: 'approved' as const,
      approvedDate: new Date().toISOString()
    };

    const data = localStorage.getItem('newsrobo_reporters');
    if (data) {
      const reporters: Reporter[] = JSON.parse(data);
      const updated = reporters.map(r => r.id === reporter.id ? updatedReporter : r);
      localStorage.setItem('newsrobo_reporters', JSON.stringify(updated));
      loadApplications();
      setSelectedApp(null);
      toast.success(`Approved reporter: ${reporter.firstName} ${reporter.lastName}`);
    }
  };

  const handleReject = (reporter: Reporter) => {
    const updatedReporter = {
      ...reporter,
      status: 'rejected' as const
    };

    const data = localStorage.getItem('newsrobo_reporters');
    if (data) {
      const reporters: Reporter[] = JSON.parse(data);
      const updated = reporters.map(r => r.id === reporter.id ? updatedReporter : r);
      localStorage.setItem('newsrobo_reporters', JSON.stringify(updated));
      loadApplications();
      setSelectedApp(null);
      toast.error(`Rejected reporter: ${reporter.firstName} ${reporter.lastName}`);
    }
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-[#212121]">Reporter Applications</h2>
        
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all' ? 'bg-[#D32F2F] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All ({applications.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'pending' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Pending ({applications.filter(a => a.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'approved' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Approved ({applications.filter(a => a.status === 'approved').length})
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'rejected' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Rejected ({applications.filter(a => a.status === 'rejected').length})
          </button>
        </div>
      </div>

      {filteredApplications.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow-sm text-center">
          <User className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold text-[#212121] mb-2">No Applications</h3>
          <p className="text-gray-600">No reporter applications found for this filter.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredApplications.map((app) => (
            <div key={app.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* Profile Photo */}
                <div className="flex-shrink-0">
                  {app.photo ? (
                    <img
                      src={app.photo}
                      alt={`${app.firstName} ${app.lastName}`}
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-10 w-10 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Application Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-[#212121]">
                        {app.firstName} {app.lastName}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          <span>{app.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          <span>{app.mobile}</span>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        app.status === 'pending'
                          ? 'bg-orange-100 text-orange-700'
                          : app.status === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        {app.houseNumber}, {app.village}, {app.mandal}, {app.district}, {app.state}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700">
                        Applied: {new Date(app.appliedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                    </button>
                    
                    {app.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(app)}
                          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(app)}
                          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          <XCircle className="h-4 w-4" />
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-[300] bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-8 my-8">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#212121]">Application Details</h2>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-3">Personal Information</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Full Name</p>
                      <p className="font-semibold text-[#212121]">
                        {selectedApp.firstName} {selectedApp.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-semibold text-[#212121]">{selectedApp.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Mobile</p>
                      <p className="font-semibold text-[#212121]">{selectedApp.mobile}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-3">Address</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">House Number</p>
                      <p className="font-semibold text-[#212121]">{selectedApp.houseNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Village/Town</p>
                      <p className="font-semibold text-[#212121]">{selectedApp.village}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Mandal</p>
                      <p className="font-semibold text-[#212121]">{selectedApp.mandal}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">District</p>
                      <p className="font-semibold text-[#212121]">{selectedApp.district}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">State</p>
                      <p className="font-semibold text-[#212121]">{selectedApp.state}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-3">Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedApp.photo && (
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Profile Photo</p>
                      <img
                        src={selectedApp.photo}
                        alt="Profile"
                        className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                      />
                    </div>
                  )}
                  {selectedApp.aadharCard && (
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Aadhar Card</p>
                      {selectedApp.aadharCard.startsWith('data:image') ? (
                        <img
                          src={selectedApp.aadharCard}
                          alt="Aadhar"
                          className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center">
                          <FileText className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Application Status */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="font-semibold text-[#212121] capitalize">{selectedApp.status}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Applied Date</p>
                    <p className="font-semibold text-[#212121]">
                      {new Date(selectedApp.appliedDate).toLocaleDateString()}
                    </p>
                  </div>
                  {selectedApp.approvedDate && (
                    <div>
                      <p className="text-xs text-gray-500">Approved Date</p>
                      <p className="font-semibold text-[#212121]">
                        {new Date(selectedApp.approvedDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              {selectedApp.status === 'pending' && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(selectedApp)}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    <CheckCircle className="h-5 w-5" />
                    Approve Application
                  </button>
                  <button
                    onClick={() => handleReject(selectedApp)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                  >
                    <XCircle className="h-5 w-5" />
                    Reject Application
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
