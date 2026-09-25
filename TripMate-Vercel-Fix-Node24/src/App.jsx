import React from 'react';
import { TripProvider, useTrip } from './context/TripContext';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import HeroSection from './components/HeroSection';
import DashboardSubNav from './components/DashboardSubNav';
import TripOverview from './components/TripOverview';
import InteractiveMap from './components/InteractiveMap';
import RouteAnalysis from './components/RouteAnalysis';
import DayByDayItinerary from './components/DayByDayItinerary';
import HotelsSection from './components/HotelsSection';
import FuelChargingSection from './components/FuelChargingSection';
import FoodDiningSection from './components/FoodDiningSection';
import AttractionsSection from './components/AttractionsSection';
import BudgetCalculator from './components/BudgetCalculator';
import WeatherSection from './components/WeatherSection';
import SafetyEmergency from './components/SafetyEmergency';
import TravelChecklist from './components/TravelChecklist';
import AITravelAssistant from './components/AITravelAssistant';
import MyTripsView from './components/MyTripsView';
import ExploreDestinationsView from './components/ExploreDestinationsView';
import AdminDashboard from './components/AdminDashboard';
import UserProfileModal from './components/UserProfileModal';
import PrintItinerary from './components/PrintItinerary';
import PlanTripModal from './components/PlanTripModal';
import ShareModal from './components/ShareModal';
import SOSModal from './components/SOSModal';
import BookingModal from './components/BookingModal';
import Toast from './components/Toast';

function AppContent() {
  const { 
    activeView, 
    activeDashboardTab, 
    isPlanModalOpen, 
    setIsPlanModalOpen,
    isShareModalOpen,
    setIsShareModalOpen,
    isSOSModalOpen,
    setIsSOSModalOpen 
  } = useTrip();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-20 md:pb-8">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* View Router */}
        {activeView === 'my-trips' && <MyTripsView />}

        {activeView === 'explore' && <ExploreDestinationsView />}

        {activeView === 'admin' && <AdminDashboard />}

        {activeView === 'profile' && <UserProfileModal />}

        {activeView === 'print' && <PrintItinerary />}

        {activeView === 'dashboard' && (
          <div className="space-y-6">
            {/* Hero / Quick Search Banner */}
            <HeroSection />

            {/* Dashboard Sub-navigation Tabs */}
            <DashboardSubNav />

            {/* Sub-tab Views */}
            {activeDashboardTab === 'overview' && (
              <div className="space-y-6">
                <TripOverview />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-slate-900 text-lg">Interactive Route Corridor</h3>
                    <span className="text-xs text-slate-500 font-medium">Click any stop for detours and amenities</span>
                  </div>
                  <InteractiveMap />
                </div>
              </div>
            )}

            {activeDashboardTab === 'map' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">Interactive Highway Map & Waypoints</h2>
                    <p className="text-xs text-slate-500">Toggle layers for fuel, EV superchargers, hotels, dhabas, and emergency trauma centers.</p>
                  </div>
                </div>
                <InteractiveMap />
              </div>
            )}

            {activeDashboardTab === 'route-analysis' && <RouteAnalysis />}

            {activeDashboardTab === 'itinerary' && <DayByDayItinerary />}

            {activeDashboardTab === 'hotels' && <HotelsSection />}

            {activeDashboardTab === 'fuel' && <FuelChargingSection />}

            {activeDashboardTab === 'restaurants' && <FoodDiningSection />}

            {activeDashboardTab === 'attractions' && <AttractionsSection />}

            {activeDashboardTab === 'budget' && <BudgetCalculator />}

            {activeDashboardTab === 'weather' && <WeatherSection />}

            {activeDashboardTab === 'safety' && <SafetyEmergency />}

            {activeDashboardTab === 'checklist' && <TravelChecklist />}

            {activeDashboardTab === 'ai-assistant' && <AITravelAssistant />}
          </div>
        )}
      </main>

      {/* Global Modals */}
      <PlanTripModal isOpen={isPlanModalOpen} onClose={() => setIsPlanModalOpen(false)} />
      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
      <SOSModal isOpen={isSOSModalOpen} onClose={() => setIsSOSModalOpen(false)} />
      <BookingModal />
      <Toast />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white py-6 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800">TripMate</span>
            <span>• Smart Road Trip & Route Planning Assistant</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>FASTag Electronic Toll Verified</span>
            <span>•</span>
            <span>OpenStreetMap & National Highway Data</span>
            <span>•</span>
            <span>24/7 SOS Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <TripProvider>
      <AppContent />
    </TripProvider>
  );
}
