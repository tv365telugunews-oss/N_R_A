import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Reporter {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  mobile: string;
  houseNumber: string;
  village: string;
  mandal: string;
  district: string;
  state: string;
  photo?: string;
  aadharCard?: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  approvedDate?: string;
}

interface ReporterUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'reporter';
}

interface ReporterAuthContextType {
  reporterUser: ReporterUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (reporter: Omit<Reporter, 'id' | 'status' | 'appliedDate'>) => Promise<boolean>;
  isAuthenticated: boolean;
}

const ReporterAuthContext = createContext<ReporterAuthContextType | undefined>(undefined);

export function ReporterAuthProvider({ children }: { children: ReactNode }) {
  const [reporterUser, setReporterUser] = useState<ReporterUser | null>(null);

  useEffect(() => {
    // Check if reporter is logged in
    const storedReporter = localStorage.getItem('newsrobo_reporter');
    if (storedReporter) {
      setReporterUser(JSON.parse(storedReporter));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Get approved reporters
    const reportersData = localStorage.getItem('newsrobo_reporters');
    if (!reportersData) return false;

    const reporters: Reporter[] = JSON.parse(reportersData);
    const reporter = reporters.find(
      r => r.email === email && r.password === password && r.status === 'approved'
    );

    if (reporter) {
      const user: ReporterUser = {
        id: reporter.id,
        email: reporter.email,
        firstName: reporter.firstName,
        lastName: reporter.lastName,
        role: 'reporter'
      };
      setReporterUser(user);
      localStorage.setItem('newsrobo_reporter', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setReporterUser(null);
    localStorage.removeItem('newsrobo_reporter');
  };

  const register = async (reporterData: Omit<Reporter, 'id' | 'status' | 'appliedDate'>): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const newReporter: Reporter = {
        ...reporterData,
        id: Date.now().toString(),
        status: 'pending',
        appliedDate: new Date().toISOString()
      };

      // Get existing reporters or create empty array
      const reportersData = localStorage.getItem('newsrobo_reporters');
      const reporters: Reporter[] = reportersData ? JSON.parse(reportersData) : [];

      // Check if email already exists
      if (reporters.some(r => r.email === reporterData.email)) {
        return false;
      }

      reporters.push(newReporter);
      localStorage.setItem('newsrobo_reporters', JSON.stringify(reporters));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  return (
    <ReporterAuthContext.Provider
      value={{
        reporterUser,
        login,
        logout,
        register,
        isAuthenticated: !!reporterUser
      }}
    >
      {children}
    </ReporterAuthContext.Provider>
  );
}

export function useReporterAuth() {
  const context = useContext(ReporterAuthContext);
  if (!context) {
    throw new Error('useReporterAuth must be used within ReporterAuthProvider');
  }
  return context;
}
