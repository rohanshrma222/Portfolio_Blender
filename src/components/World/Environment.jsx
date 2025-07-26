'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Environment({ theme }) {
    const directionalLightRef = useRef();
    const ambientLightRef = useRef();

    useEffect(() => {
        if (directionalLightRef.current && ambientLightRef.current) {
            const sunLight = directionalLightRef.current;
            const ambient = ambientLightRef.current;
            
            // FIX: Using a much lighter blue for the dark theme color
            const darkThemeColors = { r: 0.35, g: 0.45, b: 0.85 };
            const lightThemeColors = { r: 1, g: 1, b: 1 };

            if (theme === 'dark') {
                gsap.to(sunLight.color, { ...darkThemeColors, duration: 1 });
                gsap.to(ambient.color, { ...darkThemeColors, duration: 1 });
                // FIX: Increased intensity further for a brighter dark mode.
                gsap.to(sunLight, { intensity: 1.5, duration: 1 });
                gsap.to(ambient, { intensity: 1.5, duration: 1 });
            } else {
                gsap.to(sunLight.color, { ...lightThemeColors, duration: 1 });
                gsap.to(ambient.color, { ...lightThemeColors, duration: 1 });
                gsap.to(sunLight, { intensity: 3, duration: 1 });
                gsap.to(ambient, { intensity: 1, duration: 1 });
            }
        }
    }, [theme]);

    return (
        <>
            <directionalLight
                ref={directionalLightRef}
                castShadow
                color={"#ffffff"}
                intensity={3}
                position={[-1.5, 7, 3]}
                shadow-camera-far={20}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-normalBias={0.05}
            />
            <ambientLight
                ref={ambientLightRef}
                color={"#ffffff"}
                intensity={1}
            />
        </>
    );
}
