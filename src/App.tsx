import React from 'react';
import { Shield, Clock, Utensils, Brain, Activity, Briefcase, ChevronDown } from 'lucide-react';
import InquiryForm from './components/InquiryForm';

export default function App() {
  const scrollToForm = () => {
    document.getElementById('intake-portal')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-[#bfff00] selection:text-black">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 text-center border-b border-zinc-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black">
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <Activity className="h-5 w-5 text-[#bfff00]" />
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-white">Ishan Fitness</span>
        </div>

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

          <div className="pt-4">
            <button
              onClick={scrollToForm}
              className="bg-[#bfff00] hover:bg-white text-black font-extrabold text-xs px-8 py-4 rounded-xl shadow-2xl transition-all uppercase tracking-wider flex items-center gap-2 mx-auto cursor-pointer"
            >
              Apply For Blueprint Allocation
              <ChevronDown className="h-4 w-4 stroke-[3]" />
            </button>
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

      {/* 3. CORPORATE FRICTION SYSTEM PILLARS */}
      <section className="max-w-6xl mx-auto px-4 py-20 border-b border-zinc-900">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-16">
          <span className="text-[10px] font-mono tracking-widest text-[#bfff00] uppercase font-bold">The Methodology</span>
          <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight">Built For Your Lifestyle Constraints</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1 */}
          <div className="bg-zinc-950/40 border border-zinc-900 p-8 rounded-2xl space-y-4 hover:border-zinc-800 transition-colors">
            <div className="h-10 w-10 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800">
              <Clock className="h-5 w-5 text-[#bfff00]" />
            </div>
            <h3 className="text-lg font-bold text-white uppercase tracking-tight">Time Optimization</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-medium">
              Ditch the counterproductive 2-hour workout habits. We implement high-yield 45-minute density programming designed to generate peak metabolic results in minimal time frames.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-zinc-950/40 border border-zinc-900 p-8 rounded-2xl space-y-4 hover:border-zinc-800 transition-colors">
            <div className="h-10 w-10 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800">
              <Utensils className="h-5 w-5 text-[#bfff00]" />
            </div>
            <h3 className="text-lg font-bold text-white uppercase tracking-tight">Corporate Nutrition</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-medium">
              No impractical meal prep boxes or social isolation. Nutrition parameters are configured to cleanly absorb business lunches, travel schedules, and busy family dynamic patterns.
            </p>
          </div>

          {/* Pillar 3 */}
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

      {/* 4. THE INTAKE PORTAL CONTAINER */}
      <section id="intake-portal" className="px-4 py-20 bg-gradient-to-b from-black to-zinc-950">
        <InquiryForm />
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 py-8 text-center text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
        © {new Date().getFullYear()} Ishan Fitness. All Rights Reserved. Private Coaching Allocation.
      </footer>

    </div>
  );
}
