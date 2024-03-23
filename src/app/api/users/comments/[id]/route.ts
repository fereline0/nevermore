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
    const userComment = await prisma.userComments.findUniqueOrThrow({
      where: {
        id: Number(params.id),
      },
      include: {
        writer: {
          include: {
            role: true,
          },
        },
        childs: {
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
        _count: {
          select: {
            childs: true,
          },
        },
      },
    });

    return NextResponse.json(userComment, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const comment = await prisma.userComments.delete({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json(comment, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete this comment" },
      { status: 500 }
    );
  }
}
