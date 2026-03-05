'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, Mail, MapPin, PawPrint } from 'lucide-react';
import styles from './Navbar.module.css';

const navLinks = [
    { label: 'Home', href: '/' },
    {
        label: 'Shop',
        href: '/shop',
        dropdown: [
            { label: '🦜 Birds & Parrots', href: '/shop?category=birds' },
            { label: '🐱 Exotic Cats', href: '/shop?category=cats' },
            { label: '🦎 Reptiles', href: '/shop?category=reptiles' },
            { label: '🐢 Tortoises', href: '/shop?category=tortoises' },
            { label: '🛍️ Accessories', href: '/shop?category=accessories' },
            { label: '🌿 Pet Food', href: '/shop?category=food' },
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

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
        setActiveDropdown(null);
    }, [pathname]);

    const isHiddenRoute = pathname.startsWith('/admin') || pathname === '/login' || pathname === '/register';
    if (isHiddenRoute) return null;

    const forceSolid = pathname !== '/';

    const cleanWhatsapp = settings?.whatsappNumber?.replace(/[^\d+]/g, '') || '9876543210';
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
                        <div className={styles.topbarLeft}>
                            <a href={mapEmbed || "https://maps.app.goo.gl/A8DbhV3wFJpyLnS37"} target="_blank" rel="noopener noreferrer" className={styles.topbarItem}>
                                <MapPin size={14} /> {settings?.address || '123 Exotic Pet Lane, Paradise City'}
                            </a>
                        </div>
                        <div className={styles.topbarRight}>
                            <a href={`tel:${cleanWhatsapp}`} className={styles.topbarItem}>
                                <Phone size={14} /> {displayWhatsapp}
                            </a>
                            <span className={styles.topbarDivider}>|</span>
                            <a href={`mailto:${settings?.emailAddress || 'info@rumzeesexotic.com'}`} className={styles.topbarItem}>
                                <Mail size={14} /> {settings?.emailAddress || 'info@rumzeesexotic.com'}
                            </a>
                        </div>
                    </div>
                </div>

                <div className={`container ${styles.inner}`}>
                    {/* Logo */}
                    <Link href="/" className={styles.logo}>
                        <div className={styles.logoWrapper}>
                            <img
                                src="/logo-exotic.png"
                                alt="Rumzee's Exotic Paradise"
                                className={styles.logoImg}
                            />
                        </div>
                        <div className={styles.logoText}>
                            <span className={styles.logoMain}>Rumzee's</span>
                            <span className={styles.logoSub}>Exotic Pets Paradise</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <ul className={styles.navLinks}>
                        {navLinks.map((link) => (
                            <li
                                key={link.href}
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
            <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileOpen : ''}`}>
                <div className={styles.mobileInner}>
                    {navLinks.map((link) => (
                        <div key={link.href} className={styles.mobileNavItem}>
                            <Link href={link.href} className={styles.mobileNavLink}>
                                {link.label}
                            </Link>
                            {link.dropdown && (
                                <div className={styles.mobileDropdown}>
                                    {link.dropdown.map((d) => (
                                        <Link key={d.href} href={d.href} className={styles.mobileDropdownItem}>
                                            {d.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {mobileOpen && <div className={styles.overlay} onClick={() => setMobileOpen(false)} />}
        </>
    );
}
