import React, { useState, useEffect, useRef } from 'react';
import { Instagram, MessageCircle, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BmiCalculator from './components/BmiCalculator';
import InquiryForm from './components/InquiryForm';
import ProgramsSection from './components/ProgramsSection';
import FAQSection from './components/FAQSection';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import { HERO_COPY, ABOUT_COPY } from './fitnessData';

export default function App() {
  const [prefilledGoal, setPrefilledGoal] = useState<string | undefined>(undefined);
  const [prefilledBmi, setPrefilledBmi] = useState<string | undefined>(undefined);
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToInquiry = () => {
    setMobileNavOpen(false);
    document.getElementById('intake-portal')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleApplyBmi = (bmi: string) => {
    setPrefilledBmi(bmi);
    setTimeout(() => {
      document.getElementById('intake-portal')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSelectPackage = (goalType: 'muscle' | 'fat-loss' | 'meal-plan' | 'recomp') => {
    setPrefilledGoal(goalType);
    setTimeout(() => {
      document.getElementById('intake-portal')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const navLinks = [
    { href: '#philosophy', label: 'Philosophy' },
    { href: '#testimonials-section', label: 'Results' },
    { href: '#blueprints', label: 'Blueprints' },
    { href: '#pricing-section', label: 'Pricing' },
    { href: '#calibrator', label: 'BMI Calibrator' },
    { href: '#faq-section', label: 'FAQs' },
  ];

  return (
    <div className="min-h-screen text-[#e5e2e1] bg-[#030303] bg-grid-blueprint antialiased flex flex-col relative overflow-x-hidden">
      {/* ── HEADER ── */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface-dim/80 backdrop-blur-xl border-b border-white/5 shadow-[0_0_30px_rgba(184,246,0,0.05)]'
          : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-6 max-w-container-max mx-auto">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="h-10 w-10 bg-[#b8f600] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(184,246,0,0.3)] transition-all group-hover:scale-105">
              <span className="material-symbols-outlined text-black font-bold">fitness_center</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-lg-mobile md:font-headline-lg text-[#b8f600] tracking-tighter uppercase text-xl md:text-2xl font-black">
                IB.COACH
              </span>
              <span className="text-[9px] font-mono text-[#8d9479] uppercase tracking-widest -mt-1">Physique Strategist</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-on-surface/70 font-label-sm hover:text-primary-fixed transition-colors font-mono tracking-widest text-[11px] uppercase"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollToInquiry}
              className="hidden sm:block neon-btn px-6 py-3 font-label-sm font-bold uppercase rounded hover:scale-95 transition-transform font-mono text-[11px]"
            >
              APPLY NOW
            </button>
            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-[#b8f600] p-1"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Toggle navigation"
            >
              <span className="material-symbols-outlined text-3xl">menu</span>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-surface-dim/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
            >
              <div className="px-6 py-5 space-y-4">
                {navLinks.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileNavOpen(false)}
                    className="block text-xs font-mono text-on-surface/80 hover:text-[#b8f600] uppercase tracking-widest transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  onClick={scrollToInquiry}
                  className="w-full neon-btn py-3 font-label-sm font-bold uppercase rounded text-xs tracking-wider mt-2"
                >
                  APPLY NOW
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow z-10">
        {/* ── 1. HERO SECTION ── */}
        <section
          ref={heroRef}
          id="hero"
          className="relative w-full min-h-[90vh] flex flex-col justify-center items-start px-margin-mobile md:px-margin-desktop py-20 bg-cover bg-center"
          style={{
            backgroundImage: "linear-gradient(rgba(3, 3, 3, 0.75), rgba(3, 3, 3, 0.95)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuC_rLbOvmnpv8V1LkODERzNnwNF77kqEOVBA3GEFrGSydTAphuH3zorxk_wKp5TgaxiaIxWdxiWjJt6bv8rW-YNz3Ot62UbXFllF1edM4TehxPwbxR6dQ_8NsqjKkjbBSh6bhSyKeVzFPZ9kQPBrmNclgYUUc4gvgOvfD5KK-Pror7PUHuLmpWInq2m5GzcUGwu6zy6bLcaYmoa_pdgLGHQs35naDldO2BtEEJw2FcyQyr6noHhawY9L8JkYAsUFRnMgBY4shVuFkY')"
          }}
        >
          <div className="max-w-container-max mx-auto w-full z-10 text-left">
            <div className="max-w-4xl space-y-8">
              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-[0.9] tracking-[-0.04em] uppercase"
              >
                YOUR PHYSIQUE IS A <span className="text-[#b8f600] neon-text">SCIENCE</span>.
                <br />
                STOP GUESSING.
              </motion.h1>

              {/* Proof Metrics Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap gap-6 text-left"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#b8f600] text-xl">verified</span>
                  <span className="font-label-sm text-xs text-on-surface uppercase font-mono tracking-wider">
                    8+ Years Coaching
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#b8f600] text-xl">groups</span>
                  <span className="font-label-sm text-xs text-on-surface uppercase font-mono tracking-wider">
                    200+ Clients Transformed
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#b8f600] text-xl">target</span>
                  <span className="font-label-sm text-xs text-on-surface uppercase font-mono tracking-wider">
                    94% Goal Achievement
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#b8f600] text-xl">percent</span>
                  <span className="font-label-sm text-xs text-on-surface uppercase font-mono tracking-wider">
                    Single-Digit BF%
                  </span>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <button
                  onClick={scrollToInquiry}
                  className="neon-btn px-8 py-4 font-label-sm font-bold uppercase rounded flex items-center justify-center gap-2 hover:scale-95 transition-transform font-mono text-xs tracking-wider"
                >
                  START TRANSFORMATION
                  <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </button>
                <a
                  href="#blueprints"
                  className="ghost-btn px-8 py-4 font-label-sm uppercase rounded bg-surface/50 backdrop-blur-md flex items-center justify-center gap-2 hover:bg-primary-fixed/10 transition-colors font-mono text-xs tracking-wider text-center"
                >
                  VIEW BLUEPRINTS
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 2. ABOUT SECTION (PHILOSOPHY) ── */}
        <section className="px-margin-mobile md:px-margin-desktop py-24 max-w-container-max mx-auto" id="philosophy">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
            <div className="glass-card rounded-xl p-8 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-fixed/5 rounded-full blur-3xl" />
              <h2 className="font-display text-4xl md:text-5xl text-[#b8f600] uppercase mb-6 font-black tracking-tight">
                MEET ISHAN
              </h2>
              <p className="font-body-md text-base text-on-surface/80 leading-relaxed mb-6">
                Elite physique transformation requires precision, not guesswork. My methodology relies on optimizing hypertrophy pathways and meticulous macro tracking. We don't just train; we engineer results.
              </p>
              <ul className="space-y-4 font-label-sm text-xs font-mono tracking-wider text-on-surface">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#b8f600]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  Advanced Hypertrophy Specialist
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#b8f600]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  Evidence-Based Nutrition Programming
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#b8f600]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  Biomechanical Movement Analysis
                </li>
              </ul>
            </div>
            <div className="h-full min-h-[400px] rounded-xl overflow-hidden relative border border-white/5">
              <img
                className="w-full h-full object-cover absolute inset-0"
                alt="Ishan Portrait"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEINEtoZzLV9q0y2fBmKlLisO9F4xXcQDvDPMC14M1qbzZITsgPTzVpWrOSPN99Q8AdaFhnGzMRMT2Mn72-xOPbg-vflHfV6GX0yeQRDBL-2WillL0L8KRLwoIaCRbeOeE78FdK7FMY8i7pdmQo4vuC84RXPePnkvlami7YjAbPRPXCam_oJUvyKh--eJJj2s6MN7wAE4W91PuqzzBvxGYOuiUknqSnl1_vmJRGVhGi_G6Dl37Ykl8zYCJNRR_5c9m-uFoqKn43KI"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" />
            </div>
          </div>
        </section>

        {/* ── 3. CLIENT RESULTS / TESTIMONIALS SECTION ── */}
        <section id="testimonials-section" className="px-margin-mobile md:px-margin-desktop py-12 max-w-container-max mx-auto">
          <TestimonialsSection />
        </section>

        {/* ── 4. BLUEPRINTS / PROGRAMS SECTION ── */}
        <section className="px-margin-mobile md:px-margin-desktop py-24 bg-surface-container-low/30" id="blueprints">
          <div className="max-w-container-max mx-auto">
            <ProgramsSection onSelectPackage={handleSelectPackage} />
          </div>
        </section>

        {/* ── 5. PRICING SECTION ── */}
        <section id="pricing-section" className="px-margin-mobile md:px-margin-desktop py-24 max-w-container-max mx-auto">
          <PricingSection onApply={handleSelectPackage} />
        </section>

        {/* ── 6. CALIBRATOR / BMI CALCULATOR SECTION ── */}
        <section className="px-margin-mobile md:px-margin-desktop py-24 max-w-container-max mx-auto border-t border-white/5" id="calibrator">
          <BmiCalculator onApplyBmi={handleApplyBmi} />
        </section>

        {/* ── 7. INQUIRY PORTAL ── */}
        <section id="intake-portal" className="px-margin-mobile md:px-margin-desktop py-24 max-w-4xl mx-auto">
          <InquiryForm prefilledGoal={prefilledGoal} prefilledBmi={prefilledBmi} />
        </section>

        {/* ── 8. FAQS SECTION ── */}
        <section id="faq-section" className="px-margin-mobile md:px-margin-desktop py-24 max-w-container-max mx-auto border-t border-white/5">
          <FAQSection />
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-surface-dim border-t border-white/10 mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter px-margin-mobile md:px-margin-desktop py-12 max-w-container-max mx-auto text-left">
          <div className="space-y-4">
            <div className="font-headline-lg text-white font-black tracking-tighter text-3xl uppercase">
              IB.COACH
            </div>
            <p className="font-label-sm text-xs font-mono text-on-surface/50">
              ELITE PHYSIQUE ENGINEERING
            </p>
            <p className="font-label-sm text-[10px] font-mono text-on-surface/40 leading-normal max-w-sm">
              Disclaimer: Training systems and macro plans are structured based on established exercise biomechanics and nutritional sciences. Not a substitute for formal medical advice.
            </p>
          </div>
          <div className="flex flex-col md:items-end justify-between gap-6">
            <div className="flex flex-wrap gap-6 font-mono text-xs text-on-surface/50">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} className="hover:text-[#b8f600] transition-colors uppercase">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <a
                href="https://www.instagram.com/ishan_bajaj04/"
                target="_blank"
                rel="noreferrer"
                className="text-on-surface/50 hover:text-[#b8f600] transition-colors uppercase"
              >
                Instagram
              </a>
              <a
                href="https://wa.me/917297946193"
                target="_blank"
                rel="noreferrer"
                className="text-on-surface/50 hover:text-[#b8f600] transition-colors uppercase"
              >
                WhatsApp
              </a>
            </div>
            <p className="font-label-sm text-[10px] font-mono text-on-surface/40">
              © 2026 IB.COACH. ALL RIGHTS RESERVED. MASTER YOUR ARCHITECTURE.
            </p>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WIDGETS ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* Follow Instagram */}
        <motion.a
          href="https://www.instagram.com/ishan_bajaj04/"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-lg transition-all"
          style={{
            background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
            boxShadow: '0 0 20px rgba(220,39,67,0.35)'
          }}
          aria-label="Follow on Instagram"
        >
          <Instagram className="h-4 w-4" />
          <span className="hidden sm:inline">Instagram</span>
        </motion.a>

        {/* WhatsApp Float */}
        <motion.a
          href="https://wa.me/917297946193?text=Hi%20Ishan%2C%20I%20saw%20your%20website%20and%20I'm%20interested%20in%20coaching."
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-transform"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-7 w-7 text-white fill-white" />
        </motion.a>
      </div>
    </div>
  );
}
