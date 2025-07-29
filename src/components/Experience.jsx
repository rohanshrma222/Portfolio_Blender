'use client';

import * as THREE from 'three';
import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import World from './World';
import Camera from './Camera';
import Controls from './Controls';

export default function Experience({ device, onAssetsReady, assets, showFullModel, isModelRevealed, isMuted }) { 
  const floorCirclesRef = useRef();

  return (
    <Canvas
      className="experience-canvas"
      shadows
      gl={{
        antialias: true,
        toneMapping: THREE.CineonToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 1.75;
      }}
    >
      <Camera />

      <Suspense fallback={null}>
        <World
          device={device}
          onAssetsReady={onAssetsReady}
          floorCirclesRef={floorCirclesRef}
          showFullModel={showFullModel}
          isModelRevealed={isModelRevealed}
          isMuted={isMuted}       // ✅ Pass down to World → Room
        />
      </Suspense>

      {assets && (
        <Controls
          assets={assets}
          device={device}
          floorCircles={floorCirclesRef}
          isModelRevealed={isModelRevealed}
          isMuted={isMuted}       // ✅ Pass down if Controls needs sound state
        />
      )}
    </Canvas>
  );
}
