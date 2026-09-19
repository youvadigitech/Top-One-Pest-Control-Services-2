export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  iconName: string;
  treatmentType: string;
  warrantyPeriod: string;
  safetyRating: string;
  duration: string;
  benefits: string[];
  processSteps: { step: number; title: string; desc: string }[];
  targetPests: string[];
  faqs: { question: string; answer: string }[];
}

export interface LocationItem {
  id: string;
  slug: string;
  name: string;
  zone: string;
  title: string;
  metaDesc: string;
  hubLocation: string;
  responseTime: string;
  coveredAreas: string[];
  popularServices: string[];
  highlights: string[];
  heroImage: string;
  faqs: { question: string; answer: string }[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
  date: string;
  author: {
    name: string;
    role: string;
    credentials: string;
  };
  directAnswerAEO: string;
  contentSections: {
    heading: string;
    paragraphs: string[];
    bulletPoints?: string[];
  }[];
  tags: string[];
  image: string;
  faqs: { question: string; answer: string }[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  service: string;
  rating: number;
  review: string;
  date: string;
  verified: boolean;
}

export interface LeadFormData {
  fullName: string;
  phoneNumber: string;
  alternatePhone?: string;
  service: string;
  location: string;
  propertyType: string;
  preferredDate?: string;
  urgency: string;
  notes?: string;
}
