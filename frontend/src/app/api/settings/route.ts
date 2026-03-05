import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        let settings = await prisma.siteSettings.findUnique({
            where: { id: 'global' },
        });

        if (!settings) {
            settings = await prisma.siteSettings.create({
                data: {
                    id: 'global',
                    heroImages: [
                        '/images/hero/bg_forest.png',
                        '/images/hero/bg_desert.png',
                        '/images/hero/bg_ocean.png',
                        ''
                    ],
                    heroCentralImages: [
                        '/images/hero/bird.png',
                        '/images/hero/cat.png',
                        '/images/hero/reptile.png',
                        '/images/hero/tortoise.png'
                    ]
                }
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();

        const settings = await prisma.siteSettings.upsert({
            where: { id: 'global' },
            update: data,
            create: {
                id: 'global',
                ...data
            }
        });

        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
