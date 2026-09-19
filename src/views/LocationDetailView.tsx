import React, { useState } from 'react';
import { LOCATIONS_DATA } from '../data/locationsData';
import { SERVICES_DATA } from '../data/servicesData';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';
import { COMPANY_INFO } from '../data/companyData';
import { EnquiryForm } from '../components/EnquiryForm';
import { openWhatsAppDirect } from '../utils/whatsapp';
import { 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronRight,
  Star,
  Building,
  Navigation
} from 'lucide-react';

interface LocationDetailViewProps {
  slug: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenEnquiryModal: () => void;
}

export const LocationDetailView: React.FC<LocationDetailViewProps> = ({
  slug,
  onNavigate,
  onOpenEnquiryModal
}) => {
  const location = LOCATIONS_DATA.find(l => l.slug === slug) || LOCATIONS_DATA[0];
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Find reviews from this area or nearby
  const localReviews = TESTIMONIALS_DATA.filter(r => 
    r.location.toLowerCase().includes(location.name.toLowerCase()) || 
    location.name.toLowerCase().includes('badlapur')
  );

  const toggleFaq = (index: number) => {
    setActiveFaq(prev => (prev === index ? null : index));
  };

  return (
    <div className="w-full bg-zinc-50 min-h-screen py-8 md:py-12">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-zinc-500 mb-6 flex-wrap">
          <button onClick={() => onNavigate('home')} className="hover:text-brand transition cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          <button onClick={() => onNavigate('locations')} className="hover:text-brand transition cursor-pointer">
            Coverage Locations
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-zinc-900 font-bold">{location.name}</span>
        </nav>

        {/* Local SEO Hero Banner */}
        <div className="bg-gradient-to-r from-brand-dark to-brand text-white rounded-3xl overflow-hidden shadow-xl mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3.5 py-1 bg-white/20 text-white text-xs font-bold rounded-full border border-white/20">
                    {location.zone}
                  </span>
                  <span className="px-3.5 py-1 bg-black/20 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3 text-brand-light" />
                    {location.responseTime}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  Pest Control Services in <span className="underline decoration-white/40">{location.name}</span>
                </h1>

                <p className="text-xs sm:text-sm text-white/95 mt-3 leading-relaxed">
                  {location.metaDesc}
                </p>

                {/* Local Hub Notice */}
                <div className="mt-5 p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 text-xs text-white space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <MapPin className="w-4 h-4 text-brand-light" />
                    <span>Regional Operations & Hub:</span>
                  </div>
                  <p className="pl-5 text-white/90 text-[11px] leading-relaxed">
                    {location.id === 'badlapur' ? (
                      <strong>Registered Head Office: {COMPANY_INFO.address}</strong>
                    ) : (
                      <span>{location.hubLocation} (Central Coordination from Badlapur HQ: {COMPANY_INFO.address})</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => openWhatsAppDirect(`Hi Top One Pest Control, I need an inspection for pest control in ${location.name}.`)}
                  className="py-3 px-6 rounded-full bg-[#25D366] hover:brightness-110 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-black/15 transition-all active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-white" />
                  <span>Enquire for {location.name} on WhatsApp</span>
                </button>

                <a
                  href={`tel:+91${COMPANY_INFO.primaryPhone}`}
                  className="py-3 px-6 rounded-full bg-white hover:bg-zinc-100 text-brand-dark font-bold text-xs sm:text-sm flex items-center gap-2 transition active:scale-95 shadow-sm"
                >
                  <Phone className="w-4 h-4 text-brand-dark" />
                  <span>Call {COMPANY_INFO.displayPrimaryPhone}</span>
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 relative bg-zinc-900 min-h-[260px] lg:min-h-full">
              <img
                src={location.heroImage}
                alt={`Pest Control in ${location.name}`}
                className="w-full h-full object-cover min-h-[260px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 right-4 bg-zinc-900/90 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10 text-xs shadow-lg">
                <div className="font-bold text-brand-light flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand" /> 100% Odorless & Safe Pest Protection
                </div>
                <div className="text-[11px] text-zinc-300 mt-0.5">
                  Fast response team available across all pin codes in {location.name}.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid: Localized Coverage + Local Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left 7 Columns: Local Coverage, Popular Services, Highlights */}
          <div className="lg:col-span-7 space-y-8">
            {/* Specific Localities Covered in this Zone */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand/15 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Navigation className="w-4 h-4 text-brand" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                  Local Coverage Areas
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight mb-3">
                Key Neighborhoods & Localities We Service in {location.name}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 mb-6 leading-relaxed">
                Our technicians are stationed locally to provide same-day rapid response across these residential and commercial sectors:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {location.coveredAreas.map((area, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 flex items-center gap-2.5 text-xs font-semibold text-zinc-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Pest Services in this Area */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand/15 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight mb-2">
                Most In-Demand Treatments in {location.name}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 mb-6">
                Based on historical service requests and local climate/soil factors in this region:
              </p>

              <div className="space-y-3">
                {location.popularServices.map((srv, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-brand/5 border border-brand/20 flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-xs">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-zinc-900">{srv}</div>
                        <div className="text-[11px] text-brand-dark font-semibold">100% Odorless • Certified Protection Plan</div>
                      </div>
                    </div>
                    <button
                      onClick={() => openWhatsAppDirect(`Hi Top One Pest Control, I would like to book ${srv} in ${location.name}.`)}
                      className="px-3.5 py-1.5 bg-[#25D366] hover:brightness-110 text-white rounded-full text-xs font-bold shrink-0 cursor-pointer transition-all active:scale-95"
                    >
                      Enquire
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Top One in this Location */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand/15 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight mb-4">
                Why Residents & Businesses in {location.name} Trust Us
              </h2>
              <ul className="space-y-3">
                {location.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-700 leading-relaxed">
                    <ShieldCheck className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Local FAQs */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand/15 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight mb-4">
                Pest Control FAQs for {location.name}
              </h2>

              <div className="space-y-3">
                {location.faqs.map((faq, idx) => (
                  <div key={idx} className="border border-brand/20 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left p-4 flex items-center justify-between gap-4 font-bold text-zinc-900 hover:text-brand-dark transition-colors cursor-pointer text-xs sm:text-sm"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 text-brand shrink-0 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                    </button>
                    {activeFaq === idx && (
                      <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-brand/10">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Dedicated Location Enquiry Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-24">
              <EnquiryForm
                initialLocation={location.name}
                title={`Book Inspection in ${location.name}`}
                subtitle={`Technician dispatch in ${location.responseTime} • WhatsApp Quote`}
                className="shadow-md border-brand/20"
              />

              {/* Badlapur HQ Connection */}
              <div className="bg-zinc-900 text-white rounded-3xl p-6 mt-6 space-y-3 border border-zinc-800">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-light flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand" />
                  <span>Central Operations Office</span>
                </div>
                <div className="text-sm font-bold text-white">Top One Pest Control Services</div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {COMPANY_INFO.address}
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href={`tel:+91${COMPANY_INFO.primaryPhone}`}
                    className="py-3 px-4 bg-brand hover:bg-brand-dark rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 shadow-md shadow-brand/20"
                  >
                    <Phone className="w-4 h-4" /> Call: {COMPANY_INFO.displayPrimaryPhone}
                  </a>
                  <button
                    onClick={() => openWhatsAppDirect(`Hi, I am contacting you regarding pest control services in ${location.name}.`)}
                    className="py-2.5 px-4 bg-[#25D366] hover:brightness-110 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer text-white"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-white" />
                    <span>WhatsApp Enquiry for {location.name}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Coverage Locations Quick Links */}
        <div className="mt-16 pt-10 border-t border-zinc-200">
          <h3 className="text-lg font-bold text-foreground mb-4">Other Service Coverage Locations</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {LOCATIONS_DATA.filter(l => l.id !== location.id).map(other => (
              <button
                key={other.id}
                onClick={() => {
                  onNavigate('location-detail', other.slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-3 bg-white hover:bg-brand/5 border border-brand/15 hover:border-brand rounded-2xl text-left transition-all group cursor-pointer shadow-xs"
              >
                <div className="text-xs font-bold text-zinc-900 group-hover:text-brand transition-colors">
                  {other.name}
                </div>
                <div className="text-[10px] text-zinc-500 mt-0.5">
                  {other.responseTime.split(' ')[0]} min response
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
