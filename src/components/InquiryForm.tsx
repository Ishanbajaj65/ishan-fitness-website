import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../supabaseClient';
import { Send, CheckCircle, Flame, Dumbbell } from 'lucide-react';
import { ClientInquiry } from '../types';

interface InquiryFormProps {
  initialGoal?: 'muscle' | 'fat-loss' | 'meal-plan' | 'recomp';
  preloadedCalories?: number;
}

export default function InquiryForm({ initialGoal = 'fat-loss', preloadedCalories }: InquiryFormProps) {
  const [formData, setFormData] = useState<ClientInquiry>({
    name: '',
    email: '',
    fitnessGoal: initialGoal,
    experience: 'intermediate',
    message: ''
  });

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [succeeded, setSucceeded] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (initialGoal) {
      setFormData(prev => ({ ...prev, fitnessGoal: initialGoal }));
    }
  }, [initialGoal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setSubmitting(true);
    setServerError(null);

    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            fitness_goal: formData.fitnessGoal,
            experience: formData.experience,
            message: formData.message,
            calculated_calories: preloadedCalories || null,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;
      setSucceeded(true);
    } catch (err: any) {
      console.error(err);
      setServerError(err.message || 'Database connection error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

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
          "Surplus parameterization maximizing nitrogen retention without excessive adipocyte growth.",
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
    <div id="booking-section" className="w-full bg-slate-900/30 border border-slate-900 rounded-2xl p-6 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!succeeded ? (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="max-w-xl mx-auto text-center mb-6">
              <span className="text-xs font-medium bg-slate-900 text-emerald-400 px-3 py-1 rounded-full border border-slate-800">
                Apply for Personal 1-on-1 Coaching
              </span>
              <h3 className="text-2xl font-bold text-white mt-3 tracking-tight">
                Let's calibrate your biology.
              </h3>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                Stop guessing. Fill out your details below to start.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs text-slate-400 font-medium mb-1.5">First & Last Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs text-slate-400 font-medium mb-1.5">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fitnessGoal" className="block text-xs text-slate-400 font-medium mb-1.5">Physique Target</label>
                  <select
                    id="fitnessGoal"
                    value={formData.fitnessGoal}
                    onChange={(e) => setFormData(prev => ({ ...prev, fitnessGoal: e.target.value as any }))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
                  >
                    <option value="fat-loss">Fat Loss Protocol</option>
                    <option value="muscle">Muscle Building Matrix</option>
                    <option value="recomp">Body Recomposition Phase</option>
                    <option value="meal-plan">Metabolic Meal Planning</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-xs text-slate-400 font-medium mb-1.5">Lifting Experience</label>
                  <select
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value as any }))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
                  >
                    <option value="beginner">Less than 1 Year</option>
                    <option value="intermediate">1 to 3 Years</option>
                    <option value="advanced">3+ Years</option>
                  </select>
                </div>
              </div>

              {preloadedCalories && (
                <div className="bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-xs text-slate-300 font-medium">Preloaded Target Calories:</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {preloadedCalories} kcal/day
                  </span>
                </div>
              )}

              <div>
                <label htmlFor="message" className="block text-xs text-slate-400 font-medium mb-1.5">Current Hurdles & Lifestyle (Optional)</label>
                <textarea
                  id="message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  placeholder="Tell me a bit about your lifestyle constraints..."
                />
              </div>

              {serverError && (
                <p className="text-red-400 text-xs text-center">{serverError}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full cursor-pointer bg-slate-100 hover:bg-emerald-500 text-slate-950 font-semibold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 group mt-1"
              >
                {submitting ? (
                  <span>Saving to Database...</span>
                ) : (
                  <>
                    <span>Submit Blueprint Request</span>
                    <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl mx-auto py-4 text-center">
            <div className="inline-flex p-3 bg-slate-900 border border-slate-800 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Application Transmitted</h3>
            <p className="text-slate-400 text-xs max-w-sm mx-auto mb-6 leading-relaxed">
              Thank you, <span className="text-white font-semibold">{formData.name}</span>! Your details have been safely recorded inside Supabase cloud storage.
            </p>
            
            <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-5 text-left space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <Dumbbell className="h-4 w-4 text-emerald-400" />
                  <h4 className="text-xs font-bold text-white tracking-wide">Instant Assessment</h4>
                </div>
                <div className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium border border-slate-700/60 uppercase">
                  {diagnosis.focus}
                </div>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-medium block mb-0.5">Target Strategy</span>
                <p className="text-sm text-white font-semibold">{diagnosis.title}</p>
              </div>
              <div className="space-y-2 pt-0.5">
                <span className="text-[10px] text-slate-500 font-medium block">Key Optimization Anchors:</span>
                <ul className="space-y-2">
                  {diagnosis.cues.map((cue, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-400 leading-normal">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                      <span>{cue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
