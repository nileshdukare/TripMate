// Service layer for live routing, geocoding, and map tile providers

export const TILE_PROVIDERS = {
  streets: {
    name: "Streets",
    icon: "🗺️",
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19
  },
  satellite: {
    name: "Satellite",
    icon: "🛰️",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 18
  },
  terrain: {
    name: "Terrain",
    icon: "⛰️",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
    maxZoom: 17
  },
  dark: {
    name: "Dark Nav",
    icon: "🌙",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    maxZoom: 19
  }
};

/**
 * Fetch live real-world turn-by-turn routing from OSRM
 * @param {[number, number]} start - [lat, lng]
 * @param {[number, number]} end - [lat, lng]
 */
export async function fetchLiveOSRMRoute(start, end) {
  try {
    const lng1 = start[1];
    const lat1 = start[0];
    const lng2 = end[1];
    const lat2 = end[0];

    const url = `https://router.project-osrm.org/route/v1/driving/${lng1},${lat1};${lng2},${lat2}?overview=full&geometries=geojson&steps=true`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`OSRM API response status: ${res.status}`);
    const data = await res.json();

    if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      // OSRM returns coordinates as [lng, lat], convert to Leaflet [lat, lng]
      const coordinates = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
      const distanceKm = Math.round(route.distance / 1000);
      const totalSec = Math.round(route.duration);
      const hours = Math.floor(totalSec / 3600);
      const minutes = Math.round((totalSec % 3600) / 60);
      const travelTimeStr = `${hours} hr ${minutes} min`;

      // Extract turn-by-turn steps
      const steps = [];
      if (route.legs && route.legs[0] && route.legs[0].steps) {
        route.legs[0].steps.forEach((step, idx) => {
          if (step.name || step.maneuver) {
            steps.push({
              id: idx,
              instruction: step.maneuver.instruction || formatManeuver(step.maneuver.type, step.name),
              road: step.name || "Highway corridor",
              distance: step.distance > 1000 ? `${(step.distance / 1000).toFixed(1)} km` : `${Math.round(step.distance)} m`,
              duration: `${Math.round(step.duration / 60)} min`
            });
          }
        });
      }

      return {
        success: true,
        coordinates,
        distanceKm,
        travelTimeStr,
        steps: steps.slice(0, 15) // Top turn steps
      };
    }
  } catch (err) {
    console.warn("Live OSRM routing unavailable, falling back to cached road geometry:", err.message);
  }
  return { success: false };
}

function formatManeuver(type, road) {
  const roadName = road || "highway";
  switch (type) {
    case 'depart': return `Depart and merge onto ${roadName}`;
    case 'turn': return `Turn onto ${roadName}`;
    case 'new name': return `Continue onto ${roadName}`;
    case 'fork': return `Keep left/right at fork onto ${roadName}`;
    case 'roundabout': return `Take exit at roundabout toward ${roadName}`;
    case 'arrive': return `Arrive at destination on ${roadName}`;
    default: return `Follow ${roadName}`;
  }
}

/**
 * Live geocoding search using Photon / OpenStreetMap
 * @param {string} query 
 */
export async function searchLivePlaces(query) {
  if (!query || query.trim().length < 2) return [];

  try {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query.trim())}&limit=5`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();

    if (data && data.features) {
      return data.features.map(f => {
        const p = f.properties;
        const name = [p.name, p.city || p.county, p.state, p.country].filter(Boolean).join(", ");
        return {
          label: name,
          name: p.name,
          state: p.state || "",
          country: p.country || "",
          coords: [f.geometry.coordinates[1], f.geometry.coordinates[0]] // [lat, lng]
        };
      });
    }
  } catch (err) {
    console.warn("Geocoding lookup failed:", err);
  }
  return [];
}
