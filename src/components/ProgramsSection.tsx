import { motion } from 'motion/react';

interface ProgramsSectionProps {
  onSelectPackage: (goalType: 'muscle' | 'fat-loss' | 'meal-plan' | 'recomp') => void;
}

export default function ProgramsSection({ onSelectPackage }: ProgramsSectionProps) {
  return (
    <div id="blueprints" className="space-y-16 text-left">
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary text-center uppercase mb-16 font-black tracking-tight">
        TRAINING <span className="text-[#b8f600]">BLUEPRINTS</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 — Muscle accretion */}
        <motion.div 
          whileHover={{ translateY: -5 }}
          className="glass-card rounded-xl p-8 flex flex-col hover:glass-card-active transition-all group relative border border-white/5"
        >
          <div className="w-12 h-12 rounded-full bg-[#b8f600]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[#b8f600]" style={{ fontVariationSettings: "'FILL' 1" }}>
              fitness_center
            </span>
          </div>
          <h3 className="font-display text-2xl font-black text-white uppercase mb-2 leading-none">
            HYPERTROPHY<br />BLUEPRINT
          </h3>
          <p className="font-body-md text-sm text-on-surface/70 mb-8 flex-grow leading-relaxed">
            Maximal muscle accretion through scientifically validated volume, loading parameters, and density landmarks.
          </p>
          <button 
            onClick={() => onSelectPackage('muscle')}
            className="ghost-btn w-full py-3 font-mono font-bold text-xs uppercase rounded hover:bg-[#b8f600] hover:text-black transition-colors"
          >
            EXPLORE PROTOCOL
          </button>
        </motion.div>

        {/* Card 2 — Shred protocol */}
        <motion.div 
          whileHover={{ translateY: -5 }}
          className="glass-card glass-card-active rounded-xl p-8 flex flex-col group relative overflow-hidden border border-[#b8f600]"
        >
          <div className="absolute top-0 right-0 px-3 py-1 bg-[#b8f600] text-black font-mono text-[9px] uppercase font-black rounded-bl-lg tracking-widest">
            POPULAR
          </div>
          <div className="w-12 h-12 rounded-full bg-[#b8f600]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[#b8f600]" style={{ fontVariationSettings: "'FILL' 1" }}>
              local_fire_department
            </span>
          </div>
          <h3 className="font-display text-2xl font-black text-white uppercase mb-2 leading-none">
            FAT SHRED<br />PROTOCOL
          </h3>
          <p className="font-body-md text-sm text-on-surface/70 mb-8 flex-grow leading-relaxed">
            Aggressive adipose tissue reduction while maintaining structural muscle thickness and neurological performance metrics.
          </p>
          <button 
            onClick={() => onSelectPackage('fat-loss')}
            className="neon-btn w-full py-3 font-mono font-bold text-xs uppercase rounded hover:scale-95 transition-transform"
          >
            INITIATE SHRED
          </button>
        </motion.div>

        {/* Card 3 — Recomposition */}
        <motion.div 
          whileHover={{ translateY: -5 }}
          className="glass-card rounded-xl p-8 flex flex-col hover:glass-card-active transition-all group relative border border-white/5"
        >
          <div className="w-12 h-12 rounded-full bg-[#b8f600]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[#b8f600]" style={{ fontVariationSettings: "'FILL' 1" }}>
              sync
            </span>
          </div>
          <h3 className="font-display text-2xl font-black text-white uppercase mb-2 leading-none">
            RECOMP<br />MASTERY
          </h3>
          <p className="font-body-md text-sm text-on-surface/70 mb-8 flex-grow leading-relaxed">
            Simultaneous muscle tissue accretion and fat loss through precise nutrient timing, caloric partitioning, and periodization.
          </p>
          <button 
            onClick={() => onSelectPackage('recomp')}
            className="ghost-btn w-full py-3 font-mono font-bold text-xs uppercase rounded hover:bg-[#b8f600] hover:text-black transition-colors"
          >
            EXPLORE PROTOCOL
          </button>
        </motion.div>
      </div>
    </div>
  );
}
