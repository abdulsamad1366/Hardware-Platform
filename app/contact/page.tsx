import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-bg font-sans flex flex-col justify-between">
      {/* Header */}
      <header className="bg-primary text-white py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:text-accent transition-colors flex items-center space-x-1 text-sm">
              <ArrowLeft size={16} />
              <span>Back Home</span>
            </Link>
          </div>
          <span className="text-lg font-bold tracking-wider uppercase text-white">
            Hardware<span className="text-accent">Platform</span>
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full py-16 px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-primary mb-2">Contact Us</h1>
          <p className="text-slate-600 text-sm">Get in touch with our commercial sales teams, factory coordinators, and bulk ordering consultants.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Office Address */}
          <div className="bg-white p-8 rounded-lg shadow-soft border border-slate-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center text-accent mb-6">
              <MapPin size={24} />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">Corporate Office</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Industrial Area Phase II, New Delhi, India
            </p>
          </div>

          {/* Direct Sales */}
          <div className="bg-white p-8 rounded-lg shadow-soft border border-slate-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center text-accent mb-6">
              <Phone size={24} />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">Sales Helpline</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-1">
              +91 98765 43210
            </p>
            <p className="text-xs text-slate-400">Monday - Saturday, 9 AM - 6 PM</p>
          </div>

          {/* Email Support */}
          <div className="bg-white p-8 rounded-lg shadow-soft border border-slate-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center text-accent mb-6">
              <Mail size={24} />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">Email Inquiries</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-1">
              sales@hardwareplatform.in
            </p>
            <p className="text-xs text-slate-400">Response within 24 business hours</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-slate-400 py-8 px-6 text-center text-xs border-t border-slate-800">
        <p className="text-slate-500">Hardware Platform &copy; {new Date().getFullYear()} - Premium B2B Product Discovery</p>
      </footer>
    </div>
  );
}
