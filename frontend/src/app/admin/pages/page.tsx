'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function PagesManager() {
    const [pages, setPages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingSlug, setEditingSlug] = useState<string | null>(null);

    const initialForm = { title: '', htmlContent: '' };
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/pages');
            const data = await res.json();
            setPages(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            setPages([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingSlug ? 'PUT' : 'POST';
        const url = editingSlug ? `/api/pages/${editingSlug}` : '/api/pages';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            alert(err.error || 'Failed to save page');
            return;
        }

        setShowModal(false);
        setEditingSlug(null);
        setForm(initialForm);
        fetchData();
    };

    const handleEdit = (page: any) => {
        setForm({ title: page.title, htmlContent: page.htmlContent || '' });
        setEditingSlug(page.slug);
        setShowModal(true);
    };

    const handleDelete = async (slug: string) => {
        if (!confirm('Are you sure you want to delete this content page?')) return;
        const res = await fetch(`/api/pages/${slug}`, { method: 'DELETE' });
        if (!res.ok) {
             const err = await res.json().catch(() => ({}));
             alert(err.error || 'Failed to delete page');
             return;
        }
        fetchData();
    };

    const inputStyle = {
        width: '100%', padding: '10px 14px', borderRadius: 8,
        border: '1px solid #ddd', fontSize: 14, fontFamily: "'DM Sans', sans-serif"
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: '#2C1A0E' }}>Content Pages</h1>
                <button onClick={() => { setForm(initialForm); setEditingSlug(null); setShowModal(true); }} style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px',
                    backgroundColor: '#C97D0E', color: '#fff', border: 'none', borderRadius: 8,
                    fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif"
                }}>
                    <Plus size={18} /> Create Page
                </button>
            </div>

            <p style={{ color: '#6B3A2A', marginBottom: 32 }}>Manage the text formatting (HTML) for static-like pages such as About Us or Terms & Conditions.</p>

            <div style={{ backgroundColor: '#fff', borderRadius: 16, boxShadow: '0 4px 20px rgba(44,26,14,0.06)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ backgroundColor: '#FDF6EC', borderBottom: '1px solid #EEE' }}>
                        <tr>
                            <th style={{ padding: '16px 24px', color: '#6B3A2A', fontWeight: 600 }}>Page Title</th>
                            <th style={{ padding: '16px 24px', color: '#6B3A2A', fontWeight: 600 }}>URL Slug</th>
                            <th style={{ padding: '16px 24px', color: '#6B3A2A', fontWeight: 600 }}>Last Updated</th>
                            <th style={{ padding: '16px 24px', color: '#6B3A2A', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={4} style={{ padding: 24, textAlign: 'center' }}>Loading pages...</td></tr>
                        ) : pages.length === 0 ? (
                            <tr><td colSpan={4} style={{ padding: 24, textAlign: 'center' }}>No custom pages yet.</td></tr>
                        ) : pages.map(page => (
                            <tr key={page.id} style={{ borderBottom: '1px solid #EEE' }}>
                                <td style={{ padding: '16px 24px', fontWeight: 600, color: '#2C1A0E' }}>{page.title}</td>
                                <td style={{ padding: '16px 24px', color: '#6B3A2A', fontFamily: 'monospace' }}>/{page.slug}</td>
                                <td style={{ padding: '16px 24px', color: '#6B3A2A' }}>{new Date(page.updatedAt).toLocaleDateString()}</td>
                                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                    <button onClick={() => handleEdit(page)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B3A2A', marginRight: 16 }}><Edit2 size={18} /></button>
                                    <button onClick={() => handleDelete(page.slug)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#E8601A' }}><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 24 }}>
                    <div style={{ backgroundColor: '#fff', borderRadius: 16, width: '100%', maxWidth: 800, maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ padding: '24px 32px', borderBottom: '1px solid #EEE', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 10 }}>
                            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, margin: 0 }}>{editingSlug ? 'Edit Page' : 'Create Page'}</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
                        </div>

                        <form onSubmit={handleSave} style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Page Title *</label>
                                <input required style={inputStyle} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. About Us" />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Content (HTML formatted) *</label>
                                <textarea required style={{ ...inputStyle, minHeight: 400, fontFamily: 'monospace', lineHeight: 1.5 }} value={form.htmlContent} onChange={e => setForm({ ...form, htmlContent: e.target.value })} placeholder="<h1>About our sanctuary</h1><p>We believe in ethical breeding...</p>" />
                                <p style={{ fontSize: 13, color: '#888', marginTop: 8 }}>Use standard HTML tags here (&lt;p&gt;, &lt;h3&gt;, &lt;strong&gt;) to format the page content. It will be rendered dynamically.</p>
                            </div>

                            <div style={{ borderTop: '1px solid #EEE', paddingTop: 24, marginTop: 8, display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
                                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '12px 24px', backgroundColor: 'transparent', border: '1px solid #ddd', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                                <button type="submit" style={{ padding: '12px 32px', backgroundColor: '#2C1A0E', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>Save Content</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
