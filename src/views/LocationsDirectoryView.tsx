import React from 'react';
import { LOCATIONS_DATA } from '../data/locationsData';
import { COMPANY_INFO } from '../data/companyData';
import { openWhatsAppDirect } from '../utils/whatsapp';
import { 
  MapPin, 
  Clock, 
  ArrowRight, 
  MessageCircle, 
  CheckCircle2, 
  Building,
  Navigation
} from 'lucide-react';

interface LocationsDirectoryViewProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenEnquiryModal: () => void;
}

export const LocationsDirectoryView: React.FC<LocationsDirectoryViewProps> = ({
  onNavigate,
  onOpenEnquiryModal
}) => {
  return (
    <div className="w-full bg-zinc-50 min-h-screen py-10 md:py-16">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-brand font-bold uppercase tracking-wider text-xs sm:text-sm">
            Local Service Coverage
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mt-2">
            Pest Control Coverage Across Badlapur, Thane & Mumbai
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 mt-3 leading-relaxed">
            Headquartered in Katrap, Badlapur, our mobile extermination units are strategically stationed across 8 major zones for instant 20 to 45 minute technician arrival. Click on any location to view local details and access its dedicated enquiry form.
          </p>
        </div>

        {/* Head Office Highlight */}
        <div className="mb-10 bg-gradient-to-r from-brand-dark to-brand text-white rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="px-3.5 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                Central Operations & Registered Office
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">Top One Pest Control Services (Badlapur HQ)</h2>
              <p className="text-xs sm:text-sm text-white/90 max-w-2xl leading-relaxed flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-light shrink-0" />
                <span>{COMPANY_INFO.address}</span>
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('location-detail', 'badlapur')}
                className="py-3 px-6 rounded-full bg-white hover:bg-zinc-100 text-brand-dark font-bold text-xs transition cursor-pointer active:scale-95 shadow-md"
              >
                View Badlapur Hub Page
              </button>
              <button
                onClick={() => openWhatsAppDirect('Hi Top One Pest Control, I would like to visit or book inspection at your Badlapur office.')}
                className="p-3 bg-[#25D366] hover:brightness-110 rounded-full text-white transition cursor-pointer active:scale-95 shadow-md"
                title="WhatsApp Badlapur HQ"
              >
                <MessageCircle className="w-5 h-5 fill-white text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* 8 Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LOCATIONS_DATA.map(loc => (
            <div
              key={loc.id}
              className="bg-white rounded-2xl border border-brand/20 p-6 flex flex-col justify-between shadow-xs hover:border-brand hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-brand-dark bg-brand/10 px-2.5 py-1 rounded-full border border-brand/20">
                    {loc.responseTime}
                  </span>
                  <MapPin className="w-4 h-4 text-zinc-400 group-hover:text-brand transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-zinc-900 group-hover:text-brand transition-colors">
                  {loc.name}
                </h3>
                <div className="text-xs text-zinc-500 font-medium mb-4">
                  {loc.zone}
                </div>

                <div className="space-y-1.5 mb-6 text-xs text-zinc-600">
                  <div className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-2">
                    Key Areas Covered:
                  </div>
                  {loc.coveredAreas.slice(0, 4).map((area, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-zinc-600 line-clamp-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-zinc-100">
                <button
                  onClick={() => onNavigate('location-detail', loc.slug)}
                  className="w-full py-2.5 px-4 rounded-full bg-brand hover:bg-brand-dark text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm active:scale-95"
                >
                  <span>Open {loc.name} Page & Form</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => openWhatsAppDirect(`Hi Top One Pest Control, I need a quote for pest control in ${loc.name}.`)}
                  className="w-full py-2.5 px-4 rounded-full bg-[#25D366] hover:brightness-110 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
                  <span>WhatsApp Inquiry</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
