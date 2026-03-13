"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BarChart3, TrendingUp, Filter } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Charts } from "@/components/Charts";
import { DashboardCard } from "@/components/DashboardCard";
import { calculateAdvancedStats, CompleteStreakStats, getLocalDateString } from "@/lib/streakLogic";

export default function AnalyticsPage() {
  const [dates, setDates] = useState<string[]>([]);
  const [stats, setStats] = useState<CompleteStreakStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [historyRes, statsRes] = await Promise.all([
           fetch('/api/history'),
           fetch('/api/analytics')
        ]);
        
        if (historyRes.ok && statsRes.ok) {
          const apiDates = await historyRes.json();
          const apiStats = await statsRes.json();
          setDates(apiDates);
          setStats(apiStats);
        }
      } catch (err) {
        console.error("Error fetching analytics", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
      <header className="flex items-center justify-between w-full">
         <Link 
           href="/" 
           className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors bg-[var(--muted)] hover:bg-[var(--border)] px-4 py-2 rounded-full"
         >
           <ArrowLeft size={16} />
           Back to Dashboard
         </Link>
         <ThemeToggle />
      </header>

      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl">
               <BarChart3 size={28} />
            </div>
            <div>
               <h1 className="text-3xl font-black">Deep Analytics</h1>
               <p className="text-[var(--muted-foreground)] text-sm">Visualize your performance.</p>
            </div>
         </div>
      </div>

      {isLoading || !stats ? (
        <div className="flex items-center justify-center min-h-[30vh]">
          <div className="w-8 h-8 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <DashboardCard
               title="Average Consistency"
               value={`${Math.round((stats.totalDays / Math.max(stats.longestStreak, 1)) * 100)}%`}
               subtitle="Of longest streak length"
               icon={<Filter size={24} className="text-emerald-500" />}
             />
             <DashboardCard
               title="Current Trajectory"
               value={stats.currentStreak >= stats.longestStreak ? "Peaking" : "Building"}
               subtitle="Compared to personal best"
               icon={<TrendingUp size={24} className="text-blue-500" />}
               className="lg:col-span-2"
             />
          </div>

          {/* Interactive Recharts visual */}
          <Charts dates={dates} />
        </>
      )}
    </div>
  );
}
