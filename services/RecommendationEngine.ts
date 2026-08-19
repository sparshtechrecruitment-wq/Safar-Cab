import { Location, Season } from '../types';
import { WeatherData } from './WeatherService';
import { Coordinates } from './GeolocationService';
import { calculateStraightLineDistance, getDrivingRoute } from './RoutingService';

export interface ScoredLocation extends Location {
  score: number;
  distanceKm: number;
  matchReasons: string[];
}

interface UserContext {
  preferences: string[];
  wheelchairRequired: boolean;
  isWeekend: boolean;
  intent: string; // 'Family', 'Adventure', 'Religious', etc.
}

const getWeatherThemeMatches = (weather: WeatherData): string[] => {
  const isRain = weather.isRaining;
  const temp = weather.temperature;
  const isSunny = !isRain && weather.condition.toLowerCase().includes('sun');
  const isCold = temp < 20;
  const isPleasant = temp >= 20 && temp <= 28 && !isRain;

  let themes: string[] = [];
  
  if (isRain) themes.push('Waterfall', 'Nature', 'Hill Station');
  if (isSunny) themes.push('Resort', 'Lake', 'Indoor', 'Heritage');
  if (isCold) themes.push('Hill Station', 'Wildlife', 'Camping');
  if (isPleasant) themes.push('Sightseeing', 'Photography', 'Family', 'Spiritual');

  return themes;
};

export const calculateRecommendations = async (
  destinations: Location[],
  userLocation: Coordinates,
  currentSeason: Season,
  weather: WeatherData | null,
  userContext: UserContext,
  maxDistanceKm: number = 300
): Promise<ScoredLocation[]> => {
  
  const weatherThemes = weather ? getWeatherThemeMatches(weather) : [];

  const scoredDestinationsPromises = destinations.map(async dest => {
    let score = 0;
    let matchReasons: string[] = [];
    
    // --- 1. CORE LOGISTICS (Distance & Routing) ---
    const destCoords = { lat: dest.lat || 0, lng: dest.lng || 0 };
    
    // True OSRM Driving Distance (Graceful fallback to Haversine if API fails)
    let distanceKm = 0;
    try {
        const route = await getDrivingRoute(userLocation, destCoords);
        distanceKm = route ? route.distanceKm : calculateStraightLineDistance(userLocation, destCoords);
    } catch {
        distanceKm = calculateStraightLineDistance(userLocation, destCoords);
    }
    
    if (distanceKm > maxDistanceKm) return { ...dest, score: -1, distanceKm, matchReasons };

    const distanceScore = Math.max(0, 20 - (distanceKm / maxDistanceKm) * 20);
    score += distanceScore;
    if (distanceKm < 50) matchReasons.push('Very Close to You');

    // --- 2. ENVIRONMENTAL (Weather, Season, Nature) ---
    if (dest.season === currentSeason || dest.season === 'All Year') {
      score += 15;
      matchReasons.push('Perfect Season');
    }
    if (weather && (dest.tags.some(t => weatherThemes.includes(t)) || weatherThemes.includes(dest.type))) {
      score += 15;
      matchReasons.push('Great Weather Match');
    }
    if (dest.natureScore && dest.natureScore > 8) score += 5; // Nature bonus

    // --- 3. SAFETY & INFRASTRUCTURE (Roads, Safety, Crowd) ---
    if (dest.safetyRating) {
        score += dest.safetyRating * 2; // Up to 10 points
        if (dest.safetyRating >= 4.5) matchReasons.push('Highly Safe');
    }
    if (dest.roadConditions === 'Excellent') score += 5;
    else if (dest.roadConditions === 'Poor') score -= 15; // Heavy penalty for bad roads
    
    if (dest.crowdLevel === 'Low') score += 5;
    else if (dest.crowdLevel === 'High') score -= 5;

    // --- 4. ACCESSIBILITY & DEMOGRAPHIC MATCH ---
    if (userContext.wheelchairRequired) {
        if (!dest.accessibility) return { ...dest, score: -1, distanceKm, matchReasons }; // Dealbreaker
        score += 20;
        matchReasons.push('Fully Accessible');
    }
    if (userContext.intent === 'Family' && dest.familyFriendly) {
        score += 15;
        matchReasons.push('Perfect for Families');
    }

    // --- 5. INTENT & INTEREST MATCH (Adventure, Religion, Photography) ---
    if (userContext.intent === 'Adventure' && dest.adventureLevel && dest.adventureLevel > 7) {
        score += 15;
        matchReasons.push('High Adventure');
    }
    if (userContext.intent === 'Religious' && dest.religiousImportance && dest.religiousImportance > 7) {
        score += 15;
        matchReasons.push('Spiritual Significance');
    }
    if (userContext.preferences.includes('Photography') && dest.photographyScore && dest.photographyScore > 8) {
        score += 10;
        matchReasons.push('Photographer\'s Paradise');
    }

    // --- 6. TIMING & EVENTS (Weekend, Festivals) ---
    if (userContext.isWeekend && dest.isWeekendGetaway) {
        score += 10;
        matchReasons.push('Ideal Weekend Escape');
    }
    if (dest.festivalSpecial && dest.festivalSpecial.length > 0) {
        score += 5; // Bonus for having special events
    }

    // --- 7. REPUTATION (Ratings, Popularity) ---
    score += (dest.userRating || 4.0) * 2; // Up to 10 points
    score += ((dest.popularityScore || 50) / 100) * 5; // Up to 5 points

    // Cap reasons to top 3 for UI clarity
    matchReasons = [...new Set(matchReasons)].slice(0, 3);

    return {
      ...dest,
      score: parseFloat(score.toFixed(1)),
      distanceKm: parseFloat(distanceKm.toFixed(1)),
      matchReasons
    };
  });

  const scoredDestinations = await Promise.all(scoredDestinationsPromises);

  return scoredDestinations
    .filter(dest => dest.score > 0)
    .sort((a, b) => b.score - a.score);
};
