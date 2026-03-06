'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface HomepageStat {
  id?: string;
  value: string;
  label: string;
  icon: string;
  order: number;
}

interface AnimalFact {
  id?: string;
  species: string;
  fact: string;
  symbol: string;
  color: string;
  order: number;
}

interface WhyUsFeature {
  id?: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

interface Testimonial {
  id?: string;
  name: string;
  location: string;
  pet: string;
  text: string;
  rating: number;
  avatar?: string;
  order: number;
  featured?: boolean;
}

interface CompanyStory {
  id: string;
  heading: string;
  storyText: string;
  yearsFounded: string;
  yearsLabel: string;
  familiesCount: string;
  familiesLabel: string;
  breedsCount: string;
  breedsLabel: string;
  ratingValue: string;
  ratingLabel: string;
}

// Sensible defaults so the CMS shows content even if the DB is empty
const DEFAULT_STATS: HomepageStat[] = [
  { value: '500+', label: 'Happy Families', icon: 'Users', order: 0 },
  { value: '50+', label: 'Exotic Breeds', icon: 'Dna', order: 1 },
  { value: '8+', label: 'Years of Passion', icon: 'Heart', order: 2 },
  { value: '100%', label: 'Health Certified', icon: 'ShieldCheck', order: 3 },
  { value: '4.9', label: 'Customer Rating', icon: 'Star', order: 4 },
  { value: '24H', label: 'WhatsApp Support', icon: 'MessageCircle', order: 5 },
];

const DEFAULT_FACTS: AnimalFact[] = [
  { species: 'African Grey Parrot', fact: 'Can live up to 60+ years and have the intelligence of a 5-year-old child.', symbol: 'BIRD', color: '#E8A020', order: 0 },
  { species: 'Savannah Cat', fact: 'A hybrid of domestic cats and servals — one of the largest domestic cat breeds in the world.', symbol: 'CAT', color: '#C97D0E', order: 1 },
  { species: 'Ball Python', fact: 'Can go months without eating and may live for 30+ years with proper care.', symbol: 'REPTILE', color: '#4A7C2E', order: 2 },
  { species: 'Sulcata Tortoise', fact: 'The third largest tortoise in the world — some reach 100kg and live over 100 years!', symbol: 'TORTOISE', color: '#7A5C3A', order: 3 },
];

const DEFAULT_FEATURES: WhyUsFeature[] = [
  { title: 'Health Guaranteed', description: 'Every pet comes with a vet certificate and 15-day health guarantee. We only sell 100% healthy animals.', icon: 'Shield', order: 0 },
  { title: 'Ethically Sourced', description: 'All our birds, cats, and reptiles are captive-bred or obtained from licensed ethical breeders.', icon: 'Heart', order: 1 },
  { title: 'Expert Guidance', description: 'Our experienced team provides lifelong support, care guides, and dietary advice for every pet.', icon: 'Star', order: 2 },
  { title: 'Safe Delivery', description: 'Live animal transport with expert handlers, climate-controlled vehicles, and real-time updates.', icon: 'Truck', order: 3 },
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    name: 'Karthik Reddy',
    location: 'Chennai',
    pet: 'Bearded Dragon',
    text: 'Great variety of reptiles. My Bearded Dragon arrived healthily and calm. The packaging was excellent and the shipping was fast. Very satisfied!',
    rating: 4,
    avatar: 'KR',
    order: 0,
  },
  {
    name: 'Priya Singh',
    location: 'Mumbai',
    pet: 'African Grey Parrot',
    text: "Absolutely beautiful parrot! She's intelligent, playful, and the team provided incredible care guides. Best decision ever!",
    rating: 5,
    avatar: 'PS',
    order: 1,
  },
  {
    name: 'Rohan Sharma',
    location: 'Bangalore',
    pet: 'Bengal Cat',
    text: 'Premium quality exotic cat. The health guarantee gave me great confidence. Highly recommended for all cat lovers!',
    rating: 5,
    avatar: 'RS',
    order: 2,
  },
  {
    name: 'Anjali Patel',
    location: 'Ahmedabad',
    pet: 'Sulcata Tortoise',
    text: 'My Sulcata is healthy and thriving! The team was patient in answering all my care questions. Five stars!',
    rating: 5,
    avatar: 'AP',
    order: 3,
  },
];

