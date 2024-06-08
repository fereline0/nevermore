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
      select: {
        articles: {
          skip: pageToSkip,
          take: limit,
          where: {
            published: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          include: {
            author: {
              include: {
                role: true,
              },
            },
            comments: {
              orderBy: {
                createdAt: "desc",
              },
              take: 1,
              select: {
                createdAt: true,
                writer: true,
              },
            },
            category: true,
            _count: {
              select: {
                comments: true,
              },
            },
          },
        },
        _count: {
          select: {
            articles: true,
          },
        },
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
