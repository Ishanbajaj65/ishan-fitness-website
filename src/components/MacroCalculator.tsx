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
  const [activity, setActivity] = useState<string>('1.55');
  const [goal, setGoal] = useState<'bulk' | 'cut' | 'recomp'>('cut');

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

      let weightKg = wVal;
      let heightCm = hVal;
      if (unit === 'imperial') {
        weightKg = wVal * 0.453592;
        heightCm = hVal * 2.54;
      }

      let bmr = 10 * weightKg + 6.25 * heightCm - 5 * aVal;
      if (gender === 'male') {
        bmr += 5;
      } else {
        bmr -= 161;
      }

      const actMultiplier = parseFloat(activity);
      const tdee = Math.round(bmr * actMultiplier);

      let targetCal = tdee;
      let goalType: 'muscle' | 'fat-loss' | 'meal-plan' | 'recomp' = 'recomp';

      if (goal === 'bulk') {
        targetCal = tdee + 350;
        goalType = 'muscle';
      } else if (goal === 'cut') {
        targetCal = tdee - 500;
        goalType = 'fat-loss';
      } else {
        targetCal = tdee - 100;
        goalType = 'recomp';
      }

      const proteinGrams = Math.round(weightKg * 2.2);
      const proteinCalories = proteinGrams * 4;

      const fatCalories = targetCal * 0.22;
      const fatGrams = Math.round(fatCalories / 9);

      const carbCalories = targetCal - (proteinCalories + fatCalories);
      const carbGrams = Math.round(Math.max(carbCalories, 0) / 4);

      setResult({
        maintenanceCalories: tdee,
        targetCalories: targetCal,
        protein: proteinGrams,
        carbs: carbGrams,
        fat: fatGrams,
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

  return (
    // Softer background tone change to slate-900 framework blocks
    <div id="calculator-section" className="relative bg-slate-900/30 border border-slate-900 rounded-2xl p-6 md:p-8 overflow-hidden">
      {/* Subdued ambient backglows */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-slate-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Parameters Input Panel */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg">
              <Calculator className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-xs font-semibold tracking-wide text-emerald-400">Personal Evaluation</span>
              <h3 className="text-xl font-bold tracking-tight text-white">Macro Calculator</h3>
            </div>
          </div>
          
          <p className="text-slate-400 text-xs leading-relaxed">
            Estimate your baseline daily caloric needs and macronutrient distribution mapped directly to your lifestyle parameters.
          </p>

          <div className="space-y-4 pt-1">
            {/* Unit toggle and gender selector */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 font-medium mb-1.5">Measurement Unit</label>
                <div className="flex bg-slate-900/80 border border-slate-800/80 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => { setUnit('metric'); resetCalculator(); }}
                    className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-colors ${
                      unit === 'metric' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Metric
                  </button>
                  <button
