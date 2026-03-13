"use client";

import { useTheme } from "next-themes";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { subDays, format } from "date-fns";

interface ChartsProps {
  dates: string[];
}

export function Charts({ dates }: ChartsProps) {
  const { resolvedTheme } = useTheme();
  
  // Build rolling 14 day frequency array
  const today = new Date();
  const data = Array.from({ length: 14 }).map((_, i) => {
     const d = subDays(today, 13 - i);
     const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
     return {
        name: format(d, "MMM d"),
        studies: dates.includes(dateStr) ? 1 : 0
     };
  });

  const color = resolvedTheme === "dark" ? "#3b82f6" : "#2563eb";

  return (
    <div className="glass-card p-6 rounded-3xl w-full">
      <div className="flex items-center justify-between mb-6">
         <h2 className="text-xl font-bold">Consistency Trend</h2>
         <p className="text-xs text-[var(--muted-foreground)] font-medium">14 Day Rolling</p>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorStudies" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.5}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
               dataKey="name" 
               axisLine={false} 
               tickLine={false} 
               tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
               dy={10}
            />
            <YAxis 
               axisLine={false} 
               tickLine={false} 
               tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
               allowDecimals={false}
            />
            <Tooltip 
               contentStyle={{ 
                  backgroundColor: "var(--card)", 
                  borderColor: "var(--border)",
                  borderRadius: "12px",
                  color: "var(--foreground)"
               }}
            />
            <Area 
               type="monotone" 
               dataKey="studies" 
               stroke={color} 
               fillOpacity={1} 
               fill="url(#colorStudies)" 
               strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
