'use client';

import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations, useVideoTexture } from '@react-three/drei';

export default function Room({ onAssetsReady, showOnlyCube }) {
    const group = useRef();
    const { scene, nodes, animations } = useGLTF('/models/Room.glb');
    const { actions } = useAnimations(animations, group);
    const videoTexture = useVideoTexture('/screen-video.mp4', { muted: true, loop: true, start: true });

    // This effect runs once to set up materials, shadows, and pass assets to the parent
    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        if (nodes.monitor) {
            nodes.monitor.material = new THREE.MeshBasicMaterial({ map: videoTexture });
        }

        if (nodes['Cube.004']) {
            nodes['Cube.004'].material = new THREE.MeshPhysicalMaterial({
                roughness: 0,
                color: 0x549dd2,
                ior: 3,
                transmission: 1,
                opacity: 1, // Keep opacity at 1
            });
        }

        if (actions && animations.length > 0) {
            actions[animations[0].name]?.play();
        }

        // Pass the essential assets to the main page for GSAP animations
        onAssetsReady?.({
            room: group.current,
            nodes,
        });

    }, [scene, nodes, actions, animations, onAssetsReady, videoTexture]);

    // This effect handles what part of the model is visible
    useEffect(() => {
        if (nodes) {
            Object.values(nodes).forEach(node => {
                // Ensure it's a mesh we can control
                if (node.isMesh) {
                    if (node.name === 'Cube') {
                        // The cube should ONLY be visible when showOnlyCube is true
                        node.visible = showOnlyCube;
                    } else {
                        // All other parts should ONLY be visible when showOnlyCube is false
                        node.visible = !showOnlyCube;
                    }
                }
            });
        }
    }, [nodes, showOnlyCube]);


    return (
        <group ref={group} dispose={null}>
            <primitive object={scene} />
        </group>
    );
}