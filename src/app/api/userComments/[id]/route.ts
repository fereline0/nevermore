import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

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
