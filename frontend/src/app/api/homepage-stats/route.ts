import { prisma } from '@/lib/prisma';

const defaultStats = [
  { value: '500+', label: 'Happy Families', icon: 'Users', order: 0 },
  { value: '50+', label: 'Exotic Breeds', icon: 'Dna', order: 1 },
  { value: '8+', label: 'Years of Passion', icon: 'Heart', order: 2 },
  { value: '100%', label: 'Health Certified', icon: 'ShieldCheck', order: 3 },
  { value: '4.9', label: 'Customer Rating', icon: 'Star', order: 4 },
  { value: '24H', label: 'WhatsApp Support', icon: 'MessageCircle', order: 5 },
];

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let stats = await prisma.homepageStat.findMany({
      orderBy: { order: 'asc' },
    });

    if (stats.length === 0) {
      stats = await Promise.all(
        defaultStats.map(s =>
          prisma.homepageStat.create({
            data: s,
          }),
        ),
      );
    }

    return Response.json(stats);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const stats = await request.json();
    
    // Delete all existing stats and create new ones
    await prisma.homepageStat.deleteMany({});
    
    const created = await Promise.all(
      stats.map((stat: any) =>
        prisma.homepageStat.create({
          data: {
            value: stat.value,
            label: stat.label,
            icon: stat.icon,
            order: stat.order || 0
          }
        })
      )
    );
    
    return Response.json(created);
  } catch (error) {
    return Response.json({ error: 'Failed to update stats' }, { status: 500 });
  }
}
