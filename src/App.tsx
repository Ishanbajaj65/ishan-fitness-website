import React, { useState } from 'react';
import { 
  Shield, Clock, Utensils, Brain, Activity, Briefcase, 
  ChevronDown, MessageSquare, Smartphone, BarChart3, HelpCircle 
} from 'lucide-react';
import InquiryForm from './components/InquiryForm';

export default function App() {
  // State for controlling the FAQ accordion toggles
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
              className="bg-
