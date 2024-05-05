import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const roles = await prisma.role.findMany({
      where: {
        id: {
          lt: Number(params.id),
        },
      },
    });

    return NextResponse.json(roles, { status: 200 });
  } catch {
    return NextResponse.error();
  }
}
