'use client';
import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, Grid, List, X } from 'lucide-react';
import PetCard from '@/components/PetCard';
import { mockPets, mockProducts } from '@/data/mockData';

const SPECIES = ['all', 'bird', 'cat', 'rodent', 'reptile', 'tortoise'];
const CATEGORY_MAP: Record<string, string> = { birds: 'bird', cats: 'cat', reptiles: 'reptile', tortoises: 'tortoise', turtles: 'tortoise', rodents: 'rodent' };

function ShopContent() {
    const searchParams = useSearchParams();
    const initCat = searchParams.get('category') || 'all';
    const [search, setSearch] = useState('');
    const [species, setSpecies] = useState(initCat === 'accessories' || initCat === 'food' ? 'all' : (CATEGORY_MAP[initCat] || 'all'));
    const [showProducts, setShowProducts] = useState(initCat === 'accessories' || initCat === 'food');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(200000);
    const [gender, setGender] = useState('all');
    const [sortBy, setSortBy] = useState('featured');
    const [layout, setLayout] = useState<'grid' | 'list'>('grid');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
    const [fetchedPets, setFetchedPets] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/pets').then(r => r.json()).then(data => {
            if (data && data.length) setFetchedPets(data);
        }).catch(console.error);
    }, []);

    const filtered = useMemo(() => {
        if (showProducts) {
            return mockProducts.filter(p => {
                const cat = searchParams.get('category');
                if (cat === 'accessories') return p.category === 'accessories';
                if (cat === 'food') return p.category === 'food';
                return true;
            });
        }
        let pets = fetchedPets.length ? [...fetchedPets] : [...mockPets];
        if (search) pets = pets.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.breed.toLowerCase().includes(search.toLowerCase()));
        if (species !== 'all') pets = pets.filter(p => p.species === species);
        if (gender !== 'all') pets = pets.filter(p => p.gender.toLowerCase() === gender);
        pets = pets.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
        switch (sortBy) {
            case 'price-asc': pets.sort((a, b) => a.price - b.price); break;
            case 'price-desc': pets.sort((a, b) => b.price - a.price); break;
            case 'rating': pets.sort((a, b) => b.rating - a.rating); break;
            case 'new': pets = pets.filter(p => p.isNew).concat(pets.filter(p => !p.isNew)); break;
            default: pets = pets.filter(p => p.featured).concat(pets.filter(p => !p.featured)); break;
        }
        return pets;
    }, [search, species, gender, priceRange, sortBy, showProducts, searchParams, fetchedPets]);

    return (
        <div style={{ minHeight: '100vh', background: '#FDF6EC', paddingTop: 80 }}>
            {/* Immersive Tropical Header */}
            <div style={{ background: 'linear-gradient(135deg, #1A0E06 0%, #3A1F0A 40%, #2C5010 100%)', padding: '60px 0 50px', position: 'relative', overflow: 'hidden' }}>
                {/* Abstract decorative circles — no emojis */}
                <div style={{ position: 'absolute', right: -60, bottom: -60, width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', left: -40, top: -40, width: 220, height: 220, borderRadius: '50%', background: 'rgba(201,125,14,0.08)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', right: 160, top: -20, width: 140, height: 140, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
                {/* Dot pattern */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
                {/* Gradient fade right edge */}
                <div style={{ position: 'absolute', right: 0, top: 0, width: '30%', height: '100%', background: 'linear-gradient(to left, rgba(44,80,16,0.3), transparent)', pointerEvents: 'none' }} />

                <div className="container">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 0 3px rgba(74,222,128,0.3)', animation: 'pulse 2s ease-in-out infinite' }} />
                        <span style={{ fontSize: 13, color: 'rgba(245,230,200,0.7)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Live Inventory</span>
                    </div>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem,4vw,3.5rem)', color: '#F5E6C8', marginBottom: 10, fontWeight: 800, textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
                        {showProducts ? 'Accessories & Food' : 'Explore Our Collection'}
                    </h1>
                    <p style={{ color: 'rgba(245,230,200,0.65)', fontSize: 16, marginBottom: 28 }}>
                        {filtered.length} {showProducts ? 'products' : 'exotic companions'} waiting for their forever home
                    </p>
                    {/* Search bar */}
                    <div style={{ position: 'relative', maxWidth: 500 }}>
                        <Search size={18} style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: '#A0614A' }} />
                        <input
                            type="text"
                            placeholder={showProducts ? 'Search products...' : 'Search by name or breed...'}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ width: '100%', padding: '15px 18px 15px 50px', borderRadius: 50, border: 'none', background: 'rgba(253,246,236,0.96)', fontSize: 15, color: '#2C1A0E', outline: 'none', boxShadow: '0 4px 30px rgba(0,0,0,0.25)', fontFamily: "'DM Sans', sans-serif" }}
                        />
                        {search && <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6B3A2A' }}><X size={16} /></button>}
                    </div>
                </div>
                <style>{`@keyframes pulse { 0%,100%{box-shadow:0 0 0 3px rgba(74,222,128,0.3)} 50%{box-shadow:0 0 0 6px rgba(74,222,128,0.1)} }`}</style>
            </div>

            {/* Species Selector Cards */}
            {!showProducts && (
                <div style={{ background: '#fff', borderBottom: '1px solid rgba(44,26,14,0.06)', padding: '16px 0' }}>
                    <div className="container mobile-horizontal-scroll" style={{ display: 'flex', gap: 10, paddingBottom: 4 }}>
                        {[
                            { key: 'all', label: 'All Pets', color: '#C97D0E', bg: 'rgba(201,125,14,0.1)' },
                            { key: 'bird', label: 'Birds & Parrots', color: '#E8A020', bg: 'rgba(232,160,32,0.1)' },
                            { key: 'cat', label: 'Exotic Cats', color: '#C97D0E', bg: 'rgba(201,125,14,0.1)' },
                            { key: 'rodent', label: 'Rodents', color: '#A0614A', bg: 'rgba(160,97,74,0.1)' },
                            { key: 'reptile', label: 'Reptiles', color: '#4A7C2E', bg: 'rgba(74,124,46,0.1)' },
                            { key: 'tortoise', label: 'Turtles & Tortoises', color: '#7A5C3A', bg: 'rgba(122,92,58,0.1)' },
                        ].map(s => {
                            const active = species === s.key;
                            return (
                                <button key={s.key} onClick={() => setSpecies(s.key)} style={{
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    padding: '10px 22px', borderRadius: 50, border: `2px solid ${active ? s.color : 'rgba(44,26,14,0.1)'}`,
                                    background: active ? s.bg : '#fff',
                                    color: active ? s.color : '#6B3A2A',
                                    fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14,
                                    cursor: 'pointer', whiteSpace: 'nowrap',
                                    transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                                    transform: active ? 'translateY(-2px)' : 'none',
                                    boxShadow: active ? `0 4px 16px ${s.color}30` : 'none',
                                    letterSpacing: '0.3px',
                                }}>
                                    {s.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="container" style={{ padding: '32px 24px' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 24, alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', background: '#fff', borderRadius: 50, padding: 4, gap: 4, boxShadow: '0 2px 10px rgba(44,26,14,0.08)', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <button onClick={() => setShowProducts(false)} style={{ padding: '8px 20px', borderRadius: 50, border: 'none', cursor: 'pointer', background: !showProducts ? 'linear-gradient(135deg,#C97D0E,#E8601A)' : 'transparent', color: !showProducts ? '#fff' : '#6B3A2A', fontWeight: 600, fontSize: 14, transition: 'all 0.25s' }}>Live Pets</button>
                        <button onClick={() => setShowProducts(true)} style={{ padding: '8px 20px', borderRadius: 50, border: 'none', cursor: 'pointer', background: showProducts ? 'linear-gradient(135deg,#C97D0E,#E8601A)' : 'transparent', color: showProducts ? '#fff' : '#6B3A2A', fontWeight: 600, fontSize: 14, transition: 'all 0.25s' }}>Accessories & Food</button>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '10px 16px', borderRadius: 12, border: '1.5px solid rgba(44,26,14,0.12)', background: '#fff', fontSize: 14, color: '#2C1A0E', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>
                            <option value="featured">Featured First</option>
                            <option value="new">Newest First</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                        </select>
                        <button onClick={() => setLayout('grid')} style={{ width: 38, height: 38, borderRadius: 10, border: 'none', cursor: 'pointer', background: layout === 'grid' ? '#2C1A0E' : '#fff', color: layout === 'grid' ? '#fff' : '#2C1A0E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Grid size={16} /></button>
                        <button onClick={() => setLayout('list')} style={{ width: 38, height: 38, borderRadius: 10, border: 'none', cursor: 'pointer', background: layout === 'list' ? '#2C1A0E' : '#fff', color: layout === 'list' ? '#fff' : '#2C1A0E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><List size={16} /></button>
                        {!showProducts && <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ padding: '8px 16px', borderRadius: 12, border: '1.5px solid rgba(44,26,14,0.12)', background: sidebarOpen ? '#2C1A0E' : '#fff', color: sidebarOpen ? '#fff' : '#2C1A0E', fontWeight: 600, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}><SlidersHorizontal size={16} /> Filters</button>}
                    </div>
                </div>

                <div className={sidebarOpen && !showProducts ? "shop-layout" : "shop-layout-full"}>
                    {/* Filters Sidebar */}
                    {sidebarOpen && !showProducts && (
                        <div style={{ background: '#fff', borderRadius: 20, padding: 24, height: 'fit-content', boxShadow: '0 4px 20px rgba(44,26,14,0.08)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: '#2C1A0E' }}>Filters</h3>
                                <button onClick={() => { setSpecies('all'); setGender('all'); setPriceRange([0, 200000]); }} style={{ fontSize: 12, color: '#C97D0E', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Clear All</button>
                            </div>
                            {/* Species */}
                            <div style={{ marginBottom: 24 }}>
                                <p style={{ fontSize: 13, fontWeight: 700, color: '#6B3A2A', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Species</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {SPECIES.map(s => (
                                        <button key={s} onClick={() => setSpecies(s)} style={{ textAlign: 'left', padding: '8px 12px', borderRadius: 10, border: 'none', cursor: 'pointer', background: species === s ? 'rgba(201,125,14,0.12)' : 'transparent', color: species === s ? '#C97D0E' : '#2C1A0E', fontWeight: species === s ? 700 : 400, fontSize: 14, transition: 'all 0.2s' }}>
                                            {s === 'bird' ? '🦜' : s === 'cat' ? '🐱' : s === 'rodent' ? '🐹' : s === 'reptile' ? '🦎' : s === 'tortoise' ? '🐢' : '🔍'} {s === 'tortoise' ? 'Turtles & Tortoises' : s.charAt(0).toUpperCase() + s.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* Gender */}
                            <div style={{ marginBottom: 24 }}>
                                <p style={{ fontSize: 13, fontWeight: 700, color: '#6B3A2A', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Gender</p>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    {['all', 'male', 'female'].map(g => (
                                        <button key={g} onClick={() => setGender(g)} style={{ padding: '8px 14px', borderRadius: 50, border: '1.5px solid', borderColor: gender === g ? '#C97D0E' : 'rgba(44,26,14,0.12)', background: gender === g ? 'rgba(201,125,14,0.1)' : '#fff', color: gender === g ? '#C97D0E' : '#6B3A2A', fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s', textTransform: 'capitalize' }}>{g}</button>
                                    ))}
                                </div>
                            </div>
                            {/* Price Range */}
                            <div>
                                <p style={{ fontSize: 13, fontWeight: 700, color: '#6B3A2A', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Price Range</p>
                                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                                    <input type="number" value={priceRange[0]} onChange={e => setPriceRange([+e.target.value, priceRange[1]])} placeholder="Min" style={{ width: '50%', padding: '8px 12px', border: '1.5px solid rgba(44,26,14,0.12)', borderRadius: 10, fontSize: 13, color: '#2C1A0E' }} />
                                    <input type="number" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])} placeholder="Max" style={{ width: '50%', padding: '8px 12px', border: '1.5px solid rgba(44,26,14,0.12)', borderRadius: 10, fontSize: 13, color: '#2C1A0E' }} />
                                </div>
                                <p style={{ fontSize: 13, color: '#A0614A' }}>₹{priceRange[0].toLocaleString('en-IN')} — ₹{priceRange[1].toLocaleString('en-IN')}</p>
                            </div>
                        </div>
                    )}

                    {/* Results */}
                    <div>
                        {filtered.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '80px 20px', color: '#6B3A2A' }}>
                                <div style={{ fontSize: 80, marginBottom: 16, animation: 'wiggle 2s ease-in-out infinite' }}>🐾</div>
                                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, marginBottom: 12, color: '#2C1A0E' }}>No exotic companions found</h3>
                                <p style={{ fontSize: 16, marginBottom: 24, color: '#6B3A2A' }}>Try adjusting your filters or search term. Our exotic family is always growing!</p>
                                <button onClick={() => { setSearch(''); setSpecies('all'); setGender('all'); setPriceRange([0, 200000]); }} style={{ padding: '12px 32px', background: 'linear-gradient(135deg, #C97D0E, #E8601A)', color: '#fff', border: 'none', borderRadius: 50, fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 4px 20px rgba(201,125,14,0.3)' }}>Clear All Filters</button>
                                <style>{`@keyframes wiggle { 0%,100%{transform:rotate(-5deg)} 50%{transform:rotate(5deg)} }`}</style>
                            </div>
                        ) : showProducts ? (
                            <div className="pet-card-grid">
                                {(filtered as typeof mockProducts).map(p => (
                                    <div key={p.id} style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 16px rgba(44,26,14,0.05), 0 1px 4px rgba(44,26,14,0.02)', transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)', cursor: 'pointer' }}
                                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(44,26,14,0.12), 0 8px 24px rgba(44,26,14,0.06)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(44,26,14,0.05), 0 1px 4px rgba(44,26,14,0.02)'; }}>
                                        <div style={{ paddingTop: '70%', position: 'relative', background: '#FDF6EC', overflow: 'hidden' }}>
                                            <img src={p.image} alt={p.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' }} onError={e => { e.currentTarget.style.display = 'none'; }} 
                                              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                                              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                            />
                                        </div>
                                        <div style={{ padding: '16px' }}>
                                            <p style={{ fontSize: 11, color: '#A0614A', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{p.category}</p>
                                            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#2C1A0E' }}>{p.name}</h3>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#C97D0E' }}>₹{p.price.toLocaleString('en-IN')}</span>
                                                <span style={{ background: 'linear-gradient(135deg,#C97D0E,#E8601A)', color: '#fff', border: 'none', padding: '7px 14px', borderRadius: 50, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>View Details</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={layout === 'grid' ? 'pet-card-grid' : ''} style={layout === 'list' ? { display: 'flex', flexDirection: 'column', gap: 20 } : {}}>
                                {(filtered as typeof mockPets).map(pet => <PetCard key={pet.id} pet={pet} layout={layout} />)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
            <ShopContent />
        </Suspense>
    );
}
