import { prisma } from '@/lib/prisma';
import { Users, PawPrint, Eye, Layers } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const totalPets = await prisma.pet.count();
    const totalCategories = await prisma.category.count();
    const availablePets = await prisma.pet.count({ where: { status: 'Available' } });

    // In future this could track real views/leads
    const mockViews = 2450;

    const stats = [
        { label: 'Total Pets', value: totalPets, icon: PawPrint, color: '#C97D0E' },
        { label: 'Available Pets', value: availablePets, icon: Eye, color: '#4A7C2E' },
        { label: 'Categories', value: totalCategories, icon: Layers, color: '#A0614A' },
        { label: 'Monthly Visitors', value: mockViews.toLocaleString(), icon: Users, color: '#E8601A' }
    ];

    return (
        <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: '#2C1A0E', marginBottom: 8 }}>Dashboard Overview</h1>
            <p style={{ color: '#6B3A2A', marginBottom: 32 }}>Welcome back to your administration panel.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginBottom: 40 }}>
                {stats.map((stat, i) => (
                    <div key={i} style={{ backgroundColor: '#fff', padding: 24, borderRadius: 16, boxShadow: '0 4px 20px rgba(44,26,14,0.06)', display: 'flex', alignItems: 'center', gap: 20 }}>
                        <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <div style={{ fontSize: 14, color: '#6B3A2A', marginBottom: 4 }}>{stat.label}</div>
                            <div style={{ fontSize: 24, fontWeight: 700, color: '#2C1A0E' }}>{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ backgroundColor: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 4px 20px rgba(44,26,14,0.06)' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: '#2C1A0E', marginBottom: 16 }}>Quick Actions</h3>
                <div style={{ display: 'flex', gap: 16 }}>
                    <Link href="/admin/pets" style={{ padding: '12px 24px', backgroundColor: '#C97D0E', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>Manage Pets</Link>
                    <Link href="/admin/settings" style={{ padding: '12px 24px', backgroundColor: '#2C1A0E', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>Site Settings</Link>
                </div>
            </div>
        </div>
    );
}
