'use client';

import React from 'react';
import Room from './Room';
import Floor from './Floor';
import Environment from './Environment';

export default function World({ device, theme, onAssetsReady, floorCirclesRef }) {
    return (
        <>
            <Floor ref={floorCirclesRef} />
            <Environment theme={theme} />
            <Room 
                device={device}
                onAssetsReady={onAssetsReady}
            />
        </>
    );
}
