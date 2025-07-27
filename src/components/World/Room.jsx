'use client';

import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';
import { useGLTF, useAnimations, useVideoTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';

function Model({ scene, animations, nodes, onAssetsReady, visible }) {
    const group = useRef();
    const { actions } = useAnimations(animations, group);
    const videoTexture = useVideoTexture('/screen-video.mp4', { muted: true, loop: true, start: true });
    const lerp = useRef({ current: 0, target: 0, ease: 0.1 });

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        if (nodes.monitorscreen) {
            nodes.monitorscreen.material = new THREE.MeshBasicMaterial({ map: videoTexture });
        }

        if (nodes['Cube.004']) {
            nodes['Cube.004'].material = new THREE.MeshPhysicalMaterial({
                roughness: 0,
                color: 0x549dd2,
                ior: 3,
                transmission: 1,
                opacity: 0,
            });
        }

        if (actions && animations.length > 0) {
            actions[animations[0].name]?.play();
        }

        const onMouseMove = (e) => {
            const rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            lerp.current.target = rotation * 0.05;
        };
        window.addEventListener("mousemove", onMouseMove);

        onAssetsReady?.({
            room: group.current,
            nodes,
        });

        return () => window.removeEventListener("mousemove", onMouseMove);
    }, [scene, nodes, actions, animations, onAssetsReady, videoTexture]);

    useEffect(() => {
        if (group.current) {
            gsap.to(group.current.position, {
                y: visible ? -1.8 : -5,
                duration: 1,
                ease: 'power2.out',
            });

            gsap.to(group.current.material ?? {}, {
                opacity: visible ? 1 : 0,
                duration: 1,
                ease: 'power2.out',
                onUpdate: () => {
                    // optional live update
                },
            });

            group.current.visible = visible;
        }
    }, [visible]);

    useFrame((state, delta) => {
        if (group.current && visible) {
            lerp.current.current = gsap.utils.interpolate(
                lerp.current.current,
                lerp.current.target,
                lerp.current.ease
            );
            group.current.rotation.y = lerp.current.current;

            if (animations.length > 0) {
                actions[animations[0].name]?.getMixer().update(delta);
            }
        }
    });

    return (
        <group ref={group} dispose={null} position={[0, -5, 0]} visible={false}>
            <primitive object={scene} />
        </group>
    );
}

export default function Room({ onAssetsReady }) {
    const { scene, nodes, animations } = useGLTF('/models/Room.glb');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            // Trigger model to show after 300px scroll
            setVisible(scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Model
            scene={scene}
            nodes={nodes}
            animations={animations}
            onAssetsReady={onAssetsReady}
            visible={visible}
        />
    );
}
