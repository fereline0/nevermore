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
        writerArticleComments: {
          orderBy: {
            createdAt: "desc",
          },
          skip: pageToSkip,
          take: limit,
          include: {
            article: {
              include: {
                category: {
                  select: {
                    supervisors: true,
                  },
                },
              },
            },
            writer: {
              include: {
                role: true,
              },
            },
            parent: {
              include: {
                writer: true,
              },
            },
          },
        },
        _count: {
          select: {
            writerArticleComments: true,
          },
        },
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
