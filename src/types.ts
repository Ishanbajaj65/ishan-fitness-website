export interface ClientInquiry {
  name: string;
  phone: string;
}

export interface MacroResult {
  maintenanceCalories: number;
  targetCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  proteinPct?: number;
  carbsPct?: number;
  fatPct?: number;
}

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
