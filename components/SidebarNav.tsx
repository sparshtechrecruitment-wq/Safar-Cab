import React from 'react';
import { Home, Compass, Map, Bell, User, LayoutGrid } from 'lucide-react';
import { MainTab } from '../types';

interface SidebarNavProps {
  currentTab: MainTab;
  onTabChange: (tab: MainTab) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ currentTab, onTabChange }) => {
  const tabs: { id: MainTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home size={24} /> },
    { id: 'travel', label: 'Smart Travel', icon: <Compass size={24} /> },
    { id: 'trips', label: 'My Trips', icon: <Map size={24} /> },
    { id: 'notifications', label: 'Alerts', icon: <Bell size={24} /> },
    { id: 'profile', label: 'Profile', icon: <User size={24} /> },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-safar-200 h-screen sticky top-0 py-8 px-4 shadow-sm z-40">
      <div className="flex items-center gap-3 px-4 mb-12">
          <div className="bg-safar-800 text-white p-2 rounded-xl">
             <LayoutGrid size={24} />
          </div>
          <h1 className="font-serif text-2xl font-bold text-safar-900 tracking-tight">Safar</h1>
      </div>
      
      <div className="flex flex-col gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 font-bold ${
              currentTab === tab.id 
                ? 'bg-safar-800 text-white shadow-md' 
                : 'text-safar-500 hover:bg-safar-50 hover:text-safar-800'
            }`}
          >
            {tab.icon}
            <span className="text-sm tracking-wide">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
