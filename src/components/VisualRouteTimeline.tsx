import React from 'react';
import { DayPlan } from '../types/travel';
import { Navigation, ArrowRight, MapPin, Footprints } from 'lucide-react';

interface VisualRouteTimelineProps {
  day: DayPlan;
  destination: string;
}

export const VisualRouteTimeline: React.FC<VisualRouteTimelineProps> = ({ day, destination }) => {
  const stops = [
    { type: 'Morning', title: day.morning.title, location: day.morning.location, color: 'bg-amber-400' },
    ...(day.meals?.find((m) => m.mealType === 'lunch')
      ? [
          {
            type: 'Lunch',
            title: day.meals.find((m) => m.mealType === 'lunch')!.name,
            location: day.meals.find((m) => m.mealType === 'lunch')!.location || day.neighborhood,
            color: 'bg-rose-400',
          },
        ]
      : []),
    { type: 'Afternoon', title: day.afternoon.title, location: day.afternoon.location, color: 'bg-teal-400' },
    { type: 'Evening', title: day.evening.title, location: day.evening.location, color: 'bg-indigo-400' },
    ...(day.meals?.find((m) => m.mealType === 'dinner')
      ? [
          {
            type: 'Dinner',
            title: day.meals.find((m) => m.mealType === 'dinner')!.name,
            location: day.meals.find((m) => m.mealType === 'dinner')!.location || day.neighborhood,
            color: 'bg-purple-400',
          },
        ]
      : []),
  ];

  return (
    <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-4 sm:p-5 print-card">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-teal-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Day {day.dayNumber} Route Flow ({day.neighborhood})
          </h4>
        </div>
        <span className="text-[11px] text-slate-500 hidden sm:inline flex items-center gap-1">
          <Footprints className="w-3 h-3 text-slate-400" /> Planned for seamless transit
        </span>
      </div>

      {/* Horizontal visual sequence */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {stops.map((stop, index) => {
          const isLast = index === stops.length - 1;
          const query = encodeURIComponent(`${stop.location || stop.title}, ${destination}`);
          const url = `https://www.google.com/maps/search/?api=1&query=${query}`;

          return (
            <React.Fragment key={index}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-teal-500/50 hover:bg-slate-800/60 transition-all max-w-[190px] group"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`w-2 h-2 rounded-full ${stop.color}`}></span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    {stop.type}
                  </span>
                </div>
                <h5 className="text-xs font-bold text-white group-hover:text-teal-300 truncate">
                  {stop.title}
                </h5>
                <p className="text-[10px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                  <MapPin className="w-2.5 h-2.5 shrink-0 text-slate-500" />
                  <span className="truncate">{stop.location || 'Local area'}</span>
                </p>
              </a>

              {!isLast && (
                <div className="shrink-0 flex items-center text-slate-600 px-1">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
