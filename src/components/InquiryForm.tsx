import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, Flame, Dumbbell, ShieldAlert, Award } from 'lucide-react';
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

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (initialGoal) {
      setFormData(prev => ({ ...prev, fitnessGoal: initialGoal }));
    }
  }, [initialGoal]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const getCustomDiagnosis = () => {
    const goals = {
      'fat-loss': {
        title: "Single-Digit Fat Shred Protocol Blueprint Selected",
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
    <div id="booking-section" className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 left-0 w-80 h-80 bg-lime-500/5 rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="max-w-xl mx-auto text-center mb-8">
              <span className="text-[10px] font-mono tracking-widest text-[#bfff00] uppercase font-bold bg-[#bfff00]/10 px-3 py-1 rounded-full border border-[#bfff00]/25">
                Apply for Elite 1-on-1 Coaching
              </span>
              <h3 className="text-3xl font-extrabold text-white mt-3 font-sans tracking-tight">
                LET'S BUILD YOUR BIOLOGY.
              </h3>
              <p className="text-zinc-400 text-sm mt-3">
                Stop guessing. I choose to work with a small, highly dedicated roster of clients who are ready to respect science, train fiercely, and dominate their targets. Fill out your details, and let's craft your transformation roadmap.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">First & Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-zinc-90 w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-500 transition-colors"
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

              {preloadedCalories && (
                <div className="bg-zinc-900 border border-lime-950 px-4 py-3 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-lime-400" />
                    <span className="text-xs text-zinc-300 font-semibold">Preloaded Target Calories from Calibrator:</span>
                  </div>
                  <span className="text-xs font-mono text-lime-400 font-bold bg-[#bfff00]/10 px-2.5 py-0.5 rounded border border-[#bfff00]/25">
                    {preloadedCalories} kcal/day
                  </span>
                </div>
              )}

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Current Hurdles & Lifestyle (Optional)</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-500 transition-colors resize-none"
                  placeholder="Tell me a bit about your current weight, recovery challenges, or past goals so I can analyze your case..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer bg-lime-400 hover:bg-white text-black font-extrabold text-sm py-4 rounded-xl shadow-xl transition-all uppercase tracking-wider flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Transmitting Application Data...</span>
                  </>
                ) : (
                  <>
                    <span>SUBMIT BLUEPRINT REQUEST</span>
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto py-8 text-center"
          >
            <div className="inline-flex p-4 bg-lime-950/40 border border-lime-800/40 rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-lime-400" />
            </div>

            <h3 className="text-3xl font-extrabold text-white mb-2 tracking-tight">APPLICATION TRANSMITTED</h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto mb-8">
              Thank you, <span className="text-white font-bold">{formData.name}</span>! Your biometrics and program choice have been transmitted to Coach Ishan's queue. You will receive a direct reply within 12 hours.
            </p>

            {/* Simulated Live Diagnosis Section based on selected Goal */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 text-left space-y-5">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 text-[#bfff00]" />
                  <h4 className="text-sm font-extrabold text-white font-mono tracking-wider uppercase">ISHAN'S INSTANT HYPOTHESIS</h4>
                </div>
                <div className="text-[10px] bg-lime-950/40 border border-lime-800/30 text-lime-400 px-2.5 py-0.5 rounded font-mono uppercase font-bold">
                  {diagnosis.focus}
                </div>
              </div>

              <div>
                <span className="text-xs font-mono text-zinc-500 uppercase block mb-1">Target Protocol</span>
                <p className="text-md text-white font-semibold">{diagnosis.title}</p>
              </div>

              <div className="space-y-3 pt-1">
                <span className="text-xs font-mono text-zinc-500 uppercase block">Critical Biomechanical Constraints:</span>
                <ul className="space-y-2.5">
                  {diagnosis.cues.map((cue, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#bfff00] shrink-0 mt-2" />
                      <span>{cue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-zinc-850/60 flex items-center gap-3">
                <div className="h-9 w-9 bg-zinc-800 rounded-full flex items-center justify-center font-bold text-xs text-lime-400 font-mono border border-zinc-700">
                  IB
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-none">Ishan Bajaj</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5 font-mono">Founder, Personal Fitness Coaching Portal</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  fitnessGoal: 'fat-loss',
                  experience: 'intermediate',
                  message: ''
                });
              }}
              className="mt-8 text-xs font-mono text-zinc-500 hover:text-white transition-colors uppercase border-b border-zinc-800 pb-0.5"
            >
              ← Submit Another Inquiry / Change Data
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
