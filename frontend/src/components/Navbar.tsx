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
            { label: 'Birds & Parrots', href: '/shop?category=birds' },
            { label: 'Big Birds', href: '/shop?category=birds' },
            { label: 'Exotic Cats', href: '/shop?category=cats' },
            { label: 'Rodents', href: '/shop?category=rodents' },
            { label: 'Reptiles', href: '/shop?category=reptiles' },
            { label: 'Turtles', href: '/shop?category=turtles' },
            { label: 'Accessories', href: '/shop?category=accessories' },
            { label: 'Pet Food', href: '/shop?category=food' },
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
                        <Link href="/" className={styles.logo}>
                            <Image
                                src="/logo.png"
                                alt="Rumzee's Exotics"
                                width={44}
                                height={44}
                                quality={100}
                                priority
                                className={styles.logoImage}
                                style={{ borderRadius: '50%', border: '1px solid rgba(201,125,14,0.3)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
                            />
                            <div className={styles.logoText}>
                                <span className={styles.logoMain}>RUMZEE&apos;S</span>
                                <span className={styles.logoSub} style={{ letterSpacing: '4px' }}>EXOTICS</span>
                            </div>
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
                                <div className={styles.logoText}>
                                    <span className={styles.logoMain} style={{ fontSize: 24, textShadow: 'none' }}>Rumzee's</span>
                                    <span className={styles.logoSub} style={{ color: '#A0614A' }}>Exotic Pets</span>
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
