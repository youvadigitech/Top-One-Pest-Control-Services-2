import React, { useState, useRef, useEffect } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface StickyContactButtonsProps {
  onOpenEnquiryModal: () => void;
}

export const StickyContactButtons: React.FC<StickyContactButtonsProps> = () => {
  const [callMenuOpen, setCallMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setCallMenuOpen(false);
      }
    };
    if (callMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [callMenuOpen]);

  return (
    <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3" ref={menuRef}>
      {/* Popover Call Menu if open */}
      {callMenuOpen && (
        <div className="bg-white rounded-2xl p-3 shadow-2xl border-2 border-brand/30 w-64 animate-fade-up space-y-2 mb-1">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
            <span className="text-xs font-bold text-zinc-900">Direct Helplines</span>
            <button
              onClick={() => setCallMenuOpen(false)}
              className="text-zinc-400 hover:text-zinc-700 p-0.5 rounded-full"
              aria-label="Close phone menu"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <a
            href={`tel:${COMPANY_INFO.telPrimary}`}
            className="flex items-center gap-2.5 p-2 rounded-xl bg-brand/10 hover:bg-brand text-brand-dark hover:text-white transition-all font-bold text-xs"
          >
            <Phone className="w-4 h-4 shrink-0" />
            <div>
              <div className="text-[10px] uppercase font-semibold opacity-80">Primary Call</div>
              <div className="text-xs">{COMPANY_INFO.displayPrimaryPhone}</div>
            </div>
          </a>
          <a
            href={`tel:${COMPANY_INFO.telSecondary}`}
            className="flex items-center gap-2.5 p-2 rounded-xl bg-zinc-100 hover:bg-brand text-zinc-800 hover:text-white transition-all font-bold text-xs"
          >
            <Phone className="w-4 h-4 text-brand shrink-0" />
            <div>
              <div className="text-[10px] uppercase font-semibold opacity-80">Secondary Call</div>
              <div className="text-xs">{COMPANY_INFO.displaySecondaryPhone}</div>
            </div>
          </a>
        </div>
      )}

      {/* WhatsApp Floating Button */}
      <a
        href={COMPANY_INFO.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="group relative flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-black/20 hover:scale-110 active:scale-95 transition-all focus:outline-none"
        aria-label="Chat with Top One Pest Control on WhatsApp"
        title="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white"></span>
        </span>
        <MessageCircle className="h-7 w-7 fill-white text-[#25D366]" />
      </a>

      {/* Call Floating Button - Toggles dual helpline options */}
      <button
        onClick={() => setCallMenuOpen(prev => !prev)}
        className="flex items-center justify-center h-14 w-14 rounded-full bg-brand text-white shadow-xl shadow-brand/30 hover:scale-110 active:scale-95 transition-all focus:outline-none cursor-pointer"
        aria-label="Call Top One Pest Control Now"
        title="Call Now (Choose 9146969177 or 7400483787)"
      >
        <Phone className="h-6 w-6" />
      </button>
    </aside>
  );
};

