import React from 'react';
import { X, MapPin, Calendar, Trash2, ArrowRight, Download, Bookmark } from 'lucide-react';
import { TripPlan } from '../types/travel';

interface SavedTripsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedTrips: TripPlan[];
  onSelectTrip: (trip: TripPlan) => void;
  onDeleteTrip: (tripId: string) => void;
}

export const SavedTripsModal: React.FC<SavedTripsModalProps> = ({
  isOpen,
  onClose,
  savedTrips,
  onSelectTrip,
  onDeleteTrip,
}) => {
  if (!isOpen) return null;

  const exportTripAsJson = (trip: TripPlan) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(trip, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${trip.destination.toLowerCase().replace(/[^a-z0-9]/g, '_')}_itinerary.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden p-6">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400/15 text-amber-400 flex items-center justify-center">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">My Saved Trips</h3>
              <p className="text-xs text-slate-400">
                {savedTrips.length} {savedTrips.length === 1 ? 'trip' : 'trips'} saved on this device
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {savedTrips.length === 0 ? (
          <div className="py-12 text-center text-slate-400 space-y-2">
            <Bookmark className="w-10 h-10 text-slate-600 mx-auto stroke-1" />
            <p className="text-sm font-medium text-slate-300">No saved itineraries yet</p>
            <p className="text-xs text-slate-500">
              When viewing an itinerary, click the "Save Trip" button to keep it here.
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {savedTrips.map((trip) => (
              <div
                key={trip.id}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => {
                    onSelectTrip(trip);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-teal-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {trip.destination}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {trip.durationDays} Days
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[10px] uppercase font-semibold text-emerald-400">
                      {trip.budgetLevel.replace('_', ' ')}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
                    {trip.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{trip.tagline}</p>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => exportTripAsJson(trip)}
                    className="p-2 rounded-xl text-slate-400 hover:text-teal-300 hover:bg-slate-800 transition-all"
                    title="Export as JSON"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteTrip(trip.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                    title="Delete trip"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onSelectTrip(trip);
                      onClose();
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-teal-500 text-slate-950 text-xs font-bold hover:brightness-110 flex items-center gap-1 transition-all"
                  >
                    <span>Open</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
