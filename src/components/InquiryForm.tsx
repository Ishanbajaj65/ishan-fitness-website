import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../supabaseClient';
import { Send, CheckCircle } from 'lucide-react';

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [succeeded, setSucceeded] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setSubmitting(true);
    setServerError(null);

    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([
          {
            name: formData.name,
            phone: formData.phone
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
    <div id="booking-section" className="w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 left-0 w-80 h-80 bg-lime-500/5 rounded-full blur-3xl pointer-events-none" />

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
              <p className="text-zinc-400 text-sm mt-2">
                Enter your details below and I will get in touch with you shortly.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-5 max-w-xl mx-auto">
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
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-500 transition-colors"
                  placeholder="Enter your phone number"
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
                  <span>TRANSMITTING DATA...</span>
                ) : (
                  <>
                    <span>SUBMIT REQUEST</span>
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
              Thank you, <span className="text-white font-bold">{formData.name}</span>! Your contact information has been safely recorded.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
