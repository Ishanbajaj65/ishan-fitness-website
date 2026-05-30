import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Gift, CheckCircle, Loader, ArrowRight, Zap } from 'lucide-react';
import { supabase } from '../supabaseClient';

const PLAN_FEATURES = [
  { icon: '🏋️', title: 'Day-by-Day Workout Protocol', desc: 'Full 7-day training split with sets, reps & rest periods' },
  { icon: '🥗', title: 'Sample Meal Plan', desc: 'Practical Indian-friendly meals mapped to your calorie targets' },
  { icon: '💊', title: 'Supplement Cheat Sheet', desc: 'What actually works (and what to avoid) — evidence-based' },
  { icon: '📊', title: 'Progress Tracking Template', desc: 'Spreadsheet to track weight, measurements, and lifts' },
  { icon: '🧠', title: 'Mindset Kickstart Guide', desc: 'The mental framework elite physique athletes use daily' },
  { icon: '⚡', title: 'Quick-Start Checklist', desc: '10 high-impact actions to do in your first 48 hours' },
];

export default function LeadMagnet() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errMsg, setErrMsg] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setErrMsg('Please enter a valid email address.');
      return;
    }
    setState('loading');
    setErrMsg('');

    try {
      const { error } = await supabase.from('leads').insert([
        { name: name.trim() || null, email: email.trim().toLowerCase(), source: '7day-kickstart' }
      ]);
      if (error && error.code !== '23505') throw error; // ignore duplicate
      setState('success');
    } catch {
      setState('error');
      setErrMsg('Something went wrong. Please try again or message on WhatsApp.');
    }
  };

  return (
    <section id="free-plan" className="relative py-24 overflow-hidden">
      {/* background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/lead_magnet_bg.png"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, #030303 0%, rgba(3,3,3,0.85) 40%, rgba(10,20,0,0.9) 100%)'
        }} />
      </div>

      {/* lime orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #e11d48 0%, transparent 70%)', filter: 'blur(100px)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-8"
        style={{ background: 'radial-gradient(circle, #e11d48 0%, transparent 70%)', filter: 'blur(120px)', transform: 'translate(-30%, 30%)' }} />

      <div className="relative max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="section-badge">
                <Gift className="h-3 w-3" />
                Free Resource
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-[-0.03em] uppercase mt-4 leading-tight">
                Claim Your <span className="text-[#e11d48] neon-text">FREE</span><br />7-Day Kickstart Plan
              </h2>
              <p className="text-[#9ca3af] text-sm leading-relaxed">
                The exact framework Ishan gives new clients in week one. No fluff — just the actionable protocols that create momentum fast.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PLAN_FEATURES.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/6 hover:border-[rgba(225,29,72,0.15)] transition-colors group"
                >
                  <span className="text-xl shrink-0 mt-0.5">{f.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-[#e11d48] transition-colors">{f.title}</p>
                    <p className="text-[10px] text-[#9ca3af] mt-0.5 leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Email form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {state === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card-lime rounded-3xl p-10 text-center space-y-5"
                >
                  <div className="h-20 w-20 rounded-full bg-[rgba(225,29,72,0.1)] border border-[rgba(225,29,72,0.3)] flex items-center justify-center mx-auto">
                    <CheckCircle className="h-10 w-10 text-[#e11d48]" />
                  </div>
                  <h3 className="font-display text-2xl font-black text-white uppercase tracking-tight">You're In!</h3>
                  <p className="text-[#9ca3af] text-sm leading-relaxed">
                    Your 7-Day Kickstart Plan is on its way to <span className="text-white font-semibold">{email}</span>. Check your inbox (and spam folder) within the next 10 minutes.
                  </p>
                  <p className="text-[10px] font-mono text-[#9ca3af] uppercase tracking-widest">
                    Want a fully personalized protocol? →
                  </p>
                  <a
                    href="#intake-portal"
                    className="inline-flex items-center gap-2 neon-btn px-6 py-3 rounded-xl font-mono text-xs font-black uppercase tracking-widest"
                  >
                    Apply for 1-on-1 Coaching <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  className="glass-card rounded-3xl p-8 md:p-10 space-y-6"
                >
                  {/* form header */}
                  <div className="flex items-center gap-3 pb-6 border-b border-white/5">
                    <div className="h-12 w-12 rounded-2xl bg-[rgba(225,29,72,0.08)] border border-[rgba(225,29,72,0.2)] flex items-center justify-center shrink-0">
                      <Zap className="h-6 w-6 text-[#e11d48]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Free 7-Day Kickstart Plan</p>
                      <p className="text-[10px] font-mono text-[#9ca3af]">Delivered instantly to your inbox</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[9px] font-mono text-[#9ca3af] uppercase tracking-widest block mb-2">Your First Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm font-mono placeholder:text-white/20 focus:border-[rgba(225,29,72,0.4)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-mono text-[#9ca3af] uppercase tracking-widest block mb-2">Email Address *</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm font-mono placeholder:text-white/20 focus:border-[rgba(225,29,72,0.4)] transition-colors"
                      />
                    </div>
                  </div>

                  {errMsg && <p className="text-red-400 text-xs font-mono">{errMsg}</p>}

                  <button
                    type="submit"
                    disabled={state === 'loading'}
                    className="w-full neon-btn py-4 rounded-xl font-mono font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:scale-[0.98] transition-transform disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {state === 'loading' ? (
                      <><Loader className="h-4 w-4 animate-spin" /> Sending...</>
                    ) : (
                      <><Mail className="h-4 w-4" /> Send Me the Free Plan</>
                    )}
                  </button>

                  <div className="flex items-center gap-2 justify-center">
                    <span className="material-symbols-outlined text-sm text-[#9ca3af]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                    <p className="text-[9px] font-mono text-[#9ca3af] text-center">
                      No spam, ever. Unsubscribe anytime. Your data stays private.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
