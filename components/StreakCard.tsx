"use client";

import { Flame, CalendarDays, Award } from "lucide-react";

interface StreakCardProps {
  currentStreak: number;
  totalDays: number;
  lastStudyDate: string | null;
}

export default function StreakCard({ currentStreak, totalDays, lastStudyDate }: StreakCardProps) {
  // Format the date beautifully (e.g., "11 March 2026")
  const formattedDate = lastStudyDate 
    ? new Date(lastStudyDate + "T00:00:00").toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : "Not yet studied";

  return (
    <div className="glass-card rounded-3xl p-8 w-full max-w-md mx-auto transform transition-all hover:scale-[1.02] duration-300">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">
          Keep it up! <span className="text-2xl ml-1">🚀</span>
        </h1>
        <p className="text-muted-foreground">Every day gets you closer to mastery.</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Streak View */}
        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-orange-500/20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-orange-500/20 p-3 rounded-full text-orange-500">
              <Flame size={32} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-orange-500/80 mb-1">Current Streak</p>
              <h2 className="text-4xl font-black text-white">{currentStreak} <span className="text-xl font-bold text-white/70">days</span></h2>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Total Days */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/10 flex flex-col items-start">
            <Award size={20} className="text-blue-400 mb-2" />
            <p className="text-xs font-medium text-white/50 mb-1">Total Study Days</p>
            <p className="text-xl font-bold text-white">{totalDays}</p>
          </div>

          {/* Last Studied */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/10 flex flex-col items-start">
            <CalendarDays size={20} className="text-emerald-400 mb-2" />
            <p className="text-xs font-medium text-white/50 mb-1">Last Studied</p>
            <p className="text-sm font-bold text-white leading-tight">{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
