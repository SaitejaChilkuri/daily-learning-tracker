import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getLocalDateString } from "@/lib/streakLogic";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const today = getLocalDateString();
    
    // We'll use a hardcoded default user for this single-tenant demo
    const userId = "default-user";

    // Upsert the user to ensure they exist in our SQLite DB
    await prisma.user.upsert({
      where: { email: "default@example.com" },
      update: {},
      create: { 
        id: userId,
        email: "default@example.com",
        name: "Learner"
      }
    });

    // Attempt to create the study session.
    // The Prisma schema @@unique([date, userId]) will throw a P2002 if they already studied today.
    await prisma.studySession.create({
      data: {
         date: today,
         userId
      }
    });

    return NextResponse.json({ success: true, date: today }, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
       return NextResponse.json({ error: "Already marked today!" }, { status: 400 });
    }
    console.error("Study save error:", error);
    return NextResponse.json({ error: "Failed to record study session" }, { status: 500 });
  }
}
