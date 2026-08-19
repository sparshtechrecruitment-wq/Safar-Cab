import React from 'react';
import { Home, Compass, Map, Bell, User } from 'lucide-react';
import { MainTab } from '../types';

interface BottomNavProps {
  currentTab: MainTab;
  onTabChange: (tab: MainTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const tabs: { id: MainTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'travel', label: 'Travel', icon: <Compass size={20} /> },
    { id: 'trips', label: 'My Trips', icon: <Map size={20} /> },
    { id: 'notifications', label: 'Alerts', icon: <Bell size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-safar-200 px-6 py-3 pb-6 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex flex-col items-center gap-1 transition-colors duration-300 ${
            currentTab === tab.id ? 'text-safar-800' : 'text-safar-400 hover:text-safar-600'
          }`}
        >
          <div className={`p-1 rounded-xl ${currentTab === tab.id ? 'bg-safar-100' : ''}`}>
            {tab.icon}
          </div>
          <span className="text-[10px] font-medium tracking-wide uppercase">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};
