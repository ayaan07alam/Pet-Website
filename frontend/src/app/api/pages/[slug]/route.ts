import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await context.params;
        const page = await prisma.contentPage.findUnique({
            where: { slug },
        });
        if (!page) return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        return NextResponse.json(page);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 });
    }
}

export async function PUT(request: Request, context: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await context.params;
        const data = await request.json();
        const page = await prisma.contentPage.update({
            where: { slug },
            data: {
                title: data.title,
                htmlContent: data.htmlContent,
            }
        });
        return NextResponse.json(page);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await context.params;
        await prisma.contentPage.delete({
            where: { slug }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
    }
}
