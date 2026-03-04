import { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Search, ExternalLink, FileText } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';

interface FactCheckItem {
  id: string;
  newsId: string;
  newsTitle: string;
  claim: string;
  status: 'pending' | 'verified' | 'false' | 'misleading';
  sources: string[];
  checkedBy?: string;
  checkedAt?: string;
  verdict: string;
  rating: number;
}

const mockFactChecks: FactCheckItem[] = [
  {
    id: '1',
    newsId: 'news1',
    newsTitle: 'Breaking: Major Economic Reform Announced',
    claim: 'Government announces 15% tax cut for middle class',
    status: 'verified',
    sources: [
      'https://pib.gov.in/official-statement',
      'https://financeminister.gov.in/press-release'
    ],
    checkedBy: 'Admin Team',
    checkedAt: '2026-02-01T10:30:00',
    verdict: 'This claim is accurate. The Finance Minister officially announced a 15% tax reduction for individuals earning between ₹5-10 lakhs annually.',
    rating: 5
  },
  {
    id: '2',
    newsId: 'news2',
    newsTitle: 'Health Alert: New Virus Outbreak',
    claim: 'New virus has 90% mortality rate',
    status: 'false',
    sources: [
      'https://who.int/statement',
      'https://mohfw.gov.in/official-data'
    ],
    checkedBy: 'Admin Team',
    checkedAt: '2026-02-01T09:15:00',
    verdict: 'This claim is FALSE. WHO data shows the actual mortality rate is less than 2%. This appears to be misinformation.',
    rating: 1
  },
  {
    id: '3',
    newsId: 'news3',
    newsTitle: 'Sports: Cricket Team Wins Championship',
    claim: 'India wins World Cup after 15 years',
    status: 'misleading',
    sources: [
      'https://icc-cricket.com/results',
      'https://bcci.tv/matches'
    ],
    checkedBy: 'Admin Team',
    checkedAt: '2026-02-01T08:00:00',
    verdict: 'MISLEADING: India won the T20 World Cup, not the ODI World Cup. The last ODI World Cup win was 13 years ago, not 15.',
    rating: 3
  },
  {
    id: '4',
    newsId: 'news4',
    newsTitle: 'Technology: AI Breakthrough Announced',
    claim: 'Indian researchers develop sentient AI',
    status: 'pending',
    sources: [],
    verdict: '',
    rating: 0
  },
  {
    id: '5',
    newsId: 'news5',
    newsTitle: 'Political Update: Election Results',
    claim: 'Voter turnout reaches historic 85%',
    status: 'pending',
    sources: [],
    verdict: '',
    rating: 0
  }
];

