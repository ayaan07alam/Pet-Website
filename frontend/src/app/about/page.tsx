'use client';
import { Award, Heart, Star, Users, Shield, Bike } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CompanyStory {
    heading: string;
    storyText: string;
    yearsFounded: string;
    yearsLabel: string;
    familiesCount: string;
    familiesLabel: string;
    breedsCount: string;
    breedsLabel: string;
    ratingValue: string;
    ratingLabel: string;
}

const team = [
    { name: 'Mohammed Rumzee', role: 'Founder & Avian Expert', bio: 'With 8+ years in exotic aviculture, Rumzee founded the shop to share his passion for rare birds with families across India.' },
    { name: 'Aaliya Khan', role: 'Vet & Cat Specialist', bio: 'Licensed veterinarian specializing in exotic cats and small mammals. Ensures every cat is healthy and vaccinated before adoption.' },
    { name: 'Rajan Shetty', role: 'Reptile Handler', bio: 'Expert in reptile care and enclosure design. Has successfully raised and rehomed over 200+ reptiles.' },
    { name: 'Preethi Nair', role: 'Customer Care', bio: 'Always the first to greet you with a smile. Preethi ensures every pet parent leaves happy and well-informed.' },
];

const milestones = [
    { year: '2016', event: 'Rumzee\'s Aviary founded — started with just 5 parrot breeds' },
    { year: '2018', event: 'Expanded to include exotic cats and reptile section' },
    { year: '2020', event: 'Crossed 100 successful adoptions, introduced online booking' },
    { year: '2022', event: 'Added tortoise habitat and live food department' },
    { year: '2024', event: 'Rebranded to Rumzee\'s Exotic — 500+ happy families and growing!' },
];

