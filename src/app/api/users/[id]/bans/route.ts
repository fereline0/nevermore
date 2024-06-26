import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const searchParams = req.nextUrl.searchParams;
  const limit = Number(searchParams.get("limit"));
  const pageToSkip = (Number(searchParams.get("page")) - 1) * limit;

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: Number(params.id),
      },
      select: {
        bans: {
          orderBy: {
            createdAt: "desc",
          },
          skip: pageToSkip,
          take: limit,
          include: {
            initiator: {
              include: {
                role: true,
              },
            },
          },
        },
        _count: {
          select: {
            bans: true,
          },
        },
      },
    });
    return NextResponse.json(user, { status: 200 });
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

    const user = await prisma.user.update({
      where: {
        id: Number(params.id),
      },
      data: {
        bans: {
          create: {
            initiatorId: Number(body.get("initiatorId")),
            reason: body.get("reason") as string,
            expires: new Date(body.get("expires") as string),
          },
        },
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const bans = await prisma.userBans.updateMany({
      where: {
        userId: Number(params.id),
      },
      data: {
        activity: false,
      },
    });

    return NextResponse.json(bans, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
