"use client";

import { CalendarCheck, History } from "lucide-react";

interface HistoryListProps {
  dates: string[];
}

export default function HistoryList({ dates }: HistoryListProps) {
  // Sort reverse chronologically
  const sortedDates = [...dates].sort((a, b) => b.localeCompare(a));

  return (
    <div className="glass-card rounded-3xl p-8 w-full max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-500/20 p-2.5 rounded-xl text-indigo-400">
          <History size={24} />
        </div>
        <h2 className="text-2xl font-bold">Study History</h2>
      </div>

      {sortedDates.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
          <p className="text-muted-foreground text-sm">No study sessions recorded yet.</p>
          <p className="text-white/40 text-xs mt-1">Start your journey today!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedDates.map((dateStr, index) => {
            const date = new Date(dateStr + "T00:00:00");
            const formattedDate = date.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            });

            return (
              <div 
                key={dateStr}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: 'both' 
                }}
              >
                <div className="bg-emerald-500/10 p-2 rounded-full text-emerald-400 shrink-0">
                  <CalendarCheck size={18} />
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-white tracking-wide text-[15px]">{formattedDate}</p>
                  <p className="text-xs text-white/40">Keep the streak alive!</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
