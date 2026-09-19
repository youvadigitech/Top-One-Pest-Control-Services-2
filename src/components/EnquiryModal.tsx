import React from 'react';
import { X } from 'lucide-react';
import { EnquiryForm } from './EnquiryForm';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: string;
  location?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  service,
  location
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          id="close-enquiry-modal-btn"
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition"
        >
          <X className="w-5 h-5" />
        </button>

        <EnquiryForm
          initialService={service}
          initialLocation={location}
          title="Fast Inspection Booking"
          subtitle="Direct WhatsApp connect with certified technicians"
          className="border-none shadow-none p-6 md:p-8 pt-10"
        />
      </div>
    </div>
  );
};
