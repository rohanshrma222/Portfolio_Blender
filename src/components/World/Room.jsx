'use client';

import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations, useVideoTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';

export default function Room({ device, onAssetsReady }) {
    const group = useRef();
    const { scene, nodes, animations } = useGLTF('/room.glb');
    const { actions } = useAnimations(animations, group);
    
    // Video texture for the computer screen
    const videoTexture = useVideoTexture('/screen-video.mp4', { muted: true, loop: true, start: true });

    // This state handles the smooth rotation based on mouse movement
    const lerp = useRef({ current: 0, target: 0, ease: 0.1 });

    useEffect(() => {
        // --- Apply special materials and properties ---
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        // Apply glass material to the aquarium
        const aquariumGlass = nodes.Aquarium.children[0];
        aquariumGlass.material = new THREE.MeshPhysicalMaterial({
            roughness: 0,
            color: 0x549dd2,
            ior: 3,
            transmission: 1,
            opacity: 1,
            depthWrite: false,
            depthTest: false,
        });

        // Apply video texture to the computer screen
        const computerScreen = nodes.Computer.children[1];
        computerScreen.material = new THREE.MeshBasicMaterial({ map: videoTexture });

        // --- Play Animations ---
        if (actions.swim) {
            actions.swim.play();
        }

        // --- Mouse Move Listener ---
        const onMouseMove = (e) => {
            const rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            lerp.current.target = rotation * 0.1; // Reduced sensitivity
        };
        window.addEventListener("mousemove", onMouseMove);

        // --- Pass assets up for preloader animations ---
        onAssetsReady({
            actualRoom: group.current,
            roomChildren: { ...nodes },
        });

        return () => window.removeEventListener("mousemove", onMouseMove);

    }, [scene, nodes, actions, onAssetsReady, videoTexture]);
    
    // This hook applies the smooth (lerped) rotation on every frame
    useFrame((state, delta) => {
        lerp.current.current = gsap.utils.interpolate(
            lerp.current.current,
            lerp.current.target,
            lerp.current.ease
        );
        group.current.rotation.y = lerp.current.current;

        // Update animation mixer
        if (actions.swim) {
            actions.swim.getMixer().update(delta);
        }
    });

    const scale = device === 'desktop' ? 0.11 : 0.07;

    return (
        <group ref={group} scale={[scale, scale, scale]} dispose={null}>
            {/* We render the loaded scene directly */}
            <primitive object={scene}>
                 {/* Add the RectAreaLight declaratively */}
                 <rectAreaLight
                    width={0.5}
                    height={0.7}
                    intensity={1}
                    color={0xffffff}
                    position={[7.68, 7, 0.5]}
                    rotation-x={-Math.PI / 2}
                    rotation-z={Math.PI / 4}
                 />
            </primitive>
        </group>
    );
}
