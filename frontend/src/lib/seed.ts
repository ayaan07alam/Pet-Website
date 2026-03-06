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

    // 4. Seed Homepage Stats
    const statsData = [
        { value: '500+', label: 'Happy Families', icon: 'Users', order: 0 },
        { value: '50+', label: 'Exotic Breeds', icon: 'Dna', order: 1 },
        { value: '8+', label: 'Years of Passion', icon: 'Heart', order: 2 },
        { value: '100%', label: 'Health Certified', icon: 'ShieldCheck', order: 3 },
        { value: '4.9', label: 'Customer Rating', icon: 'Star', order: 4 },
        { value: '24H', label: 'WhatsApp Support', icon: 'MessageCircle', order: 5 },
    ];

    for (const stat of statsData) {
        await prisma.homepageStat.upsert({
            where: { order: stat.order },
            update: stat,
            create: stat,
        });
    }

    // 5. Seed Animal Facts
    const factsData = [
        { species: 'African Grey Parrot', fact: 'Can live up to 60+ years and have the intelligence of a 5-year-old child.', symbol: 'BIRD', color: '#E8A020', order: 0 },
        { species: 'Savannah Cat', fact: 'A hybrid of domestic cats and servals — one of the largest domestic cat breeds in the world.', symbol: 'CAT', color: '#C97D0E', order: 1 },
        { species: 'Ball Python', fact: 'Can go months without eating and may live for 30+ years with proper care.', symbol: 'REPTILE', color: '#4A7C2E', order: 2 },
        { species: 'Sulcata Tortoise', fact: 'The third largest tortoise in the world — some reach 100kg and live over 100 years!', symbol: 'TORTOISE', color: '#7A5C3A', order: 3 },
    ];

    for (const fact of factsData) {
        await prisma.animalFact.upsert({
            where: { order: fact.order },
            update: fact,
            create: fact,
        });
    }

    // 6. Seed Why Us Features
    const featuresData = [
        { title: 'Health Guaranteed', description: 'Every pet comes with a vet certificate and 15-day health guarantee. We only sell 100% healthy animals.', icon: 'Shield', order: 0 },
        { title: 'Ethically Sourced', description: 'All our birds, cats, and reptiles are captive-bred or obtained from licensed ethical breeders.', icon: 'Heart', order: 1 },
        { title: 'Expert Guidance', description: 'Our experienced team provides lifelong support, care guides, and dietary advice for every pet.', icon: 'Star', order: 2 },
        { title: 'Safe Delivery', description: 'Live animal transport with expert handlers, climate-controlled vehicles, and real-time updates.', icon: 'Truck', order: 3 },
    ];

    for (const feature of featuresData) {
        await prisma.whyUsFeature.upsert({
            where: { order: feature.order },
            update: feature,
            create: feature,
        });
    }

    // 7. Seed Testimonials
    const testimonialsData = [
        { name: 'Karthik Reddy', location: 'Chennai', pet: 'Bearded Dragon', text: 'Great variety of reptiles. My Bearded Dragon arrived healthily and calm. The packaging was excellent and the shipping was fast. Very satisfied!', rating: 4, avatar: 'KR', order: 0 },
        { name: 'Priya Singh', location: 'Mumbai', pet: 'African Grey Parrot', text: 'Absolutely beautiful parrot! She\'s intelligent, playful, and the team provided incredible care guides. Best decision ever!', rating: 5, avatar: 'PS', order: 1 },
        { name: 'Rohan Sharma', location: 'Bangalore', pet: 'Bengal Cat', text: 'Premium quality exotic cat. The health guarantee gave me great confidence. Highly recommended for all cat lovers!', rating: 5, avatar: 'RS', order: 2 },
        { name: 'Anjali Patel', location: 'Ahmedabad', pet: 'Sulcata Tortoise', text: 'My Sulcata is healthy and thriving! The team was patient in answering all my care questions. Five stars!', rating: 5, avatar: 'AP', order: 3 },
    ];

    for (const testimonial of testimonialsData) {
        await prisma.testimonial.upsert({
            where: { order: testimonial.order },
            update: testimonial,
            create: testimonial,
        });
    }

    // 8. Seed Company Story
    await prisma.companyStory.upsert({
        where: { id: 'main' },
        update: {},
        create: {
            id: 'main',
            heading: 'Born from a Love for Exotic Life',
            storyText: 'Rumzee\'s Exotic began as a small bird aviary in 2016, driven by one man\'s passion for rare and beautiful parrots. Today, we\'re one of India\'s most trusted exotic pet destinations — offering birds, cats, reptiles, tortoises, accessories, and expert care services.',
            yearsFounded: '8+',
            yearsLabel: 'Years of Love',
            familiesCount: '500+',
            familiesLabel: 'Happy Families',
            breedsCount: '50+',
            breedsLabel: 'Exotic Breeds',
            ratingValue: '4.9',
            ratingLabel: 'Customer Rating',
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
