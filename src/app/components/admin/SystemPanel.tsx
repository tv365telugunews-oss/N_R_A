import { useState } from 'react';
import { Download, Upload, Database, AlertCircle, CheckCircle, Server, HardDrive, Activity, FileText } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';

interface SystemLog {
  id: string;
  timestamp: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  details?: string;
}

const mockLogs: SystemLog[] = [
  {
    id: '1',
    timestamp: '2026-02-01T10:30:45',
    type: 'info',
    message: 'Database backup completed successfully',
    details: 'Backup size: 2.4 GB, Duration: 3 minutes'
  },
  {
    id: '2',
    timestamp: '2026-02-01T10:15:22',
    type: 'warning',
    message: 'High CPU usage detected',
    details: 'CPU usage: 87%, Action: Automatic scaling triggered'
  },
  {
    id: '3',
    timestamp: '2026-02-01T09:45:10',
    type: 'error',
    message: 'Failed to send push notification',
    details: 'Error: Connection timeout, Affected users: 234'
  },
  {
    id: '4',
    timestamp: '2026-02-01T09:00:00',
    type: 'info',
    message: 'Scheduled maintenance completed',
    details: 'Duration: 15 minutes, No downtime'
  },
  {
    id: '5',
    timestamp: '2026-02-01T08:30:15',
    type: 'info',
    message: 'Cache cleared successfully',
    details: 'Freed space: 1.2 GB'
  }
];

interface BackupInfo {
  id: string;
  name: string;
  date: string;
  size: string;
  type: 'full' | 'incremental';
  status: 'completed' | 'in-progress' | 'failed';
}

const mockBackups: BackupInfo[] = [
  {
    id: '1',
    name: 'Full Backup - Feb 01, 2026',
    date: '2026-02-01T10:30:00',
    size: '2.4 GB',
    type: 'full',
    status: 'completed'
  },
  {
    id: '2',
    name: 'Incremental Backup - Jan 31, 2026',
    date: '2026-01-31T10:30:00',
    size: '450 MB',
    type: 'incremental',
    status: 'completed'
  },
  {
    id: '3',
    name: 'Full Backup - Jan 25, 2026',
    date: '2026-01-25T10:30:00',
    size: '2.2 GB',
    type: 'full',
    status: 'completed'
  }
];

