import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Flame, ChevronRight, RefreshCw, Activity, ShieldCheck } from 'lucide-react';
import { MacroResult } from '../types';

interface MacroCalculatorProps {
  onApplyMacros: (goal: 'muscle' | 'fat-loss' | 'meal-plan' | 'recomp', cal: number) => void;
}

export default function MacroCalculator({ onApplyMacros }: MacroCalculatorProps) {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<string>('80');
  const [height, setHeight] = useState<string>('180');
  const [age, setAge] = useState<string>('26');
  const [activity, setActivity] = useState<string>('1.55'); // 1.2, 1.375, 1.55, 1.725
  const [goal, setGoal] = useState<'bulk' | 'cut' | 'recomp'>('cut');
  const [workStyle, setWorkStyle] = useState<'sedentary-desk' | 'road-warrior' | 'busy-founder'>('sedentary-desk');

  const [result, setResult] = useState<MacroResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const calculateMacros = () => {
    setLoading(true);
    setTimeout(() => {
      const wVal = parseFloat(weight);
      const hVal = parseFloat(height);
      const aVal = parseInt(age);

      if (isNaN(wVal) || isNaN(hVal) || isNaN(aVal)) {
        setLoading(false);
        return;
      }

      // 1. Imperial to metric conversion if chosen
      let weightKg = wVal;
      let heightCm = hVal;
      if (unit === 'imperial') {
        weightKg = wVal * 0.453592;
        heightCm = hVal * 2.54;
      }

      // 2. BMR using Mifflin-St Jeor
      let bmr = 10 * weightKg + 6.25 * heightCm - 5 * aVal;
      if (gender === 'male') {
        bmr += 5;
      } else {
        bmr -= 161;
      }

      // 3. TDEE
      const actMultiplier = parseFloat(activity);
      const tdee = Math.round(bmr * actMultiplier);

      // 4. Goal Adjustment
      let targetCal = tdee;
      let goalType: 'muscle' | 'fat-loss' | 'meal-plan' | 'recomp' = 'recomp';

      if (goal === 'bulk') {
        targetCal = tdee + 350; // Lean surplus
        goalType = 'muscle';
      } else if (goal === 'cut') {
        targetCal = tdee - 500; // Solid fat-loss deficit
        goalType = 'fat-loss';
      } else {
        targetCal = tdee - 100; // Slight body recomposition
        goalType = 'recomp';
      }

      // 5. Macro Distribution
      // Protein: High science standards (2.2g per kg weight)
      const proteinGrams = Math.round(weightKg * 2.2);
      const proteinCalories = proteinGrams * 4;

      // Fat: 22% of total target calories
      const fatCalories = targetCal * 0.22;
      const fatGrams = Math.round(fatCalories / 9);

      // Carbs: Remaining calories
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
    let goalType: 'muscle' | 'fat-loss' | 'meal-plan' | 'recomp' = 'recomp';
    if (goal === 'bulk') goalType = 'muscle';
    else if (goal === 'cut') goalType = 'fat-loss';
    
    onApplyMacros(goalType, result.targetCalories);
  };

  const resetCalculator = () => {
    setResult(null);
  };

  const getWorkstyleAdvice = () => {
    switch (workStyle) {
      case 'sedentary-desk':
        return {
          title: "Desktop Corporate Focus Strategy",
          desc: "Sitting for long hours slows lymphatic circulation and lowers insulin sensitivity. Action: Supplement with a standing desk or quick 5-minute walks every 2 hours. Keep a 1.5-liter water flask at your desk so high hydration keeps metabolic rate steady."
        };
      case 'road-warrior':
        return {
          title: "Road Warrior Travel Strategy",
          desc: "Friction-free nutrition is critical. Action: Audit restaurant menus prior to arrival. Focus on ordering lean sirloin, salmon, or double-steamed green vegetables. Pack whey protein isolates inside your carry-on luggage for effortless protein targets during travel and check-ins."
        };
      case 'busy-founder':
        return {
          title: "High-Pace Founder Focus Strategy",
          desc: "Systemic workplace adrenaline can suppress subjective hunger cues, leading to late-night binging. Action: Consume 40% of your daily carbohydrates after 5 PM to trigger parasympathetic recovery, and prioritize 30g protein at breakfast to guard focus."
        };
    }
  };

  return (
    <div id="calculator-section" className="relative bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-10 overflow-hidden shadow-2xl">
      {/* Absolute background accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-lime-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
        {/* Input parameters panel (left 5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-lime-950/40 border border-lime-800/50 rounded-xl">
              <Calculator className="h-6 w-6 text-lime-400" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-lime-400 font-mono font-medium">Science of Hypotheses</span>
              <h3 className="text-2xl font-bold font-sans tracking-tight text-white">Macro Calibrator</h3>
            </div>
          </div>
          
          <p className="text-zinc-400 text-sm leading-relaxed">
            Estimate your optimal daily caloric intake and macronutrient profiles calibrated on high-level biochemical training standards. Ready to swap guesswork for biological certainty?
          </p>

          <div className="space-y-4 pt-2">
            {/* Unit toggle and gender selector */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">Systems</label>
                <div className="flex bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => { setUnit('metric'); resetCalculator(); }}
                    className={`flex-1 text-xs py-2 rounded-lg font-medium transition-all ${
                      unit === 'metric' ? 'bg-zinc-800 text-lime-400 font-mono' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    METRIC
                  </button>
                  <button
                    type="button"
                    onClick={() => { setUnit('imperial'); resetCalculator(); }}
                    className={`flex-1 text-xs py-2 rounded-lg font-medium transition-all ${
                      unit === 'imperial' ? 'bg-zinc-800 text-lime-400 font-mono' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    IMPERIAL
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">Gender</label>
                <div className="flex bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => { setGender('male'); resetCalculator(); }}
                    className={`flex-1 text-xs py-2 rounded-lg font-medium transition-all ${
                      gender === 'male' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    MALE
                  </button>
                  <button
                    type="button"
                    onClick={() => { setGender('female'); resetCalculator(); }}
                    className={`flex-1 text-xs py-2 rounded-lg font-medium transition-all ${
                      gender === 'female' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    FEMALE
                  </button>
                </div>
              </div>
            </div>

            {/* Weight, Height, Age */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
                  Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => { setWeight(e.target.value); resetCalculator(); }}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-500 transition-colors font-mono"
                  placeholder={unit === 'metric' ? '80' : '175'}
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
                  Height ({unit === 'metric' ? 'cm' : 'in'})
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => { setHeight(e.target.value); resetCalculator(); }}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-500 transition-colors font-mono"
                  placeholder={unit === 'metric' ? '180' : '70'}
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1.5">Age (yrs)</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => { setAge(e.target.value); resetCalculator(); }}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-500 transition-colors font-mono"
                  placeholder="26"
                />
              </div>
            </div>

            {/* Activity Multiplier */}
            <div>
              <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">Activity Frequency</label>
              <select
                value={activity}
                onChange={(e) => { setActivity(e.target.value); resetCalculator(); }}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-zinc-700 transition-colors"
              >
                <option value="1.2">Sedentary (No formal exercise / Desk job)</option>
                <option value="1.375">Lightly Active (1-3 gym workouts / week)</option>
                <option value="1.55">Moderately Active (3-5 intense lifting sessions / week)</option>
                <option value="1.725">Very Active (6-7 deep hypertrophic workouts or physical labor)</option>
              </select>
            </div>

            {/* Professional Workstyle */}
            <div>
              <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">Professional Workstyle</label>
              <select
                value={workStyle}
                onChange={(e) => { setWorkStyle(e.target.value as any); resetCalculator(); }}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-zinc-700 transition-colors"
              >
                <option value="sedentary-desk">Desktop Corporate (High Cognitive Focus, Desk-Bound)</option>
                <option value="road-warrior">Road Warrior (Frequent travel, hotel menus, flights)</option>
                <option value="busy-founder">Active Founder / Builder (High operational speed, back-to-back)</option>
              </select>
            </div>

            {/* Target Goal Selector */}
            <div>
              <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">Primary Physique Target</label>
              <div className="grid grid-cols-3 gap-2 bg-zinc-900/60 p-1 border border-zinc-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => { setGoal('cut'); resetCalculator(); }}
                  className={`py-2 px-1 rounded-lg text-xs font-semibold tracking-tight transition-all uppercase ${
                    goal === 'cut' ? 'bg-orange-950/40 border border-orange-800/50 text-orange-400' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Fat Shred
                </button>
                <button
                  type="button"
                  onClick={() => { setGoal('recomp'); resetCalculator(); }}
                  className={`py-2 px-1 rounded-lg text-xs font-semibold tracking-tight transition-all uppercase ${
                    goal === 'recomp' ? 'bg-zinc-800 border border-zinc-700 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Recomposition
                </button>
                <button
                  type="button"
                  onClick={() => { setGoal('bulk'); resetCalculator(); }}
                  className={`py-2 px-1 rounded-lg text-xs font-semibold tracking-tight transition-all uppercase ${
                    goal === 'bulk' ? 'bg-lime-950/40 border border-lime-800/50 text-lime-400' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Muscle Build
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={calculateMacros}
              disabled={loading}
              className="w-full relative mt-2 bg-white text-black font-semibold text-sm py-4 rounded-xl shadow-lg hover:bg-lime-400 hover:text-black transition-all cursor-pointer flex items-center justify-center gap-2 group border border-transparent overflow-hidden"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-zinc-800" />
                  <span>Calibrating Physiology...</span>
                </>
              ) : (
                <>
                  <span>CALCULATE MY BLUEPRINT</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results output panel (right 7 columns) */}
        <div className="lg:col-span-7 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-6 md:p-8 min-h-[400px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 flex flex-col items-center justify-center text-center py-10"
              >
                <Activity className="h-12 w-12 text-zinc-600 mb-4 stroke-[1.2]" />
                <h4 className="text-zinc-300 font-semibold mb-1">Awaiting Data Structs</h4>
                <p className="text-zinc-500 text-xs max-w-xs">
                  Fill out your body metrics and targets to generate customized caloric partitions.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-zinc-850 pb-4 mb-4">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">CALCULATION COMPLETE</span>
                      <h4 className="text-lg font-bold text-white tracking-tight">Your Custom Physiological Profile</h4>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-lime-950/40 border border-lime-800/30 rounded-full">
                      <Flame className="h-3.5 w-3.5 text-lime-400" />
                      <span className="text-[10px] font-mono font-medium text-lime-400 uppercase">{goal} Protocol</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-zinc-950 border border-zinc-850 p-4 rounded-xl">
                      <p className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Estimated Maintenance (TDEE)</p>
                      <p className="text-2xl font-bold font-mono text-zinc-300">{result.maintenanceCalories} <span className="text-xs font-sans text-zinc-500 font-normal">kcal/day</span></p>
                    </div>
                    <div className="bg-zinc-950 border border-lime-950 p-4 rounded-xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-2 h-2 bg-lime-500 rounded-bl-md" />
                      <p className="text-[10px] font-mono text-lime-500 uppercase mb-1">Target Daily Intake</p>
                      <p className="text-2xl font-bold font-mono text-white">{result.targetCalories} <span className="text-xs font-sans text-zinc-400 font-normal">kcal/day</span></p>
                    </div>
                  </div>

                  <h5 className="text-xs font-mono font-semibold tracking-wider text-zinc-400 uppercase mb-3">Daily Macronutrient Targets</h5>
                  
                  <div className="space-y-3.5">
                    {/* Protein bar */}
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-zinc-300 font-semibold flex items-center gap-1.5">
                          Protein <span className="text-[10px] text-lime-400 font-normal font-mono">(Muscle Preservation)</span>
                        </span>
                        <span className="font-mono text-white font-medium">{result.protein}g <span className="text-zinc-500 font-sans text-[10px]">({result.protein * 4} kcal)</span></span>
                      </div>
                      <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden">
                        <div className="h-full bg-lime-400 rounded-full transition-all duration-700" style={{ width: `${result.proteinPct ?? 35}%` }} />
                      </div>
                    </div>

                    {/* Carbs bar */}
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-zinc-300 font-semibold flex items-center gap-1.5">
                          Carbohydrates <span className="text-[10px] text-zinc-500 font-normal font-mono">(Glycogen Fuel)</span>
                        </span>
                        <span className="font-mono text-white font-medium">{result.carbs}g <span className="text-zinc-500 font-sans text-[10px]">({result.carbs * 4} kcal)</span></span>
                      </div>
                      <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden">
                        <div className="h-full bg-zinc-400 rounded-full transition-all duration-700" style={{ width: `${result.carbsPct ?? 45}%` }} />
                      </div>
                    </div>

                    {/* Fat bar */}
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-zinc-300 font-semibold flex items-center gap-1.5">
                          Fats <span className="text-[10px] text-zinc-500 font-normal font-mono">(Hormonal Support)</span>
                        </span>
                        <span className="font-mono text-white font-medium">{result.fat}g <span className="text-zinc-500 font-sans text-[10px]">({result.fat * 9} kcal)</span></span>
                      </div>
                      <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500/80 rounded-full transition-all duration-700" style={{ width: `${result.fatPct ?? 20}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Workplace Strategy */}
                  <div className="mt-5 bg-zinc-950/60 border border-zinc-900 rounded-xl p-4">
                    <span className="text-[9px] font-mono font-bold tracking-widest text-[#bfff00] uppercase">
                      Physique ROI Strategy
                    </span>
                    <h6 className="text-xs font-bold text-white tracking-tight mt-0.5">
                      {getWorkstyleAdvice().title}
                    </h6>
                    <p className="text-[11px] text-zinc-450 leading-relaxed font-sans mt-1">
                      {getWorkstyleAdvice().desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-850">
                  <div className="flex items-start gap-2.5 mb-3.5 bg-zinc-950/80 p-3 rounded-lg border border-zinc-850/50">
                    <ShieldCheck className="h-5 w-5 text-lime-400 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-zinc-400 leading-normal">
                      Note: These are estimates grounded in baseline metabolic formulas. For full adaptation, direct professional supervision by Ishan accounts for biofeedback modifications.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleApply}
                    className="w-full bg-zinc-800 border border-zinc-700 hover:border-lime-500 hover:bg-zinc-900 text-white font-semibold text-xs py-3 rounded-xl transition-all uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    🚀 Auto-fill into coaching request
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
