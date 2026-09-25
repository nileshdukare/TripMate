import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { 
  ShieldCheck, Users, Activity, Database, Server, 
  AlertCircle, CheckCircle2, TrendingUp, Sparkles, MessageSquare, RefreshCw 
} from 'lucide-react';

export default function AdminDashboard() {
  const { showToast } = useTrip();

  const [activeTab, setActiveTab] = useState('overview'); // overview, apis, content, feedback

  // Sample admin metrics
  const stats = [
    { label: "Total Registered Users", value: "38,420", change: "+12.4% this month", icon: Users, color: "text-sky-600" },
    { label: "Trips Generated (Month)", value: "14,890", change: "+24.8% vs last month", icon: TrendingUp, color: "text-brand-600" },
    { label: "API Requests (Today)", value: "128,450", change: "99.98% Success Rate", icon: Activity, color: "text-purple-600" },
    { label: "System Health & Uptime", value: "99.99%", change: "Zero critical incidents", icon: Server, color: "text-emerald-600" }
  ];

  const apis = [
    { name: "Routing & Multi-point Maps API", provider: "OpenStreetMap / Leaflet Service", calls: "84,200", latency: "42 ms", status: "Healthy" },
    { name: "Global Geocoding & Autocomplete", provider: "Nominatim / Photon Gateway", calls: "45,100", latency: "58 ms", status: "Healthy" },
    { name: "Live Weather & Highway Advisory", provider: "OpenWeatherMap V3 Enterprise", calls: "22,400", latency: "74 ms", status: "Healthy" },
    { name: "National Fuel & EV Station Network", provider: "IOCL / BPCL / ChargePoint Feed", calls: "19,800", latency: "65 ms", status: "Healthy" },
    { name: "National Highway FASTag Toll Engine", provider: "IHMCL / NHAI Toll Matrix API", calls: "14,200", latency: "89 ms", status: "Healthy" },
    { name: "AI Itinerary LLM Engine", provider: "TripMate Agent Copilot Model", calls: "8,920", latency: "310 ms", status: "Operational" }
  ];

  const feedbackList = [
    { user: "Rajesh K., Pune", trip: "Mumbai to Goa", rating: 5, comment: "The highway food stop recommendations and Amboli ghat mist warning were spot on! Saved us 2 hours.", date: "Today, 11:20 AM" },
    { user: "Sneha V., Bangalore", trip: "Shirdi to Kukke", rating: 5, comment: "Spiritual yatra itinerary with midway halt at Hubballi made driving with elderly parents completely stress-free.", date: "Yesterday" },
    { user: "Vikram S., Delhi", trip: "Delhi to Manali", rating: 4.8, comment: "Kiratpur 4-lane expressway and Atal Tunnel details were very accurate. EV charging station information was lifesaver.", date: "2 days ago" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-xl bg-purple-50 text-purple-700">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900">TripMate Operations & Admin Hub</h2>
          </div>
          <p className="text-xs text-slate-500">
            System metrics, API throughput, content curation, user feedback, and infrastructure monitoring.
          </p>
        </div>

        <button
          onClick={() => showToast("Admin telemetry refreshed successfully!", "success")}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5 self-start md:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh Metrics
        </button>
      </div>

      {/* Top 4 Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>{s.label}</span>
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <div className="text-2xl font-black text-slate-900">{s.value}</div>
              <div className="text-[11px] font-semibold text-emerald-700">{s.change}</div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold">
        {['overview', 'apis', 'feedback'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl uppercase tracking-wider transition ${
              activeTab === tab
                ? 'bg-slate-900 text-white'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab === 'overview' ? 'Corridor Performance' : tab === 'apis' ? 'API Gateway & Latency' : 'User Reviews & Feedback'}
          </button>
        ))}
      </div>

      {/* API Gateway Table */}
      {activeTab === 'apis' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Activity className="w-4 h-4 text-brand-600" />
              External API Services & Health Status (Section 21)
            </h4>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              All 6 Services Operational
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 font-semibold uppercase text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-3 px-5">API Service</th>
                  <th className="py-3 px-5">Provider / Endpoint</th>
                  <th className="py-3 px-5">24h Calls</th>
                  <th className="py-3 px-5">Avg Latency</th>
                  <th className="py-3 px-5">Health</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {apis.map((api, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition">
                    <td className="py-3.5 px-5 font-bold text-slate-900">{api.name}</td>
                    <td className="py-3.5 px-5 text-slate-500">{api.provider}</td>
                    <td className="py-3.5 px-5 font-semibold">{api.calls}</td>
                    <td className="py-3.5 px-5 font-semibold text-slate-600">{api.latency}</td>
                    <td className="py-3.5 px-5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {api.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Corridor Performance / Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 text-sm">Top 5 Trending Highway Corridors</h4>
            <div className="space-y-3 text-xs">
              {[
                { route: "Mumbai ➔ Goa (NH 66 / NH 48)", trips: "4,210 trips this month", share: "88%" },
                { route: "Delhi ➔ Manali & Rohtang (NH 44 / NH 21)", trips: "3,150 trips this month", share: "72%" },
                { route: "Bengaluru ➔ Coorg & Ooty (NH 275)", trips: "2,840 trips this month", share: "65%" },
                { route: "Shirdi ➔ Kukke Subrahmanya (NH 52 / SH)", trips: "1,980 trips this month", share: "48%" },
                { route: "Jaipur ➔ Udaipur & Mount Abu (NH 48)", trips: "1,420 trips this month", share: "35%" }
              ].map((c, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>{c.route}</span>
                    <span className="text-brand-600">{c.trips}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: c.share }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 text-sm">Monetization & Partner Integrations (Section 28)</h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">Hotel Booking Affiliate Integrations</div>
                  <div className="text-slate-500">Agoda, Booking.com & Direct Hotel Chains</div>
                </div>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">Active</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">FASTag Auto-Recharge Gateway</div>
                  <div className="text-slate-500">NETC / NPCI Instant Fastag Topup</div>
                </div>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">Active</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">Roadside Assistance Insurance Add-on</div>
                  <div className="text-slate-500">24x7 Flatbed Towing & Emergency SOS Cover</div>
                </div>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">Active</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Tab */}
      {activeTab === 'feedback' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-brand-600" />
            Verified User Reviews & Highway Feedback
          </h4>
          <div className="space-y-3">
            {feedbackList.map((f, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-900">{f.user} <span className="font-normal text-slate-400">on {f.trip}</span></div>
                  <span className="text-[10px] text-slate-400">{f.date}</span>
                </div>
                <div className="text-amber-500 font-bold">★★★★★ {f.rating}/5.0</div>
                <p className="text-slate-600 leading-relaxed">{f.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
