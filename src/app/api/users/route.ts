import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findUniqueOrThrow();
    return NextResponse.json(users, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
