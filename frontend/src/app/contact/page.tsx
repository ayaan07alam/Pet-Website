'use client';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        fetch('/api/settings').then(r => r.json()).then(setSettings).catch(console.error);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(r => setTimeout(r, 1200));
        toast.success('Message sent! We\'ll get back to you within 24 hours. 🐾');
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
        setLoading(false);
    };

    const inputStyle = { width: '100%', padding: '13px 16px', border: '1.5px solid rgba(44,26,14,0.12)', borderRadius: 12, background: '#FDF6EC', color: '#2C1A0E', fontSize: 15, transition: 'all 0.25s', outline: 'none' };

    const cleanWhatsapp = settings?.whatsappNumber?.replace(/[^\d+]/g, '') || '9876543210';
    const displayWhatsapp = cleanWhatsapp.startsWith('+91') || cleanWhatsapp.startsWith('91') && cleanWhatsapp.length === 12
        ? `+${cleanWhatsapp.replace(/^\+/, '')}`
        : `+91 ${cleanWhatsapp}`;
    const waLink = `https://wa.me/${cleanWhatsapp.replace(/^\+/, '')}`;

    let mapEmbed = settings?.embeddedMapUrl || '';
    if (mapEmbed.includes('<iframe')) {
        const match = mapEmbed.match(/src="([^"]+)"/);
        if (match) mapEmbed = match[1];
    }

    return (
        <div style={{ minHeight: '100vh', background: '#FDF6EC', paddingTop: 80 }}>
            {/* Header */}
            <section style={{ background: 'linear-gradient(135deg, #2C1A0E, #6B3A2A)', padding: '70px 0 56px' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div className="section-label" style={{ justifyContent: 'center', color: '#C97D0E' }}>Get in Touch</div>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,4vw,3rem)', color: '#F5E6C8', fontWeight: 800, marginBottom: 12 }}>Contact Us</h1>
                    <p style={{ color: 'rgba(245,230,200,0.75)', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
                        Have a question about a pet, booking a service, or just want to say hello? We&apos;re always happy to hear from you!
                    </p>
                </div>
            </section>

            <div className="container" style={{ padding: '64px 24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 56, alignItems: 'start' }}>
                    {/* Info */}
                    <div>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: '#2C1A0E', marginBottom: 28 }}>Visit or Reach Us</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
                            {[
                                { icon: <MapPin size={22} />, title: 'Location', value: settings?.address || 'Click to open in Google Maps', href: mapEmbed || 'https://maps.app.goo.gl/A8DbhV3wFJpyLnS37', target: '_blank' },
                                { icon: <Phone size={22} />, title: 'Phone', value: displayWhatsapp, href: `tel:${cleanWhatsapp}` },
                                { icon: <Mail size={22} />, title: 'Email', value: settings?.emailAddress || 'info@rumzeesexotic.com', href: `mailto:${settings?.emailAddress || 'info@rumzeesexotic.com'}` },
                            ].map(c => (
                                <a key={c.title} href={c.href} target={c.target} rel={c.target ? 'noopener noreferrer' : undefined} style={{ display: 'flex', gap: 16, padding: '18px 20px', background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(44,26,14,0.07)', textDecoration: 'none', color: '#2C1A0E', transition: 'all 0.25s ease' }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(44,26,14,0.12)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(44,26,14,0.07)'; }}>
                                    <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(201,125,14,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C97D0E', flexShrink: 0 }}>{c.icon}</div>
                                    <div><p style={{ fontSize: 12, fontWeight: 700, color: '#A0614A', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>{c.title}</p><p style={{ fontSize: 15, fontWeight: 500 }}>{c.value}</p></div>
                                </a>
                            ))}
                        </div>

                        <div style={{ padding: '20px 24px', background: '#fff', borderRadius: 16, marginBottom: 24, boxShadow: '0 2px 12px rgba(44,26,14,0.07)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                                <Clock size={18} style={{ color: '#C97D0E' }} />
                                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: '#2C1A0E' }}>Store Hours</h4>
                            </div>
                            <p style={{ fontSize: 14, color: '#6B3A2A', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{settings?.storeHoursRaw || 'Monday – Saturday: 10:00 AM – 8:00 PM\nSunday: 11:00 AM – 6:00 PM'}</p>
                        </div>

                        {/* WhatsApp */}
                        <a href={`${waLink}?text=Hi! I'm interested in your pets.`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 22px', background: '#25D366', borderRadius: 16, textDecoration: 'none', color: '#fff', fontWeight: 700, fontSize: 16, transition: 'all 0.25s', boxShadow: '0 4px 20px rgba(37,211,102,0.3)' }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(37,211,102,0.4)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.3)'; }}>
                            <MessageCircle size={26} /> Chat on WhatsApp
                        </a>
                    </div>

                    {/* Form */}
                    <div style={{ background: '#fff', borderRadius: 24, padding: 40, boxShadow: '0 8px 40px rgba(44,26,14,0.1)' }}>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: '#2C1A0E', marginBottom: 28 }}>Send a Message</h2>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#6B3A2A', marginBottom: 6 }}>Your Name*</label>
                                    <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Doe" style={inputStyle} onFocus={e => e.target.style.borderColor = '#C97D0E'} onBlur={e => e.target.style.borderColor = 'rgba(44,26,14,0.12)'} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#6B3A2A', marginBottom: 6 }}>Phone</label>
                                    <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 9876543210" style={inputStyle} onFocus={e => e.target.style.borderColor = '#C97D0E'} onBlur={e => e.target.style.borderColor = 'rgba(44,26,14,0.12)'} />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#6B3A2A', marginBottom: 6 }}>Email Address*</label>
                                <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" style={inputStyle} onFocus={e => e.target.style.borderColor = '#C97D0E'} onBlur={e => e.target.style.borderColor = 'rgba(44,26,14,0.12)'} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#6B3A2A', marginBottom: 6 }}>Subject</label>
                                <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}>
                                    <option value="">Select a subject</option>
                                    <option>Pet Inquiry</option>
                                    <option>Grooming Booking</option>
                                    <option>Boarding Query</option>
                                    <option>Vet Consultation</option>
                                    <option>General Question</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#6B3A2A', marginBottom: 6 }}>Message*</label>
                                <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us what you're looking for..." style={{ ...inputStyle, resize: 'vertical' }} onFocus={e => e.target.style.borderColor = '#C97D0E'} onBlur={e => e.target.style.borderColor = 'rgba(44,26,14,0.12)'} />
                            </div>
                            <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: 'center', opacity: loading ? 0.75 : 1 }}>
                                {loading ? 'Sending...' : <><Send size={16} /> Send Message</>}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Map embed */}
                <div style={{ marginTop: 64, borderRadius: 24, overflow: 'hidden', height: 420, boxShadow: '0 8px 40px rgba(44,26,14,0.1)', position: 'relative', background: '#e5e3df' }}>
                    {mapEmbed ? (
                        <iframe src={mapEmbed} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Rumzee's Exotic Location" />
                    ) : (
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.265588856342!2d73.9141!3d18.5642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6919dd5bc92b5f52!2sRumzee's+Aviary!5e0!3m2!1sen!2sin!4v1234567890" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Rumzee's Exotic Location Default" />
                    )}
                </div>
            </div>
        </div>
    );
}
