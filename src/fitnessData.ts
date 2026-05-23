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
  intro: "I don't sell 'miracle' powders, 30-day quick fixes, or generic influencer workouts. I build elite physiques using proven workout science and real-world nutrition strategies.",
  paragraphs: [
    "My journey started over eight years ago. Just like many of you, I spent my early years in the gym overwhelmed by contrasting advice, fake claims, and confusing research. I made every mistake in the book—from dangerous overtraining to standard starvation diets that wiped out my energy and muscle.",
    "So, I threw out the bodybuilding forum hype and dug into the actual exercise science. I applied nutrition, proper body mechanics, and human physiology to my own body. I bulked up productively, packed on dense, functional muscle, and systematically cut down to single-digit body fat percentages strictly using science-guided training and flexible dieting.",
    "I believe in radical transparency: your coach must practice what they preach. I have personally bulked, maintained, and shredded, meaning I understand the psychological and physical hurdles of every single phase. I'm here to bypass the standard gym confusion and fast-track you straight to results."
  ],
  credentialsList: [
    "8+ Years of Elite Gym & Biomechanical Training Experience",
    "Customized nutrition and meal plans designed specifically for your body and goals",
    "Smart workout design that guarantees you get stronger every week without burning out",
    "100% customized programs updated weekly based on how your body responds"
  ]
};

export const SERVICES_DATA: ProgramPackage[] = [
  {
    id: "meal-planning",
    name: "The Metabolic Fuel Blueprint",
    tagline: "Unshackle your diet. Fuel your body's potential.",
    description: "A customized nutrition plan designed around your exact body type and daily energy levels. No miserable food restrictions—just simple, science-driven eating guidelines.",
    features: [
      "Custom Macro & Calorie Targets adjusted dynamically",
      "Flexible Dieting Guide with simple, delicious meal ideas",
      "Digestive health and daily energy optimization guide",
      "Hydration, nutrient timing & pre/post workout nutrition",
      "Direct weekly adjustments based on weight trends & feedback"
    ],
    duration: "Monthly / Recurring",
    suitableFor: "Busy professionals, plateaued lifters, and flexible eating enthusiasts.",
    intensity: "Medium",
    iconName: "Apple"
  },
  {
    id: "muscle-blueprint",
    name: "The Hypertrophy Matrix System",
    tagline: "Ditch the junk workouts. Build real, solid muscle.",
    description: "A customized workout plan designed around smart lifting techniques and progressive strength gains. Skip the plateaus and pack on dense, high-quality muscle.",
    features: [
      "100% Customized Training Split (Gym or Home focus)",
      "Targeted workout volume, sets, and rep-range guidelines",
      "Form correction & biomechanical reviews via video analysis",
      "Injury prevention & joint longevity protocols",
      "Fatigue audits and strategic rest week scheduling"
    ],
    duration: "12-Week Transformation",
    suitableFor: "Hardgainers, intermediate lifters wanting structured strength progressions.",
    intensity: "High",
    iconName: "Dumbbell"
  },
  {
    id: "fat-loss",
    name: "The Single-Digit Shred Protocol",
    tagline: "The premium coaching roadmap to ultimate lean conditioning.",
    description: "My signature, comprehensive premium coaching program. Designed to help you safely burn fat and get shredded while maintaining every ounce of hard-earned muscle.",
    features: [
      "Simultaneous Muscle Building & Fat Loss guidelines (Recomp)",
      "Daily weight, nutrition, and exercise tracking dashboards",
      "Advanced plateau-breaking & metabolism protection strategies",
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
    question: "How do you calculate my target plan, and will I need to restrict entire food groups?",
    answer: "Absolutely not. Restricting entire food groups is the quickest shortcut to mental burnout. We calculate your exact daily calorie needs and ideal nutrition targets through our initial assessment. I will teach you a flexible eating strategy that enables you to stay social, enjoy life, and hit your goals without any food-related guilt.",
    category: "nutrition"
  },
  {
    question: "I've been lifting for years but have hit a stubborn plateau. How will your training system help?",
    answer: "Plateaus are usually a sign of unmanaged fatigue, lifting with incorrect form, or a lack of progressive challenge. We will audit your current workouts, analyze video footage of your lifts, and adjust your sets and reps. We use smart training adjustments to break plateaus and spark fresh muscle growth.",
    category: "training"
  },
  {
    question: "Is single-digit body fat sustainable, and is it what I should strive for?",
    answer: "Getting to single-digit body fat is a rigorous, elite endeavor suited for specific fitness goals, photoshoots, or events. While it looks incredible, it requires extreme consistency. For long-term comfort, energy, focus, and natural health, most men thrive between 10% and 14% body fat. We will customize your target leanness to balance both your aesthetic goals and your daily life and energy.",
    category: "coaching"
  },
  {
    question: "How is Ishan's coaching different from a generic PDF training guide?",
    answer: "A generic PDF is a static document. It cannot review your form, adjust variables when you get busy or sick, or explain the reasons behind a macro change. My coaching is a collaborative partnership. You get dynamic weekly program adjustments, video feedback on your form, sleep and stress audits, and direct support to teach you the 'why' behind the results.",
    category: "coaching"
  }
];
