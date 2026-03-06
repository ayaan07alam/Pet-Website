import { prisma } from '@/lib/prisma';

const defaultFacts = [
  { species: 'African Grey Parrot', fact: 'Can live up to 60+ years and have the intelligence of a 5-year-old child.', symbol: 'BIRD', color: '#E8A020', order: 0 },
  { species: 'Savannah Cat', fact: 'A hybrid of domestic cats and servals — one of the largest domestic cat breeds in the world.', symbol: 'CAT', color: '#C97D0E', order: 1 },
  { species: 'Ball Python', fact: 'Can go months without eating and may live for 30+ years with proper care.', symbol: 'REPTILE', color: '#4A7C2E', order: 2 },
  { species: 'Sulcata Tortoise', fact: 'The third largest tortoise in the world — some reach 100kg and live over 100 years!', symbol: 'TORTOISE', color: '#7A5C3A', order: 3 },
];

export async function GET() {
  try {
    let facts = await prisma.animalFact.findMany({
      orderBy: { order: 'asc' },
    });

    if (facts.length === 0) {
      facts = await Promise.all(
        defaultFacts.map(f =>
          prisma.animalFact.create({
            data: f,
          }),
        ),
      );
    }

    return Response.json(facts);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch facts' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const facts = await request.json();
    
    // Delete all existing facts and create new ones
    await prisma.animalFact.deleteMany({});
    
    const created = await Promise.all(
      facts.map((fact: any) =>
        prisma.animalFact.create({
          data: {
            species: fact.species,
            fact: fact.fact,
            symbol: fact.symbol,
            color: fact.color || '#C97D0E',
            order: fact.order || 0
          }
        })
      )
    );
    
    return Response.json(created);
  } catch (error) {
    return Response.json({ error: 'Failed to update facts' }, { status: 500 });
  }
}
