import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(req: NextRequest) {
  try {
    const sections = await prisma.section.findMany({
      include: {
        categories: true,
      },
    });

    const articles = await prisma.article.count({
      where: {
        published: true,
      },
    });

    const comments = await prisma.articleComments.count();

    const count = { articles, comments };

    const res = { sections, count };

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
