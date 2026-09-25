import React from 'react';
import { useTrip } from '../context/TripContext';
import { 
  ShieldAlert, Phone, Hospital, Wrench, Siren, 
  MapPin, AlertCircle, Share2, Navigation, CheckCircle2 
} from 'lucide-react';

export default function SafetyEmergency() {
  const { currentTrip, setIsSOSModalOpen } = useTrip();

  if (!currentTrip || !currentTrip.safetyEmergency) return null;

  const se = currentTrip.safetyEmergency;

  return (
    <div className="space-y-6">
      {/* SOS Hero Emergency Bar */}
      <div className="bg-gradient-to-r from-rose-600 via-rose-700 to-red-800 rounded-3xl p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-white/20">
              <Siren className="w-5 h-5 text-white" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-100">
              24x7 Highway Emergency Assistance
            </span>
          </div>
          <h3 className="text-2xl font-black text-white">
            Need Immediate Roadside or Medical Help?
          </h3>
          <p className="text-xs md:text-sm text-rose-100/90 leading-relaxed">
            Directly connect with National Highway Patrol (1033), 24x7 Trauma Centers, or certified towing flatbeds mapped across your trip corridor.
          </p>
        </div>

        <button
          onClick={() => setIsSOSModalOpen(true)}
          className="px-6 py-4 rounded-2xl bg-white text-rose-700 hover:bg-rose-50 text-sm font-extrabold shadow-2xl transition flex items-center justify-center gap-2 self-start md:self-auto flex-shrink-0"
        >
          <ShieldAlert className="w-5 h-5" />
          OPEN EMERGENCY SOS DESK
        </button>
      </div>

      {/* Emergency Hotline Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {se.sosNumbers?.map((sos, i) => (
          <div
            key={i}
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-slate-800">{sos.label}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{sos.desc}</p>
            </div>

            <a
              href={`tel:${sos.number}`}
              className="mt-4 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              Dial {sos.number}
            </a>
          </div>
        ))}
      </div>

      {/* Nearby 24/7 Hospitals & Towing RSA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hospitals */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Hospital className="w-5 h-5 text-red-600" />
            Highway Trauma Centers & Emergency Hospitals
          </h4>
          <div className="space-y-3">
            {se.nearbyHospitals?.map((hosp, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 text-sm leading-snug">{hosp.name}</div>
                  <div className="text-slate-500 mt-0.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{hosp.city} • {hosp.distance}</span>
                  </div>
                  {hosp.trauma24x7 && (
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-red-100 text-red-800 text-[10px] font-bold">
                      24/7 Trauma & Emergency ICU
                    </span>
                  )}
                </div>

                <a
                  href={`tel:${hosp.phone}`}
                  className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 flex items-center gap-1 font-semibold flex-shrink-0"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  Call
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Towing & Roadside Assistance */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Wrench className="w-5 h-5 text-amber-600" />
            24/7 Vehicle Breakdown, Crane & Flatbed Towing
          </h4>
          <div className="space-y-3">
            {se.towingServices?.map((tow, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 text-sm leading-snug">{tow.name}</div>
                  <div className="text-slate-500 mt-0.5">
                    Coverage: <strong className="text-slate-700">{tow.coverage}</strong>
                  </div>
                  <div className="text-emerald-700 text-[11px] font-medium mt-1">
                    Estimated arrival time: {tow.eta}
                  </div>
                </div>

                <a
                  href={`tel:${tow.phone}`}
                  className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 flex items-center gap-1 font-semibold flex-shrink-0"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  Call
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
