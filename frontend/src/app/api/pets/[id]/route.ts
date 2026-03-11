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

        const pet = await prisma.pet.update({
            where: { id },
            data: {
                name: data.name,
                species: data.species,
                breed: data.breed,
                age: data.age,
                gender: data.gender,
                price: data.price !== undefined ? (typeof data.price === 'string' ? parseFloat(data.price) || 0 : data.price) : undefined,
                status: data.status,
                images: data.images,
                description: data.description,
                isNew: data.isNew,
                isFeatured: data.isFeatured,
                categoryId: data.categoryId || null,
            },
        });
        return NextResponse.json(pet);
    } catch (error) {
        console.error(error);
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
