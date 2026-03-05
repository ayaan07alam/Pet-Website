'use client';
import Link from 'next/link';
import { ArrowRight, Scissors, Home, HeartPulse, ShoppingBag, Clock, Phone } from 'lucide-react';

const services = [
    {
        icon: '✂️',
        lucide: <Scissors size={28} />,
        title: 'Pet Grooming',
        desc: 'Professional grooming for birds, cats, and small animals. Bathing, nail trimming, plumage care, and styling.',
        price: 'From ₹500',
        color: '#C97D0E',
        features: ['Avian feather care', 'Cat grooming & de-shedding', 'Nail & beak trimming', 'Medicated baths'],
    },
    {
        icon: '🏠',
        lucide: <Home size={28} />,
        title: 'Pet Boarding',
        desc: 'Safe, comfortable boarding for your exotic pets while you\'re away. Climate-controlled enclosures and 24/7 monitoring.',
        price: 'From ₹300/day',
        color: '#E8601A',
        features: ['Climate-controlled stays', 'Individual enclosures', '24/7 monitoring', 'Daily feeding & care'],
    },
    {
        icon: '🏥',
        lucide: <HeartPulse size={28} />,
        title: 'Vet Consultation',
        desc: 'On-site vet consultations for exotic birds, reptiles, and cats. Health certifications for new pets.',
        price: 'From ₹400',
        color: '#4A7C2E',
        features: ['Exotic animal specialists', 'Health certifications', 'Vaccination services', 'Diet planning'],
    },
    {
        icon: '🛍️',
        lucide: <ShoppingBag size={28} />,
        title: 'Pet Accessories',
        desc: 'Premium cages, terrariums, toys, perches, food, and all essential supplies for your exotic pet.',
        price: 'Wide range',
        color: '#6B3A2A',
        features: ['Custom cage builds', 'Exotic pet diets', 'Enrichment toys', 'Heating & lighting gear'],
    },
];

export default function ServicesPage() {
    return (
        <div style={{ minHeight: '100vh', background: '#FDF6EC', paddingTop: 80 }}>
            {/* Hero */}
            <section style={{ background: 'linear-gradient(135deg, #2C1A0E, #6B3A2A)', padding: '80px 0 64px', textAlign: 'center' }}>
                <div className="container">
                    <div className="section-label" style={{ justifyContent: 'center', color: '#C97D0E' }}>What We Offer</div>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem,5vw,3.5rem)', color: '#F5E6C8', fontWeight: 800, marginBottom: 16 }}>Our Services</h1>
                    <p style={{ color: 'rgba(245,230,200,0.75)', fontSize: 18, maxWidth: 560, margin: '0 auto' }}>
                        Beyond selling pets, we provide comprehensive care services to ensure your exotic companions thrive.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section style={{ padding: '80px 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
                        {services.map((s) => (
                            <div key={s.title} style={{ background: '#fff', borderRadius: 24, overflow: 'hidden', boxShadow: '0 4px 20px rgba(44,26,14,0.08)', transition: 'all 0.3s ease' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(44,26,14,0.14)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(44,26,14,0.08)'; }}>
                                <div style={{ background: `${s.color}12`, padding: '32px 28px 24px' }}>
                                    <div style={{ width: 64, height: 64, borderRadius: 18, background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, marginBottom: 16 }}>{s.lucide}</div>
                                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#2C1A0E', marginBottom: 8 }}>{s.title}</h3>
                                    <p style={{ fontSize: 14, color: '#6B3A2A', lineHeight: 1.7 }}>{s.desc}</p>
                                </div>
                                <div style={{ padding: '20px 28px 28px' }}>
                                    <ul style={{ listStyle: 'none', marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        {s.features.map(f => (
                                            <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#2C1A0E' }}>
                                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, flexShrink: 0 }} /> {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: s.color }}>{s.price}</span>
                                        <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: s.color, textDecoration: 'none' }}>Book Now <ArrowRight size={14} /></Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timing + CTA */}
            <section style={{ padding: '64px 0', background: '#2C1A0E' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
                    <div>
                        <div className="section-label" style={{ color: '#C97D0E', justifyContent: 'flex-start' }}>Store Hours</div>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', color: '#F5E6C8', marginBottom: 24 }}>Visit Us Anytime</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {[
                                { day: 'Monday – Saturday', time: '10:00 AM – 8:00 PM' },
                                { day: 'Sunday', time: '11:00 AM – 6:00 PM' },
                            ].map(h => (
                                <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 20px', background: 'rgba(245,230,200,0.06)', borderRadius: 12, border: '1px solid rgba(245,230,200,0.08)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(245,230,200,0.8)', fontSize: 15 }}><Clock size={16} style={{ color: '#C97D0E' }} /> {h.day}</div>
                                    <span style={{ color: '#C97D0E', fontWeight: 600, fontSize: 15 }}>{h.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ color: 'rgba(245,230,200,0.7)', fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
                            Want to book a grooming session, boarding stay, or vet consultation? Contact us and we&apos;ll schedule at your convenience.
                        </p>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href="/contact" className="btn-primary">Book a Service</Link>
                            <a href="tel:+919876543210" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 50, border: '2px solid rgba(245,230,200,0.25)', color: '#F5E6C8', fontSize: 15, fontWeight: 600, textDecoration: 'none', transition: 'all 0.25s' }}>
                                <Phone size={16} /> Call Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
