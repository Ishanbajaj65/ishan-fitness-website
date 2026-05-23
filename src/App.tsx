import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Dumbbell,
  Award,
  Zap,
  CheckCircle,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Target,
  Flame,
  Menu,
  X,
  MousePointer,
  HelpCircle,
  Users
} from 'lucide-react';
import { HERO_COPY, ABOUT_COPY, SERVICES_DATA, FAQ_DATA } from './fitnessData';

// Modular child components
import MacroCalculator from './components/MacroCalculator';
import ProgramsSection from './components/ProgramsSection';
import FAQSection from './components/FAQSection';
import InquiryForm from './components/InquiryForm';

export default function App() {
  const [selectedGoal, setSelectedGoal] = useState<'muscle' | 'fat-loss' | 'meal-plan' | 'recomp'>('fat-loss');
  const [preloadedCal, setPreloadedCal] = useState<number | undefined>(undefined);

  const handleApplyMacros = (goal: 'muscle' | 'fat-loss' | 'meal-plan' | 'recomp', cal: number) => {
    setSelectedGoal(goal);
    setPreloadedCal(cal);
    const element = document.getElementById('booking-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackage = (goalType: 'muscle' | 'fat-loss' | 'meal-plan' | 'recomp') => {
    setSelectedGoal(goalType);
    const element = document.getElementById('booking-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="website-container" className="min-h-screen bg-[#030303] text-zinc-100 flex flex-col antialiased selection:bg-[#bfff00] selection:text-black">
      
      {/* HEADER SECTION */}
      <header id="main-header" className="sticky top-0 z-40 bg-[#030303]/80 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-[#bfff00] rounded-xl flex items-center justify-center border border-[#bfff00]/20 shadow-[0_0_15px_rgba(191,255,0,0.15)]">
              <Dumbbell className="h-5 w-5 text-black stroke-[2.5]" />
            </div>
            <div>
              <span className="text-md font-extrabold text-white tracking-widest font-mono">IB.COACH</span>
              <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">PHYSIQUE STRATEGIST</p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase">
            <a href="#about-section" className="text-zinc-400 hover:text-white transition-colors">Philosophy</a>
            <a href="#programs-section" className="text-zinc-400 hover:text-white transition-colors">Blueprints</a>
            <a href="#calculator-section" className="text-zinc-400 hover:text-white transition-colors">Calibrator</a>
            <a href="#faq-section" className="text-zinc-400 hover:text-white transition-colors">Questions</a>
          </nav>

          {/* Action CTA */}
          <div className="flex items-center gap-3">
            <a
              href="#booking-section"
              className="bg-[#bfff00] hover:bg-white text-black font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(191,255,0,0.15)] hidden sm:inline-block"
            >
              APPLY NOW
            </a>
          </div>

        </div>
      </header>

      {/* CORE WEB LAYOUT CONTENT */}
      <main className="flex-1 space-y-24 md:space-y-36 pb-24">

        {/* HERO SECTION */}
        <section id="hero-section" className="relative pt-12 md:pt-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#bfff00]/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-950 border rounded-full bg-zinc-900/60 border-zinc-800">
                <span className="h-2 w-2 rounded-full bg-[#bfff00] animate-accent" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-300">
                  {HERO_COPY.accentLabel}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tighter leading-[0.9] uppercase">
                YOUR PHYSIQUE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-lime-400">IS A SCIENCE.</span> <br />
                <span className="text-[#bfff00]">STOP GUESSING.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-zinc-400 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
                {HERO_COPY.subHeadline}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 max-w-md mx-auto">
                <a
                  href="#booking-section"
                  className="flex-1 bg-[#bfff00] hover:bg-white text-black font-extrabold text-sm py-4 rounded-xl shadow-xl transition-all uppercase tracking-wider flex items-center justify-center gap-2 group"
                >
                  <span>{HERO_COPY.primaryCTA}</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#programs-section"
                  className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm py-4 rounded-xl border border-zinc-800 transition-all uppercase tracking-wider flex items-center justify-center"
                >
                  {HERO_COPY.secondaryCTA}
                </a>
              </div>
            </div>

            {/* Verification / Authority Indicators */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mt-16 md:mt-24 border-t border-b border-zinc-900 py-8 md:py-12 bg-zinc-950/20 backdrop-blur-sm rounded-3xl px-6">
              {HERO_COPY.metrics.map((met, idx) => (
                <div key={idx} className="text-center space-y-1">
                  <span className="text-3xl md:text-4xl font-extrabold font-mono text-white block tracking-tighter">
                    {met.value}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                    {met.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT ME STORY SECTION */}
        <section id="about-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-zinc-950/40 border border-zinc-900 rounded-3xl p-6 md:p-12 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#bfff00]/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
              
              {/* Narrative Bio */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#bfff00] uppercase font-bold">
                    Proven in the Iron Trenches
                  </span>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                    {ABOUT_COPY.title}
                  </h2>
                  <p className="text-xs md:text-sm font-mono text-zinc-400 tracking-wider font-semibold">
                    {ABOUT_COPY.subtitle}
                  </p>
                </div>

                <p className="text-sm md:text-md text-[#bfff00] font-semibold leading-relaxed border-l-2 border-[#bfff00] pl-4">
                  {ABOUT_COPY.intro}
                </p>

                <div className="space-y-4 text-zinc-400 text-xs md:text-sm leading-relaxed">
                  {ABOUT_COPY.paragraphs.map((p, pidx) => (
                    <p key={pidx}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Credentials / Core Guidelines Panel */}
              <div className="lg:col-span-5 bg-zinc-950 border border-zinc-850 p-6 md:p-8 rounded-2xl space-y-6">
                <div>
                  <h3 className="text-sm font-mono text-[#bfff00] uppercase tracking-widest font-extrabold flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    <span>Scientific Standards</span>
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">Why my clients achieve reliable body conversions:</p>
                </div>

                <ul className="space-y-4">
                  {ABOUT_COPY.credentialsList.map((cred, cidx) => (
                    <li key={cidx} className="flex items-start gap-3">
                      <div className="p-1 bg-lime-950/40 border border-lime-800/40 rounded-lg shrink-0 mt-0.5">
                        <CheckCircle className="h-3.5 w-3.5 text-lime-400" />
                      </div>
                      <span className="text-xs text-zinc-300 leading-normal font-medium">{cred}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-850">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-4 w-4 text-lime-400" />
                    <span className="text-xs font-mono font-bold text-white uppercase">Practice What I Preach</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1.5 leading-normal">
                    I've personally undergone multiple bulk and cut cycles down to single-digit body fat, allowing me to fully grasp the physiological, neurological, and emotional barriers of your specific cycle.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SERVICES / OFFERINGS SECTION */}
        <section id="programs-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProgramsSection onSelectPackage={handleSelectPackage} />
        </section>

        {/* INTERACTIVE CALORIC CALCULATOR SECTION */}
        <section id="calculator-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MacroCalculator onApplyMacros={handleApplyMacros} />
        </section>

        {/* BOOKING / APPLICATION FORM SECTION */}
        <section id="booking-section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <InquiryForm initialGoal={selectedGoal} preloadedCalories={preloadedCal} />
        </section>

        {/* FAQ SECTION */}
        <section id="faq-section" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQSection />
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 bg-zinc-950/80 py-12 px-4 sm:px-6 lg:px-8 mt-auto text-center space-y-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-zinc-900 border border-zinc-850 rounded-lg flex items-center justify-center">
              <Dumbbell className="h-4 w-4 text-lime-400" />
            </div>
            <span className="text-xs font-mono font-bold tracking-widest text-zinc-300">IB.COACH • BY ISHAN</span>
          </div>

          <p className="text-[11px] text-zinc-500 max-w-md md:text-right leading-normal">
            Disclaimer: The information on this website and within Coach Ishan's programs is based on personal transformation experience and peer-reviewed physical wellness literature. It is not formal medical advice.
          </p>
        </div>

        <div className="text-[10px] text-zinc-600 font-mono pt-4 border-t border-zinc-900">
          © 2026 Ishan Fitness Coaching. All Rights Reserved. Master Your Human Architecture.
        </div>
      </footer>

    </div>
  );
}
