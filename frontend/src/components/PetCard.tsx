'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Heart, Eye, ArrowRight, MessageCircle } from 'lucide-react';
import styles from './PetCard.module.css';
import EnquiryModal from './EnquiryModal';

export interface Pet {
    id: string;
    name: string;
    breed: string;
    species: string;
    age: string;
    gender: string;
    price: number;
    image: string;
    images?: string[];
    rating: number;
    reviews: number;
    available: boolean;
    featured?: boolean;
    isNew?: boolean;
    description?: string;
    category: string;
    status?: string;
}

interface PetCardProps {
    pet: Pet;
    layout?: 'grid' | 'list';
}

const SPECIES_IDENTITY: Record<string, { label: string; abbreviation: string; gradient: string; accent: string; accentLight: string }> = {
    bird: { label: 'Bird', abbreviation: 'AVN', gradient: 'linear-gradient(135deg, #E8A020, #E8601A)', accent: '#E8A020', accentLight: 'rgba(232,160,32,0.12)' },
    cat: { label: 'Exotic Cat', abbreviation: 'FEL', gradient: 'linear-gradient(135deg, #C97D0E, #A85C0A)', accent: '#C97D0E', accentLight: 'rgba(201,125,14,0.12)' },
    rodent: { label: 'Rodent', abbreviation: 'ROD', gradient: 'linear-gradient(135deg, #A0614A, #7A4030)', accent: '#A0614A', accentLight: 'rgba(160,97,74,0.12)' },
    reptile: { label: 'Reptile', abbreviation: 'REP', gradient: 'linear-gradient(135deg, #4A7C2E, #2E5F1A)', accent: '#4A7C2E', accentLight: 'rgba(74,124,46,0.12)' },
    tortoise: { label: 'Turtle / Tortoise', abbreviation: 'TRT', gradient: 'linear-gradient(135deg, #7A5C3A, #5A3E20)', accent: '#7A5C3A', accentLight: 'rgba(122,92,58,0.12)' },
};

export default function PetCard({ pet, layout = 'grid' }: PetCardProps) {
    const [imgError, setImgError] = useState(false);
    const [liked, setLiked] = useState(false);
    const [showEnquiry, setShowEnquiry] = useState(false);

    const species = SPECIES_IDENTITY[pet.species] || SPECIES_IDENTITY['bird'];
    const isSold = pet.status === 'Sold' || !pet.available;
    const isFeatured = pet.featured || (pet as any).isFeatured;

    // Priority: show only ONE badge — the most important one
    const badge = isSold
        ? { label: 'Sold Out', className: styles.soldBadge }
        : pet.isNew
            ? { label: 'New', className: styles.newBadge }
            : isFeatured
                ? { label: 'Featured', className: styles.featuredBadge }
                : null;

    return (
        <div
            className={`${styles.card} ${layout === 'list' ? styles.listCard : ''}`}
            style={{ '--species-accent': species.accent, '--species-light': species.accentLight } as React.CSSProperties}
        >
            {/* Species accent bar — left edge */}
            <div className={styles.speciesBar} style={{ background: species.gradient }} />

            {/* ─── Image Zone ─── */}
            <Link href={`/shop/${pet.id}`} className={styles.imageWrap}>
                {!imgError ? (
                    <img
                        src={pet.image || (pet.images && pet.images[0])}
                        alt={pet.name}
                        className={styles.image}
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className={styles.imageFallback} style={{ background: species.accentLight }}>
                        <div style={{ width: 64, height: 64, borderRadius: 16, background: species.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: '#fff', fontSize: 11, fontWeight: 800, letterSpacing: '2px' }}>{species.abbreviation}</span>
                        </div>
                    </div>
                )}

                {/* Single priority badge — top left, hidden on hover */}
                {badge && (
                    <span className={`${badge.className} ${styles.singleBadge}`}>
                        {badge.label}
                    </span>
                )}

                {/* Like button — top right, appears on hover */}
                <button
                    className={`${styles.likeBtn} ${liked ? styles.liked : ''}`}
                    onClick={(e) => { e.preventDefault(); setLiked(l => !l); }}
                    aria-label="Add to wishlist"
                >
                    <Heart size={15} fill={liked ? '#E8601A' : 'none'} stroke={liked ? '#E8601A' : 'currentColor'} />
                </button>

                {/* Hover Overlay — clean single CTA, no text clutter */}
                <div className={styles.hoverOverlay}>
                    <Link href={`/shop/${pet.id}`} className={styles.hoverCta} style={{ background: species.gradient }}>
                        View {pet.name} <ArrowRight size={14} />
                    </Link>
                </div>
            </Link>

            {/* ─── Info ─── */}
            <Link href={`/shop/${pet.id}`} className={styles.info} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={styles.infoTop}>
                    <div className={styles.metaRow}>
                        <div className={styles.metaInner}>
                            <span className={styles.speciesLabel} style={{ color: species.accent, borderColor: species.accent }}>
                                {species.abbreviation}
                            </span>
                            <span className={styles.agePill}>{pet.age} · {pet.gender}</span>
                        </div>
                    </div>
                    <h3 className={styles.name}>{pet.name}</h3>
                    <p className={styles.breedText}>{pet.breed}</p>
                </div>
                
                <div className={styles.footer}>
                    <span className={styles.price} style={{ color: species.accent }}>
                        {pet.price > 0 ? `₹${pet.price.toLocaleString('en-IN')}` : 'Price on Request'}
                    </span>
                    <button
                        className={styles.enquireBtn}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowEnquiry(true); }}
                    >
                        Enquire
                    </button>
                </div>
            </Link>

            {/* Enquiry Modal */}
            <EnquiryModal
                isOpen={showEnquiry}
                onClose={() => setShowEnquiry(false)}
                petId={pet.id}
                petName={pet.name}
                source="pet_card_enquiry"
            />
        </div>
    );
}
