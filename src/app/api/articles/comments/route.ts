import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();

    const parentId = body.get("parentId");
    const data: any = {
      value: body.get("comment") as string,
      articleId: Number(body.get("articleId")),
      writerId: Number(body.get("writerId")),
    };

    if (parentId !== null) {
      data.parentId = Number(parentId);
    }

    const articleComment = await prisma.articleComments.create({
      data: data,
    });

    return NextResponse.json(articleComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
