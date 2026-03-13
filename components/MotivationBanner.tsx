"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Flame, Trophy, Star } from "lucide-react";

interface MotivationBannerProps {
  currentStreak: number;
}

export function MotivationBanner({ currentStreak }: MotivationBannerProps) {
  const getBannerData = () => {
    if (currentStreak === 0) return {
      text: "Every grand journey begins with a single step. Start your streak today!",
      icon: <Sparkles className="text-blue-400" size={24} />,
      bg: "bg-blue-500/10 border-blue-500/20 text-blue-100"
    };
    if (currentStreak <= 2) return {
      text: "Small steps create big habits. Keep the momentum going!",
      icon: <Zap className="text-amber-400" size={24} />,
      bg: "bg-amber-500/10 border-amber-500/20 text-amber-100"
    };
    if (currentStreak <= 7) return {
      text: "You're building serious momentum! Don't stop now.",
      icon: <Flame className="text-orange-500" size={24} />,
      bg: "bg-orange-500/10 border-orange-500/20 text-orange-100"
    };
    if (currentStreak <= 30) return {
      text: "Consistency is becoming your superpower. Unstoppable!",
      icon: <Trophy className="text-yellow-400" size={24} />,
      bg: "bg-yellow-500/10 border-yellow-500/20 text-yellow-100"
    };
    return {
      text: "Legendary dedication. You are a master of consistency.",
      icon: <Star className="text-purple-400" size={24} />,
      bg: "bg-purple-500/10 border-purple-500/20 text-purple-100"
    };
  };

  const data = getBannerData();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={data.text} // Re-animate when text changes
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`w-full p-4 rounded-2xl border flex items-center gap-4 shadow-lg backdrop-blur-md ${data.bg}`}
      >
        <motion.div
           animate={{ rotate: [0, 15, -15, 0] }}
           transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
        >
          {data.icon}
        </motion.div>
        <p className="font-medium text-[15px] tracking-wide m-0">{data.text}</p>
      </motion.div>
    </AnimatePresence>
  );
}