export function FactCheck() {
  const [factChecks, setFactChecks] = useState<FactCheckItem[]>(mockFactChecks);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'verified' | 'false' | 'misleading'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredFactChecks = factChecks.filter(fc => {
    const matchesSearch = 
      fc.newsTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fc.claim.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || fc.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleVerify = (id: string, status: 'verified' | 'false' | 'misleading', verdict: string, sources: string[], rating: number) => {
    setFactChecks(factChecks.map(fc => 
      fc.id === id 
        ? { 
            ...fc, 
            status, 
            verdict, 
            sources,
            rating,
            checkedBy: 'Admin Team', 
            checkedAt: new Date().toISOString() 
          } 
        : fc
    ));
    setSelectedId(null);
  };

  const stats = {
    total: factChecks.length,
    verified: factChecks.filter(fc => fc.status === 'verified').length,
    false: factChecks.filter(fc => fc.status === 'false').length,
    misleading: factChecks.filter(fc => fc.status === 'misleading').length,
    pending: factChecks.filter(fc => fc.status === 'pending').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#212121] dark:text-white">Fact Check</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Verify news authenticity and combat misinformation
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4">
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <FileText size={24} className="text-blue-600" />
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
              <p className="text-gray-600 dark:text-gray-400 text-sm">Verified</p>
              <p className="text-2xl font-bold text-[#212121] dark:text-white">{stats.verified}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <XCircle size={24} className="text-red-600" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">False</p>
              <p className="text-2xl font-bold text-[#212121] dark:text-white">{stats.false}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <AlertTriangle size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Misleading</p>
              <p className="text-2xl font-bold text-[#212121] dark:text-white">{stats.misleading}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <AlertTriangle size={24} className="text-orange-600" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Pending</p>
              <p className="text-2xl font-bold text-[#212121] dark:text-white">{stats.pending}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search & Filter */}
      <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fact checks..."
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
              variant={filterStatus === 'verified' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('verified')}
              className={filterStatus === 'verified' ? 'bg-[#D32F2F] text-white' : ''}
            >
              Verified
            </Button>
            <Button
              variant={filterStatus === 'false' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('false')}
              className={filterStatus === 'false' ? 'bg-[#D32F2F] text-white' : ''}
            >
              False
            </Button>
            <Button
              variant={filterStatus === 'misleading' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('misleading')}
              className={filterStatus === 'misleading' ? 'bg-[#D32F2F] text-white' : ''}
            >
              Misleading
            </Button>
          </div>
        </div>
      </Card>

      {/* Fact Checks List */}
      <div className="space-y-4">
        {filteredFactChecks.map((fc) => (
          <Card
            key={fc.id}
            className={`p-6 bg-white dark:bg-[#1E1E1E] border-2 shadow-lg ${
              fc.status === 'verified' 
                ? 'border-green-300 dark:border-green-800 bg-green-50/30 dark:bg-green-900/10'
                : fc.status === 'false'
                ? 'border-red-300 dark:border-red-800 bg-red-50/30 dark:bg-red-900/10'
                : fc.status === 'misleading'
                ? 'border-yellow-300 dark:border-yellow-800 bg-yellow-50/30 dark:bg-yellow-900/10'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-lg text-[#212121] dark:text-white">{fc.newsTitle}</h3>
                  {fc.status === 'verified' && (
                    <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-full flex items-center gap-1">
                      <CheckCircle size={14} />
                      VERIFIED
                    </span>
                  )}
                  {fc.status === 'false' && (
                    <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full flex items-center gap-1">
                      <XCircle size={14} />
                      FALSE
                    </span>
                  )}
                  {fc.status === 'misleading' && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-600 text-xs font-bold rounded-full flex items-center gap-1">
                      <AlertTriangle size={14} />
                      MISLEADING
                    </span>
                  )}
                  {fc.status === 'pending' && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-full">
                      PENDING REVIEW
                    </span>
                  )}
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-3">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Claim:</p>
                  <p className="text-gray-800 dark:text-white font-medium">{fc.claim}</p>
                </div>
              </div>
            </div>

            {fc.status !== 'pending' && (
              <>
                {/* Verdict */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Verdict:</p>
                  <p className="text-gray-700 dark:text-gray-300">{fc.verdict}</p>
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Truth Rating:</p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className={`w-8 h-8 rounded ${
                          star <= fc.rating 
                            ? 'bg-[#FFC107]' 
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      {fc.rating}/5 ({fc.rating >= 4 ? 'Highly Accurate' : fc.rating >= 3 ? 'Partially Accurate' : 'Inaccurate'})
                    </span>
                  </div>
                </div>

                {/* Sources */}
                {fc.sources.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Sources:</p>
                    <div className="space-y-2">
                      {fc.sources.map((source, index) => (
                        <a
                          key={index}
                          href={source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[#D32F2F] hover:text-[#B71C1C] text-sm"
                        >
                          <ExternalLink size={14} />
                          {source}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Metadata */}
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Verified by {fc.checkedBy} on {fc.checkedAt && new Date(fc.checkedAt).toLocaleString('en-IN')}
                </div>
              </>
            )}

            {fc.status === 'pending' && (
              <div className="mt-4 pt-4 border-t dark:border-gray-700">
                <Button
                  onClick={() => setSelectedId(selectedId === fc.id ? null : fc.id)}
                  className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white"
                >
                  {selectedId === fc.id ? 'Cancel' : 'Start Fact Check'}
                </Button>

                {selectedId === fc.id && (
                  <div className="mt-4 space-y-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Verdict
                      </label>
                      <textarea
                        id={`verdict-${fc.id}`}
                        placeholder="Enter your fact-check verdict..."
                        rows={3}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#D32F2F] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Sources (one per line)
                      </label>
                      <textarea
                        id={`sources-${fc.id}`}
                        placeholder="https://source1.com&#10;https://source2.com"
                        rows={2}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#D32F2F] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Truth Rating (1-5)
                      </label>
                      <input
                        type="number"
                        id={`rating-${fc.id}`}
                        min="1"
                        max="5"
                        defaultValue="3"
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#D32F2F] outline-none"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          const verdict = (document.getElementById(`verdict-${fc.id}`) as HTMLTextAreaElement).value;
                          const sources = (document.getElementById(`sources-${fc.id}`) as HTMLTextAreaElement).value.split('\n').filter(s => s.trim());
                          const rating = parseInt((document.getElementById(`rating-${fc.id}`) as HTMLInputElement).value);
                          handleVerify(fc.id, 'verified', verdict, sources, rating);
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle size={16} className="mr-2" />
                        Mark as Verified
                      </Button>
                      <Button
                        onClick={() => {
                          const verdict = (document.getElementById(`verdict-${fc.id}`) as HTMLTextAreaElement).value;
                          const sources = (document.getElementById(`sources-${fc.id}`) as HTMLTextAreaElement).value.split('\n').filter(s => s.trim());
                          const rating = parseInt((document.getElementById(`rating-${fc.id}`) as HTMLInputElement).value);
                          handleVerify(fc.id, 'misleading', verdict, sources, rating);
                        }}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white"
                      >
                        <AlertTriangle size={16} className="mr-2" />
                        Mark as Misleading
                      </Button>
                      <Button
                        onClick={() => {
                          const verdict = (document.getElementById(`verdict-${fc.id}`) as HTMLTextAreaElement).value;
                          const sources = (document.getElementById(`sources-${fc.id}`) as HTMLTextAreaElement).value.split('\n').filter(s => s.trim());
                          const rating = parseInt((document.getElementById(`rating-${fc.id}`) as HTMLInputElement).value);
                          handleVerify(fc.id, 'false', verdict, sources, rating);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        <XCircle size={16} className="mr-2" />
                        Mark as False
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