export default function AboutPage() {
    const [story, setStory] = useState<CompanyStory | null>(null);

    useEffect(() => {
        fetch('/api/company-story')
            .then(r => r.json())
            .then(data => {
                if (!data?.error) setStory(data);
            })
            .catch(() => {});
    }, []);

    const displayStory: CompanyStory = story || {
        heading: 'Born from a Love for Exotic Life',
        storyText: 'Rumzee\'s Exotic began as a small bird aviary in 2016, driven by one man\'s passion for rare and beautiful parrots. Today, we\'re one of India\'s most trusted exotic pet destinations — offering birds, cats, reptiles, tortoises, accessories, and expert care services.',
        yearsFounded: '8+',
        yearsLabel: 'Years of Love',
        familiesCount: '500+',
        familiesLabel: 'Happy Families',
        breedsCount: '50+',
        breedsLabel: 'Exotic Breeds',
        ratingValue: '4.9',
        ratingLabel: 'Customer Rating',
    };

    return (
        <div style={{ minHeight: '100vh', background: '#FDF6EC', paddingTop: 80 }}>
            {/* Hero */}
            <section style={{ background: 'linear-gradient(135deg, #1A0E06 0%, #3A1F0A 50%, #2C1A0E 100%)', padding: '90px 0 70px', overflow: 'hidden', position: 'relative' }}>
                {/* dot texture */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(201,125,14,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
                {/* Amber glow top-right */}
                <div style={{ position: 'absolute', top: -100, right: -50, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,125,14,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
                    <div className="container about-hero-grid">
                    <div>
                        <div className="section-label" style={{ color: '#C97D0E' }}>Our Story</div>
                        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem,5vw,3.5rem)', color: '#F5E6C8', fontWeight: 800, marginBottom: 20 }}>
                            {displayStory.heading}
                        </h1>
                        <p style={{ color: 'rgba(245,230,200,0.8)', fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
                            {displayStory.storyText}
                        </p>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
                            {['Birds', 'Exotic Cats', 'Rodents', 'Reptiles', 'Turtles'].map(tag => (
                                <span key={tag} style={{ padding: '6px 16px', borderRadius: 50, background: 'rgba(201,125,14,0.12)', color: '#E8A020', fontSize: 12, fontWeight: 700, border: '1px solid rgba(201,125,14,0.25)', letterSpacing: '1px', textTransform: 'uppercase' }}>{tag}</span>
                            ))}
                        </div>
                        <Link href="/shop" className="btn-primary">Meet Our Pets</Link>
                    </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            {[
                                { value: displayStory.familiesCount, label: displayStory.familiesLabel },
                                { value: displayStory.breedsCount, label: displayStory.breedsLabel },
                                { value: displayStory.yearsFounded, label: displayStory.yearsLabel },
                                { value: displayStory.ratingValue, label: displayStory.ratingLabel },
                            ].map(s => (
                            <div key={s.label} style={{ background: 'rgba(245,230,200,0.07)', borderRadius: 18, padding: '24px', textAlign: 'center', border: '1px solid rgba(245,230,200,0.1)' }}>
                                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 800, color: '#C97D0E', lineHeight: 1 }}>{s.value}</div>
                                <div style={{ fontSize: 13, color: 'rgba(245,230,200,0.65)', marginTop: 8, letterSpacing: '0.5px' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section style={{ padding: '80px 0', background: '#fff' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: 820 }}>
                    <div className="section-label" style={{ justifyContent: 'center' }}>Our Mission</div>
                    <h2 className="section-title">More Than Pets — We Build Bonds</h2>
                    <p style={{ color: '#6B3A2A', fontSize: 17, lineHeight: 1.9, marginBottom: 48 }}>
                        We believe every exotic animal deserves a loving, knowledgeable home. Our mission is to ethically connect rare and beautiful creatures with families who are truly prepared to care for them — while providing ongoing support every step of the way.
                    </p>
                    <div className="three-col-responsive">
                        {[
                            { icon: <Shield size={24} />, title: 'Ethical Sourcing', desc: 'All animals are captive-bred from licensed breeders — never wild-caught.' },
                            { icon: <Heart size={24} />, title: 'Lifelong Support', desc: 'We stay with you beyond the purchase — diet guides, vet referrals, and more.' },
                            { icon: <Award size={24} />, title: 'Quality First', desc: '100% health-certified pets with a 15-day guarantee on every animal.' },
                        ].map(v => (
                            <div key={v.title} style={{ padding: '28px 24px', background: '#FDF6EC', borderRadius: 18, textAlign: 'left' }}>
                                <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(201,125,14,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C97D0E', marginBottom: 16 }}>{v.icon}</div>
                                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#2C1A0E', marginBottom: 8 }}>{v.title}</h3>
                                <p style={{ fontSize: 14, color: '#6B3A2A', lineHeight: 1.7 }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section style={{ padding: '80px 0', background: '#FDF6EC' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: 56 }}>
                        <div className="section-label" style={{ justifyContent: 'center' }}>The People Behind the Paws</div>
                        <h2 className="section-title">Meet Our Team</h2>
                    </div>
                    <div className="grid-4">
                        {team.map(m => {
                            const initials = m.name.split(' ').map((n: string) => n[0]).slice(0, 2).join('');
                            const colors = [
                                'linear-gradient(135deg, #C97D0E, #E8A020)',
                                'linear-gradient(135deg, #4A7C2E, #6AAA44)',
                                'linear-gradient(135deg, #6B3A2A, #A0614A)',
                                'linear-gradient(135deg, #E8601A, #C97D0E)',
                            ];
                            const idx = team.indexOf(m);
                            return (
                            <div key={m.name} style={{ background: '#fff', borderRadius: 20, padding: 28, textAlign: 'center', boxShadow: '0 4px 20px rgba(44,26,14,0.07)', transition: 'all 0.3s' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(44,26,14,0.12)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(44,26,14,0.07)'; }}>
                                <div style={{ width: 80, height: 80, borderRadius: '50%', background: colors[idx % colors.length], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800, color: '#fff', margin: '0 auto 16px', fontFamily: "'Cormorant Garamond', serif", letterSpacing: '1px', boxShadow: '0 4px 16px rgba(44,26,14,0.15)' }}>{initials}</div>
                                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: '#2C1A0E', marginBottom: 4 }}>{m.name}</h3>
                                <p style={{ fontSize: 12, color: '#C97D0E', fontWeight: 600, letterSpacing: 0.5, marginBottom: 12 }}>{m.role}</p>
                                <p style={{ fontSize: 13, color: '#6B3A2A', lineHeight: 1.7 }}>{m.bio}</p>
                            </div>
                        )})}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section style={{ padding: '80px 0', background: '#fff', position: 'relative', overflow: 'hidden' }}>
                {/* Subtle geometric background accent */}
                <div style={{ position: 'absolute', right: -60, bottom: -60, width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(201,125,14,0.06)', pointerEvents: 'none' }} />
                <div className="container" style={{ maxWidth: 760 }}>
                    <div style={{ textAlign: 'center', marginBottom: 56 }}>
                        <div className="section-label" style={{ justifyContent: 'center' }}>Our Journey</div>
                        <h2 className="section-title">Milestones &amp; Moments</h2>
                    </div>
                    <div style={{ position: 'relative', paddingLeft: 48 }}>
                        {/* Animated vertical timeline line */}
                        <div style={{ position: 'absolute', left: 16, top: 0, bottom: 0, width: 3, background: 'linear-gradient(to bottom, #C97D0E, rgba(201,125,14,0.15))', borderRadius: 4 }} />
                        {milestones.map((m, i) => (
                            <div key={m.year} style={{
                                position: 'relative', marginBottom: 36, paddingLeft: 20,
                                opacity: 1, transform: 'translateX(0)', transition: 'all 0.3s ease'
                            }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(6px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; }}
                            >
                                {/* Milestone glow dot */}
                                <div style={{
                                    position: 'absolute', left: -38, top: 6, width: 20, height: 20, borderRadius: '50%',
                                    background: i === milestones.length - 1 ? 'linear-gradient(135deg, #C97D0E, #E8601A)' : '#fff',
                                    border: '3px solid #C97D0E',
                                    boxShadow: i === milestones.length - 1 ? '0 0 0 6px rgba(201,125,14,0.2)' : 'none',
                                    transition: 'all 0.3s ease'
                                }} />
                                <span style={{ display: 'inline-block', background: i === milestones.length - 1 ? 'linear-gradient(135deg, #C97D0E, #E8601A)' : 'rgba(201,125,14,0.1)', color: i === milestones.length - 1 ? '#fff' : '#C97D0E', fontWeight: 700, fontSize: 13, padding: '4px 14px', borderRadius: 50, marginBottom: 8 }}>{m.year}</span>
                                <p style={{ color: '#2C1A0E', fontSize: 16, lineHeight: 1.6, margin: 0 }}>{m.event}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
