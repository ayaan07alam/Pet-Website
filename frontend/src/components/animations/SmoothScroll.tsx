'use client';

import { ReactLenis } from '@studio-freight/react-lenis';

export default function SmoothScroll({ children }: { children: any }) {
    return (
        <ReactLenis root options={{ lerp: 0.07, smoothWheel: true, wheelMultiplier: 1.2 }}>
            {children}
        </ReactLenis>
    );
}
