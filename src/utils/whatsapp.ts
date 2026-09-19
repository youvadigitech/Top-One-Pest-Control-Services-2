import { LeadFormData } from '../types';
import { COMPANY_INFO } from '../data/companyData';

export function createWhatsAppLeadMessage(data: LeadFormData): string {
  const lines = [
    `*NEW ENQUIRY - TOP ONE PEST CONTROL*`,
    `----------------------------------------`,
    `👤 *Customer Name:* ${data.fullName || 'Not specified'}`,
    `📞 *Phone Number:* ${data.phoneNumber}`,
    data.alternatePhone ? `📱 *Alt Phone:* ${data.alternatePhone}` : null,
    `🛡️ *Service Required:* ${data.service}`,
    `📍 *Location / Area:* ${data.location}`,
    `🏢 *Property Type:* ${data.propertyType}`,
    data.preferredDate ? `📅 *Preferred Date:* ${data.preferredDate}` : null,
    `⚡ *Urgency:* ${data.urgency || 'Standard (Within 24 Hours)'}`,
    data.notes ? `📝 *Specific Issue:* ${data.notes}` : null,
    `----------------------------------------`,
    `_Sent via Top One Pest Control Services Portal_`
  ].filter(Boolean);

  return lines.join('\n');
}

export function getWhatsAppUrl(message: string): string {
  const cleanNumber = COMPANY_INFO.whatsappNumber.replace(/\D/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export function openWhatsAppDirect(message?: string): void {
  const defaultMsg = message || `Hello Top One Pest Control Services, I would like to book a free inspection and get a quote for pest control at my premises.`;
  const url = getWhatsAppUrl(defaultMsg);
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function openPhoneCall(phoneNumber: string = COMPANY_INFO.primaryPhone): void {
  window.location.href = `tel:+91${phoneNumber.replace(/\D/g, '')}`;
}
