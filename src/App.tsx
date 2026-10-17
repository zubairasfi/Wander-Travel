import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  MapPin,
  Calendar,
  Users,
  Wallet,
  Gauge,
  Sun,
  CloudSun,
  Share2,
  Bookmark,
  BookmarkCheck,
  Printer,
  Sparkles,
  BotMessageSquare,
  CheckCircle2,
  Layers,
  ArrowRight,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { TripPlan, TripRequest, Activity, PackingCategory } from './types/travel';
import { sampleTrips as localSampleTrips } from './data/sampleTrips';
import { Header } from './components/Header';
import { TripGeneratorModal } from './components/TripGeneratorModal';
import { DayCard } from './components/DayCard';
import { PackingListView } from './components/PackingListView';
import { BudgetView } from './components/BudgetView';
import { CultureView } from './components/CultureView';
import { AiConciergeDrawer } from './components/AiConciergeDrawer';
import { SwapActivityModal } from './components/SwapActivityModal';
import { SavedTripsModal } from './components/SavedTripsModal';

const SAVED_STORAGE_KEY = 'wanderai_saved_trips_v1';

export default function App() {
  const [currentTrip, setCurrentTrip] = useState<TripPlan>(localSampleTrips[0]);
  const [sampleTripsList, setSampleTripsList] = useState<TripPlan[]>(localSampleTrips);
  const [savedTrips, setSavedTrips] = useState<TripPlan[]>([]);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'packing' | 'budget' | 'culture'>('itinerary');
  const [selectedDayNumber, setSelectedDayNumber] = useState<number | 'all'>('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStepText, setLoadingStepText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Swap activity modal state
  const [swapTarget, setSwapTarget] = useState<{
    dayNumber: number;
    slot: 'morning' | 'afternoon' | 'evening';
    activity: Activity;
  } | null>(null);

  // Load saved trips from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SAVED_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSavedTrips(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load saved trips', e);
    }

    // Try fetching latest sample trips from server
    fetch('/api/sample-trips')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.trips && data.trips.length > 0) {
          setSampleTripsList(data.trips);
        }
      })
      .catch((err) => console.log('Using local sample trips fallback'));
  }, []);

  // Save trips helper
  const persistSavedTrips = (trips: TripPlan[]) => {
    setSavedTrips(trips);
    try {
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(trips));
    } catch (e) {
      console.error('Failed to save trips to local storage', e);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleGenerateTrip = async (request: TripRequest) => {
    setIsGenerating(true);
    setLoadingStepText(`Analyzing weather & geography for ${request.destination}...`);

    // Progress simulation steps
    const timer1 = setTimeout(() => {
      setLoadingStepText(`Clustering ${request.interests.join(', ')} spots without backtracking...`);
    }, 1500);

    const timer2 = setTimeout(() => {
      setLoadingStepText(`Selecting authentic local dining & hidden neighborhood gems...`);
    }, 3200);

    const timer3 = setTimeout(() => {
      setLoadingStepText(`Calculating realistic budget breakdowns and smart packing list...`);
    }, 5000);

    try {
      const res = await fetch('/api/generate-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);

      const data = await res.json();
      if (data.success && data.trip) {
        setCurrentTrip(data.trip);
        setSelectedDayNumber('all');
        setActiveTab('itinerary');
        setIsGeneratorOpen(false);

        // Confetti celebration
        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.5 },
          });
        } catch (e) {}

        showToast(`Your ${data.trip.durationDays}-day trip to ${data.trip.destination} is ready!`);
      } else {
        alert(data.error || 'Failed to generate itinerary. Please try again.');
      }
    } catch (err: any) {
      console.error('Generation failed:', err);
      alert('Network error while generating trip. Please check your connection.');
    } finally {
      setIsGenerating(false);
    }
  };

  const isCurrentTripSaved = savedTrips.some((t) => t.id === currentTrip?.id);

  const toggleSaveCurrentTrip = () => {
    if (!currentTrip) return;
    if (isCurrentTripSaved) {
      const updated = savedTrips.filter((t) => t.id !== currentTrip.id);
      persistSavedTrips(updated);
      showToast('Trip removed from saved collection');
    } else {
      const updated = [currentTrip, ...savedTrips];
      persistSavedTrips(updated);
      showToast('Trip saved to My Saved Trips! ✨');
    }
  };

  const handleDeleteSavedTrip = (tripId: string) => {
    const updated = savedTrips.filter((t) => t.id !== tripId);
    persistSavedTrips(updated);
    showToast('Trip deleted');
  };

  const handleUpdatePackingList = (updatedList: PackingCategory[]) => {
    if (!currentTrip) return;
    const updatedTrip = { ...currentTrip, packingList: updatedList };
    setCurrentTrip(updatedTrip);

    // If it's saved, update in savedTrips as well
    if (isCurrentTripSaved) {
      const nextSaved = savedTrips.map((t) => (t.id === updatedTrip.id ? updatedTrip : t));
      persistSavedTrips(nextSaved);
    }
  };

  const handleOpenSwapActivity = (
    dayNumber: number,
    slot: 'morning' | 'afternoon' | 'evening',
    activity: Activity
  ) => {
    setSwapTarget({ dayNumber, slot, activity });
  };

  const handleConfirmSwap = (newActivity: Activity) => {
    if (!currentTrip || !swapTarget) return;

    const nextDays = currentTrip.days.map((day) => {
      if (day.dayNumber !== swapTarget.dayNumber) return day;
      return {
        ...day,
        [swapTarget.slot]: newActivity,
      };
    });

    const updatedTrip = { ...currentTrip, days: nextDays };
    setCurrentTrip(updatedTrip);

    if (isCurrentTripSaved) {
      const nextSaved = savedTrips.map((t) => (t.id === updatedTrip.id ? updatedTrip : t));
      persistSavedTrips(nextSaved);
    }

    showToast(`Swapped ${swapTarget.slot} activity with "${newActivity.title}"!`);
    setSwapTarget(null);
  };

  const handleShareItinerary = () => {
    if (!currentTrip) return;
    const shareText = `✈️ ${currentTrip.title}\n📍 Destination: ${currentTrip.destination} (${currentTrip.durationDays} Days)\n💵 Budget: ${currentTrip.budgetLevel} ($${currentTrip.estimatedBudget.totalMinUSD} - $${currentTrip.estimatedBudget.totalMaxUSD})\n\nHighlights:\n${currentTrip.days.map((d) => `• Day ${d.dayNumber}: ${d.theme} (${d.neighborhood})`).join('\n')}\n\nPlanned with WanderAI Travel Planner!`;

    navigator.clipboard.writeText(shareText);
    showToast('Itinerary summary copied to clipboard! 📋');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-teal-500/30 selection:text-teal-200">
      {/* Top Navigation */}
      <Header
        currentTrip={currentTrip}
        savedTripsCount={savedTrips.length}
        onOpenGenerator={() => setIsGeneratorOpen(true)}
        onOpenSavedTrips={() => setIsSavedModalOpen(true)}
        onOpenConcierge={() => setIsConciergeOpen(true)}
        onPrint={() => window.print()}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Destination Hero Banner */}
        {currentTrip && (
          <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                {/* Meta badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/15 text-teal-300 border border-teal-500/30 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {currentTrip.destination}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-teal-400" />
                    {currentTrip.durationDays} Days
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700 flex items-center gap-1.5 capitalize">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    {currentTrip.travelGroup}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700 flex items-center gap-1.5 capitalize">
                    <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                    {currentTrip.budgetLevel.replace('_', ' ')}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700 flex items-center gap-1.5 capitalize">
                    <Gauge className="w-3.5 h-3.5 text-sky-400" />
                    {currentTrip.pace.replace('_', ' ')}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
                  {currentTrip.title}
                </h1>
                <p className="text-sm sm:text-base text-teal-200/90 font-medium">
                  {currentTrip.tagline}
                </p>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1">
                  {currentTrip.summary}
                </p>

                {/* Weather & Season snippet */}
                {currentTrip.weatherForecast && (
                  <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
                    <div className="flex items-center gap-1.5 bg-slate-950/60 border border-slate-800/80 px-3 py-1.5 rounded-xl">
                      <CloudSun className="w-4 h-4 text-amber-400" />
                      <span>{currentTrip.weatherForecast.tempRange}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-950/60 border border-slate-800/80 px-3 py-1.5 rounded-xl">
                      <Sun className="w-4 h-4 text-teal-400" />
                      <span className="truncate max-w-[260px]">{currentTrip.weatherForecast.summary}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons on banner */}
              <div className="flex flex-row lg:flex-col items-center sm:items-stretch gap-2.5 shrink-0 no-print">
                <button
                  onClick={toggleSaveCurrentTrip}
                  className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    isCurrentTripSaved
                      ? 'bg-amber-400/20 border-amber-400 text-amber-300 shadow-md'
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                  }`}
                >
                  {isCurrentTripSaved ? (
                    <>
                      <BookmarkCheck className="w-4 h-4 text-amber-400" />
                      <span>Saved Trip</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4" />
                      <span>Save Trip</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleShareItinerary}
                  className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-all"
                  title="Copy formatted summary"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>

                <button
                  onClick={() => setIsConciergeOpen(true)}
                  className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 hover:brightness-110 transition-all shadow-md shadow-teal-500/20"
                >
                  <BotMessageSquare className="w-4 h-4" />
                  <span>Ask AI Concierge</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-3 no-print">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'itinerary'
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Day-by-Day Itinerary</span>
              {currentTrip && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-950/20">
                  {currentTrip.days.length}d
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('packing')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'packing'
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Packing Checklist</span>
            </button>

            <button
              onClick={() => setActiveTab('budget')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'budget'
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span>Budget & Expenses</span>
            </button>

            <button
              onClick={() => setActiveTab('culture')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'culture'
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Culture, Tips & Phrases</span>
            </button>
          </div>

          {/* Quick action to switch trips */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs text-slate-500">Inspiring preset:</span>
            <select
              value={currentTrip?.id || ''}
              onChange={(e) => {
                const found = sampleTripsList.find((t) => t.id === e.target.value);
                if (found) {
                  setCurrentTrip(found);
                  setSelectedDayNumber('all');
                  showToast(`Loaded ${found.destination} itinerary`);
                }
              }}
              className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-teal-500"
            >
              {sampleTripsList.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.destination} ({st.durationDays}d)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tab 1: Day-by-Day Itinerary View */}
        {activeTab === 'itinerary' && currentTrip && (
          <div className="space-y-6">
            {/* Day Selector Pills Bar */}
            <div className="flex items-center justify-between gap-3 flex-wrap no-print">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => setSelectedDayNumber('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedDayNumber === 'all'
                      ? 'bg-teal-500/20 border border-teal-500 text-teal-300 font-bold'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  All Days ({currentTrip.days.length})
                </button>

                {currentTrip.days.map((day) => (
                  <button
                    key={day.dayNumber}
                    onClick={() => setSelectedDayNumber(day.dayNumber)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                      selectedDayNumber === day.dayNumber
                        ? 'bg-teal-500/20 border border-teal-500 text-teal-300 font-bold'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Day {day.dayNumber}
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Click "Swap" on any activity to customize with AI</span>
              </div>
            </div>

            {/* Render Days */}
            <div className="space-y-8">
              {currentTrip.days
                .filter((d) => selectedDayNumber === 'all' || d.dayNumber === selectedDayNumber)
                .map((day) => (
                  <DayCard
                    key={day.dayNumber}
                    day={day}
                    destination={currentTrip.destination}
                    onSwapActivity={handleOpenSwapActivity}
                  />
                ))}
            </div>
          </div>
        )}

        {/* Tab 2: Packing Checklist */}
        {activeTab === 'packing' && currentTrip && (
          <PackingListView
            packingList={currentTrip.packingList}
            onUpdatePackingList={handleUpdatePackingList}
            destination={currentTrip.destination}
          />
        )}

        {/* Tab 3: Budget Breakdown */}
        {activeTab === 'budget' && currentTrip && <BudgetView trip={currentTrip} />}

        {/* Tab 4: Culture, Etiquette & Useful Phrases */}
        {activeTab === 'culture' && currentTrip && <CultureView trip={currentTrip} />}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-slate-950/80 px-6 py-6 text-center text-xs text-slate-400 no-print mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-white">WanderAI</span>
            <span>•</span>
            <span>Curated travel itineraries powered by Google Gemini AI</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsGeneratorOpen(true)}
              className="text-teal-400 hover:text-teal-300 hover:underline"
            >
              Plan New Trip
            </button>
            <span>•</span>
            <button
              onClick={() => setIsConciergeOpen(true)}
              className="text-teal-400 hover:text-teal-300 hover:underline"
            >
              AI Concierge
            </button>
            <span>•</span>
            <button
              onClick={() => window.print()}
              className="text-teal-400 hover:text-teal-300 hover:underline"
            >
              Print Guide
            </button>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-teal-500 text-slate-950 font-semibold text-xs shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-slate-950" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals & Drawers */}
      <TripGeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        onGenerate={handleGenerateTrip}
        onSelectSample={(sample) => {
          setCurrentTrip(sample);
          setSelectedDayNumber('all');
          setActiveTab('itinerary');
          setIsGeneratorOpen(false);
          showToast(`Loaded ${sample.destination} itinerary`);
        }}
        sampleTrips={sampleTripsList}
        isGenerating={isGenerating}
        loadingStepText={loadingStepText}
      />

      <AiConciergeDrawer
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        trip={currentTrip}
      />

      <SavedTripsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedTrips={savedTrips}
        onSelectTrip={(t) => {
          setCurrentTrip(t);
          setSelectedDayNumber('all');
          setActiveTab('itinerary');
          showToast(`Opened saved trip: ${t.destination}`);
        }}
        onDeleteTrip={handleDeleteSavedTrip}
      />

      <SwapActivityModal
        isOpen={Boolean(swapTarget)}
        onClose={() => setSwapTarget(null)}
        activity={swapTarget?.activity || null}
        slot={swapTarget?.slot || 'morning'}
        dayNumber={swapTarget?.dayNumber || 1}
        destination={currentTrip?.destination || ''}
        onConfirmSwap={handleConfirmSwap}
      />
    </div>
  );
}
