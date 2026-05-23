import React, { useState } from 'react';
import { 
  Clock, Utensils, Brain, Activity, Briefcase, 
  ChevronDown, MessageSquare, Smartphone, BarChart3, HelpCircle, PhoneCall
} from 'lucide-react';
import InquiryForm from './components/InquiryForm';

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToForm = () => {
    document.getElementById('intake-portal')?.scrollIntoView({ behavior: 'smooth' });
  };

  const faqs = [
    {
      question: "Do I need to spend hours cooking and meal prepping?",
      answer: "Absolutely not. We optimize your parameters around your active lifestyle. I will teach you exactly how to navigate restaurant menus, corporate cafeterias, client dinners, and quick 10-minute high-protein assembly options so your career never suffers."
    },
    {
      question: "What happens when I travel for business or hit a busy week?",
      answer: "This is exactly where my 8 years of corporate experience kicks in. We don't discard the plan; we implement 'Travel & Crisis Frameworks'. I configure optimized, high-yield hotel gym workflows and travel-friendly nutritional rules that lock in your progress while you focus on your business targets."
    },
    {
      question: "I am completely drained after a 9-hour shift. How will I find the energy to train?",
      answer: "Most commercial plans cause burnout because they add massive stress to an already exhausted body. Our training blocks manage your central nervous system fatigue indices. They are structured to optimize cellular energy, improve sleep quality, and release cognitive stress, leaving you more focused for work the next morning."
    },
    {
      question: "How is this different from hiring a standard personal trainer?",
      answer: "Standard trainers give you an hour of counting reps and a generic PDF meal sheet. This is a comprehensive high-performance infrastructure. We optimize your lifestyle data, stress parameters, metrics, and mindset via daily communication loops, creating a completely bulletproof path to results built specifically for busy desk professionals."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-[#bfff00] selection:text-black">
      
      {/* HEADER NAVBAR */}
      <nav className="w-full border-b border-zinc-900 bg-black/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-[#bfff00]" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-white">Ishan Fitness</span>
          </div>
          
          {/* Social Media Links (Using Pure SVGs to stop build failures) */}
          <div className="flex items-center gap-5 text-zinc-500">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#bfff00] transition-colors p-1" aria-label="Instagram">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#bfff00] transition-colors p-1" aria-label="LinkedIn">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#bfff00] transition-colors p-1" aria-label="YouTube">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.895.502 5.784a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.895 24 12 24 12s0-3.895-.502-5.784zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 text-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black border-b border-zinc-900">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium tracking-wider uppercase bg-zinc-900/80 border border-zinc-800 text-[#bfff00]">
            <Briefcase className="h-3 w-3" /> Engineered For Busy Professionals
          </span>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase text-white leading-none">
            Build Your Elite Physique <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bfff00] to-white">
              Without Quitting Your Career
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm md:text-base text-zinc-400 font-medium leading-relaxed">
            The data-driven, high-efficiency transformation system built specifically for corporate workers, executives, and high-stress desk professionals.
          </p>

          {/* ACTIONS BAR */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={scrollToForm}
              className="w-full sm:w-auto bg-[#bfff00] hover:bg-white text-black font-extrabold text-xs px-8 py-4 rounded-xl shadow-2xl transition-all uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              Apply For Allocation
              <ChevronDown className="h-4 w-4 stroke-[3]" />
            </button>
            
            <a
              href="tel:+917297946193" 
              className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-extrabold text-xs px-8 py-4 rounded-xl shadow-xl transition-all uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <PhoneCall className="h-3.5 w-3.5 text-[#bfff00]" />
              Call Coach Ishan
            </a>
          </div>
        </div>
      </section>

      {/* 2. THE 8-YEAR CREDIBILITY SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-20 border-b border-zinc-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-mono tracking-widest text-[#bfff00] uppercase font-bold">The Coach Background</span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white uppercase tracking-tight">
              8 Years of Continuous Gym Execution While Working Corporate
            </h2>
            <div className="h-1 w-12 bg-[#bfff00]" />
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-medium">
              I don't build unrealistic fitness programs designed for influencers who live in the gym, cook 6 fresh meals a day, and sleep 10 hours a night. You don't have that luxury.
            </p>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-medium">
              For **8 straight years**, I balanced the high-stress demands of a professional job with elite-level physical progress. I know what it’s like to sit at a desk for 9 hours, face cognitive exhaustion, and still need to execute. My protocols are engineered directly around meetings, deadlines, and limited energy stores.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl">
              <div className="text-3xl font-black text-white font-mono">8+ YEARS</div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mt-1">Dual Career & Gym Execution</div>
            </div>
            <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl">
              <div className="text-3xl font-black text-[#bfff00] font-mono">10,000+ HRS</div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mt-1">Of Corporate Stress Optimization</div>
            </div>
            <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl sm:col-span-2 lg:col-span-1">
              <div className="text-3xl font-black text-white font-mono">100%</div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mt-1">Tailored To Desk-Bound Frameworks</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SYSTEM PILLARS */}
      <section className="max-w-6xl mx-auto px-4 py-20 border-b border-zinc-900">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-16">
          <span className="text-[10px] font-mono tracking-widest text-[#bfff00] uppercase font-bold">The Methodology</span>
          <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight">Built For Your Lifestyle Constraints</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-950/40 border border-zinc-900 p-8 rounded-2xl space-y-4 hover:border-zinc-800 transition-colors">
            <div className="h-10 w-10 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800">
              <Clock className="h-5 w-5 text-[#bfff00]" />
            </div>
            <h3 className="text-lg font-bold text-white uppercase tracking-tight">Time Optimization</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-medium">
              Ditch the counterproductive 2-hour workout habits. We implement high-yield 45-minute density programming designed to generate peak metabolic results in minimal time frames.
            </p>
          </div>

          <div className="bg-zinc-950/40 border border-zinc-900 p-8 rounded-2xl space-y-4 hover:border-zinc-800 transition-colors">
            <div className="h-10 w-10 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800">
              <Utensils className="h-5 w-5 text-[#bfff00]" />
            </div>
            <h3 className="text-lg font-bold text-white uppercase tracking-tight">Corporate Nutrition</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-medium">
              No impractical meal prep boxes or social isolation. Nutrition parameters are configured to cleanly absorb business lunches, travel schedules, and busy family dynamic patterns.
            </p>
          </div>

          <div className="bg-zinc-950/40 border border-zinc-900 p-8 rounded-2xl space-y-4 hover:border-zinc-800 transition-colors">
            <div className="h-10 w-10 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800">
              <Brain className="h-5 w-5 text-[#bfff00]" />
            </div>
            <h3 className="text-lg font-bold text-white uppercase tracking-tight">Cortisol & Burnout Control</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-medium">
              High desk stress destroys physical progress. Training volume and stress load indicators are micro-adjusted dynamically to reduce professional fatigue and optimize deep sleep cycles.
            </p>
          </div>
        </div>
      </section>

      {/* INSIDE THE BLUEPRINT PREVIEW GRID */}
      <section className="max-w-6xl mx-auto px-4 py-20 border-b border-zinc-900">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-16">
          <span className="text-[10px] font-mono tracking-widest text-[#bfff00] uppercase font-bold">The Infrastructure</span>
          <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight">Inside Your Custom Blueprint</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl space-y-4">
            <div className="h-12 w-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center">
              <Smartphone className="h-6 w-6 text-[#bfff00]" />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Mobile Workout Delivery</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              No paper sheets or loose notes. Access clean, mobile-optimized templates directly on the gym floor, complete with strict tracking systems, metric inputs, and dynamic form video parameters.
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl space-y-4">
            <div className="h-12 w-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-[#bfff00]" />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Adaptive Macro Engine</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              A dynamic nutrition interface that calculates and balances your caloric updates automatically based on seasonal shifts, step targets, and workplace fatigue parameters.
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl space-y-4">
            <div className="h-12 w-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-[#bfff00]" />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Direct WhatsApp Auditing</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              24/7 direct communication line. Submit form check videos, request menu reviews, or pivot scheduling blueprints on the fly with real-time audio guidance directly from Ishan.
            </p>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section className="max-w-4xl mx-auto px-4 py-20 border-b border-zinc-900">
        <div className="text-center space-y-2 mb-16">
          <span className="text-[10px] font-mono tracking-widest text-[#bfff00] uppercase font-bold">Friction Clearance</span>
          <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight">Frequently Asked Parameters</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-zinc-950/60 border border-zinc-900 rounded-2xl overflow-hidden transition-all duration-200">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-sm md:text-base text-white hover:text-[#bfff00] uppercase tracking-tight transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-4 w-4 text-zinc-500 shrink-0" />
                  <span>{faq.question}</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 ${openFaq === index ? "rotate-180 text-[#bfff00]" : ""}`} />
              </button>
              
              <div className={`transition-all duration-200 ease-in-out px-6 ${openFaq === index ? "pb-6 max-h-40 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-medium border-t border-zinc-900/80 pt-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTAKE PORTAL */}
      <section id="intake-portal" className="px-4 py-20 bg-gradient-to-b from-black to-zinc-950">
        <InquiryForm />
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 py-8 text-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest space-y-4">
        <div>
          © {new Date().getFullYear()} Ishan Fitness. All Rights Reserved. Private Coaching Allocation.
        </div>
      </footer>

    </div>
  );
}
