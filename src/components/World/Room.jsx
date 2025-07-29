'use client';

import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations, useVideoTexture } from '@react-three/drei';

export default function Room({ onAssetsReady, showOnlyCube, isMuted }) {
    const group = useRef();
    const { scene, nodes, animations } = useGLTF('/models/Room.glb');
    const { actions } = useAnimations(animations, group);

    // Create video texture
    const videoTexture = useVideoTexture('/screen-video.mp4', {
        muted: true,
        loop: true,
        start: true, // do not autoplay, we'll control playback
        crossOrigin: 'anonymous',
    });

    videoTexture.flipY = false;

    // Control video mute/unmute dynamically
    useEffect(() => {
        if (videoTexture?.image) {
            videoTexture.image.muted = isMuted;
        }
    }, [isMuted, videoTexture]);

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        // Apply video texture to monitor screen material
        if (nodes.monitor) {
            const monitorMesh = nodes.monitor;

            monitorMesh.traverse((child) => {
                if (child.isMesh) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach((mat) => {
                            if (mat.name === 'Material.090') {
                                mat.map = videoTexture;
                                mat.needsUpdate = true;
                            }
                        });
                    } else if (child.material?.name === 'Material.090') {
                        child.material.map = videoTexture;
                        child.material.needsUpdate = true;
                    }
                }
            });
        }

        // Example: Glass material for "chut"
        if (nodes['chut']) {
            nodes['chut'].material = new THREE.MeshPhysicalMaterial({
                roughness: 0,
                color: 0x549dd2,
                ior: 3,
                transmission: 1,
                opacity: 1,
            });
        }

        // Scale down animatable nodes initially
        const animatableNodes = [
            'desk', 'chair', 'drawer', 'Bed', 'tableitem',
            'monitor', 'shelve', 'floor', 'clock', 'chut', 'Body'
        ];
        animatableNodes.forEach((name) => {
            if (nodes[name]) nodes[name].scale.set(0, 0, 0);
        });

        // Play default animation
        if (actions && animations.length > 0) {
            actions[animations[0].name]?.play();
        }

        if (onAssetsReady) {
            onAssetsReady({
                room: group.current,
                nodes,
                setMutedAndPlay: () => {
                    if (videoTexture?.image) {
                        videoTexture.image.muted = false;
                        videoTexture.image.volume = 1;
                        videoTexture.image.play().catch(() => console.log("Autoplay blocked until user interaction"));
                    }
                },
                setMuted: () => {
                    if (videoTexture?.image) {
                        videoTexture.image.muted = true;
                    }
                }
            });
        }
    }, [scene, nodes, actions, animations, onAssetsReady, videoTexture]);

    // Cube-only toggle
    useEffect(() => {
        if (nodes) {
            Object.values(nodes).forEach((node) => {
                if (node.isMesh) {
                    node.visible = node.name === 'Cube' ? showOnlyCube : !showOnlyCube;
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
