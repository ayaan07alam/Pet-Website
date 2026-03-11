'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Send, Phone, Mail, User, CheckCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

const POPUP_DELAY_MS = 15000;
const STORAGE_KEY = 'rumzee_popup_dismissed';

export default function LeadCapturePopup() {
    const pathname = usePathname();
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({ name: '', phone: '', email: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const isHiddenRoute = pathname.startsWith('/admin') || pathname === '/login' || pathname === '/register';

    const dismiss = useCallback(() => {
        setShow(false);
        try { localStorage.setItem(STORAGE_KEY, Date.now().toString()); } catch { /* noop */ }
    }, []);

    useEffect(() => {
        if (isHiddenRoute) return;

        // Don't show if dismissed recently (within 7 days) via localStorage
        try {
            const dismissed = localStorage.getItem(STORAGE_KEY);
            if (dismissed && Date.now() - Number(dismissed) < 7 * 24 * 60 * 60 * 1000) return;
        } catch { /* noop */ }

        // Don't show more than once per browsing session
        try {
            const shownThisSession = sessionStorage.getItem('rumzee_popup_shown');
            if (shownThisSession === 'true') return;
        } catch { /* noop */ }

        const showPopupAndMarkSession = () => {
            setShow(true);
            try { sessionStorage.setItem('rumzee_popup_shown', 'true'); } catch { /* noop */ }
        };

        // Timer-based trigger
        const timer = setTimeout(() => showPopupAndMarkSession(), POPUP_DELAY_MS);

        // Exit-intent trigger (desktop only)
        const handleMouseLeave = (e: MouseEvent) => {
            // Check if mouse left from the top of the viewport
            if (e.clientY <= 0) {
                showPopupAndMarkSession();
            }
        };
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isHiddenRoute]);

    // Lock body scroll
    useEffect(() => {
        if (show) { document.body.style.overflow = 'hidden'; }
        else { document.body.style.overflow = ''; }
        return () => { document.body.style.overflow = ''; };
    }, [show]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim() || (!form.phone.trim() && !form.email.trim())) {
            toast.error('Please provide your name and phone or email.');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name.trim(),
                    phone: form.phone.trim() || null,
                    email: form.email.trim() || null,
                    message: 'Lead captured via popup offer',
                    source: 'popup_offer',
                    pageUrl: typeof window !== 'undefined' ? window.location.href : null,
                }),
            });
            if (!res.ok) throw new Error('Failed');
            setSuccess(true);
            toast.success('Welcome to the Rumzee\'s family! 🐾');
            try { localStorage.setItem(STORAGE_KEY, Date.now().toString()); } catch { /* noop */ }
        } catch {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (isHiddenRoute) return null;

    const inputStyle: React.CSSProperties = {
        width: '100%', padding: '12px 16px 12px 42px',
        border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 14,
        background: 'rgba(255,255,255,0.08)', color: '#F5E6C8', fontSize: 15,
        outline: 'none', transition: 'all 0.3s', fontFamily: "'DM Sans', sans-serif",
    };

    const iconPos: React.CSSProperties = {
        position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
        color: '#C97D0E', pointerEvents: 'none', display: 'flex',
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="custom-cursor-disabled"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={dismiss}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 10000,
                        background: 'rgba(10,5,2,0.75)', backdropFilter: 'blur(12px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.88, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.88, y: 40 }}
                        transition={{ type: 'spring', damping: 24, stiffness: 280 }}
                        onClick={e => e.stopPropagation()}
                        style={{
                            background: 'linear-gradient(145deg, #2C1A0E 0%, #1A0E06 100%)',
                            borderRadius: 28, padding: '40px 32px 32px', maxWidth: 420, width: '100%',
                            position: 'relative', overflow: 'hidden', cursor: 'auto',
                            boxShadow: '0 30px 90px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,125,14,0.2)',
                        }}
                    >
                        {/* Decorative circles */}
                        <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(201,125,14,0.08)', pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(201,125,14,0.05)', pointerEvents: 'none' }} />

                        {/* Close */}
                        <button onClick={dismiss} aria-label="Close" style={{
                            position: 'absolute', top: 14, right: 14, width: 34, height: 34,
                            borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.08)',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'rgba(245,230,200,0.6)', transition: 'all 0.2s', zIndex: 2,
                        }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                        >
                            <X size={16} />
                        </button>

                        {success ? (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '16px 0', position: 'relative', zIndex: 1 }}>
                                <div style={{ width: 68, height: 68, borderRadius: '50%', background: 'linear-gradient(135deg, #25D366, #128C7E)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', boxShadow: '0 8px 30px rgba(37,211,102,0.3)' }}>
                                    <CheckCircle size={34} color="#fff" />
                                </div>
                                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#F5E6C8', marginBottom: 8 }}>You&apos;re In!</h3>
                                <p style={{ color: 'rgba(245,230,200,0.7)', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                                    We&apos;ll keep you updated on the coolest exotic pets and exclusive offers!
                                </p>
                                <button onClick={dismiss} style={{
                                    background: 'linear-gradient(135deg, #C97D0E, #A85C0A)', color: '#fff',
                                    padding: '12px 32px', borderRadius: 50, border: 'none', fontWeight: 700,
                                    fontSize: 14, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                                }}>
                                    Continue Browsing
                                </button>
                            </motion.div>
                        ) : (
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{ textAlign: 'center', marginBottom: 22 }}>
                                    <div style={{
                                        width: 56, height: 56, borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #C97D0E, #E8A020)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 14px',
                                        boxShadow: '0 8px 30px rgba(201,125,14,0.4)',
                                    }}>
                                        <Gift size={26} color="#fff" />
                                    </div>
                                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#F5E6C8', marginBottom: 6 }}>
                                        Don&apos;t Miss Out!
                                    </h3>
                                    <p style={{ color: 'rgba(245,230,200,0.65)', fontSize: 14, lineHeight: 1.5 }}>
                                        Get exclusive updates on new arrivals, rare exotic pets & special offers directly.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <div style={{ position: 'relative' }}>
                                        <span style={iconPos}><User size={17} /></span>
                                        <input type="text" required placeholder="Your Name *"
                                            value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                                            style={inputStyle}
                                            onFocus={e => e.target.style.borderColor = 'rgba(201,125,14,0.5)'}
                                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                                        />
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <span style={iconPos}><Phone size={17} /></span>
                                        <input type="tel" placeholder="Phone Number"
                                            value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                                            style={inputStyle}
                                            onFocus={e => e.target.style.borderColor = 'rgba(201,125,14,0.5)'}
                                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                                        />
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <span style={iconPos}><Mail size={17} /></span>
                                        <input type="email" placeholder="Email Address"
                                            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                                            style={inputStyle}
                                            onFocus={e => e.target.style.borderColor = 'rgba(201,125,14,0.5)'}
                                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                                        />
                                    </div>
                                    <p style={{ fontSize: 11, color: 'rgba(245,230,200,0.45)', textAlign: 'center', margin: 0 }}>
                                        * Phone or email required
                                    </p>
                                    <button type="submit" disabled={loading} style={{
                                        background: 'linear-gradient(135deg, #C97D0E, #E8A020)', color: '#fff',
                                        padding: '13px 24px', borderRadius: 50, border: 'none', fontWeight: 700,
                                        fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                        opacity: loading ? 0.7 : 1, transition: 'all 0.3s',
                                        fontFamily: "'DM Sans', sans-serif",
                                        boxShadow: '0 4px 24px rgba(201,125,14,0.4)',
                                    }}>
                                        {loading ? 'Sending...' : <><Send size={16} /> Get Updates</>}
                                    </button>
                                </form>
                                <p style={{ fontSize: 11, color: 'rgba(245,230,200,0.35)', textAlign: 'center', marginTop: 12 }}>
                                    No spam, ever. Only exotic pet goodness 🐾
                                </p>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
