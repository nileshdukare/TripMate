# TripMate — All-in-One Smart Travel Planning & Route Assistant

TripMate is a modern, professional, user-friendly travel planning application that answers:
> **“I want to travel from A to B for X days. Give me everything I need to plan and complete this trip.”**

---

## 🌟 Key Features & Functional Modules

### 1. Step 1: Intelligent Search & Planner Form
- **From / To**: Searchable origin and destination with quick popular route chips.
- **Dates & Auto Return**: Select departure date; return date is calculated automatically.
- **Duration**: Flexible duration selection (2 to 7+ days).
- **Travelers**: Adult and child count customization.
- **Multi-Modal Travel**: Car, Bike, Bus, Train, Flight.
- **Vehicle & Fuel Specs**:
  - Vehicle type (Compact SUV, Full-size SUV, Sedan, Hatchback, MPV, Bike)
  - Fuel type: Petrol, Diesel, CNG, and Electric (EV)
  - Mileage & battery capacity parameters for precise consumption calculations
- **Budget Tiers**: Economy, Standard, Premium, Luxury.
- **Travel Styles**: Relaxed, Balanced, Fast-paced, Adventure, Family, Spiritual, Nature, Historical, Food, Shopping, Mixed.

---

### 2. Turn-Key Trip Results Dashboard
- **Trip Overview**:
  - Total road distance (km) and driving duration
  - Suggested departure & arrival times
  - Return journey route information
  - Road condition reports (e.g. NH 66 4-laning, Ghat sections)
  - Factual driver advisories (e.g., warnings when driving exceeds safe single-day thresholds)
  - Grand total budget & per-person breakdown

---

### 3. Interactive Highway Map (Leaflet.js)
- Multi-stop polyline route visualizing the primary corridor and dashed alternative paths.
- Categorized SVG markers for:
  - 🏁 Departure & Destination
  - ⛽ Petrol, Diesel & CNG Stations
  - ⚡ EV Fast Chargers (CCS2, 60kW–120kW DC, port availability)
  - 🏨 Hotels & Boutique Stays
  - 🍽️ Highway Restaurants & Dhabas
  - 🏛️ Tourist Attractions & Sights
  - 🏥 24/7 Trauma Centers & Hospitals
- Interactive location drawer on marker click showing detours, ratings, hours, phone numbers, and direct navigation links.

---

### 4. Route Analysis & Alternatives
- Compares 3 distinct route corridors:
  1. **Fastest Highway** (Maximum multi-lane expressway coverage)
  2. **Scenic Route** (Coastal rivers, mountain valleys, and rural vistas)
  3. **Lowest Cost** (Minimal toll plazas and budget transit points)
- Switching routes dynamically updates distances, tolls, fuel consumption, and map overlays.
- Recommended rest stops, meal breaks, and overnight stops.

---

### 5. Day-by-Day Realistic Itinerary
- Scheduled by time of day:
  - **Departure**: Scheduled start time and route departure point
  - **Morning**: En-route breakfast and morning sights
  - **Lunch**: Highway family dining and authentic thalis
  - **Afternoon**: Sightseeing, forts, cultural walks
  - **Evening**: Sunset points, vibrant local markets
  - **Night**: Hotel check-in and dinner recommendation
- Add custom notes and reminders to any day.

---

### 6. Dedicated Fuel & EV Charging Planner
- Dynamically calculates:
  - Distance (km)
  - Fuel/battery energy required (Liters or kWh)
  - Fuel cost based on prevailing rates
  - Vehicle range per tank/charge
- **Recommended Fuel Schedule**: Automatically spaces stops before tanks drop below 25% or batteries drop below 20%.

---

### 7. Accommodation & Stays
- Filter by categories: Budget, Standard, Premium, Luxury, Couple, Family.
- Sort by Price (Low/High), Star Rating, and Reviews Count.
- Instant booking modal with live pricing calculations and confirmation receipts.

---

