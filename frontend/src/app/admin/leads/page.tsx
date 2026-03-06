'use client';

import { useEffect, useState } from 'react';

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

const STATUS_OPTIONS = ['NEW', 'IN_PROGRESS', 'WON', 'LOST'] as const;

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('NEW');

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const qs = statusFilter ? `?status=${encodeURIComponent(statusFilter)}` : '';
        const res = await fetch(`/api/leads${qs}`);
        const data = await res.json();
        if (!data.error) setLeads(data);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, [statusFilter]);

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

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: '#2C1A0E', marginBottom: 4 }}>
            Leads
          </h1>
          <p style={{ color: '#6B3A2A' }}>Track all enquiries and callbacks generated from the website.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 13, color: '#6B3A2A', fontWeight: 600 }}>Status</label>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 999,
              border: '1px solid #DDD',
              fontSize: 13,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <option value="">All</option>
            {STATUS_OPTIONS.map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(44,26,14,0.06)',
          overflow: 'hidden',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead style={{ backgroundColor: '#FDF6EC', borderBottom: '1px solid #EEE' }}>
            <tr>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Contact</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Pet / Source</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Message</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Created</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ padding: 24, textAlign: 'center', color: '#6B3A2A' }}>
                  Loading leads...
                </td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: 24, textAlign: 'center', color: '#6B3A2A' }}>
                  No leads yet for this filter.
                </td>
              </tr>
            ) : (
              leads.map(lead => (
                <tr key={lead.id} style={{ borderBottom: '1px solid #F3E3D2' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#2C1A0E' }}>{lead.name}</td>
                  <td style={{ padding: '12px 16px', color: '#6B3A2A' }}>
                    {lead.phone && <div>📱 {lead.phone}</div>}
                    {lead.email && <div>✉️ {lead.email}</div>}
                  </td>
                  <td style={{ padding: '12px 16px', color: '#6B3A2A' }}>
                    {lead.pet ? (
                      <>
                        <div style={{ fontWeight: 600 }}>{lead.pet.name}</div>
                        <div style={{ fontSize: 12, opacity: 0.8 }}>{lead.source}</div>
                      </>
                    ) : (
                      <span style={{ fontSize: 12 }}>{lead.source}</span>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px', color: '#6B3A2A', maxWidth: 320 }}>
                    <div
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {lead.message}
                    </div>
                    {lead.pageUrl && (
                      <a
                        href={lead.pageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'inline-block', fontSize: 11, color: '#C97D0E', marginTop: 4 }}
                      >
                        View page
                      </a>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px', color: '#6B3A2A', fontSize: 13 }}>
                    {new Date(lead.createdAt).toLocaleString()}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <select
                      value={lead.status}
                      disabled={updatingId === lead.id}
                      onChange={e => updateStatus(lead.id, e.target.value)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: 999,
                        border: '1px solid #DDD',
                        fontSize: 12,
                        fontFamily: "'DM Sans', sans-serif",
                        backgroundColor:
                          lead.status === 'WON'
                            ? '#E6F5E8'
                            : lead.status === 'LOST'
                            ? '#FDECEC'
                            : lead.status === 'IN_PROGRESS'
                            ? '#FFF6E5'
                            : '#F5F1E8',
                      }}
                    >
                      {STATUS_OPTIONS.map(s => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
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

