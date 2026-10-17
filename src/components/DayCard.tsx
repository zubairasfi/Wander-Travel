import React from 'react';
import { Bus, Key, Compass, Sparkles } from 'lucide-react';
import { DayPlan, Activity } from '../types/travel';
import { ActivityCard } from './ActivityCard';
import { MealsCard } from './MealsCard';
import { VisualRouteTimeline } from './VisualRouteTimeline';

interface DayCardProps {
  day: DayPlan;
  destination: string;
  onSwapActivity: (dayNumber: number, slot: 'morning' | 'afternoon' | 'evening', activity: Activity) => void;
}

export const DayCard: React.FC<DayCardProps> = ({ day, destination, onSwapActivity }) => {
  return (
    <div className="rounded-3xl bg-slate-900/40 border border-slate-800/80 p-5 sm:p-7 space-y-6 print-card shadow-lg">
      {/* Day Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-xl text-xs font-bold bg-teal-500 text-slate-950 font-display shadow-md shadow-teal-500/20">
              DAY {day.dayNumber}
            </span>
            <span className="px-2.5 py-0.5 rounded-lg text-xs font-medium bg-slate-800 text-teal-300 border border-teal-500/20">
              📍 {day.neighborhood}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display tracking-tight">
            {day.theme}
          </h3>
        </div>
      </div>

      {/* Transit & Insider Tips Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {day.transportationTips && (
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-sky-500/15 text-sky-400 shrink-0">
              <Bus className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white block mb-0.5">Transit & Getting Around:</span>
              <p className="leading-relaxed text-slate-300">{day.transportationTips}</p>
            </div>
          </div>
        )}

        {day.insiderTip && (
          <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-900/30 text-xs text-amber-200/90 flex items-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400 shrink-0">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-amber-300 block mb-0.5">Secret Local Insight:</span>
              <p className="leading-relaxed text-amber-200/90">{day.insiderTip}</p>
            </div>
          </div>
        )}
      </div>

      {/* Visual Sequence of the Day */}
      <VisualRouteTimeline day={day} destination={destination} />

      {/* Morning, Afternoon, Evening Activities */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Day Schedule</h4>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <ActivityCard
            activity={day.morning}
            slot="morning"
            dayNumber={day.dayNumber}
            destination={destination}
            onSwapClick={(slot, act) => onSwapActivity(day.dayNumber, slot, act)}
          />
          <ActivityCard
            activity={day.afternoon}
            slot="afternoon"
            dayNumber={day.dayNumber}
            destination={destination}
            onSwapClick={(slot, act) => onSwapActivity(day.dayNumber, slot, act)}
          />
          <ActivityCard
            activity={day.evening}
            slot="evening"
            dayNumber={day.dayNumber}
            destination={destination}
            onSwapClick={(slot, act) => onSwapActivity(day.dayNumber, slot, act)}
          />
        </div>
      </div>

      {/* Food & Dining */}
      <MealsCard meals={day.meals} destination={destination} />
    </div>
  );
};
