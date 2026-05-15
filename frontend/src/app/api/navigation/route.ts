import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const menus = await prisma.navigationMenu.findMany({
      include: {
        items: {
          orderBy: { order: 'asc' },
          include: { children: true }
        }
      }
    });
    return NextResponse.json(menus);
  } catch (error) {
    console.error('Error fetching navigation menus:', error);
    return NextResponse.json({ error: 'Failed to fetch navigation' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const menu = await prisma.navigationMenu.create({
      data: {
        name: data.name,
        location: data.location,
      }
    });
    return NextResponse.json(menu, { status: 201 });
  } catch (error) {
    console.error('Error creating menu:', error);
    return NextResponse.json({ error: 'Failed to create menu' }, { status: 500 });
  }
}
