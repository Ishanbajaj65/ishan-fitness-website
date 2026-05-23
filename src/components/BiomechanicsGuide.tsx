import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dumbbell, ShieldAlert, Award, ChevronRight } from 'lucide-react';

interface MuscleGuide {
  id: string;
  name: string;
  icon: string;
  target: string;
  mistakes: string;
  strategy: string;
  blueprint: string;
}

const MUSCLE_GUIDES: MuscleGuide[] = [
  {
    id: 'chest',
    name: 'Chest',
    icon: 'sports_gymnastics',
    target: 'Maximized chest load & active fiber contraction',
    mistakes: 'Flaring elbows out wide at a 90-degree angle (straining shoulders) or bouncing the bar off the ribcage.',
    strategy: 'Tuck your elbows inward at a 45-degree angle to protect your joints, and focus on squeezing your biceps together at the top of the lift to fully contract your chest.',
    blueprint: 'Hypertrophy Matrix System'
  },
  {
    id: 'back',
    name: 'Back',
    icon: 'fitbit',
    target: 'Complete lat and upper back thickness activation',
    mistakes: 'Pulling exclusively with your biceps, shrugging your shoulders up, or leaning back excessively.',
    strategy: 'Treat your hands as simple hooks. Focus on driving your elbows down and backward towards your hip pockets, keeping your shoulders down throughout the movement.',
    blueprint: 'Hypertrophy Matrix System'
  },
  {
    id: 'shoulders',
    name: 'Shoulders',
    icon: 'accessibility_new',
    target: 'Side and rear deltoid roundness isolation',
    mistakes: 'Using heavy momentum, swinging the weights, or letting your neck muscles (traps) pull the load on lateral raises.',
    strategy: 'Lead with your elbows, keep a very slight forward lean, and throw the dumbbells OUT to the sides (drawing a wide circle) rather than simply lifting them UP.',
    blueprint: 'Hypertrophy Matrix System'
  },
  {
    id: 'legs',
    name: 'Legs',
    icon: 'directions_walk',
    target: 'Balanced quad, hamstring, and joint longevity',
    mistakes: 'Letting your knees cave inward (valgus collapse), lifting your heels off the floor, or cutting your depth short.',
    strategy: 'Keep your chest high, push your knees outward to track directly over your toes, and squat deep. Drive upward through the middle of your feet.',
    blueprint: 'Hypertrophy Matrix System'
  },
  {
    id: 'arms',
    name: 'Arms',
    icon: 'hardware',
    target: 'Full tricep and bicep peak contraction',
    mistakes: 'Swinging your elbows forward on biceps curls (uses front shoulders) or failing to fully lock out on triceps extensions.',
    strategy: 'For biceps, pin your elbows firmly to your ribs and squeeze hard at the top. For triceps, fully lock out your elbows to hit the long head muscle.',
    blueprint: 'Metabolic Fuel Blueprint'
  },
  {
    id: 'core',
    name: 'Core',
    icon: 'sports_kabaddi',
    target: 'Six-pack abdominal compression & core stability',
    mistakes: 'Pulling your neck forward during crunches or using your hip flexors instead of your abs on leg raises.',
    strategy: 'Core training is about curling your spine, not just bending at your hips. Exhale fully at the peak contraction of every single rep to fully engage your deep abs.',
    blueprint: 'Single-Digit Shred Protocol'
  }
];

export default function BiomechanicsGuide() {
  const [activeMuscle, setActiveMuscle] = useState<string>('chest');

  const selectedGuide = MUSCLE_GUIDES.find(m => m.id === activeMuscle) || MUSCLE_GUIDES[0];

  const handleScrollToInquiry = () => {
    document.getElementById('intake-portal')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="biomechanics-guide" className="space-y-12 py-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-4">
        <span className="section-badge bg-[#bfff00]/10 border border-[#bfff00]/25 text-[#bfff00] px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase font-bold inline-flex items-center gap-2">
          <span className="material-symbols-outlined text-xs">fitness_center</span>
          Biomechanics Center
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
          Master Your Form
        </h2>
        <p className="text-[#8d9479] text-sm leading-relaxed">
          Unlock maximum muscle growth and prevent injuries by mastering biomechanics. Click on a muscle group to view Ishan's strategic execution tips.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
        {/* Left — Muscle Selector buttons */}
        <div className="lg:col-span-5 flex flex-col gap-2">
          <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest block mb-2 font-bold pl-1">
            Select Muscle Group
          </span>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {MUSCLE_GUIDES.map(muscle => {
              const isActive = activeMuscle === muscle.id;
              return (
                <button
                  key={muscle.id}
                  onClick={() => setActiveMuscle(muscle.id)}
                  type="button"
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isActive
                      ? 'bg-[#bfff00] text-black border-[#bfff00] shadow-[0_0_15px_rgba(191,255,0,0.15)] font-bold'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{muscle.icon}</span>
                  <span className="font-mono text-xs uppercase tracking-wider">{muscle.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right — Strategy Tips display card */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMuscle}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-3xl p-6 md:p-8 border border-white/5 h-full flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#bfff00]/5 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6">
                {/* Header info */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div>
                    <span className="text-[9px] font-mono text-[#bfff00] uppercase tracking-widest font-bold">
                      Active Telemetry
                    </span>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                      {selectedGuide.name} Strategy
                    </h3>
                  </div>
                  <div className="h-10 w-10 bg-[#bfff00]/10 border border-[#bfff00]/25 rounded-xl flex items-center justify-center text-[#bfff00]">
                    <span className="material-symbols-outlined">{selectedGuide.icon}</span>
                  </div>
                </div>

                {/* Target */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-white/60">
                    <Award className="h-3.5 w-3.5 text-[#bfff00]" />
                    <span className="uppercase tracking-wider font-bold">Biomechanical Target</span>
                  </div>
                  <p className="text-sm font-semibold text-white pl-5">{selectedGuide.target}</p>
                </div>

                {/* Mistakes */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-red-400">
                    <ShieldAlert className="h-3.5 w-3.5 text-red-400" />
                    <span className="uppercase tracking-wider font-bold">Common Mistakes</span>
                  </div>
                  <p className="text-xs text-zinc-400 pl-5 leading-relaxed">{selectedGuide.mistakes}</p>
                </div>

                {/* Strategy */}
                <div className="glass-card-lime rounded-xl p-5 border border-[#bfff00]/20 space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[#bfff00] font-bold uppercase tracking-wider">
                    <Dumbbell className="h-3.5 w-3.5" />
                    Ishan's Biomechanical Cue
                  </div>
                  <p className="text-xs text-on-surface/90 leading-relaxed font-sans font-medium">
                    "{selectedGuide.strategy}"
                  </p>
                </div>
              </div>

              {/* Matching Blueprint */}
              <div className="mt-8 pt-5 border-t border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-0.5">
                    Matching Program Package
                  </span>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    {selectedGuide.blueprint}
                  </span>
                </div>
                <button
                  onClick={handleScrollToInquiry}
                  className="inline-flex items-center justify-center gap-1.5 bg-[#bfff00] text-black px-4 py-2.5 rounded-xl font-mono text-[10px] font-black uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
                >
                  Apply For Program
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
