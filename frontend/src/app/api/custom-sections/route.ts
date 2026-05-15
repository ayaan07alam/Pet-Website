import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const sections = await prisma.customSection.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(sections);
  } catch (error) {
    console.error('Error fetching custom sections:', error);
    return NextResponse.json({ error: 'Failed to fetch custom sections' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const section = await prisma.customSection.create({
      data: {
        title: data.title,
        type: data.type,
        content: data.content,
        order: data.order || 0,
        isActive: data.isActive !== undefined ? data.isActive : true,
      }
    });
    return NextResponse.json(section, { status: 201 });
  } catch (error) {
    console.error('Error creating custom section:', error);
    return NextResponse.json({ error: 'Failed to create custom section' }, { status: 500 });
  }
}
