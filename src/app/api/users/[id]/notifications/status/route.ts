import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const updatedNotifications = await prisma.userNotifications.updateMany({
      where: {
        userId: Number(params.id),
      },
      data: {
        read: true,
      },
    });

    return NextResponse.json(updatedNotifications, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
