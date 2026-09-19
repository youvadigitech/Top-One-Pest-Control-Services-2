import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogData';
import { COMPANY_INFO } from '../data/companyData';
import { openWhatsAppDirect } from '../utils/whatsapp';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  UserCheck, 
  ShieldCheck, 
  CheckCircle2, 
  MessageCircle, 
  Phone, 
  ChevronRight,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Award,
  BookOpen
} from 'lucide-react';

interface BlogPostViewProps {
  slug: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenEnquiryModal: () => void;
}

export const BlogPostView: React.FC<BlogPostViewProps> = ({
  slug,
  onNavigate,
  onOpenEnquiryModal
}) => {
  const post = BLOG_POSTS.find(p => p.slug === slug) || BLOG_POSTS[0];
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  // Structured Data FAQPage schema for SEO/AEO/GEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <article className="w-full bg-slate-50 min-h-screen py-8 md:py-14">
      {/* Schema.org FAQ JSON-LD for Search Engine & AI crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6 flex-wrap">
          <button onClick={() => onNavigate('home')} className="hover:text-emerald-700 transition">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button onClick={() => onNavigate('blog')} className="hover:text-emerald-700 transition">
            Pest Guides
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Article Container */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-zinc-500 mb-3">
            <span className="px-3.5 py-1 bg-brand/10 text-brand-dark rounded-full font-bold">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-brand" />
              {post.readTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-brand" />
              {post.date}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          {/* Quality & Standards Verification Badge */}
          <div className="bg-zinc-50 rounded-2xl p-4 border border-brand/20 flex items-start gap-3.5 mb-8">
            <div className="w-11 h-11 rounded-xl bg-brand text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                <span>Top One Pest Control Technical Research Desk</span>
                <span className="text-[10px] text-brand-dark bg-brand/10 px-2 py-0.5 rounded-full font-bold border border-brand/20">
                  CIB Verified
                </span>
              </div>
              <div className="text-[11px] text-zinc-600 mt-1">
                Verified against Central Insecticide Board (CIB) non-toxic protocols, IS 6313 anti-termite standards, and municipal safety regulations.
              </div>
            </div>
          </div>

          {/* AEO / AIO Direct Answer Box */}
          <div className="mb-8 p-5 rounded-2xl bg-brand/5 border-2 border-brand/30 text-zinc-800">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-dark mb-2">
              <ShieldCheck className="w-4 h-4 text-brand" />
              <span>Direct Answer (AEO / AI Overview)</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-medium">
              {post.directAnswerAEO}
            </p>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden mb-8 max-h-96 bg-zinc-100">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Main Body Content Sections */}
          <div className="space-y-8 text-zinc-700 text-xs sm:text-sm leading-relaxed">
            {post.contentSections.map((sec, idx) => (
              <section key={idx} className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                  {sec.heading}
                </h2>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {p}
                  </p>
                ))}

                {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                  <ul className="space-y-2 mt-3 pt-1">
                    {sec.bulletPoints.map((bp, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                        <span className="font-medium text-zinc-800">{bp}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-zinc-200">
            <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
              Related Topics & Keywords:
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-zinc-100 text-zinc-700 text-xs rounded-full font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Comprehensive 7+ FAQ Section (SEO / AEO / GEO / AIO Optimized) */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-12 pt-8 border-t border-zinc-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand mb-1">
                    <HelpCircle className="w-4 h-4 text-brand" />
                    <span>Frequently Asked Questions & Expert Answers</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-900">
                    Questions Homeowners & Businesses Ask Most ({post.faqs.length} FAQs)
                  </h3>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <span className="text-[11px] font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    AEO / AIO Rank Ready
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {post.faqs.map((faq, fIdx) => {
                  const isOpen = openFaqIndex === fIdx;
                  return (
                    <div
                      key={fIdx}
                      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                        isOpen
                          ? 'border-brand/40 bg-brand/5 shadow-xs'
                          : 'border-zinc-200 bg-zinc-50/70 hover:border-zinc-300'
                      }`}
                    >
                      <button
                        onClick={() => toggleFaq(fIdx)}
                        className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span className="text-xs sm:text-sm font-bold text-zinc-900 flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-brand/10 text-brand text-[11px] font-extrabold flex items-center justify-center shrink-0">
                            {fIdx + 1}
                          </span>
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-brand' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-zinc-700 leading-relaxed border-t border-brand/10">
                          <p className="font-normal">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] text-zinc-500 px-1">
                <span>Verified against CIB & RC guidelines</span>
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === null ? 0 : null)}
                  className="text-brand hover:underline font-semibold cursor-pointer"
                >
                  {openFaqIndex === null ? 'Expand first FAQ' : 'Collapse all'}
                </button>
              </div>
            </div>
          )}

          {/* In-Article WhatsApp CTA Card */}
          <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-dark to-brand text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-bold">Experiencing this pest issue right now?</h3>
              <p className="text-xs text-white/90">
                Get a free consultation and customized quote directly on WhatsApp with our Badlapur team.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => openWhatsAppDirect(`Hi Top One Pest Control, I was reading your guide on "${post.title}" and would like assistance.`)}
                className="py-3 px-5 rounded-full bg-[#25D366] hover:brightness-110 text-white font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white text-white" />
                <span>WhatsApp Consult</span>
              </button>
              <button
                onClick={onOpenEnquiryModal}
                className="py-3 px-5 rounded-full bg-white hover:bg-zinc-100 text-brand-dark font-bold text-xs transition-colors cursor-pointer active:scale-95 shadow-md"
              >
                Book Inspection
              </button>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('blog')}
            className="inline-flex items-center gap-2 text-xs font-bold text-brand hover:text-brand-dark cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Pest Guides</span>
          </button>
        </div>
      </div>
    </article>
  );
};
