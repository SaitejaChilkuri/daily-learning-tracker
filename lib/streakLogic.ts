export function getLocalDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export interface CompleteStreakStats {
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  weeklyConsistency: number; // 0 to 7
}

export function calculateAdvancedStats(dates: string[], today: string): CompleteStreakStats {
  if (!dates || dates.length === 0) {
    return { currentStreak: 0, longestStreak: 0, totalDays: 0, weeklyConsistency: 0 };
  }
  
  // Clean and sort descending
  const sortedDates = Array.from(new Set(dates)).sort((a, b) => b.localeCompare(a));
  
  const todayDate = new Date(today + "T00:00:00");
  const yesterdayDate = new Date(todayDate);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  
  const yesterday = `${yesterdayDate.getFullYear()}-${String(yesterdayDate.getMonth() + 1).padStart(2, '0')}-${String(yesterdayDate.getDate()).padStart(2, '0')}`;

  let currentStreak = 0;
  let expectedDate = sortedDates[0] === today ? today : yesterday;

  for (const date of sortedDates) {
    if (date === expectedDate) {
      currentStreak++;
      const nextExpected = new Date(expectedDate + "T00:00:00");
      nextExpected.setDate(nextExpected.getDate() - 1);
      expectedDate = `${nextExpected.getFullYear()}-${String(nextExpected.getMonth() + 1).padStart(2, '0')}-${String(nextExpected.getDate()).padStart(2, '0')}`;
    } else {
       break;
    }
  }

  // Calculate Longest Streak by scanning history forwards
  const ascendingDates = [...sortedDates].reverse();
  let longestStreak = 0;
  let tempStreak = 1;
  
  for (let i = 1; i < ascendingDates.length; i++) {
     const prev = new Date(ascendingDates[i - 1] + "T00:00:00");
     const curr = new Date(ascendingDates[i] + "T00:00:00");
     const diffDays = Math.floor((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
     
     if (diffDays === 1) {
       tempStreak++;
     } else if (diffDays > 1) {
       tempStreak = 1;
     }
     if (tempStreak > longestStreak) longestStreak = tempStreak;
  }
  
  const finalLongest = Math.max(longestStreak, currentStreak, 1);

  // Weekly consistency (days studied in last 7 days including today)
  let weeklyConsistency = 0;
  const sevenDaysAgo = new Date(todayDate);
  sevenDaysAgo.setDate(todayDate.getDate() - 7);
  
  sortedDates.forEach(d => {
     const dTime = new Date(d + "T00:00:00").getTime();
     if (dTime > sevenDaysAgo.getTime() && dTime <= todayDate.getTime()) {
        weeklyConsistency++;
     }
  });

  return {
     currentStreak,
     longestStreak: finalLongest,
     totalDays: sortedDates.length,
     weeklyConsistency
  };
}

export function canMarkToday(dates: string[], today: string): boolean {
  return !dates.includes(today);
}
