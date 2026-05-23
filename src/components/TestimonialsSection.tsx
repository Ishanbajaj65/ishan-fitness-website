import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Rahul M.',
    role: 'Software Engineer, Bangalore',
    result: 'Lost 14kg in 16 weeks',
    quote:
      "I'd tried 3 different coaches before Ishan. None of them explained the why. Ishan breaks down every macro adjustment scientifically — you learn while you transform. Best investment I've made in myself.",
    rating: 5,
    before: '28% BF',
    after: '11% BF',
  },
  {
    name: 'Arjun S.',
    role: 'Startup Founder, Mumbai',
    result: '+8kg lean muscle in 12 weeks',
    quote:
      "As a founder with zero predictable schedule, I was sure 'fitness coaching' was not for me. Ishan built a plan around my chaos — travel days, late nights, everything. I hit my first serious bulk in 3 years.",
    rating: 5,
    before: '68kg',
    after: '76kg (lean)',
  },
  {
    name: 'Vikram P.',
    role: 'Corporate Professional, Delhi',
    result: 'Single-digit body fat achieved',
    quote:
      "I wanted to go from 18% to under 10% body fat before my wedding. Ishan's refeed strategy and leptin management meant I kept my energy and strength the entire way through. Achieved 8.6% by the date. Absolutely insane.",
    rating: 5,
    before: '18% BF',
    after: '8.6% BF',
  },
];

export default function TestimonialsSection() {
  return (
    <div id="testimonials-section" className="space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-[10px] font-mono tracking-widest text-[#bfff00] uppercase font-bold">
          Client Results
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          REAL TRANSFORMATIONS
        </h2>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Not influencer selfies. These are verified client outcomes from individuals who committed to the science.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="relative bg-zinc-950 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors"
          >
            {/* Quote icon */}
            <Quote className="absolute top-5 right-5 h-6 w-6 text-zinc-800" />

            <div className="space-y-4">
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 text-[#bfff00] fill-[#bfff00]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-zinc-300 text-sm leading-relaxed">"{t.quote}"</p>

              {/* Before → After */}
              <div className="flex items-center gap-3 bg-zinc-900/60 border border-zinc-800 rounded-xl p-3">
                <div className="text-center flex-1">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-0.5">Before</span>
                  <span className="text-sm font-bold font-mono text-zinc-400">{t.before}</span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-zinc-700 via-[#bfff00] to-zinc-700" />
                <div className="text-center flex-1">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-0.5">After</span>
                  <span className="text-sm font-bold font-mono text-[#bfff00]">{t.after}</span>
                </div>
              </div>
            </div>

            {/* Client Info */}
            <div className="mt-5 pt-4 border-t border-zinc-900 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-white text-sm font-mono">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-semibold text-white">{t.name}</p>
                <p className="text-[10px] text-zinc-500">{t.role}</p>
              </div>
              <span className="ml-auto text-[10px] font-mono font-bold text-[#bfff00] bg-lime-950/30 border border-lime-800/30 px-2 py-0.5 rounded-full">
                {t.result}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
