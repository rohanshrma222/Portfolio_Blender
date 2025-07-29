'use client';

import React, { useEffect, useRef } from 'react';
import { PerspectiveCamera, OrthographicCamera, OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

export default function Camera() {
  const cameraRef = useRef();
  const { scene } = useThree();

  useEffect(() => {
    if (cameraRef.current) {
      // Make the camera look slightly upwards
      cameraRef.current.lookAt(0, 5, 0); // (x, y, z) → y=2 moves the view upwards
    }
  }, []);

  return (
    <>
      <PerspectiveCamera makeDefault={false} fov={35} near={0.1} far={1000} position={[29, 14, 10]} />
      <OrthographicCamera
        ref={cameraRef}
        makeDefault={true}
        position={[1, 5.65, 10]}
        zoom={780}
        near={-50}
        far={50}
      />
      <OrbitControls enableDamping={true} enableZoom={false} />
    </>
  );
}
