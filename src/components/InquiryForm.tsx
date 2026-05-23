import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

interface InquiryFormProps {
  initialGoal?: 'muscle' | 'fat-loss' | 'meal-plan' | 'recomp';
  preloadedCalories?: number;
}

export default function InquiryForm({ initialGoal = 'fat-loss' }: InquiryFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Matches your exact 3 active columns in your Supabase table schema
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            name: name,
            email: email,
            selected_goal: initialGoal
          }
        ]);

      if (error) throw error;
      
      setIsSuccess(true);
      setName('');
      setEmail('');
    } catch (err) {
      console.error('Submission Error:', err);
      alert('Application failed to transmit. Please check your network connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 text-center space-y-4 max-w-md mx-auto my-12">
        <div className="h-12 w-12 bg-lime-950/50 border border-lime-800/40 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-6 w-6 text-lime-400" />
        </div>
        <h3 className="text-xl font-extrabold text-white uppercase tracking-tight">Application Transmitted</h3>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Your blueprint parameters have been logged to the cloud. Ishan will review your physique requirements and reach out shortly.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="text-xs font-mono text-lime-400 hover:underline pt-2 block mx-auto"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950/40 border border-zinc-900 rounded-3xl p-6 md:p-10 max-w-xl mx-auto my-12">
      <div className="space-y-2 mb-8 text-center">
        <span className="text-[10px] font-mono tracking-widest text-[#bfff00] uppercase font-bold">Secure Intake Portal</span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-tight">Apply For Blueprint Allocation</h2>
        <p className="text-xs text-zinc-500 max-w-sm mx-auto">
          Active Goal Setup: <span className="text-white font-mono uppercase font-semibold">{initialGoal.replace('-', ' ')}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block font-bold">Full Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-lime-400 font-medium transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block font-bold">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@email.com"
            className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-lime-400 font-medium transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#bfff00] hover:bg-white disabled:bg-zinc-800 text-black disabled:text-zinc-500 font-extrabold text-xs py-4 rounded-xl shadow-xl transition-all uppercase tracking-wider flex items-center justify-center gap-2 mt-4 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Transmitting Metrics...</span>
            </>
          ) : (
            <>
              <Send className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>Submit Coaching Application</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
