import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Onboarding } from '@/app/components/Onboarding';
import { useAuth } from '@/app/contexts/AuthContext';

export function OnboardingPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  // Check if already completed onboarding or if there's no temp phone
  useEffect(() => {
    const tempPhone = localStorage.getItem('newsrobo_temp_phone');
    const onboardingComplete = localStorage.getItem('newsrobo_onboarding_complete');
    
    if (!tempPhone) {
      // No temp phone means user didn't come from login page
      navigate('/login');
    } else if (onboardingComplete === 'true') {
      // Already completed onboarding
      navigate('/home');
    }
  }, [navigate]);

  const handleOnboardingComplete = async (location: string, language: string) => {
    // Get the phone number from temporary storage
    const phone = localStorage.getItem('newsrobo_temp_phone') || '';

    // Create user account with phone number using signup
    const name = `User ${phone.slice(-4)}`; // Default name based on last 4 digits
    const email = `${phone}@newsrobo.app`; // Create email from phone
    const password = phone; // Use phone as password for simplicity

    try {
      // Sign up the user (this will set authentication)
      await signup(name, email, phone, password);

      // Mark onboarding as complete
      localStorage.setItem('newsrobo_onboarding_complete', 'true');
      localStorage.setItem('newsrobo_location', location);
      localStorage.setItem('newsrobo_language', language);

      // Clear temporary phone
      localStorage.removeItem('newsrobo_temp_phone');

      // Navigate to home (auth context will be updated automatically)
      navigate('/home');
    } catch (error) {
      console.error('Error during onboarding:', error);
      navigate('/login');
    }
  };

  return <Onboarding onComplete={handleOnboardingComplete} />;
}