import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const searchParams = req.nextUrl.searchParams;
  const limit = Number(searchParams.get("limit"));
  const pageToSkip = (Number(searchParams.get("page")) - 1) * limit;
  const query = req.nextUrl.searchParams.get("q")?.toString();

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: Number(params.id),
      },
      include: {
        subscribers: {
          where: {
            subscriber: {
              name: {
                search: query,
              },
            },
          },
          skip: pageToSkip,
          take: limit,
          orderBy: {
            subscriber: {
              subscribers: {
                _count: "desc",
              },
            },
          },
          select: {
            subscriber: {
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
            subscribers: {
              where: {
                subscriber: {
                  name: {
                    search: query,
                  },
                },
              },
            },
          },
        },
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch {
    return NextResponse.error();
  }
}
