'use client';

import * as THREE from 'three';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

// We use forwardRef to pass refs up to the parent component
const Floor = forwardRef((props, ref) => {
  const circle1 = useRef();
  const circle2 = useRef();
  const circle3 = useRef();

  // FIX: This now exposes the array of refs directly, instead of an object.
  // This is the correct format for the Controls component to use.
  useImperativeHandle(ref, () => ([
    circle1.current,
    circle2.current,
    circle3.current
  ]));

  return (
    <>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.7, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={0xffe6a2} side={THREE.BackSide} />
      </mesh>
      <mesh ref={circle1} receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.52, 0]} scale={[0, 0, 0]}>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color={0xe5a1aa} />
      </mesh>
      <mesh ref={circle2} receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[2, -0.51, 0]} scale={[0, 0, 0]}>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color={0x8395cd} />
      </mesh>
      <mesh ref={circle3} receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.50, 0]} scale={[0, 0, 0]}>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color={0x7ad0ac} />
      </mesh>
    </>
  );
});

Floor.displayName = 'Floor';
export default Floor;
