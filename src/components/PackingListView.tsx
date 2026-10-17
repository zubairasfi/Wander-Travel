import React, { useState } from 'react';
import { CheckSquare, Square, Plus, Sparkles, CheckCircle2, ShieldCheck, Filter } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PackingCategory, PackingItem } from '../types/travel';

interface PackingListViewProps {
  packingList: PackingCategory[];
  onUpdatePackingList: (updatedList: PackingCategory[]) => void;
  destination: string;
}

export const PackingListView: React.FC<PackingListViewProps> = ({
  packingList,
  onUpdatePackingList,
  destination,
}) => {
  const [newItemName, setNewItemName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(packingList[0]?.category || 'Essentials & Documents');
  const [filterMode, setFilterMode] = useState<'all' | 'unpacked' | 'essential'>('all');

  // Compute progress
  let totalItems = 0;
  let packedItems = 0;

  packingList.forEach((cat) => {
    cat.items.forEach((item) => {
      totalItems++;
      if (item.checked) packedItems++;
    });
  });

  const percent = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

  const toggleItem = (catIndex: number, itemId: string) => {
    const next = packingList.map((cat, cIdx) => {
      if (cIdx !== catIndex) return cat;
      return {
        ...cat,
        items: cat.items.map((item) => {
          if (item.id === itemId) {
            const nextChecked = !item.checked;
            return { ...item, checked: nextChecked };
          }
          return item;
        }),
      };
    });

    onUpdatePackingList(next);

    // If this click completes the list, fire confetti!
    const newlyPacked = packedItems + 1;
    if (newlyPacked === totalItems && totalItems > 0) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Confetti fallback
      }
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const next = packingList.map((cat) => {
      if (cat.category === selectedCategory) {
        return {
          ...cat,
          items: [
            ...cat.items,
            {
              id: `custom_${Date.now()}`,
              name: newItemName.trim(),
              checked: false,
              essential: false,
            },
          ],
        };
      }
      return cat;
    });

    onUpdatePackingList(next);
    setNewItemName('');
  };

  return (
    <div className="space-y-6">
      {/* Progress & Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-bold text-white font-display">Packing Checklist for {destination}</h3>
            <p className="text-xs text-slate-400">
              Curated items based on local climate, walking requirements, and cultural sites
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-teal-400 font-display">{percent}%</span>
            <span className="text-xs text-slate-400">
              ({packedItems} of {totalItems} packed)
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden border border-slate-800 p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-300"
            style={{ width: `${percent}%` }}
          ></div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-800/80">
          <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> View:
          </span>
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
              filterMode === 'all'
                ? 'bg-teal-500 text-slate-950 font-bold'
                : 'bg-slate-800/80 text-slate-400 hover:text-white'
            }`}
          >
            All Items ({totalItems})
          </button>
          <button
            onClick={() => setFilterMode('unpacked')}
            className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
              filterMode === 'unpacked'
                ? 'bg-teal-500 text-slate-950 font-bold'
                : 'bg-slate-800/80 text-slate-400 hover:text-white'
            }`}
          >
            Unpacked ({totalItems - packedItems})
          </button>
          <button
            onClick={() => setFilterMode('essential')}
            className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
              filterMode === 'essential'
                ? 'bg-teal-500 text-slate-950 font-bold'
                : 'bg-slate-800/80 text-slate-400 hover:text-white'
            }`}
          >
            Essentials Only
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {packingList.map((cat, catIdx) => {
          const visibleItems = cat.items.filter((item) => {
            if (filterMode === 'unpacked') return !item.checked;
            if (filterMode === 'essential') return item.essential;
            return true;
          });

          if (visibleItems.length === 0 && filterMode !== 'all') return null;

          return (
            <div
              key={catIdx}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
                  <h4 className="text-sm font-bold text-white font-display flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-teal-400" />
                    <span>{cat.category}</span>
                  </h4>
                  <span className="text-[11px] font-medium text-slate-400">
                    {cat.items.filter((i) => i.checked).length} / {cat.items.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {visibleItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(catIdx, item.id)}
                      className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                        item.checked
                          ? 'bg-emerald-950/20 border-emerald-900/40 text-slate-400 line-through'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-white'
                      }`}
                    >
                      <button type="button" className="shrink-0 mt-0.5 text-teal-400">
                        {item.checked ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-600 hover:text-teal-400" />
                        )}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-medium ${item.checked ? 'text-slate-500' : 'text-slate-200'}`}>
                            {item.name}
                          </span>
                          {item.essential && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-amber-400/10 text-amber-300 border border-amber-400/20">
                              Essential
                            </span>
                          )}
                        </div>
                        {item.reason && (
                          <p className="text-[10px] text-slate-500 mt-0.5">{item.reason}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Item */}
      <form
        onSubmit={handleAddItem}
        className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center gap-3 no-print"
      >
        <span className="text-xs font-semibold text-slate-300 shrink-0">Add Custom Item:</span>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-teal-500 shrink-0"
        >
          {packingList.map((cat, idx) => (
            <option key={idx} value={cat.category}>
              {cat.category}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="e.g. Scuba diving goggles, Extra camera lens, Hiking pole..."
          className="flex-1 w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
        />
        <button
          type="submit"
          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-teal-500 text-slate-950 text-xs font-bold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </form>
    </div>
  );
};
