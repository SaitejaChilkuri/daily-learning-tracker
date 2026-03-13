"use client";

import { CompleteStreakStats } from "@/lib/streakLogic";
import { DashboardCard } from "./DashboardCard";
import { Flame, Medal, CalendarDays, Activity } from "lucide-react";

interface StatsGridProps {
  stats: CompleteStreakStats;
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <DashboardCard
        title="Current Streak"
        value={`${stats.currentStreak} 🔥`}
        subtitle="Keep the fire burning!"
        icon={<Flame size={24} className="text-orange-500" />}
        delay={0.1}
        className="bg-gradient-to-br from-orange-500/5 to-transparent border-orange-500/10"
      />
      
      <DashboardCard
        title="Longest Streak"
        value={`${stats.longestStreak} 👑`}
        subtitle="Your all-time personal best"
        icon={<Medal size={24} className="text-yellow-500" />}
        delay={0.2}
      />
      
      <DashboardCard
        title="Total Days"
        value={stats.totalDays}
        subtitle="Total study sessions recorded"
        icon={<CalendarDays size={24} className="text-blue-500" />}
        delay={0.3}
      />
      
      <DashboardCard
        title="Weekly Consistency"
        value={`${stats.weeklyConsistency}/7`}
        subtitle="Days studied this week"
        icon={<Activity size={24} className="text-emerald-500" />}
        delay={0.4}
        trend={{
          value: Math.round((stats.weeklyConsistency / 7) * 100),
          label: "metric",
          isPositive: stats.weeklyConsistency >= 4
        }}
      />
    </div>
  );
}
