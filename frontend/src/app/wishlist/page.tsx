'use client';
import { Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import toast from 'react-hot-toast';

export default function WishlistPage() {
    const { wishlist, removeFromWishlist, addToCart } = useStore();

    const moveToCart = (item: typeof wishlist[0]) => {
        addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, type: item.type, quantity: 1 });
        removeFromWishlist(item.id);
        toast.success(`Moved to cart! 🛒`);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#FDF6EC', paddingTop: 80 }}>
            <div style={{ background: 'linear-gradient(135deg, #2C1A0E, #6B3A2A)', padding: '60px 0 48px' }}>
                <div className="container">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <Heart size={32} style={{ color: '#C97D0E' }} />
                        <div>
                            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,4vw,2.8rem)', color: '#F5E6C8', fontWeight: 800 }}>My Wishlist</h1>
                            <p style={{ color: 'rgba(245,230,200,0.7)' }}>{wishlist.length} saved items</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container" style={{ padding: '40px 24px' }}>
                {wishlist.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px 0' }}>
                        <Heart size={80} style={{ color: 'rgba(201,125,14,0.2)', margin: '0 auto 24px' }} />
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#2C1A0E', marginBottom: 12 }}>Your wishlist is empty</h2>
                        <p style={{ color: '#6B3A2A', marginBottom: 32 }}>Save pets you love to come back to them later!</p>
                        <Link href="/shop" className="btn-primary">Browse Pets <ArrowRight size={16} /></Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
                        {wishlist.map((item) => (
                            <div key={item.id} style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 12px rgba(44,26,14,0.08)', transition: 'all 0.3s ease' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(44,26,14,0.12)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(44,26,14,0.08)'; }}>
                                <div style={{ height: 200, background: '#F5E6C8', overflow: 'hidden', position: 'relative' }}>
                                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.currentTarget.style.display = 'none'} />
                                    <button onClick={() => { removeFromWishlist(item.id); toast('Removed from wishlist', { icon: '💔' }); }} style={{ position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: '50%', background: 'rgba(253,246,236,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E8601A' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div style={{ padding: 20 }}>
                                    {item.breed && <p style={{ fontSize: 12, color: '#A0614A', marginBottom: 4 }}>{item.breed}</p>}
                                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#2C1A0E', marginBottom: 12 }}>{item.name}</h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: '#C97D0E' }}>₹{item.price.toLocaleString('en-IN')}</span>
                                        <button onClick={() => moveToCart(item)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'linear-gradient(135deg,#C97D0E,#E8601A)', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 50, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                                            <ShoppingCart size={14} /> Move to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
