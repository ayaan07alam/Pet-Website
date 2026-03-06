import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const source = searchParams.get('source');

    const where: any = {};
    if (status) where.status = status;
    if (source) where.source = source;

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { pet: true },
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.error('Failed to fetch leads', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, message, source, petId, pageUrl } = body || {};

    if (!name || (!phone && !email)) {
      return NextResponse.json(
        { error: 'Name and at least one contact (phone or email) are required.' },
        { status: 400 },
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name: String(name).trim(),
        phone: phone ? String(phone).trim() : null,
        email: email ? String(email).trim() : null,
        message: message
          ? String(message).trim()
          : 'New enquiry from website. No additional message provided.',
        source: source || 'pet_inquiry',
        petId: petId || null,
        pageUrl: pageUrl || null,
      },
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    console.error('Failed to create lead', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}

