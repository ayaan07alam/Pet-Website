import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const item = await prisma.navigationItem.create({
      data: {
        label: data.label,
        href: data.href,
        order: data.order || 0,
        menuId: data.menuId,
        parentId: data.parentId || null,
      }
    });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('Error creating menu item:', error);
    return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 });
  }
}
