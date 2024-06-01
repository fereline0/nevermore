import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

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
      include: {
        detailInformation: true,
        subscribers: {
          orderBy: {
            subscriber: {
              subscribers: {
                _count: "desc",
              },
            },
          },
          take: 5,
          select: {
            subscriber: {
              include: {
                role: true,
              },
            },
          },
        },
        subscribed: {
          take: 5,
          select: {
            user: {
              include: {
                role: true,
              },
            },
          },
        },
        role: true,
        comments: {
          where: {
            parent: null,
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: pageToSkip,
          take: limit,
          include: {
            writer: {
              include: {
                role: true,
              },
            },
          },
        },
        bans: {
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
            comments: true,
            subscribers: true,
            subscribed: true,
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
    const user = await prisma.user.delete({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
