/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import InquiryForm from './components/InquiryForm';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import MobileFloatingCta from './components/MobileFloatingCta';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [preselectedService, setPreselectedService] = useState<string>('');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset scroll height for fixed sticky header
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleSelectServiceForInquiry = (serviceName: string) => {
    setPreselectedService(serviceName);
    handleScrollToSection('inquiry');
  };

  return (
    <div className="relative min-h-screen bg-neutral-50 flex flex-col selection:bg-brand-500 selection:text-white">
      {/* Dynamic Header */}
      <Header
        onScrollToSection={handleScrollToSection}
        onOpenInquiry={() => handleScrollToSection('inquiry')}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Areas */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onScrollToInquiry={() => handleScrollToSection('inquiry')}
          onScrollToServices={() => handleScrollToSection('services')}
        />

        {/* Specialized Services Selection Guide */}
        <Services onSelectServiceForInquiry={handleSelectServiceForInquiry} />

        {/* Work Sequence Process Steps */}
        <Process />

        {/* Dynamic Online Inquiry Form */}
        <InquiryForm
          preselectedService={preselectedService}
          onClearPreselected={() => setPreselectedService('')}
          onInquirySubmitted={() => setRefreshTrigger((prev) => prev + 1)}
        />

        {/* Accordion FAQ Area */}
        <FaqSection />
      </main>

      {/* Footer Area */}
      <Footer
        onScrollToSection={handleScrollToSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating Call & Chat Buttons for Mobile conversions */}
      <MobileFloatingCta onOpenInquiry={() => handleScrollToSection('inquiry')} />

      {/* Admin Monitoring Panel portal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        refreshTrigger={refreshTrigger}
      />
    </div>
  );
}
