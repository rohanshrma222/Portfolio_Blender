'use client';

import * as THREE from 'three';
import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import World from './World';
import Camera from './Camera';
import Controls from './Controls';

export default function Experience({ theme, device, onAssetsReady, assets }) { // Receive assets prop
  const floorCirclesRef = useRef();

  return (
    <Canvas
        className="experience-canvas"
        shadows
        gl={{ antialias: true, toneMapping: THREE.CineonToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
        onCreated={({ gl }) => { gl.toneMappingExposure = 1.75; }}
    >
        <Camera />
        <Suspense fallback={null}>
            <World 
                device={device}
                theme={theme}
                onAssetsReady={onAssetsReady}
                floorCirclesRef={floorCirclesRef}
            />
        </Suspense>
        {/* FIX: Use the `assets` state object to conditionally render and pass to Controls */}
        {assets && <Controls assets={assets} device={device} floorCircles={floorCirclesRef} />}
    </Canvas>
  );
}
