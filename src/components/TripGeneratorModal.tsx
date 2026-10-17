import React, { useState } from 'react';
import {
  X,
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Wallet,
  Gauge,
  Compass,
  Check,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';
import { TripRequest, TripPlan } from '../types/travel';

interface TripGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (request: TripRequest) => Promise<void>;
  onSelectSample: (trip: TripPlan) => void;
  sampleTrips: TripPlan[];
  isGenerating: boolean;
  loadingStepText: string;
}

const POPULAR_DESTINATIONS = [
  { name: 'Tokyo & Kyoto, Japan', tag: 'Neon & Temples' },
  { name: 'Paris, France', tag: 'Art & Cafés' },
  { name: 'Amalfi Coast, Italy', tag: 'Coastal Charm' },
  { name: 'Reykjavik, Iceland', tag: 'Northern Lights' },
  { name: 'Bali, Indonesia', tag: 'Tropical Serenity' },
  { name: 'Swiss Alps, Switzerland', tag: 'Alpine Peaks' },
  { name: 'Barcelona, Spain', tag: 'Gaudí & Tapas' },
  { name: 'New York City, USA', tag: 'Urban Culture' },
];

const INTEREST_OPTIONS = [
  { id: 'History & Heritage', label: 'History & Heritage', icon: '🏛️' },
  { id: 'Food & Street Markets', label: 'Food & Culinary', icon: '🍜' },
  { id: 'Nature & Hiking', label: 'Nature & Outdoors', icon: '🌿' },
  { id: 'Art & Architecture', label: 'Art & Museums', icon: '🎨' },
  { id: 'Photography Spots', label: 'Scenic Photo Spots', icon: '📸' },
  { id: 'Hidden Gems', label: 'Off-the-beaten-path', icon: '💎' },
  { id: 'Nightlife & Bars', label: 'Nightlife & Drinks', icon: '🍸' },
  { id: 'Relaxation & Spas', label: 'Spas & Wellness', icon: '🧖' },
  { id: 'Shopping & Boutiques', label: 'Local Markets & Shopping', icon: '🛍️' },
];

