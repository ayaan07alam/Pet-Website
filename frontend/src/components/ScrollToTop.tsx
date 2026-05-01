'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    onClick={scrollToTop}
                    initial={{ opacity: 0, scale: 0.6, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6, y: 20 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    aria-label="Scroll to top"
                    title="Back to top"
                    style={{
                        position: 'fixed',
                        bottom: 28,
                        left: 28,
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #2C1A0E 0%, #4A2A1A 100%)',
                        border: '1.5px solid rgba(201,125,14,0.35)',
                        color: '#C97D0E',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 9000,
                        boxShadow: '0 4px 20px rgba(44,26,14,0.3), 0 0 0 0 rgba(201,125,14,0)',
                        transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #C97D0E 0%, #E8601A 100%)';
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.borderColor = 'transparent';
                        e.currentTarget.style.boxShadow = '0 8px 28px rgba(201,125,14,0.45)';
                        e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #2C1A0E 0%, #4A2A1A 100%)';
                        e.currentTarget.style.color = '#C97D0E';
                        e.currentTarget.style.borderColor = 'rgba(201,125,14,0.35)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(44,26,14,0.3)';
                        e.currentTarget.style.transform = 'none';
                    }}
                >
                    <ChevronUp size={22} strokeWidth={2.5} />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
