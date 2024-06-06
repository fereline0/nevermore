import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const limit = Number(searchParams.get("limit"));
    const pageToSkip = (Number(searchParams.get("page")) - 1) * limit;
    const userNotification = await prisma.user.findUniqueOrThrow({
      where: {
        id: Number(params.id),
      },
      select: {
        notifications: {
          skip: pageToSkip,
          take: limit,
          orderBy: [
            {
              read: "asc",
            },
            {
              createdAt: "desc",
            },
          ],
          include: {
            writer: {
              include: {
                role: true,
              },
            },
            user: true,
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
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const body = await req.formData();

    const sourceLink = body.get("sourceLink") as string;
    const data: any = {
      value: body.get("value") as string,
      writerId: Number(body.get("writerId")),
      userId: Number(params.id),
      read: false,
    };

    if (sourceLink !== null) {
      data.sourceLink = sourceLink;
    }

    const notification = await prisma.userNotifications.create({
      data: data,
    });

    return NextResponse.json(notification, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
