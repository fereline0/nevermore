import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();

    const sourceLink = body.get("sourceLink") as string;

    const updatedNotification = await prisma.userNotifications.updateMany({
      where: {
        sourceLink: sourceLink,
      },
      data: {
        read: true,
      },
    });

    return NextResponse.json(updatedNotification, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
