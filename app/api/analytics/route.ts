import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { calculateAdvancedStats, getLocalDateString } from "@/lib/streakLogic";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
     const sessions = await prisma.studySession.findMany({
        where: { userId: "default-user" },
        select: { date: true },
        orderBy: { date: 'desc' }
     });

     const mappedDates: string[] = sessions.map((s: { date: string }) => s.date);
     const dedupedDates = Array.from(new Set(mappedDates));
     
     const today = getLocalDateString();
     const stats = calculateAdvancedStats(dedupedDates, today);

     return NextResponse.json({
        totalDays: stats.totalDays,
        currentStreak: stats.currentStreak,
        longestStreak: stats.longestStreak,
        weeklyConsistency: stats.weeklyConsistency
     });
  } catch (error) {
     console.error("Failed to fetch analytics:", error);
     return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
