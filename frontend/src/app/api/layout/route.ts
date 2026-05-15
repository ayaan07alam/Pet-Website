import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    let settings = await prisma.layoutSettings.findUnique({
      where: { id: 'global' },
    });

    if (!settings) {
      settings = await prisma.layoutSettings.create({
        data: { id: 'global' },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching layout settings:', error);
    return NextResponse.json({ error: 'Failed to fetch layout settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    
    // Ensure we don't accidentally update the ID
    const { id, createdAt, updatedAt, ...updateData } = data;

    const settings = await prisma.layoutSettings.upsert({
      where: { id: 'global' },
      update: updateData,
      create: {
        id: 'global',
        ...updateData
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating layout settings:', error);
    return NextResponse.json({ error: 'Failed to update layout settings' }, { status: 500 });
  }
}
