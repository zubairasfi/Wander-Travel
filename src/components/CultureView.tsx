import React, { useState } from 'react';
import {
  HeartHandshake,
  CheckCircle,
  XCircle,
  PhoneCall,
  Volume2,
  Copy,
  Check,
  Globe2,
  Bus,
} from 'lucide-react';
import { TripPlan } from '../types/travel';

interface CultureViewProps {
  trip: TripPlan;
}

export const CultureView: React.FC<CultureViewProps> = ({ trip }) => {
  const { localEtiquetteAndTips, destination } = trip;
  const [copiedPhrase, setCopiedPhrase] = useState<string | null>(null);

  const handleCopyPhrase = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPhrase(text);
    setTimeout(() => setCopiedPhrase(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Tipping & Transit banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tipping Rules */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <HeartHandshake className="w-4 h-4" />
            <span>Tipping Etiquette</span>
          </div>
          <h4 className="text-base font-bold text-white font-display mb-1.5">How Tipping Works Here</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {localEtiquetteAndTips.tippingCustoms}
          </p>
        </div>

        {/* Transit Highlights */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Bus className="w-4 h-4" />
            <span>Transit & Navigation</span>
          </div>
          <h4 className="text-base font-bold text-white font-display mb-1.5">Getting Around Effortlessly</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {localEtiquetteAndTips.transportHighlights}
          </p>
        </div>
      </div>

      {/* Cultural Do's & Don'ts */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <h4 className="text-base font-bold text-white font-display mb-4 flex items-center gap-2">
          <Globe2 className="w-4 h-4 text-teal-400" />
          <span>Local Customs: Do’s and Don’ts in {destination}</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {localEtiquetteAndTips.culturalDoAndDonts.map((rule, idx) => {
            const isDo = rule.toLowerCase().startsWith('do') || !rule.toLowerCase().startsWith('don');
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                  isDo
                    ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-100'
                    : 'bg-rose-950/20 border-rose-900/40 text-rose-100'
                }`}
              >
                {isDo ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <span className="text-xs leading-relaxed">{rule}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Useful Phrases */}
      {localEtiquetteAndTips.usefulPhrases && localEtiquetteAndTips.usefulPhrases.length > 0 && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-teal-400" />
              <span>Key Phrases to Know</span>
            </h4>
            <span className="text-[11px] text-slate-400">Locals love it when you try!</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {localEtiquetteAndTips.usefulPhrases.map((phrase, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-teal-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-bold text-white">{phrase.phrase}</span>
                    <button
                      onClick={() => handleCopyPhrase(phrase.translation)}
                      className="p-1 rounded text-slate-400 hover:text-teal-300"
                      title="Copy local phrase"
                    >
                      {copiedPhrase === phrase.translation ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <div className="text-sm font-extrabold text-teal-300">{phrase.translation}</div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                  Pronunciation: <span className="text-slate-300 italic">{phrase.pronunciation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Emergency Numbers */}
      {localEtiquetteAndTips.emergencyNumbers && localEtiquetteAndTips.emergencyNumbers.length > 0 && (
        <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Local Emergency Contacts
              </h5>
              <p className="text-[11px] text-slate-400">Keep these handy on your phone</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {localEtiquetteAndTips.emergencyNumbers.map((em, idx) => (
              <div
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-slate-200 flex items-center gap-2"
              >
                <span className="text-slate-400">{em.name}:</span>
                <span className="font-bold text-rose-400">{em.number}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
