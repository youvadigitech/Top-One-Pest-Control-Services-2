import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogData';
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  BookOpen, 
  UserCheck, 
  ShieldCheck, 
  HelpCircle,
  Sparkles,
  Search,
  CheckCircle2
} from 'lucide-react';

interface BlogListViewProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenEnquiryModal: () => void;
}

export const BlogListView: React.FC<BlogListViewProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Cockroach Management',
    'Termite Protection',
    'Bed Bug Solutions',
    'Bird Control Solutions',
    'Mosquito & Vector Control',
    'Rodent Eradication',
    'Wood Borer Treatment',
    'Society & Monsoon Care',
    'Commercial Pest Defense'
  ];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-zinc-50 min-h-screen py-10 md:py-16">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand/10 text-brand-dark rounded-full text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand" />
            <span>SEO, AEO, GEO, AIO & EEAT Certified Pest Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Pest Management Guides & Treatment Protocols
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 mt-3 leading-relaxed">
            Written by certified entomologists and licensed pest inspectors to provide homeowners, housing societies, and commercial businesses in Badlapur, Thane, and Mumbai with actionable prevention insights and at least 7 ranking FAQs per service.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-10 max-w-4xl mx-auto space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search treatments, pests (cockroach, termite, bed bug, pigeon net, rat, wood borer)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-zinc-200 text-xs sm:text-sm focus:outline-none focus:border-brand shadow-xs transition"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-brand text-white shadow-xs font-bold'
                    : 'bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-300'
                }`}
              >
                {cat === 'All' ? 'All Services & Guides' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post (Only shown when viewing all without search) */}
        {selectedCategory === 'All' && searchQuery === '' && BLOG_POSTS.length > 0 && (
          <div className="bg-white rounded-3xl border border-brand/20 overflow-hidden shadow-sm mb-12 group hover:border-brand transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 h-64 sm:h-80 lg:h-auto overflow-hidden bg-zinc-100 relative">
                <img
                  src={BLOG_POSTS[0].image}
                  alt={BLOG_POSTS[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-brand text-white font-bold text-xs rounded-full shadow-md">
                    Featured Service Guide
                  </span>
                </div>
              </div>
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-brand mb-2">
                    <span className="px-3 py-1 bg-brand/10 text-brand-dark rounded-full">{BLOG_POSTS[0].category}</span>
                    <span>•</span>
                    <span className="text-zinc-500">{BLOG_POSTS[0].readTime}</span>
                    <span>•</span>
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
                      {BLOG_POSTS[0].faqs?.length || 7} Ranking FAQs
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 group-hover:text-brand transition-colors leading-tight">
                    {BLOG_POSTS[0].title}
                  </h2>

                  <p className="text-xs sm:text-sm text-zinc-600 mt-3 leading-relaxed line-clamp-3">
                    {BLOG_POSTS[0].excerpt}
                  </p>

                  {/* AEO Key Answer Box */}
                  <div className="mt-4 p-4 bg-brand/5 border border-brand/20 rounded-2xl text-xs text-brand-dark">
                    <div className="font-bold flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-brand-dark mb-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand" /> Direct Answer (AEO / AIO):
                    </div>
                    <p className="line-clamp-2 text-[11px] leading-relaxed text-zinc-700">
                      {BLOG_POSTS[0].directAnswerAEO}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-zinc-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-brand" />
                    <span>Published: {BLOG_POSTS[0].date}</span>
                  </div>

                  <button
                    onClick={() => onNavigate('blog-detail', BLOG_POSTS[0].slug)}
                    className="py-2.5 px-5 bg-brand hover:bg-brand-dark text-white rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm active:scale-95"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <div
              key={post.id}
              className="bg-white rounded-2xl border border-brand/20 overflow-hidden flex flex-col justify-between shadow-xs hover:border-brand hover:shadow-md transition-all group"
            >
              <div>
                <div className="h-48 overflow-hidden bg-zinc-100 relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-3 right-3 bg-zinc-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <HelpCircle className="w-3 h-3 text-emerald-400" />
                    <span>{post.faqs?.length || 7} FAQs</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-brand mb-2">
                    <span className="px-2.5 py-0.5 bg-brand/10 text-brand-dark rounded-full">{post.category}</span>
                    <span>•</span>
                    <span className="text-zinc-500">{post.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-zinc-900 group-hover:text-brand transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-zinc-600 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((t, idx) => (
                      <span key={idx} className="text-[10px] bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-zinc-100 mt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                  <Calendar className="w-3 h-3 text-brand" />
                  <span>{post.date}</span>
                </div>
                <button
                  onClick={() => onNavigate('blog-detail', post.slug)}
                  className="text-xs font-bold text-brand hover:text-brand-dark flex items-center gap-1 group-hover:gap-1.5 transition-all cursor-pointer"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-zinc-200 p-8 max-w-md mx-auto">
            <p className="text-sm font-semibold text-zinc-600">No pest guides found matching your search.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-3 text-xs text-brand font-bold hover:underline cursor-pointer"
            >
              Clear filters and view all service guides
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
