import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { 
  Fuel, Zap, Gauge, MapPin, Navigation, Clock, 
  Star, ExternalLink, AlertCircle, CheckCircle2, ChevronRight, Phone
} from 'lucide-react';

export default function FuelChargingSection() {
  const { currentTrip, setCurrentTrip, isRoundTrip, toggleRoundTrip, showToast } = useTrip();

  if (!currentTrip) return null;

  const vehicle = currentTrip.vehicleDetails || {
    type: "Car",
    fuelType: "Petrol",
    mileage: 14.5,
    tankCapacity: 45,
    batteryCapacity: 50,
    fuelPrice: 104.2
  };

  const isEV = vehicle.fuelType === "EV";
  const oneWayKm = currentTrip.overview?.oneWayDistance || currentTrip.overview?.distance || 585;
  const returnKm = currentTrip.overview?.returnDistance || oneWayKm;
  const localKm = currentTrip.overview?.localDistance || 110;
  const roundTripKm = currentTrip.overview?.roundTripDistance || (oneWayKm + returnKm + localKm);
  const activeDistance = isRoundTrip ? roundTripKm : oneWayKm;

  const mileage = Number(vehicle.mileage) || 14.5;
  const fuelPrice = Number(vehicle.fuelPrice) || 104.2;

  // Real-time calculations
  const totalUnits = Number((activeDistance / mileage).toFixed(1)); // Litres or kWh
  const totalFuelCost = Math.round(totalUnits * fuelPrice);
  const tankCapacity = isEV ? (vehicle.batteryCapacity || 50) : (vehicle.tankCapacity || 45);
  const fullRangeKm = Math.round(tankCapacity * mileage);

  // Toggle Fuel Type demo switch
  const handleToggleFuelType = (newType) => {
    let newMileage = 14.5;
    let newPrice = 104.2;
    if (newType === 'Diesel') {
      newMileage = 16.5;
      newPrice = 92.4;
    } else if (newType === 'EV') {
      newMileage = 6.2; // km per kWh
      newPrice = 18.0; // ₹ per kWh at DC fast charger
    } else if (newType === 'CNG') {
      newMileage = 22.0; // km per kg
      newPrice = 86.0;
    }

    const updated = {
      ...currentTrip,
      vehicleDetails: {
        ...vehicle,
        fuelType: newType,
        mileage: newMileage,
        fuelPrice: newPrice
      }
    };
    setCurrentTrip(updated);
    showToast(`Vehicle profile set to ${newType}!`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Top Configuration & Overview Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              {isEV ? <Zap className="w-5 h-5 text-emerald-600" /> : <Fuel className="w-5 h-5 text-amber-600" />}
              {isEV ? "Electric Vehicle (EV) Charging & Route Planner" : "Fuel Consumption & Refueling Planner"}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Accurate consumption forecasting based on vehicle specs, highway topography, and current regional pricing.
            </p>
          </div>

          {/* Quick Fuel Type Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold self-start md:self-auto">
            {['Petrol', 'Diesel', 'CNG', 'EV'].map((ft) => (
              <button
                key={ft}
                onClick={() => handleToggleFuelType(ft)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  vehicle.fuelType === ft
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {ft === 'EV' ? '⚡ EV' : ft}
              </button>
            ))}
          </div>
        </div>

        {/* Journey Scope Selector Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Journey Scope:</span>
            <span className="text-slate-500">
              {isRoundTrip 
                ? `Full Round Trip (${roundTripKm} km: Outbound ${oneWayKm} km + Return ${returnKm} km + Local ${localKm} km)` 
                : `One-Way Outbound Drive (${oneWayKm} km)`}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => toggleRoundTrip(true)}
              className={`px-3 py-1.5 rounded-xl font-bold transition text-xs ${
                isRoundTrip 
                  ? 'bg-brand-600 text-white shadow-sm' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              ✓ Full Round Trip (Includes Return)
            </button>
            <button
              onClick={() => toggleRoundTrip(false)}
              className={`px-3 py-1.5 rounded-xl font-bold transition text-xs ${
                !isRoundTrip 
                  ? 'bg-slate-900 text-white shadow-sm' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              One-Way Only
            </button>
          </div>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">
              {isRoundTrip ? "Total Round-Trip Distance" : "One-Way Distance"}
            </span>
            <div className="text-2xl font-extrabold text-slate-900 mt-0.5">{activeDistance} km</div>
            <div className="text-slate-500 text-[11px] mt-1">
              {isRoundTrip ? "Outbound + Local + Return" : "One-way outbound only"}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">
              {isEV ? "Battery Consumption" : "Fuel Consumption"}
            </span>
            <div className="text-2xl font-extrabold text-slate-900 mt-0.5">
              ~{totalUnits} <span className="text-sm font-semibold">{isEV ? "kWh" : "Liters"}</span>
            </div>
            <div className="text-slate-500 text-[11px] mt-1">
              Mileage: {mileage} {isEV ? "km / kWh" : "km / L"}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">
              {isRoundTrip ? "Total Energy Cost (Both Ways)" : "One-Way Energy Cost"}
            </span>
            <div className="text-2xl font-extrabold text-emerald-700 mt-0.5">
              ₹{totalFuelCost.toLocaleString()}
            </div>
            <div className="text-slate-500 text-[11px] mt-1">
              Rate: ₹{fuelPrice} / {isEV ? "kWh" : "unit"}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Full Tank / Battery Range</span>
            <div className="text-2xl font-extrabold text-brand-700 mt-0.5">
              ~{fullRangeKm} km
            </div>
            <div className="text-slate-500 text-[11px] mt-1">
              Capacity: {tankCapacity} {isEV ? "kWh" : "L"}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Fuel Stop Schedule (Section 8 Requirement) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-brand-600" />
          Smart Recommended Refueling Schedule
        </h4>
        <p className="text-xs text-slate-500">
          TripMate automatically plans stops before your {isEV ? "battery drops below 20%" : "fuel drops below 25%"}, prioritizing verified highway stations with clean restrooms and dining.
        </p>

        <div className="space-y-3">
          {currentTrip.fuelSchedule?.map((stop, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-800 font-bold flex items-center justify-center flex-shrink-0">
                  {i === 0 ? "🏁" : i}
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">{stop.stage}</div>
                  <div className="text-slate-500 mt-0.5">
                    {stop.location ? `${stop.location} • ` : ""} At Km {stop.distanceKm}
                  </div>
                  <p className="text-slate-700 mt-1 font-medium">{stop.action}</p>
                </div>
              </div>

              <div className="bg-white px-3 py-2 rounded-xl border border-slate-200 text-right self-start md:self-auto min-w-[180px]">
                {stop.tankBefore && (
                  <div className="text-[11px] text-slate-500">
                    Tank/Battery: <span className="font-bold text-slate-800">{stop.tankBefore} ➔ {stop.tankAfter}</span>
                  </div>
                )}
                {stop.rangeLeft && (
                  <div className="text-[11px] text-emerald-700 font-semibold">{stop.rangeLeft}</div>
                )}
                {stop.notes && (
                  <div className="text-[10px] text-slate-400 mt-0.5 italic">{stop.notes}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Stations List */}
      <div className="space-y-4">
        <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-brand-600" />
          Verified Highway Stations Along Route
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentTrip.fuelStations?.map((st) => (
            <div
              key={st.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    {st.brand}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {st.rating}
                  </div>
                </div>

                <h5 className="font-bold text-slate-900 text-sm leading-snug">{st.name}</h5>
                <p className="text-xs text-slate-500 mt-0.5">{st.address}</p>

                {/* EV Charging Info if available */}
                {st.evCharging?.available && (
                  <div className="mt-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                      <Zap className="w-4 h-4 text-emerald-600" />
                      {st.evCharging.type}
                    </div>
                    <div className="text-[11px] text-emerald-700">
                      Speed: <strong>{st.evCharging.speed}</strong> • Est. Charge Time: <strong>{st.evCharging.estimatedChargeTime}</strong>
                    </div>
                    <div className="text-[11px] text-emerald-600 font-medium">
                      Status: {st.evCharging.availablePorts} of {st.evCharging.ports} charging guns currently free
                    </div>
                  </div>
                )}

                {/* Amenities */}
                {st.amenities?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {st.amenities.map((am, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium">
                        {am}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">{st.distanceFromRoute}</span>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(st.name + ' ' + st.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold flex items-center gap-1 transition"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Navigate
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
