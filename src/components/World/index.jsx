'use client';

import React from 'react';
import Room from './Room';
import Floor from './Floor';
import Environment from './Environment';

export default function World({ device, onAssetsReady, floorCirclesRef, showFullModel, isModelRevealed, isMuted }) {
    return (
        <>
            {/* Always render the cube (Room) and environment */}
            <Room
                onAssetsReady={onAssetsReady}
                showOnlyCube={!showFullModel}
                isModelRevealed={isModelRevealed}
                isMuted={isMuted} 
            />

            {/* Render Floor and full Environment only when allowed */}
            {showFullModel && (
                <>
                    <Floor ref={floorCirclesRef} />
                    <Environment />
                </>
            )}
        </>
    );
}
