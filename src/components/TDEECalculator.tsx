import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, ChevronRight } from 'lucide-react';

interface MacroResult {
  tdee: number;
  targetCalories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

const GOAL_ADJUSTMENTS: Record<string, number> = {
  cut: -500,
  maintain: 0,
  bulk: 300,
  aggressiveCut: -750,
};

// SVG donut chart helper
function DonutChart({ protein, carbs, fat }: { protein: number; carbs: number; fat: number }) {
  const total = protein * 4 + carbs * 4 + fat * 9;
  const proteinPct = (protein * 4) / total;
  const carbsPct = (carbs * 4) / total;
  const fatPct = (fat * 9) / total;

  const R = 70;
  const cx = 90;
  const cy = 90;
  const circumference = 2 * Math.PI * R;
  const gap = 4;

  // arc segments (strokeDasharray / strokeDashoffset)
  const segments = [
    { pct: proteinPct, color: '#e11d48', label: 'Protein' },
    { pct: carbsPct, color: '#4ade80', label: 'Carbs' },
    { pct: fatPct, color: '#f59e0b', label: 'Fat' },
  ];

  let cumulativePct = 0;
  const arcs = segments.map((seg) => {
    const dashLength = Math.max(0, seg.pct * circumference - gap);
    const offset = -cumulativePct * circumference;
    cumulativePct += seg.pct;
    return { ...seg, dashLength, offset };
  });

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <svg width="180" height="180" viewBox="0 0 180 180">
          {/* background ring */}
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="18" />
          {arcs.map((arc) => (
            <circle
              key={arc.label}
              cx={cx}
              cy={cy}
              r={R}
              fill="none"
              stroke={arc.color}
              strokeWidth="18"
              strokeDasharray={`${arc.dashLength} ${circumference}`}
              strokeDashoffset={arc.offset}
              strokeLinecap="round"
              style={{
                transform: 'rotate(-90deg)',
                transformOrigin: '50% 50%',
                filter: `drop-shadow(0 0 8px ${arc.color}60)`,
              }}
            />
          ))}
          {/* center text */}
          <text x={cx} y={cy - 8} textAnchor="middle" fill="white" fontSize="11" fontFamily="JetBrains Mono" fontWeight="700" letterSpacing="0.05em">
            MACROS
          </text>
          <text x={cx} y={cy + 12} textAnchor="middle" fill="#e11d48" fontSize="20" fontFamily="JetBrains Mono" fontWeight="900">
            {Math.round(total)}
          </text>
          <text x={cx} y={cy + 28} textAnchor="middle" fill="#9ca3af" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="0.05em">
            CALORIES
          </text>
        </svg>
      </div>

      {/* legend */}
      <div className="flex gap-4 flex-wrap justify-center">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-[10px] font-mono text-[#9ca3af] uppercase tracking-wider">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface TDEECalculatorProps {
  onApplyTDEE?: (calories: number) => void;
}

export default function TDEECalculator({ onApplyTDEE }: TDEECalculatorProps) {
  const [form, setForm] = useState({
    weight: '',
    height: '',
    age: '',
    sex: 'male',
    activity: 'moderate',
    goal: 'cut',
  });
  const [result, setResult] = useState<MacroResult | null>(null);
  const [error, setError] = useState('');

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const calculate = useCallback(() => {
    const w = parseFloat(form.weight);
    const h = parseFloat(form.height);
    const a = parseFloat(form.age);
    if (!w || !h || !a || w < 30 || w > 300 || h < 100 || h > 250 || a < 13 || a > 90) {
      setError('Please enter valid values (weight 30–300kg, height 100–250cm, age 13–90).');
      return;
    }
    setError('');

    // Mifflin-St Jeor BMR
    const bmr = form.sex === 'male'
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;

    const tdee = Math.round(bmr * ACTIVITY_MULTIPLIERS[form.activity]);
    const targetCalories = Math.max(1200, tdee + (GOAL_ADJUSTMENTS[form.goal] ?? 0));

    // Macros
    const protein = Math.round(w * 2.2); // 2.2g/kg
    const fatCals = targetCalories * 0.25;
    const fat = Math.round(fatCals / 9);
    const carbCals = targetCalories - protein * 4 - fat * 9;
    const carbs = Math.max(0, Math.round(carbCals / 4));

    setResult({ tdee, targetCalories, protein, carbs, fat });
  }, [form]);

  const inputClass = 'w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono placeholder:text-white/20 focus:border-[rgba(225,29,72,0.4)] transition-colors';
  const selectClass = 'w-full bg-[#0e0e0e] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono focus:border-[rgba(225,29,72,0.4)] transition-colors appearance-none cursor-pointer';

  return (
    <section id="tdee-calculator" className="py-24 border-t border-white/5">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 space-y-4"
        >
          <span className="section-badge">
            <Calculator className="h-3 w-3" />
            Macro Engine
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-[-0.03em] uppercase mt-4">
            TDEE + <span className="text-[#e11d48] neon-text">Macro</span> Calculator
          </h2>
          <p className="text-[#9ca3af] text-sm max-w-lg mx-auto">
            Calculate your Total Daily Energy Expenditure and optimal macro split — powered by Mifflin-St Jeor equation used by sports scientists.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 glass-card rounded-3xl p-7 md:p-8 space-y-5"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-mono text-[#9ca3af] uppercase tracking-widest block mb-2">Weight (kg)</label>
                <input type="number" placeholder="75" value={form.weight} onChange={(e) => set('weight', e.target.value)} className={inputClass} min="30" max="300" />
              </div>
              <div>
                <label className="text-[9px] font-mono text-[#9ca3af] uppercase tracking-widest block mb-2">Height (cm)</label>
                <input type="number" placeholder="175" value={form.height} onChange={(e) => set('height', e.target.value)} className={inputClass} min="100" max="250" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-mono text-[#9ca3af] uppercase tracking-widest block mb-2">Age</label>
                <input type="number" placeholder="28" value={form.age} onChange={(e) => set('age', e.target.value)} className={inputClass} min="13" max="90" />
              </div>
              <div>
                <label className="text-[9px] font-mono text-[#9ca3af] uppercase tracking-widest block mb-2">Biological Sex</label>
                <select value={form.sex} onChange={(e) => set('sex', e.target.value)} className={selectClass}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[9px] font-mono text-[#9ca3af] uppercase tracking-widest block mb-2">Activity Level</label>
              <select value={form.activity} onChange={(e) => set('activity', e.target.value)} className={selectClass}>
                <option value="sedentary">Sedentary (desk job, no exercise)</option>
                <option value="light">Light (1–3 days/week)</option>
                <option value="moderate">Moderate (3–5 days/week)</option>
                <option value="active">Active (6–7 days/week)</option>
                <option value="veryActive">Very Active (2x/day or physical job)</option>
              </select>
            </div>

            <div>
              <label className="text-[9px] font-mono text-[#9ca3af] uppercase tracking-widest block mb-2">Primary Goal</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { value: 'aggressiveCut', label: 'Aggressive Cut', icon: '🔥' },
                  { value: 'cut', label: 'Fat Loss', icon: '📉' },
                  { value: 'maintain', label: 'Maintain', icon: '⚖️' },
                  { value: 'bulk', label: 'Bulk', icon: '💪' },
                ].map((g) => (
                  <button
                    key={g.value}
                    type="button"
                    onClick={() => set('goal', g.value)}
                    className={`p-3 rounded-xl border text-[10px] font-mono font-bold uppercase tracking-wider transition-all text-center ${
                      form.goal === g.value
                        ? 'border-[rgba(225,29,72,0.5)] bg-[rgba(225,29,72,0.08)] text-[#e11d48]'
                        : 'border-white/10 bg-white/[0.02] text-[#9ca3af] hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <span className="text-base block mb-1">{g.icon}</span>
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-red-400 text-xs font-mono">{error}</p>}

            <button
              onClick={calculate}
              className="w-full neon-btn py-4 rounded-xl font-mono font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:scale-[0.98] transition-transform"
            >
              <Calculator className="h-4 w-4" />
              Calculate My Macros
            </button>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass-card-lime rounded-3xl p-7 space-y-6"
                >
                  {/* TDEE + target */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono text-[#9ca3af] uppercase tracking-widest">Maintenance TDEE</span>
                      <span className="text-sm font-mono font-bold text-white">{result.tdee} kcal</span>
                    </div>
                    <div className="h-px bg-white/5" />
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono text-[#9ca3af] uppercase tracking-widest">Target Calories</span>
                      <span className="text-lg font-mono font-black text-[#e11d48]" style={{ textShadow: '0 0 15px rgba(225,29,72,0.4)' }}>
                        {result.targetCalories} kcal
                      </span>
                    </div>
                  </div>

                  {/* Donut chart */}
                  <DonutChart protein={result.protein} carbs={result.carbs} fat={result.fat} />

                  {/* Macro breakdown */}
                  <div className="space-y-2">
                    {[
                      { label: 'Protein', value: result.protein, unit: 'g', color: '#e11d48', note: `${result.protein * 4} kcal` },
                      { label: 'Carbs', value: result.carbs, unit: 'g', color: '#4ade80', note: `${result.carbs * 4} kcal` },
                      { label: 'Fat', value: result.fat, unit: 'g', color: '#f59e0b', note: `${result.fat * 9} kcal` },
                    ].map((m) => (
                      <div key={m.label} className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
                        <span className="text-xs font-mono text-[#9ca3af] flex-1">{m.label}</span>
                        <span className="text-xs font-mono font-bold text-white">{m.value}g</span>
                        <span className="text-[9px] font-mono text-[#9ca3af] w-16 text-right">{m.note}</span>
                      </div>
                    ))}
                  </div>

                  {/* Apply to inquiry */}
                  <button
                    onClick={() => onApplyTDEE?.(result.targetCalories)}
                    className="w-full ghost-btn py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[rgba(225,29,72,0.05)] transition-colors"
                  >
                    Pre-Fill My Intake Form
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card rounded-3xl p-8 flex flex-col items-center justify-center text-center min-h-[300px] space-y-4 border-dashed border-white/10"
                >
                  <div className="h-16 w-16 rounded-2xl bg-white/[0.03] border border-white/8 flex items-center justify-center">
                    <Calculator className="h-8 w-8 text-white/20" />
                  </div>
                  <p className="text-[#9ca3af] text-sm font-mono">Fill in your details to see your personalized macro split</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* disclaimer */}
            <p className="text-[9px] font-mono text-white/20 text-center leading-relaxed px-2">
              Based on Mifflin-St Jeor equation. Results are estimates — individual metabolism varies. Consult Ishan for a precision-tuned protocol.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
