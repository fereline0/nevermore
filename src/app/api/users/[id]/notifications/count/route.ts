import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const count = await prisma.userNotifications.count({
      where: {
        userId: Number(params.id),
        read: false,
      },
    });

    return NextResponse.json(count, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
