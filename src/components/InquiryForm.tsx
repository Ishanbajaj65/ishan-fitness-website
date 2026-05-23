import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../supabaseClient';
import { Send, CheckCircle, ChevronDown } from 'lucide-react';

interface InquiryFormProps {
  prefilledGoal?: string;
  prefilledBmi?: string;
}

const GOAL_OPTIONS = [
  { value: 'fat-loss', label: 'Ultimate Fat Loss & Shred' },
  { value: 'muscle', label: 'Muscle Growth & Hypertrophy' },
  { value: 'recomp', label: 'Body Recomposition' },
  { value: 'meal-plan', label: 'Nutrition & Meal Planning Only' },
];

const FITNESS_LEVELS = [
  { value: 'beginner', label: 'Beginner (< 1 year training)' },
  { value: 'intermediate', label: 'Intermediate (1–3 years)' },
  { value: 'advanced', label: 'Advanced (3+ years consistent)' },
];

const INVESTMENT_OPTIONS = [
  { value: 'ready', label: 'I am ready to financially invest in premium 1-on-1 coaching' },
  { value: 'details', label: 'I need more details on pricing first' },
  { value: 'budget', label: 'I am looking for a free or low-budget program' },
];

const INJURY_OPTIONS = [
  { value: 'none', label: 'None - I am good to go!' },
  { value: 'yes', label: 'Yes, I have past/current injuries (please detail below)' },
];

