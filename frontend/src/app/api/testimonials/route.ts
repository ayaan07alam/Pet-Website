import { prisma } from '@/lib/prisma';

const defaultTestimonials = [
  {
    name: 'Karthik Reddy',
    location: 'Chennai',
    pet: 'Bearded Dragon',
    text: 'Great variety of reptiles. My Bearded Dragon arrived healthily and calm. The packaging was excellent and the shipping was fast. Very satisfied!',
    rating: 4,
    avatar: 'KR',
    order: 0,
  },
  {
    name: 'Priya Singh',
    location: 'Mumbai',
    pet: 'African Grey Parrot',
    text: "Absolutely beautiful parrot! She's intelligent, playful, and the team provided incredible care guides. Best decision ever!",
    rating: 5,
    avatar: 'PS',
    order: 1,
  },
  {
    name: 'Rohan Sharma',
    location: 'Bangalore',
    pet: 'Bengal Cat',
    text: 'Premium quality exotic cat. The health guarantee gave me great confidence. Highly recommended for all cat lovers!',
    rating: 5,
    avatar: 'RS',
    order: 2,
  },
  {
    name: 'Anjali Patel',
    location: 'Ahmedabad',
    pet: 'Sulcata Tortoise',
    text: 'My Sulcata is healthy and thriving! The team was patient in answering all my care questions. Five stars!',
    rating: 5,
    avatar: 'AP',
    order: 3,
  },
];

export async function GET() {
  try {
    let testimonials = await prisma.testimonial.findMany({
      orderBy: { order: 'asc' },
    });

    if (testimonials.length === 0) {
      testimonials = await Promise.all(
        defaultTestimonials.map(t =>
          prisma.testimonial.create({
            data: t,
          }),
        ),
      );
    }

    return Response.json(testimonials);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const testimonial = await prisma.testimonial.create({
      data: {
        name: data.name,
        location: data.location,
        pet: data.pet,
        text: data.text,
        rating: data.rating || 5,
        avatar: data.avatar || data.name?.[0]?.toUpperCase() || 'A',
        order: data.order || 0,
        featured: data.featured || false
      }
    });
    return Response.json(testimonial);
  } catch (error) {
    return Response.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const testimonials = await request.json();
    
    // Delete all and recreate with new order
    await prisma.testimonial.deleteMany({});
    
    const created = await Promise.all(
      testimonials.map((testimonial: any) =>
        prisma.testimonial.create({
          data: {
            name: testimonial.name,
            location: testimonial.location,
            pet: testimonial.pet,
            text: testimonial.text,
            rating: testimonial.rating || 5,
            avatar: testimonial.avatar || testimonial.name?.[0]?.toUpperCase() || 'A',
            order: testimonial.order || 0,
            featured: testimonial.featured || false
          }
        })
      )
    );
    
    return Response.json(created);
  } catch (error) {
    return Response.json({ error: 'Failed to update testimonials' }, { status: 500 });
  }
}
