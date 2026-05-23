import React, { useState } from 'react';
import { Activity, Dumbbell, Zap, ChevronRight, MessageCircle } from 'lucide-react';
import MacroCalculator from './components/MacroCalculator';
import InquiryForm from './components/InquiryForm';
import ProgramsSection from './components/ProgramsSection';
import FAQSection from './components/FAQSection';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import { HERO_COPY, ABOUT_COPY } from './fitnessData';

export default function App() {
  const [prefilledGoal, setPrefilledGoal] = useState<string | undefined>(undefined);
  const [prefilledCalories, setPrefilledCalories] = useState<number | undefined>(undefined);

  const scrollToInquiry = () => {
    document.getElementById('intake-portal')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleApplyMacros = (goal: 'muscle' | 'fat-loss' | 'meal-plan' | 'recomp', cal: number) => {
    setPrefilledGoal(goal);
    setPrefilledCalories(cal);
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

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 font-sans overflow-x-hidden">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-30 bg-[#030303]/80 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 bg-[#bfff00] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(191,255,0,0.15)]">
              <Dumbbell className="h-5 w-5 text-black stroke-[2.5]" />
            </div>
            <div>
              <span className="text-md font-extrabold text-white tracking-widest font-mono">IB.COACH</span>
              <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">PHYSIQUE STRATEGIST</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-widest uppercase">
            <a href="#about-section" className="text-zinc-400 hover:text-white transition-colors">Philosophy</a>
            <a href="#testimonials-section" className="text-zinc-400 hover:text-white transition-colors">Results</a>
            <a href="#programs-section" className="text-zinc-400 hover:text-white transition-colors">Blueprints</a>
            <a href="#pricing-section" className="text-zinc-400 hover:text-white transition-colors">Pricing</a>
            <a href="#calculator-section" className="text-zinc-400 hover:text-white transition-colors">Calibrator</a>
            <a href="#faq-section" className="text-zinc-400 hover:text-white transition-colors">FAQs</a>
          </nav>

          {/* CTA */}
          <button
            onClick={scrollToInquiry}
            className="bg-[#bfff00] hover:bg-white text-black font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(191,255,0,0.12)] hidden sm:inline-flex items-center gap-1.5"
          >
            APPLY NOW
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      <main className="space-y-24 md:space-y-36 pb-24 pt-10">

        {/* ── 1. HERO ── */}
        <section id="hero" className="relative px-4 sm:px-6 lg:px-8">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#bfff00]/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-full">
                <span className="h-2 w-2 rounded-full bg-[#bfff00] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-300">
                  {HERO_COPY.accentLabel}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] uppercase">
                YOUR PHYSIQUE{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-lime-400">
                  IS A SCIENCE.
                </span>{' '}
                <br />
                <span className="text-[#bfff00]">STOP GUESSING.</span>
              </h1>

              {/* Sub */}
              <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                {HERO_COPY.subHeadline}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 max-w-md mx-auto">
                <button
                  onClick={scrollToInquiry}
                  className="flex-1 bg-[#bfff00] hover:bg-white text-black font-extrabold text-sm py-4 rounded-xl shadow-xl transition-all uppercase tracking-wider flex items-center justify-center gap-2 group"
                >
                  <span>{HERO_COPY.primaryCTA}</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href="#programs-section"
                  className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm py-4 rounded-xl border border-zinc-800 transition-all uppercase tracking-wider flex items-center justify-center"
                >
                  {HERO_COPY.secondaryCTA}
                </a>
              </div>
            </div>

            {/* Proof metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mt-16 md:mt-24 border-t border-b border-zinc-900 py-8 md:py-12 bg-zinc-950/20 backdrop-blur-sm rounded-3xl px-6">
              {HERO_COPY.metrics.map((m) => (
                <div key={m.label} className="text-center space-y-1">
                  <span className="text-3xl md:text-4xl font-extrabold font-mono text-white block tracking-tighter">{m.value}</span>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 2. ABOUT ── */}
        <section id="about-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-zinc-925 border border-zinc-900 rounded-3xl p-6 md:p-12 relative overflow-hidden" style={{ backgroundColor: '#101014' }}>
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#bfff00]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
              {/* Biography */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#bfff00] uppercase font-bold px-2 py-0.5 bg-lime-950/30 border border-lime-800/30 rounded">
                    Proven in the Iron Trenches
                  </span>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">{ABOUT_COPY.title}</h2>
                  <p className="text-xs md:text-sm font-mono text-zinc-400 tracking-wider font-semibold">{ABOUT_COPY.subtitle}</p>
                </div>

                <p className="text-sm md:text-base text-[#bfff00] font-semibold leading-relaxed border-l-2 border-[#bfff00] pl-4">
                  {ABOUT_COPY.intro}
                </p>

                <div className="space-y-4 text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {ABOUT_COPY.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>

              {/* Credentials card */}
              <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800 p-6 md:p-8 rounded-2xl space-y-6">
                <div>
                  <h3 className="text-sm font-mono text-[#bfff00] uppercase tracking-widest font-extrabold flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Scientific Standards
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">Why my clients achieve reliable body conversions:</p>
                </div>
                <ul className="space-y-4">
                  {ABOUT_COPY.credentialsList.map((cred, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="p-1 bg-lime-950/40 border border-lime-800/40 rounded-lg shrink-0 mt-0.5">
                        <Activity className="h-3.5 w-3.5 text-lime-400" />
                      </div>
                      <span className="text-xs text-zinc-300 leading-normal font-medium">{cred}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                  <p className="text-xs font-mono font-bold text-white uppercase mb-1.5">Practice What I Preach</p>
                  <p className="text-[11px] text-zinc-500 leading-normal">
                    I've personally undergone multiple bulk and cut cycles down to single-digit body fat, giving me deep understanding of the physiological, neurological, and emotional barriers in your cycle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3.5. TESTIMONIALS ── */}
        <section id="testimonials-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TestimonialsSection />
        </section>

        {/* ── 4. PROGRAMS ── */}
        <section id="programs-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProgramsSection onSelectPackage={handleSelectPackage} />
        </section>

        {/* ── 4.5. PRICING ── */}
        <section id="pricing-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingSection onApply={handleSelectPackage} />
        </section>

        {/* ── 4. MACRO CALCULATOR ── */}
        <section id="calculator-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MacroCalculator onApplyMacros={handleApplyMacros} />
        </section>

        {/* ── 5. INQUIRY FORM ── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <InquiryForm prefilledGoal={prefilledGoal} prefilledCalories={prefilledCalories} />
        </section>

        {/* ── 6. FAQ ── */}
        <section id="faq-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQSection />
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-zinc-900 bg-zinc-950/80 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center">
              <Dumbbell className="h-4 w-4 text-[#bfff00]" />
            </div>
            <span className="text-xs font-mono font-bold tracking-widest text-[#bfff00]">IB.COACH • BY ISHAN</span>
          </div>
          <p className="text-[11px] text-zinc-500 max-w-md md:text-right leading-normal font-medium">
            Disclaimer: The information on this website is based on personal transformation experience and peer-reviewed physical wellness literature. It is not formal medical advice.
          </p>
        </div>
        <div className="text-center text-[10px] text-zinc-700 font-mono pt-6 border-t border-zinc-900 mt-6">
          © 2026 Ishan Fitness Coaching. All Rights Reserved. Master Your Human Architecture.
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP BUTTON ── */}
      <a
        href="https://wa.me/917297946193?text=Hi%20Ishan%2C%20I%20saw%20your%20website%20and%20I'm%20interested%20in%20coaching."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-green-500 hover:bg-green-400 text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all hover:scale-105 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-4 w-4 fill-white" />
        <span className="hidden sm:inline">Chat on WhatsApp</span>
      </a>
    </div>
  );
}
