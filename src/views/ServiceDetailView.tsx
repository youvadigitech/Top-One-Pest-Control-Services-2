import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/servicesData';
import { COMPANY_INFO } from '../data/companyData';
import { EnquiryForm } from '../components/EnquiryForm';
import { openWhatsAppDirect } from '../utils/whatsapp';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  ChevronDown, 
  ArrowLeft, 
  Phone, 
  MessageCircle, 
  Calendar,
  Sparkles,
  Award,
  ChevronRight
} from 'lucide-react';

interface ServiceDetailViewProps {
  slug: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenEnquiryModal: () => void;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({
  slug,
  onNavigate,
  onOpenEnquiryModal
}) => {
  const slugAliases: Record<string, string> = {
    'termite-control': 'termites-management',
    'bed-bug-treatment': 'bed-bug-control',
    'rodent-control': 'rodents-control',
    'mosquito-control': 'mosquito-management',
    'wood-borer-treatment': 'wood-borer-control',
    'commercial-pest-control': 'cockroach-control',
    'general-pest-control': 'cockroach-control'
  };

  const serviceToBlogSlug: Record<string, string> = {
    'cockroach-control': 'odorless-herbal-gel-cockroach-control',
    'termites-management': 'termite-control-guide-badlapur-mumbai',
    'bed-bug-control': 'how-to-eradicate-bed-bugs-permanently',
    'bird-control': 'balcony-bird-netting-pigeon-spikes-guide-mumbai',
    'mosquito-management': 'residential-mosquito-control-dengue-fogging-guide',
    'rodents-control': 'rat-rodent-control-bait-stations-badlapur-thane',
    'wood-borer-control': 'wood-borer-treatment-powder-post-beetle-guide'
  };

  const resolvedSlug = slugAliases[slug] || slug;
  const service = SERVICES_DATA.find(s => s.slug === resolvedSlug || s.id === resolvedSlug) || SERVICES_DATA[0];
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setActiveFaq(prev => (prev === index ? null : index));
  };

