import React, { createContext, useContext, useState, useEffect } from 'react';
import { sampleTrips } from '../data/sampleTrips';
import { defaultChecklistCategories } from '../data/checklistData';
import { generateOrGetTrip } from '../utils/tripPlannerEngine';

const TripContext = createContext();

export function TripProvider({ children }) {
  // Saved trips in localStorage or default to sampleTrips
  const [savedTrips, setSavedTrips] = useState(() => {
    try {
      const saved = localStorage.getItem('tripmate_saved_trips');
      return saved ? JSON.parse(saved) : sampleTrips;
    } catch {
      return sampleTrips;
    }
  });

  // Current active trip
  const [currentTrip, setCurrentTrip] = useState(() => {
    return sampleTrips[0]; // Mumbai to Goa by default
  });

  // Active route index inside current trip (0 = Fastest, 1 = Scenic, 2 = Budget)
  const [activeRouteIndex, setActiveRouteIndex] = useState(0);

  // Round trip toggle (default true, since multi-day itineraries include return journey)
  const [isRoundTrip, setIsRoundTrip] = useState(true);

  // Active screen view: 'home' | 'dashboard' | 'my-trips' | 'explore' | 'admin' | 'profile' | 'print'
  const [activeView, setActiveView] = useState('dashboard');

  // Active tab within Dashboard:
  // 'overview' | 'map' | 'itinerary' | 'hotels' | 'restaurants' | 'fuel' | 'attractions' | 'budget' | 'weather' | 'safety' | 'checklist' | 'ai-assistant'
  const [activeDashboardTab, setActiveDashboardTab] = useState('overview');

  // Search / planner parameters
  const [searchParams, setSearchParams] = useState({
    from: "Mumbai, Maharashtra",
    to: "Goa (North & South)",
    days: 4,
    startDate: "2026-10-15",
    adults: 2,
    children: 1,
    travelMode: "Car",
    vehicleType: "Compact SUV",
    fuelType: "Petrol",
    mileage: 14.5,
    tankCapacity: 45,
    fuelPrice: 104.2,
    budgetTier: "Standard",
    travelStyle: "Balanced"
  });

  // User Profile & Personalization (Section 23)
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('tripmate_user_profile');
      return saved ? JSON.parse(saved) : {
        name: "Aarav Sharma",
        email: "aarav.sharma@example.com",
        phone: "+91 98765 43210",
        homeCity: "Mumbai, Maharashtra",
        preferredVehicle: "Car",
        preferredFuel: "Petrol",
        preferredHotelCategory: "Standard",
        typicalBudget: "Standard",
        dietaryPreference: "All", // All, Pure Veg, Jain, Halal
        travelPace: "Balanced",
        familyMode: true,
        fastagId: "NETC-489201948"
      };
    } catch {
      return {
        name: "Aarav Sharma",
        email: "aarav.sharma@example.com",
        preferredHotelCategory: "Standard"
      };
    }
  });

  // Checklist state
  const [checklist, setChecklist] = useState(() => {
    try {
      const saved = localStorage.getItem('tripmate_checklist');
      return saved ? JSON.parse(saved) : defaultChecklistCategories;
    } catch {
      return defaultChecklistCategories;
    }
  });

  // Modals & Popups
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedHotelForBooking, setSelectedHotelForBooking] = useState(null);

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Trigger toast
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync savedTrips to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tripmate_saved_trips', JSON.stringify(savedTrips));
    } catch (e) {
      console.warn("Storage error", e);
    }
  }, [savedTrips]);

  // Sync user profile
  useEffect(() => {
    try {
      localStorage.setItem('tripmate_user_profile', JSON.stringify(userProfile));
    } catch (e) {
      console.warn("Storage error", e);
    }
  }, [userProfile]);

  // Sync checklist
  useEffect(() => {
    try {
      localStorage.setItem('tripmate_checklist', JSON.stringify(checklist));
    } catch (e) {
      console.warn("Storage error", e);
    }
  }, [checklist]);

  // Plan or update trip
  const handlePlanTrip = (formParams) => {
    const combinedParams = { ...searchParams, ...formParams };
    setSearchParams(combinedParams);

    const generated = generateOrGetTrip({
      from: combinedParams.from,
      to: combinedParams.to,
      days: combinedParams.days,
      travelMode: combinedParams.travelMode,
      adults: combinedParams.adults,
      children: combinedParams.children,
      vehicle: {
        type: combinedParams.vehicleType,
        fuelType: combinedParams.fuelType,
        mileage: Number(combinedParams.mileage) || 14.5,
        tankCapacity: Number(combinedParams.tankCapacity) || 45,
        batteryCapacity: Number(combinedParams.batteryCapacity) || 50,
        fuelPrice: Number(combinedParams.fuelPrice) || 104.2
      },
      budgetTier: combinedParams.budgetTier,
      travelStyle: combinedParams.travelStyle,
      startDate: combinedParams.startDate
    });

    setCurrentTrip(generated);
    setActiveRouteIndex(0);
    setActiveView('dashboard');
    setActiveDashboardTab('overview');
    setIsPlanModalOpen(false);
    showToast(`Trip generated for ${generated.title}!`, 'success');
  };

  // Switch to a saved trip
  const selectSavedTrip = (tripId) => {
    const found = savedTrips.find((t) => t.id === tripId);
    if (found) {
      setCurrentTrip(found);
      setActiveRouteIndex(0);
      setActiveView('dashboard');
      showToast(`Loaded "${found.title}"`, 'info');
    }
  };

  // Save current trip to saved list
  const saveCurrentTrip = () => {
    const exists = savedTrips.some((t) => t.id === currentTrip.id);
    let updated;
    if (exists) {
      updated = savedTrips.map((t) => (t.id === currentTrip.id ? currentTrip : t));
      showToast("Trip updated in My Trips!", 'success');
    } else {
      updated = [currentTrip, ...savedTrips];
      showToast("Trip saved to My Trips!", 'success');
    }
    setSavedTrips(updated);
  };

  // Duplicate a trip
  const duplicateTrip = (tripId) => {
    const orig = savedTrips.find((t) => t.id === tripId);
    if (orig) {
      const copy = {
        ...JSON.parse(JSON.stringify(orig)),
        id: `trip-copy-${Date.now()}`,
        title: `${orig.title} (Copy)`
      };
      setSavedTrips([copy, ...savedTrips]);
      showToast(`Duplicated trip as "${copy.title}"`, 'success');
    }
  };

  // Delete a trip
  const deleteTrip = (tripId) => {
    if (savedTrips.length <= 1) {
      showToast("Cannot delete the only saved trip", 'error');
      return;
    }
    const filtered = savedTrips.filter((t) => t.id !== tripId);
    setSavedTrips(filtered);
    if (currentTrip.id === tripId) {
      setCurrentTrip(filtered[0]);
    }
    showToast("Trip removed from My Trips", 'info');
  };

  // Rename a trip
  const renameTrip = (tripId, newTitle) => {
    const updated = savedTrips.map((t) => (t.id === tripId ? { ...t, title: newTitle } : t));
    setSavedTrips(updated);
    if (currentTrip.id === tripId) {
      setCurrentTrip((prev) => ({ ...prev, title: newTitle }));
    }
    showToast("Trip renamed!", 'success');
  };

  // Switch active route (e.g. Fastest vs Scenic vs Budget)
  const switchRoute = (index) => {
    if (currentTrip?.routes && currentTrip.routes[index]) {
      setActiveRouteIndex(index);
      const chosen = currentTrip.routes[index];
      // Update overview distance & time to match selected route
      setCurrentTrip((prev) => ({
        ...prev,
        overview: {
          ...prev.overview,
          distance: chosen.distance,
          travelTime: chosen.time
        },
        routeAnalysis: {
          ...prev.routeAnalysis,
          totalKm: chosen.distance,
          totalHours: chosen.time,
          tollCost: chosen.tollCost,
          tollCount: chosen.tolls,
          fuelRequirementLiters: chosen.fuelRequired,
          fuelCost: chosen.fuelCost
        },
        budget: {
          ...prev.budget,
          transportation: {
            ...prev.budget.transportation,
            fuel: chosen.fuelCost,
            tolls: chosen.tollCost
          }
        }
      }));
      showToast(`Switched to: ${chosen.name}`, 'info');
    }
  };

  // Toggle checklist item
  const toggleChecklistItem = (categoryId, itemId) => {
    setChecklist((prev) =>
      prev.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          items: cat.items.map((item) =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          )
        };
      })
    );
  };

  // Add custom checklist item
  const addChecklistItem = (categoryId, title) => {
    if (!title.trim()) return;
    setChecklist((prev) =>
      prev.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          items: [
            ...cat.items,
            { id: `custom-${Date.now()}`, title: title.trim(), completed: false, required: false }
          ]
        };
      })
    );
    showToast("Item added to checklist!", 'success');
  };

  // Update budget item directly
  const updateBudgetCategory = (category, field, value) => {
    setCurrentTrip((prev) => {
      const newBudget = { ...prev.budget };
      if (newBudget[category]) {
        newBudget[category] = {
          ...newBudget[category],
          [field]: Number(value) || 0
        };
      }
      return { ...prev, budget: newBudget };
    });
  };

  // AI assistant modifications
  const mutateTripByAI = (mutationType, payload) => {
    setCurrentTrip((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      if (mutationType === 'REDUCE_DRIVE_PACE') {
        if (copy.itinerary && copy.itinerary.length >= 2) {
          copy.itinerary[1].morning.title = "Relaxed Morning & Scenic Late Breakfast";
          copy.itinerary[1].morning.desc = "Sleep in until 9:00 AM, poolside breakfast, and slow stroll instead of rushed sightseeing.";
          copy.itinerary[1].afternoon.title = "Afternoon Siesta & Spa Session";
          copy.itinerary[1].afternoon.desc = "Rejuvenating massage and tranquil beach lounger relaxation.";
        }
        showToast("AI adjusted itinerary for a more relaxing pace!", 'success');
      } else if (mutationType === 'CHEAPER_BUDGET') {
        if (copy.budget?.accommodation) {
          copy.budget.accommodation.costPerNight = Math.round(copy.budget.accommodation.costPerNight * 0.7);
        }
        if (copy.budget?.food) {
          copy.budget.food.dailyPerPerson = Math.round(copy.budget.food.dailyPerPerson * 0.75);
        }
        showToast("AI recalculated budget for budget-friendly alternatives!", 'success');
      } else if (mutationType === 'FAMILY_FRIENDLY') {
        copy.travelStyle = "Family";
        if (copy.itinerary && copy.itinerary[0]) {
          copy.itinerary[0].afternoon.desc += " (Kid-friendly parks & baby changing amenities included)";
        }
        showToast("AI optimized stops for family & kids!", 'success');
      }
      return copy;
    });
  };

  // Toggle round trip vs one way calculation
  const toggleRoundTrip = (value) => {
    const nextVal = typeof value === 'boolean' ? value : !isRoundTrip;
    setIsRoundTrip(nextVal);
    setCurrentTrip(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const bTrans = copy.budget?.transportation;
      if (bTrans) {
        if (nextVal) {
          bTrans.fuel = bTrans.roundTripFuel || (bTrans.oneWayFuel ? bTrans.oneWayFuel * 2 : bTrans.fuel);
          bTrans.tolls = bTrans.roundTripTolls || (bTrans.oneWayTolls ? bTrans.oneWayTolls * 2 : bTrans.tolls);
        } else {
          bTrans.fuel = bTrans.oneWayFuel || Math.round(bTrans.fuel / 2);
          bTrans.tolls = bTrans.oneWayTolls || Math.round(bTrans.tolls / 2);
        }
      }
      return copy;
    });
    showToast(nextVal ? "Budget updated: Full Round Trip (Includes Return Journey)" : "Budget updated: One-Way Journey Only", "info");
  };

  return (
    <TripContext.Provider
      value={{
        currentTrip,
        setCurrentTrip,
        activeRouteIndex,
        switchRoute,
        isRoundTrip,
        toggleRoundTrip,
        savedTrips,
        selectSavedTrip,
        saveCurrentTrip,
        duplicateTrip,
        deleteTrip,
        renameTrip,
        activeView,
        setActiveView,
        activeDashboardTab,
        setActiveDashboardTab,
        searchParams,
        setSearchParams,
        handlePlanTrip,
        userProfile,
        setUserProfile,
        checklist,
        toggleChecklistItem,
        addChecklistItem,
        updateBudgetCategory,
        mutateTripByAI,
        isPlanModalOpen,
        setIsPlanModalOpen,
        isSOSModalOpen,
        setIsSOSModalOpen,
        isShareModalOpen,
        setIsShareModalOpen,
        selectedHotelForBooking,
        setSelectedHotelForBooking,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
}
