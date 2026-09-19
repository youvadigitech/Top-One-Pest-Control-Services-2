import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { openWhatsAppDirect } from '../utils/whatsapp';
import { 
  ShieldCheck, 
  Award, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Phone, 
  MessageCircle, 
  Users, 
  Sparkles,
  HeartHandshake
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenEnquiryModal: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenEnquiryModal }) => {
  return (
    <div className="w-full bg-zinc-50 min-h-screen py-10 md:py-16">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-brand font-bold uppercase tracking-wider text-xs sm:text-sm">
            About Top One Pest Control Services
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mt-2">
            Protecting Families & Businesses with Scientific, Odorless Care
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 mt-3 leading-relaxed">
            Headquartered at Katrap, Badlapur East, Top One Pest Control Services has been delivering government-approved, non-toxic, and long-lasting pest extermination across Thane District and Greater Mumbai for over a decade.
          </p>
        </div>

        {/* Core Profile Card */}
        <div className="bg-white rounded-3xl border border-brand/20 p-6 sm:p-10 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-dark bg-brand/10 px-3.5 py-1 rounded-full border border-brand/20">
                Our Story & Commitment
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                From Badlapur to the Entire Mumbai Metropolitan Region
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Top One Pest Control Services was established with a singular mission: to eliminate the headaches, pungent chemical smells, and health hazards traditionally associated with pest control in Indian homes.
              </p>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Traditional pest control forced families to pack away groceries, endure harsh kerosene-like vapors for days, and clean sticky floors. We revolutionized this by adopting <strong>100% odorless herbal gel baits</strong>, micro-encapsulated barrier sprays, and the precision <strong>Drill-Fill-Seal</strong> anti-termite system.
              </p>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Today, from our registered head office at <strong>Shop No. 08, Ballaleshwar Apartments, Surya Nagar, East, Katrap, Badlapur (MH 421503)</strong>, our certified exterminators safeguard over 18,500 residences, hospitals, luxury restaurants, and industrial warehouses.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenEnquiryModal}
                  className="py-3 px-6 rounded-full bg-brand hover:bg-brand-dark text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md shadow-brand/20 active:scale-95 transition-all"
                >
                  <Clock className="w-4 h-4" />
                  <span>Book Free Inspection</span>
                </button>
                <button
                  onClick={() => openWhatsAppDirect('Hello, I would like to learn more about Top One Pest Control Services.')}
                  className="py-3 px-6 rounded-full bg-[#25D366] hover:brightness-110 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer active:scale-95 shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-white" />
                  <span>Connect on WhatsApp</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-brand-dark to-brand text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="text-xs font-bold uppercase tracking-wider text-white/80">
                Official Registered Office & Helplines
              </div>
              <div className="text-lg font-black tracking-tight">Top One Pest Control Services</div>
              
              <div className="space-y-3 text-xs text-white/90 pt-3 border-t border-white/20">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-light shrink-0 mt-0.5" />
                  <span>{COMPANY_INFO.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-brand-light shrink-0" />
                  <span>Primary: <strong>{COMPANY_INFO.displayPrimaryPhone}</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-brand-light shrink-0" />
                  <span>Secondary: <strong>{COMPANY_INFO.displaySecondaryPhone}</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-brand-light shrink-0" />
                  <span>{COMPANY_INFO.workingHours}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/20">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-2xl bg-black/20">
                    <div className="text-2xl font-black text-white">18,500+</div>
                    <div className="text-[11px] text-white/80">Homes Protected</div>
                  </div>
                  <a
                    href={COMPANY_INFO.googleReviewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-2xl bg-black/20 hover:bg-black/30 transition-all block group"
                    title="View 520+ Verified Google Reviews"
                  >
                    <div className="text-2xl font-black text-white group-hover:text-brand-light transition-colors">4.9 ★</div>
                    <div className="text-[11px] text-white/80 underline decoration-white/40">520+ Google Reviews</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Excellence (EEAT) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-brand/20 shadow-xs hover:border-brand transition-colors">
            <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-900">Govt. Certified Safety</h3>
            <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
              Every chemical batch deployed is licensed by the Central Insecticide Board (CIB) and tested strictly for eco-friendliness around infants and pets.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-brand/20 shadow-xs hover:border-brand transition-colors">
            <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-900">100% Odorless Comfort</h3>
            <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
              Zero noxious vapors, zero stains on paint, and zero need to empty kitchen cabinets. We prioritize comfortable living without household disturbance.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-brand/20 shadow-xs hover:border-brand transition-colors">
            <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-900">Service Agreements</h3>
            <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
              We stand behind our treatments with up to 5-year written service certificates. Any recurrence during the period is treated at zero cost.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-brand/20 shadow-xs hover:border-brand transition-colors">
            <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-900">Verified Technicians</h3>
            <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
              All personnel undergo police background verification, standardized hygiene training, and arrive in uniform with proper ID credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
