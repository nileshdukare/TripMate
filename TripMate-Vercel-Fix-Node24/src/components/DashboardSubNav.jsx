import React from 'react';
import { useTrip } from '../context/TripContext';
import { 
  LayoutDashboard, Map, Split, CalendarDays, Hotel, 
  Fuel, Utensils, Landmark, Calculator, CloudSun, 
  ShieldAlert, CheckSquare, Bot 
} from 'lucide-react';

export default function DashboardSubNav() {
  const { activeDashboardTab, setActiveDashboardTab } = useTrip();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'map', label: 'Route Map', icon: Map },
    { id: 'route-analysis', label: 'Route Analysis', icon: Split },
    { id: 'itinerary', label: 'Day-by-Day', icon: CalendarDays },
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'fuel', label: 'Fuel & EV', icon: Fuel },
    { id: 'restaurants', label: 'Food & Dining', icon: Utensils },
    { id: 'attractions', label: 'Attractions', icon: Landmark },
    { id: 'budget', label: 'Budget', icon: Calculator },
    { id: 'weather', label: 'Weather', icon: CloudSun },
    { id: 'safety', label: 'Safety & SOS', icon: ShieldAlert },
    { id: 'checklist', label: 'Checklist', icon: CheckSquare },
    { id: 'ai-assistant', label: 'AI Copilot', icon: Bot, badge: 'AI' }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-1.5 overflow-x-auto scrollbar-none flex items-center gap-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeDashboardTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveDashboardTab(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              isActive
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-brand-400' : 'text-slate-400'}`} />
            <span>{tab.label}</span>
            {tab.badge && (
              <span className={`px-1.5 py-0.2 rounded-md text-[9px] font-extrabold ${
                isActive ? 'bg-brand-500 text-white' : 'bg-brand-100 text-brand-800'
              }`}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
