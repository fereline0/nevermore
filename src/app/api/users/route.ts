import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const limit = Number(searchParams.get("limit"));
  const pageToSkip = (Number(searchParams.get("page")) - 1) * limit;
  const query = req.nextUrl.searchParams.get("q")?.toString();

  try {
    const users = await prisma.user.findMany({
      take: limit,
      skip: pageToSkip,
      where: {
        name: {
          search: query,
        },
      },
      include: {
        role: true,
        _count: {
          select: {
            writerComments: true,
          },
        },
      },
    });

    const count = await prisma.user.count({
      where: {
        name: {
          search: query,
        },
      },
    });

    const res = { users, count };

    return NextResponse.json(res, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
