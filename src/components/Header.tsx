import React from 'react';
import { Compass, Sparkles, Bookmark, Printer, BotMessageSquare, Plus } from 'lucide-react';
import { TripPlan } from '../types/travel';

interface HeaderProps {
  currentTrip: TripPlan | null;
  savedTripsCount: number;
  onOpenGenerator: () => void;
  onOpenSavedTrips: () => void;
  onOpenConcierge: () => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTrip,
  savedTripsCount,
  onOpenGenerator,
  onOpenSavedTrips,
  onOpenConcierge,
  onPrint,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 px-4 lg:px-8 py-3.5 no-print transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onOpenGenerator}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-slate-950 shadow-lg shadow-teal-500/20 font-bold">
            <Compass className="w-5 h-5 text-slate-950 animate-spin-slow" />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-slate-950 flex items-center justify-center">
              <Sparkles className="w-2 h-2 text-slate-950" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg text-white tracking-tight">WanderAI</span>
              <span className="px-1.5 py-0.5 text-[10px] uppercase font-semibold tracking-wider rounded-md bg-teal-500/10 text-teal-400 border border-teal-500/30">
                AI Planner
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Intelligent travel itineraries & local guides</p>
          </div>
        </div>

        {/* Current Destination Pill */}
        {currentTrip && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-white truncate max-w-[200px]">{currentTrip.destination}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">{currentTrip.durationDays} Days</span>
          </div>
        )}

        {/* Navigation & Actions */}
        <div className="flex items-center gap-2">
          {/* AI Concierge Chat trigger */}
          <button
            onClick={onOpenConcierge}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium bg-gradient-to-r from-teal-500/15 to-emerald-500/15 border border-teal-500/30 text-teal-300 hover:bg-teal-500/25 transition-all shadow-sm group"
            title="Ask AI Concierge for recommendations & tips"
          >
            <BotMessageSquare className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">AI Concierge</span>
          </button>

          {/* Print / Export */}
          {currentTrip && (
            <button
              onClick={onPrint}
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all flex items-center gap-1.5"
              title="Print or save as PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden md:inline">Print / PDF</span>
            </button>
          )}

          {/* Saved Trips */}
          <button
            onClick={onOpenSavedTrips}
            className="relative p-2 sm:px-3 sm:py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all flex items-center gap-1.5"
            title="View saved itineraries"
          >
            <Bookmark className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Saved</span>
            {savedTripsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                {savedTripsCount}
              </span>
            )}
          </button>

          {/* Plan New Trip */}
          <button
            onClick={onOpenGenerator}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-teal-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Plan Trip</span>
          </button>
        </div>
      </div>
    </header>
  );
};
