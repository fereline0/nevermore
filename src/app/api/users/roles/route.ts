import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(req: NextRequest) {
  try {
    const roles = await prisma.role.findMany({});

    return NextResponse.json(roles, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
