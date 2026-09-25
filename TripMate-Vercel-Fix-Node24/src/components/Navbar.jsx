import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { useEffect, useState as usePWAState } from 'react';
import { installPWA, subscribeToInstallPrompt } from '../pwa';
import { 
  Compass, Map, Sparkles, FolderHeart, ShieldAlert, 
  User, Settings, Plus, ChevronDown, Check, Share2, Printer, Search
} from 'lucide-react';

export default function Navbar() {
  const { 
    currentTrip, 
    savedTrips, 
    selectSavedTrip, 
    activeView, 
    setActiveView, 
    setIsPlanModalOpen, 
    setIsSOSModalOpen,
    setIsShareModalOpen,
    userProfile 
  } = useTrip();

  const [isTripDropdownOpen, setIsTripDropdownOpen] = useState(false);
  const [canInstall, setCanInstall] = usePWAState(false);

  useEffect(() => subscribeToInstallPrompt(setCanInstall), []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveView('dashboard')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-brand-600 transition flex items-center gap-1">
                  TripMate
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                </span>
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block -mt-1">
                  Smart Route Planner
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-xs font-bold">
              <button
                onClick={() => setActiveView('dashboard')}
                className={`px-3.5 py-2 rounded-xl transition ${
                  activeView === 'dashboard'
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveView('my-trips')}
                className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 ${
                  activeView === 'my-trips'
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <FolderHeart className="w-4 h-4 text-rose-500" />
                My Trips
                <span className="px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 text-[10px]">
                  {savedTrips.length}
                </span>
              </button>
              <button
                onClick={() => setActiveView('explore')}
                className={`px-3.5 py-2 rounded-xl transition ${
                  activeView === 'explore'
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Explore
              </button>
              <button
                onClick={() => setActiveView('admin')}
                className={`px-3.5 py-2 rounded-xl transition ${
                  activeView === 'admin'
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Admin Panel
              </button>
            </nav>
          </div>

          {/* Center/Right Active Trip Selector Dropdown */}
          <div className="flex items-center gap-3">
            {/* Quick Trip Switcher */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setIsTripDropdownOpen(!isTripDropdownOpen)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-2 border border-slate-200/80 transition"
              >
                <span className="w-2 h-2 rounded-full bg-brand-500" />
                <span className="max-w-[170px] truncate">{currentTrip?.title || "Active Trip"}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isTripDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Switch Active Journey
                  </div>
                  <div className="max-h-60 overflow-y-auto py-1">
                    {savedTrips.map((st) => (
                      <button
                        key={st.id}
                        onClick={() => {
                          selectSavedTrip(st.id);
                          setIsTripDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center justify-between group transition"
                      >
                        <div className="truncate pr-2">
                          <div className="font-bold text-slate-900 group-hover:text-brand-600 truncate">{st.title}</div>
                          <div className="text-[10px] text-slate-400">{st.from} ➔ {st.to} ({st.days}D)</div>
                        </div>
                        {currentTrip?.id === st.id && (
                          <Check className="w-4 h-4 text-brand-600 flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-slate-100 p-2">
                    <button
                      onClick={() => {
                        setIsPlanModalOpen(true);
                        setIsTripDropdownOpen(false);
                      }}
                      className="w-full py-1.5 px-3 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Plan New Custom Trip
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Install App CTA (shown only when browser supports the install prompt) */}
            {canInstall && (
              <button
                onClick={() => installPWA()}
                className="hidden sm:flex px-3 py-2 rounded-xl border border-brand-200 bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-extrabold items-center gap-1.5 transition"
                title="Install TripMate on this device"
              >
                <span aria-hidden="true">⬇</span>
                Install App
              </button>
            )}

            {/* Plan My Trip Main CTA */}
            <button
              onClick={() => setIsPlanModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-extrabold shadow-md shadow-brand-600/20 flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">PLAN MY TRIP</span>
              <span className="sm:hidden">Plan</span>
            </button>

            {/* Profile icon */}
            <button
              onClick={() => setActiveView('profile')}
              className={`p-2 rounded-xl transition ${
                activeView === 'profile'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              title="Profile & Preferences"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
