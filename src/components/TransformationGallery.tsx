import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, TrendingDown, TrendingUp, Award } from 'lucide-react';

const TRANSFORMATIONS = [
  {
    id: 1,
    name: 'Rahul M.',
    location: 'Bangalore',
    duration: '16 Weeks',
    program: 'Single-Digit Shred Protocol',
    beforeStat: '28% BF • 92kg',
    afterStat: '11% BF • 78kg',
    lostGained: '−14kg fat',
    trend: 'loss',
    image: '/transformation_1.png',
    quote: 'Best 16 weeks of my life.',
  },
  {
    id: 2,
    name: 'Arjun S.',
    location: 'Mumbai',
    duration: '12 Weeks',
    program: 'Hypertrophy Matrix System',
    beforeStat: '68kg • Skinny-fat',
    afterStat: '76kg • Lean mass',
    lostGained: '+8kg muscle',
    trend: 'gain',
    image: '/transformation_3.png',
    quote: 'Packed on size while staying lean.',
  },
  {
    id: 3,
    name: 'Vikram P.',
    location: 'Delhi',
    duration: '16 Weeks',
    program: 'Single-Digit Shred Protocol',
    beforeStat: '18% BF • 85kg',
    afterStat: '8.6% BF • 76kg',
    lostGained: '−9.4% body fat',
    trend: 'loss',
    image: '/transformation_2.png',
    quote: 'Achieved 8.6% BF before my wedding.',
  },
];

export default function TransformationGallery() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const go = useCallback((newIdx: number, dir: number) => {
    setDirection(dir);
    setCurrent((newIdx + TRANSFORMATIONS.length) % TRANSFORMATIONS.length);
  }, []);

  const next = useCallback(() => go(current + 1, 1), [current, go]);
  const prev = useCallback(() => go(current - 1, -1), [current, go]);

  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => clearInterval(intervalRef.current);
  }, [next]);

  const t = TRANSFORMATIONS[current];

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section id="transformations" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(225,29,72,0.03) 0%, transparent 65%)' }} />

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 space-y-4"
        >
          <span className="section-badge">
            <Award className="h-3 w-3" />
            Transformations
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-[-0.03em] uppercase mt-4">
            Before <span className="text-[#e11d48] neon-text">&</span> After
          </h2>
          <p className="text-[#9ca3af] text-sm max-w-md mx-auto">
            Real physique engineering — not cherry-picked influencer photos. Every transformation is documented week by week.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => clearInterval(intervalRef.current)}
          onMouseLeave={() => { intervalRef.current = setInterval(next, 5000); }}
        >
          <div className="overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-0 glass-card rounded-3xl overflow-hidden"
              >
                {/* Image Panel */}
                <div className="relative min-h-[320px] lg:min-h-[460px] overflow-hidden">
                  <img
                    src={t.image}
                    alt={`${t.name} transformation`}
                    className="w-full h-full object-cover absolute inset-0"
                    style={{ objectPosition: 'center top' }}
                  />
                  {/* gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#141313]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141313] via-transparent to-transparent" />

                  {/* before / after labels */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-black/60 backdrop-blur-sm text-[9px] font-mono text-[#9ca3af] uppercase tracking-widest px-2.5 py-1.5 rounded-lg border border-white/10">
                      Before
                    </span>
                    <span className="text-[#9ca3af] self-center text-xs">→</span>
                    <span className="bg-[rgba(225,29,72,0.15)] backdrop-blur-sm text-[9px] font-mono text-[#e11d48] uppercase tracking-widest px-2.5 py-1.5 rounded-lg border border-[rgba(225,29,72,0.3)]">
                      After
                    </span>
                  </div>

                  {/* result badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur-md border border-[rgba(225,29,72,0.25)] rounded-xl px-4 py-2">
                    {t.trend === 'loss'
                      ? <TrendingDown className="h-4 w-4 text-[#e11d48]" />
                      : <TrendingUp className="h-4 w-4 text-[#e11d48]" />
                    }
                    <span className="text-[#e11d48] font-mono font-bold text-sm">{t.lostGained}</span>
                  </div>
                </div>

                {/* Info Panel */}
                <div className="flex flex-col justify-between p-8 md:p-10 space-y-6">
                  {/* program tag */}
                  <div>
                    <span className="text-[9px] font-mono text-[#9ca3af] uppercase tracking-widest">{t.program}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#e11d48] animate-pulse" />
                      <span className="text-[10px] font-mono text-[#e11d48] uppercase tracking-widest">{t.duration}</span>
                    </div>
                  </div>

                  {/* quote */}
                  <blockquote className="text-xl md:text-2xl font-bold text-white leading-tight">
                    "{t.quote}"
                  </blockquote>

                  {/* before → after stats */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-mono text-[#9ca3af] uppercase tracking-widest">Documented Progress</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/[0.03] border border-white/8 rounded-xl p-4">
                        <p className="text-[9px] font-mono text-[#9ca3af] uppercase tracking-widest mb-2">Start</p>
                        <p className="text-sm font-bold text-[#9ca3af] font-mono">{t.beforeStat}</p>
                      </div>
                      <div className="bg-[rgba(225,29,72,0.04)] border border-[rgba(225,29,72,0.2)] rounded-xl p-4">
                        <p className="text-[9px] font-mono text-[#e11d48] uppercase tracking-widest mb-2">Final</p>
                        <p className="text-sm font-bold text-[#e11d48] font-mono">{t.afterStat}</p>
                      </div>
                    </div>
                  </div>

                  {/* client */}
                  <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                    <div className="h-10 w-10 rounded-full bg-[rgba(225,29,72,0.1)] border border-[rgba(225,29,72,0.25)] flex items-center justify-center font-black text-[#e11d48] text-sm font-mono">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{t.name}</p>
                      <p className="text-xs text-[#9ca3af] font-mono">{t.location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full glass border border-white/10 flex items-center justify-center hover:border-[rgba(225,29,72,0.4)] hover:text-[#e11d48] text-white/50 transition-all z-10"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full glass border border-white/10 flex items-center justify-center hover:border-[rgba(225,29,72,0.4)] hover:text-[#e11d48] text-white/50 transition-all z-10"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Dot nav */}
        <div className="flex justify-center gap-2 mt-6">
          {TRANSFORMATIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > current ? 1 : -1)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? 'w-8 h-2 bg-[#e11d48]'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
