"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50 border border-slate-200 dark:border-zinc-700/50 transition-colors shadow-sm relative overflow-hidden group"
      aria-label="Toggle theme"
    >
      <div className="relative z-10 text-slate-700 dark:text-zinc-300">
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </div>
      
      {/* Subtle hover glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-colors" />
    </motion.button>
  );
}
