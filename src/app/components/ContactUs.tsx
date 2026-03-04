import { Phone, Mail, MapPin, Send, Clock, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { NewsRoboLogo } from '@/app/components/NewsRoboLogo';

interface ContactUsProps {
  onBack: () => void;
}

export function ContactUs({ onBack }: ContactUsProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] text-white px-6 py-6 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-3">
            <NewsRoboLogo className="h-10 w-10" />
            <div>
              <h1 className="text-2xl font-bold">Contact Us</h1>
              <p className="text-white/80 text-sm">We're here to help!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Contact Information Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {/* Phone */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-[#D32F2F] to-[#B71C1C] rounded-full flex items-center justify-center mb-4">
              <Phone className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold text-[#212121] mb-2">Phone</h3>
            <a 
              href="tel:+919849004466"
              className="text-[#D32F2F] font-semibold hover:underline block"
            >
              +91 98490 04466
            </a>
            <p className="text-gray-500 text-sm mt-1">Mon - Sat, 9AM - 6PM</p>
          </div>

          {/* Email 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold text-[#212121] mb-2">Email (Primary)</h3>
            <a 
              href="mailto:tv365telugunews@gmail.com"
              className="text-[#D32F2F] font-semibold hover:underline block break-all text-sm"
            >
              tv365telugunews@gmail.com
            </a>
            <p className="text-gray-500 text-sm mt-1">For news & queries</p>
          </div>

          {/* Email 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold text-[#212121] mb-2">Email (GST)</h3>
            <a 
              href="mailto:gsttodaytv99@gmail.com"
              className="text-[#D32F2F] font-semibold hover:underline block break-all text-sm"
            >
              gsttodaytv99@gmail.com
            </a>
            <p className="text-gray-500 text-sm mt-1">For business inquiries</p>
          </div>
        </div>

        {/* Office Hours */}
        <div className="bg-gradient-to-r from-[#FFC107] to-[#FFD54F] rounded-2xl p-6 mb-8 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-[#212121]" />
            </div>
            <div>
              <h3 className="font-bold text-[#212121] text-lg">Office Hours</h3>
              <p className="text-[#212121]/80">Monday - Saturday: 9:00 AM - 6:00 PM</p>
              <p className="text-[#212121]/80">Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl p-8 shadow-md">
          <h2 className="text-2xl font-bold text-[#212121] mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#D32F2F] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#D32F2F] outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What is this regarding?"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#D32F2F] outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Type your message here..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#D32F2F] outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Send className="h-5 w-5" />
              Send Message
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-md">
          <h3 className="font-bold text-[#212121] text-lg mb-4">Quick Contact</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="tel:+919849004466"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Call Now</p>
                <p className="font-bold text-[#212121]">+91 98490 04466</p>
              </div>
            </a>

            <a
              href="mailto:tv365telugunews@gmail.com"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Email Us</p>
                <p className="font-bold text-[#212121] text-sm">tv365telugunews@gmail.com</p>
              </div>
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            📱 For urgent matters, please call us directly at <a href="tel:+919849004466" className="text-[#D32F2F] font-semibold">+91 98490 04466</a>
          </p>
        </div>
      </div>
    </div>
  );
}
