import { prisma } from '@/lib/prisma';

const defaultFeatures = [
  { title: 'Health Guaranteed', description: 'Every pet comes with a vet certificate and 15-day health guarantee. We only sell 100% healthy animals.', icon: 'Shield', order: 0 },
  { title: 'Ethically Sourced', description: 'All our birds, cats, and reptiles are captive-bred or obtained from licensed ethical breeders.', icon: 'Heart', order: 1 },
  { title: 'Expert Guidance', description: 'Our experienced team provides lifelong support, care guides, and dietary advice for every pet.', icon: 'Star', order: 2 },
  { title: 'Safe Delivery', description: 'Live animal transport with expert handlers, climate-controlled vehicles, and real-time updates.', icon: 'Truck', order: 3 },
];

export async function GET() {
  try {
    let features = await prisma.whyUsFeature.findMany({
      orderBy: { order: 'asc' },
    });

    if (features.length === 0) {
      features = await Promise.all(
        defaultFeatures.map(f =>
          prisma.whyUsFeature.create({
            data: f,
          }),
        ),
      );
    }

    return Response.json(features);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch features' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const features = await request.json();
    
    // Delete all existing features and create new ones
    await prisma.whyUsFeature.deleteMany({});
    
    const created = await Promise.all(
      features.map((feature: any) =>
        prisma.whyUsFeature.create({
          data: {
            title: feature.title,
            description: feature.description,
            icon: feature.icon,
            order: feature.order || 0
          }
        })
      )
    );
    
    return Response.json(created);
  } catch (error) {
    return Response.json({ error: 'Failed to update features' }, { status: 500 });
  }
}
