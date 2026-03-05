'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Shield, Truck, Heart, ChevronLeft, ChevronRight, MapPin, Phone, Play, Users, Dna, ShieldCheck, MessageCircle, Feather, Cat, Rabbit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PetCard from '@/components/PetCard';
import { mockPets, mockCategories, mockTestimonials } from '@/data/mockData';

// ─── Hero Section ─────────────────────────────────────────────
function HeroSection({ settings }: { settings: any }) {
  const [currentBgSlide, setCurrentBgSlide] = useState(0);
  const [currentCarouselSlide, setCurrentCarouselSlide] = useState(0);
  const [isPlayingCarousel, setIsPlayingCarousel] = useState(true);

  // Validation: Check if there's actually a valid URL string present, not just placeholders.
  const validBgImages = settings?.heroImages?.filter((img: string) => img && img.trim() !== '') || [];
  const validCentralImages = settings?.heroCentralImages?.filter((img: string) => img && img.trim() !== '') || [];

  // Background slides (Dynamic from DB or Local fallback)
  const bgSlides = validBgImages.length > 0
    ? validBgImages.map((src: string, i: number) => ({ id: `bg${i}`, image: src }))
    : [
      { id: 'bg1', image: '/images/hero/bg_forest.png' },
      { id: 'bg2', image: '/images/hero/bg_desert.png' },
      { id: 'bg3', image: '/images/hero/bg_ocean.png' },
    ];

  // Foreground 3D Carousel slides (Actual Pets — local images or DB ones)
  const centralImages = validCentralImages.length === 4
    ? validCentralImages
    : ['/images/hero/bird.png', '/images/hero/cat.png', '/images/hero/reptile.png', '/images/hero/tortoise.png'];

  const carouselSlides = [
    {
      id: 1,
      image: centralImages[0],
      label: 'Rare Birds',
      title: 'Vibrant &\nIntelligent',
      desc: 'Discover our hand-raised, healthy, and incredibly vocal avian companions. Bring home a burst of color and personality.',
      color: '#E8601A'
    },
    {
      id: 2,
      image: centralImages[1],
      label: 'Exotic Cats',
      title: 'Majestic &\nPlayful',
      desc: 'Purebred, vaccinated, and vet-checked. Our exotic cats offer unparalleled elegance and feline grace.',
      color: '#C97D0E'
    },
    {
      id: 3,
      image: centralImages[2],
      label: 'Reptiles',
      title: 'Fascinating &\nUnique',
      desc: 'Captive-bred and ready to bond. Enter the mesmerizing world of gentle, prehistoric companions.',
      color: '#4A7C2E'
    },
    {
      id: 4,
      image: centralImages[3],
      label: 'Tortoises',
      title: 'Companions\nfor Life',
      desc: 'Slow, steady, and full of character. These gentle giants make for peaceful, lifelong friends.',
      color: '#8D6E52'
    },
  ];

  // Auto-play backgrounds (Runs continuously unconditionally based on its own timing)
  useEffect(() => {
    const t = setInterval(() => setCurrentBgSlide((p) => (p + 1) % bgSlides.length), 8000);
    return () => clearInterval(t);
  }, [bgSlides.length]);

  // Auto-play carousel
  useEffect(() => {
    if (!isPlayingCarousel) return;
    const t = setInterval(() => setCurrentCarouselSlide((p) => (p + 1) % carouselSlides.length), 6000);
    return () => clearInterval(t);
  }, [isPlayingCarousel, carouselSlides.length]);

  const activeSlide = carouselSlides[currentCarouselSlide];

  return (
    <section className="hero-wrapper">

      {/* Background Images - Local files for instant, reliable loading */}
      {bgSlides.map((slide: any, i: number) => (
        <div
          key={slide.id}
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0,
            opacity: i === currentBgSlide ? 1 : 0,
            transform: i === currentBgSlide ? 'scale(1)' : 'scale(1.05)',
            transition: 'opacity 1.5s ease-in-out, transform 1.5s ease-in-out',
            pointerEvents: 'none'
          }}
        >
          <img src={slide.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        </div>
      ))}

      {/* Overlays to ensure text readability */}
      {/* Reduced opacity of the left-to-right gradient so the right side is completely clear for the image */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(90deg, rgba(20,10,5,0.85) 0%, rgba(20,10,5,0.4) 40%, transparent 100%)', zIndex: 1, pointerEvents: 'none' }} />
      {/* Reduced the bottom gradient to be subtle */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '40%', background: 'linear-gradient(0deg, rgba(20,10,5,0.8) 0%, transparent 100%)', zIndex: 1, pointerEvents: 'none' }} />

      {/* Main Content */}
      <div className="container hero-grid">

        {/* Left Content - Typography & CTA */}
        <div className="hero-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCarouselSlide}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <span style={{ padding: '6px 16px', borderRadius: 30, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.2)' }}>
                  {activeSlide.label}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Explore the extraordinary</span>
              </div>

              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 24, textShadow: '0 4px 30px rgba(0,0,0,0.6)', whiteSpace: 'pre-line' }}>
                {activeSlide.title}
              </h1>

              <p style={{ fontSize: 'clamp(1rem, 1.2vw, 1.15rem)', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, marginBottom: 40, maxWidth: 520, textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>
                {activeSlide.desc}
              </p>

              <div className="hero-cta-group">
                <Link href="/shop" style={{
                  background: activeSlide.color,
                  color: '#fff', padding: '16px 40px', borderRadius: 50,
                  fontWeight: 600, fontSize: 16, display: 'inline-flex', alignItems: 'center', gap: 10,
                  textDecoration: 'none', boxShadow: `0 8px 32px ${activeSlide.color}60`,
                  transition: 'transform 0.2s ease, filter 0.2s ease'
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.filter = 'brightness(1.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.filter = 'none'; }}
                >
                  Discover Pets <ArrowRight size={18} />
                </Link>
                <div style={{ display: 'flex', gap: 12 }}>
                  <Link href="/contact" style={{
                    background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
                    color: '#fff', padding: '15px 36px', borderRadius: 50,
                    fontWeight: 600, fontSize: 16, border: '2px solid rgba(255,255,255,0.3)',
                    textDecoration: 'none', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.borderColor = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Content - Orbiting 3D Carousel (Pauses on Hover over the image area) */}
        <div className="hero-carousel-wrapper"
          onMouseEnter={() => setIsPlayingCarousel(false)}
          onMouseLeave={() => setIsPlayingCarousel(true)}
        >

          {/* Glowing Aura behind the ring */}
          <motion.div
            animate={{ background: activeSlide.color }}
            transition={{ duration: 1 }}
            style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: 400, height: 400, borderRadius: '50%',
              filter: 'blur(90px)', opacity: 0.4, zIndex: 0
            }}
          />

          <div className="hero-carousel-inner">
            {/* The active center image */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: 320, height: 320, borderRadius: '50%', overflow: 'hidden',
              boxShadow: `0 30px 60px rgba(0,0,0,0.6), 0 0 0 6px rgba(255,255,255,0.3), inset 0 0 0 1px ${activeSlide.color}80`,
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              {carouselSlides.map((s, i) => (
                <img key={i} src={s.image} alt={s.label} style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover',
                  opacity: i === currentCarouselSlide ? 1 : 0,
                  transform: i === currentCarouselSlide ? 'scale(1)' : 'scale(1.15)',
                  transition: 'opacity 0.8s ease, transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  pointerEvents: 'none'
                }} />
              ))}
            </div>

            {/* Orbiting Ring - Dotted style */}
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.5)',
              animation: 'spin 40s linear infinite', pointerEvents: 'none'
            }} />

            {/* Orbiting Thumbnails */}
            {carouselSlides.map((s, i) => {
              // Rotate 90 degrees based on index, shifting backwards to bring active to left/bottom
              return (
                <button key={i} onClick={() => setCurrentCarouselSlide(i)} style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: `rotate(${i * 90}deg) translateX(220px) rotate(-${i * 90}deg) translate(-50%, -50%)`,
                  width: i === currentCarouselSlide ? 72 : 56,
                  height: i === currentCarouselSlide ? 72 : 56,
                  borderRadius: '50%',
                  border: i === currentCarouselSlide ? `3px solid ${s.color}` : '3px solid rgba(255,255,255,0.8)',
                  boxShadow: i === currentCarouselSlide ? `0 12px 32px ${s.color}80` : '0 8px 24px rgba(0,0,0,0.5)',
                  overflow: 'hidden', padding: 0, cursor: 'pointer', zIndex: 3,
                  transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  background: '#000'
                }}>
                  <img src={s.image} alt={s.label} style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    filter: i === currentCarouselSlide ? 'none' : 'brightness(0.6) grayscale(40%)',
                    transition: 'filter 0.5s ease'
                  }} />
                  {/* Active highlight glow inside thumbnail */}
                  {i === currentCarouselSlide && (
                    <div style={{ position: 'absolute', inset: 0, boxShadow: `inset 0 0 20px ${s.color}80`, pointerEvents: 'none' }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress Bar globally over bottom representing Carousel time */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 4, background: 'rgba(255,255,255,0.1)', zIndex: 10 }}>
        {isPlayingCarousel && (
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 6, ease: 'linear' }}
            key={`progress-${currentCarouselSlide}`}
            style={{ height: '100%', background: activeSlide.color, boxShadow: `0 0 10px ${activeSlide.color}` }}
          />
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { 100% { transform: rotate(360deg); } }` }} />
    </section>
  );
}

// ─── Scroll-Reveal Wrapper ─────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Stats Strip ────────────────────────────────────────────────
function StatsStrip() {
  const stats = [
    { value: '500+', label: 'Happy Families', Icon: Users },
    { value: '50+', label: 'Exotic Breeds', Icon: Dna },
    { value: '8+', label: 'Years of Passion', Icon: Heart },
    { value: '100%', label: 'Health Certified', Icon: ShieldCheck },
    { value: '4.9', label: 'Customer Rating', Icon: Star },
    { value: '24H', label: 'WhatsApp Support', Icon: MessageCircle },
  ];
  return (
    <div style={{ background: 'linear-gradient(135deg, #2C1A0E 0%, #4A2A1A 100%)', overflow: 'hidden' }}>
      <div className="stats-strip">
        {stats.map((s, i) => (
          <div key={s.label} className="stats-item"
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,125,14,0.12)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
              <s.Icon size={20} color='rgba(201,125,14,0.7)' />
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 800, color: '#C97D0E', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'rgba(245,230,200,0.5)', fontWeight: 500, letterSpacing: '0.8px', textTransform: 'uppercase', marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Animal Facts Banner ─────────────────────────────────────────
function AnimalFactsBanner() {
  const facts = [
    { species: 'African Grey Parrot', fact: 'Can live up to 60+ years and have the intelligence of a 5-year-old child.', symbol: 'BIRD', color: '#E8A020', bg: 'rgba(232,160,32,0.07)' },
    { species: 'Savannah Cat', fact: 'A hybrid of domestic cats and servals — one of the largest domestic cat breeds in the world.', symbol: 'CAT', color: '#C97D0E', bg: 'rgba(201,125,14,0.07)' },
    { species: 'Ball Python', fact: 'Can go months without eating and may live for 30+ years with proper care.', symbol: 'REPTILE', color: '#4A7C2E', bg: 'rgba(74,124,46,0.07)' },
    { species: 'Sulcata Tortoise', fact: 'The third largest tortoise in the world — some reach 100kg and live over 100 years!', symbol: 'TORTOISE', color: '#7A5C3A', bg: 'rgba(122,92,58,0.07)' },
  ];
  return (
    <section style={{ padding: '80px 0', background: '#FDF6EC', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(201,125,14,0.04) 1px, transparent 1px)', backgroundSize: '30px 30px', pointerEvents: 'none' }} />
      <div className="container">
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Did You Know?</div>
            <h2 className="section-title">Remarkable Creatures, Remarkable Facts</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Every exotic pet in our family has an incredible story. These aren&apos;t just pets — they&apos;re living wonders.</p>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {facts.map((f, i) => (
            <Reveal key={f.species} delay={i * 0.1}>
              <div style={{
                background: f.bg,
                border: `1px solid ${f.color}25`,
                borderLeft: `4px solid ${f.color}`,
                borderRadius: '0 16px 16px 0',
                padding: '28px 24px',
                transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                position: 'relative',
                overflow: 'hidden',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(6px)'; e.currentTarget.style.boxShadow = `0 8px 30px ${f.color}18`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {/* Watermark species label */}
                <div style={{ position: 'absolute', right: 16, bottom: 12, fontSize: 13, fontWeight: 800, color: f.color, opacity: 0.12, letterSpacing: '3px' }}>{f.symbol}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: f.color, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 10 }}>{f.species}</div>
                <p style={{ fontSize: 15, color: '#2C1A0E', lineHeight: 1.75, margin: 0 }}>{f.fact}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Category Grid ─────────────────────────────────────────────
function CategoriesSection({ categories }: { categories: any[] }) {
  const activeCategories = categories && categories.length > 0 ? categories : mockCategories;
  return (
    <section style={{ padding: '96px 0', background: '#fff' }}>
      <div className="container">
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Browse by Category</div>
            <h2 className="section-title">Find Your Perfect Pet</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              From rare exotic birds to gentle reptiles, we have a wide selection of exotic pets and everything they need.
            </p>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {activeCategories.map((cat, idx) => (
            <Reveal key={cat.id} delay={idx * 0.1}>
              <Link href={`/shop?category=${cat.id}`} style={{
                display: 'flex', flexDirection: 'column',
                borderRadius: 24, background: cat.bg, textDecoration: 'none', color: '#2C1A0E',
                transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)', border: '1px solid rgba(255,255,255,0.4)',
                overflow: 'hidden', position: 'relative', boxShadow: '0 4px 12px rgba(44,26,14,0.05)',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = `0 20px 40px ${cat.color}30`;
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(44,26,14,0.05)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                <div style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden', position: 'relative' }}>
                  <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' }} />
                  <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: 50, fontSize: 13, fontWeight: 700, color: cat.color, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    {cat.count} Available
                  </div>
                </div>
                <div style={{ padding: '24px', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)' }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800, marginBottom: 8, color: '#2C1A0E' }}>{cat.name}</h3>
                  <p style={{ fontSize: 14, color: '#6B3A2A', margin: 0, lineHeight: 1.5 }}>{cat.description}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Featured Pets ──────────────────────────────────────────────
function FeaturedPets({ pets }: { pets: any[] }) {
  const sourcePets = pets && pets.length > 0 ? pets : mockPets;
  const featured = sourcePets.filter(p => p.isFeatured || p.featured).slice(0, 4);
  return (
    <section style={{ padding: '96px 0', background: '#FDF6EC' }}>
      <div className="container">
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="section-label">Hand-picked for you</div>
              <h2 className="section-title" style={{ marginBottom: 8 }}>Featured Companions</h2>
              <p style={{ color: '#6B3A2A', fontSize: 16 }}>Our most loved and sought-after exotic pets</p>
            </div>
            <Link href="/shop" className="btn-secondary" style={{ flexShrink: 0 }}>
              View All Pets <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
        <div className="grid-4">
          {featured.map((pet, idx) => (
            <Reveal key={pet.id} delay={idx * 0.12}>
              <PetCard pet={pet} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ──────────────────────────────────────────────
function WhyUsSection() {
  const features = [
    { icon: <Shield size={28} />, title: 'Health Guaranteed', desc: 'Every pet comes with a vet certificate and 15-day health guarantee. We only sell 100% healthy animals.', emoji: '🩺' },
    { icon: <Heart size={28} />, title: 'Ethically Sourced', desc: 'All our birds, cats, and reptiles are captive-bred or obtained from licensed ethical breeders.', emoji: '💚' },
    { icon: <Star size={28} />, title: 'Expert Guidance', desc: 'Our experienced team provides lifelong support, care guides, and dietary advice for every pet.', emoji: '🎓' },
    { icon: <Truck size={28} />, title: 'Safe Delivery', desc: 'Live animal transport with expert handlers, climate-controlled vehicles, and real-time updates.', emoji: '🚚' },
  ];
  return (
    <section style={{ padding: '96px 0', background: '#2C1A0E', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative circles */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'rgba(201,125,14,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -120, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(201,125,14,0.05)', pointerEvents: 'none' }} />
      {/* Decorative dots pattern */}
      <div style={{ position: 'absolute', top: 40, left: 40, opacity: 0.04, pointerEvents: 'none' }}>
        {[...Array(6)].map((_, r) => (
          <div key={r} style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
            {[...Array(6)].map((__, c) => (
              <div key={c} style={{ width: 4, height: 4, borderRadius: '50%', background: '#F5E6C8' }} />
            ))}
          </div>
        ))}
      </div>
      <div className="container">
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label" style={{ justifyContent: 'center', color: '#C97D0E' }}>
              Why Rumzee&apos;s Exotic?
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#F5E6C8', marginBottom: 16 }}>
              More Than Just a Pet Shop
            </h2>
            <p style={{ color: 'rgba(245,230,200,0.7)', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
              We go beyond selling pets — we create lasting bonds between families and their exotic companions.
            </p>
          </div>
        </Reveal>
        <div className="grid-4">
          {features.map((f, idx) => (
            <Reveal key={f.title} delay={idx * 0.1}>
              <div style={{
                background: 'rgba(245,230,200,0.05)', borderRadius: 20, padding: 32,
                border: '1px solid rgba(245,230,200,0.08)', transition: 'all 0.4s cubic-bezier(0.2,0.8,0.2,1)',
                height: '100%',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(201,125,14,0.12)'; e.currentTarget.style.borderColor = 'rgba(201,125,14,0.3)'; e.currentTarget.style.transform = 'translateY(-6px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(245,230,200,0.05)'; e.currentTarget.style.borderColor = 'rgba(245,230,200,0.08)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ width: 60, height: 60, borderRadius: 16, background: 'rgba(201,125,14,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C97D0E', marginBottom: 20 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#F5E6C8', marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(245,230,200,0.65)', lineHeight: 1.8 }}>{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── New Arrivals ───────────────────────────────────────────────
function NewArrivals({ pets }: { pets: any[] }) {
  const sourcePets = pets && pets.length > 0 ? pets : mockPets;
  const newPets = sourcePets.filter(p => p.isNew).slice(0, 3);
  return (
    <section style={{ padding: '96px 0', background: '#fff' }}>
      <div className="container">
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="section-label">Just Arrived</div>
              <h2 className="section-title" style={{ marginBottom: 8 }}>New Arrivals</h2>
              <p style={{ color: '#6B3A2A', fontSize: 16 }}>Fresh faces looking for their forever homes</p>
            </div>
            <Link href="/shop?filter=new" className="btn-secondary">See All New <ArrowRight size={16} /></Link>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          {newPets.map((pet, idx) => (
            <Reveal key={pet.id} delay={idx * 0.12}>
              <PetCard pet={pet} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ───────────────────────────────────────────────
function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((p) => (p === 0 ? mockTestimonials.length - 1 : p - 1));
  const next = () => setCurrent((p) => (p + 1) % mockTestimonials.length);

  // Auto-rotate testimonials every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % mockTestimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const t = mockTestimonials[current];
  return (
    <section style={{ padding: '96px 0', background: '#FDF6EC' }}>
      <div className="container" style={{ maxWidth: 900 }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Happy Pet Parents</div>
            <h2 className="section-title">What Our Customers Say</h2>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div style={{ background: '#fff', borderRadius: 28, padding: '48px 56px', boxShadow: '0 8px 40px rgba(44,26,14,0.1)', position: 'relative', textAlign: 'center', overflow: 'hidden' }}>
            {/* Decorative quote bg */}
            <div style={{ position: 'absolute', top: -10, left: 30, fontSize: 180, color: 'rgba(201,125,14,0.06)', fontFamily: 'Georgia', lineHeight: 1, pointerEvents: 'none' }}>&ldquo;</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <p style={{ fontSize: 20, color: '#2C1A0E', lineHeight: 1.8, fontStyle: 'italic', marginBottom: 32, fontFamily: "'Playfair Display', serif", position: 'relative', zIndex: 1 }}>
                  {t.text}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 20 }}>
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={18} fill="#C97D0E" stroke="#C97D0E" />)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #C97D0E, #E8601A)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 16, boxShadow: '0 4px 15px rgba(201,125,14,0.3)' }}>{t.avatar}</div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 700, color: '#2C1A0E', fontSize: 16 }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: '#6B3A2A' }}>{t.location} • Bought: {t.pet}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            {/* Nav */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 32 }}>
              <button onClick={prev} style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(44,26,14,0.06)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2C1A0E', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,125,14,0.15)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(44,26,14,0.06)'}><ChevronLeft size={20} /></button>
              {mockTestimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 50, border: 'none', cursor: 'pointer', background: i === current ? '#C97D0E' : '#ddd', transition: 'all 0.3s ease' }} />
              ))}
              <button onClick={next} style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(44,26,14,0.06)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2C1A0E', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,125,14,0.15)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(44,26,14,0.06)'}><ChevronRight size={20} /></button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── CTA Banner ─────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="animated-gradient-bg" style={{ padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative abstract circles — no emojis */}
      <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -60, left: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'rgba(255,255,255,0.02)', pointerEvents: 'none' }} />
      <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
        <Reveal>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', marginBottom: 20, backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)' }}>
            <Shield size={28} color='rgba(255,255,255,0.9)' />
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', fontWeight: 800, margin: '16px 0 12px' }}>
            Ready to Find Your Companion?
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.85)', marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>
            Visit us in-store or browse our full collection online. Our experts are always ready to help you find the perfect exotic pet.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Link href="/shop" style={{ background: '#fff', color: '#C97D0E', padding: '15px 36px', borderRadius: 50, fontWeight: 700, fontSize: 16, display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', transition: 'all 0.25s ease', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)'; }}
            >
              Shop Now <ArrowRight size={18} />
            </Link>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '15px 36px', borderRadius: 50, fontWeight: 600, fontSize: 16, display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', border: '2px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)', transition: 'all 0.25s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'none'; }}
            >
              <Phone size={18} /> WhatsApp Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Visit Us Map ───────────────────────────────────────────────
function MapSection({ settings }: { settings: any }) {
  const cleanWhatsapp = settings?.whatsappNumber?.replace(/[^\d+]/g, '') || '9876543210';
  const displayWhatsapp = cleanWhatsapp.startsWith('+91') || cleanWhatsapp.startsWith('91') && cleanWhatsapp.length === 12
    ? `+${cleanWhatsapp.replace(/^\+/, '')}`
    : `+91 ${cleanWhatsapp}`;
  const waLink = `https://wa.me/${cleanWhatsapp.replace(/^\+/, '')}`;

  let mapEmbed = settings?.embeddedMapUrl || '';
  if (mapEmbed.includes('<iframe')) {
    const match = mapEmbed.match(/src="([^"]+)"/);
    if (match) mapEmbed = match[1];
  }

  return (
    <section style={{ padding: '96px 0', background: '#fff' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <Reveal>
            <div>
              <div className="section-label">Come Visit Us</div>
              <h2 className="section-title">Find Us in Store</h2>
              <p style={{ color: '#6B3A2A', lineHeight: 1.8, marginBottom: 32, fontSize: 16 }}>
                Come visit our beautiful showroom and meet our exotic pets in person. Our friendly team is always ready to help you find the perfect companion.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <a href={mapEmbed || 'https://maps.app.goo.gl/A8DbhV3wFJpyLnS37'} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'flex-start', gap: 14, textDecoration: 'none', color: '#2C1A0E', padding: '16px 20px', background: '#FDF6EC', borderRadius: 14, transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(4px)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(44,26,14,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(201,125,14,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C97D0E', flexShrink: 0 }}><MapPin size={22} /></div>
                  <div><div style={{ fontWeight: 600, marginBottom: 2 }}>{settings?.address || 'Our Location'}</div><div style={{ fontSize: 14, color: '#6B3A2A' }}>Click to open in Google Maps 📍</div></div>
                </a>
                <a href={`tel:${cleanWhatsapp}`} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, textDecoration: 'none', color: '#2C1A0E', padding: '16px 20px', background: '#FDF6EC', borderRadius: 14, transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(4px)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(44,26,14,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(201,125,14,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C97D0E', flexShrink: 0 }}><Phone size={22} /></div>
                  <div><div style={{ fontWeight: 600, marginBottom: 2 }}>Call Us</div><div style={{ fontSize: 14, color: '#6B3A2A' }}>{displayWhatsapp}</div></div>
                </a>
                <div style={{ padding: '16px 20px', background: '#FDF6EC', borderRadius: 14, fontSize: 14, color: '#6B3A2A', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                  {settings?.storeHoursRaw || '🕐 Mon–Sat: 10:00 AM – 8:00 PM\n🕐 Sunday: 11:00 AM – 6:00 PM'}
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ borderRadius: 24, overflow: 'hidden', boxShadow: '0 8px 40px rgba(44,26,14,0.12)', height: 420, position: 'relative', background: '#e5e3df' }}>
              {mapEmbed ? (
                <iframe src={mapEmbed} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Rumzee's Exotic Location" />
              ) : (
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.265588856342!2d73.9141!3d18.5642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6919dd5bc92b5f52!2sRumzee's+Aviary!5e0!3m2!1sen!2sin!4v1234567890" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Rumzee's Exotic Location Default" />
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Main Export ────────────────────────────────────────────────
export default function HomePage() {
  const [data, setData] = useState<any>({ pets: [], categories: [], settings: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/pets').then(r => r.json()).catch(() => []),
      fetch('/api/categories').then(r => r.json()).catch(() => []),
      fetch('/api/settings').then(r => r.json()).catch(() => null)
    ]).then(([pets, categories, settings]) => {
      setData({ pets, categories, settings });
      setLoading(false);
    });
  }, []);

  if (loading) return null; // Or a subtle loader to prevent hydration flicker

  return (
    <>
      <HeroSection settings={data.settings} />
      <StatsStrip />
      <CategoriesSection categories={data.categories} />
      <FeaturedPets pets={data.pets} />
      <AnimalFactsBanner />
      <WhyUsSection />
      <NewArrivals pets={data.pets} />
      <TestimonialsSection />
      <CTASection />
      <MapSection settings={data.settings} />
    </>
  );
}
