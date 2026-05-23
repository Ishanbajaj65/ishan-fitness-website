import React, { useState } from 'react';
import { 
  Clock, Utensils, Brain, Activity, Briefcase, 
  ChevronDown, MessageSquare, Smartphone, BarChart3, HelpCircle, PhoneCall
} from 'lucide-react';
import InquiryForm from './components/InquiryForm';
import MacroCalculator from './components/MacroCalculator';

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToForm = () => {
    document.getElementById('intake-portal')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleApplyMacros = (goal: string, cal: number) => {
    const formElement = document.getElementById('intake-portal');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqs = [
    {
      question: "Do I need to spend hours cooking and meal prepping?",
      answer: "Not at all. We adapt everything around your busy lifestyle. I will teach you how to easily navigate restaurant menus, corporate cafeterias, client dinners, and quick 10-minute options so your routine effortlessly fits into your career."
    },
    {
      question: "What happens when I travel for business or hit a busy week?",
      answer: "Having spent years balancing corporate demands, I understand how schedules fluctuate. Instead of throwing away your progress, we use flexible travel guidelines and simple hotel gym routines that keep you on track without adding stress."
    },
    {
      question: "I am completely drained after a long shift. How will I find energy to train?",
      answer: "Most fitness plans cause burnout because they demand too much from an exhausted body. Our routines are focused on restorative health—designed to increase daily energy, improve sleep quality, and clear mental stress so you feel refreshed the next morning."
    },
    {
      question: "How is this different from hiring a standard personal trainer?",
      answer: "Instead of just counting reps or sending generic PDFs, we build a sustainable, personal routine around your stress levels, work commitments, and long-term goals through consistent, supportive guidance."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* HEADER NAVBAR - NO EXTRA TEXT OR BUTTONS */}
      <nav className="w-full border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          
          {/* Left Side: Brand Logo & Name Only */}
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-semibold tracking-wide text-white">Ishan Fitness</span>
          </div>
          
          {/* Right Side: Clean Social Media Links Only */}
          <div className="flex items-center gap-5 text-slate-400">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors p-1" aria-label="Instagram">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors p-1" aria-label="LinkedIn">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[75vh] flex flex-col items-center justify-center px-4 text-center border-b border-slate-900">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-900 border border-slate-800 text-emerald-400">
            <Briefcase className="h-3.5 w-3.5" /> Tailored for professionals
          </span>
          
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Build a sustainable, healthy routine <br />
            <span className="text-slate-400 font-normal">without sacrificing your career.</span>
          </h1>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed">
            A practical, balanced fitness framework designed around demanding jobs, busy schedules, and real-world routines.
          </p>

          {/* ACTIONS BAR */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-sm mx-auto w-full">
            <button
              onClick={scrollToForm}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm px-6 py-3 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              Get Started Today
              <ChevronDown className="h-4 w-4" />
            </button>
            
            <a
              href="tel:+917297946193" 
              className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-sm px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <PhoneCall className="h-4 w-4 text-emerald-400" />
              Speak with Ishan
            </a>
          </div>
        </div>
      </section>

      {/* 2. THE BACKGROUND SECTION */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-b border-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">My Approach</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              A fitness philosophy that understands your workday.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              I don't build complex, time-consuming fitness programs designed for athletes who live in the gym. Most professional people don't have that lifestyle.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              For over eight years, I managed a demanding corporate career while consistently hitting my personal fitness goals. I understand what it's like to finish a long day of mental focus and still want to stay healthy. These plans are designed directly around your constraints.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="bg-slate-900/50 border border-slate-900 p-5 rounded-xl">
              <div className="text-2xl font-bold text-white">8+ Years</div>
              <div className="text-xs text-slate-400 mt-0.5">Balancing Career & Fitness</div>
            </div>
            <div className="bg-slate-900/50 border border-slate-900 p-5 rounded-xl">
              <div className="text-2xl font-bold text-emerald-400">Practical</div>
              <div className="text-xs text-slate-400 mt-0.5">Built Around Desk Schedules</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MACRO CALCULATOR INTEGRATION */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-b border-slate-900">
        <MacroCalculator onApplyMacros={handleApplyMacros} />
      </section>

      {/* 4. SYSTEM PILLARS */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-b border-slate-900">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
          <h2 className="text-2xl font-bold text-white tracking-tight">Core Principles</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-xl space-y-3">
            <div className="h-9 w-9 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-800">
              <Clock className="h-4 w-4 text-emerald-400" />
            </div>
            <h3 className="text-base font-semibold text-white">Efficient Workouts</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No need for counterproductive 2-hour sessions. We use focused, highly optimized routines that yield maximum results in 45 minutes or less.
            </p>
          </div>

          <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-xl space-y-3">
            <div className="h-9 w-9 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-800">
              <Utensils className="h-4 w-4 text-emerald-400" />
            </div>
            <h3 className="text-base font-semibold text-white">Flexible Nutrition</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No restrictive meal prep or avoiding social meals. Your nutrition plan is designed to naturally accommodate business dinners, work travel, and family nights.
            </p>
          </div>

          <div className="bg-slate-9
