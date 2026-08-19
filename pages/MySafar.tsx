import React from 'react';
import { Button } from '../components/Button';
import { JourneyData } from '../types';
import { CAR_FLEET } from '../constants';
import { Phone, MessageSquare, Download, Share2, Compass, Home } from 'lucide-react';

interface MySafarProps {
  data: JourneyData;
  onHome: () => void;
}

export const MySafar: React.FC<MySafarProps> = ({ data, onHome }) => {
  const car = CAR_FLEET.find(c => c.id === data.selectedCarId);

  if (!car) return null;

  return (
    <div className="fade-in max-w-2xl mx-auto pb-12">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Compass size={32} />
        </div>
        <h2 className="font-serif text-3xl text-safar-900">Safar Confirmed</h2>
        <p className="text-safar-600">Your journey is set. Pack your bags!</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-safar-100 relative">
        {/* Top Ticket Part */}
        <div className="p-8 bg-safar-800 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-40 h-40 bg-safar-700 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"></div>
             
             <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <span className="text-safar-300 text-xs uppercase tracking-widest font-bold">Booking ID</span>
                    <p className="font-mono text-xl">SFR-{Math.floor(1000 + Math.random() * 9000)}</p>
                </div>
                <div className="text-right">
                    <span className="text-safar-300 text-xs uppercase tracking-widest font-bold">Date</span>
                    <p className="font-medium text-lg">{data.date}</p>
                </div>
             </div>

             <div className="flex items-center gap-4 mb-2">
                 <div className="text-2xl font-serif font-bold">{data.origin}</div>
                 <div className="flex-1 h-0.5 bg-safar-600 relative">
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-safar-300 rounded-full"></div>
                 </div>
                 <div className="text-2xl font-serif font-bold text-right">{data.destination}</div>
             </div>
        </div>

        {/* Ticket Perforation */}
        <div className="relative h-6 bg-safar-50">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-safar-800"></div>
            <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-2">
                <div className="w-6 h-6 bg-safar-50 rounded-full -ml-5"></div>
                <div className="w-full border-b-2 border-dashed border-safar-300 mx-2"></div>
                <div className="w-6 h-6 bg-safar-50 rounded-full -mr-5"></div>
            </div>
        </div>

        {/* Bottom Details Part */}
        <div className="p-8 space-y-8">
            
            {/* Pilot Card */}
            <div className="flex items-center gap-5 p-4 bg-safar-50 rounded-2xl border border-safar-100">
                <img src={car.driver.imageUrl} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md" />
                <div className="flex-1">
                    <p className="text-xs text-safar-500 uppercase tracking-wide font-bold">Your Pilot</p>
                    <p className="text-lg font-bold text-safar-900">{car.driver.name}</p>
                    <p className="text-sm text-safar-600">{car.name} ({car.category})</p>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 bg-white text-safar-700 rounded-full shadow-sm border border-safar-100 hover:bg-safar-100"><Phone size={18}/></button>
                    <button className="p-2 bg-white text-safar-700 rounded-full shadow-sm border border-safar-100 hover:bg-safar-100"><MessageSquare size={18}/></button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                 <Button variant="outline" className="text-sm py-2">
                    <Download size={16} /> Invoice
                 </Button>
                 <Button variant="outline" className="text-sm py-2">
                    <Share2 size={16} /> Share Trip
                 </Button>
            </div>

            <div className="text-center">
                 <Button variant="ghost" onClick={onHome} className="text-safar-500 hover:text-safar-900">
                    <Home size={16} /> Return Home
                 </Button>
            </div>
        </div>
      </div>
    </div>
  );
};
