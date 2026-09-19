/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { StickyContactButtons } from './components/StickyContactButtons';
import { EnquiryModal } from './components/EnquiryModal';

import { HomeView } from './views/HomeView';
import { ServicesDirectoryView } from './views/ServicesDirectoryView';
import { ServiceDetailView } from './views/ServiceDetailView';
import { LocationsDirectoryView } from './views/LocationsDirectoryView';
import { LocationDetailView } from './views/LocationDetailView';
import { BlogListView } from './views/BlogListView';
import { BlogPostView } from './views/BlogPostView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';

import { SERVICES_DATA } from './data/servicesData';
import { LOCATIONS_DATA } from './data/locationsData';
import { BLOG_POSTS } from './data/blogData';

type ViewType = 
  | 'home'
  | 'services'
  | 'service-detail'
  | 'locations'
  | 'location-detail'
  | 'blog'
  | 'blog-detail'
  | 'about'
  | 'contact';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [currentSlug, setCurrentSlug] = useState<string>('');
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState<boolean>(false);
  const [modalPresetService, setModalPresetService] = useState<string | undefined>();
  const [modalPresetLocation, setModalPresetLocation] = useState<string | undefined>();

  // Parse URL hash on mount and hashchange for deep-linking & SEO crawling
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash) {
        setCurrentView('home');
        setCurrentSlug('');
        return;
      }

      if (hash.startsWith('service-')) {
        const slug = hash.replace('service-', '');
        setCurrentView('service-detail');
        setCurrentSlug(slug);
      } else if (hash.startsWith('location-')) {
        const slug = hash.replace('location-', '');
        setCurrentView('location-detail');
        setCurrentSlug(slug);
      } else if (hash.startsWith('blog-')) {
        const slug = hash.replace('blog-', '');
        setCurrentView('blog-detail');
        setCurrentSlug(slug);
      } else if (hash === 'services') {
        setCurrentView('services');
        setCurrentSlug('');
      } else if (hash === 'locations') {
        setCurrentView('locations');
        setCurrentSlug('');
      } else if (hash === 'blog') {
        setCurrentView('blog');
        setCurrentSlug('');
      } else if (hash === 'about') {
        setCurrentView('about');
        setCurrentSlug('');
      } else if (hash === 'contact') {
        setCurrentView('contact');
        setCurrentSlug('');
      } else {
        setCurrentView('home');
        setCurrentSlug('');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Synchronize document title with current page for SEO/AEO/GEO
  useEffect(() => {
    if (currentView === 'home') {
      document.title = "Top One Pest Control Services | Odorless Pest & Termite Control in Badlapur, Thane & Mumbai";
    } else if (currentView === 'service-detail') {
      const service = SERVICES_DATA.find(s => s.slug === currentSlug);
      if (service) {
        document.title = `${service.name} in Badlapur, Thane & Mumbai | Top One Pest Control`;
      }
    } else if (currentView === 'location-detail') {
      const location = LOCATIONS_DATA.find(l => l.slug === currentSlug);
      if (location) {
        document.title = location.title;
      }
    } else if (currentView === 'services') {
      document.title = "Pest Control Services | Termite, Cockroach, Bed Bugs & Rodent Eradication";
    } else if (currentView === 'locations') {
      document.title = "Pest Control Locations: Badlapur, Ambernath, Ulhasnagar, Thane, Mumbai";
    } else if (currentView === 'blog') {
      document.title = "Pest Control Prevention Guides & Knowledge Base | Top One Pest Control";
    } else if (currentView === 'blog-detail') {
      const post = BLOG_POSTS.find(p => p.slug === currentSlug);
      if (post) {
        document.title = `${post.title} | Top One Pest Control`;
      }
    } else if (currentView === 'about') {
      document.title = "About Top One Pest Control Services | Badlapur HQ, Govt. Approved & Odorless";
    } else if (currentView === 'contact') {
      document.title = "Contact Top One Pest Control Services | Badlapur, Helpline 9146969177";
    }
  }, [currentView, currentSlug]);

  const handleNavigate = (view: string, param?: string) => {
    const targetView = view as ViewType;
    setCurrentView(targetView);
    setCurrentSlug(param || '');

    // Update URL hash
    if (targetView === 'home') {
      window.location.hash = '';
    } else if (targetView === 'service-detail' && param) {
      window.location.hash = `service-${param}`;
    } else if (targetView === 'location-detail' && param) {
      window.location.hash = `location-${param}`;
    } else if (targetView === 'blog-detail' && param) {
      window.location.hash = `blog-${param}`;
    } else {
      window.location.hash = targetView;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEnquiryModal = (service?: string, location?: string) => {
    setModalPresetService(service);
    setModalPresetLocation(location);
    setIsEnquiryModalOpen(true);
  };

  const handleCloseEnquiryModal = () => {
    setIsEnquiryModalOpen(false);
    setModalPresetService(undefined);
    setModalPresetLocation(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Header with Navigation & Helplines */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenEnquiryModal={() => handleOpenEnquiryModal()}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenEnquiryModal={() => handleOpenEnquiryModal()}
          />
        )}

        {currentView === 'services' && (
          <ServicesDirectoryView
            onNavigate={handleNavigate}
            onOpenEnquiryModal={() => handleOpenEnquiryModal()}
          />
        )}

        {currentView === 'service-detail' && (
          <ServiceDetailView
            slug={currentSlug}
            onNavigate={handleNavigate}
            onOpenEnquiryModal={() => handleOpenEnquiryModal(currentSlug)}
          />
        )}

        {currentView === 'locations' && (
          <LocationsDirectoryView
            onNavigate={handleNavigate}
            onOpenEnquiryModal={() => handleOpenEnquiryModal()}
          />
        )}

        {currentView === 'location-detail' && (
          <LocationDetailView
            slug={currentSlug}
            onNavigate={handleNavigate}
            onOpenEnquiryModal={() => handleOpenEnquiryModal(undefined, currentSlug)}
          />
        )}

        {currentView === 'blog' && (
          <BlogListView
            onNavigate={handleNavigate}
            onOpenEnquiryModal={() => handleOpenEnquiryModal()}
          />
        )}

        {currentView === 'blog-detail' && (
          <BlogPostView
            slug={currentSlug}
            onNavigate={handleNavigate}
            onOpenEnquiryModal={() => handleOpenEnquiryModal()}
          />
        )}

        {currentView === 'about' && (
          <AboutView
            onNavigate={handleNavigate}
            onOpenEnquiryModal={() => handleOpenEnquiryModal()}
          />
        )}

        {currentView === 'contact' && (
          <ContactView
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer with NAP, Services & Locations */}
      <Footer onNavigate={handleNavigate} />

      {/* Sticky Quick Contact & WhatsApp Action Buttons */}
      <StickyContactButtons
        onOpenEnquiryModal={() => handleOpenEnquiryModal()}
      />

      {/* Quick Booking Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={handleCloseEnquiryModal}
        service={modalPresetService}
        location={modalPresetLocation}
      />
    </div>
  );
}
