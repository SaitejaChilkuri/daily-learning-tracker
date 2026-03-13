"use client";

import { ACHIEVEMENTS, getUnlockedAchievements } from "@/lib/achievementLogic";
import { motion } from "framer-motion";

interface AchievementsProps {
  maxStreak: number;
}

export function Achievements({ maxStreak }: AchievementsProps) {
  const unlockedIds = getUnlockedAchievements(maxStreak, maxStreak).map(a => a.id);

  return (
    <div className="glass-card p-6 rounded-3xl w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Achievements</h2>
        <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">
          {unlockedIds.length} / {ACHIEVEMENTS.length} Unlocked
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {ACHIEVEMENTS.map((badge, idx) => {
          const isUnlocked = unlockedIds.includes(badge.id);

          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, type: "spring" }}
              className={`relative flex flex-col items-center p-4 rounded-2xl border transition-all text-center group overflow-hidden ${
                isUnlocked 
                  ? "bg-[var(--card)]/50 border-[var(--border)]" 
                  : "bg-black/5 dark:bg-white/5 border-transparent opacity-50 grayscale hover:grayscale-0 transition-opacity hover:opacity-100"
              }`}
            >
              {isUnlocked && (
                 <div className={`absolute inset-0 bg-gradient-to-b ${badge.color} opacity-5 group-hover:opacity-15 transition-opacity`} />
              )}
              
              <div className={`text-3xl mb-3 ${isUnlocked ? 'animate-bounce-slight' : ''}`}>
                {badge.icon}
              </div>
              
              <h4 className="font-bold text-sm text-[var(--foreground)] leading-tight mb-1">
                {badge.title}
              </h4>
              
              <p className="text-[10px] text-[var(--muted-foreground)]">
                {isUnlocked ? badge.description : `Unlock at ${badge.requiredStreak} days`}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
