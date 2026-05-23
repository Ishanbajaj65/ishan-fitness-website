import { useState } from 'react';
import { motion } from 'motion/react';
import { Apple, Dumbbell, Zap, Check, ArrowRight, Award, Flame } from 'lucide-react';
import { ProgramPackage } from '../types';
import { SERVICES_DATA } from '../fitnessData';

interface ProgramsSectionProps {
  onSelectPackage: (goalType: 'muscle' | 'fat-loss' | 'meal-plan' | 'recomp') => void;
}

export default function ProgramsSection({ onSelectPackage }: ProgramsSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Apple':
        return <Apple className="h-6 w-6" />;
      case 'Dumbbell':
        return <Dumbbell className="h-6 w-6" />;
      case 'Zap':
        return <Zap className="h-6 w-6" />;
      default:
        return <Dumbbell className="h-6 w-6" />;
    }
  };

  const mapPackageToGoalType = (id: string): 'muscle' | 'fat-loss' | 'meal-plan' | 'recomp' => {
    if (id === 'meal-planning') return 'meal-plan';
    if (id === 'muscle-blueprint') return 'muscle';
    return 'fat-loss';
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'Medium':
        return 'text-green-400 bg-green-950/30 border-green-900/40';
      case 'High':
        return 'text-amber-400 bg-amber-950/30 border-amber-900/40';
      case 'Extreme':
        return 'text-red-400 bg-red-950/40 border-red-900/40';
      default:
        return 'text-zinc-400 bg-zinc-950/30 border-zinc-850';
    }
  };

  return (
    <div id="programs-section" className="space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-[10px] font-mono tracking-widest text-[#bfff00] uppercase font-bold">
          High-Science Blueprints
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          CORE PROTOCOLS & PACKAGES
        </h2>
        <p className="text-zinc-400 text-sm">
          No generic advice. Every single protocol below is customized specifically for your physical body, metabolic trends, biofeedback tracking, and lifestyle constraints.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {SERVICES_DATA.map((pkg, idx) => {
          const isExtreme = pkg.intensity === 'Extreme';
          const goalType = mapPackageToGoalType(pkg.id);

          return (
            <div
              key={pkg.id}
              className={`relative bg-zinc-950 border rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 ${
                isExtreme
                  ? 'border-[#bfff00]/30 shadow-[#bfff00]/5 shadow-xl'
                  : 'border-zinc-800 hover:border-zinc-700 shadow-lg'
              }`}
            >
              {isExtreme && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#bfff00] text-black font-extrabold text-[9px] font-mono uppercase px-3 py-1 rounded-full tracking-widest shadow-lg flex items-center gap-1.5 border border-black/10">
                  <Flame className="h-3 w-3 fill-black animate-pulse" />
                  <span>Flagship Protocol</span>
                </div>
              )}

              {/* Package Header */}
              <div className="space-y-5">
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-xl border ${
                    isExtreme
                      ? 'bg-[#bfff00]/10 border-[#bfff00]/20 text-[#bfff00]'
                      : 'bg-zinc-900 border-zinc-850 text-zinc-300'
                  }`}>
                    {getIcon(pkg.iconName)}
                  </div>
                  <div className="flex gap-2">
                    <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded border ${getIntensityColor(pkg.intensity)}`}>
                      {pkg.intensity} Load
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{pkg.name}</h3>
                  <p className={`text-xs font-medium font-sans mt-1 ${isExtreme ? 'text-lime-400/90 font-mono' : 'text-zinc-500'}`}>
                    {pkg.tagline}
                  </p>
                </div>

                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">{pkg.description}</p>

                <hr className="border-zinc-900" />

                {/* Features List */}
                <div className="space-y-3">
                  <p className="text-[10px] font-semibold text-zinc-500 font-mono uppercase tracking-wider">Features Included:</p>
                  <ul className="space-y-2.5">
                    {pkg.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <Check className="h-3.5 w-3.5 text-lime-400 shrink-0 mt-0.5 stroke-[3.5]" />
                        <span className="leading-normal">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Package Footer info and action Button */}
              <div className="mt-8 pt-6 border-t border-zinc-900 space-y-4">
                <div className="grid grid-cols-2 gap-2 text-left">
                  <div>
                    <span className="text-[9px] font-mono text-zinc-600 uppercase block mb-0.5">Timeline:</span>
                    <span className="text-xs text-zinc-300 font-bold">{pkg.duration}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-zinc-600 uppercase block mb-0.5">Focus Group:</span>
                    <span className="text-xs text-zinc-300 font-bold leading-tight line-clamp-1">{pkg.id === 'meal-planning' ? 'Nutrition Only' : 'Recomp/Hypertrophy'}</span>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-500 leading-normal italic">
                  <strong>Best for:</strong> {pkg.suitableFor}
                </p>

                <button
                  type="button"
                  onClick={() => onSelectPackage(goalType)}
                  className={`w-full font-bold text-xs py-3.5 rounded-xl transition-all cursor-pointer uppercase tracking-wider flex items-center justify-center gap-1.5 border group ${
                    isExtreme
                      ? 'bg-[#bfff00] hover:bg-white text-black border-transparent shadow-[#bfff00]/20 shadow-md'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-800'
                  }`}
                >
                  <span>Get Started on This Program</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
