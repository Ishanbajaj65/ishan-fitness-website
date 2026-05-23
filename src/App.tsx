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
      
      {/* HEADER NAVBAR */}
      <nav className="w-full border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          
          {/* Left Side: Brand Logo & Name Only */}
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-semibold tracking-wide text-white">Ishan Fitness</span>
          </div>
          
          {/* Right Side: Clean Social Media Links Only */}
          <div className="flex items-center gap-5 text-slate-400">
