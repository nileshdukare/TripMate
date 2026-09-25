import React from 'react';
import { useTrip } from '../context/TripContext';
import { 
  Navigation, Clock, Fuel, IndianRupee, Layers, CheckCircle2, 
  MapPin, Coffee, Utensils, Bed, ShieldCheck, ArrowRight, Sparkles
} from 'lucide-react';

export default function RouteAnalysis() {
  const { currentTrip, activeRouteIndex, switchRoute } = useTrip();

  if (!currentTrip) return null;

  const ra = currentTrip.routeAnalysis || {};
  const routes = currentTrip.routes || [];

  return (
    <div className="space-y-6">
      {/* Route Switcher Alternatives Header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Alternative Route Options</h3>
            <p className="text-xs text-slate-500">
              Compare speed, toll expenses, and scenic diversions. Select a route to apply it across your map, itinerary, and budget.
            </p>
          </div>
          <span className="hidden sm:inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-brand-50 text-brand-700 border border-brand-200">
            {routes.length} Available Routes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {routes.map((rt, idx) => {
            const isSelected = activeRouteIndex === idx;
            return (
              <div
                key={rt.id || idx}
                onClick={() => switchRoute(idx)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-brand-50/50 border-brand-500 shadow-md ring-2 ring-brand-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      isSelected ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {rt.badge || `Route ${idx + 1}`}
                    </span>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-xs font-bold text-brand-700">
                        <CheckCircle2 className="w-4 h-4 text-brand-600" /> Active
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm mb-1.5 leading-snug">
                    {rt.name}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                    {rt.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-1.5 rounded-lg bg-slate-50">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Distance</div>
                    <div className="font-bold text-slate-800">{rt.distance} km</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-50">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Est. Time</div>
                    <div className="font-bold text-emerald-700">{rt.time}</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-50">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Tolls</div>
                    <div className="font-bold text-slate-800">₹{rt.tollCost}</div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-dashed border-slate-200">
                  <span>Fuel: ~{rt.fuelRequired}L (₹{rt.fuelCost})</span>
                  {rt.scenicAttractions && (
                    <span className="text-purple-600 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> {rt.scenicAttractions} sights
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep Route Analysis Data Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-600" />
            Active Route Geographical & Operational Analysis
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Key logistical metrics, road corridors, crossing states, and scheduled stops.
          </p>
        </div>

        {/* Corridor Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Highways */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Main Highways</span>
            <div className="space-y-1">
              {ra.mainHighways?.map((hwy, i) => (
                <div key={i} className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  {hwy}
                </div>
              ))}
            </div>
          </div>

          {/* States Crossed */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">States Crossed</span>
            <div className="space-y-1">
              {ra.statesCrossed?.map((st, i) => (
                <div key={i} className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  {st}
                </div>
              ))}
            </div>
          </div>

          {/* Toll Plazas */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Toll Plazas & FASTag</span>
            <div className="text-base font-extrabold text-slate-900">
              {ra.tollCount} Plazas <span className="text-xs font-normal text-slate-500">(Total: ₹{ra.tollCost})</span>
            </div>
            <div className="text-[11px] text-emerald-700 font-medium">
              100% electronic FASTag compliant
            </div>
          </div>

          {/* Fuel Requirements */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Fuel Consumption</span>
            <div className="text-base font-extrabold text-slate-900">
              ~{ra.fuelRequirementLiters} {currentTrip.vehicleDetails?.fuelType === 'EV' ? 'kWh' : 'Liters'}
            </div>
            <div className="text-[11px] text-slate-600 font-medium">
              Estimated Fuel Cost: ₹{ra.fuelCost?.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Towns & Major Cities along the route */}
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
            Major Towns & En-Route Transit Hubs
          </h4>
          <div className="flex flex-wrap items-center gap-2">
            {ra.majorTowns?.map((town, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200/60 flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {town}
              </span>
            ))}
          </div>
        </div>

        {/* Recommended Breaks & Overnight Stops */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Rest Breaks */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
              <Coffee className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-900">Suggested Rest Breaks</div>
              <div className="text-sm font-extrabold text-amber-950 mt-0.5">
                {ra.restBreaksRecommended} Short Rest Breaks (15-20 min)
              </div>
              <p className="text-[11px] text-amber-800/80 mt-1">
                Scheduled every 180-220 km to stretch, relieve eye strain, and verify tire pressure.
              </p>
            </div>
          </div>

          {/* Meal Breaks */}
          <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200/80 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-orange-100 text-orange-800">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-orange-900">Suggested Meal Breaks</div>
              <div className="text-sm font-extrabold text-orange-950 mt-0.5">
                {ra.mealBreaksRecommended} Highway Food Stops (45 min)
              </div>
              <p className="text-[11px] text-orange-800/80 mt-1">
                Carefully mapped at verified food plazas with clean washrooms and ample parking.
              </p>
            </div>
          </div>

          {/* Overnight Stops */}
          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200/80 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-indigo-100 text-indigo-800">
              <Bed className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-indigo-900">Recommended Overnight Halts</div>
              <div className="text-sm font-extrabold text-indigo-950 mt-0.5">
                {ra.suggestedOvernightStops?.length > 0 ? ra.suggestedOvernightStops.join(", ") : "Direct single-day drive feasible"}
              </div>
              <p className="text-[11px] text-indigo-800/80 mt-1">
                Stops chosen to prevent continuous nighttime driving on unfamiliar ghat stretches.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
