import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { 
  User, Mail, Phone, MapPin, Car, Fuel, Hotel, 
  IndianRupee, Utensils, Heart, ShieldCheck, Check, Save, Sparkles 
} from 'lucide-react';

export default function UserProfileModal() {
  const { userProfile, setUserProfile, showToast, setActiveView } = useTrip();

  const [formData, setFormData] = useState({ ...userProfile });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUserProfile(formData);
    showToast("Travel profile and preferences saved!", "success");
    setActiveView('dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-emerald-400 text-white font-black text-lg flex items-center justify-center shadow-md">
            {formData.name ? formData.name.charAt(0) : "U"}
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">{formData.name || "Aarav Sharma"}</h2>
            <p className="text-xs text-slate-500">{formData.email || "aarav.sharma@example.com"} • TripMate Voyager</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
          Personalized Profile Active
        </span>
      </div>

      {/* Preferences Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-brand-600" />
            Smart Travel Personalization (Section 23)
          </h3>
          <p className="text-xs text-slate-500">
            TripMate uses your default preferences to tailor hotel tiers, refueling intervals, driving speeds, and dining stops.
          </p>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-600 font-bold mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold text-slate-800"
            />
          </div>
          <div>
            <label className="block text-slate-600 font-bold mb-1">Email Address</label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold text-slate-800"
            />
          </div>
          <div>
            <label className="block text-slate-600 font-bold mb-1">Home Starting City</label>
            <input
              type="text"
              value={formData.homeCity || 'Mumbai, Maharashtra'}
              onChange={(e) => handleChange('homeCity', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold text-slate-800"
            />
          </div>
          <div>
            <label className="block text-slate-600 font-bold mb-1">Default FASTag Wallet ID</label>
            <input
              type="text"
              value={formData.fastagId || 'NETC-489201948'}
              onChange={(e) => handleChange('fastagId', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold text-slate-800"
            />
          </div>
        </div>

        {/* Travel Preferences Grid */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-600 font-bold mb-1">Preferred Stay Category</label>
            <select
              value={formData.preferredHotelCategory || 'Standard'}
              onChange={(e) => handleChange('preferredHotelCategory', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white font-semibold"
            >
              <option value="Budget">Budget Friendly (₹1,500 - ₹2,500)</option>
              <option value="Standard">Standard Boutique (₹3,000 - ₹5,000)</option>
              <option value="Premium">Premium 4-Star (₹6,000 - ₹9,000)</option>
              <option value="Luxury">Luxury 5-Star Resort (₹10,000+)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">Preferred Vehicle & Fuel</label>
            <select
              value={formData.preferredFuel || 'Petrol'}
              onChange={(e) => handleChange('preferredFuel', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white font-semibold"
            >
              <option value="Petrol">Petrol SUV / Car</option>
              <option value="Diesel">Diesel Long-Range</option>
              <option value="EV">Electric Vehicle (EV Fast-Charge)</option>
              <option value="CNG">CNG Bi-Fuel</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">Dietary Preference</label>
            <select
              value={formData.dietaryPreference || 'All'}
              onChange={(e) => handleChange('dietaryPreference', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white font-semibold"
            >
              <option value="All">All Food & Seafood</option>
              <option value="Pure Veg">Pure Vegetarian Only</option>
              <option value="Jain">Jain (No Root Veg / Onion)</option>
            </select>
          </div>
        </div>

        {/* Travel Pace & Family Mode */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-600 font-bold mb-1">Travel Pace</label>
            <select
              value={formData.travelPace || 'Balanced'}
              onChange={(e) => handleChange('travelPace', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white font-semibold"
            >
              <option value="Relaxed">Relaxed (Max 4-5 hrs drive/day, late starts)</option>
              <option value="Balanced">Balanced (Standard 6-8 hrs drive, scenic stops)</option>
              <option value="Fast-paced">Fast-paced (Cover max distance, early mornings)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">Family & Kids Mode</label>
            <div className="flex items-center gap-3 pt-2">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={formData.familyMode || false}
                  onChange={(e) => handleChange('familyMode', e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                />
                <span>Prioritize child-friendly stops & amenities</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setActiveView('dashboard')}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-brand-600/20 transition"
          >
            <Save className="w-4 h-4" />
            Save Profile & Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
