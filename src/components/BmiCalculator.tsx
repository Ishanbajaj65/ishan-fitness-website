import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw } from 'lucide-react';

interface BmiCalculatorProps {
  onApplyBmi: (bmi: string) => void;
}

export default function BmiCalculator({ onApplyBmi }: BmiCalculatorProps) {
  const [weight, setWeight] = useState<string>('80');
  const [height, setHeight] = useState<string>('180');
  const [result, setResult] = useState<{ bmi: string; category: string; advice: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const calculateBmi = () => {
    setLoading(true);
    setTimeout(() => {
      const wVal = parseFloat(weight);
      const hVal = parseFloat(height);

      if (isNaN(wVal) || isNaN(hVal) || hVal === 0) {
        setLoading(false);
        return;
      }

      const heightM = hVal / 100;
      const bmiVal = wVal / (heightM * heightM);
      const bmiStr = bmiVal.toFixed(1);

      let cat = '';
      let adv = '';

      if (bmiVal < 18.5) {
        cat = 'Underweight (Tissue Deficit)';
        adv = 'Lean contractility tissue deficit. Focus: Lean surplus calorie protocol (+300 to +500 kcal) combined with progressive overload hypertrophy programming to safely build functional contractile tissue.';
      } else if (bmiVal < 25) {
        cat = 'Normal (Optimal Baseline)';
        adv = 'Ideal biological homeostasis. Focus: Clean recomposition strategy (slight surplus or deficit based on subjective body fat goals) paired with advanced biomechanical strength periodization.';
      } else if (bmiVal < 30) {
        cat = 'Overweight (Lipid Accumulation)';
        adv = 'Adipose volume surplus. Focus: Meticulous caloric deficit (-400 to -600 kcal) guided by high-protein intake to preserve active contractile mass while burning fat tissue.';
      } else {
        cat = 'Obese (Systemic Load)';
        adv = 'Elevated cardiovascular and metabolic strain. Focus: Structured fat loss protocol, low-impact strength conditioning, and evidence-based deficit nutrition to secure fat loss safely.';
      }

      setResult({
        bmi: bmiStr,
        category: cat,
        advice: adv
      });
      setLoading(false);
    }, 600);
  };

  const handleApply = () => {
    if (!result) return;
    onApplyBmi(result.bmi);
  };

  return (
    <div id="calibrator" className="glass-card rounded-xl p-8 md:p-12 relative overflow-hidden border border-white/5 text-left">
      <div className="absolute left-0 bottom-0 w-full h-1/2 bg-[#b8f600]/5 blur-3xl -z-10" />
      
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl md:text-5xl text-white uppercase mb-4 font-black tracking-tight">
          BMI <span className="text-[#b8f600]">CALIBRATOR</span>
        </h2>
        <p className="font-mono text-xs text-on-surface/70 uppercase tracking-widest">
          Input telemetry to analyze your current body mass index.
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
              placeholder="80"
              required
              type="number"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-mono text-xs text-[#b8f600] uppercase mb-2">
              Height (CM)
            </label>
            <input
              value={height}
              onChange={(e) => { setHeight(e.target.value); setResult(null); }}
              className="bg-transparent border-0 border-b border-surface-container-highest text-white font-mono text-3xl focus:ring-0 input-glow px-0 py-2 transition-all"
              placeholder="180"
              required
              type="number"
            />
          </div>
        </div>

        <button
          onClick={calculateBmi}
          disabled={loading}
          className="w-full neon-btn py-4 font-mono font-black text-sm uppercase rounded flex items-center justify-center gap-2 mt-8 transition-transform hover:scale-98 disabled:opacity-60 cursor-pointer"
          type="button"
        >
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Analyzing telemetry...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-base">calculate</span>
              <span>ANALYZE BMI BASELINE</span>
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
              <div className="glass-card-active p-4 rounded-xl border border-[#b8f600] bg-[#b8f600]/5">
                <p className="text-[10px] font-mono text-[#b8f600] uppercase mb-1">Calculated BMI</p>
                <p className="text-3xl font-black font-mono text-white">{result.bmi}</p>
              </div>
              <div className="glass-card p-4 rounded-xl border border-white/5 flex flex-col justify-center">
                <p className="text-[10px] font-mono text-on-surface/50 uppercase mb-1">Mass Classification</p>
                <p className="text-sm font-black text-[#b8f600] uppercase tracking-wide">{result.category}</p>
              </div>
            </div>

            <div className="glass-card-lime rounded-xl p-5 border border-[#b8f600]/20">
              <span className="text-[9px] font-mono font-bold tracking-widest text-[#b8f600] uppercase block mb-1">
                Evidence-Based Physical Action
              </span>
              <p className="text-xs text-on-surface/80 leading-relaxed font-sans">
                {result.advice}
              </p>
            </div>

            <button
              onClick={handleApply}
              className="w-full glass-card hover:border-[#b8f600] hover:text-[#b8f600] text-white font-bold text-xs py-3 rounded-xl transition-all uppercase tracking-wider flex items-center justify-center gap-2 mt-4 cursor-pointer"
              type="button"
            >
              🚀 Apply calculated BMI to intake form
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
