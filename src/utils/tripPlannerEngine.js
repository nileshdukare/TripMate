import { sampleTrips } from '../data/sampleTrips';

// Calculate distance between two lat-lng coordinates (Haversine formula in km)
export function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Generate practical travel plan
export function generateOrGetTrip(params) {
  const {
    from = "Mumbai, Maharashtra",
    to = "Goa",
    fromCoords,
    toCoords,
    days = 4,
    travelMode = "Car",
    adults = 2,
    children = 1,
    vehicle = {
      type: "Compact SUV",
      fuelType: "Petrol",
      mileage: 14.5,
      tankCapacity: 45,
      batteryCapacity: 50,
      fuelPrice: 104.2
    },
    budgetTier = "Standard",
    travelStyle = "Balanced",
    startDate = "2026-10-15"
  } = params;

  // Check if matches curated sample trips
  const fromLower = from.toLowerCase();
  const toLower = to.toLowerCase();

  if (
    (fromLower.includes("mumbai") || fromLower.includes("pune")) &&
    toLower.includes("goa")
  ) {
    const trip = JSON.parse(JSON.stringify(sampleTrips[0]));
    trip.days = Number(days);
    trip.travelers = { adults: Number(adults), children: Number(children) };
    trip.budgetTier = budgetTier;
    trip.travelStyle = travelStyle;
    trip.travelMode = travelMode;
    if (vehicle) trip.vehicleDetails = { ...trip.vehicleDetails, ...vehicle };
    recalculateTripStats(trip);
    return trip;
  }

  if (
    fromLower.includes("shirdi") &&
    (toLower.includes("kukke") || toLower.includes("subrahmanya") || toLower.includes("karnataka"))
  ) {
    const trip = JSON.parse(JSON.stringify(sampleTrips[1]));
    trip.days = Number(days);
    trip.travelers = { adults: Number(adults), children: Number(children) };
    trip.budgetTier = budgetTier;
    trip.travelStyle = travelStyle;
    trip.travelMode = travelMode;
    if (vehicle) trip.vehicleDetails = { ...trip.vehicleDetails, ...vehicle };
    recalculateTripStats(trip);
    return trip;
  }

  if (
    (fromLower.includes("delhi") || fromLower.includes("ncr") || fromLower.includes("chandigarh")) &&
    (toLower.includes("manali") || toLower.includes("solang") || toLower.includes("kullu") || toLower.includes("himachal"))
  ) {
    const trip = JSON.parse(JSON.stringify(sampleTrips[2]));
    trip.days = Number(days);
    trip.travelers = { adults: Number(adults), children: Number(children) };
    trip.budgetTier = budgetTier;
    trip.travelStyle = travelStyle;
    trip.travelMode = travelMode;
    if (vehicle) trip.vehicleDetails = { ...trip.vehicleDetails, ...vehicle };
    recalculateTripStats(trip);
    return trip;
  }

  // Dynamic generator for arbitrary routes
  return generateCustomTripPlan({
    from,
    to,
    fromCoords,
    toCoords,
    days: Number(days),
    travelMode,
    adults: Number(adults),
    children: Number(children),
    vehicle,
    budgetTier,
    travelStyle,
    startDate
  });
}

