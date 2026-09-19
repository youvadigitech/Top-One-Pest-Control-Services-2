import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { SERVICES_DATA } from '../data/servicesData';
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck, ArrowRight, Shield, Clock } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenEnquiryModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEnquiryModal }) => {
  const handleNav = (view: string, param?: string) => {
    onNavigate(view, param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-zinc-950 text-white pt-10 pb-20 sm:pb-8 border-t border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-zinc-800/80">
          {/* Column 1: Brand & Certifications */}
          <div className="space-y-3">
            <div className="rounded-xl bg-white px-3 py-1.5 inline-block shadow-sm">
              <img
                src={COMPANY_INFO.logoUrl}
                alt="Top One Pest Control Services logo"
                className="h-9 w-auto object-contain"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-white tracking-wide uppercase">
                {COMPANY_INFO.name}
              </p>
              <p className="text-[11px] text-brand-light font-medium">
                {COMPANY_INFO.tagline}
              </p>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
              Govt. licensed & certified pest eradication across Mumbai, Thane, Navi Mumbai & Badlapur.
            </p>
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <span className="inline-flex items-center gap-1 rounded-md bg-brand/10 border border-brand/20 px-2 py-0.5 text-[10px] text-brand-light font-medium">
                <ShieldCheck className="w-3 h-3 text-brand" />
                <span>CIB Approved</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-brand/10 border border-brand/20 px-2 py-0.5 text-[10px] text-brand-light font-medium">
                <Shield className="w-3 h-3 text-brand" />
                <span>5-Yr Protection</span>
              </span>
            </div>
          </div>

          {/* Column 2: Our Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Pest Services
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-400">
              {SERVICES_DATA.slice(0, 6).map(service => (
                <li key={service.id}>
                  <button
                    onClick={() => handleNav('service-detail', service.slug)}
                    className="hover:text-brand-light transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <ArrowRight className="h-2.5 w-2.5 text-brand shrink-0" />
                    <span>{service.name}</span>
                  </button>
                </li>
              ))}
              <li className="pt-0.5">
                <button
                  onClick={() => handleNav('services')}
                  className="text-xs font-semibold text-brand-light hover:underline flex items-center gap-1"
                >
                  <span>View All 7 Services →</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-brand-light transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-brand-light transition-colors cursor-pointer text-left"
                >
                  About Top One
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('locations')}
                  className="hover:text-brand-light transition-colors cursor-pointer text-left"
                >
                  Service Areas (MMR)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('calculator')}
                  className="hover:text-brand-light transition-colors cursor-pointer text-left"
                >
                  Price Estimator
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('blog')}
                  className="hover:text-brand-light transition-colors cursor-pointer text-left"
                >
                  Pest Guides & Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-brand-light transition-colors cursor-pointer text-left"
                >
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact, Hours & Mini Map */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Contact & Office
            </h4>
            <div className="space-y-1.5 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.telPrimary}`}
                  className="text-white hover:text-brand-light font-bold transition text-xs"
                >
                  {COMPANY_INFO.telDisplay}
                </a>
                <span className="text-zinc-600">|</span>
                <a
                  href={`tel:${COMPANY_INFO.telSecondary}`}
                  className="text-zinc-400 hover:text-brand-light transition text-[11px]"
                >
                  74004 83787
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-brand-light transition text-xs truncate"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-brand shrink-0" />
                <span className="text-zinc-300 text-[11px]">{COMPANY_INFO.workingHours}</span>
              </div>
            </div>

            {/* Compact Embed Google Map */}
            <div className="rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 shadow-sm">
              <div className="h-24 w-full relative">
                <iframe
                  src={COMPANY_INFO.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Top One Pest Control Location"
                />
              </div>
              <div className="px-2.5 py-1 bg-zinc-900 border-t border-zinc-800/80 flex items-center justify-between text-[10px]">
                <span className="text-zinc-400 flex items-center gap-1 truncate">
                  <MapPin className="w-2.5 h-2.5 text-brand" />
                  Katrap, Badlapur
                </span>
                <a
                  href={COMPANY_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-light hover:underline font-semibold flex items-center gap-0.5 shrink-0"
                >
                  <span>Open Map</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>

            {/* Inspection CTA Button */}
            {onOpenEnquiryModal && (
              <button
                onClick={onOpenEnquiryModal}
                className="w-full py-2 px-3 rounded-lg bg-brand text-white font-bold text-xs hover:bg-brand-dark transition-all shadow-sm active:scale-95 cursor-pointer text-center"
              >
                Book Free Site Inspection
              </button>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 text-center sm:text-left">
            <p>© 2026 {COMPANY_INFO.name}. All rights reserved.</p>
            <span className="hidden sm:inline text-zinc-700">•</span>
            <p className="text-[11px] text-zinc-400">
              Developed by{' '}
              <a
                href="https://youvadigitech.com"
                target="_blank"
                rel="noreferrer"
                className="text-brand-light hover:text-white font-medium hover:underline transition-colors"
              >
                Youva DigiTech
              </a>
            </p>
          </div>
          <div className="flex items-center gap-3 text-zinc-400 text-xs">
            <button
              onClick={() => handleNav('privacy')}
              className="hover:text-brand-light transition cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => handleNav('terms')}
              className="hover:text-brand-light transition cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
