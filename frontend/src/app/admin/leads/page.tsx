'use client';

import { useEffect, useState } from 'react';
import { Download, Users, TrendingUp, CheckCircle, Clock } from 'lucide-react';

type Lead = {
  id: string;
  name: string;
  phone?: string | null;
  email?: string | null;
  message: string;
  source: string;
  status: string;
  pageUrl?: string | null;
  createdAt: string;
  pet?: {
    id: string;
    name: string;
    species: string;
  } | null;
};

type LeadStats = {
  stats: {
    total: number;
    NEW: number;
    IN_PROGRESS: number;
    WON: number;
    LOST: number;
  };
  sources: { source: string; count: number }[];
};

const STATUS_OPTIONS = ['NEW', 'IN_PROGRESS', 'WON', 'LOST'] as const;

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('NEW');
  const [sourceFilter, setSourceFilter] = useState<string>('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/leads/stats');
        const data = await res.json();
        if (!data.error) setStats(data);
      } catch (err) {
        console.error('Failed to fetch stats', err);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (statusFilter) params.append('status', statusFilter);
        if (sourceFilter) params.append('source', sourceFilter);

        const res = await fetch(`/api/leads?${params.toString()}`);
        const data = await res.json();
        if (!data.error) setLeads(data);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, [statusFilter, sourceFilter]);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      setLeads(prev => prev.map(l => (l.id === id ? { ...l, status } : l)));
    } finally {
      setUpdatingId(null);
    }
  };

  const exportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['Name', 'Phone', 'Email', 'Source', 'Status', 'Message', 'Page URL', 'Created At'];
    const csvData = leads.map(l => [
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone || ''}"`,
      `"${l.email || ''}"`,
      `"${l.source}"`,
      `"${l.status}"`,
      `"${l.message.replace(/"/g, '""')}"`,
      `"${l.pageUrl || ''}"`,
      `"${new Date(l.createdAt).toLocaleString()}"`
    ].join(','));

    const csvContent = [headers.join(','), ...csvData].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `leads_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: '#2C1A0E', marginBottom: 4 }}>
            Lead Management
          </h1>
          <p style={{ color: '#6B3A2A' }}>Track enquiries, callback requests, and newsletter signups.</p>
        </div>
        <button
          onClick={exportCSV}
          disabled={leads.length === 0}
          style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px',
            background: '#fff', border: '1.5px solid #E5D5C5', borderRadius: 12,
            color: '#6B3A2A', fontWeight: 600, fontSize: 13, cursor: leads.length === 0 ? 'not-allowed' : 'pointer',
            opacity: leads.length === 0 ? 0.6 : 1, transition: 'all 0.2s',
          }}
          onMouseEnter={e => { if (leads.length > 0) e.currentTarget.style.background = '#FDF6EC'; }}
          onMouseLeave={e => { if (leads.length > 0) e.currentTarget.style.background = '#fff'; }}
        >
          <Download size={16} /> Export Current View
        </button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Total Leads', value: stats.stats.total, icon: <Users size={20} />, color: '#4F46E5', bg: '#EEF2FF' },
            { label: 'New', value: stats.stats.NEW, icon: <TrendingUp size={20} />, color: '#C97D0E', bg: '#FFF7ED' },
            { label: 'In Progress', value: stats.stats.IN_PROGRESS, icon: <Clock size={20} />, color: '#0ea5e9', bg: '#e0f2fe' },
            { label: 'Won', value: stats.stats.WON, icon: <CheckCircle size={20} />, color: '#10B981', bg: '#D1FAE5' },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#fff', padding: 20, borderRadius: 16, border: '1px solid rgba(44,26,14,0.06)', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, background: stat.bg, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon}
              </div>
              <div>
                <div style={{ fontSize: 13, color: '#6B3A2A', fontWeight: 600, marginBottom: 2 }}>{stat.label}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#2C1A0E', lineHeight: 1 }}>{stat.value}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, background: '#fff', padding: 16, borderRadius: 16, border: '1px solid rgba(44,26,14,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 13, color: '#6B3A2A', fontWeight: 600 }}>Status</label>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E5D5C5', fontSize: 13, outline: 'none' }}
          >
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div style={{ width: 1, height: 24, background: '#E5D5C5' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 13, color: '#6B3A2A', fontWeight: 600 }}>Source</label>
          <select
            value={sourceFilter}
            onChange={e => setSourceFilter(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E5D5C5', fontSize: 13, outline: 'none' }}
          >
            <option value="">All Sources</option>
            {stats?.sources.map(s => (
              <option key={s.source} value={s.source}>
                {s.source} ({s.count})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          border: '1px solid rgba(44,26,14,0.06)',
          overflow: 'hidden',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead style={{ backgroundColor: '#FDF6EC', borderBottom: '1px solid rgba(44,26,14,0.06)' }}>
            <tr>
              <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 600, color: '#2C1A0E' }}>Name</th>
              <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 600, color: '#2C1A0E' }}>Contact</th>
              <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 600, color: '#2C1A0E' }}>Source</th>
              <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 600, color: '#2C1A0E' }}>Message / Pet</th>
              <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 600, color: '#2C1A0E' }}>Created</th>
              <th style={{ padding: '14px 20px', textAlign: 'right', fontWeight: 600, color: '#2C1A0E' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ padding: 40, textAlign: 'center', color: '#6B3A2A' }}>
                  Loading leads...
                </td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: 40, textAlign: 'center', color: '#6B3A2A' }}>
                  No leads found for these filters.
                </td>
              </tr>
            ) : (
              leads.map(lead => (
                <tr key={lead.id} style={{ borderBottom: '1px solid #F3E3D2', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#FDF6EC'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '16px 20px', fontWeight: 600, color: '#2C1A0E' }}>{lead.name}</td>
                  <td style={{ padding: '16px 20px', color: '#6B3A2A' }}>
                    {lead.phone && <div style={{ marginBottom: 4 }}>📱 {lead.phone}</div>}
                    {lead.email && <div>✉️ <a href={`mailto:${lead.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{lead.email}</a></div>}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{
                      display: 'inline-flex', padding: '4px 8px', borderRadius: 6,
                      background: 'rgba(44,26,14,0.05)', color: '#6B3A2A', fontSize: 12, fontWeight: 600,
                    }}>
                      {lead.source}
                    </span>
                    {lead.pageUrl && (
                      <div style={{ marginTop: 6 }}>
                        <a href={lead.pageUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: '#C97D0E', textDecoration: 'none' }}>
                          View Entry Page ↗
                        </a>
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '16px 20px', color: '#6B3A2A', maxWidth: 300 }}>
                    {lead.pet && (
                      <div style={{ fontWeight: 600, color: '#2C1A0E', marginBottom: 6 }}>
                        Pet: {lead.pet.name} <span style={{ fontWeight: 400, color: '#6B3A2A', fontSize: 12 }}>({lead.pet.species})</span>
                      </div>
                    )}
                    <div style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.5, fontSize: 13 }}>
                      {lead.message}
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px', color: '#6B3A2A', fontSize: 13 }}>
                    {new Date(lead.createdAt).toLocaleDateString()}
                    <div style={{ fontSize: 11, color: '#A0614A', marginTop: 2 }}>
                      {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <select
                      value={lead.status}
                      disabled={updatingId === lead.id}
                      onChange={e => updateStatus(lead.id, e.target.value)}
                      style={{
                        padding: '6px 12px', borderRadius: 50,
                        border: '1px solid', fontSize: 12, fontWeight: 600,
                        outline: 'none', cursor: 'pointer', appearance: 'none',
                        textAlign: 'center', width: 110,
                        borderColor: lead.status === 'WON' ? '#10B981' : lead.status === 'LOST' ? '#EF4444' : lead.status === 'IN_PROGRESS' ? '#0ea5e9' : '#C97D0E',
                        backgroundColor: lead.status === 'WON' ? '#D1FAE5' : lead.status === 'LOST' ? '#FEE2E2' : lead.status === 'IN_PROGRESS' ? '#e0f2fe' : '#FFF7ED',
                        color: lead.status === 'WON' ? '#047857' : lead.status === 'LOST' ? '#B91C1C' : lead.status === 'IN_PROGRESS' ? '#0369a1' : '#A85C0A',
                      }}
                    >
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

