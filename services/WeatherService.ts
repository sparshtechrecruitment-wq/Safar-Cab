import { Coordinates } from './GeolocationService';

export interface WeatherData {
  temperature: number;
  condition: string; // e.g., 'Rain', 'Sunny', 'Cloudy'
  humidity: number;
  windSpeed: number;
  isRaining: boolean;
  localTime: string;
}

// Simple in-memory cache
let weatherCache: { data: WeatherData; timestamp: number; lat: number; lng: number } | null = null;
const CACHE_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export const fetchWeather = async (coords: Coordinates): Promise<WeatherData | null> => {
  const API_KEY = (import.meta as any).env.VITE_WEATHER_API_KEY;
  if (!API_KEY) {
    console.warn('WeatherAPI key is missing.');
    return null;
  }

  // Check Cache
  if (
    weatherCache &&
    Math.abs(weatherCache.lat - coords.lat) < 0.05 &&
    Math.abs(weatherCache.lng - coords.lng) < 0.05 &&
    Date.now() - weatherCache.timestamp < CACHE_DURATION_MS
  ) {
    return weatherCache.data;
  }

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${coords.lat},${coords.lng}&aqi=no`
    );

    if (!response.ok) {
      throw new Error(`WeatherAPI error: ${response.statusText}`);
    }

    const data = await response.json();

    const weatherData: WeatherData = {
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph,
      isRaining: data.current.precip_mm > 0 || data.current.condition.text.toLowerCase().includes('rain'),
      localTime: data.location.localtime,
    };

    // Store in cache
    weatherCache = {
      data: weatherData,
      timestamp: Date.now(),
      lat: coords.lat,
      lng: coords.lng,
    };

    return weatherData;
  } catch (error) {
    console.error('Failed to fetch weather:', error);
    return null; // Graceful fallback
  }
};
