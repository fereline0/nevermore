import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function POST(req: NextRequest) {
  const body = await req.formData();

  const comment = await prisma.userComments.create({
    data: {
      value: body.get("comment") as string,
      userId: Number(body.get("userId")),
      writerId: Number(body.get("writerId")),
    },
  });

  return NextResponse.json(comment, { status: 200 });
}
