'use client';
import { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
    const [showPwd, setShowPwd] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.password !== form.confirm) { toast.error('Passwords do not match'); return; }
        setLoading(true);
        await new Promise(r => setTimeout(r, 1200));
        toast.success('Account created! Welcome to Rumzee\'s Exotic 🐾');
        router.push('/dashboard');
        setLoading(false);
    };

    const inputStyle = (pl = 46) => ({ width: '100%', padding: `14px 16px 14px ${pl}px`, border: '1.5px solid rgba(44,26,14,0.12)', borderRadius: 12, background: '#FDF6EC', color: '#2C1A0E', fontSize: 15, outline: 'none', transition: 'all 0.25s' });

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #FDF6EC, #F5E6C8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 40px' }}>
            <div style={{ width: '100%', maxWidth: 480 }}>
                <div style={{ textAlign: 'center', marginBottom: 36 }}>
                    <img src="/logo.png" alt="Rumzee's Exotic" style={{ width: 88, height: 88, objectFit: 'contain', mixBlendMode: 'multiply', filter: 'contrast(1.1) drop-shadow(0 4px 12px rgba(201,125,14,0.3))', borderRadius: '50%', margin: '0 auto 16px', display: 'block', boxShadow: '0 8px 28px rgba(44,26,14,0.18)' }} />
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: '#2C1A0E', marginBottom: 6 }}>Create Account</h1>
                    <p style={{ color: '#6B3A2A', fontSize: 15 }}>Join the Rumzee&apos;s Exotic family 🐾</p>
                </div>
                <div style={{ background: '#fff', borderRadius: 24, padding: 36, boxShadow: '0 8px 40px rgba(44,26,14,0.1)' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {[
                            { label: 'Full Name', icon: <User size={16} />, key: 'name', type: 'text', placeholder: 'John Doe' },
                            { label: 'Email Address', icon: <Mail size={16} />, key: 'email', type: 'email', placeholder: 'you@example.com' },
                            { label: 'Phone Number', icon: <Phone size={16} />, key: 'phone', type: 'tel', placeholder: '+91 8197398357' },
                        ].map(f => (
                            <div key={f.key}>
                                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#6B3A2A', marginBottom: 6 }}>{f.label}</label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#A0614A' }}>{f.icon}</span>
                                    <input type={f.type} required value={form[f.key as keyof typeof form]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} style={inputStyle()} onFocus={e => e.target.style.borderColor = '#C97D0E'} onBlur={e => e.target.style.borderColor = 'rgba(44,26,14,0.12)'} />
                                </div>
                            </div>
                        ))}
                        {['password', 'confirm'].map(k => (
                            <div key={k}>
                                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#6B3A2A', marginBottom: 6 }}>{k === 'password' ? 'Password' : 'Confirm Password'}</label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#A0614A' }} />
                                    <input type={showPwd ? 'text' : 'password'} required value={form[k as keyof typeof form]} onChange={e => setForm({ ...form, [k]: e.target.value })} placeholder="••••••••" style={{ ...inputStyle(), paddingRight: 46 }} onFocus={e => e.target.style.borderColor = '#C97D0E'} onBlur={e => e.target.style.borderColor = 'rgba(44,26,14,0.12)'} />
                                    {k === 'password' && <button type="button" onClick={() => setShowPwd(!showPwd)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#A0614A' }}>{showPwd ? <EyeOff size={16} /> : <Eye size={16} />}</button>}
                                </div>
                            </div>
                        ))}
                        <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: 'center', marginTop: 4, opacity: loading ? 0.75 : 1 }}>
                            {loading ? 'Creating account...' : <><ArrowRight size={16} /> Create Account</>}
                        </button>
                    </form>
                    <div style={{ textAlign: 'center', marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(44,26,14,0.08)', fontSize: 14, color: '#6B3A2A' }}>
                        Already have an account? <Link href="/login" style={{ color: '#C97D0E', fontWeight: 700, textDecoration: 'none' }}>Sign in →</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
