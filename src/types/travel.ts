export interface Activity {
  title: string;
  timeSlot?: string; // e.g. "09:30 AM - 12:00 PM"
  duration: string;  // e.g. "2.5 hours"
  location: string;
  description: string;
  category: 'sightseeing' | 'cultural' | 'adventure' | 'relaxation' | 'food' | 'shopping' | 'photo';
  estimatedCost: string;
  highlights: string[];
  tips?: string;
  latitude?: number;
  longitude?: number;
}

export interface MealRecommendation {
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  cuisine: string;
  estimatedCost: string;
  description: string;
  location?: string;
  recommendedDishes?: string[];
}

export interface DayPlan {
  dayNumber: number;
  theme: string;
  neighborhood: string;
  morning: Activity;
  afternoon: Activity;
  evening: Activity;
  meals: MealRecommendation[];
  transportationTips: string;
  insiderTip: string;
}

export interface PackingItem {
  id: string;
  name: string;
  checked: boolean;
  essential?: boolean;
  reason?: string;
}

export interface PackingCategory {
  category: string;
  items: PackingItem[];
}

export interface BudgetCategory {
  category: string;
  amountUSD: number;
  percentage: number;
  note: string;
}

export interface TripPlan {
  id: string;
  title: string;
  destination: string;
  tagline: string;
  summary: string;
  durationDays: number;
  travelGroup: 'solo' | 'couple' | 'friends' | 'family';
  budgetLevel: 'budget' | 'moderate' | 'luxury' | 'ultra_luxury';
  pace: 'relaxed' | 'balanced' | 'fast_paced';
  bestTimeToVisit: string;
  weatherForecast: {
    summary: string;
    tempRange: string;
    clothingAdvice: string;
  };
  currency: {
    code: string;
    symbol: string;
    rateDescription: string;
  };
  estimatedBudget: {
    totalMinUSD: number;
    totalMaxUSD: number;
    categories: BudgetCategory[];
  };
  days: DayPlan[];
  packingList: PackingCategory[];
  localEtiquetteAndTips: {
    tippingCustoms: string;
    transportHighlights: string;
    culturalDoAndDonts: string[];
    emergencyNumbers: { name: string; number: string }[];
    usefulPhrases: { phrase: string; translation: string; pronunciation: string }[];
  };
  createdAt: number;
}

export interface TripRequest {
  destination: string;
  origin?: string;
  durationDays: number;
  startDate?: string;
  travelGroup: 'solo' | 'couple' | 'friends' | 'family';
  budgetLevel: 'budget' | 'moderate' | 'luxury' | 'ultra_luxury';
  pace: 'relaxed' | 'balanced' | 'fast_paced';
  interests: string[];
  dietary?: string;
  specialPreferences?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  suggestions?: string[];
}
