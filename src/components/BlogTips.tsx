import { motion } from 'motion/react';
import { BookOpen, ExternalLink } from 'lucide-react';

const TIPS = [
  {
    category: 'Training',
    categoryColor: '#e11d48',
    icon: '💪',
    title: 'Progressive Overload Is Non-Negotiable',
    body: 'Muscle grows when forced to adapt to increasing stress. Add weight, reps, or sets every session — even 2.5kg more counts. Without progressive overload, you\'re just maintaining, never growing.',
    readTime: '2 min read',
    tag: 'Foundation',
  },
  {
    category: 'Nutrition',
    categoryColor: '#f59e0b',
    icon: '🥩',
    title: 'Protein Timing: What The Science Says',
    body: 'Hit 1.6–2.2g of protein per kg bodyweight daily. Spread it across 3–4 meals for maximum MPS (muscle protein synthesis). The "anabolic window" is real but forgiving — you have 2–3 hours post-workout.',
    readTime: '3 min read',
    tag: 'Science-Backed',
  },
  {
    category: 'Recovery',
    categoryColor: '#e11d48',
    icon: '😴',
    title: 'Sleep Is Your #1 Performance Drug',
    body: '80% of growth hormone is released during deep sleep. 7–9 hours isn\'t optional — it\'s where muscle is built and fat is mobilized. Chronic sleep debt raises cortisol, kills testosterone, and stalls fat loss.',
    readTime: '2 min read',
    tag: 'High Impact',
  },
  {
    category: 'Training',
    categoryColor: '#e11d48',
    icon: '📉',
    title: 'Why Deload Weeks Are Smart, Not Weak',
    body: 'After 4–6 weeks of hard training, accumulated fatigue masks your fitness. A planned deload (50–60% volume at same intensity) clears fatigue and lets you come back stronger. Elite athletes swear by it.',
    readTime: '2 min read',
    tag: 'Recovery',
  },
  {
    category: 'Nutrition',
    categoryColor: '#f59e0b',
    icon: '🍕',
    title: 'Flexible Dieting: Freedom Without Chaos',
    body: 'IIFYM (If It Fits Your Macros) lets you eat any food and still shred fat. Hit your protein target first, then fill carbs and fats however you like. 80% whole foods + 20% flexible = sustainable forever.',
    readTime: '3 min read',
    tag: 'Lifestyle',
  },
  {
    category: 'Training',
    categoryColor: '#e11d48',
    icon: '🧠',
    title: 'The Mind-Muscle Connection Is Real',
    body: 'Thinking about the muscle you\'re working increases EMG activation by up to 20%. Slow down, feel the contraction, control the eccentric. You build more with lighter weight and proper focus than heavy sloppy reps.',
    readTime: '2 min read',
    tag: 'Technique',
  },
];

export default function BlogTips() {
  return (
    <section id="coaching-intel" className="py-24 border-t border-white/5">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 space-y-4"
        >
          <span className="section-badge">
            <BookOpen className="h-3 w-3" />
            Coaching Intel
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-[-0.03em] uppercase mt-4">
            Science-Backed <span className="text-[#e11d48] neon-text">Tips</span>
          </h2>
          <p className="text-[#9ca3af] text-sm max-w-md mx-auto">
            Curated knowledge from 8+ years of evidence-based coaching. Free game, no fluff.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TIPS.map((tip, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group relative glass-card rounded-2xl p-6 flex flex-col justify-between hover:border-[rgba(225,29,72,0.18)] transition-all duration-300 cursor-default overflow-hidden"
            >
              {/* hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(225,29,72,0.05) 0%, transparent 70%)' }} />

              {/* bottom border accent */}
              <div className="absolute bottom-0 left-6 right-6 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(225,29,72,0.4), transparent)' }} />

              <div className="space-y-4 relative">
                {/* top row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                      style={{ color: tip.categoryColor, background: `${tip.categoryColor}15`, border: `1px solid ${tip.categoryColor}30` }}
                    >
                      {tip.category}
                    </span>
                    <span className="text-[9px] font-mono text-[#9ca3af] uppercase tracking-wider">{tip.tag}</span>
                  </div>
                  <span className="text-2xl shrink-0">{tip.icon}</span>
                </div>

                {/* title */}
                <h3 className="font-display text-lg font-black text-white tracking-tight leading-snug group-hover:text-[#e11d48] transition-colors duration-300">
                  {tip.title}
                </h3>

                {/* body */}
                <p className="text-[#9ca3af] text-xs leading-relaxed line-clamp-4">
                  {tip.body}
                </p>
              </div>

              {/* footer */}
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-wider">{tip.readTime}</span>
                <a
                  href="https://www.instagram.com/ishan_bajaj04/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[9px] font-mono text-[#9ca3af] hover:text-[#e11d48] flex items-center gap-1 transition-colors uppercase tracking-wider"
                >
                  More on IG <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://www.instagram.com/ishan_bajaj04/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 ghost-btn px-8 py-4 rounded-xl font-mono text-xs font-black uppercase tracking-widest hover:bg-[rgba(225,29,72,0.05)] transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            See All Tips on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
