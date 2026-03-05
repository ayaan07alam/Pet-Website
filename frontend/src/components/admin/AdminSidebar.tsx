'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, PawPrint, FolderTree, Settings, FileText, LogOut, Globe } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Manage Pets', href: '/admin/pets', icon: PawPrint },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Site Settings', href: '/admin/settings', icon: Settings },
    { name: 'Content Pages', href: '/admin/pages', icon: FileText },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <aside style={{ width: 260, backgroundColor: '#2C1A0E', color: '#fff', display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
            <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, margin: 0, color: '#C97D0E' }}>Admin Panel</h2>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>Rumzee&apos;s Exotics</div>
            </div>

            <nav style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
                    return (
                        <Link key={item.name} href={item.href} style={{
                            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 8,
                            color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                            backgroundColor: isActive ? 'rgba(201,125,14,0.2)' : 'transparent',
                            textDecoration: 'none', transition: 'all 0.2s',
                            fontWeight: isActive ? 600 : 400
                        }}>
                            <item.icon size={18} color={isActive ? '#C97D0E' : 'currentcolor'} />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <div style={{ padding: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <Link href="/" target="_blank" style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', width: '100%',
                    borderRadius: 8, color: '#F5E6C8', backgroundColor: 'transparent',
                    border: 'none', cursor: 'pointer', fontSize: 15, transition: 'all 0.2s',
                    textDecoration: 'none', marginBottom: 8
                }}>
                    <Globe size={18} /> View Live Site
                </Link>
                <button onClick={handleLogout} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', width: '100%',
                    borderRadius: 8, color: '#F07840', backgroundColor: 'transparent',
                    border: 'none', cursor: 'pointer', fontSize: 15, transition: 'all 0.2s',
                    textAlign: 'left'
                }}>
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
}
