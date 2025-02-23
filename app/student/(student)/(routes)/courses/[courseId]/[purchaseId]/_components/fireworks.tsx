"use client";

import { useEffect, useRef } from "react";
import { Fireworks } from "fireworks-js";

export default function FireworksEffect() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const fireworks = new Fireworks(containerRef.current, {
            acceleration: 1.05,
            particles: 100,
            intensity: 5,
            explosion: 8,
        });

        fireworks.start();

        return () => fireworks.stop();
    }, []);

    return <div ref={containerRef} className="absolute bottom-96 left-32 z-50" />;
}
