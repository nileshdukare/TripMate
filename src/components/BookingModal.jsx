import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { 
  X, Hotel, Star, Check, Calendar, Users, 
  IndianRupee, ShieldCheck, Sparkles 
} from 'lucide-react';

export default function BookingModal() {
  const { 
    selectedHotelForBooking, 
    setSelectedHotelForBooking, 
    currentTrip, 
    showToast 
  } = useTrip();

  const [rooms, setRooms] = useState(1);
  const [nights, setNights] = useState(currentTrip?.days ? Math.max(1, currentTrip.days - 1) : 3);
  const [guestName, setGuestName] = useState("Aarav Sharma");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [isBooked, setIsBooked] = useState(false);

  if (!selectedHotelForBooking) return null;

  const h = selectedHotelForBooking;
  const roomPrice = h.pricePerNight * rooms * nights;
  const tax = Math.round(roomPrice * 0.12);
  const totalPrice = roomPrice + tax;

  const handleConfirm = (e) => {
    e.preventDefault();
    setIsBooked(true);
    showToast(`Reservation confirmed at ${h.name}!`, "success");
    setTimeout(() => {
      setSelectedHotelForBooking(null);
      setIsBooked(false);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hotel className="w-5 h-5 text-brand-400" />
            <h3 className="font-extrabold text-base">Hotel Booking Preview</h3>
          </div>
          <button
            onClick={() => setSelectedHotelForBooking(null)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isBooked ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
              ✓
            </div>
            <h4 className="text-xl font-black text-slate-900">Demo Reservation Created</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              A demo reservation summary was created for <strong>{h.name}</strong>. No real hotel booking or payment was processed.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl text-xs font-mono text-slate-600">
              Demo Reference: #TM-{Math.floor(100000 + Math.random() * 900000)}
            </div>
          </div>
        ) : (
          <form onSubmit={handleConfirm} className="p-6 space-y-4">
            {/* Hotel Mini Preview */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <img
                src={h.image}
                alt={h.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div>
                <span className="px-2 py-0.5 rounded-md bg-brand-100 text-brand-800 text-[10px] font-bold">
                  {h.category}
                </span>
                <h4 className="font-extrabold text-slate-900 text-sm mt-0.5 leading-snug">{h.name}</h4>
                <div className="text-xs text-slate-500">{h.location}</div>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-500 font-bold mb-1">Number of Rooms</label>
                <select
                  value={rooms}
                  onChange={(e) => setRooms(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold"
                >
                  <option value={1}>1 Room (2 Guests)</option>
                  <option value={2}>2 Rooms (4 Guests)</option>
                  <option value={3}>3 Rooms (6 Guests)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-bold mb-1">Duration (Nights)</label>
                <select
                  value={nights}
                  onChange={(e) => setNights(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold"
                >
                  {[1, 2, 3, 4, 5, 7].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Night' : 'Nights'}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-bold mb-1">Primary Guest Name</label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-bold mb-1">Mobile Contact</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold"
                />
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-500">
                <span>Room Charges ({rooms} room × {nights} nights):</span>
                <span>₹{roomPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Taxes & GST (12%):</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-extrabold text-slate-900 text-sm pt-1 border-t border-slate-200">
                <span>Total Due at Check-in:</span>
                <span className="text-emerald-700">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="text-[11px] text-emerald-700 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{h.cancellation || "Free cancellation up to 24 hours before check-in"}</span>
            </div>

            <div className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
              Demo only: connect a hotel booking provider before accepting real reservations or payments.
            </div>

            {/* Submit */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedHotelForBooking(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-extrabold shadow-md shadow-brand-600/20 transition flex items-center gap-1.5"
              >
                Create Demo Reservation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
