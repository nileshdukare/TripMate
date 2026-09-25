export const defaultChecklistCategories = [
  {
    id: "docs",
    category: "Documents & IDs",
    icon: "FileCheck",
    description: "Essential licenses, IDs, and reservation confirmations",
    items: [
      { id: "doc-1", title: "Valid Driving Licence (Physical & DigiLocker)", completed: true, required: true },
      { id: "doc-2", title: "Vehicle Registration Certificate (RC Book)", completed: true, required: true },
      { id: "doc-3", title: "Comprehensive Motor Insurance & PUC Certificate", completed: true, required: true },
      { id: "doc-4", title: "Active FASTag with at least ₹1,000 balance", completed: true, required: true },
      { id: "doc-5", title: "Government IDs (Aadhaar / Passport) for all travelers", completed: false, required: true },
      { id: "doc-6", title: "Confirmed Hotel & Attraction Bookings (PDF/Printed)", completed: false, required: false },
      { id: "doc-7", title: "Emergency roadside assistance membership card", completed: false, required: false }
    ]
  },
  {
    id: "vehicle",
    category: "Car / Bike Readiness",
    icon: "Wrench",
    description: "Inspection items to avoid breakdowns on highways",
    items: [
      { id: "veh-1", title: "Spare tyre inflated & tested to recommended PSI", completed: true, required: true },
      { id: "veh-2", title: "Jack, wheel spanner & reflective warning triangle", completed: true, required: true },
      { id: "veh-3", title: "Engine oil, brake fluid & radiator coolant topped", completed: false, required: true },
      { id: "veh-4", title: "Windshield washer fluid filled & wiper blades checked", completed: true, required: false },
      { id: "veh-5", title: "Tyre inflator pump & digital pressure gauge", completed: false, required: false },
      { id: "veh-6", title: "Jumper cables / jump starter powerbank", completed: false, required: false },
      { id: "veh-7", title: "Dashcam with high-endurance SD card formatted", completed: true, required: false }
    ]
  },
  {
    id: "personal",
    category: "Personal & Packing",
    icon: "Luggage",
    description: "Clothing, gadgets, and comfort essentials for the route",
    items: [
      { id: "per-1", title: "Weather-appropriate clothing & quick-dry outfits", completed: false, required: true },
      { id: "per-2", title: "UV Polarized Sunglasses & broad-spectrum sunscreen", completed: true, required: false },
      { id: "per-3", title: "High-capacity power bank (20,000 mAh) & charging cables", completed: true, required: true },
      { id: "per-4", title: "Comfortable driving shoes & flip-flops for beach/temples", completed: false, required: false },
      { id: "per-5", title: "Insulated stainless steel water flasks & energy snacks", completed: true, required: false },
      { id: "per-6", title: "Light sweater or jacket for air-conditioned cars/ghats", completed: false, required: false },
      { id: "per-7", title: "Travel neck pillow & eye mask for passengers", completed: false, required: false }
    ]
  },
  {
    id: "health",
    category: "Health & First-Aid",
    icon: "ShieldAlert",
    description: "Medical supplies and safety preparedness",
    items: [
      { id: "hea-1", title: "First-aid kit (Bandages, antiseptic Betadine, burn cream)", completed: true, required: true },
      { id: "hea-2", title: "Prescription daily medicines with 3 extra days buffer", completed: true, required: true },
      { id: "hea-3", title: "Motion sickness / vomiting medication for ghat roads", completed: false, required: true },
      { id: "hea-4", title: "ORS hydration sachets & pain relievers (Paracetamol)", completed: true, required: false },
      { id: "hea-5", title: "Hand sanitizers, wet disinfectant wipes & tissue rolls", completed: true, required: false },
      { id: "hea-6", title: "Mosquito repellent spray & anti-itch lotion", completed: false, required: false },
      { id: "hea-7", title: "Emergency LED torch with spare batteries", completed: true, required: false }
    ]
  }
];
