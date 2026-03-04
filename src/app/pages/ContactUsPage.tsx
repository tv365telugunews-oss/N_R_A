import { ContactUs } from '@/app/components/ContactUs';
import { useNavigate } from 'react-router';

export default function ContactUsPage() {
  const navigate = useNavigate();

  return <ContactUs onBack={() => navigate(-1)} />;
}