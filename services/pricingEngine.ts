/**
 * ============================================================
 * SAFAR YATRA — PRICING ENGINE
 * ============================================================
 * Single Source of Truth for all taxi fare calculations.
 *
 * ANCHOR PRICE: Vadodara → Ahmedabad (165 km) = ₹1,999 (Standard/Dzire)
 * Derived per-km rate: ₹1,999 / 165 km ≈ ₹12.11/km
 *
 * All other route prices are calculated from this rate and then
 * rounded to the nearest ₹49 for clean, professional display.
 *
 * To add a new route: add an entry to ROUTE_PRICING_DB.
 * To change vehicle multipliers: edit VEHICLE_MULTIPLIERS.
 * Frontend code does NOT need to change for pricing updates.
 * ============================================================
 */

// --- Core Types ---

export type VehicleCategory = 'Standard' | 'Comfort' | 'Premium' | 'Luxury' | 'Group';
export type TripType = 'one-way' | 'round-trip';

export interface FareBreakdown {
  routeKey: string;
  origin: string;
  destination: string;
  distanceKm: number;
  vehicleCategory: VehicleCategory;
  tripType: TripType;
  baseFare: number;       // The core route price for the vehicle
  driverBata: number;     // Driver allowance (fixed per trip)
  estimatedToll: number;  // Toll estimate based on route
  statePermit: number;    // Inter-state permit if applicable
  grandTotal: number;     // Sum of all above
  pricePerKm: number;     // Informational
  roundTripDiscount?: number; // Discount applied for round-trip
}

export interface RoutePrice {
  vehicleId: string;
  vehicleCategory: VehicleCategory;
  oneWayTotal: number;
  roundTripTotal: number;
  breakdown: FareBreakdown;
}

// --- Internal Route DB Type ---
interface RouteEntry {
  origin: string;
  destination: string;
  distanceKm: number;
  standardOneWayPrice: number; // Anchor price for Standard (Dzire) category
  hasStateToll: boolean;       // Expressway / NH with tolls
  isInterState: boolean;       // Crosses state border (needs permit)
  estimatedTollAmount: number; // Fixed estimated toll for Standard car
}

// --- ROUTE PRICING DATABASE ---
// Source: Real road distances from Vadodara.
// Standard price = distance × ₹12.11, rounded to nearest ₹49.
// Add new routes here — all other calculations are automatic.

const ROUTE_PRICING_DB: RouteEntry[] = [
  {
    origin: 'Vadodara',
    destination: 'Ahmedabad',
    distanceKm: 165,
    standardOneWayPrice: 1999, // ← ANCHOR REFERENCE PRICE
    hasStateToll: true,
    isInterState: false,
    estimatedTollAmount: 150,
  },
  {
    origin: 'Vadodara',
    destination: 'Pavagadh',
    distanceKm: 55,
    standardOneWayPrice: 799,
    hasStateToll: false,
    isInterState: false,
    estimatedTollAmount: 0,
  },
  {
    origin: 'Vadodara',
    destination: 'Statue of Unity',
    distanceKm: 92,
    standardOneWayPrice: 1299,
    hasStateToll: false,
    isInterState: false,
    estimatedTollAmount: 60,
  },
  {
    origin: 'Vadodara',
    destination: 'Ambaji',
    distanceKm: 200,
    standardOneWayPrice: 2499,
    hasStateToll: false,
    isInterState: false,
    estimatedTollAmount: 100,
  },
  {
    origin: 'Vadodara',
    destination: 'Dwarka',
    distanceKm: 460,
    standardOneWayPrice: 5499,
    hasStateToll: true,
    isInterState: false,
    estimatedTollAmount: 350,
  },
  {
    origin: 'Vadodara',
    destination: 'Somnath',
    distanceKm: 425,
    standardOneWayPrice: 5099,
    hasStateToll: true,
    isInterState: false,
    estimatedTollAmount: 300,
  },
  {
    origin: 'Vadodara',
    destination: 'Palitana',
    distanceKm: 255,
    standardOneWayPrice: 3099,
    hasStateToll: true,
    isInterState: false,
    estimatedTollAmount: 180,
  },
  {
    origin: 'Vadodara',
    destination: 'Sasan Gir',
    distanceKm: 385,
    standardOneWayPrice: 4599,
    hasStateToll: true,
    isInterState: false,
    estimatedTollAmount: 260,
  },
  {
    origin: 'Vadodara',
    destination: 'Saputara',
    distanceKm: 285,
    standardOneWayPrice: 3499,
    hasStateToll: false,
    isInterState: false,
    estimatedTollAmount: 120,
  },
  {
    origin: 'Vadodara',
    destination: 'Udaipur',
    distanceKm: 225,
    standardOneWayPrice: 2799,
    hasStateToll: true,
    isInterState: true,
    estimatedTollAmount: 200,
  },
  {
    origin: 'Vadodara',
    destination: 'Mount Abu',
    distanceKm: 230,
    standardOneWayPrice: 2849,
    hasStateToll: true,
    isInterState: true,
    estimatedTollAmount: 200,
  },
  {
    origin: 'Vadodara',
    destination: 'Diu',
    distanceKm: 395,
    standardOneWayPrice: 4699,
    hasStateToll: true,
    isInterState: true,
    estimatedTollAmount: 280,
  },
  {
    origin: 'Vadodara',
    destination: 'Polo Forest',
    distanceKm: 165,
    standardOneWayPrice: 1999,
    hasStateToll: false,
    isInterState: false,
    estimatedTollAmount: 80,
  },
  {
    origin: 'Vadodara',
    destination: 'Wilson Hills',
    distanceKm: 185,
    standardOneWayPrice: 2299,
    hasStateToll: false,
    isInterState: false,
    estimatedTollAmount: 80,
  },
  {
    origin: 'Vadodara',
    destination: 'Shirdi',
    distanceKm: 455,
    standardOneWayPrice: 5449,
    hasStateToll: true,
    isInterState: true,
    estimatedTollAmount: 380,
  },
  {
    origin: 'Vadodara',
    destination: 'Parul University',
    distanceKm: 22,
    standardOneWayPrice: 399,
    hasStateToll: false,
    isInterState: false,
    estimatedTollAmount: 0,
  },
  {
    origin: 'Vadodara',
    destination: 'Ahmedabad Airport',
    distanceKm: 175,
    standardOneWayPrice: 2149,
    hasStateToll: true,
    isInterState: false,
    estimatedTollAmount: 160,
  },
];

