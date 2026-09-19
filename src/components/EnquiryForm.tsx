import React, { useState } from 'react';
import { LeadFormData } from '../types';
import { COMPANY_INFO, PROPERTY_TYPES } from '../data/companyData';
import { SERVICES_DATA } from '../data/servicesData';
import { LOCATIONS_DATA } from '../data/locationsData';
import { createWhatsAppLeadMessage, getWhatsAppUrl } from '../utils/whatsapp';
import { Send, CheckCircle2, Phone, ShieldCheck, Clock } from 'lucide-react';

interface EnquiryFormProps {
  initialService?: string;
  initialLocation?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
  className?: string;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  initialService,
  initialLocation,
  title = "Book a Free Inspection & Custom Quote",
  subtitle = "Zero Hidden Costs • 100% Odorless & Safe • Rapid Response in 30 Mins",
  compact = false,
  className = ""
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    phoneNumber: '',
    alternatePhone: '',
    service: initialService || SERVICES_DATA[0].name,
    location: initialLocation || LOCATIONS_DATA[0].name,
    propertyType: PROPERTY_TYPES[1],
    preferredDate: '',
    urgency: 'Immediate (Within 2-4 Hours)',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'phoneNumber' && phoneError) {
      setPhoneError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: 10-digit Indian phone number
    const cleanPhone = formData.phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setPhoneError('Please enter a valid 10-digit mobile number');
      return;
    }

    const message = createWhatsAppLeadMessage(formData);
    const waUrl = getWhatsAppUrl(message);

    // Open WhatsApp directly
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      phoneNumber: '',
      alternatePhone: '',
      service: initialService || SERVICES_DATA[0].name,
      location: initialLocation || LOCATIONS_DATA[0].name,
      propertyType: PROPERTY_TYPES[1],
      preferredDate: '',
      urgency: 'Immediate (Within 2-4 Hours)',
      notes: ''
    });
  };

  if (submitted) {
    return (
      <div id="enquiry-success-box" className={`bg-emerald-50 border border-brand/30 rounded-3xl p-6 sm:p-8 text-center ${className}`}>
        <div className="w-16 h-16 bg-brand/15 text-brand-dark rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-brand" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 mb-2">Connecting to WhatsApp!</h3>
        <p className="text-xs sm:text-sm text-zinc-600 mb-6 leading-relaxed max-w-md mx-auto">
          Your enquiry for <strong className="text-brand-dark">{formData.service}</strong> in <strong className="text-brand-dark">{formData.location}</strong> has been prepared. Our senior supervisor will respond on WhatsApp instantly.
        </p>

        <div className="space-y-3 max-w-sm mx-auto">
          <a
            href={getWhatsAppUrl(createWhatsAppLeadMessage(formData))}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:brightness-110 text-white font-bold py-3.5 px-6 rounded-full transition shadow-lg shadow-black/10 active:scale-95 text-sm"
          >
            <Send className="w-4 h-4" /> Open WhatsApp Chat Again
          </a>
          <a
            href={`tel:+91${COMPANY_INFO.primaryPhone}`}
            className="w-full inline-flex items-center justify-center gap-2 bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-800 font-bold py-3 px-6 rounded-full transition text-sm active:scale-95"
          >
            <Phone className="w-4 h-4 text-brand" /> Call Helpline: {COMPANY_INFO.displayPrimaryPhone}
          </a>
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-zinc-500 hover:text-brand underline mt-2 block mx-auto cursor-pointer"
          >
            Submit another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="enquiry-form-container" className={`bg-white rounded-3xl shadow-sm border border-brand/20 p-6 sm:p-8 ${className}`}>
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand/10 text-brand-dark text-xs font-bold rounded-full uppercase tracking-wider mb-2 border border-brand/20">
          <ShieldCheck className="w-3.5 h-3.5 text-brand" /> Instant WhatsApp Connect
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">{title}</h3>
        <p className="text-xs sm:text-sm text-zinc-600 mt-1">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
              Your Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              required
              placeholder="e.g. Rajesh Patil"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand text-xs sm:text-sm bg-zinc-50/60"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
              Mobile Number (WhatsApp) *
            </label>
            <input
              type="tel"
              name="phoneNumber"
              required
              placeholder="e.g. 9146969177"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 rounded-xl border ${phoneError ? 'border-red-500 bg-red-50' : 'border-zinc-200 bg-zinc-50/60'} focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand text-xs sm:text-sm`}
            />
            {phoneError && (
              <p className="text-xs text-red-600 mt-1 font-medium">{phoneError}</p>
            )}
          </div>
        </div>

        {/* Service & Location Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
              Select Pest Service *
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand text-xs sm:text-sm bg-zinc-50/60"
            >
              {SERVICES_DATA.map(s => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
              Coverage Location *
            </label>
            <select
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand text-xs sm:text-sm bg-zinc-50/60"
            >
              {LOCATIONS_DATA.map(loc => (
                <option key={loc.id} value={loc.name}>
                  {loc.name} ({loc.zone})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Property Type & Urgency */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
              Premises / Property Type
            </label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand text-xs sm:text-sm bg-zinc-50/60"
            >
              {PROPERTY_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
              Preferred Inspection Time
            </label>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand text-xs sm:text-sm bg-zinc-50/60"
            >
              <option value="Immediate (Within 2-4 Hours)">Immediate (Within 2-4 Hours)</option>
              <option value="Today Evening">Today Evening</option>
              <option value="Tomorrow Morning">Tomorrow Morning</option>
              <option value="This Coming Weekend">This Coming Weekend</option>
              <option value="Flexible / Just inquiring">Flexible / Just inquiring</option>
            </select>
          </div>
        </div>

        {!compact && (
          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
              Specific Problem / Room Details (Optional)
            </label>
            <textarea
              name="notes"
              rows={2}
              placeholder="e.g. Termite mud tubes visible on door frame in master bedroom, need urgent inspection"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand text-xs sm:text-sm bg-zinc-50/60"
            />
          </div>
        )}

        <button
          type="submit"
          id="submit-whatsapp-lead-btn"
          className="w-full py-3.5 px-6 rounded-full bg-[#25D366] hover:brightness-110 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-black/10 active:scale-95 transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" /> Get Free Inspection on WhatsApp
        </button>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-zinc-500 pt-2">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-brand" /> 100% Odorless & Safe
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-brand" /> Free Inspection
          </span>
          <span>•</span>
          <span>No Advance Payment Required</span>
        </div>
      </form>
    </div>
  );
};
