'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        fetch('/api/settings').then(r => r.json()).then(setSettings).catch(console.error);
    }, []);

    const isHiddenRoute = pathname.startsWith('/admin') || pathname === '/login' || pathname === '/register';
    if (isHiddenRoute) return null;

    const cleanWhatsapp = settings?.whatsappNumber?.replace(/[^\d+]/g, '') || '9876543210';
    const displayWhatsapp = cleanWhatsapp.startsWith('+91') || cleanWhatsapp.startsWith('91') && cleanWhatsapp.length === 12
        ? `+${cleanWhatsapp.replace(/^\+/, '')}`
        : `+91 ${cleanWhatsapp}`;
    const waLink = `https://wa.me/${cleanWhatsapp.replace(/^\+/, '')}`;

    return (
        <footer style={{ background: '#2C1A0E', color: '#F5E6C8' }}>
            {/* Upper Footer */}
            <div className="container" style={{ padding: '64px 24px 48px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '48px' }}>

                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                            <div style={{ background: '#FDF6EC', borderRadius: '50%', padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img
                                    src="/logo.png"
                                    alt="Rumzee's Exotic Logo"
                                    style={{
                                        width: 56,
                                        height: 56,
                                        objectFit: 'contain',
                                        borderRadius: '50%',
                                        flexShrink: 0,
                                    }}
                                />
                            </div>
                            <div>
                                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700 }}>Rumzee&apos;s Exotic</div>
                                <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#C97D0E', fontFamily: "'DM Sans', sans-serif" }}>Premium Pet Shop</div>
                            </div>
                        </div>
                        <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(245,230,200,0.7)', marginBottom: 24 }}>
                            Your trusted destination for rare and exotic birds, cats, reptiles, and tortoises. Premium quality, ethically sourced, loved for life.
                        </p>
                        <div style={{ display: 'flex', gap: 12 }}>
                            {[
                                { href: settings?.instagramUrl || 'https://instagram.com', icon: <Instagram size={18} />, label: 'Instagram' },
                                { href: settings?.facebookUrl || 'https://facebook.com', icon: <Facebook size={18} />, label: 'Facebook' },
                                { href: settings?.youtubeUrl || 'https://youtube.com', icon: <Youtube size={18} />, label: 'YouTube' },
                                { href: settings?.twitterUrl || 'https://twitter.com', icon: <Twitter size={18} />, label: 'Twitter' },
                            ].map((s) => (
                                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                                    aria-label={s.label}
                                    style={{
                                        width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', background: 'rgba(245,230,200,0.08)',
                                        color: 'rgba(245,230,200,0.7)', transition: 'all 0.25s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(201,125,14,0.25)';
                                        e.currentTarget.style.color = '#C97D0E';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(245,230,200,0.08)';
                                        e.currentTarget.style.color = 'rgba(245,230,200,0.7)';
                                    }}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, marginBottom: 20, color: '#F5E6C8' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {[
                                { label: 'Shop All Pets', href: '/shop' },
                                { label: 'Bird Aviary', href: '/shop?category=birds' },
                                { label: 'Exotic Cats', href: '/shop?category=cats' },
                                { label: 'Reptiles', href: '/shop?category=reptiles' },
                                { label: 'Accessories', href: '/shop?category=accessories' },
                                { label: 'Pet Food', href: '/shop?category=food' },
                            ].map((l) => (
                                <li key={l.href}>
                                    <Link href={l.href} style={{ color: 'rgba(245,230,200,0.7)', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s ease', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                        <span style={{ color: '#C97D0E' }}>→</span> {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, marginBottom: 20, color: '#F5E6C8' }}>Company</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {[
                                { label: 'About Us', href: '/about' },
                                { label: 'Our Services', href: '/services' },
                                { label: 'Contact Us', href: '/contact' },
                            ].map((l) => (
                                <li key={l.href}>
                                    <Link href={l.href} style={{ color: 'rgba(245,230,200,0.7)', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s ease', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                        <span style={{ color: '#C97D0E' }}>→</span> {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, marginBottom: 20, color: '#F5E6C8' }}>Get in Touch</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <li>
                                <a href={`tel:${cleanWhatsapp}`} style={{ color: 'rgba(245,230,200,0.7)', fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, transition: 'color 0.2s ease' }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#C97D0E'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(245,230,200,0.7)'}>
                                    <Phone size={16} style={{ color: '#C97D0E', flexShrink: 0 }} /> {displayWhatsapp}
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${settings?.emailAddress || 'info@rumzeesexotic.com'}`} style={{ color: 'rgba(245,230,200,0.7)', fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, transition: 'color 0.2s ease' }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#C97D0E'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(245,230,200,0.7)'}>
                                    <Mail size={16} style={{ color: '#C97D0E', flexShrink: 0 }} /> {settings?.emailAddress || 'info@rumzeesexotic.com'}
                                </a>
                            </li>
                            <li>
                                <a href={settings?.embeddedMapUrl || "https://maps.app.goo.gl/A8DbhV3wFJpyLnS37"} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'flex-start', gap: 12, color: 'rgba(245,230,200,0.7)', textDecoration: 'none', fontSize: 14 }}>
                                    <MapPin size={16} style={{ color: '#C97D0E', flexShrink: 0, marginTop: 2 }} />
                                    <div style={{ lineHeight: 1.6, transition: 'color 0.2s ease' }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = '#C97D0E'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(245,230,200,0.7)'}>
                                        {settings?.address ? settings.address : 'Visit our store — click to open in Maps'}
                                    </div>
                                </a>
                            </li>
                        </ul>
                        <div style={{ marginTop: 8, padding: '14px 18px', background: 'rgba(245,230,200,0.05)', borderRadius: 12, border: '1px solid rgba(245,230,200,0.1)', fontSize: 13, lineHeight: 1.7, color: 'rgba(245,230,200,0.6)', whiteSpace: 'pre-line' }}>
                            {settings?.storeHoursRaw || '🕐 Mon–Sat: 10am – 8pm\n🕐 Sunday: 11am – 6pm'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Lower Footer */}
            <div style={{ borderTop: '1px solid rgba(245,230,200,0.08)', padding: '20px 24px' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <p style={{ fontSize: 13, color: 'rgba(245,230,200,0.5)' }}>
                        © 2025 Rumzee&apos;s Exotic. All rights reserved.
                    </p>
                    <div style={{ display: 'flex', gap: 20 }}>
                        {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((t) => (
                            <Link key={t} href="#" style={{ fontSize: 13, color: 'rgba(245,230,200,0.5)', textDecoration: 'none' }}>{t}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
