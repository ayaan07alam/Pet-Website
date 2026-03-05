import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const pet = await prisma.pet.findUnique({
            where: { id },
            include: { category: true }
        });
        if (!pet) return NextResponse.json({ error: 'Pet not found' }, { status: 404 });
        return NextResponse.json(pet);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch pet' }, { status: 500 });
    }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const data = await request.json();

        // Convert string price to float if needed
        if (data.price !== undefined && typeof data.price === 'string') {
            data.price = parseFloat(data.price) || 0;
        }

        const pet = await prisma.pet.update({
            where: { id },
            data,
        });
        return NextResponse.json(pet);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update pet' }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        await prisma.pet.delete({
            where: { id }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete pet' }, { status: 500 });
    }
}
