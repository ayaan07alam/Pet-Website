'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

export default function PetsManager() {
    const [pets, setPets] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const initialForm = {
        name: '', species: '', breed: '', age: '', gender: '',
        price: '', status: 'Available', description: '',
        images: [''], categoryId: '', isNew: false, isFeatured: false
    };
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const [petsRes, catRes] = await Promise.all([
            fetch('/api/pets'), fetch('/api/categories')
        ]);
        const pData = await petsRes.json();
        const cData = await catRes.json();
        setPets(pData);
        setCategories(cData);
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `/api/pets/${editingId}` : '/api/pets';

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...form,
                images: form.images.filter(i => i.trim() !== '') // remove empty string images
            })
        });

        setShowModal(false);
        setEditingId(null);
        setForm(initialForm);
        fetchData();
    };

    const handleEdit = (pet: any) => {
        setForm({
            ...pet,
            price: pet.price.toString(),
            images: pet.images.length ? pet.images : ['']
        });
        setEditingId(pet.id);
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this pet?')) return;
        await fetch(`/api/pets/${id}`, { method: 'DELETE' });
        fetchData();
    };

    const inputStyle = {
        width: '100%', padding: '10px 14px', borderRadius: 8,
        border: '1px solid #ddd', fontSize: 14, fontFamily: "'DM Sans', sans-serif"
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: '#2C1A0E' }}>Manage Pets</h1>
                <button onClick={() => { setForm(initialForm); setEditingId(null); setShowModal(true); }} style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px',
                    backgroundColor: '#C97D0E', color: '#fff', border: 'none', borderRadius: 8,
                    fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif"
                }}>
                    <Plus size={18} /> Add New Pet
                </button>
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: 16, boxShadow: '0 4px 20px rgba(44,26,14,0.06)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ backgroundColor: '#FDF6EC', borderBottom: '1px solid #EEE' }}>
                        <tr>
                            <th style={{ padding: '16px 24px', color: '#6B3A2A', fontWeight: 600 }}>Name</th>
                            <th style={{ padding: '16px 24px', color: '#6B3A2A', fontWeight: 600 }}>Species / Breed</th>
                            <th style={{ padding: '16px 24px', color: '#6B3A2A', fontWeight: 600 }}>Price</th>
                            <th style={{ padding: '16px 24px', color: '#6B3A2A', fontWeight: 600 }}>Status</th>
                            <th style={{ padding: '16px 24px', color: '#6B3A2A', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} style={{ padding: 24, textAlign: 'center' }}>Loading pets...</td></tr>
                        ) : pets.length === 0 ? (
                            <tr><td colSpan={5} style={{ padding: 24, textAlign: 'center' }}>No pets found. Create one above!</td></tr>
                        ) : pets.map(pet => (
                            <tr key={pet.id} style={{ borderBottom: '1px solid #EEE' }}>
                                <td style={{ padding: '16px 24px', fontWeight: 600, color: '#2C1A0E' }}>{pet.name}</td>
                                <td style={{ padding: '16px 24px', color: '#6B3A2A' }}>{pet.species} {pet.breed ? `(${pet.breed})` : ''}</td>
                                <td style={{ padding: '16px 24px', fontWeight: 600, color: '#C97D0E' }}>₹{pet.price.toLocaleString('en-IN')}</td>
                                <td style={{ padding: '16px 24px' }}>
                                    <span style={{
                                        padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 600,
                                        backgroundColor: pet.status === 'Available' ? '#E8F5E9' : '#FFF3E0',
                                        color: pet.status === 'Available' ? '#4CAF50' : '#FF9800'
                                    }}>
                                        {pet.status}
                                    </span>
                                </td>
                                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                    <button onClick={() => handleEdit(pet)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B3A2A', marginRight: 16 }}><Edit2 size={18} /></button>
                                    <button onClick={() => handleDelete(pet.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#E8601A' }}><Trash2 size={18} /></button>
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
                            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, margin: 0 }}>{editingId ? 'Edit Pet' : 'Add New Pet'}</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
                        </div>

                        <form onSubmit={handleSave} style={{ padding: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Pet Name *</label>
                                <input required style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Scarlet Macaw" />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Category</label>
                                <select style={inputStyle} value={form.categoryId || ''} onChange={e => setForm({ ...form, categoryId: e.target.value })}>
                                    <option value="">-- Select Category --</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Species</label>
                                <input required style={inputStyle} value={form.species} onChange={e => setForm({ ...form, species: e.target.value })} placeholder="e.g. Bird" />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Breed</label>
                                <input style={inputStyle} value={form.breed} onChange={e => setForm({ ...form, breed: e.target.value })} placeholder="e.g. Ara macao" />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Age</label>
                                <input style={inputStyle} value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} placeholder="e.g. 8 Months" />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Gender</label>
                                <select style={inputStyle} value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
                                    <option value="">Unknown</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Price (₹) (Optional)</label>
                                <input type="number" style={inputStyle} value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="Leave blank for 'Price on Request'" />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Status</label>
                                <select style={inputStyle} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                                    <option value="Available">Available</option>
                                    <option value="Sold">Sold</option>
                                    <option value="Reserved">Reserved</option>
                                </select>
                            </div>

                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Pet Image *</label>
                                <ImageUploader
                                    currentImage={form.images[0]}
                                    onUploadSuccess={(url) => setForm({ ...form, images: [url] })}
                                />
                                <div style={{ fontSize: 12, color: '#888', marginTop: 6, fontStyle: 'italic' }}>* Recommended: 800x800px (1:1 Square). Max 5MB. High-quality image, stored securely in Supabase.</div>
                            </div>

                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Description</label>
                                <textarea style={{ ...inputStyle, minHeight: 120, resize: 'vertical' }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Detailed description of the pet..." />
                            </div>

                            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 24 }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                    <input type="checkbox" checked={form.isNew} onChange={e => setForm({ ...form, isNew: e.target.checked })} />
                                    Mark as "New Arrival"
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                    <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({ ...form, isFeatured: e.target.checked })} />
                                    Feature on Homepage
                                </label>
                            </div>

                            <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #EEE', paddingTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
                                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '12px 24px', backgroundColor: 'transparent', border: '1px solid #ddd', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                                <button type="submit" style={{ padding: '12px 32px', backgroundColor: '#2C1A0E', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>Save Pet</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
