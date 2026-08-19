
import { CarOption, TravelIntent, Location, IntentDiscoveryData } from './types';

export const INTENTS: { id: TravelIntent; label: string; icon: string; description: string; image: string }[] = [
  { id: 'family', label: 'Family Time', icon: '👨‍👩‍👧‍👦', description: 'Spacious & relaxed. We prioritize smooth driving.', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop' },
  { id: 'parents', label: 'For Parents', icon: '👴👵', description: 'Extra comfort, patient pilots, frequent rest stops.', image: 'https://images.unsplash.com/photo-1529528659223-286c0752538c?q=80&w=600&auto=format&fit=crop' },
  { id: 'religious', label: 'Pilgrimage', icon: '🙏', description: 'Peaceful journey, devotional playlist available.', image: 'https://images.unsplash.com/photo-1542397284385-6010376c5337?q=80&w=600&auto=format&fit=crop' },
  { id: 'leisure', label: 'Weekend Escape', icon: '🌲', description: 'Scenic routes, flexible stops for photography.', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop' },
];

export const POPULAR_LOCATIONS: Location[] = [
  // Spiritual
  { 
    id: 'pav', 
    name: 'Pavagadh', 
    description: 'Shakti Peeth & Heritage Park', 
    imageUrl: '/images/destinations/01Pavagadh.jpg', 
    season: 'Winter', 
    type: 'Spiritual', 
    bestMonths: ['Oct', 'Nov', 'Dec', 'Jan'],
    tags: ['Navratri Special', 'Ropeway'],
    familyFriendly: true,
    idealDuration: '1 Day',
    distanceFromBase: '50 km'
  },
  { 
    id: 'amb', 
    name: 'Ambaji', 
    description: 'Sacred Shrine of Goddess Amba', 
    imageUrl: '/images/destinations/02Ambaji.jpg', 
    season: 'Winter', 
    type: 'Spiritual',
    bestMonths: ['Sep', 'Oct', 'Nov'],
    tags: ['Temple Trust', 'Family Safe'],
    familyFriendly: true,
    idealDuration: '2 Days',
    distanceFromBase: '180 km'
  },
  { 
    id: 'dwa', 
    name: 'Dwarka', 
    description: 'Kingdom of Lord Krishna', 
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Dwarkadhish_Temple_Gujarat.jpg/640px-Dwarkadhish_Temple_Gujarat.jpg', 
    season: 'Winter', 
    type: 'Spiritual',
    bestMonths: ['Nov', 'Dec', 'Jan'],
    tags: ['Pilgrimage', 'Long Route'],
    familyFriendly: true,
    idealDuration: '3 Days',
    distanceFromBase: '450 km'
  },
  { 
    id: 'som', 
    name: 'Somnath', 
    description: 'First Jyotirlinga', 
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Somnath_Temple_2023.jpg/640px-Somnath_Temple_2023.jpg', 
    season: 'Winter', 
    type: 'Spiritual',
    bestMonths: ['Nov', 'Dec', 'Jan'],
    tags: ['Sea View', 'Spiritual'],
    familyFriendly: true,
    idealDuration: '3 Days',
    distanceFromBase: '420 km'
  },
  { 
    id: 'pal', 
    name: 'Palitana', 
    description: 'City of 900 Temples', 
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Palitana_Temples.jpg/640px-Palitana_Temples.jpg', 
    season: 'Winter', 
    type: 'Spiritual',
    bestMonths: ['Nov', 'Dec', 'Jan'],
    tags: ['Jain Tirth', 'Hike'],
    familyFriendly: false,
    idealDuration: '2 Days',
    distanceFromBase: '250 km'
  },
  { 
    id: 'shi', 
    name: 'Shirdi', 
    description: 'Home of Sai Baba', 
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Shirdi_Sai_Baba_Temple.jpg/640px-Shirdi_Sai_Baba_Temple.jpg', 
    season: 'All Year', 
    type: 'Spiritual',
    bestMonths: ['All Year'],
    tags: ['Maharashtra', 'Peace'],
    familyFriendly: true,
    idealDuration: '3 Days',
    distanceFromBase: '450 km'
  },
  
  // Leisure / Nature / Weekend
  { 
    id: 'sou', 
    name: 'Statue of Unity', 
    description: 'World\'s Tallest Statue', 
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Statue_of_Unity.jpg/640px-Statue_of_Unity.jpg', 
    season: 'Winter', 
    type: 'Heritage',
    bestMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
    tags: ['Must Visit', 'Light Show'],
    familyFriendly: true,
    idealDuration: '1 Day',
    distanceFromBase: '90 km'
  },
  { 
    id: 'sap', 
    name: 'Saputara', 
    description: 'Gujarat\'s Only Hill Station', 
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Saputara_Lake.jpg/640px-Saputara_Lake.jpg', 
    season: 'Summer', 
    type: 'Hill Station',
    bestMonths: ['Mar', 'Apr', 'May', 'Jun'],
    tags: ['Hill Station', 'Boating'],
    familyFriendly: true,
    idealDuration: '2 Days',
    distanceFromBase: '280 km'
  },
  { 
    id: 'gir', 
    name: 'Sasan Gir', 
    description: 'Home of Asiatic Lions', 
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Asiatic_Lion_in_Gir_Forest.jpg/640px-Asiatic_Lion_in_Gir_Forest.jpg', 
    season: 'Winter', 
    type: 'Nature',
    bestMonths: ['Dec', 'Jan', 'Feb'],
    tags: ['Safari', 'Wildlife'],
    familyFriendly: true,
    idealDuration: '3 Days',
    distanceFromBase: '380 km'
  },
  { 
    id: 'pol', 
    name: 'Polo Forest', 
    description: 'Ancient Ruins & Forest', 
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Polo_Forest_Vijayanagar.jpg/640px-Polo_Forest_Vijayanagar.jpg', 
    season: 'Monsoon', 
    type: 'Nature',
    bestMonths: ['Jul', 'Aug', 'Sep'],
    tags: ['Trekking', 'Ruins'],
    familyFriendly: true,
    idealDuration: '1 Day',
    distanceFromBase: '160 km'
  },
  { 
    id: 'diu', 
    name: 'Diu', 
    description: 'Coastal Fort & Beaches', 
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Diu_Fort_View.jpg/640px-Diu_Fort_View.jpg', 
    season: 'Winter', 
    type: 'Beach',
    bestMonths: ['Nov', 'Dec', 'Jan'],
    tags: ['Beach', 'Chill'],
    familyFriendly: true,
    idealDuration: '3 Days',
    distanceFromBase: '400 km'
  },
  { 
    id: 'uda', 
    name: 'Udaipur', 
    description: 'City of Lakes', 
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Udaipur_City_Palace.jpg/640px-Udaipur_City_Palace.jpg', 
    season: 'Winter', 
    type: 'Heritage',
    bestMonths: ['Nov', 'Dec', 'Jan'],
    tags: ['History', 'Lakes'],
    familyFriendly: true,
    idealDuration: '3 Days',
    distanceFromBase: '350 km'
  },
  { 
    id: 'mt', 
    name: 'Mount Abu', 
    description: 'Rajasthan\'s Hill Retreat', 
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Nakki_Lake_Mount_Abu.jpg/640px-Nakki_Lake_Mount_Abu.jpg', 
    season: 'Summer', 
    type: 'Hill Station',
    bestMonths: ['Apr', 'May', 'Jun'],
    tags: ['Cool Climate', 'Dilwara Temples'],
    familyFriendly: true,
    idealDuration: '2 Days',
    distanceFromBase: '220 km'
  },
  {
      id: 'wil',
      name: 'Wilson Hills',
      description: 'Hidden Hill Station',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Wilson_Hills_Valsad.jpg/640px-Wilson_Hills_Valsad.jpg',
      season: 'Monsoon',
      type: 'Hill Station',
      bestMonths: ['Jun', 'Jul', 'Aug'],
      tags: ['Nature', 'Offbeat'],
      familyFriendly: true,
      idealDuration: '1 Day',
      distanceFromBase: '180 km'
  }
];

export const INTENT_DISCOVERY_CONFIG: Record<string, IntentDiscoveryData> = {
  'religious': {
    id: 'religious',
    title: 'Sacred Journeys',
    subtitle: 'Find peace on divine paths',
    heroImage: 'https://images.unsplash.com/photo-1596307399898-75b9f7158864?q=80&w=1200&auto=format&fit=crop',
    featured: ['som', 'dwa', 'amb', 'pal', 'shi'],
    routes: [
      { from: 'Ahmedabad', to: 'Somnath', distance: '400 km', image: 'https://images.unsplash.com/photo-1626116801931-507c91a38e3e?q=80&w=400&auto=format&fit=crop' },
      { from: 'Vadodara', to: 'Dwarka', distance: '450 km', image: 'https://images.unsplash.com/photo-1620306132047-49527e02d847?q=80&w=400&auto=format&fit=crop' },
    ],
    shortTrips: ['pav', 'amb'],
    moreDestinations: ['pav', 'amb', 'som', 'dwa', 'pal', 'shi']
  },
  'leisure': {
    id: 'leisure',
    title: 'Weekend Escapes',
    subtitle: 'Recharge with nature & calm',
    heroImage: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200&auto=format&fit=crop',
    featured: ['sap', 'gir', 'uda', 'mt', 'diu'],
    routes: [
      { from: 'Vadodara', to: 'Saputara', distance: '280 km', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=400&auto=format&fit=crop' },
      { from: 'Ahmedabad', to: 'Udaipur', distance: '260 km', image: 'https://images.unsplash.com/photo-1590765908271-9c60e53a333a?q=80&w=400&auto=format&fit=crop' },
    ],
    shortTrips: ['sou', 'pol', 'zar'],
    moreDestinations: ['wil', 'pol', 'sou', 'zar', 'jam', 'sap', 'gir']
  },
  'family': {
      id: 'family',
      title: 'Family Vacations',
      subtitle: 'Memories for a lifetime',
      heroImage: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=1200&auto=format&fit=crop',
      featured: ['sou', 'uda', 'mt', 'diu', 'gir'],
      routes: [
          { from: 'Vadodara', to: 'Statue of Unity', distance: '90 km', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=400&auto=format&fit=crop' }
      ],
      shortTrips: ['sou', 'pav'],
      moreDestinations: ['sou', 'uda', 'gir', 'sap']
  },
  'parents': {
      id: 'parents',
      title: 'Relaxed Travel',
      subtitle: 'Comfort first journeys',
      heroImage: 'https://images.unsplash.com/photo-1464979681340-bdd28a61699e?q=80&w=1200&auto=format&fit=crop',
      featured: ['som', 'dwa', 'sou', 'amb'],
      routes: [],
      shortTrips: ['pav', 'sou'],
      moreDestinations: ['som', 'dwa', 'amb']
  }
};

export const TRAVEL_CATEGORIES = [
  { id: 'weekend', title: 'Weekend Trips', image: 'https://picsum.photos/100/100?random=10' },
  { id: 'festival', title: 'Festival Trips', image: 'https://picsum.photos/100/100?random=11' },
  { id: 'spiritual', title: 'Spiritual Trips', image: 'https://picsum.photos/100/100?random=12' },
  { id: 'seasonal', title: 'Seasonal Trips', image: 'https://picsum.photos/100/100?random=13' },
];

export const CAR_FLEET: CarOption[] = [
  {
    id: 'swift-dzire',
    name: 'Maruti Suzuki Swift Dzire',
    category: 'Standard',
    seats: 4,
    acAvailable: true,
    pricePerKm: 12,
    estimatedTotal: 0,
    vehicleType: 'Sedan',
    shortDescription: 'Comfortable and economical for small families.',
    features: ['Comfortable Seating', 'Good Boot Space', 'Smooth Ride'],
    imageUrl: '/src/assets/vehicles/swift-dzire/swift-dzire.jpg',
    images: { thumbnail: '/src/assets/vehicles/swift-dzire/swift-dzire.jpg' },
    driver: { id: 'd1', name: 'Ramesh Kumar', experienceYears: 10, rating: 4.8, totalTrips: 1200, languages: ['Hindi', 'Gujarati'], badges: ['Safe Driver'], bio: 'Experienced local driver.', imageUrl: 'https://picsum.photos/100/100?random=201', reviews: [] }
  },
  {
    id: 'ertiga',
    name: 'Maruti Suzuki Ertiga',
    category: 'Comfort',
    seats: 6,
    acAvailable: true,
    pricePerKm: 15,
    estimatedTotal: 0,
    vehicleType: 'MUV',
    shortDescription: 'Spacious 6-seater, perfect for medium-sized groups.',
    features: ['Roof AC Vents', 'Flexible Seating', 'Smooth Suspension'],
    imageUrl: '/src/assets/vehicles/ertiga/ertiga.jpg',
    images: { thumbnail: '/src/assets/vehicles/ertiga/ertiga.jpg' },
    driver: { id: 'd2', name: 'Suresh Patel', experienceYears: 12, rating: 4.9, totalTrips: 1500, languages: ['Hindi', 'English', 'Gujarati'], badges: ['Family Favorite'], bio: 'Specialist in family tours.', imageUrl: 'https://picsum.photos/100/100?random=202', reviews: [] }
  },
  {
    id: 'innova-old',
    name: 'Toyota Innova (Old)',
    category: 'Comfort',
    seats: 7,
    acAvailable: true,
    pricePerKm: 16,
    estimatedTotal: 0,
    vehicleType: 'SUV',
    shortDescription: 'The classic reliable workhorse for long journeys.',
    features: ['Robust Build', 'Ample Legroom', 'Reliable Performance'],
    imageUrl: '/src/assets/vehicles/innova-old/innova-old.jpg',
    images: { thumbnail: '/src/assets/vehicles/innova-old/innova-old.jpg' },
    driver: { id: 'd3', name: 'Kiran Bhai', experienceYears: 15, rating: 4.7, totalTrips: 2000, languages: ['Hindi', 'Gujarati'], badges: ['Highway Expert'], bio: 'Master of long highway routes.', imageUrl: 'https://picsum.photos/100/100?random=203', reviews: [] }
  },
  {
    id: 'innova-crysta',
    name: 'Toyota Innova Crysta',
    category: 'Premium',
    seats: 7,
    acAvailable: true,
    pricePerKm: 18,
    estimatedTotal: 0,
    vehicleType: 'Premium SUV',
    shortDescription: 'Premium comfort and luxury for a superior travel experience.',
    features: ['Captain Seats', 'Premium Interiors', 'Silent Cabin', 'Mood Lighting'],
    imageUrl: '/src/assets/vehicles/innova-crysta/innova-crysta.jpg',
    images: { thumbnail: '/src/assets/vehicles/innova-crysta/innova-crysta.jpg' },
    driver: { id: 'd4', name: 'Vikram Singh', experienceYears: 8, rating: 5.0, totalTrips: 800, languages: ['English', 'Hindi'], badges: ['Premium Pilot'], bio: 'Provides a luxury VIP experience.', imageUrl: 'https://picsum.photos/100/100?random=204', reviews: [] }
  },
  {
    id: 'innova-hycross',
    name: 'Toyota Innova Hycross',
    category: 'Luxury',
    seats: 7,
    acAvailable: true,
    pricePerKm: 22,
    estimatedTotal: 0,
    vehicleType: 'Luxury SUV',
    shortDescription: 'Next-generation luxury hybrid SUV for the ultimate ride.',
    features: ['Panoramic Sunroof', 'Ventilated Seats', 'Hybrid Silence', 'Advanced Safety'],
    imageUrl: '/src/assets/vehicles/innova-hycross/innova-hycross.jpg',
    images: { thumbnail: '/src/assets/vehicles/innova-hycross/innova-hycross.jpg' },
    driver: { id: 'd5', name: 'Amit Desai', experienceYears: 10, rating: 4.9, totalTrips: 1100, languages: ['English', 'Hindi', 'Gujarati'], badges: ['Luxury Certified'], bio: 'Chauffeur for luxury vehicles.', imageUrl: 'https://picsum.photos/100/100?random=205', reviews: [] }
  },
  {
    id: 'force-urbania',
    name: 'Force Urbania',
    category: 'Premium',
    seats: 12,
    acAvailable: true,
    pricePerKm: 28,
    estimatedTotal: 0,
    vehicleType: 'Premium Van',
    shortDescription: 'Ultra-spacious luxury van for large families or groups.',
    features: ['Stand-up Height', 'Individual AC Vents', 'Reclining Pushback Seats'],
    imageUrl: '/src/assets/vehicles/force-urbania/force-urbania.jpg',
    images: { thumbnail: '/src/assets/vehicles/force-urbania/force-urbania.jpg' },
    driver: { id: 'd6', name: 'Mohammad Ali', experienceYears: 18, rating: 4.9, totalTrips: 2500, languages: ['Hindi'], badges: ['Van Specialist'], bio: 'Expert in handling large groups smoothly.', imageUrl: 'https://picsum.photos/100/100?random=206', reviews: [] }
  },
  {
    id: 'mini-bus-standard',
    name: 'Mini Bus (Standard)',
    category: 'Group',
    seats: 20,
    acAvailable: false,
    pricePerKm: 35,
    estimatedTotal: 0,
    vehicleType: 'Mini Bus',
    shortDescription: 'Economical option for large group travel and events.',
    features: ['High Seating Capacity', 'Curtains', 'Luggage Space'],
    imageUrl: '/src/assets/vehicles/mini-bus-standard/mini-bus-standard.jpg',
    images: { thumbnail: '/src/assets/vehicles/mini-bus-standard/mini-bus-standard.jpg' },
    driver: { id: 'd7', name: 'Rajesh Bhai', experienceYears: 22, rating: 4.5, totalTrips: 3000, languages: ['Gujarati', 'Hindi'], badges: ['Heavy Vehicle Licensed'], bio: 'Safe and steady driver for long trips.', imageUrl: 'https://picsum.photos/100/100?random=207', reviews: [] }
  },
  {
    id: 'mini-bus-premium',
    name: 'Mini Bus (Premium)',
    category: 'Luxury',
    seats: 17,
    acAvailable: true,
    pricePerKm: 45,
    estimatedTotal: 0,
    vehicleType: 'Luxury Mini Bus',
    shortDescription: 'Premium group travel with air conditioning and pushback seats.',
    features: ['Air Conditioning', 'Pushback Seats', 'Music System', 'LED TV'],
    imageUrl: '/src/assets/vehicles/mini-bus-premium/mini-bus-premium.jpg',
    images: { thumbnail: '/src/assets/vehicles/mini-bus-premium/mini-bus-premium.jpg' },
    driver: { id: 'd8', name: 'Joseph D\'Souza', experienceYears: 20, rating: 5.0, totalTrips: 1890, languages: ['English', 'Hindi'], badges: ['Tour Manager'], bio: 'Ensures everyone is entertained and comfortable.', imageUrl: 'https://picsum.photos/100/100?random=208', reviews: [] }
  }
];

// --- Travel Discovery Data (Legacy Structure kept for compatibility) ---
export interface ExploreSection {
  title: string;
  subtitle: string;
  items: ExploreItem[];
}

export interface ExploreItem {
  id: string;
  name: string;
  duration: string;
  type: string;
  imageUrl: string;
  intent: TravelIntent;
}

export const EXPLORE_DATA: ExploreSection[] = [
  {
    title: "Weekend Getaways",
    subtitle: "Recharge with a short drive",
    items: [
      { id: 'sap', name: 'Saputara', duration: '2 Days', type: 'Hill Station', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Saputara_Lake.jpg/640px-Saputara_Lake.jpg', intent: 'leisure' },
      { id: 'sou', name: 'Statue of Unity', duration: '1 Day', type: 'Monument', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Statue_of_Unity.jpg/640px-Statue_of_Unity.jpg', intent: 'leisure' },
      { id: 'uda', name: 'Udaipur', duration: '3 Days', type: 'Heritage', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Udaipur_City_Palace.jpg/640px-Udaipur_City_Palace.jpg', intent: 'leisure' },
    ]
  },
  {
    title: "Spiritual Paths",
    subtitle: "Find peace on these sacred routes",
    items: [
      { id: 'som', name: 'Somnath', duration: '2 Days', type: 'Jyotirlinga', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Somnath_Temple_2023.jpg/640px-Somnath_Temple_2023.jpg', intent: 'religious' },
      { id: 'amb', name: 'Ambaji', duration: '1 Day', type: 'Shakti Peeth', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Ambaji_Temple.jpg/640px-Ambaji_Temple.jpg', intent: 'religious' },
      { id: 'dwa', name: 'Dwarka', duration: '3 Days', type: 'Pilgrimage', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Dwarkadhish_Temple_Gujarat.jpg/640px-Dwarkadhish_Temple_Gujarat.jpg', intent: 'religious' },
    ]
  },
  {
    title: "Nature & Wildlife",
    subtitle: "Explore the wild side of Gujarat",
    items: [
      { id: 'gir', name: 'Sasan Gir', duration: '2 Days', type: 'Wildlife', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Asiatic_Lion_in_Gir_Forest.jpg/640px-Asiatic_Lion_in_Gir_Forest.jpg', intent: 'leisure' },
      { id: 'zar', name: 'Zarwani Waterfalls', duration: '1 Day', type: 'Eco Tourism', imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/96/6c/40/zarwani-waterfall.jpg?w=1200&h=-1&s=1', intent: 'leisure' },
    ]
  }
];