### 8. Highway Food & Dining Guide
- Filter by meal type (Breakfast, Lunch, Dinner) and dietary preferences (Pure Veg only, All diets).
- Features parking capacity, distance from highway, operating hours, and signature specialties.

---

### 9. Interactive Budget Calculator
- Editable input fields across Transportation, Accommodation, Food, Sightseeing, and Miscellaneous expenses.
- Stacked percentage distribution bar chart.
- Real-time updates for Total Trip Cost and Cost Per Person.

---

### 10. Weather & Highway Advisories
- Day-by-day forecasts for departure point, ghat sections, and destination.
- Temperature, rain probability %, wind speed, and sunrise/sunset times.

---

### 11. 24/7 Safety & Emergency SOS Desk
- One-tap dial for 112 (National SOS), 1033 (Highway Patrol), 108 (Ambulance), and 100 (Police).
- Real-time GPS coordinate locator with 1-click clipboard copy.
- WhatsApp emergency SOS broadcast with GPS coordinates.
- Directory of 24/7 trauma hospitals and flatbed towing services.

---

### 12. Interactive Travel Checklist
- 4 Categories: Documents & IDs, Car/Bike Readiness, Personal & Packing, Health & First-Aid.
- Progress bar displaying percentage packed.
- Ability to add custom items.

---

### 13. AI Travel Copilot (TripMate AI)
- Chat interface answering queries regarding lunch stops, midway hotels, child-friendly modifications, packing tips, and budget cuts.
- Clickable actions that modify active itineraries and budgets directly in real-time.

---

### 14. Save & Manage Trips (My Trips)
- Saved trips management with duplicate, rename, delete, and switch functionality.
- Pre-populated with verified road trips:
  - **Mumbai to Goa** (4 Days)
  - **Shirdi to Kukke Shri Subrahmanya** (5 Days)
  - **Delhi to Manali & Rohtang** (5 Days)

---

### 15. Export & Print Engine
- Dedicated printable itinerary sheet with CSS print media queries.
- Clean formatting for print or saving as PDF.
- WhatsApp sharing with formatted itinerary text.

---

### 16. Admin Hub & Telemetry
- System status dashboard monitoring user registrations, trip volume, and external API latencies (Routing, Geocoding, Weather, Tolls, Fuel, AI).
- Monetization and affiliate integration roadmap.

---

## 🚀 Technology Stack
- **Frontend**: React 19, Vite 8, Tailwind CSS, Lucide React
- **Mapping**: Leaflet 1.9 with CartoDB Positron / OSM tiles and custom SVG divIcons
- **State Management**: React Context API with persistent `localStorage` synchronization
- **Design System**: Mobile-first responsive layouts, custom scrollbars, print stylesheets

---

## 🌐 Free Deployment & PWA Installation

TripMate is configured for free deployment on Vercel and can be installed as a Progressive Web App (PWA) on supported browsers.

### Deploy on Vercel

1. Create a GitHub repository and upload this project (do not upload `node_modules` or `dist`).
2. Sign in to Vercel with GitHub.
3. Select **Add New → Project** and import the TripMate repository.
4. Vercel should detect Vite automatically. Use:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Deploy.

After deployment, Vercel will provide a public HTTPS address such as `https://your-project.vercel.app`.

### Install TripMate on Android

Open the deployed URL in Chrome. When the browser offers **Install TripMate / Add to Home Screen**, use it. The app will open in standalone mode like an installed application.

TripMate also includes:
- PWA manifest
- 192px and 512px app icons
- Service worker for application-shell caching
- Browser install-prompt handling
- Offline fallback for the application shell

### Important data note

The current project can use live OpenStreetMap/Photon/OSRM services for map search and routing. Some other travel content in the demo is stored in the project's local sample data. Before presenting the application as a fully live commercial travel-data service, connect production APIs for hotels, fuel prices/stations, weather, tolls, booking inventory, and other time-sensitive information.
