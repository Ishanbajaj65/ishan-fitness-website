import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm, ValidationError } from '@formspree/react';
import { Send, CheckCircle, Flame, Dumbbell, ShieldCheck } from 'lucide-react';
import { ClientInquiry } from '../types';

interface InquiryFormProps {
  initialGoal?: 'muscle' | 'fat-loss' | 'meal-plan' | 'recomp';
  preloadedCalories?: number;
}

export default function InquiryForm({ initialGoal = 'fat-loss', preloadedCalories }: InquiryFormProps) {
  // Integrated Formspree Hook with your explicit ID
  const [state, handleSubmit] = useForm("xjgzokqw");

  const [formData, setFormData] = useState<ClientInquiry>({
    name: '',
    email: '',
    fitnessGoal: initialGoal,
    experience: 'intermediate',
    message: ''
  });

  useEffect(() => {
    if (initialGoal) {
      setFormData(prev => ({ ...prev, fitnessGoal: initialGoal }));
    }
  }, [initialGoal]);

  const getCustomDiagnosis = () => {
    const goals = {
      'fat-loss': {
        title: "Fat Shred Protocol Blueprint Selected",
        cues: [
          "Targeting fat loss while guarding active myofibrillar tissue via targeted mechanical tension.",
          "Strategic refeeds to stimulate circulating Leptin hormones, maintaining high-geared metabolic rate.",
          "Slight deficit scaling prevents sudden metabolic adaptive thermogenesis."
        ],
        focus: "High Thermic Food Efficiency & Biomechanical Hypertrophy"
      },
      'muscle': {
        title: "Hypertrophy Matrix Blueprint Selected",
        cues: [
          "Focusing strictly on progressive overload structures (RIR 1-2 targets).",
          "Surplus parameterization maximizing nitrogen retention without excessive adipocyte growth (fat accumulation).",
          "Fatigue audits preventing central nervous system overload."
        ],
        focus: "Mechanical Tension & Progressive Volume Priming"
      },
      'recomp': {
        title: "Body Recomposition Phase Blueprint Selected",
        cues: [
          "Simultaneous lean mass loading and lipid reduction using cyclical calorie allocation.",
          "Prioritizing lift mechanics to sustain deep muscular tension.",
          "Macro-partitioning to funnel glycogen directly to matching muscular groups."
        ],
        focus: "Optimized Insulin Efficiency & Structural Loading"
      },
      'meal-plan': {
        title: "Metabolic Fuel Blueprint Selected",
        cues: [
          "Flexible structure designed to prevent systemic psychological stress.",
          "Targeted macronutrient split tracking direct bioenergetics of training.",
          "Optimizing digestive microenvironment pathways for maximum physical assimilation."
        ],
        focus: "Macronutrient Precision & Digestibility Optimizations"
      }
    };

    return goals[formData.fitnessGoal] || goals['fat-loss'];
  };

  const diagnosis = getCustomDiagnosis();

  return (
    <div id="booking-section" className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!state.succeeded ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="max-w-xl mx-auto text-center mb-6">
              <span className="text-xs font-medium bg-slate-900 text-emerald-400 px-3 py-1 rounded-full border border-slate-800">
                Apply for Personal 1-on-1 Coaching
              </span>
              <h3 className="text-2xl font-bold text-white mt-3 tracking-tight">
                Let's calibrate your biology.
              </h3>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                Stop guessing. I choose to work with a small, dedicated roster of clients who are ready to track metrics, build habits, and optimize their health. Fill out your details below to start.
              </p>
            </div>

            {/* Formspree submission hooks linked here */}
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs text-slate-400 font-medium mb-1.5">First & Last Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="Enter your name"
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-[11px] mt-1 block" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs text-slate-400 font-medium mb-1.5">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value
