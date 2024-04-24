import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const userNotification = await prisma.user.findUniqueOrThrow({
      where: {
        id: Number(params.id),
      },
      select: {
        notifications: {
          include: {
            writer: {
              include: {
                role: true,
              },
            },
          },
        },
        _count: {
          select: {
            notifications: true,
          },
        },
      },
    });

    return NextResponse.json(userNotification, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const body = await req.formData();

    const data: any = {
      notification: body.get("notification") as string,
      writerId: Number(body.get("writerId")),
      userId: Number(params.id),
      read: false,
    };

    const notification = await prisma.userNotifications.create({
      data,
    });

    return NextResponse.json(notification, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
