import React, { useState } from 'react';
import { X, RefreshCw, Sparkles, MapPin, Check } from 'lucide-react';
import { Activity } from '../types/travel';

interface SwapActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: Activity | null;
  slot: 'morning' | 'afternoon' | 'evening';
  dayNumber: number;
  destination: string;
  onConfirmSwap: (newActivity: Activity) => void;
}

const SWAP_PROMPTS = [
  'More relaxing & scenic views',
  'Outdoor nature / quiet park',
  'Foodie street market & tasting',
  'Hidden artisan boutique or books',
  'Indoor / rainy day alternative',
  'Active adventure or bike ride',
];

export const SwapActivityModal: React.FC<SwapActivityModalProps> = ({
  isOpen,
  onClose,
  activity,
  slot,
  dayNumber,
  destination,
  onConfirmSwap,
}) => {
  const [preference, setPreference] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !activity) return null;

  const handleSwap = async (customPref?: string) => {
    const prefToUse = customPref || preference || 'A unique local cultural alternative';
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/swap-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          neighborhood: activity.location,
          timeSlot: activity.timeSlot,
          currentActivityTitle: activity.title,
          userPreference: prefToUse,
        }),
      });

      const data = await response.json();
      if (data.success && data.activity) {
        onConfirmSwap(data.activity);
        onClose();
      } else {
        setError(data.error || 'Failed to replace activity');
      }
    } catch (err: any) {
      setError(err?.message || 'Error communicating with AI service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden p-6">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Swap Day {dayNumber} ({slot}) Activity
              </h3>
              <p className="text-xs text-slate-400">Replace with a tailored alternative</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Activity Box */}
        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 mb-5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
            Currently Scheduled:
          </span>
          <h4 className="text-sm font-bold text-white">{activity.title}</h4>
          <p className="text-xs text-teal-400 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3" />
            <span>{activity.location}</span>
          </p>
        </div>

        {/* Prompt Selection */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
            What kind of experience would you prefer?
          </label>

          <div className="flex flex-wrap gap-1.5">
            {SWAP_PROMPTS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setPreference(p);
                  handleSwap(p);
                }}
                disabled={loading}
                className="px-2.5 py-1.5 rounded-xl text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition-all flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-teal-400" />
                <span>{p}</span>
              </button>
            ))}
          </div>

          <div className="pt-2">
            <input
              type="text"
              value={preference}
              onChange={(e) => setPreference(e.target.value)}
              placeholder="Or write custom requirement (e.g. Vintage vinyl stores, cozy teahouse)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>

          {error && <p className="text-xs text-rose-400">{error}</p>}

          <div className="pt-3 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSwap()}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-teal-500 text-slate-950 text-xs font-bold hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 shadow-md shadow-teal-500/20"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Finding Alternative...' : 'Swap Activity'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
