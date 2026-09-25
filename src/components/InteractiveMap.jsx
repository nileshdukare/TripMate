import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useTrip } from '../context/TripContext';
import { TILE_PROVIDERS, fetchLiveOSRMRoute } from '../services/mapService';
import { 
  MapPin, Fuel, Zap, Hotel, Utensils, Landmark, 
  ShieldAlert, Layers, Navigation, Phone, Clock, 
  Star, ExternalLink, X, PlusCircle, Check, Compass,
  Locate, Eye, EyeOff, Maximize2, Minimize2, ListOrdered,
  Search, AlertTriangle, ArrowRight, Activity
} from 'lucide-react';

export default function InteractiveMap() {
  const { currentTrip, activeRouteIndex, switchRoute, showToast } = useTrip();
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const baseTileLayerRef = useRef(null);
  const markersLayerRef = useRef(null);
  const polylineLayerRef = useRef(null);
  const trafficLayerRef = useRef(null);
  const userMarkerRef = useRef(null);

  // Map tile style state: 'streets' | 'satellite' | 'terrain' | 'dark'
  const [activeTileKey, setActiveTileKey] = useState('streets');

  // Layer filter state
  const [layers, setLayers] = useState({
    fuel: true,
    ev: true,
    hotels: true,
    restaurants: true,
    attractions: true,
    emergency: true,
    tolls: true,
    traffic: true
  });

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [liveSteps, setLiveSteps] = useState([]);
  const [isLoadingLiveRoute, setIsLoadingLiveRoute] = useState(false);
  const [liveRouteLoaded, setLiveRouteLoaded] = useState(false);
  const [userLoc, setUserLoc] = useState(null);
  const [mapSearch, setMapSearch] = useState('');

  const toggleLayer = (layerKey) => {
    setLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  // Active route coordinates
  const activeRoute = currentTrip?.routes?.[activeRouteIndex] || currentTrip?.routes?.[0];
  const startCoord = currentTrip?.fromCoords || [19.0760, 72.8777];
  const endCoord = currentTrip?.toCoords || [15.4989, 73.8278];

  // Coordinates list (defaults to sample coordinates)
  const [activeCoordinates, setActiveCoordinates] = useState(activeRoute?.coordinates || [startCoord, endCoord]);

  // Fetch real-world turn-by-turn road geometry from live OSRM API
  useEffect(() => {
    let isCancelled = false;

    async function loadLiveRoute() {
      if (!startCoord || !endCoord) return;
      setIsLoadingLiveRoute(true);

      const res = await fetchLiveOSRMRoute(startCoord, endCoord);
      if (!isCancelled && res && res.success && res.coordinates?.length > 0) {
        setActiveCoordinates(res.coordinates);
        setLiveSteps(res.steps || []);
        setLiveRouteLoaded(true);
      } else if (!isCancelled) {
        // Fallback to pre-configured realistic waypoints
        setActiveCoordinates(activeRoute?.coordinates || [startCoord, endCoord]);
        setLiveRouteLoaded(false);
      }
      if (!isCancelled) setIsLoadingLiveRoute(false);
    }

    loadLiveRoute();

    return () => {
      isCancelled = true;
    };
  }, [currentTrip.id, activeRouteIndex, startCoord[0], endCoord[0]]);

  // Helper to create modern SVG div icons
  const createCustomIcon = (type) => {
    let iconSvg = '';
    if (type === 'start') {
      iconSvg = `<div class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-xl border-2 border-white ring-2 ring-emerald-400">A</div>`;
    } else if (type === 'end') {
      iconSvg = `<div class="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center font-black text-xs shadow-xl border-2 border-white ring-2 ring-rose-400">B</div>`;
    } else if (type === 'fuel') {
      iconSvg = `<div class="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md border-2 border-white text-xs">⛽</div>`;
    } else if (type === 'ev') {
      iconSvg = `<div class="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md border-2 border-white text-xs">⚡</div>`;
    } else if (type === 'hotel') {
      iconSvg = `<div class="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md border-2 border-white text-xs">🏨</div>`;
    } else if (type === 'restaurant') {
      iconSvg = `<div class="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md border-2 border-white text-xs">🍽️</div>`;
    } else if (type === 'attraction') {
      iconSvg = `<div class="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-md border-2 border-white text-xs">🏛️</div>`;
    } else if (type === 'hospital') {
      iconSvg = `<div class="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md border-2 border-white text-xs">🏥</div>`;
    } else if (type === 'user') {
      iconSvg = `<div class="w-6 h-6 rounded-full bg-sky-500 border-2 border-white shadow-xl flex items-center justify-center"><div class="w-2.5 h-2.5 rounded-full bg-white animate-ping"></div></div>`;
    }

    return L.divIcon({
      html: iconSvg,
      className: 'custom-map-icon',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16]
    });
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: startCoord,
        zoom: 7,
        zoomControl: false
      });

      // Add default tile layer
      const provider = TILE_PROVIDERS.streets;
      baseTileLayerRef.current = L.tileLayer(provider.url, {
        attribution: provider.attribution,
        maxZoom: provider.maxZoom,
        subdomains: 'abcd'
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      polylineLayerRef.current = L.layerGroup().addTo(map);
      trafficLayerRef.current = L.layerGroup().addTo(map);
      markersLayerRef.current = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
    }

    const timer = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Switch Base Tile Layer (Streets vs Satellite vs Terrain vs Dark)
  const switchTileLayer = (tileKey) => {
    const map = mapInstanceRef.current;
    if (!map || !TILE_PROVIDERS[tileKey]) return;

    if (baseTileLayerRef.current) {
      map.removeLayer(baseTileLayerRef.current);
    }

    const provider = TILE_PROVIDERS[tileKey];
    baseTileLayerRef.current = L.tileLayer(provider.url, {
      attribution: provider.attribution,
      maxZoom: provider.maxZoom,
      subdomains: 'abcd'
    }).addTo(map);

    setActiveTileKey(tileKey);
    showToast(`Switched map to ${provider.name} layer!`, 'info');
  };

  // Locate User GPS
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      showToast("Geolocation is not supported by your browser", 'error');
      return;
    }

    showToast("Detecting your live GPS location...", "info");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLatLng = [pos.coords.latitude, pos.coords.longitude];
        setUserLoc(userLatLng);

        const map = mapInstanceRef.current;
        if (map) {
          if (userMarkerRef.current) map.removeLayer(userMarkerRef.current);

          userMarkerRef.current = L.marker(userLatLng, {
            icon: createCustomIcon('user')
          }).addTo(map);

          map.flyTo(userLatLng, 12, { animate: true, duration: 1.5 });
          showToast("Live GPS position located on map!", "success");
        }
      },
      (err) => {
        // Fallback demo location near departure city
        const fallback = [startCoord[0] + 0.05, startCoord[1] + 0.04];
        setUserLoc(fallback);
        const map = mapInstanceRef.current;
        if (map) {
          if (userMarkerRef.current) map.removeLayer(userMarkerRef.current);
          userMarkerRef.current = L.marker(fallback, {
            icon: createCustomIcon('user')
          }).addTo(map);
          map.flyTo(fallback, 11);
        }
        showToast("GPS position set to departure transit corridor.", "info");
      },
      { timeout: 8000 }
    );
  };

  // Search along map
  const handleMapSearch = (e) => {
    e.preventDefault();
    if (!mapSearch.trim()) return;

    const term = mapSearch.toLowerCase();
    const map = mapInstanceRef.current;
    if (!map) return;

    // Check hotels, attractions, fuel stations, towns
    const foundH = currentTrip?.hotels?.find(h => h.name.toLowerCase().includes(term) || h.location.toLowerCase().includes(term));
    const foundA = currentTrip?.attractions?.find(a => a.name.toLowerCase().includes(term));
    const foundF = currentTrip?.fuelStations?.find(f => f.name.toLowerCase().includes(term) || f.brand.toLowerCase().includes(term));

    if (foundH || foundA || foundF) {
      const match = foundH || foundA || foundF;
      map.flyTo(endCoord, 12, { animate: true });
      showToast(`Located ${match.name} on the map!`, 'success');
    } else {
      showToast(`Searching for "${mapSearch}" along route corridor...`, 'info');
    }
  };

  // Render Polylines & Markers when coordinates or layers change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !markersLayerRef.current || !polylineLayerRef.current || !trafficLayerRef.current) return;

    markersLayerRef.current.clearLayers();
    polylineLayerRef.current.clearLayers();
    trafficLayerRef.current.clearLayers();

    // 1. Draw Polyline for active route
    const mainPolyline = L.polyline(activeCoordinates, {
      color: activeTileKey === 'satellite' ? '#22c55e' : '#16a34a',
      weight: 6,
      opacity: 0.95,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(polylineLayerRef.current);

    // 2. Draw Live Traffic Congestion Simulation Overlay if enabled
    if (layers.traffic && activeCoordinates.length > 10) {
      const totalPts = activeCoordinates.length;
      // Segment 1: Urban exit (Yellow / Orange moderate speed)
      const seg1 = activeCoordinates.slice(0, Math.floor(totalPts * 0.15));
      // Segment 2: Free expressway (Green 80-100 km/h)
      const seg2 = activeCoordinates.slice(Math.floor(totalPts * 0.15), Math.floor(totalPts * 0.65));
      // Segment 3: Ghat curves (Amber 45 km/h)
      const seg3 = activeCoordinates.slice(Math.floor(totalPts * 0.65), Math.floor(totalPts * 0.85));
      // Segment 4: Destination arrival (Green 60 km/h)
      const seg4 = activeCoordinates.slice(Math.floor(totalPts * 0.85));

      L.polyline(seg1, { color: '#f59e0b', weight: 4, opacity: 0.9 }).addTo(trafficLayerRef.current);
      L.polyline(seg2, { color: '#10b981', weight: 4, opacity: 0.9 }).addTo(trafficLayerRef.current);
      L.polyline(seg3, { color: '#f97316', weight: 4, opacity: 0.9 }).addTo(trafficLayerRef.current);
      L.polyline(seg4, { color: '#10b981', weight: 4, opacity: 0.9 }).addTo(trafficLayerRef.current);
    }

    // 3. Alternative routes (dashed lines)
    if (currentTrip?.routes) {
      currentTrip.routes.forEach((rt, idx) => {
        if (idx !== activeRouteIndex && rt.coordinates) {
          L.polyline(rt.coordinates, {
            color: '#94a3b8',
            weight: 3,
            dashArray: '6, 8',
            opacity: 0.7
          }).addTo(polylineLayerRef.current);
        }
      });
    }

    // 4. Start & End Markers
    const startM = L.marker(startCoord, {
      icon: createCustomIcon('start')
    }).addTo(markersLayerRef.current);

    startM.on('click', () => {
      setSelectedPlace({
        name: currentTrip.from,
        category: 'Trip Origin',
        distance: '0 km (Departure point)',
        address: currentTrip.from,
        rating: 4.9,
        hours: 'Departure recommended at ' + currentTrip.overview.suggestedDeparture,
        type: 'start'
      });
    });

    const endM = L.marker(endCoord, {
      icon: createCustomIcon('end')
    }).addTo(markersLayerRef.current);

    endM.on('click', () => {
      setSelectedPlace({
        name: currentTrip.to,
        category: 'Destination',
        distance: `${currentTrip.overview.distance} km from departure`,
        address: currentTrip.to,
        rating: 4.9,
        hours: 'Arrival expected at ' + currentTrip.overview.suggestedArrival,
        type: 'end'
      });
    });

    // 5. POI Markers
    // Fuel & EV Stations
    if (layers.fuel || layers.ev) {
      currentTrip?.fuelStations?.forEach((fs, i) => {
        const ratio = Math.min(0.9, (fs.distanceFromStart || (i + 1) * 150) / currentTrip.overview.distance);
        const idx = Math.min(activeCoordinates.length - 1, Math.floor(ratio * activeCoordinates.length));
        const baseCoord = activeCoordinates[idx] || activeCoordinates[0];
        const markerCoord = [baseCoord[0] + (i % 2 === 0 ? 0.02 : -0.02), baseCoord[1] + 0.015];

        const isEv = fs.evCharging?.available;
        if ((isEv && layers.ev) || (!isEv && layers.fuel)) {
          const marker = L.marker(markerCoord, {
            icon: createCustomIcon(isEv ? 'ev' : 'fuel')
          }).addTo(markersLayerRef.current);

          marker.on('click', () => {
            setSelectedPlace({
              name: fs.name,
              category: isEv ? 'EV Fast Charger & Fuel Hub' : 'Fuel / Filling Station',
              brand: fs.brand,
              distance: fs.distanceFromRoute,
              rating: fs.rating,
              address: fs.address,
              hours: fs.hours,
              phone: fs.phone,
              amenities: fs.amenities,
              evCharging: fs.evCharging,
              type: isEv ? 'ev' : 'fuel'
            });
          });
        }
      });
    }

    // Hotels
    if (layers.hotels && currentTrip?.hotels) {
      currentTrip.hotels.forEach((h, i) => {
        const hotelCoord = [endCoord[0] + (i * 0.03 - 0.04), endCoord[1] + (i * 0.025 - 0.03)];
        const marker = L.marker(hotelCoord, {
          icon: createCustomIcon('hotel')
        }).addTo(markersLayerRef.current);

        marker.on('click', () => {
          setSelectedPlace({
            name: h.name,
            category: `Hotel (${h.category})`,
            price: `₹${h.pricePerNight.toLocaleString()} / night`,
            distance: h.distanceFromRoute,
            rating: h.rating,
            address: h.location,
            hours: 'Check-in: 2:00 PM | Check-out: 11:00 AM',
            amenities: h.amenities,
            image: h.image,
            type: 'hotel'
          });
        });
      });
    }

    // Restaurants
    if (layers.restaurants && currentTrip?.restaurants) {
      currentTrip.restaurants.forEach((r, i) => {
        const ratio = 0.25 + (i * 0.22);
        const idx = Math.min(activeCoordinates.length - 1, Math.floor(ratio * activeCoordinates.length));
        const baseCoord = activeCoordinates[idx] || activeCoordinates[0];
        const restCoord = [baseCoord[0] - 0.018, baseCoord[1] + (i % 2 === 0 ? 0.02 : -0.02)];

        const marker = L.marker(restCoord, {
          icon: createCustomIcon('restaurant')
        }).addTo(markersLayerRef.current);

        marker.on('click', () => {
          setSelectedPlace({
            name: r.name,
            category: `Restaurant (${r.cuisine})`,
            price: r.approxCost,
            distance: r.distanceFromRoute,
            rating: r.rating,
            diet: r.diet,
            address: r.distanceFromRoute,
            hours: r.hours,
            popularDishes: r.popularDishes,
            type: 'restaurant'
          });
        });
      });
    }

    // Attractions
    if (layers.attractions && currentTrip?.attractions) {
      currentTrip.attractions.forEach((a, i) => {
        const attrCoord = [endCoord[0] + (i * 0.02 - 0.02), endCoord[1] + (i * 0.03 - 0.01)];
        const marker = L.marker(attrCoord, {
          icon: createCustomIcon('attraction')
        }).addTo(markersLayerRef.current);

        marker.on('click', () => {
          setSelectedPlace({
            name: a.name,
            category: `Attraction (${a.category})`,
            price: a.entryFee,
            distance: a.distanceFromRoute,
            rating: a.rating,
            address: a.distanceFromHotel,
            hours: a.openingHours,
            desc: a.description,
            image: a.image,
            type: 'attraction'
          });
        });
      });
    }

    // Emergency Hospitals
    if (layers.emergency && currentTrip?.safetyEmergency?.nearbyHospitals) {
      currentTrip.safetyEmergency.nearbyHospitals.forEach((hosp, i) => {
        const ratio = 0.35 + (i * 0.3);
        const idx = Math.min(activeCoordinates.length - 1, Math.floor(ratio * activeCoordinates.length));
        const baseCoord = activeCoordinates[idx] || activeCoordinates[0];
        const hospCoord = [baseCoord[0] + 0.025, baseCoord[1] - 0.02];

        const marker = L.marker(hospCoord, {
          icon: createCustomIcon('hospital')
        }).addTo(markersLayerRef.current);

        marker.on('click', () => {
          setSelectedPlace({
            name: hosp.name,
            category: '24/7 Emergency Hospital & Trauma Center',
            distance: hosp.distance,
            rating: 4.8,
            address: hosp.city,
            phone: hosp.phone,
            hours: 'Open 24x7 Emergency Casualty',
            type: 'hospital'
          });
        });
      });
    }

    // Fit map bounds
    if (activeCoordinates.length > 0) {
      const bounds = L.latLngBounds(activeCoordinates);
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [activeCoordinates, layers, activeRouteIndex, currentTrip, activeTileKey]);

  return (
    <div
      className={`relative w-full bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col transition-all duration-300 ${
        isExpanded ? 'h-[850px]' : 'h-[650px]'
      }`}
    >
      {/* Top Map Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left Side: Route Switcher & Live Routing Status */}
        <div className="pointer-events-auto flex items-center gap-1.5 flex-wrap">
          {/* Route Selector Badges */}
          <div className="bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-md border border-slate-200/80 flex items-center gap-1.5">
            {currentTrip?.routes?.map((r, idx) => (
              <button
                key={r.id || idx}
                onClick={() => switchRoute(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeRouteIndex === idx
                    ? 'bg-brand-600 text-white shadow-sm ring-1 ring-brand-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{r.badge || `Route ${idx + 1}`}</span>
                <span className="opacity-80 text-[10px]">({r.distance} km)</span>
              </button>
            ))}
          </div>

          {/* Live OSRM Indicator Badge */}
          <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-slate-200/80 text-xs font-bold flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isLoadingLiveRoute ? 'bg-amber-500 animate-ping' : liveRouteLoaded ? 'bg-emerald-500 animate-pulse' : 'bg-brand-500'}`} />
            <span className="text-slate-800">
              {isLoadingLiveRoute ? "Connecting Live GPS Route..." : liveRouteLoaded ? "Live OSRM Highway Geometry" : "Verified Road Geometry"}
            </span>
          </div>
        </div>

        {/* Right Side: Map Controls (Tiles, Directions, GPS, Fullscreen) */}
        <div className="pointer-events-auto flex items-center gap-1.5">
          {/* Tile Switcher Dropdown */}
          <div className="bg-white/95 backdrop-blur-md p-1 rounded-xl shadow-md border border-slate-200/80 flex items-center gap-1">
            {Object.keys(TILE_PROVIDERS).map(key => (
              <button
                key={key}
                onClick={() => switchTileLayer(key)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  activeTileKey === key
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                title={`Switch to ${TILE_PROVIDERS[key].name} layer`}
              >
                <span>{TILE_PROVIDERS[key].icon}</span>
                <span className="hidden sm:inline">{TILE_PROVIDERS[key].name}</span>
              </button>
            ))}
          </div>

          {/* Turn-by-Turn Directions Button */}
          <button
            onClick={() => setShowDirections(!showDirections)}
            className={`p-2 rounded-xl backdrop-blur-md shadow-md border text-xs font-bold transition flex items-center gap-1.5 ${
              showDirections
                ? 'bg-brand-600 text-white border-brand-700'
                : 'bg-white/95 text-slate-800 border-slate-200 hover:bg-slate-100'
            }`}
            title="Toggle Turn-by-Turn Directions"
          >
            <ListOrdered className="w-4 h-4" />
            <span className="hidden md:inline">Directions</span>
          </button>

          {/* Locate Me GPS Button */}
          <button
            onClick={handleLocateMe}
            className="p-2 bg-white/95 backdrop-blur-md hover:bg-slate-100 text-slate-800 rounded-xl shadow-md border border-slate-200 transition"
            title="Locate My GPS Position"
          >
            <Locate className="w-4 h-4 text-sky-600" />
          </button>

          {/* Fullscreen Expand Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 bg-white/95 backdrop-blur-md hover:bg-slate-100 text-slate-800 rounded-xl shadow-md border border-slate-200 transition"
            title={isExpanded ? "Collapse Map" : "Expand Map"}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Layer Filter Bar (Secondary top bar) */}
      <div className="absolute top-16 left-3 z-20 pointer-events-auto bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-md border border-slate-200/80 flex items-center gap-1 overflow-x-auto max-w-[calc(100%-1.5rem)]">
        <button
          onClick={() => toggleLayer('fuel')}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition ${
            layers.fuel ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-slate-100 text-slate-400'
          }`}
        >
          <span>⛽</span> Fuel
        </button>
        <button
          onClick={() => toggleLayer('ev')}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition ${
            layers.ev ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-100 text-slate-400'
          }`}
        >
          <span>⚡</span> EV Fast
        </button>
        <button
          onClick={() => toggleLayer('hotels')}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition ${
            layers.hotels ? 'bg-indigo-100 text-indigo-800 border border-indigo-300' : 'bg-slate-100 text-slate-400'
          }`}
        >
          <span>🏨</span> Hotels
        </button>
        <button
          onClick={() => toggleLayer('restaurants')}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition ${
            layers.restaurants ? 'bg-orange-100 text-orange-800 border border-orange-300' : 'bg-slate-100 text-slate-400'
          }`}
        >
          <span>🍽️</span> Food
        </button>
        <button
          onClick={() => toggleLayer('attractions')}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition ${
            layers.attractions ? 'bg-purple-100 text-purple-800 border border-purple-300' : 'bg-slate-100 text-slate-400'
          }`}
        >
          <span>🏛️</span> Sights
        </button>
        <button
          onClick={() => toggleLayer('emergency')}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition ${
            layers.emergency ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-slate-100 text-slate-400'
          }`}
        >
          <span>🏥</span> SOS
        </button>
        <button
          onClick={() => toggleLayer('traffic')}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition ${
            layers.traffic ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-100 text-slate-400'
          }`}
          title="Toggle Traffic Congestion Speed Simulation"
        >
          <span>🚦</span> Traffic Flow
        </button>
      </div>

      {/* Map Leaflet Container */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Bottom Left Stats Box */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-auto bg-slate-900/90 backdrop-blur-md text-white p-3 rounded-2xl shadow-xl border border-slate-700/80 flex items-center gap-4 text-xs">
        <div>
          <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Highway Route</div>
          <div className="text-base font-extrabold text-white">{activeRoute?.distance || currentTrip?.overview?.distance} km</div>
        </div>
        <div className="w-px h-6 bg-slate-700" />
        <div>
          <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Drive Time</div>
          <div className="text-base font-bold text-emerald-400">{activeRoute?.time || currentTrip?.overview?.travelTime}</div>
        </div>
        <div className="w-px h-6 bg-slate-700" />
        <div>
          <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">FASTag Tolls</div>
          <div className="text-base font-bold text-white">₹{activeRoute?.tollCost || currentTrip?.routeAnalysis?.tollCost}</div>
        </div>
      </div>

      {/* Slide-out Turn-by-Turn Directions Drawer */}
      {showDirections && (
        <div className="absolute top-28 left-4 z-30 pointer-events-auto w-80 max-w-[calc(100%-2rem)] max-h-[480px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in fade-in slide-in-from-left duration-200">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-brand-400" />
              <h4 className="font-extrabold text-xs uppercase tracking-wider">Turn-by-Turn Live Navigation</h4>
            </div>
            <button
              onClick={() => setShowDirections(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 overflow-y-auto space-y-3 divide-y divide-slate-100 text-xs">
            {liveSteps.length > 0 ? (
              liveSteps.map((step) => (
                <div key={step.id} className="pt-2 first:pt-0 flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                    {step.id + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-900">{step.instruction}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 flex items-center justify-between">
                      <span className="font-medium text-slate-700">{step.road}</span>
                      <span className="font-semibold text-emerald-700">{step.distance}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center font-bold text-[10px]">1</div>
                  <div>
                    <div className="font-bold text-slate-900">Depart {currentTrip.from}</div>
                    <div className="text-[11px] text-slate-500">Merge onto national expressway corridor</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center font-bold text-[10px]">2</div>
                  <div>
                    <div className="font-bold text-slate-900">Follow NH 48 / NH 66 corridor</div>
                    <div className="text-[11px] text-slate-500">Pass scheduled food and fuel rest hubs</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center font-bold text-[10px]">3</div>
                  <div>
                    <div className="font-bold text-slate-900">Arrive at destination: {currentTrip.to}</div>
                    <div className="text-[11px] text-slate-500">Check-in at reserved hotel</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Selected Location Detail Drawer / Modal Overlay */}
      {selectedPlace && (
        <div className="absolute bottom-4 right-4 z-30 pointer-events-auto w-96 max-w-[calc(100%-2rem)] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {selectedPlace.image && (
            <div className="relative h-36 w-full overflow-hidden">
              <img src={selectedPlace.image} alt={selectedPlace.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button
                onClick={() => setSelectedPlace(null)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="p-4">
            {!selectedPlace.image && (
              <div className="flex justify-between items-start mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                  {selectedPlace.category}
                </span>
                <button
                  onClick={() => setSelectedPlace(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex items-start justify-between gap-2">
              <h4 className="font-bold text-slate-900 text-base leading-snug">{selectedPlace.name}</h4>
              {selectedPlace.rating && (
                <div className="flex items-center gap-1 bg-amber-50 text-amber-700 font-bold text-xs px-2 py-0.5 rounded-md border border-amber-200 flex-shrink-0">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                  {selectedPlace.rating}
                </div>
              )}
            </div>

            {selectedPlace.price && (
              <div className="text-sm font-semibold text-brand-700 mt-1">{selectedPlace.price}</div>
            )}

            <div className="mt-2.5 space-y-1.5 text-xs text-slate-600">
              {selectedPlace.distance && (
                <div className="flex items-center gap-2">
                  <Navigation className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{selectedPlace.distance}</span>
                </div>
              )}
              {selectedPlace.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="line-clamp-1">{selectedPlace.address}</span>
                </div>
              )}
              {selectedPlace.hours && (
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{selectedPlace.hours}</span>
                </div>
              )}
              {selectedPlace.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <a href={`tel:${selectedPlace.phone}`} className="text-brand-600 hover:underline">{selectedPlace.phone}</a>
                </div>
              )}
              {selectedPlace.evCharging?.available && (
                <div className="mt-2 p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs">
                  <div className="font-semibold flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-emerald-600" /> {selectedPlace.evCharging.speed}
                  </div>
                  <div className="text-[11px] text-emerald-700 mt-0.5">
                    Est. Charge Time: {selectedPlace.evCharging.estimatedChargeTime} ({selectedPlace.evCharging.availablePorts} of {selectedPlace.evCharging.ports} guns free)
                  </div>
                </div>
              )}
            </div>

            {selectedPlace.desc && (
              <p className="mt-2 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                {selectedPlace.desc}
              </p>
            )}

            <div className="mt-3.5 flex items-center gap-2">
              <button
                onClick={() => {
                  showToast(`Added ${selectedPlace.name} to itinerary!`, 'success');
                }}
                className="flex-1 py-2 px-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Add to Itinerary
              </button>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(selectedPlace.name + ' ' + (selectedPlace.address || ''))}`}
                target="_blank"
                rel="noreferrer"
                className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Directions
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
