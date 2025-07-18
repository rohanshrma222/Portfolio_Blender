'use client';

import * as THREE from 'three';
import React from 'react';

export default function Floor() {
  return (
    <>
      {/* The main floor plane */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={0xffe6a2} side={THREE.BackSide} />
      </mesh>

      {/* The decorative circles */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.29, 0]}>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color={0xe5a1aa} />
      </mesh>
      
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[2, -0.28, 0]}>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color={0x8395cd} />
      </mesh>
      
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.27, 0]}>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color={0x7ad0ac} />
      </mesh>
    </>
  );
}