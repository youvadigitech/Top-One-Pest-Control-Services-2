import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { EnquiryForm } from '../components/EnquiryForm';
import { openWhatsAppDirect, openPhoneCall } from '../utils/whatsapp';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  ShieldCheck, 
  Navigation,
  ExternalLink
} from 'lucide-react';

interface ContactViewProps {
  onNavigate: (view: string, param?: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-zinc-50 min-h-screen py-10 md:py-16">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-brand font-bold uppercase tracking-wider text-xs sm:text-sm">
            Contact & Service Booking
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mt-2">
            Get in Touch with Top One Pest Control Services
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 mt-3 leading-relaxed">
            Need an urgent inspection or a customized quotation for your home, residential society, or commercial establishment? Call our Badlapur headquarters or submit an inquiry to connect instantly on WhatsApp.
          </p>
        </div>

        {/* 2-Column Grid: Contact Information & Office Details vs. Clear Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left 5 Columns: Company Details & Direct Connect */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Details Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand/20 shadow-sm space-y-6">
              <div>
                <span className="text-[11px] font-bold text-brand-dark uppercase tracking-wider bg-brand/10 px-3 py-1 rounded-full border border-brand/20">
                  Central Operations & Dispatch Hub
                </span>
                <h2 className="text-xl font-bold text-zinc-900 mt-2.5">
                  Top One Pest Control Services
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-zinc-700">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-zinc-900 block font-bold">Registered Head Office:</strong>
                    <p className="text-zinc-600 leading-relaxed mt-0.5">
                      {COMPANY_INFO.address}
                    </p>
                  </div>
                </div>

                {/* Primary Helpline */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-zinc-900 block font-bold">Primary Contact Number:</strong>
                    <a
                      href={`tel:+91${COMPANY_INFO.primaryPhone}`}
                      className="text-brand hover:text-brand-dark font-extrabold text-base block mt-0.5 transition-colors"
                    >
                      {COMPANY_INFO.displayPrimaryPhone}
                    </a>
                  </div>
                </div>

                {/* Secondary Helpline */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-zinc-900 block font-bold">Secondary Contact Number:</strong>
                    <a
                      href={`tel:+91${COMPANY_INFO.secondaryPhone}`}
                      className="text-zinc-800 hover:text-brand font-bold text-sm block mt-0.5 transition-colors"
                    >
                      {COMPANY_INFO.displaySecondaryPhone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-zinc-900 block font-bold">Official Sales Email:</strong>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-zinc-700 hover:text-brand font-medium block mt-0.5 transition-colors"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-zinc-900 block font-bold">Inspection Hours:</strong>
                    <p className="text-zinc-600 leading-relaxed mt-0.5">
                      {COMPANY_INFO.workingHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Direct Button */}
              <div className="pt-2 border-t border-zinc-100">
                <button
                  onClick={() => openWhatsAppDirect()}
                  className="w-full py-3.5 px-4 rounded-full bg-[#25D366] hover:brightness-110 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-black/10 active:scale-95 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-white" />
                  <span>Chat with Senior Technician on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right 7 Columns: Clear Contact Form redirecting directly to WhatsApp */}
          <div className="lg:col-span-7">
            <EnquiryForm
              title="Send Us Your Requirement"
              subtitle="All leads directed instantly to WhatsApp for prompt quotation & inspection"
              className="shadow-md border-brand/20"
            />
          </div>
        </div>

        {/* Fullwidth Google Map Card (Badlapur HQ) */}
        <div className="mt-8 lg:mt-12 bg-white rounded-3xl p-5 sm:p-7 border border-brand/20 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-brand-dark">
              <div className="w-8 h-8 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
                <Navigation className="w-4 h-4 text-brand" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900">
                  Badlapur Head Office & Service Center Map
                </h3>
                <p className="text-xs text-zinc-500">
                  Serving Badlapur, Ambernath, Ulhasnagar, Kalyan, Dombivli, Thane & Mumbai MMR
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={COMPANY_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-brand hover:bg-brand-dark px-4 py-2 rounded-full shadow-xs transition-all shrink-0"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="w-full h-80 sm:h-96 lg:h-[420px] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 relative shadow-inner">
            <iframe
              title="Top One Pest Control Services Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d482281.47339017526!2d72.72053932614152!3d19.202887570654873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ed00354e1c1f%3A0x8e931fd2c16c1762!2sTop%20One%20Pest%20Control%20Services!5e0!3m2!1sen!2sin!4v1789033785340!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          <div className="text-xs text-zinc-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-1 border-t border-zinc-100">
            <span className="font-medium text-zinc-700">
              Address: Shop No. 08, Ground Floor, Ballaleshwar Apts, Surya Nagar, Katrap, Badlapur East, Maharashtra 421503
            </span>
            <span className="text-[11px] text-zinc-500">
              Working Hours: {COMPANY_INFO.workingHours}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
