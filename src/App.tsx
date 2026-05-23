import React, { useState } from 'react';
import { 
  Clock, Utensils, Brain, Activity, Briefcase, 
  ChevronDown, MessageSquare, Smartphone, BarChart3, HelpCircle,
  Instagram, Linkedin, Youtube, PhoneCall
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
      
      {/* PREMIUM HEADER NAVIGATION BAR */}
      <nav className="w-full border-b border-zinc-900 bg-black/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-[#bfff00]" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-white">Ishan Fitness</span>
          </div>
          
          {/* Social Media Links Header Section */}
          <div className="flex items-center gap-5 text-zinc-500">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#bfff00] transition-colors p-1"
              aria-label="Instagram Profile"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#bfff00] transition-colors p-1"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#bfff00] transition-colors p-1"
              aria-label="YouTube Channel"
            >
              <Youtube className="h-4 w-4" />
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

          {/* DUAL ACTION BUTTON ACTIONS BAR */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={scrollToForm}
              className="w-full sm:w-auto bg-[#bfff00] hover:bg-white text-black font-extrabold text-xs px-8 py-4 rounded-xl shadow-2xl transition-all uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              Apply For Allocation
              <ChevronDown className="h-4 w-4 stroke-[3]" />
            </button>
            
            {/* Direct Telephone Action Protocol Button */}
            <a
              href="tel:+919999999999" 
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
              For **8 straight years**, I balanced the high-stress demands of a professional job with elite-level physical progress. I know what it’s like to sit at a
