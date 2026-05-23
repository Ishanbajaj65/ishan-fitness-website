import { motion } from 'motion/react';
import { Star, Quote, TrendingUp } from 'lucide-react';

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
    avatar: 'R',
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
    avatar: 'A',
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
    avatar: 'V',
  },
];

export default function TestimonialsSection() {
  return (
    <div id="testimonials-section" className="space-y-14">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto space-y-4">
        <span className="section-badge">
          <TrendingUp className="h-3 w-3" />
          Client Results
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-[-0.03em] uppercase">
          Real Transformations
        </h2>
        <p className="text-[#8d9479] text-sm leading-relaxed">
          Not influencer selfies. These are verified client outcomes from individuals who committed to the science.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
            className="glass-card-lime rounded-3xl p-7 flex flex-col justify-between hover-float group"
          >
            {/* Quote icon */}
            <Quote className="absolute top-5 right-5 h-5 w-5 text-[rgba(191,255,0,0.15)] group-hover:text-[rgba(191,255,0,0.3)] transition-colors" />

            <div className="space-y-5">
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 text-[#bfff00] fill-[#bfff00]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#c3caac] text-sm leading-relaxed">"{t.quote}"</p>

              {/* Before → After */}
              <div className="flex items-center gap-3 bg-[rgba(0,0,0,0.3)] border border-[rgba(191,255,0,0.1)] rounded-xl p-3">
                <div className="text-center flex-1">
                  <span className="text-[9px] font-mono text-[#8d9479] uppercase tracking-widest block mb-1">Before</span>
                  <span className="text-sm font-bold font-mono text-[#8d9479]">{t.before}</span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-[rgba(255,255,255,0.1)] via-[#bfff00] to-[rgba(255,255,255,0.1)]" />
                <div className="text-center flex-1">
                  <span className="text-[9px] font-mono text-[#8d9479] uppercase tracking-widest block mb-1">After</span>
                  <span className="text-sm font-bold font-mono text-[#bfff00]">{t.after}</span>
                </div>
              </div>
            </div>

            {/* Client Info */}
            <div className="mt-6 pt-5 border-t border-[rgba(191,255,0,0.1)] flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-[rgba(191,255,0,0.1)] border border-[rgba(191,255,0,0.25)] flex items-center justify-center font-black text-[#bfff00] text-sm font-mono">
                {t.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white">{t.name}</p>
                <p className="text-[10px] text-[#8d9479] truncate">{t.role}</p>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#bfff00] bg-[rgba(191,255,0,0.06)] border border-[rgba(191,255,0,0.15)] px-2.5 py-1 rounded-full shrink-0">
                {t.result}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
