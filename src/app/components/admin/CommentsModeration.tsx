import { useState } from 'react';
import { CheckCircle, XCircle, Flag, Eye, Ban, Trash2, MessageSquare, Search } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';

interface Comment {
  id: string;
  author: string;
  authorEmail: string;
  content: string;
  newsTitle: string;
  newsId: string;
  timestamp: string;
  status: 'approved' | 'pending' | 'reported';
  reports: number;
  likes: number;
}

const mockComments: Comment[] = [
  {
    id: '1',
    author: 'Rajesh Kumar',
    authorEmail: 'rajesh@example.com',
    content: 'Very informative article! Thanks for sharing this important news.',
    newsTitle: 'Breaking: New Economic Policy Announced',
    newsId: 'news1',
    timestamp: '2026-02-01T10:30:00',
    status: 'approved',
    reports: 0,
    likes: 24
  },
  {
    id: '2',
    author: 'Anonymous User',
    authorEmail: 'spam@example.com',
    content: 'Click here for free money!!! 🤑💰 [spam link]',
    newsTitle: 'Local Business Opens New Branch',
    newsId: 'news2',
    timestamp: '2026-02-01T09:15:00',
    status: 'reported',
    reports: 8,
    likes: 0
  },
  {
    id: '3',
    author: 'Priya Sharma',
    authorEmail: 'priya@example.com',
    content: 'Is this information verified? Can you provide sources?',
    newsTitle: 'Health Ministry Issues New Guidelines',
    newsId: 'news3',
    timestamp: '2026-02-01T08:45:00',
    status: 'pending',
    reports: 0,
    likes: 5
  },
  {
    id: '4',
    author: 'Amit Patel',
    authorEmail: 'amit@example.com',
    content: 'Great work by the journalism team! Keep it up.',
    newsTitle: 'Investigation Reveals Corruption',
    newsId: 'news4',
    timestamp: '2026-01-31T18:20:00',
    status: 'approved',
    reports: 0,
    likes: 42
  },
  {
    id: '5',
    author: 'Controversial User',
    authorEmail: 'troll@example.com',
    content: 'This is fake news! You are all liars and should be shut down!',
    newsTitle: 'Election Results Analysis',
    newsId: 'news5',
    timestamp: '2026-01-31T16:10:00',
    status: 'reported',
    reports: 15,
    likes: 0
  },
  {
    id: '6',
    author: 'Sneha Gupta',
    authorEmail: 'sneha@example.com',
    content: 'खूब अच्छी खबर। धन्यवाद! 🙏',
    newsTitle: 'Cultural Festival Begins Tomorrow',
    newsId: 'news6',
    timestamp: '2026-01-31T14:30:00',
    status: 'pending',
    reports: 0,
    likes: 12
  }
];

