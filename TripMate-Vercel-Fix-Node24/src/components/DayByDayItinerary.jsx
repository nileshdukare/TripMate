import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { 
  Sun, Moon, Utensils, Coffee, MapPin, Clock, 
  IndianRupee, ChevronDown, ChevronUp, Navigation, 
  Sparkles, PlusCircle, Check, Bed, Compass
} from 'lucide-react';

export default function DayByDayItinerary() {
  const { currentTrip, showToast } = useTrip();
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [customNote, setCustomNote] = useState('');
  const [dayNotes, setDayNotes] = useState({});

  if (!currentTrip || !currentTrip.itinerary) return null;

  const itinerary = currentTrip.itinerary;
  const currentDay = itinerary[selectedDayIndex] || itinerary[0];

  const handleAddNote = (dayNum) => {
    if (!customNote.trim()) return;
    setDayNotes(prev => ({
      ...prev,
      [dayNum]: [...(prev[dayNum] || []), customNote.trim()]
    }));
    setCustomNote('');
    showToast(`Note added to Day ${dayNum}!`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Day Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {itinerary.map((d, idx) => (
          <button
            key={d.day || idx}
            onClick={() => setSelectedDayIndex(idx)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedDayIndex === idx
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20 ring-2 ring-brand-500'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>Day {d.day}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
              selectedDayIndex === idx ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              {d.distance}
            </span>
          </button>
        ))}
      </div>

      {/* Active Day Detail Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Day Header Banner */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-500 text-white">
              {currentDay.date || `Day ${currentDay.day}`}
            </span>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-brand-400" />
                {currentDay.distance}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                {currentDay.driveTime}
              </span>
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <IndianRupee className="w-3.5 h-3.5" />
                Est. {currentDay.estimatedSpend}
              </span>
            </div>
          </div>

          <h2 className="text-xl md:text-2xl font-extrabold text-white">
            {currentDay.title}
          </h2>

          {/* Departure block */}
          {currentDay.departure && (
            <div className="mt-4 p-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span><strong>Departure Time:</strong> {currentDay.departure.time}</span>
                <span className="text-slate-400">|</span>
                <span><strong>From:</strong> {currentDay.departure.location}</span>
              </div>
              {currentDay.departure.note && (
                <span className="text-amber-300 text-[11px] font-medium">
                  Tip: {currentDay.departure.note}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Day Timeline */}
        <div className="p-6 space-y-6">
          {/* Morning */}
          {currentDay.morning && (
            <div className="relative pl-8 border-l-2 border-amber-300 space-y-1.5 pb-2">
              <div className="absolute -left-[17px] top-0 p-1.5 rounded-full bg-amber-100 text-amber-700 border-2 border-white shadow-sm">
                <Sun className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Morning • {currentDay.morning.time}
                </span>
                {currentDay.morning.cost && (
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {currentDay.morning.cost}
                  </span>
                )}
              </div>
              <h4 className="font-bold text-slate-900 text-base">{currentDay.morning.title}</h4>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                {currentDay.morning.desc}
              </p>
            </div>
          )}

          {/* Lunch */}
          {currentDay.lunch && (
            <div className="relative pl-8 border-l-2 border-orange-300 space-y-1.5 pb-2">
              <div className="absolute -left-[17px] top-0 p-1.5 rounded-full bg-orange-100 text-orange-700 border-2 border-white shadow-sm">
                <Utensils className="w-4 h-4 text-orange-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-700 uppercase tracking-wider">
                  Lunch Break • {currentDay.lunch.time}
                </span>
                {currentDay.lunch.cost && (
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {currentDay.lunch.cost}
                  </span>
                )}
              </div>
              <h4 className="font-bold text-slate-900 text-base">{currentDay.lunch.title}</h4>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                {currentDay.lunch.desc}
              </p>
            </div>
          )}

          {/* Afternoon */}
          {currentDay.afternoon && (
            <div className="relative pl-8 border-l-2 border-sky-300 space-y-1.5 pb-2">
              <div className="absolute -left-[17px] top-0 p-1.5 rounded-full bg-sky-100 text-sky-700 border-2 border-white shadow-sm">
                <Compass className="w-4 h-4 text-sky-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                  Afternoon Sightseeing • {currentDay.afternoon.time}
                </span>
                {currentDay.afternoon.cost && (
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {currentDay.afternoon.cost}
                  </span>
                )}
              </div>
              <h4 className="font-bold text-slate-900 text-base">{currentDay.afternoon.title}</h4>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                {currentDay.afternoon.desc}
              </p>
            </div>
          )}

          {/* Evening */}
          {currentDay.evening && (
            <div className="relative pl-8 border-l-2 border-purple-300 space-y-1.5 pb-2">
              <div className="absolute -left-[17px] top-0 p-1.5 rounded-full bg-purple-100 text-purple-700 border-2 border-white shadow-sm">
                <Sparkles className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                  Evening Activity • {currentDay.evening.time}
                </span>
                {currentDay.evening.cost && (
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {currentDay.evening.cost}
                  </span>
                )}
              </div>
              <h4 className="font-bold text-slate-900 text-base">{currentDay.evening.title}</h4>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                {currentDay.evening.desc}
              </p>
            </div>
          )}

          {/* Night */}
          {currentDay.night && (
            <div className="relative pl-8 border-l-2 border-indigo-300 space-y-1.5">
              <div className="absolute -left-[17px] top-0 p-1.5 rounded-full bg-indigo-100 text-indigo-700 border-2 border-white shadow-sm">
                <Moon className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                  Dinner & Overnight Rest • {currentDay.night.time}
                </span>
                {currentDay.night.cost && (
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {currentDay.night.cost}
                  </span>
                )}
              </div>
              <h4 className="font-bold text-slate-900 text-base">{currentDay.night.title}</h4>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                {currentDay.night.desc}
              </p>
              {currentDay.night.stay && (
                <div className="mt-2 text-xs font-semibold text-indigo-800 bg-indigo-50 p-2.5 rounded-xl border border-indigo-100 flex items-center gap-2">
                  <Bed className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>Stay: {currentDay.night.stay}</span>
                </div>
              )}
            </div>
          )}

          {/* User Custom Notes on this Day */}
          {dayNotes[currentDay.day]?.length > 0 && (
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Custom Notes & Detours</h5>
              {dayNotes[currentDay.day].map((nt, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>{nt}</span>
                </div>
              ))}
            </div>
          )}

          {/* Add Custom Note Input */}
          <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder={`Add a custom activity or reminder for Day ${currentDay.day}...`}
              onKeyDown={(e) => e.key === 'Enter' && handleAddNote(currentDay.day)}
              className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <button
              onClick={() => handleAddNote(currentDay.day)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
