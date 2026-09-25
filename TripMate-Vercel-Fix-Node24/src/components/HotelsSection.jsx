import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { 
  Hotel, Star, MapPin, Check, Wifi, Car, Coffee, 
  ShieldCheck, ExternalLink, Zap, ArrowUpDown, Filter, Sparkles
} from 'lucide-react';

export default function HotelsSection() {
  const { currentTrip, setSelectedHotelForBooking, showToast } = useTrip();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'price-asc' | 'price-desc' | 'popularity'

  if (!currentTrip || !currentTrip.hotels) return null;

  const categories = ['All', 'Budget', 'Standard', 'Premium', 'Luxury', 'Couple', 'Family'];

  // Filter & Sort hotels
  let filteredHotels = currentTrip.hotels.filter(h => {
    if (selectedCategory === 'All') return true;
    return h.category?.toLowerCase() === selectedCategory.toLowerCase();
  });

  filteredHotels.sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-asc') return a.pricePerNight - b.pricePerNight;
    if (sortBy === 'price-desc') return b.pricePerNight - a.pricePerNight;
    if (sortBy === 'popularity') return b.reviewsCount - a.reviewsCount;
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Top Filter and Sort Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 md:pb-0">
          <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 flex items-center gap-1 font-medium">
            <ArrowUpDown className="w-3.5 h-3.5" /> Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
          >
            <option value="rating">Top Rated (Highest First)</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="popularity">Most Popular / Reviews</option>
          </select>
        </div>
      </div>

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              {/* Hotel Image with Badges */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/80 text-white backdrop-blur-md">
                    {hotel.category}
                  </span>
                  {hotel.featured && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-white flex items-center gap-1 shadow-sm">
                      <Sparkles className="w-3 h-3" /> TripMate Pick
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl text-xs font-bold text-slate-800 shadow-md flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{hotel.rating}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({hotel.reviewsCount})</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base leading-snug">
                    {hotel.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>{hotel.location}</span>
                  </div>
                </div>

                {/* Distance Information */}
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs space-y-1 text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">From Highway Route:</span>
                    <span className="font-semibold text-slate-700">{hotel.distanceFromRoute}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">To Sightseeing:</span>
                    <span className="font-semibold text-slate-700">{hotel.distanceFromAttractions}</span>
                  </div>
                </div>

                {/* Amenities Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {hotel.amenities?.slice(0, 5).map((amenity, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium"
                    >
                      {amenity}
                    </span>
                  ))}
                  {hotel.amenities?.length > 5 && (
                    <span className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-400 text-[11px]">
                      +{hotel.amenities.length - 5} more
                    </span>
                  )}
                </div>

                {/* Parking & Breakfast notes */}
                <div className="text-xs space-y-1 text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2">
                    <Car className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                    <span className="line-clamp-1">{hotel.parking}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coffee className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span className="line-clamp-1">{hotel.breakfast}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="text-[11px] text-emerald-700">{hotel.cancellation}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price & Book Now Footer */}
            <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Starting from</div>
                <div className="text-lg font-extrabold text-slate-900">
                  ₹{hotel.pricePerNight?.toLocaleString()}
                  <span className="text-xs font-normal text-slate-500"> / night</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedHotelForBooking(hotel)}
                className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-600/20 transition flex items-center gap-1.5"
              >
                BOOK NOW
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
