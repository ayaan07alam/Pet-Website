import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();
    const section = await prisma.customSection.update({
      where: { id: id },
      data: {
        title: data.title,
        type: data.type,
        content: data.content,
        order: data.order,
        isActive: data.isActive,
      }
    });
    return NextResponse.json(section);
  } catch (error) {
    console.error('Error updating custom section:', error);
    return NextResponse.json({ error: 'Failed to update custom section' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.customSection.delete({
      where: { id: id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting custom section:', error);
    return NextResponse.json({ error: 'Failed to delete custom section' }, { status: 500 });
  }
}
