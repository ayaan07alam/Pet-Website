import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const rawStatusStats = await prisma.lead.groupBy({
            by: ['status'],
            _count: { id: true },
        });

        const rawSourceStats = await prisma.lead.groupBy({
            by: ['source'],
            _count: { id: true },
        });

        const totalStats = await prisma.lead.count();

        const stats = {
            total: totalStats,
            NEW: rawStatusStats.find((s: { status: string; _count: { id: number } }) => s.status === 'NEW')?._count.id || 0,
            IN_PROGRESS: rawStatusStats.find((s: { status: string; _count: { id: number } }) => s.status === 'IN_PROGRESS')?._count.id || 0,
            WON: rawStatusStats.find((s: { status: string; _count: { id: number } }) => s.status === 'WON')?._count.id || 0,
            LOST: rawStatusStats.find((s: { status: string; _count: { id: number } }) => s.status === 'LOST')?._count.id || 0,
        };

        const sources = rawSourceStats.map((s: { source: string; _count: { id: number } }) => ({
            source: s.source,
            count: s._count.id,
        }));

        return NextResponse.json({ stats, sources });
    } catch (error) {
        console.error('Failed to fetch lead stats', error);
        return NextResponse.json({ error: 'Failed to fetch lead stats' }, { status: 500 });
    }
}
