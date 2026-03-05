import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const categoryId = searchParams.get('categoryId');
        const limit = searchParams.get('limit');
        const isFeatured = searchParams.get('isFeatured');

        const query: any = {
            orderBy: { createdAt: 'desc' },
            include: { category: true }
        };

        if (categoryId || isFeatured) {
            query.where = {};
            if (categoryId) query.where.categoryId = categoryId;
            if (isFeatured === 'true') query.where.isFeatured = true;
        }
        if (limit) query.take = parseInt(limit);

        const pets = await prisma.pet.findMany(query);
        return NextResponse.json(pets);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch pets' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const pet = await prisma.pet.create({
            data: {
                name: data.name,
                species: data.species,
                breed: data.breed || '',
                age: data.age || '',
                gender: data.gender || '',
                price: parseFloat(data.price) || 0,
                status: data.status || 'Available',
                images: data.images || [],
                description: data.description || '',
                isNew: data.isNew || false,
                isFeatured: data.isFeatured || false,
                categoryId: data.categoryId || null,
            }
        });
        return NextResponse.json(pet);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create pet' }, { status: 500 });
    }
}
