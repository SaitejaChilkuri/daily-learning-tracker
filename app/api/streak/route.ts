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
     
     const totalDays = dedupedDates.length;
     const lastStudyDate = totalDays > 0 ? dedupedDates[0] : null;

     return NextResponse.json({
       currentStreak: stats.currentStreak,
       totalDays,
       lastStudyDate
     });
  } catch (error) {
     console.error("Failed to fetch streak:", error);
     return NextResponse.json({ error: "Failed to fetch streak" }, { status: 500 });
  }
}