export const TripGeneratorModal: React.FC<TripGeneratorModalProps> = ({
  isOpen,
  onClose,
  onGenerate,
  onSelectSample,
  sampleTrips,
  isGenerating,
  loadingStepText,
}) => {
  const [destination, setDestination] = useState('');
  const [durationDays, setDurationDays] = useState(5);
  const [travelGroup, setTravelGroup] = useState<'solo' | 'couple' | 'friends' | 'family'>('couple');
  const [budgetLevel, setBudgetLevel] = useState<'budget' | 'moderate' | 'luxury' | 'ultra_luxury'>('moderate');
  const [pace, setPace] = useState<'relaxed' | 'balanced' | 'fast_paced'>('balanced');
  const [interests, setInterests] = useState<string[]>([
    'History & Heritage',
    'Food & Street Markets',
    'Art & Architecture',
  ]);
  const [dietary, setDietary] = useState('');
  const [specialPreferences, setSpecialPreferences] = useState('');
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const toggleInterest = (id: string) => {
    if (interests.includes(id)) {
      setInterests(interests.filter((i) => i !== id));
    } else {
      setInterests([...interests, id]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      setFormError('Please enter a destination or select one from below');
      return;
    }
    setFormError('');

    await onGenerate({
      destination: destination.trim(),
      durationDays,
      travelGroup,
      budgetLevel,
      pace,
      interests,
      dietary: dietary.trim(),
      specialPreferences: specialPreferences.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 no-print animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden my-6">
        {/* Header gradient banner */}
        <div className="relative px-6 py-6 border-b border-slate-800 bg-gradient-to-r from-teal-950/60 via-slate-900 to-indigo-950/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white font-display">Plan Your Next Adventure</h2>
                <p className="text-xs text-slate-400">Tell Gemini AI your dream journey and get a bespoke day-by-day itinerary</p>
              </div>
            </div>
            {!isGenerating && (
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Loading overlay while AI is generating */}
        {isGenerating ? (
          <div className="py-20 px-8 flex flex-col items-center justify-center text-center space-y-6">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-4 border-teal-500/20 animate-ping"></div>
              <div className="w-20 h-20 rounded-full border-4 border-teal-500 border-t-transparent animate-spin flex items-center justify-center">
                <Compass className="w-8 h-8 text-teal-400" />
              </div>
            </div>
            <div className="space-y-2 max-w-md">
              <h3 className="text-lg font-bold text-white font-display">Crafting Your Masterpiece Itinerary</h3>
              <p className="text-sm text-teal-400 font-medium transition-all animate-pulse">
                {loadingStepText || 'Querying regional guides & transit paths...'}
              </p>
              <p className="text-xs text-slate-400">
                AI is calculating neighborhood pacing, authentic eateries, weather outlook, and estimated costs for {destination}.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Quick Sample Itineraries shortcut */}
            {sampleTrips.length > 0 && (
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2.5">
                  <Lightbulb className="w-4 h-4" />
                  <span>Looking for instant inspiration? Load a pre-crafted trip:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sampleTrips.map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => onSelectSample(st)}
                      className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-900 border border-slate-700/80 text-slate-200 hover:text-teal-300 hover:border-teal-500/50 hover:bg-teal-500/10 transition-all flex items-center gap-1.5"
                    >
                      <MapPin className="w-3 h-3 text-teal-400" />
                      <span>{st.destination}</span>
                      <span className="text-[10px] text-slate-500">({st.durationDays}d)</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Destination Input */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Destination <span className="text-teal-400">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    if (formError) setFormError('');
                  }}
                  placeholder="Where do you want to wander? (e.g. Kyoto & Tokyo, Rome & Florence, Banff, Iceland)"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                />
              </div>

              {/* Destination quick chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {POPULAR_DESTINATIONS.map((dest) => (
                  <button
                    key={dest.name}
                    type="button"
                    onClick={() => {
                      setDestination(dest.name);
                      if (formError) setFormError('');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                      destination === dest.name
                        ? 'bg-teal-500 text-slate-950 font-semibold'
                        : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {dest.name}
                  </button>
                ))}
              </div>
              {formError && (
                <p className="text-xs text-rose-400 flex items-center gap-1.5 pt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {formError}
                </p>
              )}
            </div>

            {/* Duration & Companions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Trip Length */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-teal-400" />
                    Duration
                  </label>
                  <span className="text-sm font-bold text-teal-400 font-display">
                    {durationDays} {durationDays === 1 ? 'Day' : 'Days'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="14"
                  step="1"
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="w-full accent-teal-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                  <span>1 day</span>
                  <span>3 days</span>
                  <span>7 days</span>
                  <span>10 days</span>
                  <span>14 days</span>
                </div>
              </div>

              {/* Travel Party */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-teal-400" />
                  Travel Party
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(
                    [
                      { id: 'solo', label: 'Solo', icon: '🎒' },
                      { id: 'couple', label: 'Couple', icon: '🥂' },
                      { id: 'friends', label: 'Friends', icon: '🎉' },
                      { id: 'family', label: 'Family', icon: '👨‍👩‍👦' },
                    ] as const
                  ).map((group) => (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => setTravelGroup(group.id)}
                      className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                        travelGroup === group.id
                          ? 'bg-teal-500/15 border-teal-500 text-teal-300 shadow-sm'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="text-base mb-0.5">{group.icon}</div>
                      <div>{group.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Budget & Pace */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Budget Tier */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5 text-teal-400" />
                  Budget Tier
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(
                    [
                      { id: 'budget', label: 'Budget', sub: '$' },
                      { id: 'moderate', label: 'Mid-Tier', sub: '$$' },
                      { id: 'luxury', label: 'Luxury', sub: '$$$' },
                      { id: 'ultra_luxury', label: 'VIP', sub: '$$$$' },
                    ] as const
                  ).map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBudgetLevel(b.id)}
                      className={`py-2 px-1 rounded-xl text-center border text-xs transition-all ${
                        budgetLevel === b.id
                          ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 font-semibold'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="font-bold text-sm">{b.sub}</div>
                      <div className="text-[10px]">{b.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Travel Pace */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-teal-400" />
                  Trip Pace
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(
                    [
                      { id: 'relaxed', label: 'Relaxed', desc: 'Slow & cozy' },
                      { id: 'balanced', label: 'Balanced', desc: 'Optimal flow' },
                      { id: 'fast_paced', label: 'Active', desc: 'Max sights' },
                    ] as const
                  ).map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPace(p.id)}
                      className={`py-2 px-1.5 rounded-xl text-center border text-xs transition-all ${
                        pace === p.id
                          ? 'bg-teal-500/15 border-teal-500 text-teal-300 font-semibold'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="font-medium text-xs">{p.label}</div>
                      <div className="text-[10px] text-slate-500">{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Travel Interests */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Interests & Vibes ({interests.length} selected)
                </label>
                <span className="text-[11px] text-slate-500">Pick any that appeal to you</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {INTEREST_OPTIONS.map((opt) => {
                  const isSelected = interests.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleInterest(opt.id)}
                      className={`p-2.5 rounded-xl text-left border text-xs flex items-center justify-between gap-2 transition-all ${
                        isSelected
                          ? 'bg-teal-500/15 border-teal-500/50 text-white'
                          : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span>{opt.icon}</span>
                        <span className="truncate">{opt.label}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-teal-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Dietary & Specific Requests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">
                  Dietary Preferences (Optional)
                </label>
                <input
                  type="text"
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  placeholder="e.g. Vegetarian, Halal, Seafood lover, Nut allergy"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">
                  Must-See or Custom Requests (Optional)
                </label>
                <input
                  type="text"
                  value={specialPreferences}
                  onChange={(e) => setSpecialPreferences(e.target.value)}
                  placeholder="e.g. Include vintage shops, studio ghibli, sunrise spot"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-teal-500/25"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Generate Itinerary with AI</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
