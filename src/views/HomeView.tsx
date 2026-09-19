import React, { useState, useEffect, useRef } from 'react';
import { SERVICES_DATA } from '../data/servicesData';
import { LOCATIONS_DATA } from '../data/locationsData';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';
import { COMPANY_INFO } from '../data/companyData';
import { 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  MessageCircle, 
  ArrowRight, 
  Star, 
  ChevronDown,
  Award,
  Zap,
  Users,
  BadgePercent,
  Check,
  Shield,
  HeartHandshake,
  HelpCircle,
  FileCheck,
  Home as HomeIcon,
  Building2,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

const GoogleGIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

interface HomeViewProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenEnquiryModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenEnquiryModal }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const heroSlides = [
    {
      id: 1,
      image: COMPANY_INFO.images.hero,
      label: 'Main Office & Service Team',
      title: 'Top One Pest Control Specialist Team in Badlapur & Mumbai'
    },
    {
      id: 2,
      image: '/images/services/termites-management.jpg',
      label: 'Termite Drill-Fill-Seal',
      title: 'Drill-Fill-Seal Termites Management'
    },
    {
      id: 3,
      image: '/images/services/cockroach-control.jpg',
      label: 'Odorless Cockroach Gel',
      title: '100% Odorless Herbal Cockroach Control'
    },
    {
      id: 4,
      image: '/images/services/bird-control.jpg',
      label: 'Balcony Bird Netting',
      title: 'Anti-Pigeon Netting & Spikes Installation'
    },
    {
      id: 5,
      image: '/images/services/bed-bug-control.jpg',
      label: 'Bed Bug Eradication',
      title: '2-Step Deep Bed Bug Eradication'
    },
    {
      id: 6,
      image: '/images/services/mosquito-management.jpg',
      label: 'Society Mosquito Fogging',
      title: 'Thermal Fogging & Larvae Control'
    },
    {
      id: 7,
      image: '/images/services/wood-borer-control.jpg',
      label: 'Wood Borer Injection',
      title: 'Wood Borer & Timber Protection'
    },
    {
      id: 8,
      image: COMPANY_INFO.images.residential,
      label: 'Residential Flat Care',
      title: 'Residential Flat & Society Pest Protection'
    }
  ];

  // Auto-advance hero carousel every 5.5 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Mobile swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      nextSlide(); // Swiped left -> next
    } else if (distance < -45) {
      prevSlide(); // Swiped right -> prev
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(prev => (prev === index ? null : index));
  };

  // All 7 Curated Services
  const allServices = SERVICES_DATA;

  const whyChooseUsCards = [
    {
      icon: Award,
      title: "CIB & Govt. Approved",
      desc: "Licensed formulations approved by the Central Insecticide Board (CIB) and WHO for complete safety."
    },
    {
      icon: Sparkles,
      title: "100% Odorless & Safe",
      desc: "Herbal gels and non-toxic sprays safe for children, pets, senior citizens, and pregnant women."
    },
    {
      icon: CheckCircle2,
      title: "Up to 5-Year Protection",
      desc: "Official written service certificates with complimentary re-service if pests reappear during the coverage period."
    },
    {
      icon: Zap,
      title: "20-30 Min Rapid Response",
      desc: "Local mobile response teams stationed across Badlapur, Thane, and Mumbai for same-day dispatch."
    },
    {
      icon: Users,
      title: "Trained & Verified Experts",
      desc: "10+ years of hands-on technical pest management with background-verified, uniformed technicians."
    },
    {
      icon: BadgePercent,
      title: "Fair & Transparent Pricing",
      desc: "Free visual inspections with zero hidden costs, customized exactly to your property size and infestation."
    },
    {
      icon: HeartHandshake,
      title: "4.9★ Customer Satisfaction",
      desc: "Trusted by over 18,500+ happy homeowners and commercial facilities with 520+ verified Google reviews."
    },
    {
      icon: MapPin,
      title: "Local Headquarters",
      desc: "Registered headquarters in Katrap, Badlapur East with deep familiarity of local pests across MMR."
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Inspection",
      desc: "Comprehensive site audit to map infestation hotspots, moisture sources, and pest entry routes."
    },
    {
      step: "02",
      title: "Species Identification",
      desc: "Scientific entomological assessment and customized treatment blueprint tailored to your property."
    },
    {
      step: "03",
      title: "Targeted Treatment",
      desc: "Application of odorless herbal gels, drill-fill-seal barriers, syringe injections, and eco-safe sprays."
    },
    {
      step: "04",
      title: "Structural Protection",
      desc: "Sealing vulnerable ingress voids and installing protective long-acting chemical barriers."
    },
    {
      step: "05",
      title: "Service Certificate & Follow-up",
      desc: "Scheduled post-treatment monitoring, official service certificate handover, and prevention guidance."
    }
  ];

  const keyLocationHighlights = [
    {
      name: "Badlapur (Head Office)",
      zone: "Primary Hub",
      coverage: "Katrap, Surya Nagar, East & West, Shirgaon, Kulgaon",
      time: "20 - 30 Mins",
      slug: "badlapur"
    },
    {
      name: "Ambernath",
      zone: "Central Corridor",
      coverage: "Ambernath East & West, Anand Nagar MIDC, Morivali",
      time: "25 - 35 Mins",
      slug: "ambernath"
    },
    {
      name: "Ulhasnagar",
      zone: "Market Hub",
      coverage: "Camp 1 to 5, Section 17, Furniture Market, Station Rd",
      time: "25 - 40 Mins",
      slug: "ulhasnagar"
    },
    {
      name: "Thane Zone",
      zone: "City & Suburbs",
      coverage: "Ghodbunder Road, Majiwada, Vartak Nagar, Kalyan, Dombivli",
      time: "30 - 45 Mins",
      slug: "thane-zone"
    },
    {
      name: "Central Zone",
      zone: "Central Suburbs",
      coverage: "Mulund, Bhandup, Ghatkopar, Kurla, Sion, Dadar Central",
      time: "35 - 50 Mins",
      slug: "central-zone"
    },
    {
      name: "Mumbai",
      zone: "Island City",
      coverage: "South Mumbai, Worli, Lower Parel, Byculla, Marine Lines",
      time: "40 - 55 Mins",
      slug: "mumbai"
    },
    {
      name: "Navi Mumbai",
      zone: "Planned Nodes",
      coverage: "Vashi, Nerul, Belapur, Kharghar, Panvel, Airoli, Kopar Khairane",
      time: "30 - 45 Mins",
      slug: "navi-mumbai"
    },
    {
      name: "Western Zone",
      zone: "Western Suburbs",
      coverage: "Bandra, Andheri, Goregaon, Malad, Kandivali, Borivali, Mira Road",
      time: "35 - 50 Mins",
      slug: "western-zone"
    }
  ];

  const faqs = [
    {
      q: "Who provides the best pest control services in Mumbai?",
      a: "Top One Pest Control Services is widely recognized as one of the best pest control services in Mumbai, Thane, and Badlapur. With over a decade of field experience, 18,500+ satisfied residential and commercial clients, Central Insecticide Board (CIB) approved odorless herbal formulations, and up to 5-year written warranties, we deliver reliable, safe, and prompt pest eradication."
    },
    {
      q: "Are your pest control chemicals safe for infants, seniors, and pets?",
      a: "Yes, 100%. We exclusively use odorless, non-hazardous, WHO and CIB-approved formulations and herbal gel baits. They release zero noxious fumes or toxic vapors, making them completely safe for babies, pregnant women, elderly family members, and domestic pets (dogs, cats, birds)."
    },
    {
      q: "Do I need to empty kitchen cabinets or vacate my home during cockroach treatment?",
      a: "No! Unlike outdated, smelly pesticide sprays, our advanced herbal cockroach control utilizes micro-dot odorless gel baiting. You do not need to empty kitchen cupboards, cover utensils, or step outside during or after treatment."
    },
    {
      q: "What service certificate and coverage do you provide for termite and bed bug control?",
      a: "We provide official written service certificates: up to 5-Year protection plans for Drill-Fill-Seal Termite Management, and a 90-Day complete peace-of-mind coverage for 2-round Bed Bug Control. In the rare event of pest recurrence in treated zones during the coverage period, we provide complete re-treatment at zero additional cost."
    },
    {
      q: "How does balcony bird netting work, and will it block ventilation or views?",
      a: "Our bird control utilizes translucent, UV-stabilized copolymer garware netting and SS304 stainless steel bird spikes. The netting has a 15mm or 25mm mesh that is practically invisible from a distance, allows 100% natural breeze and sunlight, and humanely prevents pigeons from nesting and fouling your balcony."
    },
    {
      q: "How fast can your technicians arrive in Badlapur, Thane, or Mumbai?",
      a: "Our registered headquarters is situated in Katrap, Badlapur East, with dedicated mobile response teams stationed throughout Thane, Central Suburbs, Navi Mumbai, and Western Suburbs. We typically arrive within 20 to 45 minutes for urgent inspections and same-day emergency treatments."
    }
  ];

  return (
    <div className="w-full">
      {/* 1. HERO SECTION - Full Width Responsive Image Carousel with Clean Dedicated Content Below */}
      <section 
        className="relative w-full pt-16 sm:pt-20 bg-white select-none"
        aria-label="Hero Section"
      >
        {/* Full-width Edge-to-Edge Responsive Image Carousel (NO TEXT OVERLAY ON IMAGE) */}
        <div 
          className="relative w-full overflow-hidden bg-zinc-950 group h-56 sm:h-72 md:h-96 lg:h-[480px] xl:h-[540px] 2xl:h-[600px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}

          {/* Navigation Arrows on Carousel Edges */}
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-2.5 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3.5 rounded-full bg-black/40 hover:bg-brand text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-2.5 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3.5 rounded-full bg-black/40 hover:bg-brand text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Clean Slide Indicator Dots */}
          <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 bg-black/50 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20">
            {heroSlides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentSlide
                    ? 'w-6 sm:w-8 h-2 sm:h-2.5 bg-brand shadow-sm'
                    : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Carousel Service Quick-Selector Bar (Mobile Horizontal Scrollable) */}
        <div className="bg-zinc-100/90 border-y border-zinc-200 py-2.5 px-3 sm:px-6 overflow-x-auto scrollbar-none">
          <div className="max-w-[90rem] mx-auto flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 min-w-max">
            <span className="text-[11px] uppercase tracking-wider font-bold text-zinc-500 mr-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand" /> Services:
            </span>
            {heroSlides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  currentSlide === idx
                    ? 'bg-brand text-white shadow-xs font-bold'
                    : 'bg-white text-zinc-700 border border-zinc-300 hover:border-brand hover:text-brand'
                }`}
              >
                {slide.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dedicated Hero Text & Action Section (Green theme, highly readable, adjusted cleanly below image) */}
        <div className="bg-gradient-to-b from-brand-mint/40 via-white to-zinc-50 py-10 sm:py-16 border-b border-brand/15">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 w-full">
            <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
              
              {/* Govt. Approved & CIB Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 border border-brand/25 px-4 py-1.5 text-xs sm:text-sm font-bold text-brand-dark shadow-xs">
                <ShieldCheck className="h-4 w-4 text-brand shrink-0" />
                <span>#1 Govt. Approved & CIB-Certified Pest Control in Badlapur, Thane & Mumbai</span>
              </div>

              {/* Tagline */}
              <p className="text-brand-dark font-extrabold text-xs sm:text-sm tracking-wider uppercase">
                Top One Pest Control Services • Sure We Care
              </p>

              {/* Main Heading H1 */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 leading-tight tracking-tight">
                Best Pest Control Services in <span className="text-brand">Mumbai, Thane & Badlapur</span>
              </h1>

              {/* Sub-headline */}
              <p className="text-base sm:text-xl font-bold text-zinc-800 leading-snug">
                100% Odorless Herbal Pest Control & Guaranteed Anti-Termite Protection
              </p>

              {/* Comprehensive Description */}
              <p className="text-xs sm:text-sm lg:text-base text-zinc-600 max-w-3xl mx-auto leading-relaxed">
                Looking for the best pest control services in Mumbai? Top One Pest Control Services delivers fast, safe, and eco-friendly solutions across Badlapur, Ambernath, Ulhasnagar, Thane Zone, Central Zone, Mumbai, Navi Mumbai, and Western Zone. Certified specialists in Cockroach, Termite, Bed Bug, Bird Netting, Mosquito, Rodent, and Wood Borer eradication.
              </p>

              {/* 4 Key Benefit Highlights Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-left">
                <div className="bg-white p-3.5 rounded-2xl border border-zinc-200 shadow-2xs flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-brand/15 text-brand flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900">100% Odorless Gel</div>
                    <div className="text-[11px] text-zinc-500">No smell & no vacating</div>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-zinc-200 shadow-2xs flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-brand/15 text-brand flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900">Child & Pet Safe</div>
                    <div className="text-[11px] text-zinc-500">CIB & WHO approved</div>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-zinc-200 shadow-2xs flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-brand/15 text-brand flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900">Up to 5-Yr Warranty</div>
                    <div className="text-[11px] text-zinc-500">Free re-service guarantee</div>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-zinc-200 shadow-2xs flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-brand/15 text-brand flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900">20–30 Min Rapid Arrival</div>
                    <div className="text-[11px] text-zinc-500">From Badlapur HQ</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons with Primary & Secondary Helplines */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-3">
                <button
                  onClick={onOpenEnquiryModal}
                  className="inline-flex items-center gap-2 rounded-full bg-brand hover:bg-brand-dark text-white px-5 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold shadow-lg shadow-brand/25 transition-all active:scale-95 cursor-pointer"
                >
                  <Clock className="h-4 w-4" />
                  <span>Get Free Inspection</span>
                </button>

                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/20 transition-all active:scale-95"
                >
                  <MessageCircle className="h-4 sm:h-5 w-4 sm:w-5 fill-white" />
                  <span>WhatsApp Quote</span>
                </a>

                {/* Primary Helpline */}
                <a
                  href={`tel:${COMPANY_INFO.telPrimary}`}
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border-2 border-brand text-brand-dark hover:bg-brand hover:text-white px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold transition-all active:scale-95"
                  title="Call Primary Helpline"
                >
                  <Phone className="h-4 w-4 text-brand" />
                  <span>Call 91469 69177</span>
                </a>

                {/* Secondary Helpline */}
                <a
                  href={`tel:${COMPANY_INFO.telSecondary}`}
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-zinc-300 bg-white hover:border-brand hover:text-brand text-zinc-700 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-all active:scale-95"
                  title="Call Secondary Helpline"
                >
                  <Phone className="h-4 w-4 text-zinc-500" />
                  <span>Call 74004 83787</span>
                </a>
              </div>

              {/* Direct Helpline 24/7 Text & Google Reviews Trust Badge */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-600">
                <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-zinc-200 shadow-2xs">
                  <GoogleGIcon className="w-4 h-4" />
                  <span className="font-bold text-zinc-900">4.9 / 5.0</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-zinc-500 font-medium">(520+ Reviews)</span>
                </div>
                <span className="text-zinc-600 font-medium">18,500+ Homes & Societies Protected across Mumbai & Thane</span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. TICKER MARQUEE */}
      <section className="bg-brand-dark py-4 overflow-hidden border-y border-white/10" aria-label="Highlights">
        <div className="flex items-center whitespace-nowrap animate-marquee">
          {[...COMPANY_INFO.marqueeBadges, ...COMPANY_INFO.marqueeBadges, ...COMPANY_INFO.marqueeBadges, ...COMPANY_INFO.marqueeBadges].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 mx-8 text-white font-semibold text-sm sm:text-base">
              <ShieldCheck className="h-5 w-5 text-brand-light shrink-0" />
              <span>{item}</span>
              <span className="text-white/40 ml-6">•</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. AIO / AEO DIRECT ANSWER BOX (Optimized for Google AI Overviews & Voice Search) */}
      <section className="py-12 bg-emerald-50/60 border-b border-emerald-100">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-brand/15 text-brand-dark flex items-center justify-center font-bold">
                <Sparkles className="h-5 w-5 text-brand" />
              </div>
              <div>
                <span className="text-xs font-bold text-brand uppercase tracking-wider">
                  AI Overview & Quick Answer
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">
                  At a Glance: Why Choose Top One for Pest Control in Mumbai?
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-3">
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                <div className="text-xs font-bold text-brand uppercase">Treatment Safety</div>
                <div className="text-sm font-bold text-zinc-900 mt-1">100% Odorless & Herbal</div>
                <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                  Central Insecticide Board (CIB) approved chemicals safe for infants, elderly, and pets with zero smell.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                <div className="text-xs font-bold text-brand uppercase">Certified Protection</div>
                <div className="text-sm font-bold text-zinc-900 mt-1">Up to 5-Year Protection Plan</div>
                <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                  Official written service certificates with free re-treatment policy if pests reappear during the coverage period.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                <div className="text-xs font-bold text-brand uppercase">Response Speed</div>
                <div className="text-sm font-bold text-zinc-900 mt-1">20 - 30 Min Arrival</div>
                <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                  Rapid mobile units dispatched across Badlapur, Ambernath, Ulhasnagar, Thane, Mumbai, and Navi Mumbai.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                <div className="text-xs font-bold text-brand uppercase">Verified Reputation</div>
                <div className="text-sm font-bold text-zinc-900 mt-1">4.9/5 Rating (520+ Reviews)</div>
                <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                  Over 18,500+ successful treatments for apartments, bungalows, modular kitchens, and commercial towers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR 7 CORE SERVICES */}
      <section className="py-20 bg-zinc-50/70" id="services">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-brand font-bold uppercase tracking-wider text-xs sm:text-sm">
              Our 7 Specialized Pest Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-2 tracking-tight">
              Complete Pest Control & Eradication Services in Mumbai
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base mt-3 leading-relaxed">
              Safe, odorless, and government-approved treatments designed specifically for apartments, high-rise societies, bungalows, and commercial facilities.
            </p>
          </div>

          {/* 7 Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allServices.map(service => (
              <div
                key={service.id}
                className="rounded-2xl bg-white border border-brand/20 overflow-hidden shadow-xs hover:shadow-xl hover:border-brand transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Service Image with Warranty Badge */}
                  <div className="h-52 overflow-hidden bg-zinc-100 relative">
                    <img
                      src={service.image}
                      alt={`${service.name} in Mumbai`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-zinc-900/90 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                      {service.warrantyPeriod.split(',')[0]}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <div className="text-[11px] font-bold text-brand uppercase tracking-wider mb-1">
                      {service.treatmentType.split('+')[0].trim()}
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 group-hover:text-brand-dark transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs text-zinc-600 mt-2 line-clamp-2 leading-relaxed">
                      {service.shortDesc}
                    </p>

                    {/* Features checklist */}
                    <div className="mt-4 pt-3 border-t border-zinc-100 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-medium text-zinc-700">
                        <Check className="h-3.5 w-3.5 text-brand shrink-0" />
                        <span>{service.safetyRating}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-zinc-700">
                        <Check className="h-3.5 w-3.5 text-brand shrink-0" />
                        <span>Duration: {service.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-5 pt-0 space-y-2">
                  <button
                    onClick={() => onNavigate('service-detail', service.slug)}
                    className="w-full py-2.5 px-4 rounded-full border border-brand text-brand-dark hover:bg-brand hover:text-white font-semibold text-xs sm:text-sm transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>More Details</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hi%20Top%20One%20Pest%20Control,%20I%20would%20like%20to%20enquire%20about%20${encodeURIComponent(service.name)}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-full bg-[#25D366] text-white hover:brightness-110 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                  >
                    <MessageCircle className="h-4 w-4 fill-white" />
                    <span>WhatsApp Quote</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* View All Services Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 rounded-full bg-brand text-white px-8 py-3.5 font-bold hover:bg-brand-dark transition-all shadow-lg shadow-brand/30 active:scale-95 cursor-pointer"
            >
              <span>View Services Directory</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US (EEAT CREDENTIALS) */}
      <section className="py-20 bg-white" id="why-choose-us">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-brand font-bold uppercase tracking-wider text-xs sm:text-sm">
              Why Choose Top One
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-2 tracking-tight">
              Certified Pest Exterminators You Can Trust
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base mt-3 leading-relaxed">
              We combine scientific pest management, government-approved eco-friendly formulations, and certified long-term protection plans.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUsCards.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-brand/15 p-6 hover:border-brand hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="h-12 w-12 rounded-xl bg-brand/10 text-brand-dark flex items-center justify-center mb-4 group-hover:bg-brand group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-bold text-zinc-900 group-hover:text-brand-dark transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. EMERGENCY ASSISTANCE BANNER */}
      <section className="mx-auto max-w-[90rem] px-4 sm:px-6 my-4">
        <div className="rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-brand-dark p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-brand-light font-bold text-xs uppercase tracking-wider">
              <Zap className="h-4 w-4" />
              <span>Same-Day Emergency Service</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Need Urgent Pest Control in Mumbai or Thane?
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 max-w-xl">
              Our certified technicians arrive within 20 to 30 minutes across Badlapur, Ambernath, Ulhasnagar, Thane, and Mumbai with zero inspection charges.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-6 py-3.5 text-sm sm:text-base font-bold shadow-lg hover:brightness-110 transition-all active:scale-95"
            >
              <MessageCircle className="h-5 w-5 fill-white" />
              <span>WhatsApp Now</span>
            </a>

            <a
              href={`tel:${COMPANY_INFO.telPrimary}`}
              className="inline-flex items-center gap-2 rounded-full bg-white text-zinc-900 px-6 py-3.5 text-sm sm:text-base font-bold shadow-lg hover:bg-brand-light hover:text-white transition-all active:scale-95 shrink-0"
            >
              <Phone className="h-5 w-5 text-brand" />
              <span>Call {COMPANY_INFO.telDisplay}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 7. OUR SCIENTIFIC PROCESS */}
      <section className="py-20 bg-white" id="how-we-work">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-brand font-bold uppercase tracking-wider text-xs sm:text-sm">
              Proven 5-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-2 tracking-tight">
              How Our Pest Elimination System Works
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base mt-3 leading-relaxed">
              Every property undergoes an entomological audit and targeted biological eradication for permanent pest-free living.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-zinc-50 border border-brand/15 p-6 text-center hover:border-brand hover:shadow-md transition-all relative group"
              >
                <div className="text-3xl font-black text-brand mb-3">
                  {step.step}
                </div>
                <h3 className="text-base font-bold text-zinc-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. LOCATION SEO & GEO COVERAGE AREAS */}
      <section className="py-20 bg-zinc-950 text-white" id="service-areas">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-brand-light font-bold uppercase tracking-wider text-xs sm:text-sm">
              Local SEO & Regional Coverage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
              Pest Control Service Areas Across Mumbai Metropolitan Region
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-3 leading-relaxed">
              We provide rapid technician arrival across 8 key operational zones with dedicated local dispatch teams.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {keyLocationHighlights.map((loc, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 flex flex-col justify-between hover:border-brand transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-brand-light bg-brand/10 px-2.5 py-0.5 rounded-full border border-brand/20">
                      {loc.time} Arrival
                    </span>
                    <MapPin className="h-4 w-4 text-zinc-500 group-hover:text-brand-light transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-light transition-colors">
                    {loc.name}
                  </h3>
                  <div className="text-xs text-brand font-semibold mt-0.5 mb-2">
                    {loc.zone}
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    <strong className="text-zinc-300">Areas:</strong> {loc.coverage}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('location-detail', loc.slug)}
                    className="flex-1 py-2 px-3 rounded-full bg-zinc-800 hover:bg-brand text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Area Details</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>

                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hi%20Top%20One%20Pest%20Control,%20I%20need%20inspection%20in%20${encodeURIComponent(loc.name)}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full bg-[#25D366] text-white hover:brightness-110 transition-all"
                    title={`WhatsApp Enquiry for ${loc.name}`}
                  >
                    <MessageCircle className="h-4 w-4 fill-white" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('locations')}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-800 border border-zinc-700 hover:border-brand text-white px-8 py-3.5 font-bold hover:text-brand-light transition-all cursor-pointer"
            >
              <span>Explore All Service Areas & Local Hubs</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS - Google Review Integration */}
      <section className="py-20 bg-white" id="testimonials">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6">
          {/* Top Google Reviews Header & Rating Showcase */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-zinc-100">
            <div>
              {/* Google Verified Pill */}
              <div className="inline-flex items-center gap-2 rounded-full bg-zinc-50 border border-zinc-200/80 px-3.5 py-1.5 text-xs font-semibold text-zinc-800 shadow-2xs mb-3">
                <GoogleGIcon className="w-4 h-4 shrink-0" />
                <span className="font-bold">Google Verified Customer Reviews</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                What Mumbai & Thane Clients Say
              </h2>

              <div className="flex flex-wrap items-center gap-3 mt-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-base font-extrabold text-zinc-900">4.9 / 5.0</span>
                <span className="text-zinc-400">•</span>
                <span className="text-sm font-semibold text-zinc-600">520+ Verified Google Reviews</span>
              </div>
            </div>

            {/* Google Review Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={COMPANY_INFO.googleReviewUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand hover:bg-brand-dark text-white px-5 py-3 text-xs sm:text-sm font-bold shadow-md shadow-brand/20 transition-all active:scale-95 cursor-pointer"
                title="Review Top One Pest Control Services on Google"
              >
                <GoogleGIcon className="w-4 h-4 bg-white rounded-full p-0.5" />
                <span>Write a Google Review</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href={COMPANY_INFO.googleReviewUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 hover:border-brand hover:text-brand-dark bg-white text-zinc-700 px-4 py-3 text-xs sm:text-sm font-bold transition-all active:scale-95 shadow-2xs cursor-pointer"
                title="View All Google Reviews"
              >
                <GoogleGIcon className="w-4 h-4 shrink-0" />
                <span>All 520+ Reviews</span>
              </a>
            </div>
          </div>

          {/* Testimonials Grid with Google Review Badges */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS_DATA.map(review => (
              <div
                key={review.id}
                className="rounded-2xl bg-zinc-50/80 border border-brand/15 hover:border-brand p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  {/* Top Bar with Google Review Badge & Stars */}
                  <div className="flex items-center justify-between gap-2 mb-3.5 pb-3 border-b border-zinc-200/60">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600">
                      <GoogleGIcon className="w-4 h-4 shrink-0" />
                      <span>Google Review</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-100" />
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-zinc-700 italic leading-relaxed mb-4">
                    "{review.review}"
                  </p>
                </div>

                {/* Reviewer Details */}
                <div className="pt-3 border-t border-zinc-200/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-brand/15 text-brand-dark font-extrabold text-xs flex items-center justify-center shrink-0 border border-brand/30">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-zinc-900 text-xs sm:text-sm group-hover:text-brand-dark transition-colors">
                        {review.name}
                      </div>
                      <div className="text-[11px] text-zinc-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-brand" />
                        <span>{review.location}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] sm:text-[11px] font-semibold text-brand-dark bg-brand/10 border border-brand/20 px-2.5 py-0.5 rounded-full shrink-0">
                    {review.service.split('(')[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout: Share Your Experience on Google */}
          <div className="mt-12 rounded-3xl bg-zinc-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-zinc-800 shadow-lg">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-md">
                <GoogleGIcon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Have You Used Top One Pest Control Services?
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
                  Share your experience on Google to help fellow residents in Badlapur, Thane, and Mumbai find safe, odorless pest extermination.
                </p>
              </div>
            </div>

            <a
              href={COMPANY_INFO.googleReviewUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-brand hover:bg-brand-light text-white px-6 py-3.5 text-xs sm:text-sm font-bold shadow-lg shadow-brand/30 transition-all active:scale-95 shrink-0 cursor-pointer"
            >
              <Star className="w-4 h-4 fill-white" />
              <span>Leave a 5-Star Review on Google</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 10. FAQS - AEO & VOICE SEARCH OPTIMIZED */}
      <section className="py-20 bg-zinc-50/70" id="faq">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-brand font-bold uppercase tracking-wider text-xs sm:text-sm">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-2 tracking-tight">
              Pest Control Queries & Direct Answers
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base mt-3 leading-relaxed">
              Clear answers to the most common questions about best pest control services in Mumbai, odorless chemicals, and protection plans.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-brand/20 overflow-hidden bg-white shadow-2xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-zinc-900 hover:text-brand-dark transition-colors cursor-pointer text-sm sm:text-base"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-brand shrink-0 transition-transform duration-200 ${
                      activeFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-brand/10 pt-3 animate-fade-up">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA BANNER */}
      <section className="mx-auto max-w-[90rem] px-4 sm:px-6 pb-20">
        <div className="rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-brand-dark p-10 sm:p-14 text-white text-center shadow-2xl space-y-6">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Schedule Your Free Pest Inspection Today
          </h2>
          <p className="text-sm sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Contact Mumbai's top-rated pest control team for fast, safe, and odorless eradication across Badlapur, Ambernath, Ulhasnagar, Thane, and Mumbai.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <button
              onClick={onOpenEnquiryModal}
              className="inline-flex items-center gap-2 rounded-full bg-brand hover:bg-brand-dark text-white px-7 py-3.5 text-sm sm:text-base font-bold shadow-lg shadow-brand/30 transition-all active:scale-95 cursor-pointer"
            >
              <Clock className="h-4 w-4" />
              <span>Get Free Inspection</span>
            </button>

            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-7 py-3.5 text-sm sm:text-base font-bold shadow-lg shadow-black/20 hover:brightness-110 transition-all active:scale-95"
            >
              <MessageCircle className="h-5 w-5 fill-white" />
              <span>WhatsApp Now</span>
            </a>

            <a
              href={`tel:${COMPANY_INFO.telPrimary}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white text-white px-7 py-3.5 text-sm sm:text-base font-bold hover:bg-white hover:text-zinc-900 transition-all active:scale-95"
            >
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