export function SystemPanel() {
  const [logs, setLogs] = useState<SystemLog[]>(mockLogs);
  const [backups, setBackups] = useState<BackupInfo[]>(mockBackups);
  const [activeTab, setActiveTab] = useState<'backup' | 'logs' | 'status'>('backup');

  const handleCreateBackup = () => {
    const backup: BackupInfo = {
      id: Date.now().toString(),
      name: `Full Backup - ${new Date().toLocaleDateString('en-IN', { month: 'short', day: '2-digit', year: 'numeric' })}`,
      date: new Date().toISOString(),
      size: '2.5 GB',
      type: 'full',
      status: 'in-progress'
    };
    
    setBackups([backup, ...backups]);
    
    // Simulate backup completion
    setTimeout(() => {
      setBackups(prev => prev.map(b => 
        b.id === backup.id ? { ...b, status: 'completed' as const } : b
      ));
      alert('Backup created successfully!');
    }, 2000);
  };

  const handleRestoreBackup = (backupId: string) => {
    if (confirm('Are you sure you want to restore this backup? Current data will be replaced.')) {
      alert('Restoring backup... This may take a few minutes.');
    }
  };

  const handleDeleteBackup = (backupId: string) => {
    if (confirm('Are you sure you want to delete this backup?')) {
      setBackups(backups.filter(b => b.id !== backupId));
    }
  };

  const systemStats = {
    uptime: '15 days, 8 hours',
    cpu: 45,
    memory: 62,
    storage: 68,
    dbSize: '2.4 GB',
    mediaSize: '18.7 GB',
    totalUsers: 162543,
    activeNow: 8934
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#212121] dark:text-white">System Management</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Backup, restore, and monitor system health
        </p>
      </div>

      {/* System Health Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Activity size={20} className="text-blue-600" />
            </div>
            <span className="text-xs font-medium text-green-600">Healthy</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Uptime</p>
          <p className="text-lg font-bold text-[#212121] dark:text-white mt-1">{systemStats.uptime}</p>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Server size={20} className="text-green-600" />
            </div>
            <span className={`text-xs font-medium ${systemStats.cpu > 70 ? 'text-red-600' : 'text-green-600'}`}>
              {systemStats.cpu}%
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">CPU Usage</p>
          <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                systemStats.cpu > 70 ? 'bg-red-600' : 'bg-green-600'
              }`}
              style={{ width: `${systemStats.cpu}%` }}
            />
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Activity size={20} className="text-purple-600" />
            </div>
            <span className={`text-xs font-medium ${systemStats.memory > 70 ? 'text-orange-600' : 'text-green-600'}`}>
              {systemStats.memory}%
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Memory Usage</p>
          <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                systemStats.memory > 70 ? 'bg-orange-600' : 'bg-green-600'
              }`}
              style={{ width: `${systemStats.memory}%` }}
            />
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <HardDrive size={20} className="text-orange-600" />
            </div>
            <span className={`text-xs font-medium ${systemStats.storage > 80 ? 'text-red-600' : 'text-green-600'}`}>
              {systemStats.storage}%
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Storage</p>
          <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                systemStats.storage > 80 ? 'bg-red-600' : 'bg-green-600'
              }`}
              style={{ width: `${systemStats.storage}%` }}
            />
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b dark:border-gray-700">
        {[
          { id: 'backup', label: 'Backup & Restore' },
          { id: 'logs', label: 'System Logs' },
          { id: 'status', label: 'System Status' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 px-2 font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-[#D32F2F] border-b-2 border-[#D32F2F]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Backup & Restore Tab */}
      {activeTab === 'backup' && (
        <div className="space-y-6">
          {/* Actions */}
          <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
            <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-4">Backup Actions</h3>
            <div className="flex items-center gap-4">
              <Button
                onClick={handleCreateBackup}
                className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white"
              >
                <Database size={18} className="mr-2" />
                Create Full Backup
              </Button>
              <Button variant="outline">
                <Download size={18} className="mr-2" />
                Create Incremental Backup
              </Button>
              <Button variant="outline">
                <Upload size={18} className="mr-2" />
                Import Backup
              </Button>
            </div>
          </Card>

          {/* Backup List */}
          <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
            <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-4">Available Backups</h3>
            <div className="space-y-3">
              {backups.map((backup) => (
                <div
                  key={backup.id}
                  className="flex items-center justify-between p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-[#D32F2F] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <Database size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#212121] dark:text-white">{backup.name}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        <span>{new Date(backup.date).toLocaleString('en-IN')}</span>
                        <span>•</span>
                        <span>{backup.size}</span>
                        <span>•</span>
                        <span className="capitalize">{backup.type}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {backup.status === 'completed' && (
                      <>
                        <Button
                          onClick={() => handleRestoreBackup(backup.id)}
                          size="sm"
                          variant="outline"
                          className="border-green-600 text-green-600"
                        >
                          <Upload size={16} className="mr-1" />
                          Restore
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-600 text-blue-600"
                        >
                          <Download size={16} className="mr-1" />
                          Download
                        </Button>
                        <Button
                          onClick={() => handleDeleteBackup(backup.id)}
                          size="sm"
                          variant="outline"
                          className="border-red-600 text-red-600"
                        >
                          Delete
                        </Button>
                      </>
                    )}
                    {backup.status === 'in-progress' && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full">
                        In Progress...
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* System Logs Tab */}
      {activeTab === 'logs' && (
        <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[#212121] dark:text-white">System Logs</h3>
            <Button variant="outline" size="sm">
              <Download size={16} className="mr-2" />
              Export Logs
            </Button>
          </div>

          <div className="space-y-2">
            {logs.map((log) => (
              <div
                key={log.id}
                className={`p-4 rounded-lg border-l-4 ${
                  log.type === 'error'
                    ? 'bg-red-50 dark:bg-red-900/10 border-red-600'
                    : log.type === 'warning'
                    ? 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-600'
                    : 'bg-blue-50 dark:bg-blue-900/10 border-blue-600'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {log.type === 'error' && <AlertCircle size={20} className="text-red-600 mt-0.5" />}
                    {log.type === 'warning' && <AlertCircle size={20} className="text-yellow-600 mt-0.5" />}
                    {log.type === 'info' && <CheckCircle size={20} className="text-blue-600 mt-0.5" />}
                    <div>
                      <p className={`font-medium ${
                        log.type === 'error' ? 'text-red-700' :
                        log.type === 'warning' ? 'text-yellow-700' :
                        'text-blue-700'
                      }`}>
                        {log.message}
                      </p>
                      {log.details && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{log.details}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* System Status Tab */}
      {activeTab === 'status' && (
        <div className="space-y-6">
          {/* Database Stats */}
          <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
            <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-4">Database Statistics</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Database Size</p>
                <p className="text-3xl font-bold text-[#212121] dark:text-white">{systemStats.dbSize}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Media Storage</p>
                <p className="text-3xl font-bold text-[#212121] dark:text-white">{systemStats.mediaSize}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Total Users</p>
                <p className="text-3xl font-bold text-[#212121] dark:text-white">{systemStats.totalUsers.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Active Now</p>
                <p className="text-3xl font-bold text-green-600">{systemStats.activeNow.toLocaleString()}</p>
              </div>
            </div>
          </Card>

          {/* Version Info */}
          <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
            <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-4">Version Information</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">App Version</span>
                <span className="font-bold text-[#212121] dark:text-white">1.0.0</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Admin Panel Version</span>
                <span className="font-bold text-[#212121] dark:text-white">1.0.0</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Last Update</span>
                <span className="font-bold text-[#212121] dark:text-white">Feb 1, 2026</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600 dark:text-gray-400">Environment</span>
                <span className="px-3 py-1 bg-green-100 text-green-600 text-sm font-bold rounded-full">
                  Production
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
