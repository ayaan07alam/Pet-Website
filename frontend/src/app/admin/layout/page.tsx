'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Save } from 'lucide-react';

export default function LayoutManager() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/layout')
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  const handleToggle = (key: string) => {
    setSettings((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/layout', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error('Failed to save');
      toast.success('Layout settings saved!');
    } catch (error) {
      toast.error('Failed to save layout settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading layout settings...</div>;

  const toggles = [
    { key: 'showHero', label: 'Hero Section' },
    { key: 'showCategories', label: 'Browse by Category' },
    { key: 'showFeaturedPets', label: 'Featured Pets' },
    { key: 'showRoyalFelines', label: 'Royal Felines' },
    { key: 'showNewArrivals', label: 'New Arrivals' },
    { key: 'showAnimalFacts', label: 'Animal Facts Banner' },
    { key: 'showWhyUs', label: 'Why Us Features' },
    { key: 'showStats', label: 'Statistics Strip' },
    { key: 'showTestimonials', label: 'Testimonials' },
    { key: 'showCta', label: 'Call to Action Banner' },
  ];

  return (
    <div style={{ maxWidth: 800 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, margin: 0, fontFamily: "'Outfit', sans-serif" }}>Layout Manager</h1>
        <button 
          onClick={handleSave} 
          disabled={saving}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', backgroundColor: '#C97D0E', color: '#fff', border: 'none', borderRadius: 8, cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 600 }}
        >
          <Save size={18} /> {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: 18, marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid #eee' }}>Homepage Section Visibility</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {toggles.map((t) => (
            <div key={t.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid #eee', borderRadius: 12 }}>
              <span style={{ fontWeight: 500, fontSize: 15 }}>{t.label}</span>
              <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24 }}>
                <input 
                  type="checkbox" 
                  checked={settings?.[t.key] ?? true} 
                  onChange={() => handleToggle(t.key)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{ 
                  position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, 
                  backgroundColor: settings?.[t.key] ? '#4A7C2E' : '#ccc', 
                  transition: '0.4s', borderRadius: 34 
                }}>
                  <span style={{ 
                    position: 'absolute', content: '""', height: 18, width: 18, left: 3, bottom: 3, 
                    backgroundColor: 'white', transition: '0.4s', borderRadius: '50%',
                    transform: settings?.[t.key] ? 'translateX(20px)' : 'translateX(0)'
                  }} />
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
