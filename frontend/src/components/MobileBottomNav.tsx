'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, ShoppingBag, Heart, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import styles from './MobileBottomNav.module.css';

export default function MobileBottomNav() {
    const pathname = usePathname();
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        fetch('/api/settings').then(r => r.json()).then(setSettings).catch(console.error);
    }, []);

    const isHiddenRoute = pathname.startsWith('/admin') || pathname === '/login' || pathname === '/register';
    if (isHiddenRoute) return null;

    const cleanWhatsapp = settings?.whatsappNumber?.replace(/[^\d+]/g, '') || '918197398357';
    const waLink = `https://wa.me/${cleanWhatsapp.replace(/^\+/, '')}`;

    return (
        <div className={styles.bottomNavContainer}>
            <nav className={styles.bottomNav}>
                <Link href="/" className={`${styles.navItem} ${pathname === '/' ? styles.active : ''}`}>
                    <Home size={22} className={styles.icon} />
                    <span>Home</span>
                </Link>
                <Link href="/shop" className={`${styles.navItem} ${pathname === '/shop' ? styles.active : ''}`}>
                    <ShoppingBag size={22} className={styles.icon} />
                    <span>Shop</span>
                </Link>
                <Link href="/wishlist" className={`${styles.navItem} ${pathname === '/wishlist' ? styles.active : ''}`}>
                    <Heart size={22} className={styles.icon} />
                    <span>Wishlist</span>
                </Link>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className={styles.navItem}>
                    <Phone size={22} className={styles.icon} />
                    <span>Contact</span>
                </a>
            </nav>

            {/* Safe area padding for iPhones with Home Indicator */}
            <div className={styles.safeArea} />
        </div>
    );
}