// --- VEHICLE CATEGORY MULTIPLIERS ---
// Applied on top of the Standard (Dzire) base price.
// e.g. Comfort = 1.25× means Ertiga costs 25% more than Dzire for same route.

const VEHICLE_MULTIPLIERS: Record<VehicleCategory, number> = {
  Standard: 1.00,   // Dzire — anchor
  Comfort:  1.25,   // Ertiga, Innova Old
  Premium:  1.55,   // Innova Crysta, Force Urbania
  Luxury:   1.90,   // Innova Hycross
  Group:    2.80,   // Mini Bus Standard (per vehicle, not per person)
};

// --- SURCHARGES (Fixed amounts, easy to update) ---
const SURCHARGES = {
  driverBataPerTrip: 200,        // Standard driver allowance
  statePermitCharge: 350,        // If inter-state route
  roundTripMultiplier: 1.85,     // Industry standard round-trip discount (vs 2x)
  groupVehicleBataMultiplier: 1, // Group vehicles get same bata (driver handles bus)
};

// --- HELPER: Round to nearest ₹49 for clean pricing ---
const roundToNearest49 = (price: number): number => {
  return Math.round(price / 49) * 49;
};

// --- CORE: Normalize route lookup (case-insensitive, both directions) ---
const findRoute = (origin: string, destination: string): RouteEntry | null => {
  const normalizedOrigin = origin.trim().toLowerCase();
  const normalizedDest = destination.trim().toLowerCase();

  return (
    ROUTE_PRICING_DB.find(
      (r) =>
        r.origin.toLowerCase() === normalizedOrigin &&
        r.destination.toLowerCase() === normalizedDest
    ) ||
    // Also check reverse direction (return trip same price logic)
    ROUTE_PRICING_DB.find(
      (r) =>
        r.destination.toLowerCase() === normalizedOrigin &&
        r.origin.toLowerCase() === normalizedDest
    ) ||
    null
  );
};

// --- MAIN EXPORT: Calculate fare for a single vehicle category ---
export const calculateFare = (
  origin: string,
  destination: string,
  vehicleCategory: VehicleCategory,
  tripType: TripType
): FareBreakdown | null => {
  const route = findRoute(origin, destination);
  if (!route) return null;

  const multiplier = VEHICLE_MULTIPLIERS[vehicleCategory];
  const rawBaseFare = route.standardOneWayPrice * multiplier;
  const baseFare = roundToNearest49(rawBaseFare);

  const driverBata = SURCHARGES.driverBataPerTrip;
  const estimatedToll = route.hasStateToll ? route.estimatedTollAmount : 0;
  const statePermit = route.isInterState ? SURCHARGES.statePermitCharge : 0;

  const oneWayTotal = baseFare + driverBata + estimatedToll + statePermit;

  let grandTotal: number;
  let roundTripDiscount: number | undefined;

  if (tripType === 'round-trip') {
    const doublePrice = oneWayTotal * 2;
    grandTotal = Math.round(oneWayTotal * SURCHARGES.roundTripMultiplier);
    roundTripDiscount = doublePrice - grandTotal;
  } else {
    grandTotal = oneWayTotal;
  }

  return {
    routeKey: `${route.origin.toLowerCase()}-${route.destination.toLowerCase()}`,
    origin: route.origin,
    destination: route.destination,
    distanceKm: route.distanceKm,
    vehicleCategory,
    tripType,
    baseFare,
    driverBata,
    estimatedToll,
    statePermit,
    grandTotal,
    pricePerKm: Math.round(baseFare / route.distanceKm),
    roundTripDiscount,
  };
};

// --- EXPORT: Get prices for ALL vehicle categories for a given route ---
// Useful for CarSelection to show all options at once.
export const getRoutePriceForAllCategories = (
  origin: string,
  destination: string,
  tripType: TripType
): Map<VehicleCategory, FareBreakdown> => {
  const results = new Map<VehicleCategory, FareBreakdown>();
  const categories: VehicleCategory[] = ['Standard', 'Comfort', 'Premium', 'Luxury', 'Group'];

  for (const cat of categories) {
    const fare = calculateFare(origin, destination, cat, tripType);
    if (fare) {
      results.set(cat, fare);
    }
  }
  return results;
};

// --- EXPORT: Check if a route is in our DB ---
export const isRouteSupported = (origin: string, destination: string): boolean => {
  return findRoute(origin, destination) !== null;
};

// --- EXPORT: Get all available destinations from our DB (for dropdowns) ---
export const getSupportedDestinations = (): string[] => {
  return [...new Set(ROUTE_PRICING_DB.map((r) => r.destination))];
};

// --- EXPORT: Format price for display (₹1,999) ---
export const formatPrice = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};
