import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClipboardCheck, Sparkles, RefreshCw, ChevronRight, Check } from 'lucide-react';

interface PhysiqueAuditProps {
  onApplyAudit: (auditSummary: string, goal: string) => void;
}

export default function PhysiqueAudit({ onApplyAudit }: PhysiqueAuditProps) {
  const [step, setStep] = useState<number | 'result'>(1);
  const [gender, setGender] = useState<string>('male');
  const [age, setAge] = useState<string>('25-45');
  const [obstacle, setObstacle] = useState<string>('plateau');
  const [sleep, setSleep] = useState<string>('6-8');
  const [workoutDays, setWorkoutDays] = useState<string>('3-4');

  const OBSTACLE_OPTIONS = [
    { value: 'plateau', label: 'Stuck in a stubborn plateau (lifting but not progressing)', goal: 'recomp' },
    { value: 'growth', label: 'Struggling to build solid muscle (hardgainer)', goal: 'muscle' },
    { value: 'metabolism', label: 'Struggling with slow metabolism or stubborn belly fat', goal: 'fat-loss' },
    { value: 'stress', label: 'Zero time, high stress, and low daily energy', goal: 'meal-plan' }
  ];

  const getPhysiqueGap = () => {
    let title = '';
    let description = '';
    let advice = '';

    if (sleep === 'under-6' && (workoutDays === '5+' || workoutDays === '3-4')) {
      title = 'Homeostatic Recovery Gap (Severe Under-Recovery)';
      description = 'You are training hard but sleep-deprived. Your body is in a high-cortisol (stress hormone) state, which actively suppresses muscle hypertrophy and encourages stubborn fat storage.';
      advice = 'Recommendation: Reduce total workout set volume by 20% temporarily, implement a strict sleep schedule aiming for 7.5+ hours, and adjust nutrition to a high-protein recovery focus.';
    } else if (obstacle === 'plateau' && (workoutDays === '5+' || workoutDays === '3-4')) {
      title = 'Overload Periodization Gap (Junk Volume Trap)';
      description = 'Your body has adapted to your current workout routine. Doing more sets (junk volume) is only increasing fatigue instead of triggering fresh muscle protein synthesis.';
      advice = 'Recommendation: Keep workouts to 4 days maximum, audit set volumes (aim for 10-12 high-intensity sets per muscle group weekly), and focus strictly on progressive weight increments.';
    } else if (obstacle === 'growth') {
      title = 'Anabolic Caloric Gap (Contractile Deficit)';
      description = 'Your daily calorie intake is failing to match your active tissue requirements. You are essentially burning off any prospective muscle growth as fuel.';
      advice = 'Recommendation: Shift immediately to a structured lean calorie surplus (+350 to +500 kcal), prioritize heavy compounds loaded in deep stretched positions (e.g. RDLs, deep squats), and track calories strictly.';
    } else if (obstacle === 'metabolism' || workoutDays === '0-2') {
      title = 'Metabolic Adaptational Gap';
      description = 'Your physical activity levels and metabolism have adapted, meaning your daily calorie burn has slowed down, stalling your fat loss efforts.';
      advice = 'Recommendation: Establish a calculated calorie deficit (-400 kcal), incorporate a daily step target (10,000+ steps) to keep daily movement high, and lift weights 3 times a week to preserve lean muscle.';
    } else {
      title = 'Bespoke Structural Optimization Gap';
      description = 'You have a good foundational routine but lack the meticulous weekly check-ins and biomechanical refinements that take a physique to the next elite level.';
      advice = 'Recommendation: Implement weekly check-in logs tracking live biofeedback (sleep quality, strength progression trends, fatigue logs), and fine-tune your movement splits.';
    }

    return { title, description, advice };
  };

  const handleNextStep = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) setStep('result');
  };

  const handlePrevStep = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
  };

  const resetAudit = () => {
    setStep(1);
    setGender('male');
    setAge('25-45');
    setObstacle('plateau');
    setSleep('6-8');
    setWorkoutDays('3-4');
  };

  const handleApply = () => {
    const gap = getPhysiqueGap();
    const matchedGoal = OBSTACLE_OPTIONS.find(o => o.value === obstacle)?.goal || 'recomp';
    const summary = `[Physique Audit: ${gap.title}. Challenge - ${OBSTACLE_OPTIONS.find(o => o.value === obstacle)?.label.split(' (')[0]}, Sleep - ${sleep} hrs, Workouts - ${workoutDays} days/wk]`;
    onApplyAudit(summary, matchedGoal);
  };

  return (
    <div id="physique-audit" className="w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-2xl text-left">
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="max-w-xl mx-auto text-center mb-8">
        <span className="text-[10px] font-mono tracking-widest text-[#fb7185] uppercase font-bold bg-[#fb7185]/10 px-3 py-1 rounded-full border border-[#fb7185]/25 inline-flex items-center gap-1.5 mb-3">
          <Sparkles className="h-3 w-3" />
          Bespoke Physique Audit
        </span>
        <h3 className="text-3xl font-extrabold text-white mt-1 font-sans tracking-tight">
          60-SECOND PHYSIQUE AUDIT
        </h3>
        <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
          Diagnose your primary training bottleneck. Complete our 3-step physical telemetry questionnaire to calculate your customized physique strategy.
        </p>
      </div>

      <div className="max-w-2xl mx-auto min-h-[300px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {/* STEP 1: Core Telemetry */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="border-b border-white/5 pb-2">
                <span className="text-xs font-mono text-[#fb7185] font-bold">STEP 01 OF 03</span>
                <h4 className="text-lg font-bold text-white uppercase mt-1">Core Telemetry & Age Framework</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">Gender Framework</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['male', 'female'].map(g => (
                      <button
                        key={g}
                        onClick={() => setGender(g)}
                        type="button"
                        className={`py-3 rounded-xl border text-center font-mono text-xs uppercase tracking-wider cursor-pointer transition-all ${
                          gender === g
                            ? 'bg-[#fb7185] text-black border-[#fb7185] font-bold shadow-[0_0_10px_rgba(225,29,72,0.15)]'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">Age Framework</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { val: 'under-25', label: 'Under 25' },
                      { val: '25-45', label: '25 – 45' },
                      { val: '45+', label: '45 +' }
                    ].map(a => (
                      <button
                        key={a.val}
                        onClick={() => setAge(a.val)}
                        type="button"
                        className={`py-3 rounded-xl border text-center font-mono text-xs uppercase tracking-wider cursor-pointer transition-all ${
                          age === a.val
                            ? 'bg-[#fb7185] text-black border-[#fb7185] font-bold shadow-[0_0_10px_rgba(225,29,72,0.15)]'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                        }`}
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Current Obstacle */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="border-b border-white/5 pb-2">
                <span className="text-xs font-mono text-[#fb7185] font-bold">STEP 02 OF 03</span>
                <h4 className="text-lg font-bold text-white uppercase mt-1">What is your primary physical obstacle?</h4>
              </div>

              <div className="flex flex-col gap-3">
                {OBSTACLE_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setObstacle(opt.value)}
                    type="button"
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                      obstacle === opt.value
                        ? 'bg-[#fb7185]/5 border-[#fb7185] text-[#fb7185] font-semibold'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    <span className="text-xs font-mono pr-4 leading-normal">{opt.label}</span>
                    <div className={`h-4 w-4 rounded-full border shrink-0 flex items-center justify-center ${
                      obstacle === opt.value ? 'border-[#fb7185] bg-[#fb7185]' : 'border-zinc-700'
                    }`}>
                      {obstacle === opt.value && <Check className="h-2.5 w-2.5 text-black stroke-[4]" />}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: Lifestyle Audit */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="border-b border-white/5 pb-2">
                <span className="text-xs font-mono text-[#fb7185] font-bold">STEP 03 OF 03</span>
                <h4 className="text-lg font-bold text-white uppercase mt-1">Lifestyle & Daily Telemetry</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">Average Sleep Duration</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { val: 'under-6', label: 'Under 6h' },
                      { val: '6-8', label: '6 – 8h' },
                      { val: '8+', label: 'Over 8h' }
                    ].map(s => (
                      <button
                        key={s.val}
                        onClick={() => setSleep(s.val)}
                        type="button"
                        className={`py-3 rounded-xl border text-center font-mono text-xs uppercase tracking-wider cursor-pointer transition-all ${
                          sleep === s.val
                            ? 'bg-[#fb7185] text-black border-[#fb7185] font-bold shadow-[0_0_10px_rgba(225,29,72,0.15)]'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">Weekly Workouts / Training</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { val: '0-2', label: '0 – 2 Days' },
                      { val: '3-4', label: '3 – 4 Days' },
                      { val: '5+', label: '5 + Days' }
                    ].map(w => (
                      <button
                        key={w.val}
                        onClick={() => setWorkoutDays(w.val)}
                        type="button"
                        className={`py-3 rounded-xl border text-center font-mono text-xs uppercase tracking-wider cursor-pointer transition-all ${
                          workoutDays === w.val
                            ? 'bg-[#fb7185] text-black border-[#fb7185] font-bold shadow-[0_0_10px_rgba(225,29,72,0.15)]'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                        }`}
                      >
                        {w.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* RESULTS DISPLAY */}
          {step === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="border-b border-white/5 pb-2 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-[#fb7185] font-bold">AUDIT REPORT CALCULATED</span>
                  <h4 className="text-lg font-bold text-white uppercase mt-1">Your Physique Gap Analysis</h4>
                </div>
                <button
                  onClick={resetAudit}
                  className="flex items-center gap-1 text-[10px] font-mono text-zinc-500 hover:text-[#fb7185] transition-colors uppercase border border-zinc-800 hover:border-[#fb7185]/30 rounded-lg px-2 py-1 cursor-pointer"
                >
                  <RefreshCw className="h-3 w-3" />
                  Restart
                </button>
              </div>

              {/* Physique Gap Card */}
              <div className="glass-card-active rounded-2xl p-6 border border-[#fb7185] bg-[#fb7185]/5 space-y-4">
                <div>
                  <span className="text-[9px] font-mono text-[#fb7185] uppercase font-bold tracking-widest block mb-0.5">Identified Gap</span>
                  <h5 className="text-lg font-black text-white uppercase tracking-tight leading-tight">
                    {getPhysiqueGap().title}
                  </h5>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed pl-3 border-l border-zinc-700">
                  {getPhysiqueGap().description}
                </p>

                <div className="bg-black/35 rounded-xl p-4 border border-[#fb7185]/15 space-y-1">
                  <span className="text-[9px] font-mono text-[#fb7185] uppercase tracking-wider font-bold block">
                    Strategic Action Plan
                  </span>
                  <p className="text-xs text-white/95 leading-relaxed font-sans font-medium">
                    {getPhysiqueGap().advice}
                  </p>
                </div>
              </div>

              <button
                onClick={handleApply}
                className="w-full bg-[#fb7185] hover:bg-white text-black font-extrabold text-sm py-4 rounded-xl shadow-xl transition-all uppercase tracking-wider flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                🚀 Apply Audit results to Enrollment Form
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step Navigation Controls */}
        {step !== 'result' && (
          <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-8">
            <button
              onClick={handlePrevStep}
              disabled={step === 1}
              className="text-xs font-mono text-zinc-500 hover:text-white uppercase transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              type="button"
            >
              ← Back
            </button>

            {/* Dots */}
            <div className="flex gap-1.5">
              {[1, 2, 3].map(s => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    step === s ? 'w-6 bg-[#fb7185]' : 'w-1.5 bg-zinc-800'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNextStep}
              className="inline-flex items-center gap-1.5 bg-[#fb7185] text-black px-5 py-3 rounded-xl font-mono text-xs font-black uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
              type="button"
            >
              {step === 3 ? 'Calculate Report' : 'Next Step'}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
