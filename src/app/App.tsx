import { HashRouter as Router, Routes, Route, Navigate } from 'react-router';
import { lazy, Suspense } from 'react';
import { AuthProvider, useAuth } from '@/app/contexts/AuthContext';
import { AdminAuthProvider } from '@/app/contexts/AdminAuthContext';
import { ReporterAuthProvider } from '@/app/contexts/ReporterAuthContext';
import { EBookProvider } from '@/app/contexts/EBookContext';
import { LanguageProvider } from '@/app/contexts/LanguageContext';
import { useBackButtonExit } from '@/app/hooks/useBackButtonExit';
import { WelcomePage } from '@/app/pages/WelcomePage';
import { TermsAndConditionsPage } from '@/app/pages/TermsAndConditionsPage';
import { LoginPage } from '@/app/pages/LoginPage';
import { OnboardingPage } from '@/app/pages/OnboardingPage';
import { AppWithRouting } from '@/app/AppWithRouting';
import ProfilePage from '@/app/pages/ProfilePage';
import BookmarksPage from '@/app/pages/BookmarksPage';
import ContactUsPage from '@/app/pages/ContactUsPage';
import EBookPage from '@/app/pages/EBookPage';
import PreferencesPage from '@/app/pages/PreferencesPage';
import VideosPage from '@/app/pages/VideosPage';
import ViralPage from '@/app/pages/ViralPage';
import ExclusivePage from '@/app/pages/ExclusivePage';
import { Toaster } from 'sonner';

const AdminDashboard = lazy(() => import('@/app/pages/AdminDashboard'));

// Routes Component - must be inside AuthProvider
function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Default route - Welcome Page (Landing) */}
      <Route path="/" element={<WelcomePage />} />
      
      {/* Terms & Conditions Page */}
      <Route path="/terms" element={<TermsAndConditionsPage />} />

      {/* Onboarding Page (Area & Language Selection) */}
      <Route path="/onboarding" element={<OnboardingPage />} />

      {/* Public Routes */}
      <Route
        path="/welcome"
        element={
          isAuthenticated ? <Navigate to="/home" replace /> : <WelcomePage />
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/home" replace /> : <LoginPage />
        }
      />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          isAuthenticated ? <AppWithRouting /> : <Navigate to="/welcome" replace />
        }
      />

      <Route
        path="/admin"
        element={
          isAuthenticated ? (
            <Suspense fallback={<div className="p-6">Loading admin dashboard...</div>}>
              <AdminDashboard />
            </Suspense>
          ) : (
            <Navigate to="/welcome" replace />
          )
        }
      />

      <Route
        path="/profile"
        element={
          isAuthenticated ? <ProfilePage /> : <Navigate to="/welcome" replace />
        }
      />

      <Route
        path="/bookmarks"
        element={
          isAuthenticated ? <BookmarksPage /> : <Navigate to="/welcome" replace />
        }
      />

      <Route
        path="/contact"
        element={
          isAuthenticated ? <ContactUsPage /> : <Navigate to="/welcome" replace />
        }
      />

      <Route
        path="/ebook"
        element={
          isAuthenticated ? <EBookPage /> : <Navigate to="/welcome" replace />
        }
      />

      <Route
        path="/preferences"
        element={
          isAuthenticated ? <PreferencesPage /> : <Navigate to="/welcome" replace />
        }
      />

      <Route
        path="/videos"
        element={
          isAuthenticated ? <VideosPage /> : <Navigate to="/welcome" replace />
        }
      />

      <Route
        path="/viral"
        element={
          isAuthenticated ? <ViralPage /> : <Navigate to="/welcome" replace />
        }
      />

      <Route
        path="/exclusive"
        element={
          isAuthenticated ? <ExclusivePage /> : <Navigate to="/welcome" replace />
        }
      />

      {/* Catch all - redirect to welcome */}
      <Route path="*" element={<Navigate to="/welcome" replace />} />
    </Routes>
  );
}

export default function App() {
  // Enable double back press to exit app
  useBackButtonExit();

  return (
    <Router>
      <AuthProvider>
        <AdminAuthProvider>
          <ReporterAuthProvider>
            <EBookProvider>
              <LanguageProvider>
                <Toaster position="top-center" richColors />
                <AppRoutes />
              </LanguageProvider>
            </EBookProvider>
          </ReporterAuthProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </Router>
  );
}