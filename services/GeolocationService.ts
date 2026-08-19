export interface Coordinates {
  lat: number;
  lng: number;
}

export const getCurrentLocation = (): Promise<Coordinates> => {
  // Default Fallback (Ahmedabad, Gujarat)
  const DEFAULT_LOCATION: Coordinates = {
    lat: 23.0225,
    lng: 72.5714
  };

  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.warn('Geolocation not supported, using fallback location.');
      resolve(DEFAULT_LOCATION);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.warn(`Geolocation failed (${error.message}), using fallback location.`);
        resolve(DEFAULT_LOCATION);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
};