export function CommentsModeration() {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending' | 'reported'>('all');
  const [selectedComments, setSelectedComments] = useState<Set<string>>(new Set());

  const filteredComments = comments.filter(comment => {
    const matchesSearch = 
      comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.newsTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || comment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id: string) => {
    setComments(comments.map(c => 
      c.id === id ? { ...c, status: 'approved' as const } : c
    ));
  };

  const handleReject = (id: string) => {
    if (confirm('Are you sure you want to delete this comment?')) {
      setComments(comments.filter(c => c.id !== id));
    }
  };

  const handleBulkAction = (action: 'approve' | 'delete') => {
    if (action === 'approve') {
      setComments(comments.map(c => 
        selectedComments.has(c.id) ? { ...c, status: 'approved' as const } : c
      ));
      setSelectedComments(new Set());
    } else if (action === 'delete') {
      if (confirm(`Delete ${selectedComments.size} selected comments?`)) {
        setComments(comments.filter(c => !selectedComments.has(c.id)));
        setSelectedComments(new Set());
      }
    }
  };

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedComments);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedComments(newSelected);
  };

  const stats = {
    total: comments.length,
    approved: comments.filter(c => c.status === 'approved').length,
    pending: comments.filter(c => c.status === 'pending').length,
    reported: comments.filter(c => c.status === 'reported').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#212121] dark:text-white">Comments Moderation</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Review and moderate user comments
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <MessageSquare size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total</p>
              <p className="text-2xl font-bold text-[#212121] dark:text-white">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Approved</p>
              <p className="text-2xl font-bold text-[#212121] dark:text-white">{stats.approved}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Eye size={24} className="text-orange-600" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Pending</p>
              <p className="text-2xl font-bold text-[#212121] dark:text-white">{stats.pending}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <Flag size={24} className="text-red-600" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Reported</p>
              <p className="text-2xl font-bold text-[#212121] dark:text-white">{stats.reported}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search & Filter Bar */}
      <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search comments, authors, or news..."
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('all')}
              className={filterStatus === 'all' ? 'bg-[#D32F2F] text-white' : ''}
            >
              All
            </Button>
            <Button
              variant={filterStatus === 'pending' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('pending')}
              className={filterStatus === 'pending' ? 'bg-[#D32F2F] text-white' : ''}
            >
              Pending
            </Button>
            <Button
              variant={filterStatus === 'reported' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('reported')}
              className={filterStatus === 'reported' ? 'bg-[#D32F2F] text-white' : ''}
            >
              Reported
            </Button>
            <Button
              variant={filterStatus === 'approved' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('approved')}
              className={filterStatus === 'approved' ? 'bg-[#D32F2F] text-white' : ''}
            >
              Approved
            </Button>
          </div>

          {selectedComments.size > 0 && (
            <>
              <Button
                onClick={() => handleBulkAction('approve')}
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                <CheckCircle size={16} className="mr-2" />
                Approve ({selectedComments.size})
              </Button>
              <Button
                onClick={() => handleBulkAction('delete')}
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50"
              >
                <Trash2 size={16} className="mr-2" />
                Delete ({selectedComments.size})
              </Button>
            </>
          )}
        </div>
      </Card>

      {/* Comments List */}
      <div className="space-y-3">
        {filteredComments.map((comment) => (
          <Card
            key={comment.id}
            className={`p-5 bg-white dark:bg-[#1E1E1E] border-2 shadow-lg ${
              comment.status === 'reported' 
                ? 'border-red-300 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10' 
                : comment.status === 'pending'
                ? 'border-orange-300 dark:border-orange-800 bg-orange-50/50 dark:bg-orange-900/10'
                : 'border-transparent'
            }`}
          >
            <div className="flex gap-4">
              {/* Checkbox */}
              <div className="pt-1">
                <input
                  type="checkbox"
                  checked={selectedComments.has(comment.id)}
                  onChange={() => toggleSelection(comment.id)}
                  className="w-5 h-5 rounded border-2 cursor-pointer"
                />
              </div>

              {/* Author Avatar */}
              <div className="w-12 h-12 rounded-full bg-[#D32F2F] flex items-center justify-center text-white font-bold flex-shrink-0">
                {comment.author.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-[#212121] dark:text-white">{comment.author}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{comment.authorEmail}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {comment.status === 'reported' && (
                      <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full flex items-center gap-1">
                        <Flag size={12} />
                        {comment.reports} reports
                      </span>
                    )}
                    {comment.status === 'pending' && (
                      <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-full">
                        Pending Review
                      </span>
                    )}
                    {comment.status === 'approved' && (
                      <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-full">
                        Approved
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-3">{comment.content}</p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium">{comment.newsTitle}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(comment.timestamp).toLocaleString('en-IN')}</span>
                    <span className="mx-2">•</span>
                    <span>{comment.likes} likes</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {comment.status !== 'approved' && (
                      <Button
                        onClick={() => handleApprove(comment.id)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle size={16} className="mr-1" />
                        Approve
                      </Button>
                    )}
                    <Button
                      onClick={() => handleReject(comment.id)}
                      size="sm"
                      variant="outline"
                      className="border-red-600 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={16} className="mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filteredComments.length === 0 && (
          <Card className="p-12 text-center bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
            <MessageSquare size={64} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
            <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-2">No comments found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery ? 'Try a different search term' : 'No comments to moderate'}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
