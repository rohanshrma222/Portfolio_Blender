'use client';

import React from 'react';
import Room from './Room';
import Floor from './Floor';
import { useProgress, Html } from '@react-three/drei';

// This component will manage the loading UI and animations
function Preloader({ onLoaded, assets, device }) {
    const { progress } = useProgress();

    // Your GSAP animation logic would go in a useEffect here,
    // triggered when `assets` is no longer null.
    
    // For now, we just show the loader and call onLoaded when ready.
    useEffect(() => {
        if (progress === 100) {
            // A small delay to ensure everything is rendered
            setTimeout(onLoaded, 500);
        }
    }, [progress, onLoaded]);

    return (
        <Html center>
            <div className="preloader" style={{ color: 'white' }}>
                {Math.round(progress)}% loaded
            </div>
        </Html>
    );
}


export default function World({ device, onAssetsReady, onWorldReady }) {
    return (
        <>
            {/* The Floor doesn't need any props for now */}
            <Floor />
            
            {/* The Room component handles loading itself and its assets */}
            <Room 
                device={device}
                onAssetsReady={onAssetsReady}
            />

            {/* We can add Environment and Controls components here later */}
        </>
    );
}
