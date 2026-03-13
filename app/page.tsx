"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { ThemeToggle } from "@/components/ThemeToggle";
import { MotivationBanner } from "@/components/MotivationBanner";
import { StatsGrid } from "@/components/StatsGrid";
import { HeatmapCalendar } from "@/components/HeatmapCalendar";
import { Achievements } from "@/components/Achievements";
import { StudyButton } from "@/components/StudyButton";

import { canMarkToday, getLocalDateString, calculateAdvancedStats, CompleteStreakStats } from "@/lib/streakLogic";
import { checkNewlyUnlocked } from "@/lib/achievementLogic";
import { BarChart3, Clock } from "lucide-react";

export default function DashboardPage() {
  const [dates, setDates] = useState<string[]>([]);
  const [stats, setStats] = useState<CompleteStreakStats>({
    currentStreak: 0,
    longestStreak: 0,
    totalDays: 0,
    weeklyConsistency: 0,
  });
  
  const [isMarkedToday, setIsMarkedToday] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchStreakData = async () => {
      try {
        const [historyRes, streakRes] = await Promise.all([
          fetch(`/api/history`),
          fetch(`/api/streak`)
        ]);

        if (historyRes.ok && streakRes.ok) {
           const apiDates = await historyRes.json();
           const apiStats = await streakRes.json();
           
           setDates(apiDates);
           setStats(apiStats);
           
           const today = getLocalDateString();
           if (apiDates.includes(today)) {
              setIsMarkedToday(true);
           }
        }
      } catch (err) {
        console.error("Failed to fetch streak data", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStreakData();
  }, []);

  const handleMarkStudy = async () => {
    setIsSubmitting(true);
    
    try {
      const today = getLocalDateString();
      const prevStreak = stats.currentStreak;

      const res = await fetch('/api/study', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: today })
      });

      if (!res.ok) {
         const errData = await res.json();
         toast.error(errData.error || "Failed to save streak.");
         return;
      }

      // Re-fetch authoritative stats from DB to ensure sync
      const streakRes = await fetch(`/api/streak`);
      if (streakRes.ok) {
         const newStats = await streakRes.json();
         setStats(newStats);
         setDates(prev => [today, ...prev]);
         setIsMarkedToday(true);
         
         toast.success(`Streak increased to ${newStats.currentStreak} days! Keep it up!`, {
           icon: "🔥",
         });

         const unlocked = checkNewlyUnlocked(prevStreak, newStats.currentStreak);
         if (unlocked) {
           toast.message(`Achievement Unlocked!`, {
              description: unlocked.title,
              icon: unlocked.icon,
              duration: 6000,
              className: "font-bold"
           });
         }
      }
    } catch (err) {
      console.error("Failed to record study", err);
      toast.error("Failed to save streak. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 w-full">
        <div className="w-10 h-10 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin shadow-[0_0_30px_var(--primary)]" />
        <p className="text-[var(--muted-foreground)] font-medium animate-pulse">Synchronizing Tracker...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-8 relative z-10">
      
      {/* TOP HEADER */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between w-full"
      >
        <div>
           <h1 className="text-3xl md:text-4xl font-black tracking-tight gradient-text">Tracker Pro</h1>
           <p className="text-[var(--muted-foreground)] font-medium text-sm mt-1">Master your learning habits.</p>
        </div>
        <ThemeToggle />
      </motion.header>

      {/* MOTIVATION / AI BANNER */}
      <MotivationBanner currentStreak={stats.currentStreak} />

      {/* CORE STATS GRID */}
      <StatsGrid stats={stats} />

      {/* MIDDLE SECTION - CALENDAR & BUTTON */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
           <HeatmapCalendar dates={dates} />
        </div>
        
        <div className="flex flex-col justify-center gap-6 glass-card p-6 rounded-3xl">
           <h3 className="text-lg font-bold text-center">Ready for today?</h3>
           <StudyButton 
             onMarkStudy={handleMarkStudy} 
             alreadyMarked={isMarkedToday} 
             isLoading={isSubmitting} 
           />
        </div>
      </div>

      {/* ACHIEVEMENTS */}
      <Achievements maxStreak={stats.longestStreak} />

      {/* NAVIGATION OUT TO DEEPER VIEWS */}
      <div className="flex justify-center gap-4 mt-8 pb-10">
        <Link href="/analytics">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 px-6 py-3 rounded-full glass-card hover:bg-[var(--muted)] transition-colors text-sm font-bold">
            <BarChart3 size={18} className="text-blue-500" />
            Deep Analytics
          </motion.div>
        </Link>
        <Link href="/history">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 px-6 py-3 rounded-full glass-card hover:bg-[var(--muted)] transition-colors text-sm font-bold">
            <Clock size={18} className="text-emerald-500" />
            Timeline History
          </motion.div>
        </Link>
      </div>

    </div>
  );
}
