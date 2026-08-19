
// Re-export pricing types from pricingEngine for use across components
export type { TripType, FareBreakdown, VehicleCategory } from './services/pricingEngine';
export type TravelIntent = 'family' | 'parents' | 'religious' | 'leisure' | 'business' | 'airport';

export type AppView = 'login' | 'main' | 'booking' | 'destination' | 'category';
export type MainTab = 'home' | 'travel' | 'trips' | 'notifications' | 'profile';

export type Season = 'Summer' | 'Monsoon' | 'Winter' | 'All Year';
export type DestinationCategory = 'Spiritual' | 'Leisure' | 'Nature' | 'Utility' | 'Heritage' | 'Hill Station' | 'Beach';

export interface Location {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  images?: string[];
  tags: string[];
  season: Season;
  type: DestinationCategory;
  bestMonths: string[];
  familyFriendly: boolean;
  idealDuration?: string;
  distanceFromBase?: string; // e.g. "250 km from Vadodara"
  
  // Smart Recommendation Engine Fields (22 Variables)
  lat?: number;
  lng?: number;
  state?: string;
  district?: string;
  category?: string;
  bestTime?: string;
  entryFee?: string;
  openingHours?: string;
  estimatedBudget?: number;
  averageDuration?: string;
  safetyRating?: number;
  userRating?: number;
  popularityScore?: number;
  nearbyAttractions?: string[];
  availableActivities?: string[];
  
  // New variables for Advanced Algorithm
  crowdLevel?: 'Low' | 'Moderate' | 'High';
  roadConditions?: 'Excellent' | 'Good' | 'Average' | 'Poor';
  accessibility?: boolean; // Wheelchair/elderly friendly
  adventureLevel?: number; // 1-10
  photographyScore?: number; // 1-10
  natureScore?: number; // 1-10
  religiousImportance?: number; // 1-10
  isWeekendGetaway?: boolean;
  festivalSpecial?: string[]; // e.g. ['Navratri', 'Diwali']
  longHolidayIdeal?: boolean;
  nearbyEvents?: string[];
}

export interface IntentDiscoveryData {
  id: TravelIntent;
  title: string;
  subtitle: string;
  heroImage: string;
  featured: string[]; // Location IDs
  routes: { from: string; to: string; distance: string; image: string }[];
  shortTrips: string[]; // Location IDs
  moreDestinations: string[]; // Location IDs
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface DriverProfile {
  id: string;
  name: string;
  experienceYears: number;
  rating: number;
  totalTrips: number;
  languages: string[];
  badges: string[];
  bio: string;
  imageUrl: string;
  reviews: Review[];
}

export interface CarOption {
  id: string;
  name: string;
  category: 'Comfort' | 'Premium' | 'Luxury' | 'Group' | 'Standard';
  seats: number;
  acAvailable: boolean;
  pricePerKm: number;
  estimatedTotal: number;
  vehicleType: string;
  shortDescription?: string;
  features: string[];
  imageUrl: string; // Fallback main image
  images?: {
      cover?: string;
      thumbnail?: string;
      front?: string;
      side?: string;
      interior?: string;
      rear?: string;
  };
  driver: DriverProfile;
}

export interface JourneyData {
  step: number;
  intent: TravelIntent | null;
  origin: string;
  destination: string;
  date: string;
  tripType: 'one-way' | 'round-trip';
  selectedCarId: string | null;
  passengers: number;
  notes: string;
  paymentStatus: 'pending' | 'paid';
}

export interface Booking {
  id: string;
  origin: string;
  destination: string;
  date: string;
  carId: string;
  carName: string;
  pilotName: string;
  totalAmount: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  rating?: number; // 1-5 if rated
  feedback?: string;
}

export interface AIJourneyInsight {
  summary: string;
  pitStops: { name: string; type: string; reason: string }[];
  culturalFact: string;
  estimatedDuration: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  emergencyContact: string;
}
