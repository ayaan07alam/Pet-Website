import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let story = await prisma.companyStory.findUnique({
      where: { id: 'main' },
    });

    if (!story) {
      story = await prisma.companyStory.create({
        data: {
          id: 'main',
          heading: 'Born from a Love for Exotic Life',
          storyText:
            "Rumzee's Exotic began as a small bird aviary in 2016, driven by one man's passion for rare and beautiful parrots. Today, we're one of India's most trusted exotic pet destinations — offering birds, cats, reptiles, tortoises, accessories, and expert care services.",
        },
      });
    }

    return Response.json(story);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch company story' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();

    const story = await prisma.companyStory.upsert({
      where: { id: 'main' },
      update: {
        heading: data.heading,
        storyText: data.storyText,
        yearsFounded: data.yearsFounded,
        yearsLabel: data.yearsLabel,
        familiesCount: data.familiesCount,
        familiesLabel: data.familiesLabel,
        breedsCount: data.breedsCount,
        breedsLabel: data.breedsLabel,
        ratingValue: data.ratingValue,
        ratingLabel: data.ratingLabel,
      },
      create: {
        id: 'main',
        heading: data.heading,
        storyText: data.storyText,
        yearsFounded: data.yearsFounded,
        yearsLabel: data.yearsLabel,
        familiesCount: data.familiesCount,
        familiesLabel: data.familiesLabel,
        breedsCount: data.breedsCount,
        breedsLabel: data.breedsLabel,
        ratingValue: data.ratingValue,
        ratingLabel: data.ratingLabel,
      },
    });

    return Response.json(story);
  } catch (error) {
    return Response.json({ error: 'Failed to update company story' }, { status: 500 });
  }
}

