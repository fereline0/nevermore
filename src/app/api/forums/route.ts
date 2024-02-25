import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const limit = Number(searchParams.get("limit"));
  const pageToSkip = (Number(searchParams.get("page")) - 1) * limit;

  try {
    const forums = await prisma.article.findMany({
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
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    const count = await prisma.article.count({
      where: {
        published: true,
      },
    });

    const res = { forums, count };

    return NextResponse.json(res, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
