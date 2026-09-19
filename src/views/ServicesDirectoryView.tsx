import React from 'react';
import { SERVICES_DATA } from '../data/servicesData';
import { COMPANY_INFO } from '../data/companyData';
import { openWhatsAppDirect } from '../utils/whatsapp';
import { 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  MessageCircle, 
  Calendar 
} from 'lucide-react';

interface ServicesDirectoryViewProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenEnquiryModal: () => void;
}

export const ServicesDirectoryView: React.FC<ServicesDirectoryViewProps> = ({
  onNavigate,
  onOpenEnquiryModal
}) => {
  return (
    <div className="w-full bg-zinc-50 min-h-screen py-10 md:py-16">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-brand font-bold uppercase tracking-wider text-xs sm:text-sm">
            Complete Pest Portfolio
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mt-2">
            Our Pest Control & Eradication Services
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 mt-3 leading-relaxed">
            100% odorless, eco-friendly, and government-approved treatments designed for apartments, bungalows, modular kitchens, and commercial enterprises. Select any service to explore detailed methods, process steps and warranties.
          </p>
        </div>

        {/* Services List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map(service => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-brand/20 overflow-hidden shadow-sm hover:shadow-md hover:border-brand transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-zinc-100">
                  <img
                    src={service.image}
                    alt={service.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-zinc-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full">
                    {service.warrantyPeriod.split(',')[0]}
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-[11px] font-bold text-brand uppercase tracking-wider mb-1">
                    {service.treatmentType.split('+')[0].trim()}
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 group-hover:text-brand transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-zinc-600 mt-2.5 leading-relaxed line-clamp-3">
                    {service.shortDesc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-zinc-100 space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 text-brand-dark font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0" />
                      <span>{service.safetyRating}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span>Duration: {service.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-2">
                <button
                  onClick={() => onNavigate('service-detail', service.slug)}
                  className="w-full py-2.5 px-4 rounded-full bg-brand hover:bg-brand-dark text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm active:scale-95"
                >
                  <span>More Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => openWhatsAppDirect(`Hi Top One Pest Control, I want to book a free inspection for ${service.name}.`)}
                  className="w-full py-2.5 px-4 rounded-full bg-[#25D366] hover:brightness-110 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
                  <span>WhatsApp Quote</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Global CTA */}
        <div className="mt-16 bg-gradient-to-r from-brand-dark to-brand rounded-3xl p-8 text-white text-center flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-left">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">Unsure which pest treatment you need?</h2>
            <p className="text-xs sm:text-sm text-white/90 mt-1">
              Our entomology supervisors inspect your premises and recommend the ideal treatment plan for free.
            </p>
          </div>
          <button
            onClick={onOpenEnquiryModal}
            className="py-3 px-7 rounded-full bg-white hover:bg-zinc-100 text-brand-dark font-bold text-xs sm:text-sm shrink-0 flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Free Site Inspection</span>
          </button>
        </div>
      </div>
    </div>
  );
};
