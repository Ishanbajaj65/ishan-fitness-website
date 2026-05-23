import React from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, MessageCircle, Zap, Dumbbell, Apple } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  tagline: string;
  icon: React.ReactNode;
  features: string[];
  highlight: boolean;
  cta: string;
  badge?: string;
}

const PRICING: PricingTier[] = [
  {
    id: 'fuel',
    name: 'Metabolic Fuel Blueprint',
    price: '₹4,999',
    priceNote: '/ month',
    tagline: 'Nutrition architecture only. Perfect starting point.',
    icon: <Apple className="h-6 w-6" />,
    features: [
      'Custom Macro & Calorie Targets',
      'Flexible Dieting (IIFYM) Guide',
      'Micronutrient optimization list',
      'Hydration & workout-nutrition protocols',
      'Weekly adjustment check-ins',
    ],
    highlight: false,
    cta: 'Start Nutrition Protocol',
  },
  {
    id: 'hypertrophy',
    name: 'Hypertrophy Matrix System',
    price: '₹9,999',
    priceNote: '/ 12 weeks',
    tagline: 'Training + Nutrition combined for maximum muscle.',
    icon: <Dumbbell className="h-6 w-6" />,
    features: [
      'Custom Training Split (Gym or Home)',
      'Targeted Volume & RPE/RIR guidelines',
      'Biomechanical form correction via video',
      'Injury prevention protocols',
      'Fatigue audit & deload scheduling',
      'Weekly macro adjustments',
    ],
    highlight: false,
    cta: 'Build Muscle Now',
  },
  {
    id: 'shred',
    name: 'Single-Digit Shred Protocol',
    price: '₹16,999',
    priceNote: '/ 16 weeks',
    tagline: 'Full-stack flagship program. Maximum transformation.',
    icon: <Zap className="h-6 w-6" />,
    features: [
      'Complete Training + Nutrition system',
      'Daily Weight & Cardio dashboards',
      'Advanced leptin & refeed strategies',
      '24/7 direct WhatsApp access to Ishan',
      'Weekly video biomechanical reviews',
      'Mindset & lifestyle coaching audits',
    ],
    highlight: true,
    cta: 'Claim Your Shred Protocol',
    badge: 'Most Transformative',
  },
];

interface PricingSectionProps {
  onApply: (goal: string) => void;
}

export default function PricingSection({ onApply }: PricingSectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const goalMap: Record<string, string> = {
    fuel: 'meal-plan',
    hypertrophy: 'muscle',
    shred: 'fat-loss',
  };

  return (
    <div id="pricing-section" className="space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-[10px] font-mono tracking-widest text-[#bfff00] uppercase font-bold">
          Transparent Investment
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          PROGRAM PRICING
        </h2>
        <p className="text-zinc-400 text-sm leading-relaxed">
          No hidden fees. No upsells. One price, one coach, one transformation. Spots are limited — Ishan works with a small roster to guarantee quality.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {PRICING.map((tier) => {
          const isHovered = hoveredId === tier.id;

          return (
            <motion.div
              key={tier.id}
              onMouseEnter={() => setHoveredId(tier.id)}
              onMouseLeave={() => setHoveredId(null)}
              animate={{ y: isHovered ? -4 : 0 }}
              transition={{ duration: 0.2 }}
              className={`relative rounded-3xl p-6 md:p-8 flex flex-col justify-between border transition-all duration-300 ${
                tier.highlight
                  ? 'bg-zinc-950 border-[#bfff00]/30 shadow-[0_0_40px_rgba(191,255,0,0.06)]'
                  : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {tier.badge && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#bfff00] text-black font-extrabold text-[9px] font-mono uppercase px-3 py-1 rounded-full tracking-widest shadow-lg flex items-center gap-1.5">
                  <span>{tier.badge}</span>
                </div>
              )}

              <div className="space-y-5">
                {/* Icon */}
                <div className={`p-3 rounded-xl border w-fit ${
                  tier.highlight
                    ? 'bg-[#bfff00]/10 border-[#bfff00]/20 text-[#bfff00]'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                }`}>
                  {tier.icon}
                </div>

                {/* Name & Tagline */}
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{tier.name}</h3>
                  <p className={`text-xs mt-1 ${tier.highlight ? 'text-lime-400 font-mono' : 'text-zinc-500'}`}>
                    {tier.tagline}
                  </p>
                </div>

                {/* Price */}
                <div className={`flex items-end gap-1.5 py-3 px-4 rounded-xl border ${
                  tier.highlight
                    ? 'bg-[#bfff00]/5 border-[#bfff00]/20'
                    : 'bg-zinc-900/50 border-zinc-800'
                }`}>
                  <span className={`text-3xl font-extrabold font-mono tracking-tight ${
                    tier.highlight ? 'text-[#bfff00]' : 'text-white'
                  }`}>{tier.price}</span>
                  <span className="text-zinc-500 text-sm mb-0.5">{tier.priceNote}</span>
                </div>

                {/* Features */}
                <hr className="border-zinc-900" />
                <ul className="space-y-2.5">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <Check className={`h-3.5 w-3.5 shrink-0 mt-0.5 stroke-[3] ${
                        tier.highlight ? 'text-[#bfff00]' : 'text-lime-400'
                      }`} />
                      <span className="leading-normal">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-zinc-900 space-y-3">
                <button
                  type="button"
                  onClick={() => onApply(goalMap[tier.id])}
                  className={`w-full font-bold text-xs py-3.5 rounded-xl transition-all cursor-pointer uppercase tracking-wider flex items-center justify-center gap-1.5 group ${
                    tier.highlight
                      ? 'bg-[#bfff00] hover:bg-white text-black shadow-[0_0_20px_rgba(191,255,0,0.2)]'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800'
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>

                {/* WhatsApp shortcut */}
                <a
                  href="https://wa.me/917297946193?text=Hi%20Ishan%2C%20I'm%20interested%20in%20your%20coaching%20program."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-xs py-2.5 rounded-xl border border-zinc-800 bg-transparent hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-green-400" />
                  <span>Chat on WhatsApp First</span>
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Money-back / Trust note */}
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2.5 bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-3">
          <Check className="h-4 w-4 text-[#bfff00] stroke-[3]" />
          <p className="text-xs text-zinc-400">
            <span className="text-white font-semibold">100% Satisfaction Commitment.</span> If you're not seeing results by week 4, Ishan restructures your protocol at no extra cost.
          </p>
        </div>
      </div>
    </div>
  );
}
