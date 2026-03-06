'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);

    // High-performance motion values
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Physics-based spring config for the trailing ring
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Only show custom cursor on non-touch devices
        if (window.matchMedia('(pointer: coarse)').matches) return;

        setIsVisible(true);

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16); // Center the 32px ring
            cursorY.set(e.clientY - 16);
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [cursorX, cursorY]);

    if (!isVisible) return null;

    return (
        <motion.div
            style={{
                position: 'fixed',
                left: 0,
                top: 0,
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: '1px solid rgba(245, 230, 200, 0.5)',
                pointerEvents: 'none',
                zIndex: 9999,
                x: cursorXSpring,
                y: cursorYSpring,
                mixBlendMode: 'difference' // Elegant blending effect on different backgrounds
            }}
        >
            {/* Center dot */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 6,
                height: 6,
                background: '#F5E6C8',
                borderRadius: '50%'
            }} />
        </motion.div>
    );
}
