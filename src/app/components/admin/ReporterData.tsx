import { useState, useEffect } from 'react';
import { Users, MapPin, ChevronDown, ChevronRight, Search } from 'lucide-react';
import { Reporter } from '@/app/contexts/ReporterAuthContext';

interface LocationGroup {
  [key: string]: Reporter[];
}

export function ReporterData() {
  const [reporters, setReporters] = useState<Reporter[]>([]);
  const [expandedStates, setExpandedStates] = useState<Set<string>>(new Set());
  const [expandedDistricts, setExpandedDistricts] = useState<Set<string>>(new Set());
  const [expandedMandals, setExpandedMandals] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadReporters();
  }, []);

  const loadReporters = () => {
    const data = localStorage.getItem('newsrobo_reporters');
    if (data) {
      const allReporters: Reporter[] = JSON.parse(data);
      // Only show approved reporters
      setReporters(allReporters.filter(r => r.status === 'approved'));
    }
  };

  const toggleState = (state: string) => {
    const newSet = new Set(expandedStates);
    if (newSet.has(state)) {
      newSet.delete(state);
    } else {
      newSet.add(state);
    }
    setExpandedStates(newSet);
  };

  const toggleDistrict = (key: string) => {
    const newSet = new Set(expandedDistricts);
    if (newSet.has(key)) {
      newSet.delete(key);
    } else {
      newSet.add(key);
    }
    setExpandedDistricts(newSet);
  };

  const toggleMandal = (key: string) => {
    const newSet = new Set(expandedMandals);
    if (newSet.has(key)) {
      newSet.delete(key);
    } else {
      newSet.add(key);
    }
    setExpandedMandals(newSet);
  };

  // Filter reporters by search query
  const filteredReporters = reporters.filter(r => 
    searchQuery === '' ||
    `${r.firstName} ${r.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.mandal.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group reporters by location hierarchy
  const groupedByState: LocationGroup = {};
  filteredReporters.forEach(reporter => {
    if (!groupedByState[reporter.state]) {
      groupedByState[reporter.state] = [];
    }
    groupedByState[reporter.state].push(reporter);
  });

  const groupByDistrict = (stateReporters: Reporter[]): LocationGroup => {
    const grouped: LocationGroup = {};
    stateReporters.forEach(reporter => {
      if (!grouped[reporter.district]) {
        grouped[reporter.district] = [];
      }
      grouped[reporter.district].push(reporter);
    });
    return grouped;
  };

  const groupByMandal = (districtReporters: Reporter[]): LocationGroup => {
    const grouped: LocationGroup = {};
    districtReporters.forEach(reporter => {
      if (!grouped[reporter.mandal]) {
        grouped[reporter.mandal] = [];
      }
      grouped[reporter.mandal].push(reporter);
    });
    return grouped;
  };

  const groupByVillage = (mandalReporters: Reporter[]): LocationGroup => {
    const grouped: LocationGroup = {};
    mandalReporters.forEach(reporter => {
      if (!grouped[reporter.village]) {
        grouped[reporter.village] = [];
      }
      grouped[reporter.village].push(reporter);
    });
    return grouped;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#212121]">Reporter Database</h2>
          <p className="text-gray-600 mt-1">
            {filteredReporters.length} approved reporter{filteredReporters.length !== 1 ? 's' : ''} organized by location
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search reporters, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#D32F2F] outline-none"
          />
        </div>
      </div>

      {filteredReporters.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow-sm text-center">
          <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold text-[#212121] mb-2">No Reporters Found</h3>
          <p className="text-gray-600">
            {searchQuery ? 'No reporters match your search criteria.' : 'No approved reporters yet.'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Hierarchy Tree */}
          <div className="divide-y divide-gray-200">
            {Object.keys(groupedByState).sort().map((state) => {
              const stateReporters = groupedByState[state];
              const districtGroups = groupByDistrict(stateReporters);
              const isStateExpanded = expandedStates.has(state);

              return (
                <div key={state}>
                  {/* State Level */}
                  <button
                    onClick={() => toggleState(state)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {isStateExpanded ? (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      )}
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-[#212121]">{state}</span>
                    </div>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {stateReporters.length} reporter{stateReporters.length !== 1 ? 's' : ''}
                    </span>
                  </button>

                  {/* District Level */}
                  {isStateExpanded && (
                    <div className="bg-gray-50">
                      {Object.keys(districtGroups).sort().map((district) => {
                        const districtReporters = districtGroups[district];
                        const mandalGroups = groupByMandal(districtReporters);
                        const districtKey = `${state}-${district}`;
                        const isDistrictExpanded = expandedDistricts.has(districtKey);

                        return (
                          <div key={districtKey} className="border-l-2 border-blue-200 ml-6">
                            <button
                              onClick={() => toggleDistrict(districtKey)}
                              className="w-full px-6 py-3 flex items-center justify-between hover:bg-gray-100 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                {isDistrictExpanded ? (
                                  <ChevronDown className="h-4 w-4 text-gray-400" />
                                ) : (
                                  <ChevronRight className="h-4 w-4 text-gray-400" />
                                )}
                                <MapPin className="h-4 w-4 text-green-600" />
                                <span className="font-medium text-gray-700">{district}</span>
                              </div>
                              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                {districtReporters.length}
                              </span>
                            </button>

                            {/* Mandal Level */}
                            {isDistrictExpanded && (
                              <div className="bg-white">
                                {Object.keys(mandalGroups).sort().map((mandal) => {
                                  const mandalReporters = mandalGroups[mandal];
                                  const villageGroups = groupByVillage(mandalReporters);
                                  const mandalKey = `${districtKey}-${mandal}`;
                                  const isMandalExpanded = expandedMandals.has(mandalKey);

                                  return (
                                    <div key={mandalKey} className="border-l-2 border-green-200 ml-6">
                                      <button
                                        onClick={() => toggleMandal(mandalKey)}
                                        className="w-full px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                      >
                                        <div className="flex items-center gap-3">
                                          {isMandalExpanded ? (
                                            <ChevronDown className="h-4 w-4 text-gray-400" />
                                          ) : (
                                            <ChevronRight className="h-4 w-4 text-gray-400" />
                                          )}
                                          <MapPin className="h-4 w-4 text-orange-600" />
                                          <span className="font-medium text-gray-600">{mandal}</span>
                                        </div>
                                        <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                          {mandalReporters.length}
                                        </span>
                                      </button>

                                      {/* Village and Reporters */}
                                      {isMandalExpanded && (
                                        <div className="bg-gray-50">
                                          {Object.keys(villageGroups).sort().map((village) => {
                                            const villageReporters = villageGroups[village];

                                            return (
                                              <div key={`${mandalKey}-${village}`} className="border-l-2 border-orange-200 ml-6">
                                                <div className="px-6 py-2 bg-orange-50">
                                                  <div className="flex items-center gap-2 text-sm">
                                                    <MapPin className="h-3 w-3 text-[#D32F2F]" />
                                                    <span className="font-medium text-gray-700">{village}</span>
                                                    <span className="text-gray-500">
                                                      ({villageReporters.length} reporter{villageReporters.length !== 1 ? 's' : ''})
                                                    </span>
                                                  </div>
                                                </div>

                                                {/* Reporter Cards */}
                                                <div className="px-6 py-3 space-y-2">
                                                  {villageReporters.map((reporter) => (
                                                    <div
                                                      key={reporter.id}
                                                      className="bg-white rounded-lg p-4 border border-gray-200 hover:border-[#D32F2F] transition-colors"
                                                    >
                                                      <div className="flex items-center gap-3">
                                                        {reporter.photo ? (
                                                          <img
                                                            src={reporter.photo}
                                                            alt={`${reporter.firstName} ${reporter.lastName}`}
                                                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                                                          />
                                                        ) : (
                                                          <div className="w-12 h-12 rounded-full bg-[#D32F2F] flex items-center justify-center text-white font-bold">
                                                            {reporter.firstName[0]}{reporter.lastName[0]}
                                                          </div>
                                                        )}
                                                        <div className="flex-1">
                                                          <p className="font-semibold text-[#212121]">
                                                            {reporter.firstName} {reporter.lastName}
                                                          </p>
                                                          <p className="text-sm text-gray-600">{reporter.email}</p>
                                                          <p className="text-sm text-gray-500">{reporter.mobile}</p>
                                                        </div>
                                                        <div className="text-right">
                                                          <p className="text-xs text-gray-500">House No.</p>
                                                          <p className="text-sm font-medium text-gray-700">{reporter.houseNumber}</p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  ))}
                                                </div>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
