import { Coordinates } from './GeolocationService';

export interface RouteInfo {
  distanceKm: number;
  durationMinutes: number;
}

// Haversine formula as a fast fallback for direct distance scoring
export const calculateStraightLineDistance = (coord1: Coordinates, coord2: Coordinates): number => {
  const R = 6371; // Earth's radius in km
  const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const dLng = ((coord2.lng - coord1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coord1.lat * Math.PI) / 180) *
      Math.cos((coord2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// OSRM Routing API for accurate driving distance & ETA
export const getDrivingRoute = async (origin: Coordinates, destination: Coordinates): Promise<RouteInfo | null> => {
  try {
    // OSRM expects coordinates in lng,lat format
    const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=false`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`OSRM error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.code !== 'Ok' || !data.routes || data.routes.length === 0) {
      throw new Error('No route found');
    }

    const route = data.routes[0];
    return {
      distanceKm: parseFloat((route.distance / 1000).toFixed(1)),
      durationMinutes: Math.ceil(route.duration / 60), // Convert seconds to minutes
    };
  } catch (error) {
    console.error('Failed to calculate route via OSRM:', error);
    return null;
  }
};
