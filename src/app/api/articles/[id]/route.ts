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

    const article = await prisma.article.findUniqueOrThrow({
      where: {
        id: Number(params.id),
      },
      include: {
        comments: {
          where: {
            parent: null,
          },
          skip: pageToSkip,
          take: limit,
          include: {
            writer: true,
            childs: {
              include: {
                writer: true,
              },
            },
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
        author: {
          include: {
            role: true,
          },
        },
      },
    });
    return NextResponse.json(article, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
