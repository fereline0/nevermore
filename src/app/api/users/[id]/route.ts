import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(req: NextRequest, { params } : { params : {id: number} })
{
    const searchParams = req.nextUrl.searchParams;
    const limit = Number(searchParams.get("limit"));
    const pageToSkip = (Number(searchParams.get("page")) - 1) * limit;

    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: Number(params.id),
            },
            include: {
                detailInformation: true,
                subscribers: {
                    select: {
                        subscriber: {
                            include: {
                                role: true,
                            }
                        },
                    }
                },
                role: true,
                comments: {
                    skip: pageToSkip,
                    take: limit,
                    include: {
                        writer: true,
                    }
                },
                _count: {
                    select: { comments: true },
                }
            },
        })
        return NextResponse.json(user, { status: 200 })
    } catch {
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params } : { params : {id: number} })
{
    try {
        const user = await prisma.user.delete({
            where: {
              id: Number(params.id),
            },
        });

        return NextResponse.json(user, { status: 200 })
    } catch {
        return NextResponse.json({ error: "Failed to delete this user" }, { status: 500 })
    }
}