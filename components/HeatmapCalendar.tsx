"use client";

import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { useTheme } from "next-themes";
import { format, subDays, startOfDay } from "date-fns";

interface HeatmapCalendarProps {
  dates: string[];
}

export function HeatmapCalendar({ dates }: HeatmapCalendarProps) {
  const { resolvedTheme } = useTheme();

  // Prepare 6 months of data
  const endDate = startOfDay(new Date());
  const startDate = subDays(endDate, 180);

  // Group dates by frequency
  const frequencyMap = new Map<string, number>();
  dates.forEach(d => {
     frequencyMap.set(d, (frequencyMap.get(d) || 0) + 1);
  });

  const heatmapValues = Array.from(frequencyMap.entries()).map(([date, count]) => ({
     date: new Date(date + "T00:00:00"),
     count
  }));

  const getClassForValue = (value: any) => {
    if (!value || value.count === 0) return "color-empty";
    if (value.count === 1) return "color-scale-1";
    if (value.count === 2) return "color-scale-2";
    if (value.count === 3) return "color-scale-3";
    return "color-scale-4";
  };

  return (
    <div className="glass-card p-6 rounded-3xl w-full overflow-hidden">
      <div className="flex items-center justify-between mb-6">
         <h2 className="text-xl font-bold">Activity Graph</h2>
         <p className="text-xs text-[var(--muted-foreground)] font-medium">Last 6 Months</p>
      </div>
      
      <div className="w-full -ml-2 -mr-2">
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={heatmapValues}
          classForValue={getClassForValue}
          showWeekdayLabels={true}
          titleForValue={(value) => {
             if (!value || !value.date) return "No study sessions";
             return `${value.count} study session${value.count > 1 ? 's' : ''} on ${format(value.date, 'MMMM d, yyyy')}`;
          }}
        />
      </div>
      
      <div className="flex items-center justify-end gap-2 mt-4 text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider font-bold">
         <span>Less</span>
         <div className="w-3 h-3 rounded-[3px] bg-black/5 dark:bg-white/5" />
         <div className="w-3 h-3 rounded-[3px] bg-emerald-500/30" />
         <div className="w-3 h-3 rounded-[3px] bg-emerald-500/50" />
         <div className="w-3 h-3 rounded-[3px] bg-emerald-500/80" />
         <div className="w-3 h-3 rounded-[3px] bg-emerald-500" />
         <span>More</span>
      </div>
    </div>
  );
}
