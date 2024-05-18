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
        bans: {
          create: {
            initiatorId: Number(body.get("initiatorId")),
            expires: new Date(body.get("expires") as string),
          },
        },
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch {
    return NextResponse.error();
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const bans = await prisma.userBans.updateMany({
      where: {
        userId: Number(params.id),
      },
      data: {
        activity: false,
      },
    });

    return NextResponse.json(bans, { status: 200 });
  } catch {
    return NextResponse.error();
  }
}