interface HomepageCopy {
  id: string;
  heroKicker: string;
  heroPrimaryCtaLabel: string;
  heroPrimaryCtaHref: string;
  heroSecondaryCtaLabel: string;
  heroSecondaryCtaHref: string;
  categoriesTitle: string;
  categoriesSubtitle: string;
  featuredTitle: string;
  featuredSubtitle: string;
  royalTitle: string;
  royalSubtitle: string;
  newArrivalsTitle: string;
  newArrivalsSubtitle: string;
  testimonialsTitle: string;
  testimonialsSubtitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
}

export default function ContentManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [stats, setStats] = useState<HomepageStat[]>([]);
  const [facts, setFacts] = useState<AnimalFact[]>([]);
  const [features, setFeatures] = useState<WhyUsFeature[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [story, setStory] = useState<CompanyStory | null>(null);
  const [homepageCopy, setHomepageCopy] = useState<HomepageCopy | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [s, f, w, t, cs, hc] = await Promise.all([
          fetch('/api/homepage-stats').then(r => r.json()),
          fetch('/api/animal-facts').then(r => r.json()),
          fetch('/api/why-us-features').then(r => r.json()),
          fetch('/api/testimonials').then(r => r.json()),
          fetch('/api/company-story').then(r => r.json()),
          fetch('/api/homepage-copy').then(r => r.json()),
        ]);
        if (!s.error && Array.isArray(s) && s.length) setStats(s);
        else setStats(DEFAULT_STATS);

        if (!f.error && Array.isArray(f) && f.length) setFacts(f);
        else setFacts(DEFAULT_FACTS);

        if (!w.error && Array.isArray(w) && w.length) setFeatures(w);
        else setFeatures(DEFAULT_FEATURES);

        if (!t.error && Array.isArray(t) && t.length) setTestimonials(t);
        else setTestimonials(DEFAULT_TESTIMONIALS);
        if (!cs.error) setStory(cs);
        if (!hc.error) setHomepageCopy(hc);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all([
        fetch('/api/homepage-stats', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(stats.map((s, i) => ({ ...s, order: i }))),
        }),
        fetch('/api/animal-facts', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(facts.map((f, i) => ({ ...f, order: i }))),
        }),
        fetch('/api/why-us-features', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(features.map((f, i) => ({ ...f, order: i }))),
        }),
        fetch('/api/testimonials', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(testimonials.map((t, i) => ({ ...t, order: i }))),
        }),
        story
          ? fetch('/api/company-story', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(story),
            })
          : Promise.resolve(),
        homepageCopy
          ? fetch('/api/homepage-copy', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(homepageCopy),
            })
          : Promise.resolve(),
      ]);
      alert('Homepage content saved successfully.');
    } catch (e: any) {
      alert(e?.message || 'Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const cardStyle = {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    boxShadow: '0 4px 20px rgba(44,26,14,0.06)',
  } as const;

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid #ddd',
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
  } as const;

  if (loading) return <div>Loading homepage content...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1100 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: '#2C1A0E' }}>
          Homepage & Brand Content
        </h1>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            padding: '12px 28px',
            borderRadius: 999,
            border: 'none',
            cursor: saving ? 'not-allowed' : 'pointer',
            backgroundColor: '#C97D0E',
            color: '#fff',
            fontWeight: 600,
          }}
        >
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      {/* Stats Strip */}
      <section style={cardStyle}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 12 }}>Stats Strip</h2>
        <p style={{ fontSize: 13, color: '#6B3A2A', marginBottom: 16 }}>
          Controls the numbers row on the homepage (Happy Families, Exotic Breeds, etc.).
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {stats.map((s, idx) => (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr 140px auto',
                gap: 10,
                alignItems: 'center',
              }}
            >
              <input
                style={inputStyle}
                value={s.value}
                onChange={e => {
                  const next = [...stats];
                  next[idx].value = e.target.value;
                  setStats(next);
                }}
                placeholder="500+"
              />
              <input
                style={inputStyle}
                value={s.label}
                onChange={e => {
                  const next = [...stats];
                  next[idx].label = e.target.value;
                  setStats(next);
                }}
                placeholder="Happy Families"
              />
              <input
                style={inputStyle}
                value={s.icon}
                onChange={e => {
                  const next = [...stats];
                  next[idx].icon = e.target.value;
                  setStats(next);
                }}
                placeholder="Icon (Users, Dna, Star...)"
              />
              <button
                type="button"
                onClick={() => setStats(stats.filter((_, i) => i !== idx))}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#E8601A' }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setStats([
                ...stats,
                { value: '', label: '', icon: 'Users', order: stats.length },
              ])
            }
            style={{
              marginTop: 8,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              borderRadius: 999,
              border: '1px dashed #C97D0E',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            <Plus size={16} /> Add Stat
          </button>
        </div>
      </section>

      {/* Animal Facts */}
      <section style={cardStyle}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 12 }}>Animal Facts</h2>
        <p style={{ fontSize: 13, color: '#6B3A2A', marginBottom: 16 }}>
          Controls the “Remarkable Creatures, Remarkable Facts” cards.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {facts.map((f, idx) => (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 2fr) 110px 110px auto',
                gap: 10,
                alignItems: 'flex-start',
              }}
            >
              <input
                style={inputStyle}
                value={f.species}
                onChange={e => {
                  const next = [...facts];
                  next[idx].species = e.target.value;
                  setFacts(next);
                }}
                placeholder="African Grey Parrot"
              />
              <textarea
                style={{ ...inputStyle, minHeight: 60 }}
                value={f.fact}
                onChange={e => {
                  const next = [...facts];
                  next[idx].fact = e.target.value;
                  setFacts(next);
                }}
                placeholder="Fact text..."
              />
              <input
                style={inputStyle}
                value={f.symbol}
                onChange={e => {
                  const next = [...facts];
                  next[idx].symbol = e.target.value;
                  setFacts(next);
                }}
                placeholder="BIRD / CAT"
              />
              <input
                style={inputStyle}
                value={f.color}
                onChange={e => {
                  const next = [...facts];
                  next[idx].color = e.target.value;
                  setFacts(next);
                }}
                placeholder="#C97D0E"
              />
              <button
                type="button"
                onClick={() => setFacts(facts.filter((_, i) => i !== idx))}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#E8601A' }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setFacts([
                ...facts,
                { species: '', fact: '', symbol: 'BIRD', color: '#C97D0E', order: facts.length },
              ])
            }
            style={{
              marginTop: 8,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              borderRadius: 999,
              border: '1px dashed #C97D0E',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            <Plus size={16} /> Add Fact
          </button>
        </div>
      </section>

      {/* Why Us */}
      <section style={cardStyle}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 12 }}>Why Us Features</h2>
        <p style={{ fontSize: 13, color: '#6B3A2A', marginBottom: 16 }}>
          Controls the “More Than Just a Pet Shop” cards.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {features.map((f, idx) => (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 2fr) 140px auto',
                gap: 10,
                alignItems: 'flex-start',
              }}
            >
              <input
                style={inputStyle}
                value={f.title}
                onChange={e => {
                  const next = [...features];
                  next[idx].title = e.target.value;
                  setFeatures(next);
                }}
                placeholder="Health Guaranteed"
              />
              <textarea
                style={{ ...inputStyle, minHeight: 60 }}
                value={f.description}
                onChange={e => {
                  const next = [...features];
                  next[idx].description = e.target.value;
                  setFeatures(next);
                }}
                placeholder="Description..."
              />
              <input
                style={inputStyle}
                value={f.icon}
                onChange={e => {
                  const next = [...features];
                  next[idx].icon = e.target.value;
                  setFeatures(next);
                }}
                placeholder="Icon (Shield, Heart, Star, Truck)"
              />
              <button
                type="button"
                onClick={() => setFeatures(features.filter((_, i) => i !== idx))}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#E8601A' }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setFeatures([
                ...features,
                { title: '', description: '', icon: 'Shield', order: features.length },
              ])
            }
            style={{
              marginTop: 8,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              borderRadius: 999,
              border: '1px dashed #C97D0E',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            <Plus size={16} /> Add Feature
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section style={cardStyle}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 12 }}>Testimonials</h2>
        <p style={{ fontSize: 13, color: '#6B3A2A', marginBottom: 16 }}>
          Controls the “What Our Customers Say” carousel.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 2fr) 140px 80px auto',
                gap: 10,
                alignItems: 'flex-start',
              }}
            >
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  style={{ ...inputStyle, flex: 1 }}
                  value={t.name}
                  onChange={e => {
                    const next = [...testimonials];
                    next[idx].name = e.target.value;
                    setTestimonials(next);
                  }}
                  placeholder="Customer name"
                />
                <input
                  style={{ ...inputStyle, flex: 1 }}
                  value={t.location}
                  onChange={e => {
                    const next = [...testimonials];
                    next[idx].location = e.target.value;
                    setTestimonials(next);
                  }}
                  placeholder="Location"
                />
              </div>
              <textarea
                style={{ ...inputStyle, minHeight: 60 }}
                value={t.text}
                onChange={e => {
                  const next = [...testimonials];
                  next[idx].text = e.target.value;
                  setTestimonials(next);
                }}
                placeholder="Testimonial text..."
              />
              <input
                style={inputStyle}
                value={t.pet}
                onChange={e => {
                  const next = [...testimonials];
                  next[idx].pet = e.target.value;
                  setTestimonials(next);
                }}
                placeholder="Pet purchased"
              />
              <input
                style={inputStyle}
                type="number"
                min={1}
                max={5}
                value={t.rating}
                onChange={e => {
                  const next = [...testimonials];
                  next[idx].rating = Number(e.target.value) || 5;
                  setTestimonials(next);
                }}
              />
              <button
                type="button"
                onClick={() => setTestimonials(testimonials.filter((_, i) => i !== idx))}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#E8601A' }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setTestimonials([
                ...testimonials,
                {
                  name: '',
                  location: '',
                  pet: '',
                  text: '',
                  rating: 5,
                  order: testimonials.length,
                },
              ])
            }
            style={{
              marginTop: 8,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              borderRadius: 999,
              border: '1px dashed #C97D0E',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            <Plus size={16} /> Add Testimonial
          </button>
        </div>
      </section>

      {/* Company Story (About hero) */}
      {story && (
        <section style={cardStyle}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 12 }}>Company Story Hero</h2>
          <p style={{ fontSize: 13, color: '#6B3A2A', marginBottom: 16 }}>
            Controls the “Born from a Love for Exotic Life” block on the About page.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1.2fr)', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <label style={{ fontWeight: 600, fontSize: 13 }}>Heading</label>
              <input
                style={inputStyle}
                value={story.heading}
                onChange={e => setStory({ ...(story as CompanyStory), heading: e.target.value })}
              />
              <label style={{ fontWeight: 600, fontSize: 13, marginTop: 8 }}>Story Text</label>
              <textarea
                style={{ ...inputStyle, minHeight: 120 }}
                value={story.storyText}
                onChange={e => setStory({ ...(story as CompanyStory), storyText: e.target.value })}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontWeight: 600, fontSize: 13 }}>Years – Value</label>
                <input
                  style={inputStyle}
                  value={story.yearsFounded}
                  onChange={e => setStory({ ...(story as CompanyStory), yearsFounded: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontWeight: 600, fontSize: 13 }}>Years – Label</label>
                <input
                  style={inputStyle}
                  value={story.yearsLabel}
                  onChange={e => setStory({ ...(story as CompanyStory), yearsLabel: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontWeight: 600, fontSize: 13 }}>Families – Value</label>
                <input
                  style={inputStyle}
                  value={story.familiesCount}
                  onChange={e => setStory({ ...(story as CompanyStory), familiesCount: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontWeight: 600, fontSize: 13 }}>Families – Label</label>
                <input
                  style={inputStyle}
                  value={story.familiesLabel}
                  onChange={e => setStory({ ...(story as CompanyStory), familiesLabel: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontWeight: 600, fontSize: 13 }}>Breeds – Value</label>
                <input
                  style={inputStyle}
                  value={story.breedsCount}
                  onChange={e => setStory({ ...(story as CompanyStory), breedsCount: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontWeight: 600, fontSize: 13 }}>Breeds – Label</label>
                <input
                  style={inputStyle}
                  value={story.breedsLabel}
                  onChange={e => setStory({ ...(story as CompanyStory), breedsLabel: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontWeight: 600, fontSize: 13 }}>Rating – Value</label>
                <input
                  style={inputStyle}
                  value={story.ratingValue}
                  onChange={e => setStory({ ...(story as CompanyStory), ratingValue: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontWeight: 600, fontSize: 13 }}>Rating – Label</label>
                <input
                  style={inputStyle}
                  value={story.ratingLabel}
                  onChange={e => setStory({ ...(story as CompanyStory), ratingLabel: e.target.value })}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Homepage Text & CTAs */}
      {homepageCopy && (
        <section style={cardStyle}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 12 }}>Homepage Text & CTAs</h2>
          <p style={{ fontSize: 13, color: '#6B3A2A', marginBottom: 16 }}>
            Controls hero tagline buttons and section headings on the homepage.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 2fr)', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, marginBottom: 4 }}>Hero Area</h3>
              <label style={{ fontWeight: 600, fontSize: 13 }}>Small Tagline (next to chip)</label>
              <input
                style={inputStyle}
                value={homepageCopy.heroKicker}
                onChange={e => setHomepageCopy({ ...(homepageCopy as HomepageCopy), heroKicker: e.target.value })}
              />
              <label style={{ fontWeight: 600, fontSize: 13 }}>Primary CTA Label</label>
              <input
                style={inputStyle}
                value={homepageCopy.heroPrimaryCtaLabel}
                onChange={e =>
                  setHomepageCopy({ ...(homepageCopy as HomepageCopy), heroPrimaryCtaLabel: e.target.value })
                }
              />
              <label style={{ fontWeight: 600, fontSize: 13 }}>Primary CTA Link</label>
              <input
                style={inputStyle}
                value={homepageCopy.heroPrimaryCtaHref}
                onChange={e =>
                  setHomepageCopy({ ...(homepageCopy as HomepageCopy), heroPrimaryCtaHref: e.target.value })
                }
              />
              <label style={{ fontWeight: 600, fontSize: 13 }}>Secondary CTA Label</label>
              <input
                style={inputStyle}
                value={homepageCopy.heroSecondaryCtaLabel}
                onChange={e =>
                  setHomepageCopy({ ...(homepageCopy as HomepageCopy), heroSecondaryCtaLabel: e.target.value })
                }
              />
              <label style={{ fontWeight: 600, fontSize: 13 }}>Secondary CTA Link</label>
              <input
                style={inputStyle}
                value={homepageCopy.heroSecondaryCtaHref}
                onChange={e =>
                  setHomepageCopy({ ...(homepageCopy as HomepageCopy), heroSecondaryCtaHref: e.target.value })
                }
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, marginBottom: 4 }}>Section Headings</h3>

              <div>
                <label style={{ fontWeight: 600, fontSize: 13 }}>Categories – Title</label>
                <input
                  style={inputStyle}
                  value={homepageCopy.categoriesTitle}
                  onChange={e =>
                    setHomepageCopy({ ...(homepageCopy as HomepageCopy), categoriesTitle: e.target.value })
                  }
                />
                <label style={{ fontWeight: 600, fontSize: 13, marginTop: 6 }}>Categories – Subtitle</label>
                <textarea
                  style={{ ...inputStyle, minHeight: 60 }}
                  value={homepageCopy.categoriesSubtitle}
                  onChange={e =>
                    setHomepageCopy({ ...(homepageCopy as HomepageCopy), categoriesSubtitle: e.target.value })
                  }
                />
              </div>

              <div>
                <label style={{ fontWeight: 600, fontSize: 13 }}>Featured – Title</label>
                <input
                  style={inputStyle}
                  value={homepageCopy.featuredTitle}
                  onChange={e =>
                    setHomepageCopy({ ...(homepageCopy as HomepageCopy), featuredTitle: e.target.value })
                  }
                />
                <label style={{ fontWeight: 600, fontSize: 13, marginTop: 6 }}>Featured – Subtitle</label>
                <textarea
                  style={{ ...inputStyle, minHeight: 60 }}
                  value={homepageCopy.featuredSubtitle}
                  onChange={e =>
                    setHomepageCopy({ ...(homepageCopy as HomepageCopy), featuredSubtitle: e.target.value })
                  }
                />
              </div>

              <div>
                <label style={{ fontWeight: 600, fontSize: 13 }}>Royal Felines – Subtitle</label>
                <textarea
                  style={{ ...inputStyle, minHeight: 60 }}
                  value={homepageCopy.royalSubtitle}
                  onChange={e =>
                    setHomepageCopy({ ...(homepageCopy as HomepageCopy), royalSubtitle: e.target.value })
                  }
                />
              </div>

              <div>
                <label style={{ fontWeight: 600, fontSize: 13 }}>New Arrivals – Title</label>
                <input
                  style={inputStyle}
                  value={homepageCopy.newArrivalsTitle}
                  onChange={e =>
                    setHomepageCopy({ ...(homepageCopy as HomepageCopy), newArrivalsTitle: e.target.value })
                  }
                />
                <label style={{ fontWeight: 600, fontSize: 13, marginTop: 6 }}>New Arrivals – Subtitle</label>
                <textarea
                  style={{ ...inputStyle, minHeight: 60 }}
                  value={homepageCopy.newArrivalsSubtitle}
                  onChange={e =>
                    setHomepageCopy({ ...(homepageCopy as HomepageCopy), newArrivalsSubtitle: e.target.value })
                  }
                />
              </div>

              <div>
                <label style={{ fontWeight: 600, fontSize: 13 }}>Testimonials – Title</label>
                <input
                  style={inputStyle}
                  value={homepageCopy.testimonialsTitle}
                  onChange={e =>
                    setHomepageCopy({ ...(homepageCopy as HomepageCopy), testimonialsTitle: e.target.value })
                  }
                />
                <label style={{ fontWeight: 600, fontSize: 13, marginTop: 6 }}>Testimonials – Subtitle</label>
                <textarea
                  style={{ ...inputStyle, minHeight: 60 }}
                  value={homepageCopy.testimonialsSubtitle}
                  onChange={e =>
                    setHomepageCopy({ ...(homepageCopy as HomepageCopy), testimonialsSubtitle: e.target.value })
                  }
                />
              </div>

              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, margin: '12px 0 4px' }}>CTA Banner</h3>
                <label style={{ fontWeight: 600, fontSize: 13 }}>CTA Title</label>
                <input
                  style={inputStyle}
                  value={homepageCopy.ctaTitle}
                  onChange={e => setHomepageCopy({ ...(homepageCopy as HomepageCopy), ctaTitle: e.target.value })}
                />
                <label style={{ fontWeight: 600, fontSize: 13, marginTop: 6 }}>CTA Subtitle</label>
                <textarea
                  style={{ ...inputStyle, minHeight: 60 }}
                  value={homepageCopy.ctaSubtitle}
                  onChange={e =>
                    setHomepageCopy({ ...(homepageCopy as HomepageCopy), ctaSubtitle: e.target.value })
                  }
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
                  <div>
                    <label style={{ fontWeight: 600, fontSize: 13 }}>Primary CTA Label</label>
                    <input
                      style={inputStyle}
                      value={homepageCopy.ctaPrimaryLabel}
                      onChange={e =>
                        setHomepageCopy({ ...(homepageCopy as HomepageCopy), ctaPrimaryLabel: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label style={{ fontWeight: 600, fontSize: 13 }}>Primary CTA Link</label>
                    <input
                      style={inputStyle}
                      value={homepageCopy.ctaPrimaryHref}
                      onChange={e =>
                        setHomepageCopy({ ...(homepageCopy as HomepageCopy), ctaPrimaryHref: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label style={{ fontWeight: 600, fontSize: 13 }}>Secondary CTA Label</label>
                    <input
                      style={inputStyle}
                      value={homepageCopy.ctaSecondaryLabel}
                      onChange={e =>
                        setHomepageCopy({ ...(homepageCopy as HomepageCopy), ctaSecondaryLabel: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label style={{ fontWeight: 600, fontSize: 13 }}>Secondary CTA Link</label>
                    <input
                      style={inputStyle}
                      value={homepageCopy.ctaSecondaryHref}
                      onChange={e =>
                        setHomepageCopy({ ...(homepageCopy as HomepageCopy), ctaSecondaryHref: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

