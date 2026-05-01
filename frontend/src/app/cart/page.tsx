'use client';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import toast from 'react-hot-toast';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useStore();
    const total = getCartTotal();

    return (
        <div style={{ minHeight: '100vh', background: '#FDF6EC', paddingTop: 80 }}>
            <div style={{ background: 'linear-gradient(135deg, #2C1A0E, #6B3A2A)', padding: '60px 0 48px' }}>
                <div className="container">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <ShoppingCart size={32} style={{ color: '#C97D0E' }} />
                        <div>
                            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,4vw,2.8rem)', color: '#F5E6C8', fontWeight: 800 }}>Shopping Cart</h1>
                            <p style={{ color: 'rgba(245,230,200,0.7)' }}>{cart.length} items</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '40px 24px' }}>
                {cart.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px 0' }}>
                        <ShoppingCart size={80} style={{ color: 'rgba(201,125,14,0.2)', margin: '0 auto 24px' }} />
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#2C1A0E', marginBottom: 12 }}>Your cart is empty</h2>
                        <p style={{ color: '#6B3A2A', marginBottom: 32 }}>Add some pets or accessories to get started!</p>
                        <Link href="/shop" className="btn-primary">Shop Now <ArrowRight size={16} /></Link>
                    </div>
                ) : (
                    <div className="checkout-grid">
                        {/* Cart items */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {cart.map((item) => (
                                <div key={item.id} style={{ display: 'flex', gap: 20, background: '#fff', borderRadius: 20, padding: 20, boxShadow: '0 2px 12px rgba(44,26,14,0.07)', alignItems: 'center' }}>
                                    <div style={{ width: 100, height: 100, borderRadius: 14, overflow: 'hidden', background: '#F5E6C8', flexShrink: 0 }}>
                                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.currentTarget.style.display = 'none'} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontSize: 11, color: '#A0614A', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{item.type}</p>
                                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#2C1A0E' }}>{item.name}</h3>
                                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#C97D0E' }}>₹{item.price.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', background: '#F5E6C8', borderRadius: 12, overflow: 'hidden' }}>
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: 36, height: 36, border: 'none', background: 'none', cursor: 'pointer', fontSize: 16, color: '#2C1A0E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={14} /></button>
                                            <span style={{ width: 32, textAlign: 'center', fontWeight: 700, color: '#2C1A0E' }}>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: 36, height: 36, border: 'none', background: 'none', cursor: 'pointer', fontSize: 16, color: '#2C1A0E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={14} /></button>
                                        </div>
                                        <button onClick={() => { removeFromCart(item.id); toast('Item removed', { icon: '🗑️' }); }} style={{ width: 36, height: 36, borderRadius: 10, border: 'none', background: 'rgba(232,96,26,0.1)', color: '#E8601A', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Trash2 size={16} /></button>
                                    </div>
                                </div>
                            ))}
                            <button onClick={() => { clearCart(); toast('Cart cleared', { icon: '🗑️' }); }} style={{ alignSelf: 'flex-end', background: 'none', border: '1.5px solid rgba(44,26,14,0.2)', borderRadius: 12, padding: '10px 20px', color: '#6B3A2A', fontSize: 14, cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s' }}>Clear Cart</button>
                        </div>

                        {/* Order Summary */}
                        <div style={{ background: '#fff', borderRadius: 24, padding: 28, boxShadow: '0 4px 24px rgba(44,26,14,0.1)', height: 'fit-content', position: 'sticky', top: 100 }}>
                            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#2C1A0E', marginBottom: 24 }}>Order Summary</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
                                {cart.map((item) => (
                                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#6B3A2A' }}>
                                        <span>{item.name} × {item.quantity}</span>
                                        <span style={{ fontWeight: 600, color: '#2C1A0E' }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                    </div>
                                ))}
                                <div style={{ height: 1, background: 'rgba(44,26,14,0.08)' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#6B3A2A' }}>
                                    <span>Delivery</span>
                                    <span style={{ color: '#4A7C2E', fontWeight: 600 }}>Calculated at checkout</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#2C1A0E' }}>
                                    <span>Total</span>
                                    <span style={{ color: '#C97D0E' }}>₹{total.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                            <Link href="/checkout" className="btn-primary" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                                Proceed to Checkout <ArrowRight size={16} />
                            </Link>
                            <Link href="/shop" style={{ display: 'block', textAlign: 'center', marginTop: 14, fontSize: 14, color: '#6B3A2A', textDecoration: 'none', fontWeight: 500 }}>← Continue Shopping</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
