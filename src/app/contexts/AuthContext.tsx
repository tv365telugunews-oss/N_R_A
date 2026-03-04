import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('newsrobo_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - check against stored users
    const usersJson = localStorage.getItem('newsrobo_users');
    const users = usersJson ? JSON.parse(usersJson) : [];
    
    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('newsrobo_user', JSON.stringify(userWithoutPassword));
      return true;
    }

    return false;
  };

  const signup = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ): Promise<boolean> => {
    // Get existing users
    const usersJson = localStorage.getItem('newsrobo_users');
    const users = usersJson ? JSON.parse(usersJson) : [];

    // Remove existing user with same email (for testing purposes)
    const existingIndex = users.findIndex((u: any) => u.email === email);
    if (existingIndex !== -1) {
      users.splice(existingIndex, 1);
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      password, // In real app, this would be hashed
    };

    // Save to users list
    users.push(newUser);
    localStorage.setItem('newsrobo_users', JSON.stringify(users));

    // Log the user in
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    localStorage.setItem('newsrobo_user', JSON.stringify(userWithoutPassword));

    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // Clear all user-related localStorage items
    localStorage.removeItem('newsrobo_user');
    localStorage.removeItem('newsrobo_onboarding_complete');
    localStorage.removeItem('newsrobo_location');
    localStorage.removeItem('newsrobo_language');
    localStorage.removeItem('newsrobo_temp_phone');
    // Note: We keep newsrobo_users so they can log back in
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated, isLoading }}>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen bg-[#F5F5F5] dark:bg-[#121212]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#D32F2F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#212121] dark:text-white font-bold text-lg">Loading NEWS ROBO...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
