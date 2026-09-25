import React from 'react';
import { useTrip } from '../context/TripContext';
import { 
  Home, FolderHeart, Map, Bot, User, Compass 
} from 'lucide-react';

export default function MobileBottomNav() {
  const { 
    activeView, 
    setActiveView, 
    activeDashboardTab, 
    setActiveDashboardTab 
  } = useTrip();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2 px-3 flex items-center justify-around shadow-lg">
      {/* Home / Overview */}
      <button
        onClick={() => {
          setActiveView('dashboard');
          setActiveDashboardTab('overview');
        }}
        className={`flex flex-col items-center gap-1 text-[10px] font-bold transition ${
          activeView === 'dashboard' && activeDashboardTab === 'overview'
            ? 'text-brand-600'
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </button>

      {/* Trips */}
      <button
        onClick={() => setActiveView('my-trips')}
        className={`flex flex-col items-center gap-1 text-[10px] font-bold transition ${
          activeView === 'my-trips' ? 'text-brand-600' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <FolderHeart className="w-5 h-5" />
        <span>Trips</span>
      </button>

      {/* Interactive Map */}
      <button
        onClick={() => {
          setActiveView('dashboard');
          setActiveDashboardTab('map');
        }}
        className={`flex flex-col items-center gap-1 text-[10px] font-bold transition ${
          activeView === 'dashboard' && activeDashboardTab === 'map'
            ? 'text-brand-600'
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <Map className="w-5 h-5" />
        <span>Map</span>
      </button>

      {/* AI Assistant */}
      <button
        onClick={() => {
          setActiveView('dashboard');
          setActiveDashboardTab('ai-assistant');
        }}
        className={`flex flex-col items-center gap-1 text-[10px] font-bold transition ${
          activeView === 'dashboard' && activeDashboardTab === 'ai-assistant'
            ? 'text-brand-600'
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <Bot className="w-5 h-5" />
        <span>AI Copilot</span>
      </button>

      {/* Explore */}
      <button
        onClick={() => setActiveView('explore')}
        className={`flex flex-col items-center gap-1 text-[10px] font-bold transition ${
          activeView === 'explore' ? 'text-brand-600' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <Compass className="w-5 h-5" />
        <span>Explore</span>
      </button>

      {/* Profile */}
      <button
        onClick={() => setActiveView('profile')}
        className={`flex flex-col items-center gap-1 text-[10px] font-bold transition ${
          activeView === 'profile' ? 'text-brand-600' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <User className="w-5 h-5" />
        <span>Profile</span>
      </button>
    </div>
  );
}
