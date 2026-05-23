import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../supabaseClient';
import { Send, CheckCircle, Flame, Dumbbell } from 'lucide-react';

interface InquiryFormProps {
  initialGoal?: 'muscle' | 'fat-loss' | 'meal-plan' | 'recomp';
  preloadedCalories?: number;
}

export default function InquiryForm({ initialGoal = 'fat-loss', preloadedCalories }: InquiryFormProps) {
  const [formData, setFormData] = useState({
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setSubmitting(true);
    setServerError(null);

    try {
      // Columns are explicitly matched to database schema here
      const { error } = await supabase
        .from('inquiries')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            fitness_goal: formData.fitnessGoal,
            experience: formData.experience,
            message: formData.message,
            calculated_calories: preloadedCalories || null
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

  return (
    <div id="booking-section" className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-2xl">
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
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-5 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">First & Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-500 transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Your Best Email address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-500 transition-colors"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Primary Physique Target</label>
                  <select
                    value={formData.fitnessGoal}
                    onChange={(e) => setFormData(prev => ({ ...prev, fitnessGoal: e.target.value as any }))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-500 transition-colors cursor-pointer"
                  >
                    <option value="fat-loss">Ultimate Fat Loss (Shred Protocol)</option>
                    <option value="muscle">Muscle Building (Hypertrophy Matrix)</option>
                    <option value="recomp">Body Recomposition (Recomp Phase)</option>
                    <option value="meal-plan">Customized Metabolic Meal Planning Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Lifting Experience</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value as any }))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-500 transition-colors cursor-pointer"
                  >
                    <option value="beginner">Less than 1 Year (Beginner basics)</option>
                    <option value="intermediate">1 to 3 Years (Standard Plateau range)</option>
                    <option value="advanced">3+ Years (Advanced optimization)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Current Hurdles & Lifestyle (Optional)</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-500 transition-colors resize-none"
                  placeholder="Tell me a bit about your lifecycle constraints..."
                />
              </div>

              {serverError && (
                <p className="text-red-400 text-xs text-center font-mono">{serverError}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full cursor-pointer bg-lime-400 hover:bg-white text-black font-extrabold text-sm py-4 rounded-xl shadow-xl transition-all uppercase tracking-wider flex items-center justify-center gap-2 group"
              >
                {submitting ? (
                  <span>TRANSMITTING DATA TO DATABASE...</span>
                ) : (
                  <>
                    <span>SUBMIT BLUEPRINT REQUEST</span>
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto py-8 text-center">
            <div className="inline-flex p-4 bg-lime-950/40 border border-lime-800/40 rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-lime-400" />
            </div>
            <h3 className="text-3xl font-extrabold text-white mb-2 tracking-tight">APPLICATION TRANSMITTED</h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto mb-4">
              Thank you, <span className="text-white font-bold">{formData.name}</span>! Your parameters have been safely recorded inside Supabase cloud database.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
