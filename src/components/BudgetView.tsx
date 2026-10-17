import React from 'react';
import { Wallet, Coins, TrendingUp, Info, CreditCard, Banknote } from 'lucide-react';
import { TripPlan } from '../types/travel';

interface BudgetViewProps {
  trip: TripPlan;
}

export const BudgetView: React.FC<BudgetViewProps> = ({ trip }) => {
  const { estimatedBudget, currency, durationDays, travelGroup } = trip;
  const avgMinDaily = Math.round(estimatedBudget.totalMinUSD / durationDays);
  const avgMaxDaily = Math.round(estimatedBudget.totalMaxUSD / durationDays);

  const getCategoryColor = (index: number) => {
    const colors = [
      'bg-teal-500',
      'bg-amber-400',
      'bg-indigo-400',
      'bg-rose-400',
      'bg-emerald-400',
      'bg-purple-400',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Cost Range */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400 mb-1">
              <Wallet className="w-4 h-4" />
              <span>Estimated Total Budget</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-2">
              ${estimatedBudget.totalMinUSD.toLocaleString()} – ${estimatedBudget.totalMaxUSD.toLocaleString()}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              For {durationDays} days • {travelGroup} travel party
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span>Excludes international long-haul flights</span>
          </div>
        </div>

        {/* Daily Average */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Daily Average per Party</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-display mt-2">
              ${avgMinDaily} – ${avgMaxDaily}
              <span className="text-sm font-normal text-slate-400"> / day</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              All inclusive: stay, meals, transit & experiences
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
            Paced for {trip.budgetLevel.replace('_', ' ')} tier
          </div>
        </div>

        {/* Currency & Payment Tips */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
              <Coins className="w-4 h-4" />
              <span>Currency & Payments</span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-extrabold text-white font-display">{currency.code}</span>
              <span className="text-lg font-bold text-amber-300">({currency.symbol})</span>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {currency.rateDescription}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5 text-slate-400" />
            <span>Carry a mix of cards and local cash</span>
          </div>
        </div>
      </div>

      {/* Visual Category Bar */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <h4 className="text-sm font-bold text-white font-display mb-3">Cost Breakdown by Category</h4>

        {/* Multi-segment progress bar */}
        <div className="w-full h-4 rounded-full bg-slate-950 overflow-hidden flex p-0.5 border border-slate-800 mb-6">
          {estimatedBudget.categories.map((cat, idx) => (
            <div
              key={idx}
              className={`${getCategoryColor(idx)} h-full first:rounded-l-full last:rounded-r-full transition-all duration-300`}
              style={{ width: `${cat.percentage}%` }}
              title={`${cat.category}: ${cat.percentage}%`}
            ></div>
          ))}
        </div>

        {/* Cards for each category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {estimatedBudget.categories.map((cat, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3"
            >
              <span className={`w-3 h-3 rounded-full mt-1 shrink-0 ${getCategoryColor(idx)}`}></span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="text-xs font-bold text-white">{cat.category}</span>
                  <span className="text-xs font-extrabold text-teal-300">${cat.amountUSD}</span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{cat.percentage}% of budget</span>
                </div>
                {cat.note && <p className="text-[10px] text-slate-400 mt-1 italic">{cat.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
