import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
     const sessions = await prisma.studySession.findMany({
        where: { userId: "default-user" },
        select: { date: true },
        orderBy: { date: 'desc' }
     });

     const mappedDates: string[] = sessions.map((s: { date: string }) => s.date);
     const sortedDates = Array.from(new Set(mappedDates)).sort((a: string, b: string) => b.localeCompare(a));

     return NextResponse.json(sortedDates);
  } catch (error) {
     console.error("Failed to fetch history:", error);
     return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
