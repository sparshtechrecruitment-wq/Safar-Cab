
import React, { useState } from 'react';
import { 
  User, Shield, CreditCard, Bell, HelpCircle, LogOut, ChevronRight, 
  Phone, Mail, Calendar, Heart, Lock, AlertTriangle, FileText, 
  ChevronLeft, CheckCircle2, Info, MessageCircle, Smartphone, MapPin, 
  Download, Clock, ArrowRight, LifeBuoy, AlertCircle
} from 'lucide-react';
import { Button } from '../components/Button';
import { Booking } from '../types';

interface UserProfileProps {
  onLogout: () => void;
  bookings: Booking[];
}

type ProfileView = 
  | 'menu' 
  | 'details' 
  | 'journeys' 
  | 'journeyDetails'
  | 'payments' 
  | 'preferences' 
  | 'safety' 
  | 'help' 
  | 'helpTopic'
  | 'tickets'
  | 'about';

// --- Local Types for Mock Data ---
interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  status: 'Success' | 'Failed' | 'Refunded';
}

interface Ticket {
  id: string;
  issue: string;
  date: string;
  status: 'Open' | 'Closed' | 'Resolved';
}

export const UserProfile: React.FC<UserProfileProps> = ({ onLogout, bookings }) => {
  const [currentView, setCurrentView] = useState<ProfileView>('menu');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock Data
  const [user, setUser] = useState({
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    email: 'rahul.sharma@example.com',
    gender: 'Male',
    dob: '15 Aug 1990',
    emergencyContactName: 'Priya Sharma',
    emergencyContactRel: 'Spouse',
    emergencyContactPhone: '+91 98765 00000',
    memberSince: 'Oct 2023',
    isVerified: true
  });

  const [prefs, setPrefs] = useState({
    sms: true,
    whatsapp: true,
    push: true,
    invoiceEmail: true,
    promo: false,
    travelIntent: ['Family', 'Leisure'],
    language: 'English',
    wheelchairAccess: false
  });

  const transactions: Transaction[] = [
    { id: 'TXN-101', date: '20 Dec 2023', amount: 5200, description: 'Trip to Statue of Unity', status: 'Success' },
    { id: 'TXN-100', date: '15 Oct 2023', amount: 3400, description: 'Trip to Pavagadh', status: 'Success' },
  ];

  const tickets: Ticket[] = []; // Empty state demo

  // --- Components ---

  const Header = ({ title, onBack, rightAction }: { title: string, onBack: () => void, rightAction?: React.ReactNode }) => (
    <div className="bg-white px-6 py-4 flex items-center gap-4 border-b border-safar-100 sticky top-0 z-20 shadow-sm">
      <button onClick={onBack} className="p-2 -ml-2 hover:bg-safar-50 rounded-full text-safar-600 transition-colors">
        <ChevronLeft size={24} />
      </button>
      <h2 className="font-serif text-xl text-safar-900 font-bold flex-1">{title}</h2>
      {rightAction}
    </div>
  );

  const Toggle = ({ active, onToggle }: { active: boolean, onToggle: () => void }) => (
    <button 
      onClick={onToggle}
      className={`w-12 h-7 rounded-full transition-colors duration-300 relative ${active ? 'bg-safar-600' : 'bg-gray-200'}`}
    >
      <div className={`w-5 h-5 bg-white rounded-full shadow-md absolute top-1 transition-transform duration-300 ${active ? 'left-6' : 'left-1'}`} />
    </button>
  );

  const MenuItem = ({ icon: Icon, label, subLabel, onClick, isDanger = false, isHighlight = false }: any) => (
    <button 
      onClick={onClick}
      className={`w-full p-4 flex items-center gap-4 hover:bg-safar-50 transition-colors border-b border-safar-50 last:border-0 ${isHighlight ? 'bg-safar-50/50' : 'bg-white'}`}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDanger ? 'bg-red-50 text-red-600' : isHighlight ? 'bg-journey-500 text-white' : 'bg-safar-50 text-safar-600'}`}>
        <Icon size={20} />
      </div>
      <div className="flex-1 text-left">
        <h4 className={`font-bold text-sm ${isDanger ? 'text-red-600' : 'text-safar-900'}`}>{label}</h4>
        {subLabel && <p className="text-xs text-safar-400">{subLabel}</p>}
      </div>
      <ChevronRight size={16} className="text-safar-300" />
    </button>
  );

  // --- RENDER FUNCTIONS ---

  const renderDetails = () => (
    <div className="fade-in min-h-screen bg-safar-50">
      <Header 
        title="Profile Details" 
        onBack={() => { setCurrentView('menu'); setIsEditing(false); }} 
        rightAction={
          <button onClick={() => setIsEditing(!isEditing)} className="text-sm font-bold text-safar-600 uppercase">
            {isEditing ? 'Done' : 'Edit'}
          </button>
        }
      />
      <div className="p-6 space-y-8">
        {/* Personal Info */}
        <div className="space-y-4">
            <h3 className="text-xs font-bold text-safar-500 uppercase tracking-widest pl-1">Personal Information</h3>
            <div className="bg-white rounded-3xl border border-safar-100 overflow-hidden">
                <div className="p-4 border-b border-safar-50 flex items-center gap-4">
                    <User size={20} className="text-safar-400" />
                    <div className="flex-1">
                        <label className="text-[10px] text-safar-400 font-bold uppercase">Full Name</label>
                        {isEditing ? (
                            <input value={user.name} onChange={e => setUser({...user, name: e.target.value})} className="w-full font-medium text-safar-900 outline-none border-b border-safar-200 focus:border-safar-500" />
                        ) : (
                            <p className="font-medium text-safar-900">{user.name}</p>
                        )}
                    </div>
                </div>
                <div className="p-4 border-b border-safar-50 flex items-center gap-4 bg-gray-50/50">
                    <Phone size={20} className="text-safar-400" />
                    <div className="flex-1">
                        <label className="text-[10px] text-safar-400 font-bold uppercase flex items-center gap-1">Mobile Number <CheckCircle2 size={10} className="text-green-500"/></label>
                        <p className="font-medium text-safar-500">{user.phone}</p>
                    </div>
                    <Lock size={14} className="text-safar-300" />
                </div>
                <div className="p-4 border-b border-safar-50 flex items-center gap-4">
                    <Mail size={20} className="text-safar-400" />
                    <div className="flex-1">
                        <label className="text-[10px] text-safar-400 font-bold uppercase">Email Address</label>
                         {isEditing ? (
                            <input value={user.email} onChange={e => setUser({...user, email: e.target.value})} className="w-full font-medium text-safar-900 outline-none border-b border-safar-200 focus:border-safar-500" />
                        ) : (
                            <p className="font-medium text-safar-900">{user.email}</p>
                        )}
                    </div>
                </div>
                <div className="p-4 flex items-center gap-4">
                    <Calendar size={20} className="text-safar-400" />
                    <div className="flex-1">
                        <label className="text-[10px] text-safar-400 font-bold uppercase">Date of Birth</label>
                        {isEditing ? (
                            <input type="date" value={user.dob} onChange={e => setUser({...user, dob: e.target.value})} className="w-full font-medium text-safar-900 outline-none border-b border-safar-200 focus:border-safar-500 bg-transparent" />
                        ) : (
                             <p className="font-medium text-safar-900">{user.dob}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* KYC & Verification */}
        <div className="space-y-4">
            <h3 className="text-xs font-bold text-safar-500 uppercase tracking-widest pl-1">Identity & Verification (KYC)</h3>
            <div className="bg-white rounded-3xl border border-safar-100 overflow-hidden p-5 flex items-center gap-4">
                <div className="bg-green-50 text-green-600 p-3 rounded-full">
                    <Shield size={24} />
                </div>
                <div className="flex-1">
                    <p className="font-bold text-safar-900">Aadhar Verified</p>
                    <p className="text-xs text-safar-500">Required for outstation trips</p>
                </div>
                <CheckCircle2 size={20} className="text-green-500" />
            </div>
        </div>

        {/* Emergency Contact */}
        <div className="space-y-4">
             <h3 className="text-xs font-bold text-safar-500 uppercase tracking-widest pl-1">Safety & Emergency</h3>
             <div className="bg-white rounded-3xl border border-safar-100 overflow-hidden p-5">
                 <div className="flex items-start gap-4 mb-4">
                     <div className="bg-red-50 p-2 rounded-full text-red-500">
                         <Heart size={20} fill="currentColor" />
                     </div>
                     <div className="flex-1">
                         <p className="text-xs text-safar-400 font-bold uppercase">Emergency Contact</p>
                         <p className="font-bold text-safar-900 text-lg">{user.emergencyContactName}</p>
                         <p className="text-sm text-safar-500">{user.emergencyContactRel} • {user.emergencyContactPhone}</p>
                     </div>
                 </div>
                 {isEditing && (
                     <Button variant="outline" fullWidth className="text-xs h-9">Change Contact</Button>
                 )}
                 <div className="mt-4 bg-safar-50 p-3 rounded-xl flex items-start gap-2">
                     <Info size={16} className="text-safar-400 mt-0.5" />
                     <p className="text-xs text-safar-500 leading-relaxed">This contact will be automatically notified if you use the SOS feature during a journey.</p>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );

  const renderJourneys = () => {
    const [tab, setTab] = useState<'Upcoming' | 'Completed' | 'Cancelled'>('Upcoming');
    
    // Filter bookings based on active tab
    const filtered = bookings.filter(b => {
        if (tab === 'Upcoming') return b.status === 'upcoming';
        if (tab === 'Completed') return b.status === 'completed';
        return b.status === 'cancelled';
    });

    return (
      <div className="fade-in min-h-screen bg-safar-50">
        <Header title="My Journeys" onBack={() => setCurrentView('menu')} />
        <div className="sticky top-[60px] z-10 bg-safar-50 px-6 pt-4 pb-2">
             <div className="flex bg-white p-1 rounded-xl border border-safar-100 shadow-sm">
                {['Upcoming', 'Completed', 'Cancelled'].map(t => (
                    <button 
                        key={t} 
                        onClick={() => setTab(t as any)}
                        className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wide rounded-lg transition-all ${tab === t ? 'bg-safar-800 text-white shadow-md' : 'text-safar-400 hover:text-safar-600'}`}
                    >
                        {t}
                    </button>
                ))}
             </div>
        </div>
        
        <div className="p-6 space-y-4">
             {filtered.length > 0 ? (
                 filtered.map(b => (
                     <div key={b.id} className="bg-white p-5 rounded-3xl border border-safar-100 shadow-sm hover:shadow-md transition-all">
                         <div className="flex justify-between items-start mb-4">
                             <div>
                                 <h4 className="font-bold text-lg text-safar-900">{b.destination}</h4>
                                 <p className="text-xs text-safar-500 flex items-center gap-1 mt-1"><Calendar size={12}/> {b.date}</p>
                             </div>
                             <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide ${b.status === 'upcoming' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                 {b.status}
                             </span>
                         </div>
                         <div className="flex justify-between items-center border-t border-safar-50 pt-3">
                             <p className="font-bold text-safar-900">₹{b.totalAmount}</p>
                             <button 
                                onClick={() => { setSelectedBooking(b); setCurrentView('journeyDetails'); }}
                                className="text-xs font-bold text-safar-600 flex items-center gap-1 hover:gap-2 transition-all"
                             >
                                 View Details <ArrowRight size={12}/>
                             </button>
                         </div>
                     </div>
                 ))
             ) : (
                 <div className="text-center py-12">
                     <div className="w-16 h-16 bg-safar-100 text-safar-300 rounded-full flex items-center justify-center mx-auto mb-4">
                         <MapPin size={32} />
                     </div>
                     <p className="text-safar-900 font-bold">No {tab.toLowerCase()} trips</p>
                     <p className="text-safar-500 text-sm mt-1">Your travel history will appear here.</p>
                 </div>
             )}
        </div>
      </div>
    );
  };

  const renderJourneyDetails = () => {
    if (!selectedBooking) return null;
    return (
        <div className="fade-in min-h-screen bg-safar-50">
            <Header title="Trip Details" onBack={() => setCurrentView('journeys')} />
            <div className="p-6 space-y-6">
                
                {/* Status Card */}
                <div className="bg-white p-6 rounded-3xl border border-safar-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-safar-50 rounded-full flex items-center justify-center text-safar-600">
                             <MapPin size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-safar-400 font-bold uppercase">Destination</p>
                            <h3 className="font-serif text-2xl text-safar-900">{selectedBooking.destination}</h3>
                        </div>
                    </div>
                    <div className="flex gap-4 border-t border-safar-50 pt-4">
                        <div className="flex-1">
                            <p className="text-xs text-safar-400 font-bold uppercase mb-1">Date</p>
                            <p className="font-medium text-safar-900">{selectedBooking.date}</p>
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-safar-400 font-bold uppercase mb-1">Status</p>
                            <p className="font-medium text-safar-900 capitalize">{selectedBooking.status}</p>
                        </div>
                    </div>
                </div>

                {/* Driver & Vehicle */}
                <div className="bg-white p-5 rounded-3xl border border-safar-100 shadow-sm">
                     <h4 className="text-sm font-bold text-safar-900 mb-4 flex items-center gap-2"><User size={16}/> Pilot & Vehicle</h4>
                     <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-gray-100 rounded-full"></div>
                         <div className="flex-1">
                             <p className="font-bold text-safar-900">{selectedBooking.pilotName}</p>
                             <p className="text-xs text-safar-500">{selectedBooking.carName}</p>
                         </div>
                     </div>
                </div>

                {/* Payment */}
                <div className="bg-white p-5 rounded-3xl border border-safar-100 shadow-sm">
                     <h4 className="text-sm font-bold text-safar-900 mb-4 flex items-center gap-2"><CreditCard size={16}/> Payment Summary</h4>
                     <div className="flex justify-between items-center mb-2">
                         <span className="text-safar-500 text-sm">Trip Fare</span>
                         <span className="font-medium">₹{selectedBooking.totalAmount}</span>
                     </div>
                     <div className="flex justify-between items-center text-xs text-safar-400 border-b border-safar-50 pb-2 mb-2">
                         <span>Taxes & Fees</span>
                         <span>Included</span>
                     </div>
                     <div className="flex justify-between items-center">
                         <span className="font-bold text-safar-900">Total Paid</span>
                         <span className="font-bold text-safar-900">₹{selectedBooking.totalAmount}</span>
                     </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                     <Button variant="outline" className="text-xs h-10"><Download size={14}/> Invoice</Button>
                     <Button variant="danger" className="text-xs h-10 bg-red-50 text-red-600 border-red-100"><AlertCircle size={14}/> Report Issue</Button>
                </div>
            </div>
        </div>
    );
  };

  const renderPayments = () => (
    <div className="fade-in min-h-screen bg-safar-50">
        <Header title="Payments & Refunds" onBack={() => setCurrentView('menu')} />
        <div className="p-6 space-y-6">
            
            {/* Safar Wallet */}
            <div className="bg-safar-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-safar-700 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                <div className="relative z-10 flex justify-between items-center mb-6">
                    <div>
                        <p className="text-xs text-safar-300 uppercase tracking-widest font-bold mb-1">Safar Wallet Balance</p>
                        <h3 className="font-serif text-4xl">₹1,250</h3>
                    </div>
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                        <CreditCard size={24} className="text-white" />
                    </div>
                </div>
                <Button className="w-full bg-white text-safar-900 hover:bg-safar-50 border-none font-bold">Add Money</Button>
            </div>

            {/* Methods */}
            <div className="space-y-3">
                <div className="flex justify-between items-end px-1">
                    <h3 className="text-xs font-bold text-safar-500 uppercase tracking-widest">Saved Methods</h3>
                    <button className="text-xs font-bold text-safar-600 uppercase hover:underline">Add New</button>
                </div>
                <div className="bg-white rounded-3xl border border-safar-100 overflow-hidden">
                    <div className="p-4 border-b border-safar-50 flex items-center gap-4">
                        <Smartphone size={20} className="text-safar-800" />
                        <div className="flex-1">
                             <p className="font-bold text-safar-900 text-sm">UPI - 9876543210@upi</p>
                             <p className="text-[10px] text-safar-400">Primary Method</p>
                        </div>
                        <button className="text-xs text-red-500 font-bold">Remove</button>
                    </div>
                    <div className="p-4 flex items-center gap-4">
                        <CreditCard size={20} className="text-safar-800" />
                        <div className="flex-1">
                             <p className="font-bold text-safar-900 text-sm">HDFC Bank •••• 4242</p>
                             <p className="text-[10px] text-safar-400">Debit Card</p>
                        </div>
                         <button className="text-xs text-red-500 font-bold">Remove</button>
                    </div>
                </div>
            </div>

            {/* History */}
            <div className="space-y-3">
                 <h3 className="text-xs font-bold text-safar-500 uppercase tracking-widest px-1">Transaction History</h3>
                 <div className="bg-white rounded-3xl border border-safar-100 overflow-hidden">
                     {transactions.map(txn => (
                         <div key={txn.id} className="p-4 border-b border-safar-50 last:border-0 flex items-center justify-between">
                             <div>
                                 <p className="font-bold text-safar-900 text-sm">{txn.description}</p>
                                 <p className="text-xs text-safar-500">{txn.date} • {txn.id}</p>
                             </div>
                             <div className="text-right">
                                 <p className="font-bold text-safar-900">-₹{txn.amount}</p>
                                 <p className="text-[10px] text-green-600 font-bold uppercase">{txn.status}</p>
                             </div>
                         </div>
                     ))}
                 </div>
            </div>

            <Button variant="outline" fullWidth className="gap-2">
                <LifeBuoy size={16} /> Contact Support for Payment Issues
            </Button>
        </div>
    </div>
  );

  const renderSafety = () => (
    <div className="fade-in min-h-screen bg-safar-50">
      <Header title="Safety Center" onBack={() => setCurrentView('menu')} />
      <div className="p-6 space-y-6">
         
         <div className="bg-red-50 rounded-[2.5rem] p-8 text-center border border-red-100 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-red-100 opacity-30 rounded-full blur-3xl scale-150"></div>
             <div className="relative z-10">
                 <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-200 animate-pulse">
                     <AlertTriangle size={32} />
                 </div>
                 <h3 className="font-serif text-2xl font-bold text-red-900 mb-2">Emergency SOS</h3>
                 <p className="text-red-700 text-sm mb-6 max-w-xs mx-auto">Pressing this will instantly share your live location with our safety team and your emergency contacts.</p>
                 <Button className="bg-red-600 hover:bg-red-700 text-white border-none w-full shadow-xl shadow-red-200 py-4 text-lg">
                    TRIGGER SOS ALERT
                 </Button>
             </div>
         </div>

         <div className="bg-white rounded-3xl border border-safar-100 overflow-hidden">
             <MenuItem icon={Heart} label="Manage Trusted Contacts" subLabel="Currently: Priya Sharma" onClick={() => setCurrentView('details')} />
             <MenuItem icon={MapPin} label="Share Live Trip Status" subLabel="Send tracking link via WhatsApp" onClick={() => {}} />
         </div>

         <div className="bg-safar-800 text-white p-6 rounded-3xl flex items-center justify-between shadow-lg">
             <div>
                 <p className="text-xs text-safar-300 font-bold uppercase tracking-wider mb-1">24x7 Safety Helpline</p>
                 <p className="text-2xl font-bold">1800-SAFAR-HELP</p>
             </div>
             <button className="w-12 h-12 bg-white text-safar-900 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                 <Phone size={24} />
             </button>
         </div>

         <div className="px-4 text-center">
             <p className="text-xs text-safar-400 italic">"Your safety is our priority. Use SOS or call support anytime during your journey."</p>
         </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="fade-in min-h-screen bg-safar-50">
      <Header title="Preferences" onBack={() => setCurrentView('menu')} />
      <div className="p-6 space-y-6">
        
        <div className="bg-white rounded-3xl border border-safar-100 overflow-hidden">
           <div className="p-4 border-b border-safar-50 bg-safar-50/50">
              <h3 className="font-bold text-safar-900 text-sm">Notifications</h3>
           </div>
           {[
             { id: 'push', label: 'Push Notifications', sub: 'Trip updates & offers' },
             { id: 'sms', label: 'SMS Alerts', sub: 'OTP & urgent info' },
             { id: 'whatsapp', label: 'WhatsApp', sub: 'Driver details & tickets' },
           ].map((item) => (
             <div key={item.id} className="p-4 flex items-center gap-4 border-b border-safar-50 last:border-0">
                <div className="flex-1">
                   <p className="font-bold text-safar-900 text-sm">{item.label}</p>
                   <p className="text-xs text-safar-400">{item.sub}</p>
                </div>
                <Toggle 
                  active={(prefs as any)[item.id]} 
                  onToggle={() => setPrefs(p => ({...p, [item.id]: !(p as any)[item.id]}))} 
                />
             </div>
           ))}
        </div>

        <div className="bg-white rounded-3xl border border-safar-100 overflow-hidden">
           <div className="p-4 border-b border-safar-50 bg-safar-50/50">
              <h3 className="font-bold text-safar-900 text-sm">Communication</h3>
           </div>
           <div className="p-4 flex items-center gap-4 border-b border-safar-50">
                <div className="flex-1">
                   <p className="font-bold text-safar-900 text-sm">Email Invoices</p>
                   <p className="text-xs text-safar-400">Receive receipts automatically</p>
                </div>
                <Toggle active={prefs.invoiceEmail} onToggle={() => setPrefs({...prefs, invoiceEmail: !prefs.invoiceEmail})} />
           </div>
           <div className="p-4 flex items-center gap-4">
                <div className="flex-1">
                   <p className="font-bold text-safar-900 text-sm">Promotional Emails</p>
                   <p className="text-xs text-safar-400">Deals & new destinations</p>
                </div>
                <Toggle active={prefs.promo} onToggle={() => setPrefs({...prefs, promo: !prefs.promo})} />
           </div>
        </div>

        <div className="bg-white rounded-3xl border border-safar-100 overflow-hidden">
            <div className="p-4 border-b border-safar-50 bg-safar-50/50">
               <h3 className="font-bold text-safar-900 text-sm">App & Accessibility</h3>
            </div>
            <div className="p-4 flex items-center justify-between border-b border-safar-50">
                 <div className="flex-1">
                    <p className="font-bold text-safar-900 text-sm">App Language</p>
                    <p className="text-xs text-safar-400">Current: {prefs.language}</p>
                 </div>
                 <select 
                    value={prefs.language} 
                    onChange={e => setPrefs({...prefs, language: e.target.value})}
                    className="text-sm font-bold text-safar-700 bg-safar-50 border border-safar-200 rounded-lg px-2 py-1 outline-none"
                 >
                     <option>English</option>
                     <option>Hindi (हिंदी)</option>
                     <option>Gujarati (ગુજરાતી)</option>
                 </select>
            </div>
            <div className="p-4 flex items-center gap-4">
                 <div className="flex-1">
                    <p className="font-bold text-safar-900 text-sm">Wheelchair Assistance</p>
                    <p className="text-xs text-safar-400">Request accessible vehicles by default</p>
                 </div>
                 <Toggle active={prefs.wheelchairAccess} onToggle={() => setPrefs({...prefs, wheelchairAccess: !prefs.wheelchairAccess})} />
            </div>
        </div>

        <div className="bg-white rounded-3xl border border-safar-100 overflow-hidden p-4">
             <h3 className="font-bold text-safar-900 text-sm mb-3">Travel Preferences</h3>
             <div className="flex flex-wrap gap-2">
                 {['Family', 'Parents', 'Pilgrimage', 'Weekend Escape'].map(tag => (
                   <button 
                    key={tag} 
                    onClick={() => {
                        const newTags = prefs.travelIntent.includes(tag) 
                            ? prefs.travelIntent.filter(t => t !== tag)
                            : [...prefs.travelIntent, tag];
                        setPrefs({...prefs, travelIntent: newTags});
                    }}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${prefs.travelIntent.includes(tag) ? 'bg-safar-100 border-safar-300 text-safar-800' : 'border-safar-100 text-safar-500 hover:bg-safar-50'}`}
                   >
                     {tag}
                   </button>
                 ))}
              </div>
        </div>

      </div>
    </div>
  );

  const renderHelp = () => {
    const lastBooking = bookings[0];
    const topics = [
        { id: 'payments', label: 'Payment & Refunds', icon: CreditCard },
        { id: 'driver', label: 'Driver & Vehicle Issues', icon: User },
        { id: 'fare', label: 'Fares & Charges', icon: FileText },
        { id: 'safety', label: 'Safety Concerns', icon: Shield },
    ];

    return (
      <div className="fade-in min-h-screen bg-safar-50">
        <Header title="Help & Support" onBack={() => setCurrentView('menu')} />
        <div className="p-6 space-y-6">
          
          {/* Last Journey Context */}
          {lastBooking && (
            <div className="bg-white rounded-3xl border border-safar-100 p-5 shadow-sm">
               <h3 className="text-xs font-bold text-safar-400 uppercase tracking-widest mb-3">Recent Journey</h3>
               <div className="flex justify-between items-start mb-4">
                  <div>
                     <p className="font-bold text-lg text-safar-900">{lastBooking.destination}</p>
                     <p className="text-xs text-safar-500">{lastBooking.date} • {lastBooking.status}</p>
                  </div>
                  <ChevronRight size={20} className="text-safar-300" />
               </div>
               <Button variant="outline" fullWidth className="text-sm py-2 h-10 border-safar-200 text-safar-700">
                  Report Issue with this Trip
               </Button>
            </div>
          )}

          {/* Topics */}
          <div>
             <h3 className="text-xs font-bold text-safar-500 uppercase tracking-widest pl-1 mb-3">Common Topics</h3>
             <div className="bg-white rounded-3xl border border-safar-100 overflow-hidden">
                {topics.map(t => (
                    <MenuItem 
                        key={t.id}
                        icon={t.icon} 
                        label={t.label} 
                        onClick={() => { setSelectedTopic(t.label); setCurrentView('helpTopic'); }} 
                    />
                ))}
             </div>
          </div>

          <div className="bg-white rounded-3xl border border-safar-100 overflow-hidden">
              <MenuItem icon={MessageCircle} label="Your Support Tickets" subLabel="Check status of existing issues" onClick={() => setCurrentView('tickets')} />
          </div>

          {/* Direct Contact */}
          <div className="grid grid-cols-2 gap-3 pt-2">
              <Button variant="outline" className="bg-white"><MessageCircle size={18}/> Chat Support</Button>
              <Button variant="outline" className="bg-white"><Phone size={18}/> Call Support</Button>
          </div>
        </div>
      </div>
    );
  };

  const renderHelpTopic = () => (
      <div className="fade-in min-h-screen bg-safar-50">
          <Header title={selectedTopic || 'Help Topic'} onBack={() => setCurrentView('help')} />
          <div className="p-6">
              <div className="bg-white p-6 rounded-3xl border border-safar-100 text-center mb-6">
                  <div className="w-16 h-16 bg-safar-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <HelpCircle size={32} className="text-safar-500"/>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-safar-900 mb-2">How can we help?</h3>
                  <p className="text-safar-600 text-sm">Browsing FAQs for {selectedTopic}</p>
              </div>

              <div className="space-y-3">
                  {/* Mock FAQs */}
                  {[1, 2, 3].map(i => (
                      <div key={i} className="bg-white p-4 rounded-2xl border border-safar-100">
                          <p className="font-bold text-safar-900 text-sm mb-2">Common question related to {selectedTopic}?</p>
                          <p className="text-xs text-safar-500 leading-relaxed">Here is a concise explanation that solves the user's doubt immediately without needing to contact support.</p>
                      </div>
                  ))}
              </div>

              <div className="mt-8 text-center">
                  <p className="text-safar-400 text-sm mb-4">Still need help?</p>
                  <Button fullWidth onClick={() => {}}>Raise a Ticket</Button>
              </div>
          </div>
      </div>
  );

  const renderTickets = () => (
    <div className="fade-in min-h-screen bg-safar-50">
        <Header title="Support Tickets" onBack={() => setCurrentView('help')} />
        <div className="p-6">
            {tickets.length > 0 ? (
                <div className="space-y-4">
                    {/* Map tickets here */}
                </div>
            ) : (
                <div className="text-center py-20">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={40} className="text-green-500" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-safar-900">All Clear!</h3>
                    <p className="text-safar-500 text-sm mt-2">You have no open support tickets.<br/>You're all set.</p>
                </div>
            )}
        </div>
    </div>
  );

  const renderAbout = () => (
    <div className="fade-in min-h-screen bg-safar-50">
      <Header title="About Safar" onBack={() => setCurrentView('menu')} />
      <div className="p-6 space-y-6">
         <div className="text-center py-8">
            <div className="w-20 h-20 bg-safar-800 rounded-3xl mx-auto mb-6 flex items-center justify-center text-white shadow-xl shadow-safar-200">
               <Shield size={40} />
            </div>
            <h3 className="font-serif text-3xl text-safar-900 mb-1">Safar Yatra</h3>
            <p className="text-safar-500 font-medium">Version 1.0.2</p>
         </div>

         <div className="bg-white rounded-3xl border border-safar-100 overflow-hidden">
             <MenuItem icon={FileText} label="Terms & Conditions" onClick={() => {}} />
             <MenuItem icon={Lock} label="Privacy Policy" onClick={() => {}} />
             <MenuItem icon={Info} label="Software Licenses" onClick={() => {}} />
         </div>

         <div className="text-center pt-8">
             <p className="text-xs text-safar-400 uppercase tracking-widest mb-2">Made with <Heart size={10} className="inline text-red-400 fill-red-400"/> in India</p>
             <p className="text-xs text-safar-300">© 2024 Safar Mobility Pvt Ltd</p>
             <p className="text-xs text-safar-300 mt-1">contact@safar.com</p>
         </div>
      </div>
    </div>
  );

  // --- MAIN SWITCHER ---
  
  switch (currentView) {
      case 'details': return renderDetails();
      case 'journeys': return renderJourneys();
      case 'journeyDetails': return renderJourneyDetails();
      case 'payments': return renderPayments();
      case 'preferences': return renderPreferences();
      case 'safety': return renderSafety();
      case 'help': return renderHelp();
      case 'helpTopic': return renderHelpTopic();
      case 'tickets': return renderTickets();
      case 'about': return renderAbout();
      default: break; // fallthrough to menu
  }

  // --- DEFAULT MENU VIEW ---
  return (
    <div className="fade-in pb-24 min-h-screen bg-safar-50">
      
      {/* Profile Header */}
      <div className="bg-white pt-12 pb-6 px-6 rounded-b-[2.5rem] shadow-sm border-b border-safar-100 mb-6">
         <div className="flex items-center gap-5">
             <div className="w-16 h-16 bg-safar-800 rounded-full flex items-center justify-center text-white text-2xl font-serif shadow-md border-4 border-safar-50 relative">
                RS
                <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full">
                    <div className="bg-green-500 text-white rounded-full p-0.5">
                        <CheckCircle2 size={12} />
                    </div>
                </div>
             </div>
             <div className="flex-1">
                <h1 className="font-serif text-2xl text-safar-900 leading-tight">{user.name}</h1>
                <p className="text-safar-500 text-sm font-medium">{user.phone}</p>
             </div>
             <button onClick={() => setCurrentView('details')} className="text-xs font-bold text-safar-600 bg-safar-50 px-3 py-1.5 rounded-full border border-safar-100 hover:bg-safar-100 transition-colors">
                 Edit
             </button>
         </div>
      </div>

      <div className="px-4 space-y-6">
         
         {/* Core */}
         <div className="bg-white rounded-3xl border border-safar-100 overflow-hidden shadow-sm">
             <MenuItem 
                icon={User} 
                label="Profile Details" 
                subLabel="Personal info & Emergency Contact" 
                onClick={() => setCurrentView('details')} 
             />
             <MenuItem 
                icon={Calendar} 
                label="My Journeys" 
                subLabel="History, Upcoming & Cancelled" 
                onClick={() => setCurrentView('journeys')} 
             />
             <MenuItem 
                icon={CreditCard} 
                label="Payments" 
                subLabel="Saved Cards, UPI & History" 
                onClick={() => setCurrentView('payments')} 
             />
         </div>

         {/* Safety */}
         <div className="bg-white rounded-3xl border border-journey-500 overflow-hidden shadow-md">
             <MenuItem 
                icon={Shield} 
                label="Safety Center" 
                subLabel="SOS, Helpline & Trusted Contacts" 
                onClick={() => setCurrentView('safety')}
                isHighlight={true} 
             />
         </div>

         {/* Settings */}
         <div className="bg-white rounded-3xl border border-safar-100 overflow-hidden shadow-sm">
             <MenuItem 
                icon={Bell} 
                label="Preferences" 
                subLabel="Notifications & Travel Style" 
                onClick={() => setCurrentView('preferences')} 
             />
             <MenuItem 
                icon={HelpCircle} 
                label="Help & Support" 
                subLabel="FAQs, Issues & Tickets" 
                onClick={() => setCurrentView('help')} 
             />
             <MenuItem 
                icon={Info} 
                label="About Safar" 
                subLabel="Legal, Version & Contact" 
                onClick={() => setCurrentView('about')} 
             />
         </div>

         <div className="pt-2 pb-8">
             <Button variant="ghost" fullWidth onClick={onLogout} className="text-red-600 hover:bg-red-50 hover:text-red-700">
                 <LogOut size={18} className="mr-2" /> Logout
             </Button>
             <p className="text-center text-[10px] text-safar-300 uppercase tracking-widest mt-4">Safar Yatra v1.0.2</p>
         </div>

      </div>
    </div>
  );
};
