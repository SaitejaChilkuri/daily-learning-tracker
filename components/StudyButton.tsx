"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Sparkles, Flame } from "lucide-react";

interface StudyButtonProps {
  onMarkStudy: () => Promise<void>;
  alreadyMarked: boolean;
  isLoading: boolean;
}

export function StudyButton({ onMarkStudy, alreadyMarked, isLoading }: StudyButtonProps) {
  if (alreadyMarked) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex flex-col items-center gap-4"
      >
        <div className="w-full max-w-md py-4 px-6 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 cursor-not-allowed shadow-[0_0_30px_-5px_var(--success)]">
          <CheckCircle2 size={24} />
          <span>I Studied Today</span>
        </div>
        <p className="text-emerald-600/80 dark:text-emerald-400/80 text-sm font-medium flex items-center gap-2">
          <Sparkles size={16} />
          Mission accomplished for today!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onMarkStudy}
      disabled={isLoading}
      className={`relative w-full max-w-md mx-auto group overflow-hidden rounded-2xl ${
        isLoading ? 'cursor-not-allowed opacity-80' : ''
      }`}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-100 transition-opacity group-hover:opacity-90 duration-300" />
      
      {/* Animated Shine Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
      
      {/* Pulse overlay */}
      <motion.div 
         animate={{ opacity: [0.3, 0.6, 0.3] }}
         transition={{ duration: 2, repeat: Infinity }}
         className="absolute inset-0 bg-gradient-to-t from-black/0 via-white/5 to-white/10"
      />

      <div className="relative py-4 px-6 flex items-center justify-center gap-3 border border-white/20 rounded-2xl text-white font-bold text-lg backdrop-blur-sm shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] transition-shadow group-hover:shadow-[0_0_60px_-15px_rgba(59,130,246,0.7)]">
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={24} />
            <span>Recording Streak...</span>
          </>
        ) : (
          <>
            <motion.div
               animate={{ rotate: [-5, 5, -5] }}
               transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
               <Flame className="text-orange-300" size={24} />
            </motion.div>
            <span className="tracking-wide">I Studied Today</span>
          </>
        )}
      </div>
    </motion.button>
  );
}
