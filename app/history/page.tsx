"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { HeatmapCalendar } from "@/components/HeatmapCalendar";
import HistoryList from "@/components/HistoryList";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function HistoryPage() {
  const [dates, setDates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('/api/history');
        if (res.ok) {
          const apiDates: string[] = await res.json();
          setDates(apiDates);
        }
      } catch (err) {
        console.error("Error fetching history", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
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

      <div className="flex items-center gap-3">
         <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl">
            <Clock size={28} />
         </div>
         <div>
            <h1 className="text-3xl font-black">Timeline</h1>
            <p className="text-[var(--muted-foreground)] text-sm">Review your entire journey.</p>
         </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[30vh]">
          <div className="w-8 h-8 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
           <HeatmapCalendar dates={dates} />
           <div className="sticky top-10">
              <HistoryList dates={dates} />
           </div>
        </div>
      )}
    </div>
  );
}
