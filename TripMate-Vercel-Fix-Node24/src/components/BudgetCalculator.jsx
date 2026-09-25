import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { 
  IndianRupee, PieChart, Users, Fuel, Hotel, 
  Utensils, Ticket, ShoppingBag, RotateCcw, Download, 
  CheckCircle2, ArrowLeftRight, ArrowRight, Info, ShieldCheck, Car
} from 'lucide-react';

export default function BudgetCalculator() {
  const { currentTrip, updateBudgetCategory, isRoundTrip, toggleRoundTrip, showToast } = useTrip();

  const [showBreakdownDetails, setShowBreakdownDetails] = useState(false);

  if (!currentTrip || !currentTrip.budget) return null;

  const b = currentTrip.budget;
  const travelers = (currentTrip.travelers?.adults || 1) + (currentTrip.travelers?.children || 0);

  // Transportation metrics
  const bTrans = b.transportation || {};
  const fuel = Number(bTrans.fuel || 0);
  const tolls = Number(bTrans.tolls || 0);
  const parking = Number(bTrans.parking || 0);
  const emergencyBuffer = Number(bTrans.emergencyBuffer || 0);
  const totalTransport = fuel + tolls + parking + emergencyBuffer;

  // Distances
  const oneWayKm = currentTrip.overview?.oneWayDistance || currentTrip.overview?.distance || 585;
  const returnKm = currentTrip.overview?.returnDistance || oneWayKm;
  const localKm = currentTrip.overview?.localDistance || 110;
  const roundTripKm = currentTrip.overview?.roundTripDistance || (oneWayKm + returnKm + localKm);
  const activeDistance = isRoundTrip ? roundTripKm : oneWayKm;

  // Detailed transportation breakdown figures
  const outboundFuel = bTrans.outboundFuel || Math.round(fuel * 0.45);
  const returnFuel = bTrans.returnFuel || Math.round(fuel * 0.45);
  const localFuel = bTrans.localFuel || Math.round(fuel * 0.1);
  const outboundTolls = bTrans.outboundTolls || (isRoundTrip ? Math.round(tolls / 2) : tolls);
  const returnTolls = bTrans.returnTolls || (isRoundTrip ? Math.round(tolls / 2) : 0);

  // Accommodation total
  const nights = Number(b.accommodation?.nights || Math.max(1, currentTrip.days - 1));
  const costPerNight = Number(b.accommodation?.costPerNight || 3800);
  const totalAccommodation = nights * costPerNight;

  // Food total
  const dailyPerPerson = Number(b.food?.dailyPerPerson || 1000);
  const totalFood = dailyPerPerson * travelers * currentTrip.days;

  // Activities total
  const actEntries = b.activities || {};
  let totalActivities = 0;
  Object.keys(actEntries).forEach(k => {
    if (k !== 'total') totalActivities += Number(actEntries[k] || 0);
  });
  if (totalActivities === 0 && actEntries.total) totalActivities = actEntries.total;

  // Miscellaneous total
  const miscEntries = b.miscellaneous || {};
  let totalMisc = 0;
  Object.keys(miscEntries).forEach(k => {
    if (k !== 'total') totalMisc += Number(miscEntries[k] || 0);
  });
  if (totalMisc === 0 && miscEntries.total) totalMisc = miscEntries.total;

  // Grand Total & Per Person
  const grandTotal = totalTransport + totalAccommodation + totalFood + totalActivities + totalMisc;
  const perPerson = Math.round(grandTotal / (travelers || 1));

  // Percentage shares
  const pTransport = Math.round((totalTransport / grandTotal) * 100) || 0;
  const pHotel = Math.round((totalAccommodation / grandTotal) * 100) || 0;
  const pFood = Math.round((totalFood / grandTotal) * 100) || 0;
  const pActivities = Math.round((totalActivities / grandTotal) * 100) || 0;
  const pMisc = Math.round((totalMisc / grandTotal) * 100) || 0;

  return (
    <div className="space-y-6">
      {/* Return Journey Scope Switcher & Affirmation Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-brand-50 text-brand-700">
                <ArrowLeftRight className="w-5 h-5" />
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Journey Scope: {isRoundTrip ? "Full Round Trip (Return Journey Included)" : "One-Way Journey Only"}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Select whether transportation costs (fuel & tolls) cover the complete round trip home or just one-way.
            </p>
          </div>

          {/* Interactive Toggle */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl self-start md:self-auto border border-slate-200">
            <button
              onClick={() => toggleRoundTrip(true)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isRoundTrip
                  ? 'bg-brand-600 text-white shadow-sm ring-1 ring-brand-700'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Round Trip (Recommended)</span>
            </button>
            <button
              onClick={() => toggleRoundTrip(false)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                !isRoundTrip
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              One-Way Only
            </button>
          </div>
        </div>

        {/* Clear Affirmation Banner */}
        {isRoundTrip ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-xl bg-emerald-200/80 text-emerald-900 flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-800" />
              </div>
              <div className="text-xs">
                <div className="font-extrabold text-emerald-900 text-sm">
                  Yes, your budget includes the complete return journey!
                </div>
                <p className="text-emerald-800 leading-relaxed mt-0.5">
                  Transportation expenses cover <strong>both ways ({roundTripKm} km total)</strong>: your outbound highway drive, all {currentTrip.days}-day destination sightseeing travel, and the complete highway drive & FASTag tolls back to {currentTrip.from.split(',')[0]}.
                </p>
              </div>
            </div>

            {/* Outbound + Local + Return 3-Way Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-emerald-200/70 text-xs">
              <div className="p-2.5 bg-white/80 rounded-xl border border-emerald-100">
                <div className="font-bold text-slate-800 flex items-center gap-1">
                  <Car className="w-3.5 h-3.5 text-brand-600" /> Outbound Highway Drive
                </div>
                <div className="text-[11px] text-slate-600 mt-1">
                  Distance: <strong>{oneWayKm} km</strong> • Fuel: <strong>₹{outboundFuel.toLocaleString()}</strong> • Tolls: <strong>₹{outboundTolls}</strong>
                </div>
              </div>

              <div className="p-2.5 bg-white/80 rounded-xl border border-emerald-100">
                <div className="font-bold text-slate-800 flex items-center gap-1">
                  <span>🏖️</span> Destination Local Travel
                </div>
                <div className="text-[11px] text-slate-600 mt-1">
                  Local Sightseeing: <strong>~{localKm} km</strong> • Fuel: <strong>₹{localFuel.toLocaleString()}</strong>
                </div>
              </div>

              <div className="p-2.5 bg-white/80 rounded-xl border border-emerald-100">
                <div className="font-bold text-slate-800 flex items-center gap-1">
                  <ArrowRight className="w-3.5 h-3.5 text-sky-600" /> Return Journey Home
                </div>
                <div className="text-[11px] text-slate-600 mt-1">
                  Distance: <strong>{returnKm} km</strong> • Fuel: <strong>₹{returnFuel.toLocaleString()}</strong> • Tolls: <strong>₹{returnTolls}</strong>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-amber-900">Showing One-Way Expenses Only ({oneWayKm} km)</div>
              <p className="text-amber-800 mt-0.5">
                Fuel and highway toll costs are calculated solely for the outbound departure journey. Return drive fuel and return toll plazas are not included in this view.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Top Grand Total Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Total Cost */}
        <div className="p-6 bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 rounded-3xl text-white shadow-lg">
          <div className="flex items-center justify-between text-brand-200 text-xs font-semibold mb-2">
            <span>Estimated Total Trip Cost</span>
            <span className="px-2.5 py-0.5 rounded-full bg-brand-500/30 text-brand-300 text-[10px] font-bold">
              {isRoundTrip ? "Full Round Trip" : "One-Way"} • {travelers} Travelers • {currentTrip.days} Days
            </span>
          </div>
          <div className="text-4xl font-black text-white tracking-tight">
            ₹{grandTotal.toLocaleString()}
          </div>
          <div className="mt-3 text-xs text-brand-200/80 flex items-center justify-between">
            <span>
              {isRoundTrip ? "Includes round-trip fuel, tolls, stays & food" : "Includes one-way transport, stays & food"}
            </span>
            <span className="font-bold text-white text-sm">₹{perPerson.toLocaleString()} / person</span>
          </div>
        </div>

        {/* Visual Expense Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-3">
              <PieChart className="w-4 h-4 text-brand-600" />
              Expense Category Distribution
            </h4>

            {/* Stacked Progress Bar */}
            <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden flex shadow-inner">
              <div style={{ width: `${pTransport}%` }} className="bg-amber-500 h-full" title={`Transport: ${pTransport}%`} />
              <div style={{ width: `${pHotel}%` }} className="bg-indigo-600 h-full" title={`Stay: ${pHotel}%`} />
              <div style={{ width: `${pFood}%` }} className="bg-orange-500 h-full" title={`Food: ${pFood}%`} />
              <div style={{ width: `${pActivities}%` }} className="bg-emerald-500 h-full" title={`Activities: ${pActivities}%`} />
              <div style={{ width: `${pMisc}%` }} className="bg-purple-500 h-full" title={`Misc: ${pMisc}%`} />
            </div>

            {/* Legend */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Transport ({pTransport}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                <span>Stay ({pHotel}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                <span>Food ({pFood}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Activities ({pActivities}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span>Misc ({pMisc}%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editable Breakdown Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transportation */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Fuel className="w-4 h-4 text-amber-500" />
              Transportation & Highway Tolls
            </h4>
            <span className="font-extrabold text-slate-900 text-sm">₹{totalTransport.toLocaleString()}</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-slate-800 font-semibold block">
                  Fuel Expense ({isRoundTrip ? `Round Trip — ${roundTripKm} km` : `One-Way — ${oneWayKm} km`})
                </span>
                <span className="text-[10px] text-slate-400">
                  {isRoundTrip ? "Includes outbound + return + local sightseeing" : "Outbound corridor only"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span>₹</span>
                <input
                  type="number"
                  value={fuel}
                  onChange={(e) => updateBudgetCategory('transportation', 'fuel', e.target.value)}
                  className="w-28 px-2 py-1 border border-slate-200 rounded-lg text-right font-bold text-slate-800 focus:ring-1 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-slate-800 font-semibold block">
                  FASTag Highway Tolls ({isRoundTrip ? "Both Ways — 16 Plazas" : "One-Way — 8 Plazas"})
                </span>
                <span className="text-[10px] text-slate-400">
                  {isRoundTrip ? "Outbound tolls + Return highway tolls" : "Outbound plazas only"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span>₹</span>
                <input
                  type="number"
                  value={tolls}
                  onChange={(e) => updateBudgetCategory('transportation', 'tolls', e.target.value)}
                  className="w-28 px-2 py-1 border border-slate-200 rounded-lg text-right font-bold text-slate-800 focus:ring-1 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-slate-800 font-semibold block">Parking Fees ({currentTrip.days} Days)</span>
                <span className="text-[10px] text-slate-400">Forts, beaches, hotels, and markets</span>
              </div>
              <div className="flex items-center gap-1">
                <span>₹</span>
                <input
                  type="number"
                  value={parking}
                  onChange={(e) => updateBudgetCategory('transportation', 'parking', e.target.value)}
                  className="w-28 px-2 py-1 border border-slate-200 rounded-lg text-right font-bold text-slate-800 focus:ring-1 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-slate-800 font-semibold block">Emergency RSA & Fuel Buffer</span>
                <span className="text-[10px] text-slate-400">Contingency fund for punctures / detour</span>
              </div>
              <div className="flex items-center gap-1">
                <span>₹</span>
                <input
                  type="number"
                  value={emergencyBuffer}
                  onChange={(e) => updateBudgetCategory('transportation', 'emergencyBuffer', e.target.value)}
                  className="w-28 px-2 py-1 border border-slate-200 rounded-lg text-right font-bold text-slate-800 focus:ring-1 focus:ring-brand-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Accommodation */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Hotel className="w-4 h-4 text-indigo-600" />
              Accommodation
            </h4>
            <span className="font-extrabold text-slate-900 text-sm">₹{totalAccommodation.toLocaleString()}</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">Total Overnight Stays</span>
              <div className="flex items-center gap-1 font-bold text-slate-800">
                <span>{nights} Nights</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">Average Rate Per Room / Night</span>
              <div className="flex items-center gap-1">
                <span>₹</span>
                <input
                  type="number"
                  value={costPerNight}
                  onChange={(e) => updateBudgetCategory('accommodation', 'costPerNight', e.target.value)}
                  className="w-28 px-2 py-1 border border-slate-200 rounded-lg text-right font-bold text-slate-800 focus:ring-1 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="p-3 bg-indigo-50/60 rounded-xl text-indigo-900 text-[11px]">
              Covers 1 verified room in {currentTrip.budgetTier || 'Standard'} category across all overnight stops.
            </div>
          </div>
        </div>

        {/* Food & Dining */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Utensils className="w-4 h-4 text-orange-500" />
              Food & Dining (Both Ways)
            </h4>
            <span className="font-extrabold text-slate-900 text-sm">₹{totalFood.toLocaleString()}</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">Daily Food Allowance / Person</span>
              <div className="flex items-center gap-1">
                <span>₹</span>
                <input
                  type="number"
                  value={dailyPerPerson}
                  onChange={(e) => updateBudgetCategory('food', 'dailyPerPerson', e.target.value)}
                  className="w-28 px-2 py-1 border border-slate-200 rounded-lg text-right font-bold text-slate-800 focus:ring-1 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="p-3 bg-orange-50/60 rounded-xl text-orange-900 text-[11px]">
              Covers all breakfasts, highway dhabas, local seafood/thalis, and dinners for all {travelers} travelers across all {currentTrip.days} days (including the return drive).
            </div>
          </div>
        </div>

        {/* Activities & Misc */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Ticket className="w-4 h-4 text-emerald-500" />
              Activities & Miscellaneous
            </h4>
            <span className="font-extrabold text-slate-900 text-sm">₹{(totalActivities + totalMisc).toLocaleString()}</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">Sightseeing & Entry Tickets</span>
              <span className="font-bold text-slate-800">₹{totalActivities.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">Shopping & Local Souvenirs</span>
              <span className="font-bold text-slate-800">₹{totalMisc.toLocaleString()}</span>
            </div>

            <div className="p-3 bg-emerald-50/60 rounded-xl text-emerald-900 text-[11px]">
              Includes entry fees for scheduled forts, temples, boat tickets, and local sweets/souvenirs.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
