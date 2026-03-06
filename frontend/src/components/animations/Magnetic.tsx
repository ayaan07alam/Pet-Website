'use client';

import { motion } from 'framer-motion';
import { ReactNode, useRef, useState, useEffect } from 'react';

export default function Magnetic({ children, strength = 0.5 }: { children: ReactNode; strength?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Detect coarse pointers (touchscreens) to disable magnetic double-tap issues
        if (window.matchMedia('(pointer: coarse)').matches) {
            setIsTouchDevice(true);
        }
    }, []);

    const handleMouse = (e: React.MouseEvent) => {
        if (!ref.current || isTouchDevice) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        setPosition({ x: middleX * strength, y: middleY * strength });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    if (isTouchDevice) {
        return <>{children}</>;
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
            style={{ display: 'inline-block' }}
        >
            {children}
        </motion.div>
    );
}
