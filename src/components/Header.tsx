import React, { useState, useEffect, useRef } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { SERVICES_DATA } from '../data/servicesData';
import { 
  Phone, 
  MessageCircle, 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight,
  Sparkles,
  Shield,
  Moon,
  Wind,
  ZapOff,
  ShieldAlert,
  Hammer
} from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenEnquiryModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenEnquiryModal
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (view: string, param?: string) => {
    onNavigate(view, param);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'cockroach-control':
        return <Sparkles className="h-4 w-4 text-brand shrink-0" />;
      case 'bird-control':
        return <Shield className="h-4 w-4 text-brand shrink-0" />;
      case 'bed-bug-control':
        return <Moon className="h-4 w-4 text-brand shrink-0" />;
      case 'mosquito-management':
        return <Wind className="h-4 w-4 text-brand shrink-0" />;
      case 'rodents-control':
        return <ZapOff className="h-4 w-4 text-brand shrink-0" />;
      case 'termites-management':
        return <ShieldAlert className="h-4 w-4 text-brand shrink-0" />;
      case 'wood-borer-control':
        return <Hammer className="h-4 w-4 text-brand shrink-0" />;
      default:
        return <Shield className="h-4 w-4 text-brand shrink-0" />;
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2 border-b border-brand/20'
          : 'bg-white/90 backdrop-blur-md py-3 border-b border-brand/10'
      }`}
    >
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center shrink-0 cursor-pointer focus:outline-none"
          title="Top One Pest Control Services - Home"
        >
          <img
            src={COMPANY_INFO.logoUrl}
            alt="Top One Pest Control Services logo"
            className="h-11 sm:h-14 w-auto object-contain transition-transform hover:scale-105"
          />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
          {/* Home */}
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
              currentView === 'home'
                ? 'text-white bg-brand shadow-sm shadow-brand/30'
                : 'text-zinc-800 hover:text-brand-dark hover:bg-brand/10'
            }`}
          >
            Home
          </button>

          {/* About Us */}
          <button
            onClick={() => handleNavClick('about')}
            className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
              currentView === 'about'
                ? 'text-white bg-brand shadow-sm shadow-brand/30'
                : 'text-zinc-800 hover:text-brand-dark hover:bg-brand/10'
            }`}
          >
            About Us
          </button>

          {/* Services Dropdown with all 7 services */}
          <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button
              onClick={() => setServicesDropdownOpen(prev => !prev)}
              className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'services' || currentView === 'service-detail'
                  ? 'text-white bg-brand shadow-sm shadow-brand/30'
                  : 'text-zinc-800 hover:text-brand-dark hover:bg-brand/10'
              }`}
              aria-expanded={servicesDropdownOpen}
              aria-haspopup="true"
            >
              <span>Services</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  servicesDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Desktop Dropdown Panel */}
            {servicesDropdownOpen && (
              <div 
                className="absolute left-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border-2 border-brand/30 p-3 animate-fade-up z-50 backdrop-blur-lg"
                role="menu"
              >
                {/* Header in dropdown */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-brand/15 mb-2">
                  <span className="text-xs font-bold text-brand-dark uppercase tracking-wider">
                    Our 7 Specialized Services
                  </span>
                  <button
                    onClick={() => handleNavClick('services')}
                    className="text-xs font-semibold text-brand hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>All Services</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>

                {/* 7 Services Links */}
                <div className="space-y-1">
                  {SERVICES_DATA.map(service => (
                    <button
                      key={service.id}
                      onClick={() => handleNavClick('service-detail', service.slug)}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-brand/10 group transition-all flex items-start gap-3 cursor-pointer"
                      role="menuitem"
                    >
                      <div className="h-8 w-8 rounded-lg bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white flex items-center justify-center shrink-0 transition-colors mt-0.5">
                        {getServiceIcon(service.id)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-zinc-900 group-hover:text-brand-dark transition-colors flex items-center justify-between">
                          <span>{service.name}</span>
                          <span className="text-[10px] font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-full">
                            Safe & Odorless
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">
                          {service.tagline.split('&')[0]}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Bottom CTA within dropdown */}
                <div className="mt-3 pt-2.5 border-t border-brand/15 px-3 flex items-center justify-between text-xs">
                  <span className="text-zinc-500 font-medium">Free site inspection</span>
                  <button
                    onClick={onOpenEnquiryModal}
                    className="font-bold text-brand-dark hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Book Inspection</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Service Areas */}
          <button
            onClick={() => handleNavClick('locations')}
            className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
              currentView === 'locations' || currentView === 'location-detail'
                ? 'text-white bg-brand shadow-sm shadow-brand/30'
                : 'text-zinc-800 hover:text-brand-dark hover:bg-brand/10'
            }`}
          >
            Service Areas
          </button>

          {/* Pest Guides */}
          <button
            onClick={() => handleNavClick('blog')}
            className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
              currentView === 'blog' || currentView === 'blog-detail'
                ? 'text-white bg-brand shadow-sm shadow-brand/30'
                : 'text-zinc-800 hover:text-brand-dark hover:bg-brand/10'
            }`}
          >
            Pest Guides
          </button>

          {/* Contact Us */}
          <button
            onClick={() => handleNavClick('contact')}
            className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
              currentView === 'contact'
                ? 'text-white bg-brand shadow-sm shadow-brand/30'
                : 'text-zinc-800 hover:text-brand-dark hover:bg-brand/10'
            }`}
          >
            Contact Us
          </button>
        </nav>

        {/* Action Buttons: Call Now & WhatsApp in Brand Green */}
        <div className="hidden sm:flex items-center gap-2">
          <a
            href={`tel:${COMPANY_INFO.telPrimary}`}
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-brand text-brand-dark px-3.5 py-1.5 text-xs lg:text-sm font-bold hover:bg-brand hover:text-white transition-all active:scale-95"
            title="Primary Helpline: +91 91469 69177"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>91469 69177</span>
          </a>

          <a
            href={`tel:${COMPANY_INFO.telSecondary}`}
            className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/5 text-brand-dark px-3 py-1.5 text-xs lg:text-sm font-bold hover:bg-brand hover:text-white transition-all active:scale-95"
            title="Secondary Helpline: +91 74004 83787"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>74004 83787</span>
          </a>

          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] text-white px-3.5 py-1.5 text-xs lg:text-sm font-bold shadow-md shadow-brand/30 hover:brightness-110 transition-all active:scale-95"
          >
            <MessageCircle className="h-4 w-4 fill-white" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden p-2 rounded-xl text-brand-dark hover:bg-brand/10 transition-colors cursor-pointer"
          onClick={() => setMobileMenuOpen(prev => !prev)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mx-4 mt-2 rounded-2xl bg-white shadow-2xl border-2 border-brand/25 p-3.5 animate-fade-up max-h-[85vh] overflow-y-auto">
          <div className="space-y-1">
            {/* Home */}
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left block px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                currentView === 'home'
                  ? 'text-white bg-brand shadow-xs'
                  : 'text-zinc-800 hover:bg-brand/10'
              }`}
            >
              Home
            </button>

            {/* About Us */}
            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left block px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                currentView === 'about'
                  ? 'text-white bg-brand shadow-xs'
                  : 'text-zinc-800 hover:bg-brand/10'
              }`}
            >
              About Us
            </button>

            {/* Services Accordion with all 7 services */}
            <div className="rounded-xl border border-brand/20 overflow-hidden bg-brand/5">
              <button
                onClick={() => setMobileServicesOpen(prev => !prev)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-brand-dark hover:bg-brand/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-brand" />
                  <span>Our 7 Pest Services</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    mobileServicesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {mobileServicesOpen && (
                <div className="px-2 pb-2 space-y-1 border-t border-brand/15 pt-2 bg-white">
                  {SERVICES_DATA.map(service => (
                    <button
                      key={service.id}
                      onClick={() => handleNavClick('service-detail', service.slug)}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-zinc-800 hover:bg-brand/10 hover:text-brand-dark flex items-center gap-2.5 transition-colors"
                    >
                      <div className="h-6 w-6 rounded-md bg-brand/10 text-brand flex items-center justify-center shrink-0">
                        {getServiceIcon(service.id)}
                      </div>
                      <span className="flex-1">{service.name}</span>
                      <ArrowRight className="h-3 w-3 text-zinc-400" />
                    </button>
                  ))}
                  <button
                    onClick={() => handleNavClick('services')}
                    className="w-full text-center py-2 px-3 mt-1 rounded-lg bg-brand text-white font-bold text-xs hover:bg-brand-dark transition-all flex items-center justify-center gap-1"
                  >
                    <span>View All Services Directory</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Service Areas */}
            <button
              onClick={() => handleNavClick('locations')}
              className={`w-full text-left block px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                currentView === 'locations' || currentView === 'location-detail'
                  ? 'text-white bg-brand shadow-xs'
                  : 'text-zinc-800 hover:bg-brand/10'
              }`}
            >
              Service Areas
            </button>

            {/* Pest Guides */}
            <button
              onClick={() => handleNavClick('blog')}
              className={`w-full text-left block px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                currentView === 'blog' || currentView === 'blog-detail'
                  ? 'text-white bg-brand shadow-xs'
                  : 'text-zinc-800 hover:bg-brand/10'
              }`}
            >
              Pest Guides
            </button>

            {/* Contact Us */}
            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full text-left block px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                currentView === 'contact'
                  ? 'text-white bg-brand shadow-xs'
                  : 'text-zinc-800 hover:bg-brand/10'
              }`}
            >
              Contact Us
            </button>
          </div>

          {/* Mobile Action Buttons with both Helplines */}
          <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-brand/20">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${COMPANY_INFO.telPrimary}`}
                className="inline-flex justify-center items-center gap-1.5 rounded-full border-2 border-brand text-brand-dark px-3 py-2 text-xs font-bold active:scale-95"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Call 9146969177</span>
              </a>
              <a
                href={`tel:${COMPANY_INFO.telSecondary}`}
                className="inline-flex justify-center items-center gap-1.5 rounded-full border border-brand/40 bg-brand/5 text-brand-dark px-3 py-2 text-xs font-bold active:scale-95"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Call 7400483787</span>
              </a>
            </div>
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex justify-center items-center gap-2 rounded-full bg-[#25D366] text-white px-4 py-2.5 text-sm font-bold active:scale-95 shadow-md shadow-brand/30"
            >
              <MessageCircle className="h-4 w-4 fill-white" />
              <span>WhatsApp Instant Quote</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
