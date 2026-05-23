import { ProgramPackage, FAQItem } from './types';

export const HERO_COPY = {
  accentLabel: "8 Years in the Trenches • Science-Backed Results",
  mainHeadline: "YOUR PHYSIQUE IS A SCIENCE. STOP GUESSING.",
  subHeadline: "Bulked. Shredded. Proven. I've spent 8 years mastering the training and nutrition methodologies that take human bodies to single-digit body fat. Now, I'm handing you the keys to your ultimate form.",
  primaryCTA: "Claim Your Blueprint",
  secondaryCTA: "Explore Programs",
  metrics: [
    { value: "08+", label: "Years Experience" },
    { value: "100%", label: "Practice What I Preach" },
    { value: "<09%", label: "Single-Digit Body Fat" },
    { value: "1-on-1", label: "No Generic Form-Letters" }
  ]
};

export const ABOUT_COPY = {
  title: "MEET ISHAN",
  subtitle: "Founder, Head Coach & Strength Strategist",
  intro: "I don't sell 'miracle' powders, 30-day quick fixes, or generic influencer workouts. I build elite physiques using ironclad exercise mechanics and cutting-edge metabolic science.",
  paragraphs: [
    "My journey started over eight years ago. Just like many of you, I spent my early years in the gym overwhelmed by contrasting advice, fake natural claims, and confusing research. I made every mistake in the book—from dangerous overtraining to standard nutritional starvations that wiped out my energy and muscle.",
    "So, I threw out the bodybuilding forum hype and dug into the clinical literature. I applied nutrition kinetics, biomechanics, and human physiology to my own body. I bulked up productively, packed on dense, functional muscle, and systematically cut down to single-digit body fat percentages strictly using science-guided training and flexible dieting.",
    "I believe in radical transparency: your coach must practice what they preach. I have personally bulked, maintained, and shredded, meaning I understand the psychological and physical hurdles of every single phase. I'm here to bypass the standard gym confusion and fast-track you straight to results."
  ],
  credentialsList: [
    "8+ Years of Elite Gym & Biomechanical Training Experience",
    "Comprehensive mastery of advanced Macronutrient Partitioning & TDEE manipulation",
    "Expertise in Progressive Overload Periodization & Fatigue/Recovery management",
    "100% bespoke protocol designs adjusted weekly based on your live biofeedback"
  ]
};

export const SERVICES_DATA: ProgramPackage[] = [
  {
    id: "meal-planning",
    name: "The Metabolic Fuel Blueprint",
    tagline: "Unshackle your diet. Fuel your aesthetic dominance.",
    description: "A tailored nutrition architecture calculated using your precise lean body mass (LBM) and daily energy outputs. No miserable food restrictions—just real, science-driven fuel parameters.",
    features: [
      "Custom Macro & Calorie Targets adjusted dynamically",
      "Flexible Dieting Guide (IIFYM) with sample meal combinations",
      "Digestive Health & Micronutrient optimization list",
      "Hydration, Sodium & Workout-nutrition protocols",
      "Direct weekly adjustments based on weight trends & hunger cues"
    ],
    duration: "Monthly / Recurring",
    suitableFor: "Busy professionals, plateaued lifters, and flexible eating enthusiasts.",
    intensity: "Medium",
    iconName: "Apple"
  },
  {
    id: "muscle-blueprint",
    name: "The Hypertrophy Matrix System",
    tagline: "Ditch the junk volume. Force real myofibrillar growth.",
    description: "An advanced training curriculum engineered around mechanical tension, muscle-length dynamics, and progressive overload. Skip the plateaus and pack on dense, powerful tissue.",
    features: [
      "100% Customized Training Split (Gym or Home focus)",
      "Targeted Volume, Rep-Ranges & RPE/RIR guidelines",
      "Biomechanical form correction via video analysis",
      "Injury prevention & joint longevity protocols",
      "Systemic Fatigue Audit & strategic deload sequencing"
    ],
    duration: "12-Week Transformation",
    suitableFor: "Hardgainers, intermediate lifters wanting structured strength progressions.",
    intensity: "High",
    iconName: "Dumbbell"
  },
  {
    id: "fat-loss",
    name: "The Single-Digit Shred Protocol",
    tagline: "The executive biological roadmap to extreme conditioning.",
    description: "My signature, ultra-comprehensive coaching program. Designed to safely strip body fat down to single digits while fully maintaining and highlighting lean muscle mass.",
    features: [
      "Simultaneous Hypertrophy & Fat-Loss guidelines (Recomp)",
      "Daily Weight & Cardio tracking dashboards",
      "Advanced leptin manipulation & refeed/diet-break strategies",
      "24/7 direct WhatsApp support access with Ishan",
      "Comprehensive weekly check-in audits & mindset coaching"
    ],
    duration: "16-Week Flagship Program",
    suitableFor: "Dedicated individuals seeking high-performance conditioning.",
    intensity: "Extreme",
    iconName: "Zap"
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: "How do you calculate my macros, and will I need to restrict entire food groups?",
    answer: "Absolutely not. Restricting entire food groups is the quickest shortcut to psychological burnout. We establish your specific Total Daily Energy Expenditure (TDEE) and Lean Body Mass (LBM) through comprehensive client parsing. I will teach you a flexible dieting strategy (balancing macros and micros) that enables you to stay social, enjoy life, and hit your goals without food-guilt.",
    category: "nutrition"
  },
  {
    question: "I've been lifting for years but have hit a stubborn plateau. How will your training system help?",
    answer: "Plateaus are usually a sign of unmanaged fatigue, insufficient mechanical tension, or a lack of progressive overload structure. We will audit your current training logs, analyze video footage of your lift execution, and adjust your set volumes and proximity to failure (RPE/RIR). We use undulating progression variables to break adaptational resistance and spark fresh muscle hypertrophy.",
    category: "training"
  },
  {
    question: "Is single-digit body fat sustainable, and is it what I should strive for?",
    answer: "Getting to single-digit body fat is a rigorous, elite endeavor suited for physical milestones, photoshoots, or events. While spectacular, it requires extreme compliance. For long-term year-round comfort, energy, focus, and healthy hormone balances, most men thrive between 10-14% body fat. We will customize your level of leanness to support both your aesthetic aspirations and daily work-life vitality.",
    category: "coaching"
  },
  {
    question: "How is Ishan's coaching different from a generic PDF training guide?",
    answer: "A generic PDF is a dead document. It cannot review your lifting form, adjust variables when you get sick, or explain the physiological reasons behind a macro shift. My coaching is an active, collaborative partnership. You get dynamic weekly program adjustments, video biomechanical feedback, stress/sleep tracking audits, and direct support to teach you the 'why' behind the results.",
    category: "coaching"
  }
];
