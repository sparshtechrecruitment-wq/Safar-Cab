
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { POPULAR_LOCATIONS } from '../constants';
import { MapPin, Calendar as CalendarIcon, Users, Heart, Lock, ChevronLeft, ChevronRight, ChevronDown, ArrowLeftRight, ArrowRight } from 'lucide-react';

interface RoutePlanningProps {
  onSubmit: (data: { origin: string; destination: string; date: string; passengers: number; tripType: 'one-way' | 'round-trip' }) => void;
  onBack: () => void;
  defaultData: { origin: string; destination: string; date: string; passengers: number; tripType?: 'one-way' | 'round-trip' };
}

export const RoutePlanning: React.FC<RoutePlanningProps> = ({ onSubmit, onBack, defaultData }) => {
  const [origin] = useState('Vadodara');
  const [destination, setDestination] = useState(defaultData.destination || '');
  const [date, setDate] = useState(defaultData.date || '');
  const [passengers, setPassengers] = useState(defaultData.passengers || 2);
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>(defaultData.tripType || 'one-way');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // --- Inline Calendar Logic ---
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const offset = selectedDate.getTimezoneOffset();
    const correctedDate = new Date(selectedDate.getTime() - (offset*60*1000));
    
    setDate(correctedDate.toISOString().split('T')[0]);
    setIsCalendarOpen(false); // Auto-close on select
  };

  const renderCalendarInline = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Empty slots
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days
    for (let i = 1; i <= daysInMonth; i++) {
        const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
        const dateString = d.toISOString().split('T')[0];
        const isSelected = date === dateString;
        const isToday = new Date().toISOString().split('T')[0] === dateString;
        const isPast = d < new Date(new Date().setHours(0,0,0,0));

        days.push(
            <button
                key={i}
                onClick={(e) => { e.preventDefault(); !isPast && handleDateSelect(i); }}
                disabled={isPast}
                className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200
                    ${isSelected 
                        ? 'bg-safar-600 text-white shadow-glow' 
                        : isPast 
                            ? 'text-gray-300 cursor-not-allowed font-normal' 
                            : 'text-safar-800 hover:bg-safar-100 hover:text-safar-900'
                    }
                    ${isToday && !isSelected ? 'border border-safar-400 text-safar-600' : ''}
                `}
            >
                {i}
            </button>
        );
    }

    return (
        <div className="bg-white rounded-b-2xl border-x border-b border-safar-100 p-4 shadow-sm animate-slide-down relative z-20 -mt-2">
            <div className="flex justify-between items-center mb-4 px-2">
                <button onClick={(e) => { e.preventDefault(); setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)); }} className="p-1 hover:bg-safar-50 rounded-full text-safar-500">
                    <ChevronLeft size={20} />
                </button>
                <div className="font-serif text-base font-bold text-safar-900">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </div>
                <button onClick={(e) => { e.preventDefault(); setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)); }} className="p-1 hover:bg-safar-50 rounded-full text-safar-500">
                    <ChevronRight size={20} />
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {['S','M','T','W','T','F','S'].map(d => (
                    <div key={d} className="text-[10px] font-bold text-safar-400 uppercase tracking-wider">{d}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1 justify-items-center">
                {days}
            </div>
        </div>
    );
  };
  // --- End Calendar Logic ---

  const canProceed = destination && date && passengers > 0;

  return (
    <div className="fade-in max-w-lg mx-auto pb-6">
      <div className="text-center mb-8">
        <h2 className="font-serif text-4xl text-safar-900 leading-tight">Plan Your<br/><span className="text-safar-600">Perfect Trip</span></h2>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] shadow-soft border border-safar-100 space-y-7 relative overflow-visible">
        
        {/* Trip Type Toggle */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-safar-500 pl-1">Trip Type</label>
          <div className="flex bg-safar-50 p-1.5 rounded-2xl border border-safar-100 gap-1.5">
            <button
              onClick={() => setTripType('one-way')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                tripType === 'one-way'
                  ? 'bg-safar-800 text-white shadow-md'
                  : 'text-safar-500 hover:text-safar-700'
              }`}
            >
              <ArrowRight size={16} />
              One Way
            </button>
            <button
              onClick={() => setTripType('round-trip')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                tripType === 'round-trip'
                  ? 'bg-safar-800 text-white shadow-md'
                  : 'text-safar-500 hover:text-safar-700'
              }`}
            >
              <ArrowLeftRight size={16} />
              Round Trip
            </button>
          </div>
          {tripType === 'round-trip' && (
            <p className="text-xs text-safar-500 pl-1 flex items-center gap-1">
              <span className="text-green-600 font-bold">✓ Save up to 7.5%</span> vs booking two one-ways
            </p>
          )}
        </div>

        {/* Origin (Locked) */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-safar-500 flex items-center gap-2 pl-1">
            <MapPin size={14} /> Pickup City
          </label>
          <div className="relative group">
            <input 
                type="text" 
                value={origin} 
                disabled 
                className="w-full p-4 bg-safar-50/50 rounded-2xl border border-safar-200 text-safar-900 font-bold cursor-not-allowed pl-12 shadow-inner-light"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-safar-200 rounded-full flex items-center justify-center">
                 <Lock size={12} className="text-safar-700" />
            </div>
          </div>
        </div>

        {/* Destination */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-safar-500 flex items-center gap-2 pl-1">
            <MapPin size={14} className="text-safar-800" /> Destination
          </label>
          <div className="relative">
             <select 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full p-4 bg-white rounded-2xl border border-safar-200 focus:border-safar-500 focus:ring-4 focus:ring-safar-100 text-safar-900 font-bold appearance-none transition-all shadow-sm pl-4 pr-10"
              >
                <option value="" disabled>Select Destination</option>
                {POPULAR_LOCATIONS.map(loc => (
                  <option key={loc.id} value={loc.name}>{loc.name}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDown size={18} className="text-safar-400" />
              </div>
          </div>
        </div>

        <div className="space-y-2 relative">
             <label className="text-xs font-bold uppercase tracking-wider text-safar-500 flex items-center gap-2 pl-1">
               <CalendarIcon size={14} /> Travel Date
             </label>
             <button 
                 onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                 className={`w-full p-4 rounded-2xl border text-left transition-all shadow-sm flex items-center justify-between ${date ? 'bg-safar-50 border-safar-600 text-safar-900 font-bold' : 'bg-white border-safar-200 text-safar-400 font-medium'} ${isCalendarOpen ? 'rounded-b-none border-b-transparent ring-2 ring-safar-100' : ''}`}
             >
                 <span>{date ? new Date(date).toLocaleDateString('en-GB', {weekday: 'short', day: 'numeric', month: 'short'}) : 'Select Date'}</span>
                 <CalendarIcon size={18} className={date ? 'text-safar-600' : 'text-safar-300'} />
             </button>
             
             {isCalendarOpen && renderCalendarInline()}
        </div>

        {/* Passengers */}
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-safar-500 flex items-center gap-2 pl-1">
              <Users size={14} /> Travelers
            </label>
            <div className="flex items-center bg-white rounded-2xl border border-safar-200 p-1.5 shadow-sm">
              <button 
                onClick={() => setPassengers(Math.max(1, passengers - 1))}
                className="w-12 h-12 flex items-center justify-center hover:bg-safar-50 rounded-xl transition-colors text-safar-600 font-bold text-xl active:scale-90 transform"
              >-</button>
              <span className="flex-1 text-center font-bold text-xl text-safar-900">{passengers}</span>
              <button 
                onClick={() => setPassengers(Math.min(17, passengers + 1))}
                className="w-12 h-12 flex items-center justify-center hover:bg-safar-50 rounded-xl transition-colors text-safar-600 font-bold text-xl active:scale-90 transform"
              >+</button>
            </div>
        </div>

        <div className="pt-4">
             <Button 
                fullWidth 
                onClick={() => onSubmit({ origin, destination, date, passengers, tripType })}
                disabled={!canProceed}
                className="shadow-glow py-4 text-lg"
            >
                Find My Pilot
            </Button>
        </div>
      </div>

      <div className="mt-6 flex justify-between px-4">
        <Button variant="ghost" onClick={onBack}>Back</Button>
        <button className="text-sm text-safar-600 hover:text-safar-900 flex items-center gap-1 transition-colors font-bold">
            <Heart size={16} className="text-red-400 fill-red-50" /> Save Draft
        </button>
      </div>

    </div>
  );
};
