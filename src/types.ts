export interface ProgramPackage {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  duration: string;
  suitableFor: string;
  intensity: 'Medium' | 'High' | 'Extreme';
  iconName: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'nutrition' | 'training' | 'coaching';
}

export interface ClientInquiry {
  name: string;
  email: string;
  fitnessGoal: 'muscle' | 'fat-loss' | 'meal-plan' | 'recomp';
  experience: 'beginner' | 'intermediate' | 'advanced';
  message: string;
}

export interface MacroResult {
  maintenanceCalories: number;
  targetCalories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
}
