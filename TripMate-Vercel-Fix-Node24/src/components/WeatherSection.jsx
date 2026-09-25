import React from 'react';
import { useTrip } from '../context/TripContext';
import { 
  CloudSun, Sun, CloudRain, Wind, Sunrise, Sunset, 
  AlertTriangle, MapPin, CheckCircle2 
} from 'lucide-react';

export default function WeatherSection() {
  const { currentTrip } = useTrip();

  if (!currentTrip || !currentTrip.weather) return null;

  return (
    <div className="space-y-6">
      {/* Top Advisory Banner if any */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CloudSun className="w-5 h-5 text-amber-500" />
              Route & Destination Weather Forecast
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Multi-day meteorological forecast covering departure highway, mountain ghats, and destination coast/valleys.
            </p>
          </div>
          <span className="self-start md:self-auto px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Highway Safe for Driving
          </span>
        </div>

        {/* Day-by-day Weather Forecast Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentTrip.weather.map((w, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-900">{w.day}</span>
                  <span className="text-[11px] font-semibold text-slate-400">{w.location}</span>
                </div>

                <div className="flex items-center gap-3 my-2">
                  <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-700 shadow-sm">
                    {w.rainProb > 40 ? (
                      <CloudRain className="w-6 h-6 text-sky-600" />
                    ) : w.condition.toLowerCase().includes('cloud') ? (
                      <CloudSun className="w-6 h-6 text-amber-600" />
                    ) : (
                      <Sun className="w-6 h-6 text-amber-500" />
                    )}
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900">
                      {w.tempHigh}°<span className="text-sm font-semibold text-slate-400">/{w.tempLow}°C</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-600 leading-tight">
                      {w.condition}
                    </div>
                  </div>
                </div>

                {/* Rain & Wind */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-2 border-t border-slate-200/60">
                  <div className="flex items-center gap-1.5">
                    <CloudRain className="w-3.5 h-3.5 text-sky-500" />
                    <span>Rain: {w.rainProb}%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Wind className="w-3.5 h-3.5 text-slate-400" />
                    <span>{w.wind}</span>
                  </div>
                </div>

                {/* Sunrise / Sunset */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Sunrise className="w-3.5 h-3.5 text-amber-500" />
                    <span>{w.sunrise}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Sunset className="w-3.5 h-3.5 text-orange-500" />
                    <span>{w.sunset}</span>
                  </div>
                </div>
              </div>

              {/* Advisory snippet */}
              {w.advisory && (
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-600 flex items-start gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>{w.advisory}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
