import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { CheckCircle, XCircle, FileText } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { useLanguage } from '@/app/contexts/LanguageContext';

export function TermsAndConditionsPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Check if user came from login page
  useEffect(() => {
    const tempPhone = localStorage.getItem('newsrobo_temp_phone');
    if (!tempPhone) {
      // No temp phone means user didn't come from login page
      // Redirect to login
      navigate('/login');
    }
  }, [navigate]);

  const handleAccept = () => {
    navigate('/onboarding');
  };

  const handleDecline = () => {
    // Clear temp phone and go back to login
    localStorage.removeItem('newsrobo_temp_phone');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] text-white py-6 px-4 shadow-lg sticky top-0 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-1">
            <span className="text-white bg-white/20 px-2 rounded">NEWS</span>
            {' '}
            <span className="text-[#2196F3] bg-white/20 px-2 rounded">ROBO</span>
          </h1>
          <p className="text-base text-white/90 font-medium">Legal Policy</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 md:p-8 bg-white border-2 border-gray-200 shadow-lg">
            <div className="prose prose-sm max-w-none text-black/90">
              <p className="text-sm text-gray-600 mb-6">
                <strong>Last updated:</strong> 02.02.2026
              </p>
              
              <p className="mb-6 leading-relaxed">
                Welcome to <strong className="text-[#D32F2F]">NEWS ROBO</strong>. By accessing or using this mobile application, you agree to the following Terms & Conditions, Privacy Policy, and Disclaimer. If you do not agree, please discontinue use of the app.
              </p>

              {/* Terms & Conditions */}
              <div className="bg-blue-50 border-l-4 border-[#2196F3] p-4 mb-6 rounded-r">
                <h2 className="text-xl font-bold text-[#2196F3] mb-4 flex items-center gap-2">
                  🟦 TERMS & CONDITIONS
                </h2>
              </div>

              <h3 className="text-lg font-bold text-black mb-2">1. Acceptance of Terms</h3>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>By using NEWS ROBO, you agree to comply with these terms.</li>
                <li>You must be at least 13 years old to use this app.</li>
                <li>Continued use indicates acceptance of updated terms.</li>
              </ul>

              <h3 className="text-lg font-bold text-black mb-2">2. About NEWS ROBO</h3>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>NEWS ROBO is a news aggregation platform.</li>
                <li>News content is collected from third-party sources.</li>
                <li>The app is provided for informational purposes only.</li>
              </ul>

              <h3 className="text-lg font-bold text-black mb-2">3. User Responsibilities</h3>
              <p className="mb-2">Users agree:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>To use the app lawfully and ethically</li>
                <li>Not to misuse, hack, or disrupt the app</li>
                <li>Not to spread false, harmful, or illegal content</li>
              </ul>

              <h3 className="text-lg font-bold text-black mb-2">4. Intellectual Property</h3>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>NEWS ROBO branding, logo, and app design are protected.</li>
                <li>Third-party news content belongs to respective publishers.</li>
              </ul>

              <h3 className="text-lg font-bold text-black mb-2">5. Third-Party Services</h3>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>The app may include third-party links or services.</li>
                <li>NEWS ROBO is not responsible for third-party content or policies.</li>
              </ul>

              <h3 className="text-lg font-bold text-black mb-2">6. Termination</h3>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>We reserve the right to suspend or terminate access if terms are violated.</li>
                <li>Users may stop using the app at any time.</li>
              </ul>

              <h3 className="text-lg font-bold text-black mb-2">7. Governing Law</h3>
              <p className="mb-2">These terms are governed by:</p>
              <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Laws of India, and</li>
                <li>Applicable international regulations where required.</li>
              </ul>

              {/* Privacy Policy */}
              <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-6 rounded-r">
                <h2 className="text-xl font-bold text-green-700 mb-2 flex items-center gap-2">
                  🔐 PRIVACY POLICY
                </h2>
                <p className="text-sm text-green-800">(India IT Act, GDPR, CCPA, Google Play Compliant)</p>
              </div>

              <h3 className="text-lg font-bold text-black mb-2">8. Applicable Laws</h3>
              <p className="mb-2">This Privacy Policy complies with:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Information Technology Act, 2000 (India)</li>
                <li>IT Rules, 2011</li>
                <li>GDPR (European Union)</li>
                <li>CCPA (California, USA)</li>
                <li>Google Play Developer Policies</li>
              </ul>

              <h3 className="text-lg font-bold text-black mb-2">9. Information We Collect</h3>
              <p className="mb-2 font-semibold">a) Personal Information</p>
              <ul className="list-disc pl-6 mb-3 space-y-1">
                <li>Name</li>
                <li>Mobile number</li>
                <li>Email address (for login/authentication)</li>
                <li>Location data (city, state, village)</li>
              </ul>
              <p className="mb-2 font-semibold">b) Non-Personal Information</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Device information (OS, device type)</li>
                <li>App usage data</li>
                <li>Anonymous analytics and crash reports</li>
              </ul>

              <h3 className="text-lg font-bold text-black mb-2">10. How We Use Information</h3>
              <p className="mb-2">We use data to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Authenticate users</li>
                <li>Improve app functionality</li>
                <li>Personalize user experience</li>
                <li>Maintain security and prevent misuse</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h3 className="text-lg font-bold text-black mb-2">11. News Content Source</h3>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>NEWS ROBO does not create most news content</li>
                <li>Content accuracy and opinions belong to original publishers</li>
              </ul>

              <h3 className="text-lg font-bold text-black mb-2">12. Data Sharing</h3>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>We do not sell or trade user data</li>
                <li>Limited data may be shared with:
                  <ul className="list-circle pl-6 mt-1 space-y-1">
                    <li>Firebase (Authentication, Analytics)</li>
                    <li>Legal authorities if required by law</li>
                  </ul>
                </li>
              </ul>

              <h3 className="text-lg font-bold text-black mb-2">13. Data Security</h3>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>We use reasonable security measures</li>
                <li>No system is completely secure</li>
              </ul>

              <h3 className="text-lg font-bold text-black mb-2">14. Data Retention</h3>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Data is stored only as long as necessary</li>
                <li>Users may request account deletion</li>
              </ul>

              <h3 className="text-lg font-bold text-black mb-2">15. User Rights (GDPR & CCPA)</h3>
              <p className="mb-2">Users have the right to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Access personal data</li>
                <li>Request correction or deletion</li>
                <li>Withdraw consent</li>
                <li>Opt out of analytics where applicable</li>
              </ul>

              <h3 className="text-lg font-bold text-black mb-2">16. Children's Privacy</h3>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>NEWS ROBO is not intended for children under 13</li>
                <li>We do not knowingly collect children's data</li>
              </ul>

              <h3 className="text-lg font-bold text-black mb-2">17. Third-Party Tools</h3>
              <p className="mb-2">The app may use:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Firebase Authentication</li>
                <li>Analytics tools</li>
                <li>Advertisement services (if enabled)</li>
              </ul>
              <p className="mb-4">Each has its own privacy policy.</p>

              <h3 className="text-lg font-bold text-black mb-2">18. Policy Updates</h3>
              <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Policies may be updated from time to time.</li>
                <li>Updates will be posted within the app or website.</li>
              </ul>

              {/* Disclaimer */}
              <div className="bg-red-50 border-l-4 border-[#D32F2F] p-4 mb-6 rounded-r">
                <h2 className="text-xl font-bold text-[#D32F2F] mb-2 flex items-center gap-2">
                  ⚠️ DISCLAIMER
                </h2>
              </div>

              <h3 className="text-lg font-bold text-black mb-2">19. General Information</h3>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>NEWS ROBO provides news for general information only.</li>
                <li>We do not guarantee accuracy or completeness.</li>
              </ul>

              <h3 className="text-lg font-bold text-black mb-2">20. No Professional Advice</h3>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Content is not legal, medical, financial, or professional advice</li>
                <li>Decisions made using app content are at user's own risk</li>
              </ul>

              <h3 className="text-lg font-bold text-black mb-2">21. Third-Party Content</h3>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>All third-party content belongs to respective owners</li>
                <li>NEWS ROBO claims no ownership</li>
              </ul>

              <h3 className="text-lg font-bold text-black mb-2">22. External Links</h3>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>The app may link to third-party websites</li>
                <li>We are not responsible for external content or practices</li>
              </ul>

              <h3 className="text-lg font-bold text-black mb-2">23. Limitation of Liability</h3>
              <p className="mb-2">NEWS ROBO is not liable for:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Any loss or damage</li>
                <li>Reliance on news content</li>
                <li>App downtime or technical issues</li>
              </ul>

              <h3 className="text-lg font-bold text-black mb-2">24. User Acceptance</h3>
              <p className="mb-2">By using NEWS ROBO, you acknowledge that:</p>
              <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>You have read and understood these policies</li>
                <li>You agree to all terms, privacy rules, and disclaimers</li>
              </ul>

              {/* Contact Information */}
              <div className="bg-gray-50 border-2 border-gray-300 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-black mb-3">📩 CONTACT INFORMATION</h3>
                <p className="mb-2">If you have any questions or concerns:</p>
                <div className="space-y-1">
                  <p>📧 <strong>Email:</strong> tv365telugunews@gmail.com</p>
                  <p>🌐 <strong>Website:</strong> http://newsrobo.in</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl p-4 z-20">
        <div className="max-w-4xl mx-auto flex gap-4">
          <Button
            onClick={handleDecline}
            variant="outline"
            className="flex-1 py-6 text-base font-semibold border-2 border-red-500 text-red-600 hover:bg-red-50 rounded-xl"
          >
            <XCircle className="w-5 h-5 mr-2" />
            {t('decline')}
          </Button>
          <Button
            onClick={handleAccept}
            className="flex-1 py-6 text-base font-semibold bg-green-600 hover:bg-green-700 text-white rounded-xl"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            {t('acceptContinue')}
          </Button>
        </div>
      </div>
    </div>
  );
}