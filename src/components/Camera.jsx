'use client';

import React from 'react';
import { PerspectiveCamera, OrthographicCamera, OrbitControls } from '@react-three/drei';

export default function Camera() {
  return (
    <>
      <PerspectiveCamera makeDefault={false} fov={35} near={0.1} far={1000} position={[29, 14, 10]} />
      {/* FIX: Changed rotation on the X-axis from -Math.PI / 6 to -Math.PI / 8 to tilt the camera up slightly. */}
      <OrthographicCamera makeDefault={true} position={[1, 5.65, 10]} rotation={[-Math.PI / 8, 1, 0]} zoom={700} near={-50} far={50} />
      <OrbitControls enableDamping={true} enableZoom={false} />
    </>
  );
}
