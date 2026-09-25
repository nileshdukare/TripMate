import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { 
  X, ShieldAlert, Phone, MapPin, Share2, 
  Siren, Check, AlertTriangle, Send 
} from 'lucide-react';

export default function SOSModal({ isOpen, onClose }) {
  const { currentTrip, showToast } = useTrip();
  const [copiedCoords, setCopiedCoords] = useState(false);

  if (!isOpen || !currentTrip) return null;

  const currentCoords = currentTrip.fromCoords || [19.0760, 72.8777];
  const coordString = `${currentCoords[0].toFixed(4)}° N, ${currentCoords[1].toFixed(4)}° E`;

  const emergencyMessage = `🚨 EMERGENCY SOS ALERT: Need immediate roadside assistance on route between ${currentTrip.from} and ${currentTrip.to}. My GPS location: ${coordString}. Vehicle: ${currentTrip.vehicleDetails?.type}. Please call back immediately.`;

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(coordString);
    setCopiedCoords(true);
    showToast("GPS coordinates copied to clipboard!", "success");
    setTimeout(() => setCopiedCoords(false), 2500);
  };

  const handleSendSOSMsg = () => {
    const encoded = encodeURIComponent(emergencyMessage);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-rose-500 w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-rose-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl animate-pulse">
              <Siren className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-black text-lg">Emergency SOS Highway Desk</h3>
              <p className="text-[11px] text-rose-100">Direct 24/7 National Emergency Dispatch</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-rose-100 hover:text-white hover:bg-rose-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Live Coordinates Box */}
          <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-600" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Current Highway Position</span>
                <span className="font-extrabold text-slate-900">{coordString}</span>
              </div>
            </div>
            <button
              onClick={handleCopyCoords}
              className="px-3 py-1.5 rounded-xl bg-white border border-rose-200 hover:bg-rose-100 text-rose-700 font-bold text-xs transition"
            >
              {copiedCoords ? "Copied!" : "Copy GPS"}
            </button>
          </div>

          {/* Quick Dial Grid */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              1-Tap Direct Emergency Call
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="tel:112"
                className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center gap-2 shadow-sm transition"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>112 (National SOS)</span>
              </a>

              <a
                href="tel:1033"
                className="p-3 rounded-2xl bg-brand-700 hover:bg-brand-800 text-white font-bold flex items-center gap-2 shadow-sm transition"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>1033 (Highway Patrol)</span>
              </a>

              <a
                href="tel:108"
                className="p-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold flex items-center gap-2 shadow-sm transition"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>108 (Ambulance)</span>
              </a>

              <a
                href="tel:100"
                className="p-3 rounded-2xl bg-slate-700 hover:bg-slate-600 text-white font-bold flex items-center gap-2 shadow-sm transition"
              >
                <Phone className="w-4 h-4 text-sky-400" />
                <span>100 (Police Helpline)</span>
              </a>
            </div>
          </div>

          {/* WhatsApp SOS Message Broadcast */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={handleSendSOSMsg}
              className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition"
            >
              <Send className="w-4 h-4" />
              Broadcast Emergency Alert with GPS on WhatsApp
            </button>
          </div>

          {/* Safety Protocols */}
          <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-600 space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Roadside Breakdown Protocol:
            </div>
            <ul className="list-disc pl-4 space-y-0.5 text-slate-500">
              <li>Pull completely onto highway paved shoulder and turn on hazard flashers.</li>
              <li>Place reflective warning triangle 50 meters behind vehicle.</li>
              <li>Remain behind highway crash barrier, never standing on live lane.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