// Generate realistic custom trip plan for any from-to
export function generateCustomTripPlan({
  from,
  to,
  fromCoords: customFromCoords,
  toCoords: customToCoords,
  days = 3,
  travelMode = "Car",
  adults = 2,
  children = 0,
  vehicle,
  budgetTier = "Standard",
  travelStyle = "Balanced",
  startDate = "2026-10-15"
}) {
  // Approximate distance estimation based on string hash or real coords
  const hash = Math.abs(
    (from + to).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  );

  let fromCoords = customFromCoords || [19.0760 + ((hash % 10) * 0.1), 72.8777 + ((hash % 10) * 0.1)];
  let toCoords = customToCoords;
  let estimatedKm = 240 + (hash % 620);

  if (customFromCoords && customToCoords) {
    const direct = haversineDistance(customFromCoords[0], customFromCoords[1], customToCoords[0], customToCoords[1]);
    estimatedKm = Math.max(30, Math.round(direct * 1.25)); // 25% road curvature factor
  } else if (!toCoords) {
    toCoords = [fromCoords[0] - (estimatedKm / 111) * 0.7, fromCoords[1] + (estimatedKm / 111) * 0.7];
  }
  const avgSpeed = travelMode === "Flight" ? 500 : travelMode === "Train" ? 65 : 55;
  const totalTravelHours = (estimatedKm / avgSpeed).toFixed(1);
  const hours = Math.floor(estimatedKm / avgSpeed);
  const minutes = Math.round(((estimatedKm / avgSpeed) - hours) * 60);
  const travelTimeStr = travelMode === "Flight" ? "1 hr 45 min + airport transit" : `${hours} hr ${minutes} min`;

  // Start & Return dates
  const start = new Date(startDate);
  const returnD = new Date(start);
  returnD.setDate(start.getDate() + (days - 1));

  const fuelType = vehicle?.fuelType || "Petrol";
  const mileage = vehicle?.mileage || (fuelType === "Diesel" ? 16 : fuelType === "EV" ? 6.5 : 14);
  const fuelPrice = vehicle?.fuelPrice || (fuelType === "Diesel" ? 92 : fuelType === "EV" ? 18 : 104);
  
  const oneWayDistance = estimatedKm;
  const localDistance = days > 2 ? (days - 2) * 45 : 30;
  const returnDistance = estimatedKm;
  const roundTripDistance = (oneWayDistance * 2) + localDistance;

  const fuelRequiredOneWay = Number((oneWayDistance / mileage).toFixed(1));
  const fuelRequiredRoundTrip = Number((roundTripDistance / mileage).toFixed(1));
  const fuelCostOneWay = Math.round(fuelRequiredOneWay * fuelPrice);
  const fuelCostRoundTrip = Math.round(fuelRequiredRoundTrip * fuelPrice);

  const tollCountOneWay = Math.max(2, Math.floor(estimatedKm / 75));
  const tollCostOneWay = tollCountOneWay * 85;
  const tollCountRoundTrip = tollCountOneWay * 2;
  const tollCostRoundTrip = tollCostOneWay * 2;

  // Canonical values used by the custom-plan return object.
  // Keep these aligned with the round-trip totals used by the budget.
  const fuelRequired = fuelRequiredRoundTrip;
  const fuelCost = fuelCostRoundTrip;
  const tollCount = tollCountRoundTrip;
  const tollCost = tollCostRoundTrip;

  // Warning check
  let drivingWarning = null;
  if ((travelMode === "Car" || travelMode === "Bike") && estimatedKm > 550 && days <= 2) {
    drivingWarning = `This itinerary involves ${estimatedKm} km of travel over only ${days} days (~${travelTimeStr} driving on Day 1). We strongly recommend adding 1-2 overnight buffer days for driver safety.`;
  } else if (estimatedKm > 700) {
    drivingWarning = `Total distance is ${estimatedKm} km. Journey includes a planned midway rest break to avoid driving fatigue.`;
  }

  // Generate Day-by-Day
  const itinerary = [];
  for (let i = 1; i <= days; i++) {
    const currDate = new Date(start);
    currDate.setDate(start.getDate() + (i - 1));
    const dateFormatted = currDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

    let title, distanceStr, driveTimeDay, daySpend;
    let departure, morning, lunch, afternoon, evening, night;

    if (i === 1) {
      title = `${from} to ${to} — Journey & Arrival`;
      distanceStr = `${Math.min(estimatedKm, 550)} km`;
      driveTimeDay = `${Math.min(hours, 9)} hr 30 min`;
      daySpend = `₹${2800 + (adults * 500)}`;
      departure = {
        location: from,
        time: "06:00 AM",
        note: "Early departure recommended to beat initial urban traffic."
      };
      morning = {
        time: "09:00 AM",
        title: "Highway Breakfast & Coffee Break",
        desc: "Hot breakfast, freshly brewed coffee/tea, stretch and quick vehicle tire check.",
        cost: `₹${150 * (adults + children)}`
      };
      lunch = {
        time: "01:30 PM",
        title: "Midway Dining Stop",
        desc: "Popular highway family restaurant serving wholesome regional thalis and fresh food.",
        cost: `₹${280 * (adults + children)}`
      };
      afternoon = {
        time: "04:30 PM",
        title: `Arrival in ${to} & Check-in`,
        desc: `Check in to hotel, unpack, freshen up and relax with welcoming beverage.`,
        cost: "Free"
      };
      evening = {
        time: "06:30 PM",
        title: `${to} Landmark Stroll & Sunset View`,
        desc: `Explore central scenic promenade, local market, and enjoy twilight ambiance.`,
        cost: "Free"
      };
      night = {
        time: "08:30 PM",
        title: "Dinner & Early Rest",
        desc: "Savor local cuisine specialties at top-rated eatery. Rest well after road travel.",
        cost: `₹${350 * (adults + children)}`
      };
    } else if (i === days) {
      title = `${to} Farewell Sightseeing & Return Journey`;
      distanceStr = `${estimatedKm} km`;
      driveTimeDay = travelTimeStr;
      daySpend = `₹${3200 + (adults * 400)}`;
      departure = {
        location: `Hotel in ${to}`,
        time: "07:30 AM",
        note: "Packed and ready for relaxed return journey."
      };
      morning = {
        time: "08:30 AM",
        title: "Souvenir Shopping & Morning Cafe",
        desc: "Pick up authentic local handicrafts, regional spices, and sweet souvenirs.",
        cost: `₹1,200`
      };
      lunch = {
        time: "01:00 PM",
        title: "Highway Lunch Break",
        desc: "Grand highway dhaba with delicious flatbreads, gravies, and beverages.",
        cost: `₹${250 * (adults + children)}`
      };
      afternoon = {
        time: "04:00 PM",
        title: "Afternoon Refreshment & Fuel Top-up",
        desc: "Quick 20-min tea stop, refuel and clean windshield.",
        cost: `₹${60 * adults}`
      };
      evening = {
        time: "07:30 PM",
        title: `Safe Arrival Back in ${from}`,
        desc: "Trip successfully completed with lasting memories.",
        cost: `Tolls: ₹${tollCost}`
      };
      night = {
        time: "09:00 PM",
        title: "Home Relaxation & Photo Sorting",
        desc: "Unwind and reflect on a wonderful trip.",
        cost: "—"
      };
    } else {
      title = `Exploring ${to} — Highlights & Activities`;
      distanceStr = "35-50 km local";
      driveTimeDay = "1 hr 30 min";
      daySpend = `₹${3500 + (adults * 600)}`;
      departure = {
        location: `Hotel in ${to}`,
        time: "08:30 AM",
        note: "Comfortable start after complimentary breakfast."
      };
      morning = {
        time: "09:30 AM",
        title: travelStyle === "Spiritual" ? `Sacred Temple / Shrine Darshan in ${to}` : `Historic & Architectural Tour of ${to}`,
        desc: travelStyle === "Spiritual" 
          ? "Peaceful morning prayers, temple architecture walk, and spiritual blessings."
          : "Guided exploration of iconic historical landmarks, monuments, and viewpoints.",
        cost: `₹${100 * adults}`
      };
      lunch = {
        time: "01:00 PM",
        title: "Traditional Local Specialties Lunch",
        desc: "Savor celebrated local dishes at an authentic heritage dining venue.",
        cost: `₹${320 * (adults + children)}`
      };
      afternoon = {
        time: "03:30 PM",
        title: travelStyle === "Adventure" ? "Outdoor Adventure / Nature Activity" : "Nature Garden & Cultural Heritage Walk",
        desc: "Scenic walking trails, photography, artisan workshops, and picturesque landscapes.",
        cost: travelStyle === "Adventure" ? `₹${800 * adults}` : "₹150"
      };
      evening = {
        time: "06:30 PM",
        title: "Sunset Point & Lively Evening Market",
        desc: "Breathtaking twilight vistas followed by walking through vibrant bazaar streets.",
        cost: "Free"
      };
      night = {
        time: "08:30 PM",
        title: "Fine Dining & Musical Evening",
        desc: "Open-air dining experience with live music and gourmet hospitality.",
        cost: `₹${450 * (adults + children)}`
      };
    }

    itinerary.push({
      day: i,
      date: dateFormatted,
      title,
      distance: distanceStr,
      driveTime: driveTimeDay,
      estimatedSpend: daySpend,
      departure,
      morning,
      lunch,
      afternoon,
      evening,
      night
    });
  }

  // Cost estimates based on budget tier
  const hotelRateMap = { Economy: 2200, Standard: 4200, Premium: 7500, Luxury: 13500 };
  const dailyFoodMap = { Economy: 600, Standard: 1000, Premium: 1800, Luxury: 3000 };
  const hotelNightRate = hotelRateMap[budgetTier] || 4200;
  const foodPerPerson = dailyFoodMap[budgetTier] || 1000;
  const totalTravelers = adults + children;

  const budget = {
    isRoundTrip: true,
    transportation: {
      fuel: fuelCostRoundTrip,
      roundTripFuel: fuelCostRoundTrip,
      oneWayFuel: fuelCostOneWay,
      outboundFuel: fuelCostOneWay,
      returnFuel: fuelCostOneWay,
      localFuel: Math.round((localDistance / mileage) * fuelPrice),
      tolls: tollCostRoundTrip,
      roundTripTolls: tollCostRoundTrip,
      oneWayTolls: tollCostOneWay,
      outboundTolls: tollCostOneWay,
      returnTolls: tollCostOneWay,
      parking: 300 * days,
      emergencyBuffer: 1500
    },
    accommodation: {
      nights: Math.max(1, days - 1),
      costPerNight: hotelNightRate,
      rooms: Math.ceil(totalTravelers / 2),
      total: Math.max(1, days - 1) * hotelNightRate * Math.ceil(totalTravelers / 2)
    },
    food: {
      dailyPerPerson: foodPerPerson,
      travelers: totalTravelers,
      days,
      total: foodPerPerson * totalTravelers * days
    },
    activities: {
      entryTickets: 800 * adults,
      toursAndExperiences: 1200 * adults,
      total: 2000 * adults
    },
    miscellaneous: {
      shoppingAndSouvenirs: 2500,
      snacksAndRefreshments: 300 * days,
      total: 2500 + (300 * days)
    }
  };

  // Sample route coordinates interpolating between fromCoords and toCoords
  const routeCoords = [];
  const steps = 8;
  for (let s = 0; s <= steps; s++) {
    const lat = fromCoords[0] + (toCoords[0] - fromCoords[0]) * (s / steps) + (Math.sin(s) * 0.08);
    const lng = fromCoords[1] + (toCoords[1] - fromCoords[1]) * (s / steps) + (Math.cos(s) * 0.08);
    routeCoords.push([lat, lng]);
  }

  return {
    id: `custom-${Date.now()}`,
    title: `${from} to ${to} — ${days}-Day Complete Journey`,
    from,
    to,
    fromCoords,
    toCoords,
    days,
    startDate,
    returnDate: returnD.toISOString().split("T")[0],
    travelers: { adults, children },
    travelMode,
    vehicleDetails: {
      type: vehicle?.type || "Car / SUV",
      fuelType,
      mileage,
      tankCapacity: vehicle?.tankCapacity || 50,
      batteryCapacity: vehicle?.batteryCapacity || 55,
      fuelPrice
    },
    budgetTier,
    travelStyle,
    tags: [travelStyle, `${days} Days`, travelMode, budgetTier],
    heroImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80",
    overview: {
      distance: estimatedKm,
      oneWayDistance: estimatedKm,
      returnDistance: estimatedKm,
      localDistance: localDistance,
      roundTripDistance: roundTripDistance,
      travelTime: travelTimeStr,
      suggestedDeparture: "06:00 AM",
      suggestedArrival: `${hours + 6}:30 PM`,
      returnJourney: `Return via national highway corridor (~${estimatedKm} km / ${travelTimeStr})`,
      roadConditions: "National 4-lane highway with good tarmac; standard toll plazas with FASTag electronic toll collection.",
      drivingWarning: drivingWarning,
      weatherSummary: "Expected temperatures 24°C - 32°C, moderate humidity, light breeze, favorable road conditions."
    },
    routes: [
      {
        id: "route-fastest",
        name: "Route 1 — Fastest (Express Highway Corridor)",
        distance: estimatedKm,
        time: travelTimeStr,
        tolls: tollCount,
        tollCost: tollCost,
        fuelRequired,
        fuelCost,
        badge: "Fastest Highway",
        description: `Direct national highway route from ${from} to ${to} with maximum 4/6-lane expressway coverage.`,
        coordinates: routeCoords
      },
      {
        id: "route-scenic",
        name: "Route 2 — Scenic Countryside & Valleys",
        distance: Math.round(estimatedKm * 1.08),
        time: `${hours + 1} hr ${minutes} min`,
        tolls: Math.max(1, tollCount - 3),
        tollCost: Math.round(tollCost * 0.5),
        fuelRequired: Number((fuelRequired * 1.08).toFixed(1)),
        fuelCost: Math.round(fuelCost * 1.08),
        badge: "Scenic Detour",
        scenicAttractions: 7,
        description: "Estimated scenic alternative; exact roads and points of interest should be verified with live routing data.",
        coordinates: routeCoords.map(([lat, lng]) => [lat + 0.12, lng - 0.08])
      },
      {
        id: "route-budget",
        name: "Route 3 — Lower Toll Estimate",
        distance: Math.round(estimatedKm * 1.04),
        time: `${hours} hr ${minutes + 35} min`,
        tolls: Math.max(1, tollCount - 4),
        tollCost: Math.round(tollCost * 0.35),
        fuelRequired: Number((fuelRequired * 1.04).toFixed(1)),
        fuelCost: Math.round(fuelCost * 1.04),
        badge: "Lower Toll Estimate",
        description: "Estimated lower-toll alternative; exact tolls and road choices require live route/toll data.",
        coordinates: routeCoords.map(([lat, lng]) => [lat - 0.08, lng + 0.06])
      }
    ],
    routeAnalysis: {
      totalKm: estimatedKm,
      totalHours: travelTimeStr,
      mainHighways: ["National Expressway Corridor", "State Highway Connectors"],
      statesCrossed: ["State Regional Boundary", "Destination State"],
      majorTowns: [`${from} Outskirts`, "Midway Transit City", `${to} Gateway`],
      tollCount,
      tollCost,
      fuelRequirementLiters: fuelRequired,
      fuelCost,
      restBreaksRecommended: Math.max(1, Math.floor(estimatedKm / 200)),
      mealBreaksRecommended: Math.max(1, Math.floor(estimatedKm / 350)),
      suggestedOvernightStops: estimatedKm > 550 ? ["Midway Transit Town"] : []
    },
    itinerary,
    hotels: [
      {
        id: `h-1-${hash}`,
        name: `${to} Grand Heritage Resort`,
        category: "Luxury",
        rating: 4.8,
        reviewsCount: 920,
        pricePerNight: Math.round(hotelNightRate * 1.6),
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
        location: `Central ${to}`,
        distanceFromRoute: "1.8 km from main highway",
        distanceFromAttractions: "Walking distance to landmark",
        amenities: ["Swimming Pool", "Free Breakfast", "EV Charging Station", "Valet Parking", "Spa", "Free WiFi"],
        parking: "Free Secure Valet Parking",
        breakfast: "Complimentary luxury buffet",
        cancellation: "Free cancellation up to 48 hours",
        featured: true
      },
      {
        id: `h-2-${hash}`,
        name: `${to} Valley View Boutique Hotel`,
        category: "Standard",
        rating: 4.5,
        reviewsCount: 610,
        pricePerNight: hotelNightRate,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
        location: `Hilltop Enclave, ${to}`,
        distanceFromRoute: "3.5 km",
        distanceFromAttractions: "Direct sunset view",
        amenities: ["Free WiFi", "In-house Restaurant", "AC Rooms", "Free Parking", "Travel Desk"],
        parking: "Private on-site parking",
        breakfast: "Hot Indian & Continental breakfast included",
        cancellation: "Free cancellation up to 24 hours",
        featured: true
      },
      {
        id: `h-3-${hash}`,
        name: `Comfort Express Inn ${to}`,
        category: "Budget",
        rating: 4.2,
        reviewsCount: 430,
        pricePerNight: Math.round(hotelNightRate * 0.65),
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80",
        location: `Station Road, ${to}`,
        distanceFromRoute: "0.8 km",
        distanceFromAttractions: "1.5 km to main market",
        amenities: ["Free WiFi", "Power Backup", "24/7 Hot Water", "Elevator"],
        parking: "Covered ground floor parking",
        breakfast: "Breakfast available at ₹180",
        cancellation: "Non-refundable budget tariff",
        featured: false
      }
    ],
    fuelStations: [
      {
        id: `fs-1-${hash}`,
        name: "IndianOil Swagat Highway Hub",
        brand: "IndianOil",
        type: fuelType === "EV" ? "EV Ultra Fast Charger" : "Petrol / Diesel / XP95",
        distanceFromRoute: "Direct highway service road",
        distanceFromStart: Math.round(estimatedKm * 0.35),
        rating: 4.6,
        address: `National Highway Km ${Math.round(estimatedKm * 0.35)}`,
        hours: "24 Hours Open",
        phone: "+91 1800 2333 555",
        evCharging: {
          available: true,
          type: "CCS2 (60 kW DC Fast)",
          speed: "60 kW",
          estimatedChargeTime: "35 min (20% to 80%)",
          ports: 4,
          availablePorts: 3
        },
        amenities: ["Spotless Restrooms", "Food Court & Cafe", "ATM", "Digital Air Tower"]
      },
      {
        id: `fs-2-${hash}`,
        name: "BPCL COCO Highway Oasis",
        brand: "BPCL",
        type: "Petrol / Diesel / Speed / EV",
        distanceFromRoute: "On Expressway Corridor",
        distanceFromStart: Math.round(estimatedKm * 0.72),
        rating: 4.7,
        address: `Expressway Exit 14`,
        hours: "24 Hours Open",
        phone: "+91 1800 22 4344",
        evCharging: {
          available: true,
          type: "Jio-bp pulse (120 kW)",
          speed: "120 kW",
          estimatedChargeTime: "20 min",
          ports: 6,
          availablePorts: 4
        },
        amenities: ["24x7 Cafe", "Clean Family Restrooms", "Puncture Assistance", "UPI/Card"]
      }
    ],
    fuelSchedule: [
      {
        stage: "Start of Journey",
        distanceKm: 0,
        action: `Depart with 100% full ${fuelType === "EV" ? "battery charge" : "fuel tank"}`,
        rangeLeft: fuelType === "EV" ? "320 km range" : "650 km range",
        notes: `Top up before departing ${from}.`
      },
      {
        stage: "Recommended Stop 1",
        distanceKm: Math.round(estimatedKm * 0.5),
        location: "Midway Highway Station",
        action: fuelType === "EV" ? "Charge 30 min (20% to 80%)" : `Refuel ~${Math.round(fuelRequired * 0.6)} ${fuelType === "EV" ? "kWh" : "Liters"}`,
        tankBefore: "40%",
        tankAfter: "100%",
        notes: "Great stop for coffee, snacks and stretching."
      },
      {
        stage: `Arrival in ${to}`,
        distanceKm: estimatedKm,
        location: `${to} Gateway`,
        action: `Comfortable reserve remaining for city exploration.`,
        notes: "Abundant local charging & fuel points available."
      }
    ],
    restaurants: [
      {
        id: `r-1-${hash}`,
        name: "Grand Highway Oasis Dhaba & Cafe",
        cuisine: "Multi-Cuisine, North & South Indian",
        diet: "Veg & Non-Veg",
        mealType: "Breakfast & Lunch",
        rating: 4.7,
        approxCost: "₹250 per person",
        distanceFromRoute: "Direct highway service road",
        hours: "24 Hours Open",
        parking: "Secure 80-vehicle parking with guard",
        popularDishes: ["Special Dal Makhani & Butter Naan", "Poha & Filter Coffee", "Paneer Tikka"]
      },
      {
        id: `r-2-${hash}`,
        name: `${to} Royal Heritage Dining`,
        cuisine: "Authentic Regional Cuisine",
        diet: "Pure Vegetarian & Veg Options",
        mealType: "Dinner",
        rating: 4.8,
        approxCost: "₹500 per person",
        distanceFromRoute: `Inside ${to} Heritage District`,
        hours: "12:00 PM - 3:30 PM, 7:00 PM - 11:00 PM",
        parking: "Valet parking available",
        popularDishes: ["Signature Royal Thali", "Slow-cooked gravies", "Local Traditional Desserts"]
      }
    ],
    attractions: [
      {
        id: `attr-1-${hash}`,
        name: `${to} Central Historic Landmark & Viewpoint`,
        category: "Scenic & Heritage",
        image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600&q=80",
        rating: 4.7,
        openingHours: "9:00 AM - 6:00 PM",
        entryFee: "₹50 per adult",
        timeRequired: "2 hours",
        distanceFromHotel: "3.2 km",
        distanceFromRoute: "Central city",
        description: `Renowned landmark of ${to} showcasing architectural heritage, historical artifacts, and panoramic viewpoints.`,
        inItinerary: true
      },
      {
        id: `attr-2-${hash}`,
        name: `${to} Botanical Gardens & Lake Promenade`,
        category: "Nature & Relaxation",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80",
        rating: 4.6,
        openingHours: "6:00 AM - 7:00 PM",
        entryFee: "₹30 per person",
        timeRequired: "1.5 hours",
        distanceFromHotel: "2 km",
        distanceFromRoute: "City center",
        description: "Lush botanical gardens featuring exotic flora, tranquil walking paths, and boating on the pristine lake.",
        inItinerary: true
      }
    ],
    budget,
    weather: [
      { day: "Day 1", location: `${from} to ${to}`, tempHigh: 32, tempLow: 22, condition: "Estimated / Demo", rainProb: null, wind: "Demo value", sunrise: "Demo value", sunset: "Demo value", advisory: "Not a live forecast. Connect a weather API before relying on this information." },
      { day: "Day 2", location: to, tempHigh: 31, tempLow: 21, condition: "Estimated / Demo", rainProb: null, wind: "Demo value", sunrise: "Demo value", sunset: "Demo value", advisory: "Not a live forecast. Connect a weather API before relying on this information." },
      { day: "Day 3", location: `${to} & Return`, tempHigh: 33, tempLow: 22, condition: "Estimated / Demo", rainProb: null, wind: "Demo value", sunrise: "Demo value", sunset: "Demo value", advisory: "Not a live forecast. Connect a weather API before relying on this information." }
    ],
    safetyEmergency: {
      sosNumbers: [
        { label: "National Emergency SOS", number: "112", desc: "All-in-one Police, Fire, Ambulance" },
        { label: "Highway Patrol Helpline", number: "1033", desc: "NHAI National Highway Emergency Support" },
        { label: "Ambulance Medical SOS", number: "108", desc: "Free 24x7 Government Medical Emergency" }
      ],
      nearbyHospitals: [
        { name: `${to} District Super Speciality Hospital`, city: to, distance: "2.1 km from center", phone: "+91 1800 112 112", trauma24x7: true },
        { name: "Highway Trauma Care Center", city: "Midway Corridor", distance: "On Highway Mile 180", phone: "+91 1033", trauma24x7: true }
      ],
      towingServices: [
        { name: "National Roadside Assistance & Flatbed", coverage: "Nationwide Highway Network", phone: "+91 1800 209 7979", eta: "30-45 minutes" }
      ]
    }
  };
}

// Recalculates stats when user toggles route, travelers, or vehicle params
export function recalculateTripStats(trip) {
  if (!trip) return;
  const mileage = trip.vehicleDetails?.mileage || 14.5;
  const fuelPrice = trip.vehicleDetails?.fuelPrice || 104.2;
  const dist = trip.overview.distance;

  const fuelReq = Number((dist / mileage).toFixed(1));
  const fuelCost = Math.round(fuelReq * fuelPrice);

  trip.routeAnalysis.fuelRequirementLiters = fuelReq;
  trip.routeAnalysis.fuelCost = fuelCost;

  if (trip.budget?.transportation) {
    trip.budget.transportation.fuel = fuelCost;
  }
}
