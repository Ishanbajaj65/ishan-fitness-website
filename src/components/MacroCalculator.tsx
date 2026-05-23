import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw } from 'lucide-react';
import { MacroResult } from '../types';

interface MacroCalculatorProps {
  onApplyMacros: (goal: 'muscle' | 'fat-loss' | 'meal-plan' | 'recomp', cal: number) => void;
}

export default function MacroCalculator({ onApplyMacros }: MacroCalculatorProps) {
  const [weight, setWeight] = useState<string>('85');
  const [bodyfat, setBodyfat] = useState<string>('15');
  const [result, setResult] = useState<MacroResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const calculateMacros = () => {
    setLoading(true);
    setTimeout(() => {
      const wVal = parseFloat(weight);
      const bfVal = parseFloat(bodyfat);

      if (isNaN(wVal) || isNaN(bfVal)) {
        setLoading(false);
        return;
      }

      // Lean Mass calculation for Katch-McArdle
      const leanMass = wVal * (1 - bfVal / 100);
      const bmr = 370 + 21.6 * leanMass;
      
      // Moderately Active multiplier (baseline for high performance coaching)
      const tdee = Math.round(bmr * 1.55);
      
      // Deficit target for fat loss / shred (Mockup default is Fat Shred)
      const targetCal = tdee - 500; 

      // High protein science guidelines (2.2g per kg bodyweight)
      const proteinGrams = Math.round(wVal * 2.2);
      const proteinCalories = proteinGrams * 4;

      // Fat guidelines (22% of total target calories)
      const fatCalories = targetCal * 0.22;
      const fatGrams = Math.round(fatCalories / 9);

      // Carb guidelines (remaining calories)
      const carbCalories = targetCal - (proteinCalories + fatCalories);
      const carbGrams = Math.round(Math.max(carbCalories, 0) / 4);

      setResult({
        maintenanceCalories: tdee,
        targetCalories: targetCal,
        protein: proteinGrams,
        carbs: carbGrams,
        fat: fatGrams,
        proteinPct: Math.round((proteinCalories / targetCal) * 100),
        carbsPct: Math.round((carbCalories / targetCal) * 100),
        fatPct: Math.round((fatCalories / targetCal) * 100),
      });
      setLoading(false);
    }, 600);
  };

  const handleApply = () => {
    if (!result) return;
    onApplyMacros('fat-loss', result.targetCalories);
  };

  return (
    <div id="calibrator" className="glass-card rounded-xl p-8 md:p-12 relative overflow-hidden border border-white/5 text-left">
      <div className="absolute left-0 bottom-0 w-full h-1/2 bg-[#b8f600]/5 blur-3xl -z-10" />
      
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl md:text-5xl text-white uppercase mb-4 font-black tracking-tight">
          MACRO <span className="text-[#b8f600]">CALIBRATOR</span>
        </h2>
        <p className="font-mono text-xs text-on-surface/70 uppercase tracking-widest">
          Input telemetry to generate baseline nutritional targets.
        </p>
      </div>

      <form className="max-w-2xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <label className="font-mono text-xs text-[#b8f600] uppercase mb-2">
              Bodyweight (KG)
            </label>
            <input
              value={weight}
              onChange={(e) => { setWeight(e.target.value); setResult(null); }}
              className="bg-transparent border-0 border-b border-surface-container-highest text-white font-mono text-3xl focus:ring-0 input-glow px-0 py-2 transition-all"
              placeholder="85"
              required
              type="number"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-mono text-xs text-[#b8f600] uppercase mb-2">
              Est. Bodyfat %
            </label>
            <input
              value={bodyfat}
              onChange={(e) => { setBodyfat(e.target.value); setResult(null); }}
              className="bg-transparent border-0 border-b border-surface-container-highest text-white font-mono text-3xl focus:ring-0 input-glow px-0 py-2 transition-all"
              placeholder="15"
              required
              type="number"
            />
          </div>
        </div>

        <button
          onClick={calculateMacros}
          disabled={loading}
          className="w-full neon-btn py-4 font-mono font-black text-sm uppercase rounded flex items-center justify-center gap-2 mt-8 transition-transform hover:scale-98 disabled:opacity-60 cursor-pointer"
          type="button"
        >
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Calibrating...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-base">calculate</span>
              <span>CALCULATE BASELINES</span>
            </>
          )}
        </button>
      </form>

      {/* Results output */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="max-w-2xl mx-auto mt-12 pt-8 border-t border-white/5 space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-4 rounded-xl border border-white/5">
                <p className="text-[10px] font-mono text-on-surface/50 uppercase mb-1">TDEE (Maintenance)</p>
                <p className="text-xl font-bold font-mono text-white">{result.maintenanceCalories} kcal</p>
              </div>
              <div className="glass-card-active p-4 rounded-xl border border-[#b8f600] bg-[#b8f600]/5">
                <p className="text-[10px] font-mono text-[#b8f600] uppercase mb-1">Daily Target Calories</p>
                <p className="text-xl font-black font-mono text-white">{result.targetCalories} kcal</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-on-surface/50 uppercase tracking-widest">Macronutrient Matrix</h4>
              
              {/* Protein bar */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-mono text-on-surface/70 uppercase">Protein (Muscle Recovery)</span>
                  <span className="font-mono text-white font-bold">{result.protein}g</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#b8f600] rounded-full transition-all duration-700" style={{ width: `${result.proteinPct}%` }} />
                </div>
              </div>

              {/* Carbs bar */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-mono text-on-surface/70 uppercase">Carbohydrates (Glycogen Fuel)</span>
                  <span className="font-mono text-white font-bold">{result.carbs}g</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-on-surface-variant rounded-full transition-all duration-700" style={{ width: `${result.carbsPct}%` }} />
                </div>
              </div>

              {/* Fat bar */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-mono text-on-surface/70 uppercase">Fats (Hormonal Support)</span>
                  <span className="font-mono text-white font-bold">{result.fat}g</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full transition-all duration-700" style={{ width: `${result.fatPct}%` }} />
                </div>
              </div>
            </div>

            <button
              onClick={handleApply}
              className="w-full glass-card hover:border-[#b8f600] hover:text-[#b8f600] text-white font-bold text-xs py-3 rounded-xl transition-all uppercase tracking-wider flex items-center justify-center gap-2 mt-4 cursor-pointer"
              type="button"
            >
              🚀 Apply Baselines to intake form
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
