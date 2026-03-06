import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    let copy = await prisma.homepageCopy.findUnique({
      where: { id: 'main' },
    });

    if (!copy) {
      copy = await prisma.homepageCopy.create({
        data: {
          id: 'main',
        },
      });
    }

    return Response.json(copy);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch homepage copy' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();

    const copy = await prisma.homepageCopy.upsert({
      where: { id: 'main' },
      update: data,
      create: {
        id: 'main',
        ...data,
      },
    });

    return Response.json(copy);
  } catch (error) {
    return Response.json({ error: 'Failed to update homepage copy' }, { status: 500 });
  }
}

