import { useState, useEffect, useMemo } from 'react';
import { Coordinates, getCurrentLocation } from '../services/GeolocationService';
import { WeatherData, fetchWeather } from '../services/WeatherService';
import { getCurrentSeason } from '../services/TimeContextService';
import { calculateRecommendations, ScoredLocation } from '../services/RecommendationEngine';
import { SMART_DESTINATIONS } from '../data/destinations';

interface UseSmartRecommendationsResult {
  locations: ScoredLocation[];
  userLocation: Coordinates | null;
  weather: WeatherData | null;
  season: string;
  loading: boolean;
  error: string | null;
  maxDistance: number;
  setMaxDistance: (distance: number) => void;
  userPreferences: string[];
  togglePreference: (pref: string) => void;
  refresh: () => void;
}

export const useSmartRecommendations = (): UseSmartRecommendationsResult => {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [maxDistance, setMaxDistance] = useState<number>(300);
  const [userPreferences, setUserPreferences] = useState<string[]>([]);
  const [scoredLocations, setScoredLocations] = useState<ScoredLocation[]>([]);
  const season = getCurrentSeason();

  const fetchContext = async () => {
    setLoading(true);
    setError(null);
    try {
      const coords = await getCurrentLocation();
      setUserLocation(coords);
      const weatherData = await fetchWeather(coords);
      setWeather(weatherData);
    } catch (err: any) {
      setError(err.message || 'Failed to detect location for smart recommendations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContext();
  }, []);

  const togglePreference = (pref: string) => {
    setUserPreferences(prev => 
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  useEffect(() => {
    let isMounted = true;
    
    const fetchRecommendations = async () => {
      if (!userLocation) return;
      
      setLoading(true);
      const today = new Date();
      const isWeekend = today.getDay() === 0 || today.getDay() === 6;
      
      const userContext = {
        preferences: userPreferences,
        wheelchairRequired: false, 
        isWeekend: isWeekend,
        intent: 'Leisure' 
      };

      try {
        const results = await calculateRecommendations(
          SMART_DESTINATIONS,
          userLocation,
          season,
          weather,
          userContext,
          maxDistance
        );
        if (isMounted) setScoredLocations(results);
      } catch (err) {
        console.error("Error calculating recommendations", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchRecommendations();

    return () => { isMounted = false; };
  }, [userLocation, weather, season, maxDistance, userPreferences]);

  return {
    locations: scoredLocations,
    userLocation,
    weather,
    season,
    loading,
    error,
    maxDistance,
    setMaxDistance,
    userPreferences,
    togglePreference,
    refresh: fetchContext
  };
};
