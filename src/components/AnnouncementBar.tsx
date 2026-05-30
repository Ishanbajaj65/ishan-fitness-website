import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Zap, Clock } from 'lucide-react';

const SPOTS_LEFT = 3;

function useCountdown(targetDate: Date) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(() => {
    return sessionStorage.getItem('ib-announcement-dismissed') !== '1';
  });

  const dismiss = () => {
    sessionStorage.setItem('ib-announcement-dismissed', '1');
    setVisible(false);
  };

  // countdown to end of current month
  const target = new Date();
  target.setMonth(target.getMonth() + 1, 1);
  target.setHours(0, 0, 0, 0);
  const { days, hours, minutes, seconds } = useCountdown(target);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div
            className="relative w-full flex items-center justify-center gap-3 px-4 py-2.5 text-center overflow-hidden"
            style={{
              background: 'linear-gradient(90deg, #050505 0%, #1a0308 30%, #2d050c 50%, #1a0308 70%, #050505 100%)',
              borderBottom: '1px solid rgba(225,29,72,0.25)',
            }}
          >
            {/* shimmer layer */}
            <div className="announcement-shimmer" />

            {/* content */}
            <div className="flex items-center gap-2 shrink-0">
              <Zap className="h-3.5 w-3.5 text-[#e11d48] fill-[#e11d48] animate-pulse shrink-0" />
              <span className="text-[#e11d48] text-[10px] font-mono font-black uppercase tracking-widest">
                Only {SPOTS_LEFT} Spots Left
              </span>
            </div>

            <div className="hidden sm:block h-3 w-px bg-white/10" />

            <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-white/50 shrink-0">
              <Clock className="h-3 w-3 shrink-0" />
              <span>Intake closes in</span>
              <span className="font-bold text-white/80">
                {pad(days)}d {pad(hours)}h {pad(minutes)}m {pad(seconds)}s
              </span>
            </div>

            <div className="hidden sm:block h-3 w-px bg-white/10" />

            <a
              href="https://wa.me/917297946193?text=Hi%20Ishan%2C%20I%20want%20to%20secure%20one%20of%20the%20remaining%20coaching%20spots."
              target="_blank"
              rel="noreferrer"
              className="shrink-0 bg-[#e11d48] text-white text-[9px] font-mono font-black uppercase tracking-widest px-3 py-1.5 rounded-full hover:bg-[#fb7185] transition-colors"
            >
              Secure Your Spot →
            </a>

            <button
              onClick={dismiss}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors p-1"
              aria-label="Dismiss"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
