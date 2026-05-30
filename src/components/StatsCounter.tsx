import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sub: string;
  icon: string;
}

const STATS: Stat[] = [
  { value: 200, suffix: '+', label: 'Clients Transformed', sub: 'Across 12+ countries', icon: 'groups' },
  { value: 8, suffix: '+', label: 'Years Coaching', sub: 'Evidence-based practice', icon: 'military_tech' },
  { value: 94, suffix: '%', label: 'Goal Achievement Rate', sub: 'Tracked over 16-week cycles', icon: 'target' },
  { value: 9, suffix: '%', prefix: '<', label: 'BF% Milestone Reached', sub: 'Elite conditioning tier', icon: 'bolt' },
];

function useCountUp(target: number, duration = 2000, triggered: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [triggered, target, duration]);
  return count;
}

function StatCard({ stat, index, triggered }: { stat: Stat; index: number; triggered: boolean }) {
  const count = useCountUp(stat.value, 1800 + index * 200, triggered);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group flex flex-col items-center text-center p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:border-[rgba(225,29,72,0.2)] hover:bg-[rgba(225,29,72,0.02)] transition-all duration-300"
    >
      {/* top orb glow */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(225,29,72,0.06) 0%, transparent 70%)' }} />

      {/* icon */}
      <div className="mb-5 h-12 w-12 rounded-2xl bg-[rgba(225,29,72,0.08)] border border-[rgba(225,29,72,0.15)] flex items-center justify-center group-hover:bg-[rgba(225,29,72,0.12)] transition-colors">
        <span className="material-symbols-outlined text-[#e11d48] text-xl">{stat.icon}</span>
      </div>

      {/* number */}
      <div className="font-display text-5xl md:text-6xl font-black tracking-tight leading-none mb-2" style={{ color: '#e11d48', textShadow: '0 0 30px rgba(225,29,72,0.4)' }}>
        {stat.prefix || ''}{count}{stat.suffix}
      </div>

      {/* label */}
      <p className="text-white font-bold text-sm uppercase tracking-wider mb-1">{stat.label}</p>
      <p className="text-[#9ca3af] text-xs font-mono">{stat.sub}</p>

      {/* bottom line accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-3/4 bg-gradient-to-r from-transparent via-[#e11d48] to-transparent transition-all duration-500" />
    </motion.div>
  );
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="stats" className="relative py-20 overflow-hidden border-y border-white/5">
      {/* bg grid */}
      <div className="absolute inset-0 blueprint-grid opacity-40" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(225,29,72,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="relative max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-badge mb-4 inline-flex">
            <span className="material-symbols-outlined text-xs">leaderboard</span>
            By The Numbers
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-[-0.03em] uppercase mt-4">
            Results That <span className="text-[#e11d48] neon-text">Speak</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <div key={s.label}>
              <StatCard stat={s} index={i} triggered={triggered} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