  return (
    <div className="w-full bg-zinc-50 min-h-screen py-8 md:py-12">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-zinc-500 mb-6 flex-wrap">
          <button 
            onClick={() => onNavigate('home')} 
            className="hover:text-brand transition flex items-center gap-1 cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          <button 
            onClick={() => onNavigate('services')} 
            className="hover:text-brand transition cursor-pointer"
          >
            Services
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-zinc-900 font-bold">{service.name}</span>
        </nav>

        {/* Hero Banner for this Specific Service */}
        <div className="bg-white rounded-3xl border border-brand/20 overflow-hidden shadow-sm mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Content */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3.5 py-1 bg-brand/10 text-brand-dark text-xs font-bold rounded-full uppercase tracking-wider border border-brand/20">
                    {service.treatmentType.split('+')[0].trim()}
                  </span>
                  <span className="px-3.5 py-1 bg-zinc-100 text-zinc-700 text-xs font-semibold rounded-full">
                    {service.warrantyPeriod}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                  {service.name}
                </h1>
                <p className="text-brand-dark font-bold text-sm sm:text-base mt-2">
                  {service.tagline}
                </p>

                <p className="text-xs sm:text-sm text-zinc-600 mt-4 leading-relaxed">
                  {service.fullDesc}
                </p>

                {/* Target Pests Chips */}
                <div className="mt-6 pt-4 border-t border-zinc-100">
                  <div className="text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                    Targeted Pest Species:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.targetPests.map((pest, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-zinc-100 text-zinc-800 text-xs font-medium rounded-full border border-zinc-200"
                      >
                        {pest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-6 mt-4 border-t border-zinc-100">
                <button
                  onClick={() => openWhatsAppDirect(`Hi Top One Pest Control, I would like to book a free inspection for ${service.name}.`)}
                  className="py-3 px-5 rounded-full bg-[#25D366] hover:brightness-110 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-black/10 active:scale-95 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-white" />
                  <span>WhatsApp Quote</span>
                </button>

                <a
                  href={`tel:+91${COMPANY_INFO.primaryPhone}`}
                  className="py-3 px-5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition active:scale-95"
                  title="Call Primary Helpline"
                >
                  <Phone className="w-4 h-4 text-brand" />
                  <span>{COMPANY_INFO.displayPrimaryPhone}</span>
                </a>

                <a
                  href={`tel:+91${COMPANY_INFO.secondaryPhone}`}
                  className="py-3 px-4 rounded-full border border-brand/30 bg-brand/5 hover:bg-brand hover:text-white text-brand-dark font-bold text-xs sm:text-sm flex items-center gap-1.5 transition active:scale-95"
                  title="Call Secondary Helpline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{COMPANY_INFO.displaySecondaryPhone}</span>
                </a>
              </div>
            </div>

            {/* Right Featured Image & Fast Specs */}
            <div className="lg:col-span-5 relative bg-zinc-100 min-h-[300px] lg:min-h-full">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover min-h-[300px]"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-zinc-900/90 backdrop-blur-md rounded-2xl p-4 text-white text-xs space-y-1.5 border border-white/10 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-300">Safety Standard:</span>
                  <span className="font-bold text-brand-light">{service.safetyRating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-300">Average Treatment Duration:</span>
                  <span className="font-semibold text-white">{service.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-300">Coverage Locations:</span>
                  <span className="font-semibold text-white">Badlapur, Thane, Mumbai (All Zones)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid: Details + Process vs. Dedicated Lead Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left 7 Cols: Process Steps & Benefits */}
          <div className="lg:col-span-7 space-y-8">
            {/* 4-Step Process */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand/15 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                  Execution Protocol
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight mb-6">
                Step-by-Step Treatment Process
              </h2>

              <div className="space-y-6">
                {service.processSteps.map(step => (
                  <div key={step.step} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-brand text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-md shadow-brand/20">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-zinc-900">{step.title}</h3>
                      <p className="text-xs sm:text-sm text-zinc-600 mt-1 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scientific Benefits */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand/15 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                  Key Advantages
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight mb-6">
                Why Customers Choose Our {service.name}
              </h2>

              <ul className="space-y-3.5">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQs Specific to This Service */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand/15 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight mb-4">
                Frequently Asked Questions: {service.name}
              </h2>

              <div className="space-y-3">
                {service.faqs.map((faq, idx) => (
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

            {/* Cross-link to In-Depth SEO/AEO/GEO/EEAT Blog Guide with 7+ Ranking FAQs */}
            {serviceToBlogSlug[service.id] && (
              <div className="bg-gradient-to-r from-emerald-50 to-white rounded-3xl p-6 border border-brand/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand">
                    <Sparkles className="w-3.5 h-3.5 text-brand" />
                    <span>In-Depth Scientific Pest Research & FAQs</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-zinc-900">
                    Read our full {service.name} Guide & 7+ Ranking FAQs
                  </h3>
                  <p className="text-xs text-zinc-600">
                    Detailed step-by-step methodologies, CIB-approved chemical details, preparation tips, and verified answers to top Google search questions.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onNavigate('blog-detail', serviceToBlogSlug[service.id]);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 bg-brand hover:bg-brand-dark text-white text-xs font-bold rounded-full flex items-center gap-1.5 shrink-0 transition-colors shadow-sm cursor-pointer active:scale-95"
                >
                  <span>Read Guide</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Right 5 Cols: Sticky Booking Lead Form pre-selected with this service */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-24">
              <EnquiryForm
                initialService={service.name}
                title={`Book Free Inspection`}
                subtitle={`For ${service.name} • Direct WhatsApp Quote`}
                className="shadow-md border-brand/20"
              />

              {/* Call Helpline Card */}
              <div className="bg-zinc-900 text-white rounded-3xl p-6 mt-6 space-y-3 border border-zinc-800">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-light flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-brand-light" />
                  <span>Immediate Technician Dispatch</span>
                </div>
                <h3 className="text-base font-bold">Have an Urgent Infestation?</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Call our Badlapur headquarters or emergency field officers directly for rapid same-day inspection.
                </p>
                <div className="pt-2 space-y-2">
                  <a
                    href={`tel:+91${COMPANY_INFO.primaryPhone}`}
                    className="w-full py-3 px-4 bg-brand hover:bg-brand-dark rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 shadow-md shadow-brand/20"
                  >
                    <Phone className="w-4 h-4" /> Call: {COMPANY_INFO.displayPrimaryPhone}
                  </a>
                  <a
                    href={`tel:+91${COMPANY_INFO.secondaryPhone}`}
                    className="w-full py-2.5 px-4 bg-zinc-800 hover:bg-zinc-700 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition active:scale-95"
                  >
                    <span>Secondary: {COMPANY_INFO.displaySecondaryPhone}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Services Recommendations */}
        <div className="mt-16 pt-10 border-t border-zinc-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-foreground">Explore Other Pest Services</h3>
            <button
              onClick={() => onNavigate('services')}
              className="text-xs font-bold text-brand hover:text-brand-dark transition-colors cursor-pointer"
            >
              View All 8 Services &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {SERVICES_DATA.filter(s => s.id !== service.id).slice(0, 4).map(other => (
              <div
                key={other.id}
                className="bg-white p-4 rounded-2xl border border-brand/15 hover:border-brand transition-all group cursor-pointer shadow-xs hover:shadow-md"
                onClick={() => {
                  onNavigate('service-detail', other.slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="h-32 rounded-xl overflow-hidden mb-3 bg-zinc-100">
                  <img
                    src={other.image}
                    alt={other.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-brand transition-colors line-clamp-1">
                  {other.name}
                </h4>
                <p className="text-[11px] text-zinc-500 line-clamp-2 mt-1 leading-relaxed">
                  {other.shortDesc}
                </p>
                <div className="mt-2 text-[11px] font-bold text-brand flex items-center gap-1">
                  <span>View Details</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
