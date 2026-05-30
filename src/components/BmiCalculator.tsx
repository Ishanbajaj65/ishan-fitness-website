import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw } from 'lucide-react';

interface BmiCalculatorProps {
  onApplyBmi: (bmi: string, calories: number) => void;
}

export default function BmiCalculator({ onApplyBmi }: BmiCalculatorProps) {
  const [weight, setWeight] = useState<string>('80');
  const [height, setHeight] = useState<string>('180');
  const [result, setResult] = useState<{ bmi: string; category: string; advice: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [fitnessGoal, setFitnessGoal] = useState<string>('shred');

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
        cat = 'Underweight (Build & Strengthen)';
        adv = 'Your body is primed for healthy growth. Focus: A clean calorie surplus (+300 to +500 kcal) paired with structured strength training to safely build lean muscle and increase overall strength.';
      } else if (bmiVal < 25) {
        cat = 'Normal (Maintain & Recomp)';
        adv = 'Excellent physical baseline. Focus: A body recomposition strategy (slight calorie surplus or deficit depending on your aesthetic goals) paired with consistent, progressive strength training to optimize body composition.';
      } else if (bmiVal < 30) {
        cat = 'Overweight (Lean & Tone)';
        adv = 'Ready to burn fat and reveal muscle. Focus: A structured calorie deficit (-400 to -600 kcal) combined with high-protein intake to fully protect your lean muscle while dropping body fat efficiently.';
      } else {
        cat = 'Obese (Health & Transformation)';
        adv = 'Focused path to metabolic health and energy. Focus: A controlled calorie deficit, joint-friendly strength training, and structured nutrition to achieve sustainable fat loss safely.';
      }

      setResult({
        bmi: bmiStr,
        category: cat,
        advice: adv
      });
      setLoading(false);
    }, 600);
  };

  const getEstimatedTargets = () => {
    const wVal = parseFloat(weight);
    const hVal = parseFloat(height);
    if (isNaN(wVal) || isNaN(hVal) || hVal === 0) return { calories: 0, protein: 0 };

    // BMR formula: Mifflin-St Jeor assuming default age of 25
    const bmr = 10 * wVal + 6.25 * hVal - 120;

    // Activity multiplier
    let multiplier = 1.55;
    if (activityLevel === 'sedentary') multiplier = 1.2;
    if (activityLevel === 'light') multiplier = 1.375;
    if (activityLevel === 'moderate') multiplier = 1.55;
    if (activityLevel === 'high') multiplier = 1.725;

    const tdee = bmr * multiplier;

    // Goal adjustment
    let calorieGoal = tdee;
    if (fitnessGoal === 'shred') calorieGoal = tdee - 500;
    if (fitnessGoal === 'build') calorieGoal = tdee + 350;

    // Minimum safe calorie baseline
    const finalCalories = Math.max(1200, Math.round(calorieGoal));

    // Protein target: 2.2 grams per kg
    const finalProtein = Math.round(wVal * 2.2);

    return { calories: finalCalories, protein: finalProtein };
  };

  const handleApply = () => {
    if (!result) return;
    const { calories } = getEstimatedTargets();
    onApplyBmi(result.bmi, calories);
  };

  return (
    <div id="calibrator" className="glass-card rounded-xl p-8 md:p-12 relative overflow-hidden border border-white/5 text-left">
      <div className="absolute left-0 bottom-0 w-full h-1/2 bg-[#e11d48]/5 blur-3xl -z-10" />
      
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl md:text-5xl text-white uppercase mb-4 font-black tracking-tight">
          BMI <span className="text-[#e11d48]">CALIBRATOR</span>
        </h2>
        <p className="font-mono text-xs text-on-surface/70 uppercase tracking-widest">
          Input telemetry to analyze your current body mass index and estimated targets.
        </p>
      </div>

      <form className="max-w-2xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <label className="font-mono text-xs text-[#e11d48] uppercase mb-2">
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
            <label className="font-mono text-xs text-[#e11d48] uppercase mb-2">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card-active p-4 rounded-xl border border-[#e11d48] bg-[#e11d48]/5 flex flex-col justify-center">
                <p className="text-[10px] font-mono text-[#e11d48] uppercase mb-1">Calculated BMI</p>
                <p className="text-3xl font-black font-mono text-white">{result.bmi}</p>
              </div>
              <div className="glass-card p-4 rounded-xl border border-white/5 flex flex-col justify-center">
                <p className="text-[10px] font-mono text-on-surface/50 uppercase mb-1">Mass Classification</p>
                <p className="text-sm font-black text-[#e11d48] uppercase tracking-wide">{result.category}</p>
              </div>
            </div>

            <div className="glass-card-lime rounded-xl p-5 border border-[#e11d48]/20">
              <span className="text-[9px] font-mono font-bold tracking-widest text-[#e11d48] uppercase block mb-1">
                Evidence-Based Physical Action
              </span>
              <p className="text-xs text-on-surface/80 leading-relaxed font-sans">
                {result.advice}
              </p>
            </div>

            {/* Dynamic Calorie & Protein Estimator Control Panel */}
            <div className="glass-card-lime rounded-xl p-5 border border-[#e11d48]/20 space-y-6">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#e11d48] uppercase block mb-3">
                  1. select weekly activity level
                </span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { val: 'sedentary', label: 'Sedentary', desc: 'No exercise' },
                    { val: 'light', label: 'Light', desc: '1-2 days/wk' },
                    { val: 'moderate', label: 'Moderate', desc: '3-4 days/wk' },
                    { val: 'high', label: 'Active', desc: '5+ days/wk' }
                  ].map(act => (
                    <button
                      key={act.val}
                      onClick={() => setActivityLevel(act.val)}
                      type="button"
                      className={`px-3 py-2 rounded-lg text-left border transition-all cursor-pointer ${
                        activityLevel === act.val
                          ? 'bg-[#e11d48] text-black border-[#e11d48]'
                          : 'bg-black/40 border-white/5 text-white/60 hover:text-white hover:border-white/10'
                      }`}
                    >
                      <p className="text-[11px] font-bold uppercase font-mono tracking-wider">{act.label}</p>
                      <p className={`text-[9px] font-sans ${activityLevel === act.val ? 'text-black/70' : 'text-white/40'}`}>{act.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#e11d48] uppercase block mb-3">
                  2. select primary target goal
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: 'shred', label: 'Fat Loss & Shred', icon: 'bolt' },
                    { val: 'recomp', label: 'Body Recomp', icon: 'sync' },
                    { val: 'build', label: 'Muscle Growth', icon: 'fitness_center' }
                  ].map(goal => (
                    <button
                      key={goal.val}
                      onClick={() => setFitnessGoal(goal.val)}
                      type="button"
                      className={`px-3 py-3 rounded-lg text-center border transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                        fitnessGoal === goal.val
                          ? 'bg-[#e11d48] text-black border-[#e11d48]'
                          : 'bg-black/40 border-white/5 text-white/60 hover:text-white hover:border-white/10'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">{goal.icon}</span>
                      <p className="text-[10px] font-bold uppercase font-mono tracking-wider leading-none mt-1">{goal.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Targets Output Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div className="glass-card-active p-4 rounded-xl border border-[#e11d48]/30 bg-black/40 flex flex-col justify-center">
                  <p className="text-[9px] font-mono text-[#e11d48] uppercase mb-1">Target Intake Goal</p>
                  <p className="text-2xl font-black font-mono text-white">
                    {getEstimatedTargets().calories} <span className="text-xs font-mono font-normal text-on-surface/60">kcal/day</span>
                  </p>
                </div>
                <div className="glass-card-active p-4 rounded-xl border border-[#e11d48]/30 bg-black/40 flex flex-col justify-center">
                  <p className="text-[9px] font-mono text-[#e11d48] uppercase mb-1">Target Protein Intake</p>
                  <p className="text-2xl font-black font-mono text-white">
                    {getEstimatedTargets().protein} <span className="text-xs font-mono font-normal text-on-surface/60">g/day</span>
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleApply}
              className="w-full glass-card hover:border-[#e11d48] hover:text-[#e11d48] text-white font-bold text-xs py-3 rounded-xl transition-all uppercase tracking-wider flex items-center justify-center gap-2 mt-4 cursor-pointer"
              type="button"
            >
              🚀 Apply calculated BMI & nutrition to intake form
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
