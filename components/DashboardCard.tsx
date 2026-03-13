"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
  delay?: number;
  className?: string;
}

export function DashboardCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  delay = 0,
  className 
}: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
      whileHover={{ y: -5 }}
      className={cn(
        "glass-card p-6 rounded-3xl relative overflow-hidden group w-full",
        className
      )}
    >
      {/* Decorative gradient blur in corner */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="p-3 bg-[var(--muted)] rounded-2xl text-[var(--foreground)]/70">
          {icon}
        </div>
        {trend && (
          <div className={cn(
            "text-xs font-bold px-2 py-1 rounded-full",
            trend.isPositive 
              ? "bg-emerald-500/10 text-emerald-500" 
              : "bg-rose-500/10 text-rose-500"
          )}>
            {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
          </div>
        )}
      </div>

      <div className="relative z-10">
        <h3 className="text-[var(--muted-foreground)] font-medium text-sm mb-1">{title}</h3>
        <p className="text-3xl font-black text-[var(--foreground)] tracking-tight">
          {value}
        </p>
        {subtitle && (
          <p className="text-xs text-[var(--muted-foreground)] mt-2 font-medium">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
}
