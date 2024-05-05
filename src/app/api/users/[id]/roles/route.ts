import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const body = await req.formData();

    const user = await prisma.user.update({
      where: {
        id: Number(params.id),
      },
      data: {
        role: {
          connect: {
            name: body.get("name") as string,
          },
        },
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch {
    return NextResponse.error();
  }
}
