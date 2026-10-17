import React from 'react';
import {
  Clock,
  MapPin,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Lightbulb,
  DollarSign,
  Camera,
  Compass,
  Utensils,
  Landmark,
  ShoppingBag,
  Palmtree,
} from 'lucide-react';
import { Activity } from '../types/travel';

interface ActivityCardProps {
  activity: Activity;
  slot: 'morning' | 'afternoon' | 'evening';
  dayNumber: number;
  destination: string;
  onSwapClick: (slot: 'morning' | 'afternoon' | 'evening', activity: Activity) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  slot,
  dayNumber,
  destination,
  onSwapClick,
}) => {
  const getSlotMeta = () => {
    switch (slot) {
      case 'morning':
        return {
          title: 'Morning',
          badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          dotClass: 'bg-amber-400',
        };
      case 'afternoon':
        return {
          title: 'Afternoon',
          badgeClass: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
          dotClass: 'bg-teal-400',
        };
      case 'evening':
        return {
          title: 'Evening',
          badgeClass: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
          dotClass: 'bg-indigo-400',
        };
    }
  };

  const getCategoryMeta = (cat: string) => {
    switch (cat?.toLowerCase()) {
      case 'cultural':
        return { icon: Landmark, color: 'text-purple-400', bg: 'bg-purple-500/10' };
      case 'food':
        return { icon: Utensils, color: 'text-rose-400', bg: 'bg-rose-500/10' };
      case 'photo':
        return { icon: Camera, color: 'text-amber-400', bg: 'bg-amber-500/10' };
      case 'shopping':
        return { icon: ShoppingBag, color: 'text-pink-400', bg: 'bg-pink-500/10' };
      case 'relaxation':
        return { icon: Palmtree, color: 'text-emerald-400', bg: 'bg-emerald-500/10' };
      case 'adventure':
        return { icon: Compass, color: 'text-sky-400', bg: 'bg-sky-500/10' };
      default:
        return { icon: Compass, color: 'text-teal-400', bg: 'bg-teal-500/10' };
    }
  };

  const slotMeta = getSlotMeta();
  const categoryMeta = getCategoryMeta(activity.category);
  const CategoryIcon = categoryMeta.icon;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${activity.location || activity.title}, ${destination}`
  )}`;

  return (
    <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800/90 p-4 sm:p-5 hover:border-slate-700 transition-all group flex flex-col justify-between print-card shadow-sm">
      {/* Top Meta Line */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border flex items-center gap-1.5 ${slotMeta.badgeClass}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${slotMeta.dotClass}`}></span>
              {slotMeta.title}
            </span>

            {activity.timeSlot && (
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                {activity.timeSlot}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {activity.estimatedCost && (
              <span className="text-[11px] font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                <DollarSign className="w-3 h-3" />
                {activity.estimatedCost}
              </span>
            )}

            {/* Swap Button */}
            <button
              onClick={() => onSwapClick(slot, activity)}
              className="no-print p-1.5 rounded-lg text-slate-400 hover:text-teal-300 hover:bg-teal-500/15 transition-all text-xs flex items-center gap-1"
              title="Change or swap this activity with AI"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Swap</span>
            </button>
          </div>
        </div>

        {/* Title & Category */}
        <div className="mb-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors leading-snug">
              {activity.title}
            </h4>
            <span
              className={`shrink-0 p-1.5 rounded-lg ${categoryMeta.bg} ${categoryMeta.color}`}
              title={activity.category}
            >
              <CategoryIcon className="w-4 h-4" />
            </span>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-teal-400/90 hover:text-teal-300 hover:underline mt-1"
          >
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate max-w-[280px]">{activity.location}</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </a>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-300 leading-relaxed mb-3">{activity.description}</p>

        {/* Highlights */}
        {activity.highlights && activity.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {activity.highlights.map((hl, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700/60"
              >
                ✦ {hl}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Pro Tip Callout */}
      {activity.tips && (
        <div className="mt-2 p-2.5 rounded-xl bg-teal-950/30 border border-teal-800/40 text-[11px] text-teal-200/90 flex items-start gap-2">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-300">Pro Tip: </span>
            <span>{activity.tips}</span>
          </div>
        </div>
      )}
    </div>
  );
};
