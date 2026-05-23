import React from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, MessageCircle, Zap, Dumbbell, Apple, DollarSign } from 'lucide-react';

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
    icon: <Apple className="h-5 w-5" />,
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
    icon: <Dumbbell className="h-5 w-5" />,
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
    icon: <Zap className="h-5 w-5" />,
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
    <div id="pricing-section" className="space-y-14">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto space-y-4">
        <span className="section-badge">
          <DollarSign className="h-3 w-3" />
          Transparent Investment
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-[-0.03em] uppercase">
          Program Pricing
        </h2>
        <p className="text-[#8d9479] text-sm leading-relaxed">
          No hidden fees. No upsells. One price, one coach, one transformation. Spots are limited — Ishan works with a small roster to guarantee quality.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {PRICING.map((tier, idx) => {
          const isHovered = hoveredId === tier.id;

          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredId(tier.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`relative rounded-3xl p-7 md:p-8 flex flex-col justify-between transition-all duration-300 ${
                tier.highlight
                  ? 'glass-card-lime glow-lime'
                  : 'glass-card hover:border-[rgba(191,255,0,0.12)]'
              }`}
              style={{ transform: isHovered ? 'translateY(-5px)' : 'translateY(0)' }}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute top-0 right-7 -translate-y-1/2 bg-[#bfff00] text-black font-extrabold text-[9px] font-mono uppercase px-3 py-1.5 rounded-full tracking-widest shadow-lg">
                  {tier.badge}
                </div>
              )}

              <div className="space-y-6">
                {/* Icon */}
                <div className={`p-3 rounded-xl border w-fit ${
                  tier.highlight
                    ? 'bg-[rgba(191,255,0,0.1)] border-[rgba(191,255,0,0.25)] text-[#bfff00]'
                    : 'bg-[rgba(255,255,255,0.04)] border-white/10 text-[#8d9479]'
                }`}>
                  {tier.icon}
                </div>

                {/* Name & Tagline */}
                <div>
                  <h3 className="font-display text-xl font-black text-white tracking-tight uppercase">{tier.name}</h3>
                  <p className={`text-xs font-mono mt-1.5 ${tier.highlight ? 'text-[#bfff00]' : 'text-[#8d9479]'}`}>
                    {tier.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className={`flex items-end gap-2 py-3.5 px-4 rounded-xl border ${
                  tier.highlight
                    ? 'bg-[rgba(191,255,0,0.05)] border-[rgba(191,255,0,0.2)]'
                    : 'bg-[rgba(255,255,255,0.02)] border-white/8'
                }`}>
                  <span className={`text-3xl font-black font-mono tracking-tight ${
                    tier.highlight ? 'text-[#bfff00]' : 'text-white'
                  }`}>{tier.price}</span>
                  <span className="text-[#8d9479] text-sm mb-0.5 font-mono">{tier.priceNote}</span>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

                {/* Features */}
                <ul className="space-y-2.5">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[#c3caac]">
                      <Check className={`h-3.5 w-3.5 shrink-0 mt-0.5 stroke-[3] ${
                        tier.highlight ? 'text-[#bfff00]' : 'text-emerald-400'
                      }`} />
                      <span className="leading-normal">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
                <button
                  type="button"
                  onClick={() => onApply(goalMap[tier.id])}
                  className={`w-full font-bold text-xs py-4 rounded-xl transition-all cursor-pointer uppercase tracking-wider flex items-center justify-center gap-2 border group ${
                    tier.highlight
                      ? 'bg-[#bfff00] hover:bg-white text-black border-transparent glow-lime-sm'
                      : 'bg-transparent hover:bg-[rgba(191,255,0,0.05)] text-[#c3caac] hover:text-[#bfff00] border-white/10 hover:border-[rgba(191,255,0,0.25)]'
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="https://wa.me/917297946193?text=Hi%20Ishan%2C%20I'm%20interested%20in%20your%20coaching%20program."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-xs py-3 rounded-xl border border-white/8 hover:border-[rgba(191,255,0,0.2)] bg-transparent hover:bg-[rgba(0,0,0,0.3)] text-[#8d9479] hover:text-[#bfff00] transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-green-400" />
                  <span>Chat on WhatsApp First</span>
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Trust note */}
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 glass-card rounded-2xl px-6 py-3.5">
          <Check className="h-4 w-4 text-[#bfff00] stroke-[3] shrink-0" />
          <p className="text-xs text-[#8d9479]">
            <span className="text-white font-semibold">100% Satisfaction Commitment.</span> If you're not seeing results by week 4, Ishan restructures your protocol at no extra cost.
          </p>
        </div>
      </div>
    </div>
  );
}
