import React, { useState, useEffect, useRef } from 'react';
import { Instagram, MessageCircle, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BmiCalculator from './components/BmiCalculator';
import InquiryForm from './components/InquiryForm';
import ProgramsSection from './components/ProgramsSection';
import FAQSection from './components/FAQSection';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import BiomechanicsGuide from './components/BiomechanicsGuide';
import PhysiqueAudit from './components/PhysiqueAudit';
import AnnouncementBar from './components/AnnouncementBar';
import StatsCounter from './components/StatsCounter';
import TransformationGallery from './components/TransformationGallery';
import TDEECalculator from './components/TDEECalculator';
import LeadMagnet from './components/LeadMagnet';
import BlogTips from './components/BlogTips';
import BookingCalendar from './components/BookingCalendar';
import { HERO_COPY, ABOUT_COPY } from './fitnessData';

export default function App() {
  const [prefilledGoal, setPrefilledGoal] = useState<string | undefined>(undefined);
  const [prefilledBmi, setPrefilledBmi] = useState<string | undefined>(undefined);
  const [prefilledCalories, setPrefilledCalories] = useState<number | undefined>(undefined);
  const [prefilledTdee, setPrefilledTdee] = useState<number | undefined>(undefined);
  const [prefilledAudit, setPrefilledAudit] = useState<string | undefined>(undefined);
  const [whatsAppOpen, setWhatsAppOpen] = useState(false);
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

  const handleApplyBmi = (bmi: string, calories: number) => {
    setPrefilledBmi(bmi);
    setPrefilledCalories(calories);
    setTimeout(() => {
      document.getElementById('intake-portal')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleApplyTdee = (calories: number) => {
    setPrefilledTdee(calories);
    setPrefilledCalories(calories);
    setTimeout(() => {
      document.getElementById('intake-portal')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleApplyAudit = (auditSummary: string, goal: string) => {
    setPrefilledAudit(auditSummary);
    setPrefilledGoal(goal);
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
    { href: '#transformations', label: 'Transformations' },
    { href: '#blueprints', label: 'Blueprints' },
    { href: '#pricing-section', label: 'Pricing' },
    { href: '#book-call', label: 'Book Call' },
    { href: '#tdee-calculator', label: 'TDEE' },
    { href: '#free-plan', label: 'Free Plan' },
    { href: '#coaching-intel', label: 'Tips' },
    { href: '#faq-section', label: 'FAQs' },
  ];

  return (
    <div className="min-h-screen text-[#e5e2e1] bg-[#030303] bg-grid-blueprint antialiased flex flex-col relative overflow-x-hidden">
      {/* ── ANNOUNCEMENT BAR ── */}
      <AnnouncementBar />

      {/* ── HEADER ── */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ?         'bg-[#111111]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_0_30px_rgba(225,29,72,0.06)]'
          : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-6 max-w-container-max mx-auto">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="h-10 w-10 bg-[#e11d48] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(225,29,72,0.4)] transition-all group-hover:scale-105">
              <span className="material-symbols-outlined text-black font-bold">fitness_center</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-lg-mobile md:font-headline-lg text-[#e11d48] tracking-tighter uppercase text-xl md:text-2xl font-black">
                IB.COACH
              </span>
              <span className="text-[9px] font-mono text-[#9ca3af] uppercase tracking-widest -mt-1">Physique Strategist</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-on-surface/70 font-label-sm hover:text-[#fb7185] transition-colors font-mono tracking-widest text-[11px] uppercase"
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
              className="md:hidden text-[#e11d48] p-1"
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
                    className="block text-xs font-mono text-on-surface/80 hover:text-[#e11d48] uppercase tracking-widest transition-colors"
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
            backgroundImage: "linear-gradient(135deg, rgba(5,5,5,0.88) 0%, rgba(20,5,8,0.82) 60%, rgba(5,5,5,0.95) 100%), url('/hero_bg_red.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
                YOUR PHYSIQUE IS A <span className="text-[#e11d48] neon-text">SCIENCE</span>.
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
                  <span className="material-symbols-outlined text-[#e11d48] text-xl">verified</span>
                  <span className="font-label-sm text-xs text-on-surface uppercase font-mono tracking-wider">
                    8+ Years Coaching
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#e11d48] text-xl">groups</span>
                  <span className="font-label-sm text-xs text-on-surface uppercase font-mono tracking-wider">
                    200+ Clients Transformed
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#e11d48] text-xl">target</span>
                  <span className="font-label-sm text-xs text-on-surface uppercase font-mono tracking-wider">
                    94% Goal Achievement
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#e11d48] text-xl">percent</span>
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

        {/* ── 1.5 STATS COUNTER ── */}
        <StatsCounter />

        {/* ── 2. ABOUT SECTION (PHILOSOPHY) ── */}
        <section className="px-margin-mobile md:px-margin-desktop py-24 max-w-container-max mx-auto" id="philosophy">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
            <div className="glass-card rounded-xl p-8 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-fixed/5 rounded-full blur-3xl" />
              <h2 className="font-display text-4xl md:text-5xl text-[#e11d48] uppercase mb-6 font-black tracking-tight">
                MEET ISHAN
              </h2>
              <p className="font-body-md text-base text-on-surface/80 leading-relaxed mb-6">
                Elite physique transformation requires precision, not guesswork. My methodology relies on optimizing hypertrophy pathways and meticulous macro tracking. We don't just train; we engineer results.
              </p>
              <ul className="space-y-4 font-label-sm text-xs font-mono tracking-wider text-on-surface">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#e11d48]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  Advanced Hypertrophy Specialist
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#e11d48]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  Evidence-Based Nutrition Programming
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#e11d48]" style={{ fontVariationSettings: "'FILL' 1" }}>
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

        {/* ── 3.5 TRANSFORMATION GALLERY ── */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <TransformationGallery />
        </section>

        {/* ── 3.6 BIOMECHANICS FORM GUIDE ── */}
        <section className="px-margin-mobile md:px-margin-desktop py-24 border-t border-white/5 max-w-container-max mx-auto">
          <BiomechanicsGuide />
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

        {/* ── 5.5 BOOKING CALENDAR ── */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <BookingCalendar />
        </section>

        {/* ── 6. CALIBRATOR / BMI CALCULATOR SECTION ── */}
        <section className="px-margin-mobile md:px-margin-desktop py-24 max-w-container-max mx-auto border-t border-white/5" id="calibrator">
          <BmiCalculator onApplyBmi={handleApplyBmi} />
        </section>

        {/* ── 6.5 TDEE CALCULATOR ── */}
        <section className="max-w-container-max mx-auto">
          <TDEECalculator onApplyTDEE={handleApplyTdee} />
        </section>

        {/* ── 6.6 PHYSIQUE AUDIT DIAGNOSTIC ── */}
        <section id="audit-portal" className="px-margin-mobile md:px-margin-desktop py-24 border-t border-white/5 max-w-4xl mx-auto">
          <PhysiqueAudit onApplyAudit={handleApplyAudit} />
        </section>

        {/* ── 6.7 FREE LEAD MAGNET ── */}
        <section className="max-w-container-max mx-auto">
          <LeadMagnet />
        </section>

        {/* ── 7. INQUIRY PORTAL ── */}
        <section id="intake-portal" className="px-margin-mobile md:px-margin-desktop py-24 max-w-4xl mx-auto">
          <InquiryForm prefilledGoal={prefilledGoal} prefilledBmi={prefilledBmi} prefilledCalories={prefilledCalories ?? prefilledTdee} prefilledAudit={prefilledAudit} />
        </section>

        {/* ── 8. FAQS SECTION ── */}
        <section id="faq-section" className="px-margin-mobile md:px-margin-desktop py-24 max-w-container-max mx-auto border-t border-white/5">
          <FAQSection />
        </section>

        {/* ── 9. BLOG / COACHING TIPS ── */}
        <section className="max-w-container-max mx-auto">
          <BlogTips />
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
                <a key={link.href} href={link.href} className="hover:text-[#e11d48] transition-colors uppercase">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <a
                href="https://www.instagram.com/ishan_bajaj04/"
                target="_blank"
                rel="noreferrer"
                className="text-on-surface/50 hover:text-[#e11d48] transition-colors uppercase"
              >
                Instagram
              </a>
              <a
                href="https://wa.me/917297946193"
                target="_blank"
                rel="noreferrer"
                className="text-on-surface/50 hover:text-[#e11d48] transition-colors uppercase"
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

        {/* WhatsApp Float & Chat Widget */}
        <div className="relative flex flex-col items-end gap-3">
          <AnimatePresence>
            {whatsAppOpen && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                className="w-80 md:w-96 rounded-3xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-xl shadow-2xl p-5 text-left flex flex-col gap-4 relative overflow-hidden"
                style={{
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(225, 29, 72, 0.05)'
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 pb-3 border-b border-zinc-800">
                  <div className="h-10 w-10 rounded-full overflow-hidden border border-[#e11d48]/30 shrink-0">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEINEtoZzLV9q0y2fBmKlLisO9F4xXcQDvDPMC14M1qbzZITsgPTzVpWrOSPN99Q8AdaFhnGzMRMT2Mn72-xOPbg-vflHfV6GX0yeQRDBL-2WillL0L8KRLwoIaCRbeOeE78FdK7FMY8i7pdmQo4vuC84RXPePnkvlami7YjAbPRPXCam_oJUvyKh--eJJj2s6MN7wAE4W91PuqzzBvxGYOuiUknqSnl1_vmJRGVhGi_G6Dl37Ykl8zYCJNRR_5c9m-uFoqKn43KI"
                      alt="Ishan Portrait"
                      className="w-full h-full object-cover scale-110"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-white uppercase tracking-wider">Ishan Bajaj</p>
                      <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    </div>
                    <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Physique Strategist</p>
                  </div>
                  <button
                    onClick={() => setWhatsAppOpen(false)}
                    className="ml-auto text-zinc-500 hover:text-white transition-colors cursor-pointer p-1"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>

                {/* Messages Body */}
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-sm p-3.5 text-xs text-zinc-300 leading-relaxed font-sans font-medium">
                    Hey! 👋 I build custom physiques using clean workout science and real food plans.
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-sm p-3.5 text-xs text-zinc-300 leading-relaxed font-sans font-medium">
                    Tell me your primary fitness goal and I'll WhatsApp you a customized starting parameter directly! 👇
                  </div>
                </div>

                {/* Quick Selection Chips */}
                <div className="flex flex-col gap-2 pt-2 border-t border-zinc-900">
                  <span className="text-[9px] font-mono text-zinc-600 uppercase font-bold tracking-widest pl-1">
                    Select Your Goal
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {[
                      {
                        label: '⚡ LEAN SHRED STRATEGY',
                        url: 'https://wa.me/917297946193?text=Hi%20Ishan%2C%20I%20saw%20your%20site%20and%20want%20to%20calculate%20my%20Lean%20Shred%20parameters.%20I%20need%20a%20fat%20loss%20roadmap.'
                      },
                      {
                        label: '💪 HYPERTROPHY BULK GUIDE',
                        url: 'https://wa.me/917297946193?text=Hi%20Ishan%2C%20I%20saw%20your%20site%20and%20want%20to%20discuss%20my%20Hypertrophy%20Bulk%20targets.%20I%20need%20a%20muscle%20building%20plan.'
                      },
                      {
                        label: '🔄 BODY RECOMPOSITION PLAN',
                        url: 'https://wa.me/917297946193?text=Hi%20Ishan%2C%20I%20saw%20your%20site%20and%20want%20to%20review%20my%20Body%20Recomposition%20details.%20I%20want%20to%20build%20muscle%20and%20burn%20fat.'
                      }
                    ].map((opt, i) => (
                      <a
                        key={i}
                        href={opt.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setWhatsAppOpen(false)}
                        className="w-full flex items-center justify-between bg-zinc-900/60 border border-zinc-800 hover:border-[#e11d48]/30 hover:bg-[#e11d48]/5 text-white/90 hover:text-[#fb7185] px-4 py-2.5 rounded-xl text-[10px] font-mono font-bold tracking-wider transition-all"
                      >
                        <span>{opt.label}</span>
                        <ChevronRight className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setWhatsAppOpen(!whatsAppOpen)}
            className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-transform hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            aria-label="Chat on WhatsApp"
          >
            {whatsAppOpen ? (
              <span className="material-symbols-outlined text-white text-3xl font-black">close</span>
            ) : (
              <MessageCircle className="h-7 w-7 text-white fill-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
