'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Save, Plus, Trash2 } from 'lucide-react';

export default function NavigationBuilder() {
  const [menus, setMenus] = useState<any[]>([]);
  const [activeMenuId, setActiveMenuId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const res = await fetch('/api/navigation');
      const data = await res.json();
      if (data.length === 0) {
        // Create defaults if empty
        await fetch('/api/navigation', { method: 'POST', body: JSON.stringify({ name: 'Header Menu', location: 'navbar' }) });
        await fetch('/api/navigation', { method: 'POST', body: JSON.stringify({ name: 'Footer Menu', location: 'footer' }) });
        const res2 = await fetch('/api/navigation');
        const data2 = await res2.json();
        setMenus(data2);
        setActiveMenuId(data2[0]?.id);
      } else {
        setMenus(data);
        setActiveMenuId(data[0]?.id);
      }
    } catch (e) {
      toast.error('Failed to load menus');
    } finally {
      setLoading(false);
    }
  };

  const activeMenu = menus.find(m => m.id === activeMenuId);

  const handleAddItem = async () => {
    if (!activeMenu) return;
    try {
      await fetch('/api/navigation/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: 'New Link', href: '/', menuId: activeMenu.id, order: activeMenu.items.length }),
      });
      fetchMenus();
      toast.success('Link added');
    } catch (e) {
      toast.error('Failed to add link');
    }
  };

  const handleUpdateItem = async (itemId: string, field: string, value: string) => {
    const updatedMenus = [...menus];
    const menuIdx = updatedMenus.findIndex(m => m.id === activeMenuId);
    const itemIdx = updatedMenus[menuIdx].items.findIndex((i: any) => i.id === itemId);
    updatedMenus[menuIdx].items[itemIdx][field] = value;
    setMenus(updatedMenus);

    // Debounce save or just save on blur
    try {
      await fetch(`/api/navigation/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedMenus[menuIdx].items[itemIdx]),
      });
    } catch (e) {
      toast.error('Failed to save link');
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm('Delete this link?')) return;
    try {
      await fetch(`/api/navigation/items/${itemId}`, { method: 'DELETE' });
      fetchMenus();
      toast.success('Link deleted');
    } catch (e) {
      toast.error('Failed to delete link');
    }
  };

  if (loading) return <div>Loading menu builder...</div>;

  return (
    <div style={{ maxWidth: 900 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, margin: 0, fontFamily: "'Outfit', sans-serif" }}>Menu Builder</h1>
      </div>

      <div style={{ display: 'flex', gap: 24 }}>
        {/* Menu Selector */}
        <div style={{ width: 250, backgroundColor: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', alignSelf: 'flex-start' }}>
          <h3 style={{ fontSize: 16, marginBottom: 16 }}>Select Menu</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {menus.map(m => (
              <button 
                key={m.id}
                onClick={() => setActiveMenuId(m.id)}
                style={{ 
                  padding: '12px 16px', textAlign: 'left', borderRadius: 8, border: 'none', cursor: 'pointer',
                  backgroundColor: m.id === activeMenuId ? '#2C1A0E' : '#FDF6EC',
                  color: m.id === activeMenuId ? '#fff' : '#2C1A0E',
                  fontWeight: m.id === activeMenuId ? 600 : 400
                }}
              >
                {m.name} ({m.location})
              </button>
            ))}
          </div>
        </div>

        {/* Menu Editor */}
        <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: 20, margin: 0 }}>{activeMenu?.name} Links</h2>
            <button onClick={handleAddItem} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', backgroundColor: '#FDF6EC', color: '#2C1A0E', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
              <Plus size={16} /> Add Link
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {activeMenu?.items?.map((item: any, idx: number) => (
              <div key={item.id} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 16, backgroundColor: '#fcfcfc', border: '1px solid #eee', borderRadius: 12 }}>
                <div style={{ cursor: 'grab', color: '#ccc' }}>☰</div>
                <div style={{ flex: 1, display: 'flex', gap: 12 }}>
                  <input 
                    type="text" 
                    value={item.label}
                    onChange={(e) => {
                      const newMenus = [...menus];
                      const mIdx = newMenus.findIndex(m => m.id === activeMenuId);
                      newMenus[mIdx].items[idx].label = e.target.value;
                      setMenus(newMenus);
                    }}
                    onBlur={(e) => handleUpdateItem(item.id, 'label', e.target.value)}
                    placeholder="Link Label" 
                    style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: '1px solid #ddd' }}
                  />
                  <input 
                    type="text" 
                    value={item.href}
                    onChange={(e) => {
                      const newMenus = [...menus];
                      const mIdx = newMenus.findIndex(m => m.id === activeMenuId);
                      newMenus[mIdx].items[idx].href = e.target.value;
                      setMenus(newMenus);
                    }}
                    onBlur={(e) => handleUpdateItem(item.id, 'href', e.target.value)}
                    placeholder="URL (/shop, etc.)" 
                    style={{ flex: 2, padding: '10px 14px', borderRadius: 8, border: '1px solid #ddd' }}
                  />
                </div>
                <button onClick={() => handleDeleteItem(item.id)} style={{ padding: 10, backgroundColor: '#ffeeee', color: 'red', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            {activeMenu?.items?.length === 0 && (
              <div style={{ padding: 40, textAlign: 'center', color: '#888' }}>No links in this menu yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
