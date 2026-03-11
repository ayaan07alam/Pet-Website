'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

export default function CategoriesManager() {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const initialForm = { name: '', image: '' };
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/categories');
            const data = await res.json();
            setCategories(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            setCategories([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `/api/categories/${editingId}` : '/api/categories';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            alert(err.error || 'Failed to save category');
            return;
        }

        setShowModal(false);
        setEditingId(null);
        setForm(initialForm);
        fetchData();
    };

    const handleEdit = (category: any) => {
        setForm({ name: category.name, image: category.image || '' });
        setEditingId(category.id);
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this category? Ensure no pets are assigned to it first.')) return;
        const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
        if (!res.ok) {
             const err = await res.json().catch(() => ({}));
             alert(err.error || 'Failed to delete category. It might have pets assigned.');
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
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: '#2C1A0E' }}>Categories</h1>
                <button onClick={() => { setForm(initialForm); setEditingId(null); setShowModal(true); }} style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px',
                    backgroundColor: '#C97D0E', color: '#fff', border: 'none', borderRadius: 8,
                    fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif"
                }}>
                    <Plus size={18} /> Add Category
                </button>
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: 16, boxShadow: '0 4px 20px rgba(44,26,14,0.06)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ backgroundColor: '#FDF6EC', borderBottom: '1px solid #EEE' }}>
                        <tr>
                            <th style={{ padding: '16px 24px', color: '#6B3A2A', fontWeight: 600, width: 80 }}>Image</th>
                            <th style={{ padding: '16px 24px', color: '#6B3A2A', fontWeight: 600 }}>Name</th>
                            <th style={{ padding: '16px 24px', color: '#6B3A2A', fontWeight: 600 }}>Slug</th>
                            <th style={{ padding: '16px 24px', color: '#6B3A2A', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={4} style={{ padding: 24, textAlign: 'center' }}>Loading categories...</td></tr>
                        ) : categories.length === 0 ? (
                            <tr><td colSpan={4} style={{ padding: 24, textAlign: 'center' }}>No categories found.</td></tr>
                        ) : categories.map(cat => (
                            <tr key={cat.id} style={{ borderBottom: '1px solid #EEE' }}>
                                <td style={{ padding: '16px 24px' }}>
                                    {cat.image ? (
                                        <img src={cat.image} alt={cat.name} style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: 48, height: 48, borderRadius: 8, backgroundColor: '#F5E6C8' }} />
                                    )}
                                </td>
                                <td style={{ padding: '16px 24px', fontWeight: 600, color: '#2C1A0E' }}>{cat.name}</td>
                                <td style={{ padding: '16px 24px', color: '#6B3A2A' }}>{cat.slug}</td>
                                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                    <button onClick={() => handleEdit(cat)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B3A2A', marginRight: 16 }}><Edit2 size={18} /></button>
                                    <button onClick={() => handleDelete(cat.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#E8601A' }}><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 24 }}>
                    <div style={{ backgroundColor: '#fff', borderRadius: 16, width: '100%', maxWidth: 500 }}>
                        <div style={{ padding: '24px 32px', borderBottom: '1px solid #EEE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, margin: 0 }}>{editingId ? 'Edit Category' : 'Add Category'}</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
                        </div>

                        <form onSubmit={handleSave} style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Category Name *</label>
                                <input required style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Exotic Birds" />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Cover Image URL</label>
                                <ImageUploader
                                    currentImage={form.image}
                                    onUploadSuccess={(url) => setForm({ ...form, image: url })}
                                />
                                <div style={{ fontSize: 12, color: '#888', marginTop: 6, fontStyle: 'italic' }}>* Recommended: 600x800px or larger (3:4 Portrait Ratio). High-res display format.</div>
                            </div>

                            <div style={{ borderTop: '1px solid #EEE', paddingTop: 24, marginTop: 8, display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
                                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '12px 24px', backgroundColor: 'transparent', border: '1px solid #ddd', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                                <button type="submit" style={{ padding: '12px 32px', backgroundColor: '#2C1A0E', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