export default function InquiryForm({ prefilledGoal, prefilledBmi }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    goal: prefilledGoal || 'fat-loss',
    fitnessLevel: 'intermediate',
    targetCalories: '',
    bmi: prefilledBmi || '',
    coachingInvestment: 'ready',
    injuries: 'none',
    message: '',
  });

  useEffect(() => {
    if (prefilledGoal) {
      setFormData((prev) => ({ ...prev, goal: prefilledGoal }));
    }
  }, [prefilledGoal]);

  useEffect(() => {
    if (prefilledBmi) {
      setFormData((prev) => ({ ...prev, bmi: prefilledBmi }));
    }
  }, [prefilledBmi]);

  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setSubmitting(true);
    setServerError(null);

    const bmiPart = formData.bmi ? `[Auto-Calculated BMI: ${formData.bmi}]` : '';
    const investLabel = INVESTMENT_OPTIONS.find(o => o.value === formData.coachingInvestment)?.label || formData.coachingInvestment;
    const injuryLabel = INJURY_OPTIONS.find(o => o.value === formData.injuries)?.label || formData.injuries;
    const detailsPart = `[Coaching Investment: ${investLabel}] [Injuries: ${injuryLabel}]`;
    
    const finalMessage = [bmiPart, detailsPart, formData.message].filter(Boolean).join(' ').trim();

    try {
      const { error } = await supabase.from('inquiries').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          goal: formData.goal,
          fitness_level: formData.fitnessLevel,
          target_calories: formData.targetCalories ? parseInt(formData.targetCalories) : null,
          message: finalMessage || null,
        },
      ]);

      if (error) throw error;
      setSucceeded(true);
    } catch (err: any) {
      console.error(err);
      setServerError(err.message || 'Database error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="intake-portal" className="w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 left-0 w-80 h-80 bg-lime-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!succeeded ? (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="max-w-xl mx-auto text-center mb-8">
              <span className="text-[10px] font-mono tracking-widest text-[#bfff00] uppercase font-bold bg-[#bfff00]/10 px-3 py-1 rounded-full border border-[#bfff00]/25">
                Apply for Elite 1-on-1 Coaching
              </span>
              <h3 className="text-3xl font-extrabold text-white mt-3 font-sans tracking-tight">
                LET'S BUILD YOUR BIOLOGY.
              </h3>
              <p className="text-zinc-400 text-sm mt-3">
                I work with a small, dedicated roster of clients. Fill in your details and I'll reach out within 24 hours.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 max-w-2xl mx-auto relative">
              {/* Row 1: Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    First &amp; Last Name <span className="text-[#bfff00]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-500 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Email Address <span className="text-[#bfff00]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-500 transition-colors"
                    placeholder="name@email.com"
                  />
                </div>
              </div>

              {/* Row 2: Phone + Fitness Level */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Phone / WhatsApp <span className="text-[#bfff00]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-500 transition-colors"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Training Experience
                  </label>
                  <div className="relative">
                    <select
                      name="fitnessLevel"
                      value={formData.fitnessLevel}
                      onChange={handleChange}
                      className="w-full appearance-none bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-500 transition-colors cursor-pointer"
                    >
                      {FITNESS_LEVELS.map((lvl) => (
                        <option key={lvl.value} value={lvl.value}>{lvl.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 3: Goal + Target Calories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Primary Goal
                  </label>
                  <div className="relative">
                    <select
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                      className="w-full appearance-none bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-500 transition-colors cursor-pointer"
                    >
                      {GOAL_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Calculated BMI
                    <span className="ml-1.5 text-[9px] text-[#bfff00] normal-case font-sans">(auto-filled from BMI calculator)</span>
                  </label>
                  <input
                    type="text"
                    name="bmi"
                    readOnly
                    value={formData.bmi}
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-500/50 transition-colors font-mono cursor-not-allowed"
                    placeholder="e.g. 22.4"
                  />
                </div>
              </div>

              {/* Row 4: Coaching Investment & Injuries */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Coaching Investment
                  </label>
                  <div className="relative">
                    <select
                      name="coachingInvestment"
                      value={formData.coachingInvestment}
                      onChange={handleChange}
                      className="w-full appearance-none bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-500 transition-colors cursor-pointer"
                    >
                      {INVESTMENT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Injuries / Medical Conditions
                  </label>
                  <div className="relative">
                    <select
                      name="injuries"
                      value={formData.injuries}
                      onChange={handleChange}
                      className="w-full appearance-none bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-500 transition-colors cursor-pointer"
                    >
                      {INJURY_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 5: Message */}
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Tell Me About Yourself
                  <span className="ml-1.5 text-[9px] text-zinc-500 normal-case font-sans">(optional)</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-500 transition-colors resize-none"
                  placeholder="Current challenges, lifestyle, what brought you here..."
                />
              </div>

              {serverError && (
                <p className="text-red-400 text-xs text-center font-mono bg-red-950/20 border border-red-900/30 rounded-xl py-2 px-3">
                  ⚠️ {serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full cursor-pointer bg-[#bfff00] hover:bg-white text-black font-extrabold text-sm py-4 rounded-xl shadow-xl transition-all uppercase tracking-wider flex items-center justify-center gap-2 group mt-2 disabled:opacity-60"
              >
                {submitting ? (
                  <span>TRANSMITTING TO ISHAN'S CORPS...</span>
                ) : (
                  <>
                    <span>SUBMIT APPLICATION</span>
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

              <p className="text-center text-[10px] text-zinc-600 font-mono">
                Your data is private and secure. No spam, ever.
              </p>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto py-10 text-center relative"
          >
            <div className="inline-flex p-4 bg-lime-950/40 border border-lime-800/40 rounded-full mb-6">
              <CheckCircle className="h-12 w-12 text-[#bfff00]" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-[#bfff00] uppercase font-bold bg-[#bfff00]/10 px-3 py-1 rounded-full border border-[#bfff00]/25">
              Application Transmitted
            </span>
            <h3 className="text-3xl font-extrabold text-white mt-4 mb-3 tracking-tight">
              WE'VE GOT YOU, {formData.name.split(' ')[0].toUpperCase()}.
            </h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed mb-8">
              Your application has been securely received. Ishan personally reviews every submission and will reach out via <span className="text-white font-semibold">WhatsApp or email</span> within <span className="text-[#bfff00] font-bold">24 hours</span>.
            </p>
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 text-left space-y-3 max-w-sm mx-auto">
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Application Summary</p>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Name</span>
                <span className="text-white font-semibold">{formData.name}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Goal</span>
                <span className="text-[#bfff00] font-semibold uppercase text-[10px] font-mono">
                  {GOAL_OPTIONS.find(g => g.value === formData.goal)?.label}
                </span>
              </div>
              {formData.bmi && (
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">Calculated BMI</span>
                  <span className="text-[#bfff00] font-mono font-semibold">{formData.bmi}</span>
                </div>
              )}
              <div className="flex flex-col gap-1 border-t border-zinc-800/50 pt-2 text-xs">
                <span className="text-zinc-500">Coaching Investment</span>
                <span className="text-[#bfff00] font-mono text-[10px] uppercase font-bold text-wrap">
                  {INVESTMENT_OPTIONS.find(o => o.value === formData.coachingInvestment)?.label}
                </span>
              </div>
              <div className="flex flex-col gap-1 border-t border-zinc-800/50 pt-2 text-xs">
                <span className="text-zinc-500">Injuries / Medical Conditions</span>
                <span className="text-white font-mono text-[10px] uppercase font-bold text-wrap">
                  {INJURY_OPTIONS.find(o => o.value === formData.injuries)?.label}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSucceeded(false)}
              className="mt-8 text-xs font-mono text-zinc-500 hover:text-white transition-colors uppercase border-b border-zinc-800 pb-0.5"
            >
              ← Submit Another Application
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
