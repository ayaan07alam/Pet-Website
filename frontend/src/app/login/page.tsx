'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { loginAction } from './actions';

export default function LoginPage() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPwd, setShowPwd] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('email', form.email);
            formData.append('password', form.password);

            const result = await loginAction(formData);

            if (result.error) throw new Error(result.error);

            toast.success('Access Granted 🐾');
            router.push('/admin');
            router.refresh(); // Refresh router to clear middleware cache
        } catch (error: any) {
            toast.error(error.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = { width: '100%', padding: '14px 16px 14px 46px', border: '1.5px solid rgba(44,26,14,0.12)', borderRadius: 12, background: '#FDF6EC', color: '#2C1A0E', fontSize: 15, outline: 'none', transition: 'all 0.25s' };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #FDF6EC, #F5E6C8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 40px' }}>
            <div style={{ width: '100%', maxWidth: 440 }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{ width: 88, height: 88, background: '#2C1A0E', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 28px rgba(44,26,14,0.18)', border: '2px solid #C97D0E' }}>
                        <ShieldCheck size={40} color="#C97D0E" strokeWidth={1.5} />
                    </div>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: '#2C1A0E', marginBottom: 6 }}>Admin Portal</h1>
                    <p style={{ color: '#6B3A2A', fontSize: 15 }}>Secure access for Rumzee&apos;s Exotic management</p>
                </div>

                <div style={{ background: '#fff', borderRadius: 24, padding: 36, boxShadow: '0 8px 40px rgba(44,26,14,0.1)' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                        <div>
                            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#6B3A2A', marginBottom: 6 }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#A0614A' }} />
                                <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" style={inputStyle} onFocus={e => e.target.style.borderColor = '#C97D0E'} onBlur={e => e.target.style.borderColor = 'rgba(44,26,14,0.12)'} />
                            </div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                <label style={{ fontSize: 13, fontWeight: 600, color: '#6B3A2A' }}>Password</label>
                                <Link href="/forgot-password" style={{ fontSize: 13, color: '#C97D0E', textDecoration: 'none', fontWeight: 500 }}>Forgot password?</Link>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#A0614A' }} />
                                <input type={showPwd ? 'text' : 'password'} required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" style={{ ...inputStyle, paddingRight: 46 }} onFocus={e => e.target.style.borderColor = '#C97D0E'} onBlur={e => e.target.style.borderColor = 'rgba(44,26,14,0.12)'} />
                                <button type="button" onClick={() => setShowPwd(!showPwd)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#A0614A' }}>
                                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>
                        <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: 'center', marginTop: 4, opacity: loading ? 0.75 : 1 }}>
                            {loading ? 'Signing in...' : <><ArrowRight size={16} /> Sign In</>}
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(44,26,14,0.08)', fontSize: 13, color: '#6B3A2A' }}>
                        This is a restricted portal. <br />
                        <Link href="/" style={{ color: '#C97D0E', fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginTop: 8 }}>← Return to Public Site</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
