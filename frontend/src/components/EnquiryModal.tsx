'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Phone, Mail, User, MessageSquare, CheckCircle, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

interface EnquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    petId?: string;
    petName?: string;
    source?: string;
}

export default function EnquiryModal({ isOpen, onClose, petId, petName, source = 'enquiry_modal' }: EnquiryModalProps) {
    const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setSuccess(false);
            setForm({ name: '', phone: '', email: '', message: petName ? `Hi, I'm interested in ${petName}.` : '' });
        }
    }, [isOpen, petName]);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim() || (!form.phone.trim() && !form.email.trim())) {
            toast.error('Please provide your name and at least a phone or email.');
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
                    message: form.message.trim() || (petName ? `Enquiry about ${petName}` : 'General enquiry from website'),
                    source,
                    petId: petId || null,
                    pageUrl: typeof window !== 'undefined' ? window.location.href : null,
                }),
            });
            if (!res.ok) throw new Error('Failed');
            setSuccess(true);
            toast.success("Enquiry sent! We'll reach out shortly.");
        } catch {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const inputBase: React.CSSProperties = {
        width: '100%', padding: '13px 16px 13px 44px', border: '1.5px solid rgba(44,26,14,0.12)',
        borderRadius: 14, background: '#FDF6EC', color: '#2C1A0E', fontSize: 15,
        transition: 'all 0.3s ease', outline: 'none', fontFamily: "'DM Sans', sans-serif",
    };

    const iconWrap: React.CSSProperties = {
        position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
        color: '#C97D0E', pointerEvents: 'none', display: 'flex',
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={onClose}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 9999,
                        background: 'rgba(20,10,5,0.65)', backdropFilter: 'blur(8px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: 20,
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 30 }}
                        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
                        onClick={e => e.stopPropagation()}
                        style={{
                            background: '#fff', borderRadius: 28, padding: '36px 32px 32px',
                            maxWidth: 440, width: '100%', position: 'relative',
                            boxShadow: '0 25px 80px rgba(44,26,14,0.25), 0 0 0 1px rgba(44,26,14,0.06)',
                        }}
                    >
                        {/* Close button */}
                        <button onClick={onClose} aria-label="Close" style={{
                            position: 'absolute', top: 16, right: 16, width: 36, height: 36,
                            borderRadius: '50%', border: 'none', background: 'rgba(44,26,14,0.06)',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#6B3A2A', transition: 'all 0.2s',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(44,26,14,0.12)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(44,26,14,0.06)'; }}
                        >
                            <X size={18} />
                        </button>

                        {success ? (
                            /* ─── Success State ─── */
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{ textAlign: 'center', padding: '20px 0' }}
                            >
                                <div style={{
                                    width: 72, height: 72, borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #25D366, #128C7E)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 20px', boxShadow: '0 8px 30px rgba(37,211,102,0.3)',
                                }}>
                                    <CheckCircle size={36} color="#fff" />
                                </div>
                                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#2C1A0E', marginBottom: 8 }}>
                                    Enquiry Sent!
                                </h3>
                                <p style={{ color: '#6B3A2A', fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
                                    Thank you for your interest! Our team will reach out to you within 24 hours.
                                </p>
                                <button onClick={onClose} style={{
                                    background: 'linear-gradient(135deg, #C97D0E, #A85C0A)', color: '#fff',
                                    padding: '13px 36px', borderRadius: 50, border: 'none', fontWeight: 700,
                                    fontSize: 15, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                                }}>
                                    Done
                                </button>
                            </motion.div>
                        ) : (
                            /* ─── Form State ─── */
                            <>
                                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                                    <div style={{
                                        width: 52, height: 52, borderRadius: '50%',
                                        background: 'rgba(201,125,14,0.1)', display: 'flex',
                                        alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 14px',
                                    }}>
                                        <Sparkles size={24} color="#C97D0E" />
                                    </div>
                                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#2C1A0E', marginBottom: 4 }}>
                                        {petName ? `Enquire About ${petName}` : 'Quick Enquiry'}
                                    </h3>
                                    <p style={{ color: '#6B3A2A', fontSize: 14 }}>
                                        Fill in your details and we'll get back to you shortly!
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                    {/* Name */}
                                    <div style={{ position: 'relative' }}>
                                        <span style={iconWrap}><User size={18} /></span>
                                        <input type="text" required placeholder="Your Name *"
                                            value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                                            style={inputBase}
                                            onFocus={e => e.target.style.borderColor = '#C97D0E'}
                                            onBlur={e => e.target.style.borderColor = 'rgba(44,26,14,0.12)'}
                                        />
                                    </div>
                                    {/* Phone */}
                                    <div style={{ position: 'relative' }}>
                                        <span style={iconWrap}><Phone size={18} /></span>
                                        <input type="tel" placeholder="Phone Number"
                                            value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                                            style={inputBase}
                                            onFocus={e => e.target.style.borderColor = '#C97D0E'}
                                            onBlur={e => e.target.style.borderColor = 'rgba(44,26,14,0.12)'}
                                        />
                                    </div>
                                    {/* Email */}
                                    <div style={{ position: 'relative' }}>
                                        <span style={iconWrap}><Mail size={18} /></span>
                                        <input type="email" placeholder="Email Address"
                                            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                                            style={inputBase}
                                            onFocus={e => e.target.style.borderColor = '#C97D0E'}
                                            onBlur={e => e.target.style.borderColor = 'rgba(44,26,14,0.12)'}
                                        />
                                    </div>
                                    {/* Message */}
                                    <div style={{ position: 'relative' }}>
                                        <span style={{ ...iconWrap, top: 18, transform: 'none' }}><MessageSquare size={18} /></span>
                                        <textarea rows={3} placeholder="Your message (optional)"
                                            value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                                            style={{ ...inputBase, resize: 'vertical', paddingTop: 14 }}
                                            onFocus={e => e.target.style.borderColor = '#C97D0E'}
                                            onBlur={e => e.target.style.borderColor = 'rgba(44,26,14,0.12)'}
                                        />
                                    </div>
                                    <p style={{ fontSize: 12, color: '#A0614A', textAlign: 'center' }}>
                                        * Phone or email is required so we can reach you
                                    </p>
                                    <button type="submit" disabled={loading} style={{
                                        background: 'linear-gradient(135deg, #C97D0E, #A85C0A)', color: '#fff',
                                        padding: '14px 24px', borderRadius: 50, border: 'none', fontWeight: 700,
                                        fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex',
                                        alignItems: 'center', justifyContent: 'center', gap: 8,
                                        opacity: loading ? 0.7 : 1, transition: 'all 0.3s',
                                        fontFamily: "'DM Sans', sans-serif",
                                        boxShadow: '0 4px 20px rgba(201,125,14,0.35)',
                                    }}>
                                        {loading ? 'Sending...' : <><Send size={16} /> Send Enquiry</>}
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
