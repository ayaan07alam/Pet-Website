import { PrismaClient } from '@prisma/client';
import { mockPets, mockCategories } from '../data/mockData';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database with mock data...');

    // 1. Seed Categories first
    for (const cat of mockCategories) {
        if (cat.id !== 'accessories' && cat.id !== 'food') { // Keeping it limited to actual animal categories as per schema
            await prisma.category.upsert({
                where: { name: cat.name },
                update: {
                    slug: cat.id,
                    image: cat.image,
                },
                create: {
                    name: cat.name,
                    slug: cat.id,
                    image: cat.image,
                }
            });
        }
    }

    // Map mock category ids to DB category id records
    const categories = await prisma.category.findMany();
    const catMap = categories.reduce((acc, c) => ({ ...acc, [c.slug]: c.id }), {} as Record<string, string>);

    // 2. Seed Pets
    for (const pet of mockPets) {
        await prisma.pet.create({
            data: {
                name: pet.name,
                species: pet.species,
                breed: pet.breed || '',
                age: pet.age || '',
                gender: pet.gender || '',
                price: pet.price,
                status: pet.available ? 'Available' : 'Sold',
                images: [pet.image],
                description: pet.description || '',
                isNew: !!pet.isNew,
                isFeatured: !!pet.featured,
                categoryId: catMap[pet.category] || null,
            }
        });
    }

    // 3. Seed default Content Pages
    await prisma.contentPage.upsert({
        where: { slug: 'about' },
        update: {},
        create: {
            slug: 'about',
            title: 'About Us',
            htmlContent: '<h1>About Rumzee\'s Exotic</h1><p>We are a premium exotic pet shop dedicated to providing the highest quality, ethically sourced animals.</p>'
        }
    });

    await prisma.contentPage.upsert({
        where: { slug: 'services' },
        update: {},
        create: {
            slug: 'services',
            title: 'Our Services',
            htmlContent: '<h1>Our Services</h1><p>From vet checkups to comprehensive habitat building, we provide end-to-end exotic pet care.</p>'
        }
    });

    console.log('Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
