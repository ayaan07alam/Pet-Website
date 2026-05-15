'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlobalPreloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Check if we already loaded in this session to avoid annoying the user on every hard refresh, 
        // though for "award winning" sites they sometimes run it every time. 
        // We will run it once per session.
        const hasLoaded = sessionStorage.getItem('rumzees_preloader_done');
        if (hasLoaded) {
            setIsLoading(false);
            return;
        }

        // Lock body scroll
        document.body.style.overflow = 'hidden';
        
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += Math.floor(Math.random() * 15) + 5;
            if (currentProgress > 100) currentProgress = 100;
            setProgress(currentProgress);
            
            if (currentProgress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsLoading(false);
                    sessionStorage.setItem('rumzees_preloader_done', 'true');
                    document.body.style.overflow = '';
                }, 600); // Wait a bit at 100%
            }
        }, 120);

        return () => {
            clearInterval(interval);
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ y: 0 }}
                    exit={{ y: '-100vh' }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: '#FDF6EC',
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div style={{ overflow: 'hidden' }}>
                        <motion.h1 
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            style={{ 
                                fontFamily: "'Outfit', sans-serif", 
                                fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                                fontWeight: 800, 
                                color: '#2C1A0E',
                                margin: 0,
                                letterSpacing: '-0.02em'
                            }}
                        >
                            Rumzee&apos;s Exotics
                        </motion.h1>
                    </div>
                    
                    <div style={{ marginTop: 40, width: 240, height: 2, background: 'rgba(44,26,14,0.1)', borderRadius: 2, overflow: 'hidden' }}>
                        <motion.div 
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.2, ease: "linear" }}
                            style={{ height: '100%', background: '#C97D0E' }}
                        />
                    </div>
                    
                    <div style={{ marginTop: 16, fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: '#C97D0E', letterSpacing: '2px' }}>
                        {progress}%
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
