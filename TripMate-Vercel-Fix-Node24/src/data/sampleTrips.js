// Curated real-world road trips with rich practical journey details
export const sampleTrips = [
  {
    id: "mumbai-goa-4d",
    title: "Mumbai to Goa — Sun, Sand & Coastal Highway",
    from: "Mumbai, Maharashtra",
    to: "Goa (North & South)",
    fromCoords: [19.0760, 72.8777],
    toCoords: [15.4989, 73.8278],
    days: 4,
    startDate: "2026-10-15",
    returnDate: "2026-10-18",
    travelers: { adults: 2, children: 1 },
    travelMode: "Car",
    vehicleDetails: {
      type: "Compact SUV",
      fuelType: "Petrol",
      mileage: 14.5,
      tankCapacity: 45,
      fuelPrice: 104.2,
      batteryCapacity: 50,
      chargingSpeed: "60 kW DC"
    },
    budgetTier: "Standard",
    travelStyle: "Balanced",
    tags: ["Coastal Drive", "Beaches", "Seafood", "Forts", "Family-Friendly"],
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80",
    overview: {
      distance: 585,
      oneWayDistance: 585,
      returnDistance: 590,
      localDistance: 110,
      roundTripDistance: 1285,
      travelTime: "10 hr 45 min",
      roundTripTravelTime: "22 hr 30 min (Across 4 Days)",
      suggestedDeparture: "05:30 AM",
      suggestedArrival: "04:15 PM",
      returnJourney: "Return via NH 48 (Belgaum - Kolhapur - Pune - Mumbai) ~590 km / 10 hr 30 min on Day 4",
      roadConditions: "NH 66 4-laning completed on 85% stretch; smooth driving except 15 km single lane ghat section near Khed-Chiplun.",
      drivingWarning: "Day 1 involves 585 km driving (~10.5 hrs). We scheduled 2 refreshing breaks (breakfast at Pen, lunch at Chiplun). Consider starting by 5:30 AM to beat Navi Mumbai exit bottleneck.",
      weatherSummary: "Warm & sunny along coastal Konkan (28°C - 33°C), pleasant sea breeze in evenings, rain probability 10%."
    },
    routes: [
      {
        id: "route-fastest",
        name: "Route 1 — Fastest (NH 48 Golden Quadrilateral)",
        distance: 595,
        roundTripDistance: 1290,
        time: "10 hr 15 min",
        tolls: 8,
        tollCost: 710,
        roundTripTolls: 16,
        roundTripTollCost: 1420,
        fuelRequired: 41.0,
        roundTripFuelRequired: 89.0,
        fuelCost: 4272,
        roundTripFuelCost: 9274,
        badge: "Fastest Highway",
        description: "6-lane express highway via Pune, Satara, Kolhapur, then scenic Amboli Ghat descent into North Goa.",
        coordinates: [
          [19.0760, 72.8777],
          [18.9894, 73.1175], // Panvel
          [18.7557, 73.4091], // Lonavala
          [18.5204, 73.8567], // Pune
          [17.6805, 74.0183], // Satara
          [16.7050, 74.2433], // Kolhapur
          [16.1833, 74.3833], // Nipani
          [15.9610, 73.9997], // Amboli Ghat
          [15.9064, 73.8190], // Sawantwadi
          [15.4989, 73.8278]  // Panaji, Goa
        ]
      },
      {
        id: "route-scenic",
        name: "Route 2 — Scenic Konkan (NH 66 River & Coast)",
        distance: 570,
        roundTripDistance: 1260,
        time: "11 hr 20 min",
        tolls: 4,
        tollCost: 310,
        roundTripTolls: 8,
        roundTripTollCost: 620,
        fuelRequired: 39.3,
        roundTripFuelRequired: 86.9,
        fuelCost: 4095,
        roundTripFuelCost: 9055,
        badge: "Most Scenic",
        scenicAttractions: 12,
        description: "Winds through lush Western Ghats foothills, coastal rivers, mango orchards, and picturesque Konkan towns.",
        coordinates: [
          [19.0760, 72.8777],
          [18.9894, 73.1175], // Panvel
          [18.6974, 73.0903], // Pen
          [18.2325, 73.3082], // Mangaon
          [18.1500, 73.4200], // Mahad
          [17.5323, 73.5186], // Chiplun
          [17.1899, 73.6121], // Sangameshwar
          [16.6667, 73.6833], // Kankavli
          [15.9064, 73.8190], // Sawantwadi
          [15.4989, 73.8278]  // Panaji, Goa
        ]
      },
      {
        id: "route-budget",
        name: "Route 3 — Lowest Cost (Old NH 4 + State Highway)",
        distance: 565,
        roundTripDistance: 1240,
        time: "12 hr 05 min",
        tolls: 2,
        tollCost: 160,
        roundTripTolls: 4,
        roundTripTollCost: 320,
        fuelRequired: 38.9,
        roundTripFuelRequired: 85.5,
        fuelCost: 4053,
        roundTripFuelCost: 8909,
        badge: "Lowest Tolls",
        description: "Avoids major expressway tolls with state highway segments and affordable countryside dhabas.",
        coordinates: [
          [19.0760, 72.8777],
          [18.9894, 73.1175],
          [18.5204, 73.8567],
          [17.2800, 74.1800], // Karad
          [16.3500, 74.0500], // Radhanagari
          [15.7500, 73.9000], // Tilari
          [15.4989, 73.8278]
        ]
      }
    ],
    routeAnalysis: {
      totalKm: 585,
      roundTripKm: 1285,
      oneWayKm: 585,
      returnKm: 590,
      localKm: 110,
      totalHours: "10h 45m (One-Way)",
      roundTripHours: "22h 30m total drive",
      mainHighways: ["NH 48 (Mumbai-Pune Expressway)", "NH 66 (Mumbai-Goa Coastal Highway)", "State Highway 121 (Amboli)"],
      statesCrossed: ["Maharashtra", "Karnataka (border touch near Nipani)", "Goa"],
      majorTowns: ["Navi Mumbai", "Lonavala", "Pune bypass", "Satara", "Karad", "Kolhapur", "Sankeshwar", "Amboli", "Sawantwadi", "Mapusa"],
      tollCount: 8,
      roundTripTollCount: 16,
      tollCost: 710,
      roundTripTollCost: 1420,
      fuelRequirementLiters: 88.6,
      oneWayFuelLiters: 40.3,
      fuelCost: 9232,
      oneWayFuelCost: 4204,
      restBreaksRecommended: 3,
      mealBreaksRecommended: 2,
      suggestedOvernightStops: ["Kolhapur (Heritage & Mahalakshmi Temple)", "Chiplun (Riverview resorts)"]
    },
    itinerary: [
      {
        day: 1,
        date: "Day 1 — Thursday",
        title: "Mumbai Departure to North Goa via Scenic Amboli Ghat (Outbound Drive)",
        distance: "585 km (Outbound)",
        driveTime: "10 hr 15 min",
        estimatedSpend: "₹3,900",
        departure: {
          location: "Chembur / Vashi, Mumbai",
          time: "05:30 AM",
          note: "Early start beats expressway toll queue and allows smooth morning driving."
        },
        morning: {
          time: "08:30 AM",
          title: "Breakfast Break at Food Plaza, Pune Expressway",
          desc: "Relish hot Batata Vadas, Poha, Masala Tea, and South Indian idlis. Refuel vehicle if tank is below 70%.",
          cost: "₹450"
        },
        lunch: {
          time: "01:30 PM",
          title: "Traditional Kolhapuri Lunch at Hotel Opal, Kolhapur",
          desc: "Famous for Kolhapuri mutton/chicken thali, Tambda-Pandhra rassa, and authentic Solapur jowar bhakri (pure veg options available).",
          cost: "₹850"
        },
        afternoon: {
          time: "04:30 PM",
          title: "Amboli Ghat Waterfall & Viewpoint Stop",
          desc: "Breathtaking mist-covered mountain pass descending from Maharashtra into Goa. 25-minute photo stop and fresh roasted corn.",
          cost: "Free (₹60 snack)"
        },
        evening: {
          time: "06:15 PM",
          title: "Arrival at Vagator / Anjuna & Resort Check-in",
          desc: "Welcome drink, unpack, freshen up and walk to Vagator Sunset Point overlooking the red laterite cliffs.",
          cost: "Free"
        },
        night: {
          time: "08:30 PM",
          title: "Beachside Dinner at Curlies / Shiva Valley & Rest",
          desc: "Chill music, fresh grilled fish, Goan prawn curry, and mocktails by the ocean. Rest early after a long day of driving.",
          cost: "₹1,400"
        }
      },
      {
        day: 2,
        date: "Day 2 — Friday",
        title: "North Goa Heritage, Forts & Watersports (Local Sightseeing)",
        distance: "45 km (Local)",
        driveTime: "1 hr 30 min",
        estimatedSpend: "₹4,200",
        departure: {
          location: "Resort in Vagator",
          time: "08:30 AM",
          note: "Easy start after restful sleep."
        },
        morning: {
          time: "09:30 AM",
          title: "Explore 17th Century Aguada Fort & Lighthouse",
          desc: "Iconic Portuguese bastion standing guard at the mouth of the Mandovi River with panoramic Arabian Sea views.",
          cost: "₹100 entry for family"
        },
        lunch: {
          time: "01:00 PM",
          title: "Lunch at Fishermans Wharf, Calangute",
          desc: "Goan Fish Curry Thali, Crab Xec Xec, Bebinca dessert, and refreshing Kokum coolers.",
          cost: "₹1,200"
        },
        afternoon: {
          time: "03:00 PM",
          title: "Parasailing & Jet Ski at Anjuna Beach",
          desc: "Adrenaline-packed watersports session with certified instructors, lifejackets, and drone photography options.",
          cost: "₹2,500"
        },
        evening: {
          time: "06:30 PM",
          title: "Sunset at Chapora Fort (Dil Chahta Hai Fort)",
          desc: "Famous rampart walls overlooking Morjim estuary and the sun melting into the horizon.",
          cost: "Free"
        },
        night: {
          time: "08:45 PM",
          title: "Dinner & Night Market Stroll at Arpora",
          desc: "Live acoustic band, artisan crafts, homemade Goan spices, and gourmet burgers.",
          cost: "₹1,100"
        }
      },
      {
        day: 3,
        date: "Day 3 — Saturday",
        title: "Old Goa Heritage, Latin Quarter & Sunset Cruise (Local Sightseeing)",
        distance: "65 km (Local)",
        driveTime: "2 hr 10 min",
        estimatedSpend: "₹3,800",
        departure: {
          location: "North Goa to Panaji & Old Goa",
          time: "09:00 AM",
          note: "Scenic drive through the ribandar causeway along the river."
        },
        morning: {
          time: "10:00 AM",
          title: "Basilica of Bom Jesus & Se Cathedral (UNESCO Site)",
          desc: "Marvel at baroque architecture housing the sacred relics of St. Francis Xavier, followed by the largest church in Asia.",
          cost: "Free"
        },
        lunch: {
          time: "01:15 PM",
          title: "Heritage Lunch at Viva Panjim, Fontainhas",
          desc: "Tucked inside the Latin Quarter, serving authentic Pork Vindaloo, Prawn Balchao, and Mushroom Xacuti.",
          cost: "₹950"
        },
        afternoon: {
          time: "03:00 PM",
          title: "Walking Photography Tour of Fontainhas Latin Quarter",
          desc: "Charming cobblestone streets with brightly colored 18th-century Portuguese bungalows, tiled street names, and art cafes.",
          cost: "Free"
        },
        evening: {
          time: "05:45 PM",
          title: "Sunset River Cruise on Mandovi River",
          desc: "1-hour river cruise with Goan folk dance performance (Fugdi & Dekhni), DJ music, and views of the Atal Setu bridge.",
          cost: "₹1,500 for family"
        },
        night: {
          time: "08:30 PM",
          title: "Dinner at Black Sheep Bistro / Ritz Classic Panjim",
          desc: "Modern farm-to-table Goan fusion or royal fish thali.",
          cost: "₹1,350"
        }
      },
      {
        day: 4,
        date: "Day 4 — Sunday",
        title: "South Goa Beaches & Complete Return Journey to Mumbai",
        distance: "590 km (Return Drive Home)",
        driveTime: "10 hr 30 min",
        estimatedSpend: "₹4,100",
        departure: {
          location: "Panaji / Margao",
          time: "07:30 AM",
          note: "Packed bags ready, comfortable morning checkout."
        },
        morning: {
          time: "08:15 AM",
          title: "Colva Beach Morning Walk & Breakfast",
          desc: "White powdery sands of South Goa, breakfast at Martin's Corner (Goan poi sandwiches and filter coffee).",
          cost: "₹650"
        },
        lunch: {
          time: "01:30 PM",
          title: "Lunch Stop at Nipani / Belgaum Highway",
          desc: "Highway grand dhaba with fresh roti, dal makhani, and Belgaum's famous Kunda sweet souvenir.",
          cost: "₹750"
        },
        afternoon: {
          time: "04:30 PM",
          title: "Tea & Snack Break at Satara / Shirwal",
          desc: "Stretch legs, grab hot tea, and check tire pressure.",
          cost: "₹200"
        },
        evening: {
          time: "07:30 PM",
          title: "Pune-Mumbai Expressway Scenic Night Drive",
          desc: "Smooth lighted expressway cruise with dinner stop at Khalapur food mall.",
          cost: "₹850"
        },
        night: {
          time: "09:45 PM",
          title: "Safe Home Arrival in Mumbai",
          desc: "Unpack memorable souvenirs, photos, and relax with family.",
          cost: "Toll Fastag: ₹710"
        }
      }
    ],
    hotels: [
      {
        id: "hotel-1",
        name: "Heritage Village Resort & Spa",
        category: "Luxury",
        rating: 4.8,
        reviewsCount: 1420,
        pricePerNight: 7200,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
        location: "Arossim Beach, South Goa",
        distanceFromRoute: "3.2 km from NH 66",
        distanceFromAttractions: "300 m to white sand beach",
        amenities: ["Free Breakfast", "Swimming Pool", "Spa & Wellness", "EV Charging", "Valet Parking", "Free High-speed WiFi", "Pet Friendly"],
        parking: "Free Secure Valet Parking (EV Charger available)",
        breakfast: "Complimentary lavish multi-cuisine buffet",
        cancellation: "Free cancellation up to 48 hrs before check-in",
        featured: true
      },
      {
        id: "hotel-2",
        name: "Wanderers Nest Eco Boutique Hotel",
        category: "Standard",
        rating: 4.6,
        reviewsCount: 890,
        pricePerNight: 3800,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
        location: "Vagator Hilltop, North Goa",
        distanceFromRoute: "4.5 km from NH 66",
        distanceFromAttractions: "800 m to Chapora Fort & Vagator Beach",
        amenities: ["Free WiFi", "Infinity Pool", "Air Conditioning", "In-house Cafe", "Bicycle Rental", "Free Parking"],
        parking: "On-site gated parking",
        breakfast: "Continental & Indian breakfast included",
        cancellation: "Free cancellation up to 24 hrs before check-in",
        featured: true
      },
      {
        id: "hotel-3",
        name: "Ginger Goa Panaji",
        category: "Budget",
        rating: 4.3,
        reviewsCount: 1250,
        pricePerNight: 2600,
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80",
        location: "Patto Plaza, Panaji",
        distanceFromRoute: "1.0 km from NH 66 Atal Setu",
        distanceFromAttractions: "1.2 km to Latin Quarter Fontainhas",
        amenities: ["Free WiFi", "Fitness Center", "Restaurant", "Work Desks", "Free Parking"],
        parking: "Covered basement parking",
        breakfast: "Breakfast available at ₹250/person",
        cancellation: "Non-refundable discount rate",
        featured: false
      },
      {
        id: "hotel-4",
        name: "Grand Hyatt Goa",
        category: "Premium",
        rating: 4.9,
        reviewsCount: 2310,
        pricePerNight: 12500,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
        location: "Bambolim Bay, North Goa",
        distanceFromRoute: "2.1 km from NH 66",
        distanceFromAttractions: "Direct private bay access",
        amenities: ["Private Beach", "Multiple Pools", "Camp Hyatt for Kids", "EV Superchargers", "5 Gourmet Restaurants", "Spa"],
        parking: "24/7 Valet & EV Fast Charging",
        breakfast: "Grand international breakfast buffet included",
        cancellation: "Free cancellation up to 7 days before check-in",
        featured: true
      },
      {
        id: "hotel-5",
        name: "Casa Vagator Boutique Villa",
        category: "Couple",
        rating: 4.7,
        reviewsCount: 640,
        pricePerNight: 4900,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
        location: "Vagator Cliff, North Goa",
        distanceFromRoute: "5 km from NH 66",
        distanceFromAttractions: "Panoramic sea-cliff views",
        amenities: ["Cliff-edge Pool", "Sunset Lounge", "Romantic Candlelight Dining", "Free WiFi", "Air Conditioning"],
        parking: "Private driveway parking",
        breakfast: "Artisanal breakfast served at pool deck",
        cancellation: "Free cancellation up to 72 hrs before check-in",
        featured: false
      }
    ],
    fuelStations: [
      {
        id: "fuel-1",
        name: "IndianOil Swagat Highway Hub",
        brand: "IndianOil",
        type: "Petrol / Diesel / EV Fast Charger",
        distanceFromRoute: "On Expressway (Km 62 Outbound & Km 1220 Return)",
        distanceFromStart: 62,
        rating: 4.5,
        address: "Khalapur Food Plaza, Mumbai-Pune Expressway",
        hours: "24 Hours Open",
        phone: "+91 2192 278100",
        evCharging: {
          available: true,
          type: "CCS2 (60 kW DC) + Type 2 (22 kW AC)",
          speed: "60 kW DC Fast",
          estimatedChargeTime: "35 min (20% to 80%)",
          ports: 4,
          availablePorts: 3
        },
        amenities: ["Clean Restrooms", "McDonald's & Starbucks", "ATM", "Tire Pressure Station"]
      },
      {
        id: "fuel-2",
        name: "BPCL COCO Highway Oasis",
        brand: "BPCL",
        type: "Petrol / Diesel / Speed / CNG",
        distanceFromRoute: "Direct access NH 48 (Km 235 Outbound & Km 1050 Return)",
        distanceFromStart: 235,
        rating: 4.6,
        address: "Satara Bypass, NH 48, Maharashtra",
        hours: "24 Hours Open",
        phone: "+91 2162 245600",
        evCharging: {
          available: true,
          type: "Jio-bp pulse (120 kW Dual Gun)",
          speed: "120 kW Ultra Fast",
          estimatedChargeTime: "22 min (20% to 80%)",
          ports: 6,
          availablePorts: 5
        },
        amenities: ["24x7 Cafe Coffee Day", "Child Play Area", "Spotless Washrooms", "Nitrogen Air"]
      },
      {
        id: "fuel-3",
        name: "Shell Select Highway Station",
        brand: "Shell",
        type: "V-Power Petrol / Premium Diesel",
        distanceFromRoute: "100 m off NH 48 (Km 385)",
        distanceFromStart: 385,
        rating: 4.8,
        address: "Kolhapur North Entry, Shiroli",
        hours: "24 Hours Open",
        phone: "+91 231 2689120",
        evCharging: {
          available: true,
          type: "Shell Recharge (50 kW DC)",
          speed: "50 kW DC",
          estimatedChargeTime: "40 min",
          ports: 2,
          availablePorts: 2
        },
        amenities: ["Shell Select Deli", "Fresh Coffee & Sandwiches", "Digital Air Pressure", "Card/UPI Accepted"]
      },
      {
        id: "fuel-4",
        name: "HPCL Auto Care Centre",
        brand: "HPCL",
        type: "Petrol / Power Diesel / Auto LPG",
        distanceFromRoute: "On Amboli-Sawantwadi Road",
        distanceFromStart: 510,
        rating: 4.2,
        address: "Sawantwadi Bypass, SH 121",
        hours: "6:00 AM - 11:30 PM",
        phone: "+91 2363 272450",
        evCharging: {
          available: false
        },
        amenities: ["Clean Toilet", "Puncture Shop", "Lubricants", "UPI Payment"]
      }
    ],
    fuelSchedule: [
      {
        stage: "Start of Trip (Mumbai)",
        distanceKm: 0,
        action: "Depart with Full Tank (100% / 45 Liters)",
        rangeLeft: "650 km estimated range",
        notes: "Fill full tank in Mumbai at local pump before departure."
      },
      {
        stage: "Outbound Stop 1",
        distanceKm: 235,
        location: "BPCL COCO Oasis, Satara Bypass",
        action: "Refuel ~16 Liters (Cost: ~₹1,670)",
        tankBefore: "60%",
        tankAfter: "100%",
        batteryChargeEV: "Top up 25 min while stretching legs and having tea.",
        notes: "Cleanest highway washrooms on NH 48 stretch."
      },
      {
        stage: "Arrival in Goa (Local Stay)",
        distanceKm: 585,
        location: "Panaji / Mapusa",
        action: "Local travel ~110 km across beaches and forts. Top-up 8 Liters in Goa (cheaper petrol at ₹96.5/L).",
        notes: "Goa petrol is ~₹8/L cheaper than Maharashtra."
      },
      {
        stage: "Return Stop 1 (Day 4)",
        distanceKm: 830,
        location: "Belgaum / Kolhapur Bypass",
        action: "Refuel 24 Liters for return highway cruising",
        tankBefore: "45%",
        tankAfter: "100%",
        notes: "Check tyre pressure before expressway night drive."
      },
      {
        stage: "Return Stop 2 (Day 4 Evening)",
        distanceKm: 1140,
        location: "Pune-Mumbai Expressway Food Mall",
        action: "Top-up 12 Liters & dinner stop",
        tankBefore: "65%",
        tankAfter: "95%",
        notes: "Safe arrival home in Mumbai with reserve fuel."
      }
    ],
    restaurants: [
      {
        id: "rest-1",
        name: "Datta Snacks & Highway Eatery",
        cuisine: "Maharashtrian Fast Food & Breakfast",
        diet: "Pure Vegetarian",
        mealType: "Breakfast",
        rating: 4.7,
        approxCost: "₹200 per person",
        distanceFromRoute: "Direct highway service road (Pen / Mangaon)",
        hours: "6:00 AM - 10:30 PM",
        parking: "Ample parking for 50+ cars with security guards",
        popularDishes: ["Misal Pav with extra Tarri", "Batata Vada", "Thalipeeth", "Kothimbir Vadi", "Kokum Sharbat"]
      },
      {
        id: "rest-2",
        name: "Hotel Opal & Dehati",
        cuisine: "Authentic Kolhapuri & Maharashtrian",
        diet: "Veg & Non-Veg",
        mealType: "Lunch",
        rating: 4.8,
        approxCost: "₹450 per person",
        distanceFromRoute: "1.2 km from NH 48 Kolhapur exit",
        hours: "11:30 AM - 3:30 PM, 7:00 PM - 11:00 PM",
        parking: "Dedicated valet parking available",
        popularDishes: ["Special Mutton Thali", "Tambda-Pandhra Rassa", "Veg Kolhapuri with Bhakri", "Solkadhi"]
      },
      {
        id: "rest-3",
        name: "Fisherman's Wharf",
        cuisine: "Goan Seafood, Continental & Asian",
        diet: "Veg & Non-Veg",
        mealType: "Dinner",
        rating: 4.7,
        approxCost: "₹850 per person",
        distanceFromRoute: "Cavelossim & Calangute branches",
        hours: "12:00 PM - 11:30 PM",
        parking: "Large parking lot with security",
        popularDishes: ["Butter Garlic Tiger Prawns", "Kingfish Rava Fry", "Goan Fish Curry Rice", "Bebinca with Vanilla Ice Cream"]
      },
      {
        id: "rest-4",
        name: "Viva Panjim",
        cuisine: "Traditional Indo-Portuguese Heritage",
        diet: "Veg & Non-Veg",
        mealType: "Lunch",
        rating: 4.6,
        approxCost: "₹400 per person",
        distanceFromRoute: "Fontainhas, Panaji (1 km from route)",
        hours: "12:30 PM - 3:30 PM, 7:00 PM - 11:00 PM",
        parking: "Street parking near municipal garden",
        popularDishes: ["Prawn Balchao", "Chicken Xacuti", "Paneer Cafreal", "Caramel Custard"]
      },
      {
        id: "rest-5",
        name: "Navtara Pure Vegetarian",
        cuisine: "South Indian, North Indian, Thalis",
        diet: "Pure Vegetarian",
        mealType: "Breakfast / Lunch",
        rating: 4.4,
        approxCost: "₹250 per person",
        distanceFromRoute: "Branches on NH 66 Mapusa & Panaji",
        hours: "7:00 AM - 11:00 PM",
        parking: "Dedicated customer parking",
        popularDishes: ["Special South Indian Ghee Roast Dosa", "Chole Bhature", "Veg Thali", "Filter Kaapi"]
      }
    ],
    attractions: [
      {
        id: "attr-1",
        name: "Aguada Fort & 4-Story Lighthouse",
        category: "Historical Fort",
        image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600&q=80",
        rating: 4.7,
        openingHours: "9:30 AM - 6:00 PM (Daily)",
        entryFee: "₹50 adults, Free for children under 12",
        timeRequired: "1.5 - 2 hours",
        distanceFromHotel: "4.5 km",
        distanceFromRoute: "En-route North Goa",
        description: "Built in 1612 to protect against Dutch invaders, offering majestic 360-degree ocean views, historic freshwater spring, and historic prison museum.",
        inItinerary: true
      },
      {
        id: "attr-2",
        name: "Basilica of Bom Jesus (UNESCO World Heritage)",
        category: "Heritage & Religious",
        image: "https://images.unsplash.com/photo-1548013146-72479768bbaa?w=600&q=80",
        rating: 4.8,
        openingHours: "9:00 AM - 6:30 PM (Sundays 10:30 AM - 6:30 PM)",
        entryFee: "Free entry (Museum ₹20)",
        timeRequired: "1 hour",
        distanceFromHotel: "9 km from Panaji",
        distanceFromRoute: "2 km from NH 748",
        description: "World-famous baroque church holding the sacred relics of St. Francis Xavier. Adorned with intricate gilded wood carvings and marble flooring.",
        inItinerary: true
      },
      {
        id: "attr-3",
        name: "Fontainhas Latin Quarter",
        category: "Culture & Architecture",
        image: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=600&q=80",
        rating: 4.7,
        openingHours: "Open 24 hrs (Best 8:00 AM - 6:00 PM)",
        entryFee: "Free",
        timeRequired: "1.5 hours",
        distanceFromHotel: "Panaji Central",
        distanceFromRoute: "1.5 km",
        description: "Vibrant Mediterranean-style neighborhood with ochre, blue, and terracotta Portuguese heritage houses, wrought-iron balconies, and quaint bakeries.",
        inItinerary: true
      },
      {
        id: "attr-4",
        name: "Chapora Fort (Dil Chahta Hai Fort)",
        category: "Scenic Sunset Point",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80",
        rating: 4.6,
        openingHours: "Open Sunrise to Sunset",
        entryFee: "Free",
        timeRequired: "1 hour",
        distanceFromHotel: "1.2 km from Vagator",
        distanceFromRoute: "5 km from Mapusa",
        description: "High fortress walls rising above the Chapora river mouth, famous as the setting for Bollywood cult movie Dil Chahta Hai.",
        inItinerary: true
      },
      {
        id: "attr-5",
        name: "Dudhsagar Waterfalls & Jeep Safari",
        category: "Nature & Adventure",
        image: "https://images.unsplash.com/photo-1582650625119-3a31f841839d?w=600&q=80",
        rating: 4.9,
        openingHours: "7:00 AM - 3:00 PM (Permit required)",
        entryFee: "₹550 per person for Jeep Safari + Forest fee",
        timeRequired: "4 - 5 hours",
        distanceFromHotel: "45 km from Panaji",
        distanceFromRoute: "15 km detour from NH 48",
        description: "Spectacular 310-meter four-tiered milky white waterfall situated in Bhagwan Mahaveer Sanctuary. One of India's tallest waterfalls.",
        inItinerary: false
      }
    ],
    budget: {
      isRoundTrip: true,
      transportation: {
        fuel: 9232, // Full round-trip: 1,285 km / 14.5 * 104.2
        roundTripFuel: 9232,
        oneWayFuel: 4204,
        outboundFuel: 4204,
        returnFuel: 4240,
        localFuel: 788,
        tolls: 1420, // 8 plazas outbound (₹710) + return plazas (₹710) = ₹1,420
        roundTripTolls: 1420,
        oneWayTolls: 710,
        outboundTolls: 710,
        returnTolls: 710,
        parking: 450,
        emergencyBuffer: 1500
      },
      accommodation: {
        nights: 3,
        costPerNight: 3800,
        rooms: 1,
        total: 11400
      },
      food: {
        dailyPerPerson: 1000,
        travelers: 3,
        days: 4,
        total: 12000
      },
      activities: {
        watersports: 2500,
        fortTickets: 150,
        sunsetCruise: 1500,
        total: 4150
      },
      miscellaneous: {
        shoppingAndSouvenirs: 3000,
        snacksAndWater: 900,
        total: 3900
      }
    },
    weather: [
      {
        day: "Thu, Oct 15",
        location: "Mumbai to Kolhapur",
        tempHigh: 32,
        tempLow: 24,
        condition: "Clear & Sunny",
        rainProb: 5,
        wind: "12 km/h W",
        sunrise: "06:28 AM",
        sunset: "06:15 PM",
        advisory: "Favorable driving conditions. No severe weather alerts."
      },
      {
        day: "Fri, Oct 16",
        location: "North Goa Coast",
        tempHigh: 31,
        tempLow: 25,
        condition: "Sunny with Coastal Breeze",
        rainProb: 10,
        wind: "16 km/h SW",
        sunrise: "06:24 AM",
        sunset: "06:12 PM",
        advisory: "High UV index at midday (index 8). Apply sunscreen during watersports."
      },
      {
        day: "Sat, Oct 17",
        location: "Panaji & Old Goa",
        tempHigh: 32,
        tempLow: 24,
        condition: "Partly Cloudy",
        rainProb: 15,
        wind: "14 km/h W",
        sunrise: "06:25 AM",
        sunset: "06:11 PM",
        advisory: "Pleasant evening breeze suitable for Mandovi river cruise."
      },
      {
        day: "Sun, Oct 18",
        location: "Goa to Mumbai Return",
        tempHigh: 33,
        tempLow: 23,
        condition: "Sunny & Warm",
        rainProb: 5,
        wind: "10 km/h NW",
        sunrise: "06:27 AM",
        sunset: "06:14 PM",
        advisory: "Warm afternoon between Kolhapur and Pune; keep vehicle coolant topped."
      }
    ],
    safetyEmergency: {
      sosNumbers: [
        { label: "National Emergency SOS", number: "112", desc: "Immediate police, fire, medical response" },
        { label: "National Highway Patrol", number: "1033", desc: "Highway breakdown, ambulance & towing on NHAI routes" },
        { label: "Ambulance Emergency", number: "108", desc: "Free state emergency ambulance service" },
        { label: "Goa Tourist Police Helpline", number: "+91 832 2428800", desc: "24/7 dedicated tourist safety cell" }
      ],
      nearbyHospitals: [
        {
          name: "Chhatrapati Pramila Raje (CPR) Civil Hospital",
          city: "Kolhapur (NH 48)",
          distance: "1.5 km off highway",
          phone: "+91 231 2641555",
          trauma24x7: true
        },
        {
          name: "Goa Medical College & Hospital (Bambolim)",
          city: "Panaji, Goa",
          distance: "Direct access on NH 66",
          phone: "+91 832 2458700",
          trauma24x7: true
        },
        {
          name: "District Civil Hospital Sawantwadi",
          city: "Sawantwadi (Amboli Foothills)",
          distance: "800 m from main road",
          phone: "+91 2363 272021",
          trauma24x7: true
        }
      ],
      towingServices: [
        {
          name: "24x7 Konkan Highway Crane & Towing",
          coverage: "Panvel - Mahad - Chiplun - Sawantwadi",
          phone: "+91 98230 44551",
          eta: "30-45 minutes"
        },
        {
          name: "NH 48 Golden Quadrilateral RSA & Flatbed",
          coverage: "Pune - Satara - Kolhapur - Belgaum",
          phone: "+91 99750 12345",
          eta: "25-35 minutes"
        }
      ]
    }
  },

  {
    id: "shirdi-kukke-5d",
    title: "Shirdi to Kukke Shri Subrahmanya — Sacred Yatra",
    from: "Shirdi, Maharashtra",
    to: "Kukke Shri Subrahmanya, Karnataka",
    fromCoords: [19.7667, 74.4766],
    toCoords: [12.6631, 75.6174],
    days: 5,
    startDate: "2026-11-05",
    returnDate: "2026-11-09",
    travelers: { adults: 4, children: 0 },
    travelMode: "Car",
    vehicleDetails: {
      type: "7-Seater MPV (Innova Crysta / Ertiga)",
      fuelType: "Diesel",
      mileage: 15.0,
      tankCapacity: 55,
      fuelPrice: 91.5,
      batteryCapacity: 60,
      chargingSpeed: "60 kW DC"
    },
    budgetTier: "Standard",
    travelStyle: "Spiritual",
    tags: ["Spiritual Yatra", "Western Ghats", "Temples", "Scenic Route", "Family Pilgrimage"],
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
    overview: {
      distance: 1050,
      oneWayDistance: 1050,
      returnDistance: 940,
      localDistance: 110,
      roundTripDistance: 2100,
      travelTime: "18 hr 30 min",
      roundTripTravelTime: "37 hr total drive",
      suggestedDeparture: "05:00 AM",
      suggestedArrival: "Day 2 (Overnight stop at Belagavi/Hubballi)",
      returnJourney: "Return via Davanagere - Belgaum - Kolhapur - Ahmednagar ~940 km across Days 4 & 5",
      roadConditions: "Four-lane highway up to Hubballi; state highway through Sirsi/Shimoga ghats scenic with occasional winding curves.",
      drivingWarning: "1,050 km distance is too strenuous for a single driving day. Our smart planner splits the drive with an overnight rest at Hubballi (520 km on Day 1), ensuring 100% safety and fresh temple darshan.",
      weatherSummary: "Mild winter conditions (19°C - 30°C), cool morning mist in Western Ghats, comfortable for walking barefoot at temple premises."
    },
    routes: [
      {
        id: "route-fastest",
        name: "Route 1 — Via Solapur - Vijayapura - Hubballi - Shivamogga - Kukke",
        distance: 1050,
        roundTripDistance: 2100,
        time: "18 hr 30 min",
        tolls: 9,
        tollCost: 820,
        roundTripTolls: 18,
        roundTripTollCost: 1640,
        fuelRequired: 70.0,
        roundTripFuelRequired: 140.0,
        fuelCost: 6405,
        roundTripFuelCost: 12810,
        badge: "Recommended Pilgrimage Route",
        description: "Balanced roads with heritage temple stops at Vijayapura and Sirsi Marikamba temple en route.",
        coordinates: [
          [19.7667, 74.4766], // Shirdi
          [19.0952, 74.7480], // Ahmednagar
          [17.6599, 75.9064], // Solapur
          [16.8302, 75.7100], // Vijayapura (Bijapur)
          [16.1800, 75.6900], // Bagalkot
          [15.3647, 75.1240], // Hubballi
          [14.6200, 74.8400], // Sirsi
          [13.9299, 75.5681], // Shivamogga
          [13.0068, 76.1004], // Hassan / Sakleshpur
          [12.6631, 75.6174]  // Kukke Subrahmanya
        ]
      }
    ],
    routeAnalysis: {
      totalKm: 1050,
      roundTripKm: 2100,
      oneWayKm: 1050,
      returnKm: 940,
      localKm: 110,
      totalHours: "18h 30m (One-Way)",
      roundTripHours: "37h 00m total drive across 5 days",
      mainHighways: ["NH 160 (Shirdi-Ahmednagar)", "NH 52 (Solapur-Vijayapura-Hubballi)", "NH 69 & SH 114 (Western Ghats)"],
      statesCrossed: ["Maharashtra", "Karnataka"],
      majorTowns: ["Ahmednagar", "Solapur", "Vijayapura", "Hubballi", "Haveri", "Shivamogga", "Tirthahalli", "Kukke"],
      tollCount: 9,
      roundTripTollCount: 18,
      tollCost: 820,
      roundTripTollCost: 1640,
      fuelRequirementLiters: 140.0,
      oneWayFuelLiters: 70.0,
      fuelCost: 12810,
      oneWayFuelCost: 6405,
      restBreaksRecommended: 6,
      mealBreaksRecommended: 4,
      suggestedOvernightStops: ["Hubballi (Day 1 midway halt)", "Kukke Subrahmanya (Day 2 & 3 stay)", "Vijayapura (Return leg halt)"]
    },
    itinerary: [
      {
        day: 1,
        date: "Day 1",
        title: "Shirdi Darshan & Drive to Hubballi (Outbound Midway Halt)",
        distance: "515 km (Outbound Part 1)",
        driveTime: "8 hr 45 min",
        estimatedSpend: "₹4,100",
        departure: { location: "Shirdi Sai Baba Temple", time: "05:00 AM", note: "Kakad Aarti / Early Darshan completed before departure" },
        morning: { time: "08:30 AM", title: "Breakfast at Ahmednagar Highway", desc: "Fresh Poha, Sabudana Khichdi, and filter coffee.", cost: "₹360" },
        lunch: { time: "01:30 PM", title: "Lunch at Solapur Bypass", desc: "Shenga Chutney, Jowar Bhakri, and wholesome thali.", cost: "₹650" },
        afternoon: { time: "04:00 PM", title: "Stop at Vijayapura Gol Gumbaz (Whispering Gallery)", desc: "Quick 45-min architectural wonder stop.", cost: "₹120" },
        evening: { time: "07:30 PM", title: "Arrival & Check-in at Hotel Naveen, Hubballi", desc: "Rest at lakeside hotel after half-journey drive.", cost: "₹3,200" },
        night: { time: "08:45 PM", title: "North Karnataka Jolada Rotti Dinner", desc: "Authentic vegetarian supper.", cost: "₹700" }
      },
      {
        day: 2,
        date: "Day 2",
        title: "Hubballi through Western Ghats to Kukke Subrahmanya (Outbound Arrival)",
        distance: "385 km (Outbound Part 2)",
        driveTime: "7 hr 15 min",
        estimatedSpend: "₹3,400",
        departure: { location: "Hubballi Lakeview", time: "07:00 AM", note: "Scenic sunrise drive into dense Malenadu forests." },
        morning: { time: "10:00 AM", title: "Sirsi Marikamba Temple Darshan & Coffee Break", desc: "Historic Devi temple built in 1688.", cost: "Free" },
        lunch: { time: "01:30 PM", title: "Traditional Malnad Lunch at Tirthahalli / Sringeri", desc: "Steaming rice, Rasam, banana chips, and buttermilk.", cost: "₹600" },
        afternoon: { time: "04:30 PM", title: "Descent into Kukke Foothills along Kumaradhara River", desc: "Lush green valley surrounded by Shesha Parvatha hills.", cost: "Free" },
        evening: { time: "06:00 PM", title: "Holy Dip at Kumaradhara River & Temple Check-in", desc: "Ritual purification bath before temple entry.", cost: "Free" },
        night: { time: "08:00 PM", title: "Kukke Temple Mahapooja & Free Annadanam Dinner", desc: "Divine spiritual atmosphere with traditional brass lamps.", cost: "Free Annaprasadam" }
      },
      {
        day: 3,
        date: "Day 3",
        title: "Full Day Spiritual Seva at Kukke & Dharmasthala Excursion (Local Sightseeing)",
        distance: "110 km (Local Seva)",
        driveTime: "2 hr 45 min",
        estimatedSpend: "₹4,800",
        departure: { location: "Kukke Temple Guest House", time: "06:00 AM", note: "Traditional dhoti/saree dress code required for sanctum sanctorum." },
        morning: { time: "06:30 AM", title: "Ashlesha Bali / Sarpa Samskara Pooja at Kukke", desc: "World-renowned ritual for prosperity, peace, and overcoming obstacles.", cost: "Temple Seva Receipt" },
        lunch: { time: "12:30 PM", title: "Sacred Temple Annaprasadam Lunch", desc: "Satvik temple feast served with devotion.", cost: "Donation" },
        afternoon: { time: "03:00 PM", title: "Visit to Shri Kshetra Dharmasthala (Lord Manjunatha)", desc: "55 km scenic drive to the 800-year-old Shiva temple.", cost: "Free" },
        evening: { time: "06:30 PM", title: "Bahubali Monolithic Statue at Dharmasthala", desc: "39-foot monolithic stone statue on Ratnagiri hill.", cost: "Free" },
        night: { time: "08:30 PM", title: "Return to Kukke & Traditional Udupi Dinner", desc: "Mangalore buns, Bisi Bele Bath, and filter coffee.", cost: "₹550" }
      },
      {
        day: 4,
        date: "Day 4",
        title: "Return Leg Part 1 — Kukke to Belagavi / Kolhapur",
        distance: "490 km (Return Leg)",
        driveTime: "8 hr 30 min",
        estimatedSpend: "₹3,900",
        departure: { location: "Kukke Subrahmanya", time: "06:30 AM", note: "Begin return journey via scenic Shiradi Ghat." },
        morning: { time: "09:30 AM", title: "Sakleshpur Coffee Plantation Halt", desc: "Fresh estate coffee and aroma tasting.", cost: "₹300" },
        lunch: { time: "01:30 PM", title: "Highway Dhaba near Haveri / Hubballi", desc: "Pure vegetarian thali and South Indian delicacies.", cost: "₹650" },
        afternoon: { time: "04:30 PM", title: "Belagavi Fort & Kamal Basti Jain Temple", desc: "10th-century stone heritage complex.", cost: "Free" },
        evening: { time: "07:00 PM", title: "Check-in at Hotel Sayaji, Kolhapur", desc: "Comfortable night halt on NH 48.", cost: "₹3,400" },
        night: { time: "08:30 PM", title: "Dinner & Mahalakshmi Temple Night View", desc: "Peaceful blessings before final drive.", cost: "₹800" }
      },
      {
        day: 5,
        date: "Day 5",
        title: "Return Leg Part 2 — Kolhapur to Shirdi Safe Arrival",
        distance: "450 km (Final Return Leg)",
        driveTime: "7 hr 45 min",
        estimatedSpend: "₹2,600",
        departure: { location: "Kolhapur", time: "07:00 AM", note: "Smooth national highway drive." },
        morning: { time: "10:00 AM", title: "Breakfast Break at Satara Bypass", desc: "Fresh poha and hot tea.", cost: "₹350" },
        lunch: { time: "01:45 PM", title: "Lunch at Ahmednagar Royal Dhaba", desc: "Dal Tadka, Jeera Rice, and Bhakri.", cost: "₹600" },
        afternoon: { time: "04:30 PM", title: "Arrival at Shirdi", desc: "Complete successful, peaceful 5-day divine pilgrimage with family.", cost: "Tolls: ₹820" },
        evening: { time: "06:00 PM", title: "Final Evening Aarti at Shirdi Sai Sansthan", desc: "Heartfelt gratitude for a safe and spiritually uplifting journey.", cost: "Free" },
        night: { time: "08:00 PM", title: "Celebration Dinner & Rest", desc: "Wholesome feast.", cost: "₹800" }
      }
    ],
    hotels: [
      {
        id: "kukke-hotel-1",
        name: "Shri Subrahmanya Temple VIP Guest House",
        category: "Standard",
        rating: 4.6,
        reviewsCount: 2150,
        pricePerNight: 1800,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
        location: "Opposite Temple Car Street, Kukke",
        distanceFromRoute: "0.2 km from Temple Sanctum",
        distanceFromAttractions: "Walking distance to Kumaradhara River",
        amenities: ["24/7 Hot Water", "AC Rooms", "Gated Parking", "Elevator", "Pure Veg Canteen"],
        parking: "Large secure campus parking",
        breakfast: "Temple Annaprasadam canteen adjacent",
        cancellation: "Refundable up to 24 hrs",
        featured: true
      },
      {
        id: "kukke-hotel-2",
        name: "Sheshnaag Residency Kukke",
        category: "Premium",
        rating: 4.5,
        reviewsCount: 940,
        pricePerNight: 3200,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
        location: "Kukke Subrahmanya Main Road",
        distanceFromRoute: "500 m to Temple Entrance",
        distanceFromAttractions: "Direct view of Shesha Parvatha hill",
        amenities: ["Free WiFi", "Modern Bathrooms", "Room Service", "Pure Veg Restaurant", "Travel Desk"],
        parking: "Free covered basement parking",
        breakfast: "Complimentary breakfast included",
        cancellation: "Free cancellation up to 48 hrs",
        featured: true
      },
      {
        id: "kukke-hotel-3",
        name: "Hotel Naveen Lakeside, Hubballi (Midway Halt)",
        category: "Luxury",
        rating: 4.7,
        reviewsCount: 1680,
        pricePerNight: 4200,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
        location: "Unkal Lake, Hubballi",
        distanceFromRoute: "1.5 km from NH 48",
        distanceFromAttractions: "Unkal Lake boating front",
        amenities: ["Lakeside Lawn", "Swimming Pool", "Multi-cuisine Dining", "EV Charging Point", "Valet Parking"],
        parking: "Ample parking with 24/7 security",
        breakfast: "Grand buffet breakfast included",
        cancellation: "Free cancellation",
        featured: true
      }
    ],
    fuelStations: [
      {
        id: "shirdi-fuel-1",
        name: "BPCL Shirdi Highway Center",
        brand: "BPCL",
        type: "Diesel / Petrol / Speed",
        distanceFromRoute: "On Ahmednagar Highway",
        distanceFromStart: 12,
        rating: 4.6,
        address: "Nagar-Manmad Road, Shirdi",
        hours: "24 Hours Open",
        phone: "+91 2423 255100",
        evCharging: { available: true, type: "Tata Power (30 kW DC)", speed: "30 kW", estimatedChargeTime: "50 min", ports: 2, availablePorts: 2 },
        amenities: ["Restroom", "Drinking Water", "Air & Oil check"]
      },
      {
        id: "shirdi-fuel-2",
        name: "IndianOil COCO Vijayapura",
        brand: "IndianOil",
        type: "Diesel / Petrol / EV",
        distanceFromRoute: "NH 52 Bypass",
        distanceFromStart: 380,
        rating: 4.7,
        address: "Solapur-Hubballi Highway, Vijayapura",
        hours: "24 Hours Open",
        phone: "+91 8352 276400",
        evCharging: { available: true, type: "Jio-bp pulse (60 kW DC)", speed: "60 kW Fast", estimatedChargeTime: "35 min", ports: 4, availablePorts: 4 },
        amenities: ["Clean Restrooms", "Tea Kiosk", "Tyre Inflation"]
      },
      {
        id: "shirdi-fuel-3",
        name: "HPCL Highway Hub Hubballi",
        brand: "HPCL",
        type: "Power Diesel / Petrol",
        distanceFromRoute: "NH 48 Hubballi Bypass",
        distanceFromStart: 518,
        rating: 4.5,
        address: "Gabbur Cross, Hubballi",
        hours: "24 Hours Open",
        phone: "+91 836 2289400",
        evCharging: { available: true, type: "Zeon Charging (50 kW)", speed: "50 kW", estimatedChargeTime: "40 min", ports: 2, availablePorts: 1 },
        amenities: ["Highway Food Court", "Washrooms", "ATM"]
      }
    ],
    fuelSchedule: [
      { stage: "Start at Shirdi", distanceKm: 0, action: "Full Tank 55L Diesel", rangeLeft: "825 km estimated", notes: "Ensure tyre pressure is 33 PSI cold." },
      { stage: "Midway Refuel (Day 1 Evening)", distanceKm: 515, location: "Hubballi Bypass", action: "Refuel 34 Liters (~₹3,110)", tankBefore: "40%", tankAfter: "100%", notes: "Diesel in Karnataka is competitive and reliable." },
      { stage: "Ghat Ascent Refuel (Day 2)", distanceKm: 850, location: "Shivamogga / Sringeri Road", action: "Top-up 20 Liters before entering dense hill stretch", tankBefore: "65%", tankAfter: "100%", notes: "Sparse fuel stations on Kukke hill forest ghat." },
      { stage: "Return Journey Refuel (Day 4)", distanceKm: 1400, location: "Haveri Highway Pump", action: "Refuel 35 Liters for return leg", tankBefore: "40%", tankAfter: "100%", notes: "Smooth diesel supply." }
    ],
    restaurants: [
      {
        id: "kukke-rest-1",
        name: "Kukke Temple Annaprasadam Hall",
        cuisine: "Sacred Temple Food (Satvik)",
        diet: "Pure Vegetarian",
        mealType: "Lunch / Dinner",
        rating: 4.9,
        approxCost: "Free / Voluntary Donation",
        distanceFromRoute: "Inside Temple Premises",
        hours: "11:30 AM - 2:30 PM, 7:30 PM - 9:30 PM",
        parking: "Temple main parking lot",
        popularDishes: ["Steaming boiled rice with spiced sambar", "Payasam (Sweet Kheer)", "Traditional Buttermilk"]
      },
      {
        id: "kukke-rest-2",
        name: "Kamat Upachar Highway Restaurant",
        cuisine: "Udupi & South Indian Vegetarian",
        diet: "Pure Vegetarian",
        mealType: "Breakfast / Lunch",
        rating: 4.5,
        approxCost: "₹200 per person",
        distanceFromRoute: "Hubballi-Haveri NH 48",
        hours: "6:30 AM - 11:00 PM",
        parking: "Spacious highway parking",
        popularDishes: ["Mangalore Buns", "Maddur Vada", "Bisi Bele Bath with Boondi", "Strong Filter Coffee"]
      }
    ],
    attractions: [
      {
        id: "kukke-attr-1",
        name: "Shri Kukke Subrahmanya Swamy Temple",
        category: "Spiritual Sanctum",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80",
        rating: 4.9,
        openingHours: "6:00 AM - 1:30 PM, 3:30 PM - 8:30 PM",
        entryFee: "Free Darshan (Special Seva tickets available)",
        timeRequired: "2.5 - 3 hours",
        distanceFromHotel: "0.3 km",
        distanceFromRoute: "Destination Sanctum",
        description: "Revered serpent sanctuary nestled at the foot of Kumaraparvatha, visited by millions across India for Sarpa Dosha Nivarana.",
        inItinerary: true
      },
      {
        id: "kukke-attr-2",
        name: "Shri Kshetra Dharmasthala",
        category: "Ancient Temple & Charity Hub",
        image: "https://images.unsplash.com/photo-1582650625119-3a31f841839d?w=600&q=80",
        rating: 4.8,
        openingHours: "6:30 AM - 2:00 PM, 5:00 PM - 8:30 PM",
        entryFee: "Free",
        timeRequired: "2 hours",
        distanceFromHotel: "55 km from Kukke",
        distanceFromRoute: "Scenic detour",
        description: "Unique 800-year-old temple where deities are worshiped by Jain administrators and Hindu priests in harmony.",
        inItinerary: true
      }
    ],
    budget: {
      isRoundTrip: true,
      transportation: {
        fuel: 12810, // Full round-trip: 2,100 km / 15 * 91.5
        roundTripFuel: 12810,
        oneWayFuel: 6405,
        outboundFuel: 6405,
        returnFuel: 5736,
        localFuel: 671,
        tolls: 1640, // 9 plazas outbound (₹820) + return plazas (₹820)
        roundTripTolls: 1640,
        oneWayTolls: 820,
        outboundTolls: 820,
        returnTolls: 820,
        parking: 450,
        emergencyBuffer: 1500
      },
      accommodation: { nights: 4, costPerNight: 2800, rooms: 2, total: 22400 },
      food: { dailyPerPerson: 650, travelers: 4, days: 5, total: 13000 },
      activities: { poojaSeva: 4500, templeDonations: 2000, sightseeing: 500, total: 7000 },
      miscellaneous: { prasadAndSouvenirs: 3500, highwaySnacks: 1200, total: 4700 }
    },
    weather: [
      { day: "Day 1", location: "Shirdi to Hubballi", tempHigh: 31, tempLow: 19, condition: "Sunny & Dry", rainProb: 0, wind: "8 km/h E", sunrise: "06:15 AM", sunset: "06:05 PM", advisory: "Pleasant highway conditions." },
      { day: "Day 2", location: "Ghats to Kukke", tempHigh: 29, tempLow: 21, condition: "Pleasant Forest Mist", rainProb: 15, wind: "10 km/h W", sunrise: "06:18 AM", sunset: "06:09 PM", advisory: "Early morning ghat mist between 6 AM and 8 AM; use low beam headlights." },
      { day: "Day 3", location: "Kukke & Dharmasthala", tempHigh: 30, tempLow: 22, condition: "Partly Cloudy", rainProb: 10, wind: "12 km/h SW", sunrise: "06:19 AM", sunset: "06:10 PM", advisory: "Warm barefoot marble walking around 1 PM; morning darshan recommended." },
      { day: "Day 4", location: "Return via Hassan", tempHigh: 28, tempLow: 18, condition: "Clear Sky", rainProb: 5, wind: "9 km/h NE", sunrise: "06:17 AM", sunset: "06:08 PM", advisory: "Smooth highway return." },
      { day: "Day 5", location: "Arrival Shirdi", tempHigh: 30, tempLow: 17, condition: "Clear & Crisp", rainProb: 0, wind: "7 km/h E", sunrise: "06:16 AM", sunset: "06:06 PM", advisory: "Cool evening breeze upon return." }
    ],
    safetyEmergency: {
      sosNumbers: [
        { label: "National Emergency SOS", number: "112", desc: "Immediate police, fire, medical response" },
        { label: "Karnataka Highway Patrol", number: "1033 / 100", desc: "Highway patrol & roadside assistance" },
        { label: "Ambulance Emergency", number: "108", desc: "State 24/7 ambulance" }
      ],
      nearbyHospitals: [
        { name: "KIMS Multi-Speciality Hospital", city: "Hubballi", distance: "2 km off NH 48", phone: "+91 836 2374681", trauma24x7: true },
        { name: "KVG Medical College Hospital Sullia", city: "Sullia (Near Kukke)", distance: "18 km from Temple", phone: "+91 8257 231144", trauma24x7: true }
      ],
      towingServices: [
        { name: "Karnataka Western Ghats RSA & Towing", coverage: "Hubballi - Sirsi - Sullia - Kukke", phone: "+91 94480 33221", eta: "40 minutes" }
      ]
    }
  },

  {
    id: "delhi-manali-5d",
    title: "Delhi to Manali & Rohtang — Himalayan Road Adventure",
    from: "New Delhi, Delhi NCR",
    to: "Manali & Solang Valley, Himachal Pradesh",
    fromCoords: [28.6139, 77.2090],
    toCoords: [32.2396, 77.1887],
    days: 5,
    startDate: "2026-10-22",
    returnDate: "2026-10-26",
    travelers: { adults: 2, children: 0 },
    travelMode: "Car",
    vehicleDetails: {
      type: "4x4 SUV (Thar / Scorpio-N)",
      fuelType: "Diesel",
      mileage: 12.5,
      tankCapacity: 57,
      fuelPrice: 87.6,
      batteryCapacity: 60,
      chargingSpeed: "50 kW DC"
    },
    budgetTier: "Premium",
    travelStyle: "Adventure",
    tags: ["Himalayan Peaks", "High Altitude Pass", "Adventure", "Snow Points", "Scenic Valleys"],
    heroImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80",
    overview: {
      distance: 535,
      oneWayDistance: 535,
      returnDistance: 535,
      localDistance: 245,
      roundTripDistance: 1315,
      travelTime: "11 hr 30 min",
      roundTripTravelTime: "24 hr total driving",
      suggestedDeparture: "04:30 AM",
      suggestedArrival: "04:30 PM",
      returnJourney: "Return via Kiratpur - Chandigarh - Panipat - Delhi Expressway ~535 km on Day 5",
      roadConditions: "New Kiratpur-Nerchowk 4-lane expressway opened, slashing mountain drive time by 3.5 hours; smooth highway with safe modern tunnels.",
      drivingWarning: "Early start by 4:30 AM is vital to cross Delhi-Chandigarh border smoothly and reach Kullu valley in daylight. Mountain ghat driving requires engine braking on descents.",
      weatherSummary: "Crisp autumn mountain chill (4°C - 18°C), crystal clear blue skies over snow-capped peaks, light woolens essential."
    },
    routes: [
      {
        id: "route-fastest",
        name: "Route 1 — Via New Kiratpur Expressway & Pandoh Tunnels",
        distance: 535,
        roundTripDistance: 1315,
        time: "11 hr 30 min",
        tolls: 7,
        tollCost: 650,
        roundTripTolls: 14,
        roundTripTollCost: 1300,
        fuelRequired: 42.8,
        roundTripFuelRequired: 105.2,
        fuelCost: 3750,
        roundTripFuelCost: 9215,
        badge: "Fastest Scenic Expressway",
        description: "Delhi -> Murthal -> Ambala -> Kiratpur Sahib -> Bilaspur 4-lane tunnels -> Mandi -> Kullu -> Manali.",
        coordinates: [
          [28.6139, 77.2090], // Delhi
          [29.0200, 77.0700], // Murthal
          [29.3909, 76.9635], // Panipat
          [30.3782, 76.7767], // Ambala
          [30.9800, 76.5400], // Kiratpur
          [31.3400, 76.7600], // Bilaspur
          [31.7087, 76.9320], // Mandi
          [31.9579, 77.1095], // Kullu
          [32.2396, 77.1887]  // Manali
        ]
      }
    ],
    routeAnalysis: {
      totalKm: 535,
      roundTripKm: 1315,
      oneWayKm: 535,
      returnKm: 535,
      localKm: 245,
      totalHours: "11h 30m (One-Way)",
      roundTripHours: "24h 00m total road drive across 5 days",
      mainHighways: ["NH 44 (Delhi-Ambala)", "NH 205 (Chandigarh-Kiratpur)", "NH 21 / NH 3 (Kiratpur-Manali 4-Lane Expressway)"],
      statesCrossed: ["Delhi", "Haryana", "Punjab", "Himachal Pradesh"],
      majorTowns: ["Murthal", "Panipat", "Ambala", "Rupnagar", "Kiratpur", "Sundernagar", "Mandi", "Pandoh", "Aut", "Kullu", "Manali"],
      tollCount: 7,
      roundTripTollCount: 14,
      tollCost: 650,
      roundTripTollCost: 1300,
      fuelRequirementLiters: 105.2,
      oneWayFuelLiters: 42.8,
      fuelCost: 9215,
      oneWayFuelCost: 3750,
      restBreaksRecommended: 3,
      mealBreaksRecommended: 2,
      suggestedOvernightStops: ["Chandigarh (if breaking journey)", "Manali (Day 1-4 Basecamp)"]
    },
    itinerary: [
      {
        day: 1,
        date: "Day 1",
        title: "Delhi to Manali via Four-Lane Kiratpur Mountain Expressway (Outbound)",
        distance: "535 km (Outbound)",
        driveTime: "11 hr 30 min",
        estimatedSpend: "₹3,800",
        departure: { location: "Connaught Place / North Delhi", time: "04:30 AM", note: "Beat GT Karnal Road morning truck movement." },
        morning: { time: "06:15 AM", title: "Breakfast Feast at Amrik Sukhdev, Murthal", desc: "Tandoori Aloo-Pyaaz & White Butter Parathas, Kullhad Chai.", cost: "₹450" },
        lunch: { time: "01:00 PM", title: "Lunch at Highway Treat, Bilaspur / Mandi", desc: "Fresh river trout or Himachali Siddu with ghee and Dal Makhani.", cost: "₹750" },
        afternoon: { time: "03:45 PM", title: "Drive through Aut Tunnel & Beas River Valley", desc: "Spectacular 2.8 km tunnel opening into pristine green Kullu gorge.", cost: "Free" },
        evening: { time: "05:00 PM", title: "Arrival at Manali & Riverside Resort Check-in", desc: "Breathe in pure pine-scented mountain air beside Beas river.", cost: "Free" },
        night: { time: "08:00 PM", title: "Old Manali Wooden Cafe Dinner & Fireplace Chill", desc: "Woodfired trout pizza, hot spiced cider, and mountain stories.", cost: "₹1,200" }
      },
      {
        day: 2,
        date: "Day 2",
        title: "Atal Tunnel Expedition & Sissu Valley in Lahaul (Local Mountain Sights)",
        distance: "80 km (Local)",
        driveTime: "2 hr 45 min",
        estimatedSpend: "₹3,500",
        departure: { location: "Manali Resort", time: "08:30 AM", note: "Carry warm jackets and camera batteries." },
        morning: { time: "10:00 AM", title: "Passage through Atal Tunnel (World's Longest Highway Tunnel >10,000 ft)", desc: "9.02 km marvel crossing beneath the Rohtang Pass into dramatic barren trans-Himalayan Lahaul.", cost: "Free" },
        lunch: { time: "01:00 PM", title: "Lahauli Thukpa & Momos beside Sissu Waterfall", desc: "Steaming hot handmade Tibetan dumplings with view of 50-meter waterfall.", cost: "₹600" },
        afternoon: { time: "02:30 PM", title: "Zipline & River Crossing at Sissu Adventure Camp", desc: "Thrilling zipline across the glacial Chandra river.", cost: "₹1,500" },
        evening: { time: "05:30 PM", title: "Return to Solang Valley for ATV Quad Biking", desc: "Fun off-road trail riding through alpine meadows.", cost: "₹1,200" },
        night: { time: "08:30 PM", title: "Traditional Himachali Dham Dinner", desc: "Khatta, Madra, and Babru prepared in traditional copper vessels.", cost: "₹900" }
      },
      {
        day: 3,
        date: "Day 3",
        title: "Rohtang Pass (13,058 ft) Glacial Snow Point (Local High Altitude)",
        distance: "105 km (Local)",
        driveTime: "4 hr 15 min",
        estimatedSpend: "₹4,200",
        departure: { location: "Manali", time: "06:30 AM", note: "NGT Rohtang Eco-permit pre-booked." },
        morning: { time: "08:45 AM", title: "Ascent to Rohtang Top via Marhi Hairpin Bends", desc: "Snow fields, panoramic Pir Panjal peaks, and yak rides.", cost: "Permit ₹550" },
        lunch: { time: "01:00 PM", title: "Hot Maggi, Omelette & Tea at High Altitude Shacks", desc: "Nothing beats piping hot mountain noodles in freezing wind.", cost: "₹400" },
        afternoon: { time: "03:30 PM", title: "Visit Hadimba Devi Ancient Cedar Temple", desc: "1553 AD pagoda-style wooden temple enveloped in giant deodar forest.", cost: "Free" },
        evening: { time: "06:00 PM", title: "Stroll along Mall Road & Tibetan Monastery Market", desc: "Kullu woolen shawls, pure apricot oil, and handmade silver jewellery.", cost: "Shopping" },
        night: { time: "08:30 PM", title: "Cozy Dinner at Cafe 1947 with Live Guitar Music", desc: "Riverfront dining with craft pasta and mulled wine.", cost: "₹1,500" }
      },
      {
        day: 4,
        date: "Day 4",
        title: "Paragliding at Dobhi / Kullu & River Rafting (Local Adventure)",
        distance: "60 km (Local)",
        driveTime: "2 hr 00 min",
        estimatedSpend: "₹5,200",
        departure: { location: "Manali", time: "08:30 AM", note: "Wear sports shoes." },
        morning: { time: "10:00 AM", title: "High-Fly Tandem Paragliding at Dobhi (15-min Glide)", desc: "Soar 2,500 ft above the valley with certified pilot and GoPro footage.", cost: "₹3,200" },
        lunch: { time: "01:30 PM", title: "Riverside Lunch at Kullu Trout Farm", desc: "Fresh pan-fried Rainbow Trout with herbs and baked potatoes.", cost: "₹950" },
        afternoon: { time: "03:00 PM", title: "Grade 3 White Water Rafting on Beas River", desc: "7 km thrilling rapid ride with trained rescue kayakers.", cost: "₹1,800" },
        evening: { time: "06:00 PM", title: "Naggar Castle Heritage Exploration", desc: "Medieval wooden castle overlooking apple orchards and Roerich Art Gallery.", cost: "₹100" },
        night: { time: "08:30 PM", title: "Packing & Farewell Dinner in Manali", desc: "Warm fondue and bonfire under starry skies.", cost: "₹1,100" }
      },
      {
        day: 5,
        date: "Day 5",
        title: "Comfortable Return Journey from Manali to Delhi",
        distance: "535 km (Return Drive Home)",
        driveTime: "11 hr 00 min",
        estimatedSpend: "₹3,400",
        departure: { location: "Manali", time: "06:00 AM", note: "Start early to enjoy the valley in morning glow." },
        morning: { time: "09:30 AM", title: "Breakfast Halt at Sundernagar Lake", desc: "Aloo Parathas and tea.", cost: "₹350" },
        lunch: { time: "01:30 PM", title: "Lunch at Haveli Heritage, Murthal / Ambala", desc: "Punjabi Sarson da Saag & Makki di Roti.", cost: "₹800" },
        afternoon: { time: "04:30 PM", title: "Smooth Delhi Entry via Panipat Elevated Highway", desc: "Expressway bypass straight into Delhi Ring Road.", cost: "Toll: ₹650" },
        evening: { time: "06:30 PM", title: "Safe Arrival at Home in Delhi NCR", desc: "Trip complete with unforgettable Himalayan memories.", cost: "Free" }
      }
    ],
    hotels: [
      {
        id: "manali-hotel-1",
        name: "The Himalayan Luxury Castle & Resort",
        category: "Luxury",
        rating: 4.9,
        reviewsCount: 1120,
        pricePerNight: 8500,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
        location: "Hadimba Road, Manali",
        distanceFromRoute: "1.2 km from Mall Road",
        distanceFromAttractions: "Nestled inside apple orchards",
        amenities: ["Fireplace in Rooms", "Heated Pool", "Mountain View Balconies", "EV Chargers", "Apple Orchard Walks", "Gourmet Dining"],
        parking: "Private secure parking",
        breakfast: "Complimentary lavish buffet with fresh apple preserves",
        cancellation: "Free cancellation up to 48 hrs",
        featured: true
      },
      {
        id: "manali-hotel-2",
        name: "Larisa Resort Manali",
        category: "Premium",
        rating: 4.8,
        reviewsCount: 840,
        pricePerNight: 6200,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
        location: "Kullu-Manali Highway, Haripur",
        distanceFromRoute: "Right off NH 21",
        distanceFromAttractions: "Direct river and orchard frontage",
        amenities: ["Outdoor Jacuzzi", "Private Firepits", "Organic Farm-to-table", "Spa", "Free WiFi"],
        parking: "Free on-site valet",
        breakfast: "Farm fresh breakfast included",
        cancellation: "Free cancellation up to 3 days",
        featured: true
      }
    ],
    fuelStations: [
      {
        id: "delhi-fuel-1",
        name: "IndianOil COCO Karnal Lake",
        brand: "IndianOil",
        type: "Diesel / XP95 / EV",
        distanceFromRoute: "On NH 44 (Km 124)",
        distanceFromStart: 124,
        rating: 4.7,
        address: "Karnal Lake, GT Road, Haryana",
        hours: "24 Hours Open",
        phone: "+91 184 2271800",
        evCharging: { available: true, type: "Jio-bp pulse (60 kW)", speed: "60 kW DC", estimatedChargeTime: "30 min", ports: 4, availablePorts: 3 },
        amenities: ["Haldiram's & Costa Coffee", "Spotless Restrooms", "Free Nitrogen Air"]
      },
      {
        id: "delhi-fuel-2",
        name: "BPCL Mountain Hub Mandi",
        brand: "BPCL",
        type: "Diesel / Petrol / Speed",
        distanceFromRoute: "NH 21 Mandi Bypass",
        distanceFromStart: 415,
        rating: 4.5,
        address: "Mandi Valley Road, HP",
        hours: "24 Hours Open",
        phone: "+91 1905 224100",
        evCharging: { available: true, type: "Tata Power (50 kW)", speed: "50 kW", estimatedChargeTime: "40 min", ports: 2, availablePorts: 2 },
        amenities: ["Restrooms", "Puncture assistance", "Coolant refills"]
      }
    ],
    fuelSchedule: [
      { stage: "Start Delhi NCR", distanceKm: 0, action: "Full Tank 57L Diesel", rangeLeft: "710 km range", notes: "Top-up in Delhi NCR before highway entry." },
      { stage: "Outbound Stop 1", distanceKm: 290, location: "Kiratpur Foothills Highway Hub", action: "Refuel 25 Liters (~₹2,190)", tankBefore: "55%", tankAfter: "100%", notes: "Fill up before entering mountain highway stretch." },
      { stage: "Manali Arrival & Valley Travel", distanceKm: 535, location: "IndianOil Station Old Manali", action: "Top-up before Rohtang/Atal Tunnel high-altitude drive (245 km local exploration)", notes: "No pumps exist past Atal Tunnel in Lahaul for 110 km!" },
      { stage: "Return Leg Top-up (Day 5)", distanceKm: 980, location: "Sundernagar / Bilaspur Highway Hub", action: "Refuel 30 Liters for expressway return", tankBefore: "50%", tankAfter: "100%", notes: "Smooth plains return cruise." }
    ],
    restaurants: [
      { id: "manali-rest-1", name: "Amrik Sukhdev Murthal", cuisine: "Authentic North Indian Dhaba", diet: "Pure Vegetarian", mealType: "Breakfast", rating: 4.8, approxCost: "₹250 per person", distanceFromRoute: "Direct highway access NH 44", hours: "24x7 Open", parking: "Massive 200+ car parking lot", popularDishes: ["Tandoori Aloo Paratha with White Butter", "Chana Masala", "Kullhad Chai"] },
      { id: "manali-rest-2", name: "Cafe 1947 Old Manali", cuisine: "Italian, Continental & Mountain Cafe", diet: "Veg & Non-Veg", mealType: "Dinner", rating: 4.7, approxCost: "₹650 per person", distanceFromRoute: "Old Manali bridge", hours: "11:00 AM - 11:00 PM", parking: "Valley parking nearby", popularDishes: ["Wood-fired Quattro Formaggi Pizza", "Trout in Butter Garlic Sauce", "Hot Chocolate"] }
    ],
    attractions: [
      { id: "delhi-attr-1", name: "Atal Tunnel & Sissu Lahaul", category: "High Mountain Engineering & Glacial Valley", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80", rating: 4.9, openingHours: "Open 24 hrs (Weather permitting)", entryFee: "Free", timeRequired: "4 - 5 hours", distanceFromHotel: "28 km from Manali", distanceFromRoute: "NH 3 extension", description: "Longest tunnel above 10,000 ft connecting lush Kullu with mystical snow-capped Lahaul.", inItinerary: true },
      { id: "delhi-attr-2", name: "Rohtang Pass (13,058 ft)", category: "Glacial Mountain Pass", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80", rating: 4.8, openingHours: "6:00 AM - 5:00 PM (Closed Tuesdays for maintenance)", entryFee: "Green permit ₹550 per vehicle", timeRequired: "5 - 6 hours", distanceFromHotel: "51 km from Manali", distanceFromRoute: "Mountain highway switchbacks", description: "Famous gateway to Spiti and Ladakh with breathtaking 360-degree Himalayan panorama.", inItinerary: true }
    ],
    budget: {
      isRoundTrip: true,
      transportation: {
        fuel: 9215, // Full round-trip: 1,315 km / 12.5 * 87.6
        roundTripFuel: 9215,
        oneWayFuel: 3750,
        outboundFuel: 3750,
        returnFuel: 3750,
        localFuel: 1715,
        tolls: 1300, // 7 plazas outbound (₹650) + return plazas (₹650)
        roundTripTolls: 1300,
        oneWayTolls: 650,
        outboundTolls: 650,
        returnTolls: 650,
        parking: 500,
        emergencyBuffer: 1500
      },
      accommodation: { nights: 4, costPerNight: 6200, rooms: 1, total: 24800 },
      food: { dailyPerPerson: 1200, travelers: 2, days: 5, total: 12000 },
      activities: { paragliding: 6400, rafting: 3600, rohtangPermit: 550, atvQuad: 2400, total: 12950 },
      miscellaneous: { warmWoolens: 4000, souvenirsAndTea: 2000, total: 6000 }
    },
    weather: [
      { day: "Day 1", location: "Delhi to Kiratpur", tempHigh: 31, tempLow: 20, condition: "Sunny", rainProb: 0, wind: "10 km/h NW", sunrise: "06:27 AM", sunset: "05:46 PM", advisory: "Clear plains highway." },
      { day: "Day 2", location: "Atal Tunnel & Sissu", tempHigh: 12, tempLow: 2, condition: "Crisp & Cold", rainProb: 5, wind: "22 km/h N", sunrise: "06:30 AM", sunset: "05:42 PM", advisory: "Sub-zero windchill at north portal; thermal gloves and beanie recommended." },
      { day: "Day 3", location: "Rohtang Pass", tempHigh: 8, tempLow: -2, condition: "Clear Mountain Skies", rainProb: 10, wind: "25 km/h NW", sunrise: "06:31 AM", sunset: "05:41 PM", advisory: "Black ice possible in morning shade. Drive cautiously in 2nd gear." }
    ],
    safetyEmergency: {
      sosNumbers: [
        { label: "National Emergency SOS", number: "112", desc: "Immediate police, fire, medical" },
        { label: "Himachal Police Mountain Helpline", number: "1077 / +91 1902 252720", desc: "Search & rescue, road blocks & avalanche alerts" },
        { label: "108 Emergency Ambulance", number: "108", desc: "24/7 mountain ambulance" }
      ],
      nearbyHospitals: [
        { name: "Civil Hospital Manali (Oxygen Facility)", city: "Manali Mall Road", distance: "0.5 km", phone: "+91 1902 252341", trauma24x7: true },
        { name: "Regional Hospital Kullu", city: "Kullu Town", distance: "38 km", phone: "+91 1902 222350", trauma24x7: true }
      ],
      towingServices: [
        { name: "Manali 4x4 Mountain Recovery & RSA", coverage: "Kullu - Manali - Atal Tunnel - Rohtang", phone: "+91 98160 55443", eta: "30-45 minutes" }
      ]
    }
  }
];
