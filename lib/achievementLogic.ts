export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  requiredStreak: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "streak-3",
    title: "Getting Warmed Up",
    description: "Hit a 3-day study streak",
    icon: "🔥",
    color: "from-orange-500 to-red-500",
    requiredStreak: 3
  },
  {
    id: "streak-7",
    title: "Weekly Warrior",
    description: "Hit a 7-day study streak",
    icon: "🚀",
    color: "from-blue-500 to-indigo-500",
    requiredStreak: 7
  },
  {
    id: "streak-14",
    title: "14 Day Champion",
    description: "Two weeks of non-stop learning",
    icon: "🏆",
    color: "from-yellow-400 to-orange-500",
    requiredStreak: 14
  },
  {
    id: "streak-30",
    title: "30 Day Master",
    description: "A whole month of dedication",
    icon: "👑",
    color: "from-purple-500 to-pink-500",
    requiredStreak: 30
  },
  {
    id: "streak-100",
    title: "100 Day Legend",
    description: "Centurion focus levels achieved",
    icon: "💎",
    color: "from-cyan-400 to-blue-600",
    requiredStreak: 100
  }
];

export function getUnlockedAchievements(currentStreak: number, maxStreak: number): Achievement[] {
  // Use maxStreak if you want badges to be permanently kept, 
  // or currentStreak if you only want them active while streak is alive.
  // We'll use maxStreak so gamification progress isn't completely lost!
  return ACHIEVEMENTS.filter(badge => maxStreak >= badge.requiredStreak);
}

export function checkNewlyUnlocked(previousStreak: number, currentStreak: number): Achievement | null {
  // Finds if the exact jump in streak just crossed a boundary
  const newlyUnlocked = ACHIEVEMENTS.find(
    badge => previousStreak < badge.requiredStreak && currentStreak >= badge.requiredStreak
  );
  return newlyUnlocked || null;
}
