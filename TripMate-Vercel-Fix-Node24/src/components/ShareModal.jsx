import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { 
  X, Share2, Copy, Check, MessageSquare, 
  Send, ExternalLink, Printer 
} from 'lucide-react';

export default function ShareModal({ isOpen, onClose }) {
  const { currentTrip, showToast, setActiveView } = useTrip();
  const [copied, setCopied] = useState(false);

  if (!isOpen || !currentTrip) return null;

  const tripUrl = window.location.href;
  const whatsappSummary = `🚀 *TripMate Travel Plan: ${currentTrip.title}*\n\n` +
    `📍 *Route:* ${currentTrip.from} ➔ ${currentTrip.to}\n` +
    `📏 *Distance:* ${currentTrip.overview?.distance} km (${currentTrip.overview?.travelTime})\n` +
    `🗓️ *Duration:* ${currentTrip.days} Days (${currentTrip.startDate})\n` +
    `🚗 *Mode:* ${currentTrip.travelMode} (${currentTrip.vehicleDetails?.fuelType})\n\n` +
    `👉 View complete turn-by-turn map, hotels, and fuel stops on TripMate: ${tripUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(tripUrl);
    setCopied(true);
    showToast("Trip link copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(whatsappSummary);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-brand-400" />
            <h3 className="font-extrabold text-base">Share Itinerary</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h4 className="font-bold text-slate-900 text-sm">{currentTrip.title}</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Share this complete route plan with family, co-travelers, or friends.
            </p>
          </div>

          {/* WhatsApp Direct Share */}
          <button
            onClick={handleWhatsAppShare}
            className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition"
          >
            <MessageSquare className="w-4 h-4" />
            Share via WhatsApp
          </button>

          {/* Copy Link */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">Trip URL</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={tripUrl}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 font-mono"
              />
              <button
                onClick={handleCopyLink}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          {/* Print PDF trigger */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                onClose();
                setActiveView('print');
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              Download or Print PDF Itinerary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
