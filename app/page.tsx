'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from "@/config/api";
import { HeroSection } from '@/components/landing/HeroSection';
import { AboutSection } from '@/components/landing/AboutSection';
import { ModelInfoSection } from '@/components/landing/ModelInfoSection';
import { PreviewSection } from '@/components/landing/PreviewSection';
import { CTASection } from '@/components/landing/CTASection';
import { ModelDetails } from '@/types';

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [modelDetails, setModelDetails] = useState<ModelDetails | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 500;
      setShowScrollTop(prev => prev === shouldShow ? prev : shouldShow);
    };

    // Fetch Model Details
    const fetchModelDetails = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.DETAILS);
        if (res.ok) {
          const data = await res.json();
          setModelDetails(data);
        }
      } catch (error) {
        console.error("Failed to fetch model details", error);
      }
    };

    window.addEventListener('scroll', handleScroll);
    fetchModelDetails();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-cyan-900 selection:text-cyan-50 overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <ModelInfoSection modelDetails={modelDetails} />
      <PreviewSection />
      <CTASection modelDetails={modelDetails} />

      {/* Scroll To Top Button */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 p-3 bg-[#00f0ff] hover:bg-cyan-300 rounded-full shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-colors"
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0.5, pointerEvents: showScrollTop ? 'auto' : 'none' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </main>
  );
}
