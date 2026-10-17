import React from 'react';
import { Utensils, MapPin, ExternalLink, Sparkles } from 'lucide-react';
import { MealRecommendation } from '../types/travel';

interface MealsCardProps {
  meals: MealRecommendation[];
  destination: string;
}

export const MealsCard: React.FC<MealsCardProps> = ({ meals, destination }) => {
  if (!meals || meals.length === 0) return null;

  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 sm:p-5 print-card">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
          <Utensils className="w-4 h-4" />
        </div>
        <h4 className="text-sm font-bold text-white font-display">Curated Dining & Local Flavors</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {meals.map((meal, index) => {
          const mapQuery = encodeURIComponent(`${meal.name}, ${meal.location || destination}`);
          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

          return (
            <div
              key={index}
              className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-300 border border-rose-500/20">
                    {meal.mealType}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium">{meal.cuisine}</span>
                    <span className="text-xs font-bold text-emerald-400">{meal.estimatedCost}</span>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-1 mb-1">
                  <h5 className="text-sm font-bold text-white">{meal.name}</h5>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded text-slate-400 hover:text-teal-300 transition-colors"
                    title="Find on Google Maps"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {meal.location && (
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mb-1.5">
                    <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                    <span>{meal.location}</span>
                  </p>
                )}

                <p className="text-xs text-slate-300 leading-relaxed mb-2.5">{meal.description}</p>
              </div>

              {/* Recommended dishes */}
              {meal.recommendedDishes && meal.recommendedDishes.length > 0 && (
                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Signature to try:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {meal.recommendedDishes.map((dish, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-900 text-amber-200 border border-amber-400/20"
                      >
                        🍽️ {dish}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
