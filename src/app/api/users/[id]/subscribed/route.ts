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
        subscribed: {
          skip: pageToSkip,
          take: limit,
          orderBy: {
            user: {
              subscribed: {
                _count: "desc",
              },
            },
          },
          select: {
            user: {
              include: {
                role: true,
                _count: {
                  select: {
                    writerComments: true,
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            subscribed: true,
          },
        },
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch {
    return NextResponse.error();
  }
}
