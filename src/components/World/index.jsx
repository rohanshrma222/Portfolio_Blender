'use client';

import React from 'react';
import Room from './Room';
import Floor from './Floor';
import Environment from './Environment';
import { Kanchenjunga } from 'next/font/google';

export default function World({ device, theme, onAssetsReady, floorCirclesRef, showFullModel, isModelRevealed }) {
    return (
        <>
            {/* Always render the cube (Room) and environment */}
            <Room
                onAssetsReady={onAssetsReady}
                showOnlyCube={!showFullModel}
                isModelRevealed={isModelRevealed}
            />

            {/* Render Floor and full Environment only when allowed */}
            {showFullModel && (
                <>
                    <Floor ref={floorCirclesRef} />
                    <Environment theme={theme} />
                </>
            )}
        </>
    );
}
