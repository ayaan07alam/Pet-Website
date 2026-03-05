'use client';

import { useState, useEffect } from 'react';
import ImageUploader from '@/components/admin/ImageUploader';

export default function SettingsManager() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        whatsappNumber: '',
        emailAddress: '',
        address: '',
        storeHoursRaw: '',
        embeddedMapUrl: '',
        instagramUrl: '',
        facebookUrl: '',
        heroImages: ['', '', '', ''],
        heroCentralImages: ['', '', '', '']
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data && !data.error) {
            setForm({
                whatsappNumber: data.whatsappNumber || '',
                emailAddress: data.emailAddress || '',
                address: data.address || '',
                storeHoursRaw: data.storeHoursRaw || '',
                embeddedMapUrl: data.embeddedMapUrl || '',
                instagramUrl: data.instagramUrl || '',
                facebookUrl: data.facebookUrl || '',
                heroImages: data.heroImages?.length ? data.heroImages : ['', '', '', ''],
                heroCentralImages: data.heroCentralImages?.length === 4 ? data.heroCentralImages : ['', '', '', '']
            });
        }
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    heroImages: form.heroImages.filter(img => img.trim() !== '')
                })
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || 'Failed to update settings');
            }

            alert('Settings saved successfully!');
        } catch (err: any) {
            alert('Error: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleHeroImageChange = (index: number, value: string) => {
        const newImages = [...form.heroImages];
        newImages[index] = value;
        setForm({ ...form, heroImages: newImages });
    };

    const handleHeroCentralImageChange = (index: number, value: string) => {
        const newImages = [...form.heroCentralImages];
        newImages[index] = value;
        setForm({ ...form, heroCentralImages: newImages });
    };

    const inputStyle = {
        width: '100%', padding: '12px 16px', borderRadius: 8,
        border: '1px solid #ddd', fontSize: 14, fontFamily: "'DM Sans', sans-serif"
    };

    if (loading) return <div>Loading settings...</div>;

    return (
        <div style={{ maxWidth: 800 }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: '#2C1A0E', marginBottom: 32 }}>Site Settings</h1>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

                {/* Contact Info */}
                <div style={{ backgroundColor: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 4px 20px rgba(44,26,14,0.06)' }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, marginBottom: 20 }}>Contact Information</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>WhatsApp Number</label>
                            <input style={inputStyle} value={form.whatsappNumber} onChange={e => setForm({ ...form, whatsappNumber: e.target.value })} placeholder="919876543210" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Email Address</label>
                            <input style={inputStyle} value={form.emailAddress} onChange={e => setForm({ ...form, emailAddress: e.target.value })} placeholder="info@rumzees.com" />
                        </div>
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Physical Address</label>
                            <input style={inputStyle} value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="123 Exotic Pet Lane..." />
                        </div>
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Store Hours (Raw Text)</label>
                            <textarea style={{ ...inputStyle, minHeight: 80 }} value={form.storeHoursRaw} onChange={e => setForm({ ...form, storeHoursRaw: e.target.value })} placeholder="Mon-Sat: 10am-8pm" />
                        </div>
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Google Maps Embed URL</label>
                            <input style={inputStyle} value={form.embeddedMapUrl} onChange={e => {
                                let val = e.target.value;
                                const match = val.match(/src="([^"]+)"/);
                                if (match) val = match[1];
                                setForm({ ...form, embeddedMapUrl: val });
                            }} placeholder="Paste the link or the entire <iframe ...> code here" />
                            <div style={{ fontSize: 12, color: '#888', marginTop: 6, fontStyle: 'italic' }}>* You can paste the raw Google Maps HTML Iframe code directly. We will auto-extract the link.</div>
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div style={{ backgroundColor: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 4px 20px rgba(44,26,14,0.06)' }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, marginBottom: 20 }}>Social Media Links</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Instagram</label>
                            <input style={inputStyle} value={form.instagramUrl} onChange={e => setForm({ ...form, instagramUrl: e.target.value })} placeholder="https://instagram.com/..." />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Facebook</label>
                            <input style={inputStyle} value={form.facebookUrl} onChange={e => setForm({ ...form, facebookUrl: e.target.value })} placeholder="https://facebook.com/..." />
                        </div>
                    </div>
                </div>

                {/* Hero Carousel */}
                <div style={{ backgroundColor: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 4px 20px rgba(44,26,14,0.06)' }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, marginBottom: 20 }}>Homepage Hero Carousel Images</h2>
                    <p style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>Recommended: 1920x1080px (16:9 Landscape Video Aspect Ratio). High resolution background slides.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {form.heroImages.map((img, i) => (
                            <div key={i}>
                                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: 12, color: '#888' }}>Upload Slide {i + 1}</label>
                                <ImageUploader
                                    currentImage={img}
                                    onUploadSuccess={(url) => handleHeroImageChange(i, url)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ backgroundColor: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 4px 20px rgba(44,26,14,0.06)' }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, marginBottom: 20 }}>Homepage Rotating Pets (Central Circle)</h2>
                    <p style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>Recommended: 1000x1000px (1:1 Square). Ensure these are high-quality, transparent cutouts (PNG/WEBP). Order: Bird, Cat, Reptile, Tortoise.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                        {form.heroCentralImages.map((img, i) => (
                            <div key={i}>
                                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: 12, color: '#888' }}>Upload Pet {i + 1}</label>
                                <ImageUploader
                                    currentImage={img}
                                    onUploadSuccess={(url) => handleHeroCentralImageChange(i, url)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'sticky', bottom: 24 }}>
                    <button type="submit" disabled={saving} style={{
                        padding: '14px 40px', backgroundColor: '#C97D0E', color: '#fff',
                        border: 'none', borderRadius: 8, cursor: saving ? 'not-allowed' : 'pointer',
                        fontWeight: 700, fontSize: 16, boxShadow: '0 4px 12px rgba(201,125,14,0.3)'
                    }}>
                        {saving ? 'Saving...' : 'Save All Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
}
