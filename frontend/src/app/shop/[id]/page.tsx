'use client';
import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { Star, ArrowLeft, Shield, Truck, Phone, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { mockPets } from '@/data/mockData';
import PetCard from '@/components/PetCard';

export default function PetDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [fetchedPet, setFetchedPet] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [imgIdx, setImgIdx] = useState(0);
    const [leadSubmitting, setLeadSubmitting] = useState(false);
    const [leadSuccess, setLeadSuccess] = useState<string | null>(null);
    const [leadError, setLeadError] = useState<string | null>(null);
    const [leadName, setLeadName] = useState('');
    const [leadPhone, setLeadPhone] = useState('');
    const [leadMessage, setLeadMessage] = useState('');

    useEffect(() => {
        fetch(`/api/pets/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data && !data.error) setFetchedPet(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FDF6EC', color: '#6B3A2A', fontSize: 18 }}>Loading companion details...</div>;

    const pet = fetchedPet || mockPets.find(p => p.id === id);
    if (!pet) return notFound();

    const images = pet.images?.length ? pet.images : (pet.image ? [pet.image, pet.image, pet.image] : ['/images/hero/bg_forest.png']);
    const related = mockPets.filter(p => p.species === pet.species && p.id !== pet.id).slice(0, 4);

    const priceText = pet.price > 0 ? `listed at ₹${pet.price.toLocaleString('en-IN')}` : 'listed without a set price';
    const whatsappMsg = encodeURIComponent(`Hi! I'm interested in ${pet.name} (${pet.breed}, ${pet.age}, ${pet.gender}) ${priceText}. Can you share more details?`);
    const whatsappLink = `https://wa.me/918001234567?text=${whatsappMsg}`;

    const submitLead = async (e: React.FormEvent) => {
        e.preventDefault();
        setLeadSubmitting(true);
        setLeadSuccess(null);
        setLeadError(null);
        try {
            const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: leadName,
                    phone: leadPhone,
                    message: leadMessage || `Enquiry about ${pet.name} (${pet.breed})`,
                    source: 'pet_inquiry',
                    petId: pet.id,
                    pageUrl,
                }),
            });
            const data = await res.json();
            if (!res.ok || data.error) {
                throw new Error(data.error || 'Failed to submit enquiry');
            }
            setLeadSuccess('Thanks, we have received your enquiry. We will contact you shortly.');
            setLeadName('');
            setLeadPhone('');
            setLeadMessage('');
        } catch (err: any) {
            setLeadError(err?.message || 'Something went wrong, please try again.');
        } finally {
            setLeadSubmitting(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#FDF6EC', paddingTop: 80 }}>
            <div className="container" style={{ padding: '40px 24px' }}>
                <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#6B3A2A', fontSize: 14, marginBottom: 32, textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#C97D0E'}
                    onMouseLeave={e => e.currentTarget.style.color = '#6B3A2A'}
                >
                    <ArrowLeft size={16} /> Back to Shop
                </Link>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, marginBottom: 80 }}>
                    {/* Gallery */}
                    <div>
                        <div style={{ borderRadius: 24, overflow: 'hidden', marginBottom: 16, position: 'relative', background: '#F5E6C8', paddingTop: '75%', boxShadow: '0 8px 40px rgba(44,26,14,0.12)' }}>
                            <img src={images[imgIdx]} alt={pet.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                            {images.length > 1 && (
                                <>
                                    <button onClick={() => setImgIdx((imgIdx - 1 + images.length) % images.length)} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(253,246,236,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2C1A0E', boxShadow: '0 2px 8px rgba(44,26,14,0.15)', transition: 'all 0.2s' }}><ChevronLeft size={20} /></button>
                                    <button onClick={() => setImgIdx((imgIdx + 1) % images.length)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(253,246,236,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2C1A0E', boxShadow: '0 2px 8px rgba(44,26,14,0.15)', transition: 'all 0.2s' }}><ChevronRight size={20} /></button>
                                </>
                            )}
                        </div>
                        <div style={{ display: 'flex', gap: 10 }}>
                            {images.map((img: string, i: number) => (
                                <button key={i} onClick={() => setImgIdx(i)} style={{ width: 72, height: 72, borderRadius: 12, overflow: 'hidden', border: `2px solid ${i === imgIdx ? '#C97D0E' : 'transparent'}`, cursor: 'pointer', background: '#F5E6C8', transition: 'all 0.2s', flexShrink: 0 }}>
                                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Info */}
                    <div>
                        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                            {pet.isNew && <span className="badge badge-new">✨ New</span>}
                            {pet.featured && <span className="badge badge-featured">⭐ Featured</span>}
                            <span className={`badge ${pet.available ? 'badge-available' : 'badge-sold'}`}>{pet.available ? '✓ Available' : 'Sold Out'}</span>
                        </div>
                        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 800, color: '#2C1A0E', marginBottom: 8 }}>{pet.name}</h1>
                        <p style={{ fontSize: 16, color: '#6B3A2A', marginBottom: 16, textTransform: 'capitalize' }}>{pet.breed} • {pet.species}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                            <div style={{ display: 'flex', gap: 3 }}>
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < Math.round(pet.rating) ? '#C97D0E' : 'none'} stroke={i < Math.round(pet.rating) ? '#C97D0E' : '#ccc'} />)}
                            </div>
                            <span style={{ fontSize: 14, color: '#6B3A2A' }}>{pet.rating} ({pet.reviews} reviews)</span>
                        </div>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 800, color: '#C97D0E', marginBottom: 24 }}>{pet.price > 0 ? `₹${pet.price.toLocaleString('en-IN')}` : 'Price on Request'}</div>

                        {/* Specs */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
                            {[
                                { label: 'Age', value: pet.age },
                                { label: 'Gender', value: pet.gender },
                                { label: 'Species', value: pet.species.charAt(0).toUpperCase() + pet.species.slice(1) },
                                { label: 'Breed', value: pet.breed },
                            ].map(s => (
                                <div key={s.label} style={{ padding: '14px 18px', background: '#fff', borderRadius: 14, border: '1px solid rgba(44,26,14,0.06)', transition: 'all 0.2s' }}>
                                    <p style={{ fontSize: 11, color: '#A0614A', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{s.label}</p>
                                    <p style={{ fontSize: 15, fontWeight: 600, color: '#2C1A0E' }}>{s.value}</p>
                                </div>
                            ))}
                        </div>

                        <p style={{ color: '#6B3A2A', lineHeight: 1.8, marginBottom: 28, fontSize: 15 }}>{pet.description || 'This beautiful exotic pet is captive-bred, hand-raised, and ready to join your family.'}</p>

                        {/* Enquire CTA */}
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: 12,
                                background: 'linear-gradient(135deg, #25D366, #128C7E)', color: '#fff',
                                padding: '16px 36px', borderRadius: 50, fontWeight: 700, fontSize: 16,
                                textDecoration: 'none', boxShadow: '0 8px 32px rgba(37,211,102,0.35)',
                                transition: 'all 0.3s ease', marginBottom: 16
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(37,211,102,0.5)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(37,211,102,0.35)'; }}
                        >
                            <MessageCircle size={20} /> Enquire on WhatsApp
                        </a>

                        {/* Lead Capture Form */}
                        <div style={{ marginBottom: 24, padding: '16px 18px', borderRadius: 16, background: '#fff', border: '1px solid rgba(44,26,14,0.06)' }}>
                            <p style={{ fontSize: 14, color: '#6B3A2A', marginBottom: 12 }}>
                                Prefer a callback instead? Leave your details and we&apos;ll reach out.
                            </p>
                            <form onSubmit={submitLead} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <input
                                    required
                                    placeholder="Your name"
                                    value={leadName}
                                    onChange={e => setLeadName(e.target.value)}
                                    style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #DDD', fontSize: 14 }}
                                />
                                <input
                                    required
                                    placeholder="WhatsApp or phone number"
                                    value={leadPhone}
                                    onChange={e => setLeadPhone(e.target.value)}
                                    style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #DDD', fontSize: 14 }}
                                />
                                <textarea
                                    placeholder="Anything specific you would like to ask?"
                                    value={leadMessage}
                                    onChange={e => setLeadMessage(e.target.value)}
                                    style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #DDD', fontSize: 14, minHeight: 70 }}
                                />
                                <button
                                    type="submit"
                                    disabled={leadSubmitting}
                                    style={{
                                        marginTop: 4,
                                        alignSelf: 'flex-start',
                                        padding: '10px 18px',
                                        borderRadius: 999,
                                        border: 'none',
                                        backgroundColor: '#2C1A0E',
                                        color: '#fff',
                                        fontSize: 14,
                                        fontWeight: 600,
                                        cursor: leadSubmitting ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    {leadSubmitting ? 'Sending...' : 'Request a callback'}
                                </button>
                                {leadSuccess && (
                                    <p style={{ fontSize: 13, color: '#4A7C2E', marginTop: 4 }}>{leadSuccess}</p>
                                )}
                                {leadError && (
                                    <p style={{ fontSize: 13, color: '#E8601A', marginTop: 4 }}>{leadError}</p>
                                )}
                            </form>
                        </div>

                        {/* Guarantees */}
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                            {[
                                { icon: <Shield size={14} />, text: '15-Day Health Guarantee' },
                                { icon: <Truck size={14} />, text: 'Safe Live Delivery' },
                                { icon: <Phone size={14} />, text: 'Lifetime Support' },
                            ].map(g => (
                                <span key={g.text} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#4A7C2E', fontWeight: 600, padding: '8px 14px', background: 'rgba(74,124,46,0.1)', borderRadius: 50 }}>
                                    {g.icon} {g.text}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Related Pets */}
                {related.length > 0 && (
                    <div>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, color: '#2C1A0E', marginBottom: 32 }}>You May Also Like</h2>
                        <div className="grid-4">
                            {related.map(p => <PetCard key={p.id} pet={p} />)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
