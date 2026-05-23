import React, { useState } from 'react';

export default function InquiryForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Reaching your project REST API endpoint directly via native fetch requests
    try {
      const response = await fetch('https://knasbbtfshasayiswpsv.supabase.co/rest/v1/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuYXNiYnRmc2hhc2F5aXN3cHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTg3MjYsImV4cCI6MjAzMjAzNDcyNn0.8mR0fB0_Y29wX_E34XN9X24yXzE5XzIzXzE0XzU0XzM5',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuYXNiYnRmc2hhc2F5aXN3cHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTg3MjYsImV4cCI6MjAzMjAzNDcyNn0.8mR0fB0_Y29wX_E34XN9X24yXzE5XzIzXzE0XzU0XzM5',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ name, email, whatsapp })
      });

      if (!response.ok) throw new Error('Transmission rejected');

      setIsSuccess(true);
      setName('');
      setEmail('');
      setWhatsapp('');
    } catch (err) {
      alert('Application failed to transmit. Please check your network connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 text-center space-y-4 max-w-md mx-auto my-12">
        <h3 className="text-xl font-extrabold text-white uppercase tracking-tight">Application Transmitted</h3>
        <p className="text-xs text-zinc-400">Logged to your cloud tracking engine successfully.</p>
        <button onClick={() => setIsSuccess(false)} className="text-xs text-lime-400 hover:underline">Submit another</button>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950/40 border border-zinc-900 rounded-3xl p-6 md:p-10 max-w-xl mx-auto my-12">
      <div className="space-y-2 mb-8 text-center">
        <span className="text-[10px] font-mono tracking-widest text-[#bfff00] uppercase font-bold">Secure Intake Portal</span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-tight">Apply For Blueprint Allocation</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono uppercase text-zinc-400 block font-bold">Full Name</label>
          <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-3 text-sm text-white focus:border-lime-400 font-medium" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono uppercase text-zinc-400 block font-bold">Email Address</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="johndoe@email.com" className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-3 text-sm text-white focus:border-lime-400 font-medium" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono uppercase text-zinc-400 block font-bold">WhatsApp Number</label>
          <input type="tel" required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+91 99999 99999" className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-3 text-sm text-white focus:border-lime-400 font-medium" />
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full bg-[#bfff00] hover:bg-white text-black font-extrabold text-xs py-4 rounded-xl transition-all uppercase tracking-wider cursor-pointer">
          {isSubmitting ? 'Transmitting Metrics...' : 'Submit Coaching Application'}
        </button>
      </form>
    </div>
  );
}
