import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Coordinates } from '../services/GeolocationService';
import { ScoredLocation } from '../services/RecommendationEngine';

// Fix for default Leaflet marker icons in Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icon for User Location
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface InteractiveMapProps {
  userLocation: Coordinates;
  destinations: ScoredLocation[];
  onMarkerClick: (dest: ScoredLocation) => void;
}

// Component to dynamically adjust map bounds to fit markers
const MapBoundsEnforcer: React.FC<{ userLocation: Coordinates; destinations: ScoredLocation[] }> = ({ userLocation, destinations }) => {
  const map = useMap();

  useEffect(() => {
    if (!userLocation) return;
    
    const bounds = L.latLngBounds([userLocation.lat, userLocation.lng], [userLocation.lat, userLocation.lng]);
    
    // Fit top 5 nearest/best destinations in bounds
    destinations.slice(0, 5).forEach(dest => {
      bounds.extend([dest.lat, dest.lng]);
    });

    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
  }, [map, userLocation, destinations]);

  return null;
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ userLocation, destinations, onMarkerClick }) => {
  return (
    <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-sm border border-safar-100 z-0 relative">
      <MapContainer 
        center={[userLocation.lat, userLocation.lng]} 
        zoom={8} 
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* User Location */}
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>
            <div className="font-bold text-safar-900">Your Location</div>
          </Popup>
        </Marker>

        {/* Destination Markers */}
        {destinations.map(dest => (
          <Marker 
            key={dest.id} 
            position={[dest.lat, dest.lng]}
            eventHandlers={{
              click: () => onMarkerClick(dest),
            }}
          >
            <Popup>
              <div className="text-center w-32">
                <img src={dest.images[0]} className="w-full h-16 object-cover rounded-lg mb-2" alt={dest.name} />
                <h4 className="font-bold text-safar-900 text-sm">{dest.name}</h4>
                <p className="text-xs text-safar-600">{dest.distanceKm} km away</p>
                <div className="mt-2 text-xs bg-safar-100 text-safar-800 rounded-full px-2 py-1 font-bold inline-block">
                  ★ {dest.userRating}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        
        <MapBoundsEnforcer userLocation={userLocation} destinations={destinations} />
      </MapContainer>
    </div>
  );
};
