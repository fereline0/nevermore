import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const forum = await prisma.category.findUniqueOrThrow({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(forum, { status: 200 });
  } catch {
    return NextResponse.error();
  }
}
