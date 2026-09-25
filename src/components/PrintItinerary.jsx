import React from 'react';
import { useTrip } from '../context/TripContext';
import { 
  Printer, ArrowLeft, Share2, Compass, MapPin, 
  Clock, Calendar, Fuel, Hotel, ShieldAlert, IndianRupee 
} from 'lucide-react';

export default function PrintItinerary() {
  const { currentTrip, setActiveView, setIsShareModalOpen } = useTrip();

  if (!currentTrip) return null;

  const totalPeople = (currentTrip.travelers?.adults || 1) + (currentTrip.travelers?.children || 0);
  const b = currentTrip.budget || {};
  const grandTotal = (b.transportation?.fuel || 0) + (b.transportation?.tolls || 0) + 
                     (b.accommodation?.total || 11400) + (b.food?.total || 12000) + 4000;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Action Bar (hidden in print) */}
      <div className="no-print bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <button
          onClick={() => setActiveView('dashboard')}
          className="px-4 py-2 rounded-xl text-slate-700 hover:bg-slate-100 text-xs font-bold flex items-center gap-2 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Trip Dashboard
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition"
          >
            <Share2 className="w-4 h-4" />
            Share WhatsApp
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-extrabold shadow-md shadow-brand-600/20 flex items-center gap-1.5 transition"
          >
            <Printer className="w-4 h-4" />
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* Printable Sheet */}
      <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-md space-y-8 print:p-0 print:border-none print:shadow-none">
        {/* Printable Header */}
        <div className="border-b border-slate-900/10 pb-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-brand-600 font-extrabold text-lg">
              <Compass className="w-6 h-6" />
              <span>TripMate Travel Blueprint</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">
              {currentTrip.title}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Generated on {new Date().toLocaleDateString('en-US', { dateStyle: 'long' })} • Reference ID: #{currentTrip.id}
            </p>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
              Trip Plan — Verify Live Details Before Travel
            </span>
          </div>
        </div>

        {/* Route Snapshot */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 text-xs">
          <div>
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Route Corridor</span>
            <div className="font-bold text-slate-800 mt-0.5">{currentTrip.from} ➔ {currentTrip.to}</div>
          </div>
          <div>
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Distance & Duration</span>
            <div className="font-bold text-slate-800 mt-0.5">{currentTrip.overview?.distance} km ({currentTrip.overview?.travelTime})</div>
          </div>
          <div>
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Dates & Travelers</span>
            <div className="font-bold text-slate-800 mt-0.5">{currentTrip.days} Days • {totalPeople} Travelers</div>
          </div>
          <div>
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Estimated Budget</span>
            <div className="font-bold text-emerald-700 mt-0.5">₹{grandTotal.toLocaleString()} (~₹{Math.round(grandTotal/totalPeople)}/person)</div>
          </div>
        </div>

        {/* Highway Warning if any */}
        {currentTrip.overview?.drivingWarning && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
            <strong>Driver Notice: </strong> {currentTrip.overview.drivingWarning}
          </div>
        )}

        {/* Day-by-Day Table */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 text-base uppercase tracking-wider border-b border-slate-200 pb-2">
            Day-by-Day Comprehensive Schedule
          </h3>

          <div className="space-y-6">
            {currentTrip.itinerary?.map((day) => (
              <div key={day.day} className="p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Day {day.day}: {day.title}
                  </div>
                  <div className="text-xs text-slate-500 font-semibold">
                    {day.distance} • Est. Drive: {day.driveTime}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {day.morning && (
                    <div className="p-2.5 rounded-xl bg-slate-50">
                      <span className="font-bold text-amber-700 uppercase text-[10px]">Morning ({day.morning.time})</span>
                      <div className="font-bold text-slate-800">{day.morning.title}</div>
                      <p className="text-slate-600 text-[11px] mt-0.5">{day.morning.desc}</p>
                    </div>
                  )}

                  {day.lunch && (
                    <div className="p-2.5 rounded-xl bg-slate-50">
                      <span className="font-bold text-orange-700 uppercase text-[10px]">Lunch ({day.lunch.time})</span>
                      <div className="font-bold text-slate-800">{day.lunch.title}</div>
                      <p className="text-slate-600 text-[11px] mt-0.5">{day.lunch.desc}</p>
                    </div>
                  )}

                  {day.afternoon && (
                    <div className="p-2.5 rounded-xl bg-slate-50">
                      <span className="font-bold text-sky-700 uppercase text-[10px]">Afternoon ({day.afternoon.time})</span>
                      <div className="font-bold text-slate-800">{day.afternoon.title}</div>
                      <p className="text-slate-600 text-[11px] mt-0.5">{day.afternoon.desc}</p>
                    </div>
                  )}

                  {day.night && (
                    <div className="p-2.5 rounded-xl bg-slate-50">
                      <span className="font-bold text-indigo-700 uppercase text-[10px]">Night & Stay ({day.night.time})</span>
                      <div className="font-bold text-slate-800">{day.night.title}</div>
                      <p className="text-slate-600 text-[11px] mt-0.5">{day.night.desc}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accommodation & Fuel Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
              <Hotel className="w-4 h-4 text-indigo-600" /> Overnight Stays
            </h4>
            <div className="space-y-2 text-xs">
              {currentTrip.hotels?.slice(0, 3).map((h, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-50 flex justify-between">
                  <div>
                    <div className="font-bold text-slate-800">{h.name} ({h.category})</div>
                    <div className="text-[11px] text-slate-500">{h.location}</div>
                  </div>
                  <div className="text-right font-bold text-slate-900">
                    ₹{h.pricePerNight?.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
              <Fuel className="w-4 h-4 text-amber-500" /> Refueling Stops Plan
            </h4>
            <div className="space-y-2 text-xs">
              {currentTrip.fuelSchedule?.map((s, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-50">
                  <div className="font-bold text-slate-800">{s.stage} ({s.location || `Km ${s.distanceKm}`})</div>
                  <div className="text-[11px] text-slate-600">{s.action}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-2">
          <div className="font-bold text-rose-950 flex items-center gap-1.5 text-sm">
            <ShieldAlert className="w-4 h-4 text-rose-600" /> 24/7 Route Emergency Hotlines
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
            <div><strong>National Emergency:</strong> 112</div>
            <div><strong>Highway Patrol:</strong> 1033</div>
            <div><strong>Ambulance:</strong> 108</div>
            <div><strong>FASTag Helpline:</strong> 1033</div>
          </div>
        </div>
      </div>
    </div>
  );
}
