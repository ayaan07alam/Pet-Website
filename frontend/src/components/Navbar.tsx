'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, Mail, MapPin } from 'lucide-react';
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';
import Magnetic from '@/components/animations/Magnetic';

const navLinks = [
    { label: 'Home', href: '/' },
    {
        label: 'Shop',
        href: '/shop',
        dropdown: [
            { label: '🦜 Birds & Parrots', href: '/shop?category=birds' },
            { label: '🦅 Big Birds', href: '/shop?category=birds&type=big' },
            { label: '🐱 Exotic Cats', href: '/shop?category=cats' },
            { label: '🐹 Rodents', href: '/shop?category=rodents' },
            { label: '🦎 Reptiles', href: '/shop?category=reptiles' },
            { label: '🐢 Turtles & Tortoises', href: '/shop?category=turtles' },
            { label: '🛍️ Accessories', href: '/shop?category=accessories' },
            { label: '🍃 Pet Food', href: '/shop?category=food' },
        ],
    },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const pathname = usePathname();
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        fetch('/api/settings').then(r => r.json()).then(setSettings).catch(console.error);
    }, []);

    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 20);
    });

    useEffect(() => {
        setMobileOpen(false);
        setActiveDropdown(null);
    }, [pathname]);

    const isHiddenRoute = pathname.startsWith('/admin') || pathname === '/login' || pathname === '/register';
    if (isHiddenRoute) return null;

    const forceSolid = pathname !== '/';

    const cleanWhatsapp = settings?.whatsappNumber?.replace(/[^\d+]/g, '') || '918197398357';
    const displayWhatsapp = cleanWhatsapp.startsWith('+91') || cleanWhatsapp.startsWith('91') && cleanWhatsapp.length === 12
        ? `+${cleanWhatsapp.replace(/^\+/, '')}`
        : `+91 ${cleanWhatsapp}`;
    const waLink = `https://wa.me/${cleanWhatsapp.replace(/^\+/, '')}`;

    let mapEmbed = settings?.embeddedMapUrl || '';
    if (mapEmbed.includes('<iframe')) {
        const match = mapEmbed.match(/src="([^"]+)"/);
        if (match) mapEmbed = match[1];
    }

    return (
        <>
            <nav className={`${styles.navbar} ${scrolled || forceSolid ? styles.scrolled : ''}`}>
                {/* Topbar: Hidden on scroll */}
                <div className={styles.topbar}>
                    <div className={`container ${styles.topbarInner}`}>
                        <div className={styles.topbarLeft} style={{ display: 'none' }}>
                            <a href={mapEmbed || "https://maps.app.goo.gl/A8DbhV3wFJpyLnS37"} target="_blank" rel="noopener noreferrer" className={styles.topbarItem}>
                                <MapPin size={14} /> {settings?.address || '123 Exotic Pet Lane, Paradise City'}
                            </a>
                        </div>
                        <div className={styles.topbarRight} style={{ width: '100%', justifyContent: 'center' }}>
                            <a href={`tel:${cleanWhatsapp}`} className={styles.topbarItem}>
                                <Phone size={14} /> {displayWhatsapp}
                            </a>
                            <span className={styles.topbarDivider} style={{ display: 'none' }}>|</span>
                            <a href={`mailto:${settings?.emailAddress || 'info@rumzeesexotic.com'}`} className={styles.topbarItem} style={{ display: 'none' }}>
                                <Mail size={14} /> {settings?.emailAddress || 'info@rumzeesexotic.com'}
                            </a>
                        </div>
                    </div>
                </div>

                <div className={`container ${styles.inner}`}>
                    {/* Logo */}
                    <Magnetic strength={0.2}>
                        <Link href="/" className={styles.logo} style={{ gap: 0 }}>
                            <Image
                                src="/logo.png"
                                alt="Rumzee's Exotics"
                                width={60}
                                height={60}
                                quality={100}
                                priority
                                className={styles.logoImage}
                                style={{ borderRadius: '50%', border: '2px solid rgba(201,125,14,0.35)', boxShadow: '0 4px 20px rgba(201,125,14,0.2)' }}
                            />
                        </Link>
                    </Magnetic>

                    {/* Desktop Nav */}
                    <ul className={styles.navLinks}>
                        {navLinks.map((link) => (
                            <Magnetic strength={0.15} key={link.href}>
                                <li
                                    className={styles.navItem}
                                    onMouseEnter={() => link.dropdown && setActiveDropdown(link.href)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <Link
                                        href={link.href}
                                        className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
                                    >
                                        {link.label}
                                        {link.dropdown && <ChevronDown size={14} />}
                                    </Link>
                                    {link.dropdown && (
                                        <div className={`${styles.dropdown} ${activeDropdown === link.href ? styles.dropdownOpen : ''}`}>
                                            {link.dropdown.map((d) => (
                                                <Link key={d.href} href={d.href} className={styles.dropdownItem}>
                                                    {d.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            </Magnetic>
                        ))}
                    </ul>

                    {/* Actions */}
                    <div className={styles.actions}>
                        <button
                            className={styles.menuBtn}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div 
                            className={styles.mobileMenu}
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                        >
                            <div className={styles.mobileHeader}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        src="/logo.png"
                                        alt="Rumzee's Exotics"
                                        width={52}
                                        height={52}
                                        quality={100}
                                        style={{ borderRadius: '50%', border: '2px solid rgba(232,160,32,0.4)', boxShadow: '0 4px 24px rgba(232,160,32,0.2)' }}
                                    />
                                </div>
                                <button className={styles.closeBtn} onClick={() => setMobileOpen(false)} aria-label="Close menu">
                                    <X size={28} />
                                </button>
                            </div>

                            <div className={styles.mobileInner}>
                                {navLinks.map((link, i) => (
                                    <motion.div 
                                        key={link.href} 
                                        className={styles.mobileNavItem}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                                    >
                                        <Link href={link.href} className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>
                                            {link.label}
                                        </Link>
                                        {link.dropdown && (
                                            <div className={styles.mobileDropdown}>
                                                {link.dropdown.map((d) => (
                                                    <Link key={d.href} href={d.href} className={styles.mobileDropdownItem} onClick={() => setMobileOpen(false)}>
                                                        {d.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Mobile Menu Contact Strip */}
                            <div style={{
                                margin: '16px 0 24px',
                                padding: '20px 0 0',
                                borderTop: '1px solid rgba(245,230,200,0.08)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 12,
                            }}>
                                <a href={waLink} target="_blank" rel="noopener noreferrer" style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    background: 'rgba(37,211,102,0.1)', borderRadius: 14,
                                    padding: '14px 18px', textDecoration: 'none',
                                    color: '#25D366', fontWeight: 600, fontSize: 15,
                                    border: '1px solid rgba(37,211,102,0.18)',
                                }} onClick={() => setMobileOpen(false)}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                    Chat on WhatsApp
                                </a>
                                <a href={`tel:${cleanWhatsapp}`} style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    background: 'rgba(201,125,14,0.08)', borderRadius: 14,
                                    padding: '14px 18px', textDecoration: 'none',
                                    color: '#E8A020', fontWeight: 600, fontSize: 15,
                                    border: '1px solid rgba(201,125,14,0.18)',
                                }}>
                                    <Phone size={18} /> {displayWhatsapp}
                                </a>
                            </div>
                        </motion.div>
                        <motion.div 
                            className={styles.overlay} 
                            onClick={() => setMobileOpen(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
