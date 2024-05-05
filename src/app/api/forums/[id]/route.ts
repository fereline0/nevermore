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
    const forum = await prisma.category.findUniqueOrThrow({
      where: {
        id: Number(params.id),
      },
      select: {
        name: true,
        articles: {
          orderBy: {
            createdAt: "desc",
          },
          where: {
            title: {
              search: query,
            },
            value: {
              search: query,
            },
            published: true,
          },
          skip: pageToSkip,
          take: limit,
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
            _count: {
              select: {
                comments: true,
              },
            },
          },
        },
        _count: {
          select: {
            articles: {
              where: {
                title: {
                  search: query,
                },
                value: {
                  search: query,
                },
                published: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(forum, { status: 200 });
  } catch {
    return NextResponse.error();
  }
}
