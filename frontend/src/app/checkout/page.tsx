'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { ArrowLeft, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const { cart, getCartTotal, clearCart } = useStore();
    const total = getCartTotal();
    const router = useRouter();
    const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '', payment: 'cod' });
    const [loading, setLoading] = useState(false);
    const [placed, setPlaced] = useState(false);

    const handleOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(r => setTimeout(r, 1500));
        setPlaced(true);
        clearCart();
        setLoading(false);
    };

    const inputStyle = { width: '100%', padding: '12px 14px', border: '1.5px solid rgba(44,26,14,0.12)', borderRadius: 10, background: '#FDF6EC', color: '#2C1A0E', fontSize: 14, outline: 'none' };

    if (placed) return (
        <div style={{ minHeight: '100vh', background: '#FDF6EC', paddingTop: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', padding: 48 }}>
                <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'rgba(74,124,46,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#4A7C2E' }}><Check size={48} /></div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: '#2C1A0E', marginBottom: 12 }}>Order Placed! 🐾</h1>
                <p style={{ color: '#6B3A2A', fontSize: 16, marginBottom: 32, maxWidth: 480 }}>Thank you for your order! We&apos;ll contact you within 24 hours to confirm delivery details. Our team will ensure your exotic pet arrives safely.</p>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                    <Link href="/" className="btn-primary">Go Home</Link>
                    <Link href="/shop" className="btn-secondary">Shop More</Link>
                </div>
            </div>
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', background: '#FDF6EC', paddingTop: 80 }}>
            <div style={{ background: 'linear-gradient(135deg, #2C1A0E, #6B3A2A)', padding: '48px 0 36px' }}>
                <div className="container">
                    <Link href="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(245,230,200,0.7)', fontSize: 14, marginBottom: 16, textDecoration: 'none' }}><ArrowLeft size={16} /> Back to Cart</Link>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,4vw,2.8rem)', color: '#F5E6C8', fontWeight: 800 }}>Checkout</h1>
                </div>
            </div>
            <div className="container" style={{ padding: '40px 24px' }}>
                <div className="checkout-grid">
                    <form onSubmit={handleOrder} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {/* Delivery Info */}
                        <div style={{ background: '#fff', borderRadius: 20, padding: 28, boxShadow: '0 2px 12px rgba(44,26,14,0.07)' }}>
                            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: '#2C1A0E', marginBottom: 20 }}>Delivery Information</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                <div className="grid-2">
                                    <input required placeholder="Full Name*" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} onFocus={e => e.target.style.borderColor = '#C97D0E'} onBlur={e => e.target.style.borderColor = 'rgba(44,26,14,0.12)'} />
                                    <input type="tel" required placeholder="Phone*" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle} onFocus={e => e.target.style.borderColor = '#C97D0E'} onBlur={e => e.target.style.borderColor = 'rgba(44,26,14,0.12)'} />
                                </div>
                                <input type="email" required placeholder="Email*" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} onFocus={e => e.target.style.borderColor = '#C97D0E'} onBlur={e => e.target.style.borderColor = 'rgba(44,26,14,0.12)'} />
                                <textarea required placeholder="Full Address*" rows={3} value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} onFocus={e => e.target.style.borderColor = '#C97D0E'} onBlur={e => e.target.style.borderColor = 'rgba(44,26,14,0.12)'} />
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 12 }}>
                                    <input required placeholder="City*" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} style={inputStyle} onFocus={e => e.target.style.borderColor = '#C97D0E'} onBlur={e => e.target.style.borderColor = 'rgba(44,26,14,0.12)'} />
                                    <input required placeholder="State*" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} style={inputStyle} onFocus={e => e.target.style.borderColor = '#C97D0E'} onBlur={e => e.target.style.borderColor = 'rgba(44,26,14,0.12)'} />
                                    <input required placeholder="Pincode*" maxLength={6} value={form.pincode} onChange={e => setForm({ ...form, pincode: e.target.value })} style={inputStyle} onFocus={e => e.target.style.borderColor = '#C97D0E'} onBlur={e => e.target.style.borderColor = 'rgba(44,26,14,0.12)'} />
                                </div>
                            </div>
                        </div>
                        {/* Payment Method */}
                        <div style={{ background: '#fff', borderRadius: 20, padding: 28, boxShadow: '0 2px 12px rgba(44,26,14,0.07)' }}>
                            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: '#2C1A0E', marginBottom: 20 }}>Payment Method</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {[
                                    { value: 'cod', label: '💵 Cash on Delivery', desc: 'Pay when your pet arrives' },
                                    { value: 'upi', label: '📱 UPI Payment', desc: 'GPay, PhonePe, Paytm' },
                                    { value: 'bank', label: '🏦 Bank Transfer', desc: 'Direct bank transfer' },
                                ].map(p => (
                                    <label key={p.value} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderRadius: 12, border: `1.5px solid ${form.payment === p.value ? '#C97D0E' : 'rgba(44,26,14,0.12)'}`, background: form.payment === p.value ? 'rgba(201,125,14,0.06)' : '#fff', cursor: 'pointer', transition: 'all 0.2s' }}>
                                        <input type="radio" name="payment" value={p.value} checked={form.payment === p.value} onChange={e => setForm({ ...form, payment: e.target.value })} style={{ accentColor: '#C97D0E', width: 18, height: 18 }} />
                                        <div>
                                            <p style={{ fontWeight: 600, fontSize: 15, color: '#2C1A0E' }}>{p.label}</p>
                                            <p style={{ fontSize: 12, color: '#6B3A2A' }}>{p.desc}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <button type="submit" disabled={loading || cart.length === 0} className="btn-primary" style={{ justifyContent: 'center', fontSize: 16, padding: '16px', opacity: loading || cart.length === 0 ? 0.75 : 1 }}>
                            {loading ? 'Placing Order...' : `Place Order — ₹${total.toLocaleString('en-IN')}`}
                        </button>
                    </form>

                    {/* Summary */}
                    <div style={{ background: '#fff', borderRadius: 20, padding: 28, boxShadow: '0 4px 24px rgba(44,26,14,0.1)', height: 'fit-content', position: 'sticky', top: 100 }}>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: '#2C1A0E', marginBottom: 20 }}>Order Summary</h2>
                        {cart.length === 0 ? <p style={{ color: '#A0614A', textAlign: 'center', padding: '20px 0' }}>Your cart is empty</p> : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {cart.map(item => (
                                    <div key={item.id} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                        <div style={{ width: 52, height: 52, borderRadius: 10, background: '#F5E6C8', overflow: 'hidden', flexShrink: 0 }}><img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.currentTarget.style.display = 'none'} /></div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: 14, fontWeight: 600, color: '#2C1A0E' }}>{item.name}</p>
                                            <p style={{ fontSize: 12, color: '#A0614A' }}>× {item.quantity}</p>
                                        </div>
                                        <span style={{ fontWeight: 700, color: '#C97D0E', fontSize: 14 }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                    </div>
                                ))}
                                <div style={{ height: 1, background: 'rgba(44,26,14,0.08)', margin: '8px 0' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: '#2C1A0E' }}>
                                    <span>Total</span><span style={{ color: '#C97D0E' }}>₹{total.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
