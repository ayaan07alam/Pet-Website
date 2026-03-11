'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);

    // Exact cursor for precision clicking
    const exactX = useMotionValue(-100);
    const exactY = useMotionValue(-100);

    // Physics-based spring config for the trailing paw
    // Slightly heavier mass for a soft, graceful 'cat-like' follow
    const springConfig = { damping: 25, stiffness: 200, mass: 0.3 };
    const springX = useSpring(exactX, springConfig);
    const springY = useSpring(exactY, springConfig);

    useEffect(() => {
        // Robust touch device detection
        const isTouchDevice = 
            'ontouchstart' in window || 
            navigator.maxTouchPoints > 0 || 
            // @ts-ignore
            navigator.msMaxTouchPoints > 0;
            
        if (isTouchDevice || window.matchMedia('(pointer: coarse)').matches) return;
        
        setIsVisible(true);

        const moveCursor = (e: MouseEvent) => {
            exactX.set(e.clientX);
            exactY.set(e.clientY);
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [exactX, exactY]);

    if (!isVisible) return null;

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                @media (pointer: fine) {
                    html:not(:has(.custom-cursor-disabled:hover)) * { 
                        cursor: none !important; 
                    }
                }
            `}} />

            {/* Trailing Luxury Paw Print */}
            <motion.div
                style={{
                    position: 'fixed',
                    left: -20, // Center the 40px paw
                    top: -20,
                    width: 40,
                    height: 40,
                    pointerEvents: 'none',
                    zIndex: 9998,
                    x: springX,
                    y: springY,
                    mixBlendMode: 'difference',
                    color: '#F5E6C8', // Inverts beautifully
                }}
            >
                <svg viewBox="0 0 100 100" fill="currentColor">
                    {/* Main Plantar Pad */}
                    <path d="M49.9 83.2c-15-2.2-22.3-15.4-22.3-15.4-6.4-12.2-0.6-21.2 5.5-23.7 4.5-1.9 10.3 3.5 16.8 6.7 6.4-3.2 12.3-8.6 16.8-6.7 6.1 2.5 11.9 11.5 5.5 23.7 0 0-7.3 13.2-22.3 15.4z" />
                    {/* Digital Pads (Toes) */}
                    <ellipse cx="22.5" cy="40" rx="9" ry="14" transform="rotate(-30 22.5 40)" />
                    <ellipse cx="37" cy="22" rx="9" ry="14" transform="rotate(-10 37 22)" />
                    <ellipse cx="63" cy="22" rx="9" ry="14" transform="rotate(10 63 22)" />
                    <ellipse cx="77.5" cy="40" rx="9" ry="14" transform="rotate(30 77.5 40)" />
                </svg>
            </motion.div>

            {/* Exact Precision Dot */}
            <motion.div
                style={{
                    position: 'fixed',
                    left: -2, // Center the 4px dot
                    top: -2,
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: '#C97D0E',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    x: exactX,
                    y: exactY,
                    boxShadow: '0 0 12px rgba(201,125,14,0.8)'
                }}
            />
        </>
    );
}
