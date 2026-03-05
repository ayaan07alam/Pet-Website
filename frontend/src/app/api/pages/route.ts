import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const pages = await prisma.contentPage.findMany();
        return NextResponse.json(pages);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const page = await prisma.contentPage.create({
            data: {
                title: data.title,
                slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                htmlContent: data.htmlContent || '',
            }
        });
        return NextResponse.json(page);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
    }
}
