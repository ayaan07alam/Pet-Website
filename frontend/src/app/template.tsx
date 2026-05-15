'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
            {/* The page curtain that slides up */}
            <motion.div
                initial={{ height: '100vh', top: 0 }}
                animate={{ height: 0, top: 0 }}
                exit={{ height: '100vh', top: 'auto', bottom: 0 }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    backgroundColor: '#FDF6EC',
                    zIndex: 999,
                    pointerEvents: 'none'
                }}
            />
            {/* The actual page content sliding in behind the curtain */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
                {children}
            </motion.div>
        </div>
    );
}
