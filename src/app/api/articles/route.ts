import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();

    const data: any = {
      title: body.get("title") as string,
      value: body.get("value") as string,
      authorId: Number(body.get("authorId")),
      categoryId: Number(body.get("categoryId")),
      published: body.get("published") === "true",
    };

    const article = await prisma.article.create({
      data: data,
    });

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
