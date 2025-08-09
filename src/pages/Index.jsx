import React from 'react';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import TopMenuSection from '@/components/landing/TopMenuSection';
import EventsSection from '@/components/landing/EventsSection';
import WhyChooseUsSection from '@/components/landing/WhyChooseUsSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import Footer from '@/components/landing/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TopMenuSection />
      <EventsSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
