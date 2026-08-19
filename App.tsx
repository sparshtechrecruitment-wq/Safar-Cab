import React, { useState, useEffect } from 'react';
import { Welcome } from './pages/Welcome';
import { Login } from './pages/Login';
import { HomeDashboard } from './pages/HomeDashboard';
import { UserProfile } from './pages/UserProfile';
import { IntentSelection } from './pages/IntentSelection';
import { RoutePlanning } from './pages/RoutePlanning';
import { CarSelection } from './pages/CarSelection';
import { Summary } from './pages/Summary';
import { Payment } from './pages/Payment';
import { MySafar } from './pages/MySafar';
import { MyTrips } from './pages/MyTrips';
import { SmartDiscovery } from './pages/SmartDiscovery';
import { DestinationDetails } from './pages/DestinationDetails';
import { CategoryView } from './pages/CategoryView';
import { StepIndicator } from './components/StepIndicator';
import { BottomNav } from './components/BottomNav';
import { SidebarNav } from './components/SidebarNav';
import { SplashAnimation } from './components/SplashAnimation';
import { JourneyData, TravelIntent, AppView, MainTab, Booking, CarOption } from './types';
import { CAR_FLEET } from './constants';
import { ArrowLeft } from 'lucide-react';

// Mock Initial Data
const INITIAL_BOOKINGS: Booking[] = [
    {
        id: 'SFR-8821',
        origin: 'Vadodara',
        destination: 'Pavagadh',
        date: '2023-10-15',
        carId: 'sedan-prime',
        carName: 'Safar Family Taxi',
        pilotName: 'Ramesh Kumar',
        totalAmount: 3400,
        status: 'completed',
        rating: 5
    },
    {
        id: 'SFR-9102',
        origin: 'Vadodara',
        destination: 'Statue of Unity',
        date: '2023-12-20',
        carId: 'suv-family',
        carName: '7-Seater SUV',
        pilotName: 'Vikram Singh',
        totalAmount: 5200,
        status: 'completed'
    }
];

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [view, setView] = useState<AppView>('login');
  const [activeTab, setActiveTab] = useState<MainTab>('home');
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [fleet, setFleet] = useState<CarOption[]>(CAR_FLEET);
  
  // Booking State
  const [bookingStep, setBookingStep] = useState(0);
  const [journeyData, setJourneyData] = useState<JourneyData>({
    step: 0,
    intent: null,
    origin: 'Vadodara',
    destination: '',
    date: '',
    selectedCarId: null,
    passengers: 2,
    notes: '',
    paymentStatus: 'pending'
  });

  // --- Logic Handlers ---

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => 
        prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleRateTrip = (bookingId: string, rating: number, feedback: string) => {
    // 1. Update Booking Status
    setBookings(prev => prev.map(b => 
        b.id === bookingId ? { ...b, rating, feedback } : b
    ));

    // 2. Update Driver Profile (Aggregate Rating & Add Review)
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
        setFleet(prevFleet => prevFleet.map(car => {
            if (car.id === booking.carId) {
                const newReview = {
                    id: `rev-${Date.now()}`,
                    userId: 'u-current',
                    userName: 'Rahul Sharma',
                    rating,
                    comment: feedback,
                    date: new Date().toISOString().split('T')[0]
                };
                
                const updatedReviews = [newReview, ...car.driver.reviews];
                // Calculate new weighted average (simple average for now)
                const newTotalTrips = car.driver.totalTrips + 1;
                const newRating = ((car.driver.rating * car.driver.totalTrips) + rating) / newTotalTrips;

                return {
                    ...car,
                    driver: {
                        ...car.driver,
                        rating: parseFloat(newRating.toFixed(1)),
                        totalTrips: newTotalTrips,
                        reviews: updatedReviews
                    }
                };
            }
            return car;
        }));
    }
  };

  // --- Navigation Handlers ---

  const handleLoginSuccess = () => {
    setView('main');
  };

  const handleLogout = () => {
    setView('login');
  };

  const handleViewDestination = (id: string) => {
    setSelectedDestinationId(id);
    setView('destination');
  };

  const handleViewCategory = (category: string) => {
    setSelectedCategory(category);
    setView('category');
  };

  const handleBackToMain = () => {
    setView('main');
    setSelectedDestinationId(null);
    setSelectedCategory(null);
  };

  const startBooking = (options?: { destination?: string; intent?: TravelIntent }) => {
    setJourneyData(prev => ({ 
        ...prev, 
        destination: options?.destination || '',
        intent: options?.intent || null
    }));
    setView('booking');
    // If intent is already provided (e.g. Airport), skip to Route Planning (step 2)
    setBookingStep(options?.intent ? 2 : 1); 
  };

  const exitBooking = () => {
    setView('main');
    setBookingStep(0);
    // Reset Data but keep origin
    setJourneyData({
        step: 0,
        intent: null,
        origin: 'Vadodara',
        destination: '',
        date: '',
        selectedCarId: null,
        passengers: 2,
        notes: '',
        paymentStatus: 'pending'
    });
  };

  // --- Booking Flow Handlers ---

  const handleIntentSelect = (intent: TravelIntent, destination?: string) => {
    setJourneyData({ ...journeyData, intent, destination: destination || journeyData.destination });
    setBookingStep(2);
  };

  const handleRouteSubmit = (routeData: { origin: string; destination: string; date: string; passengers: number }) => {
    setJourneyData({ ...journeyData, ...routeData });
    setBookingStep(3);
  };

  const handleCarSelect = (carId: string) => {
    setJourneyData({ ...journeyData, selectedCarId: carId });
    setBookingStep(4);
  };

  const handleProceedToPayment = () => {
    setBookingStep(5);
  };

  const handlePaymentSuccess = () => {
    const selectedCar = fleet.find(c => c.id === journeyData.selectedCarId);
    if (selectedCar) {
        const newBooking: Booking = {
            id: `SFR-${Math.floor(1000 + Math.random() * 9000)}`,
            origin: journeyData.origin,
            destination: journeyData.destination,
            date: journeyData.date,
            carId: selectedCar.id,
            carName: selectedCar.name,
            pilotName: selectedCar.driver.name,
            totalAmount: selectedCar.estimatedTotal,
            status: 'upcoming'
        };
        setBookings([newBooking, ...bookings]);
    }
    
    setJourneyData({ ...journeyData, paymentStatus: 'paid' });
    setBookingStep(6);
  };

  const handleBookingBack = () => {
    if (bookingStep > 1) {
        setBookingStep(bookingStep - 1);
    } else {
        exitBooking();
    }
  };

  // --- Render Logic ---

  const renderView = () => {
    if (view === 'login') {
      return <Login onLogin={handleLoginSuccess} />;
    }

    if (view === 'booking') {
      return (
          <div className="min-h-screen flex flex-col bg-safar-50 font-sans text-safar-900 pb-20">
            <header className="px-6 py-4 flex items-center gap-4 border-b border-safar-100 bg-white/50 backdrop-blur-md sticky top-0 z-30">
                <button onClick={handleBookingBack} className="p-2 -ml-2 hover:bg-safar-100 rounded-full transition-colors">
                    <ArrowLeft size={24} className="text-safar-800" />
                </button>
                <div className="flex-1">
                    <h2 className="font-serif font-bold text-lg text-safar-900">Plan Trip</h2>
                    <div className="h-1 bg-safar-200 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-safar-600 transition-all duration-500" style={{ width: `${(bookingStep / 6) * 100}%` }} />
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col px-0 pb-12 pt-0 max-w-4xl mx-auto w-full">
                {bookingStep === 1 && <IntentSelection onSelect={handleIntentSelect} onBack={handleBookingBack} />}
                <div className="px-6 max-w-3xl mx-auto w-full pt-6">
                    {bookingStep === 2 && <RoutePlanning onSubmit={handleRouteSubmit} onBack={handleBookingBack} defaultData={journeyData} />}
                    {bookingStep === 3 && <CarSelection cars={fleet} onSelect={handleCarSelect} onBack={handleBookingBack} selectedCarId={journeyData.selectedCarId} />}
                    {bookingStep === 4 && <Summary data={journeyData} onProceed={handleProceedToPayment} onBack={handleBookingBack} />}
                    {bookingStep === 5 && <Payment amount={500} onSuccess={handlePaymentSuccess} onBack={handleBookingBack} />}
                    {bookingStep === 6 && <MySafar data={journeyData} onHome={exitBooking} />}
                </div>
            </main>
        </div>
      );
    }

    if (view === 'destination' && selectedDestinationId) {
        return (
            <DestinationDetails 
                destinationId={selectedDestinationId} 
                onBack={handleBackToMain} 
                onPlanTrip={(options) => startBooking(options)} 
            />
        );
    }

    if (view === 'category' && selectedCategory) {
        return (
            <CategoryView 
                category={selectedCategory} 
                onBack={handleBackToMain} 
                onViewDestination={handleViewDestination} 
            />
        );
    }

    // Main Tab View
    return (
      <div className="min-h-screen bg-safar-50 font-sans text-safar-900 md:flex">
        <SidebarNav currentTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 pb-20 md:pb-0 overflow-x-hidden relative">
          <div className="max-w-7xl mx-auto w-full">
            {activeTab === 'home' && (
              <HomeDashboard 
                  onPlanTrip={startBooking} 
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  onViewDestination={handleViewDestination}
                  onViewCategory={handleViewCategory}
              />
            )}
            {activeTab === 'travel' && (
                <SmartDiscovery />
            )}
            {activeTab === 'trips' && (
                <MyTrips 
                  bookings={bookings} 
                  onRateTrip={handleRateTrip}
                  onPlanNew={() => setActiveTab('home')}
                />
            )}
            {activeTab === 'notifications' && (
                <div className="pt-20 px-6 text-center text-safar-500">
                    <h2 className="font-serif text-2xl text-safar-900 mb-2">Notifications</h2>
                    <p>No new alerts.</p>
                </div>
            )}
            {activeTab === 'profile' && <UserProfile onLogout={handleLogout} bookings={bookings} />}
          </div>
          <BottomNav currentTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-safar-50">
      {showSplash && <SplashAnimation onComplete={() => setShowSplash(false)} />}
      {renderView()}
    </div>
  );
};

export default App;
