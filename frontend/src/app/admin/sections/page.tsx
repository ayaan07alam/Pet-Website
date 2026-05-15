'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Save, Plus, Trash2, Edit } from 'lucide-react';

export default function CustomSectionsBuilder() {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Editor state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({ title: '', type: 'html', content: '', isActive: true });

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const res = await fetch('/api/custom-sections');
      const data = await res.json();
      setSections(data);
    } catch (e) {
      toast.error('Failed to load sections');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      await fetch('/api/custom-sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'New Section', type: 'html', content: '<div class="container py-20 text-center">\n  <h2>New Custom Section</h2>\n  <p>Edit this HTML to build your section.</p>\n</div>', order: sections.length }),
      });
      fetchSections();
      toast.success('Section created');
    } catch (e) {
      toast.error('Failed to create section');
    }
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    try {
      await fetch(`/api/custom-sections/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      fetchSections();
      setEditingId(null);
      toast.success('Section saved');
    } catch (e) {
      toast.error('Failed to save section');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this custom section?')) return;
    try {
      await fetch(`/api/custom-sections/${id}`, { method: 'DELETE' });
      fetchSections();
      toast.success('Section deleted');
    } catch (e) {
      toast.error('Failed to delete section');
    }
  };

  const handleToggleActive = async (section: any) => {
    try {
      await fetch(`/api/custom-sections/${section.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...section, isActive: !section.isActive }),
      });
      fetchSections();
    } catch (e) {
      toast.error('Failed to toggle status');
    }
  };

  if (loading) return <div>Loading sections...</div>;

  return (
    <div style={{ maxWidth: 1000 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, margin: 0, fontFamily: "'Outfit', sans-serif" }}>Custom Sections</h1>
        <button onClick={handleCreate} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', backgroundColor: '#C97D0E', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
          <Plus size={18} /> Add New Section
        </button>
      </div>

      {editingId ? (
        <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: 20, marginBottom: 24 }}>Edit Section</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Internal Title (Admin Only)</label>
              <input type="text" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #ddd' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>HTML Content</label>
              <p style={{ fontSize: 13, color: '#666', marginTop: -4, marginBottom: 8 }}>You can write standard HTML and use inline styles or Tailwind/CSS module classes.</p>
              <textarea 
                value={editForm.content} 
                onChange={e => setEditForm({...editForm, content: e.target.value})} 
                style={{ width: '100%', height: 400, padding: '16px', borderRadius: 8, border: '1px solid #ddd', fontFamily: 'monospace', fontSize: 14 }} 
              />
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
              <button onClick={handleSaveEdit} style={{ padding: '12px 24px', backgroundColor: '#4A7C2E', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
                Save Section
              </button>
              <button onClick={() => setEditingId(null)} style={{ padding: '12px 24px', backgroundColor: '#eee', color: '#333', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {sections.map((section, idx) => (
            <div key={section.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: 18 }}>{section.title || `Section ${idx + 1}`}</h3>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <span style={{ fontSize: 13, padding: '4px 8px', backgroundColor: '#eee', borderRadius: 4 }}>Type: {section.type}</span>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, cursor: 'pointer' }}>
                    <input type="checkbox" checked={section.isActive} onChange={() => handleToggleActive(section)} />
                    Active on Homepage
                  </label>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button 
                  onClick={() => { setEditingId(section.id); setEditForm(section); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', backgroundColor: '#FDF6EC', color: '#2C1A0E', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
                >
                  <Edit size={16} /> Edit
                </button>
                <button onClick={() => handleDelete(section.id)} style={{ padding: '8px 12px', backgroundColor: '#ffeeee', color: 'red', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          {sections.length === 0 && (
            <div style={{ textAlign: 'center', padding: 60, backgroundColor: '#fff', borderRadius: 16, color: '#888' }}>
              No custom sections built yet. Click "Add New Section" to inject custom HTML into your homepage.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
