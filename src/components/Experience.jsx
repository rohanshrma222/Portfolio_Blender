'use client';

import * as THREE from 'three';
import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, OrthographicCamera, useProgress, Html, useGLTF, useVideoTexture } from '@react-three/drei';
import gsap from 'gsap';

// --- Child Components for the Experience ---

function CameraAndControls() {
  const [useOrthographic, setUseOrthographic] = useState(true);
  return (
    <>
      <PerspectiveCamera makeDefault={!useOrthographic} fov={35} near={0.1} far={1000} position={[29, 14, 12]} />
      <OrthographicCamera makeDefault={useOrthographic} position={[0, 5.65, 10]} rotation={[-Math.PI / 6, 0, 0]} zoom={100} near={-50} far={50} />
      <OrbitControls enableDamping={true} enableZoom={false} />
    </>
  );
}

// The Room component now accepts a `device` prop to adjust its scale.
function Room({ device, onAssetsReady, onWorldReady }) {
    const { scene, nodes } = useGLTF('/room.glb');
    const videoTexture = useVideoTexture('/screen-video.mp4', { muted: true, loop: true, start: true });

    useEffect(() => {
        const assets = {
            actualRoom: scene,
            roomChildren: {
                cube: nodes.Cube || scene,
                body: nodes.Body,
                aquarium: nodes.Aquarium,
                clock: nodes.Clock,
                shelves: nodes.Shelves,
                floor_items: nodes.Floor_Items,
                desks: nodes.Desks,
                table_stuff: nodes.Table_Stuff,
                computer: nodes.Computer,
                chair: nodes.Chair,
                fish: nodes.Fish,
                mini_floor: nodes.Mini_Floor,
            }
        };
        onAssetsReady(assets);
        onWorldReady();

        // Use the `device` prop to set the initial scale, just like in your original code.
        const scale = device === 'desktop' ? 0.11 : 0.07;
        scene.scale.set(scale, scale, scale);

        // Set initial animation scales
        Object.values(assets.roomChildren).forEach(child => {
            if (child && child.scale) child.scale.set(0, 0, 0);
        });
        if(assets.roomChildren.chair) assets.roomChildren.chair.scale.set(1,1,1);

    }, [scene, nodes, onAssetsReady, onWorldReady, device]);

    return (
        <primitive object={scene}>
            <mesh geometry={nodes.ScreenMesh?.geometry} position={nodes.ScreenMesh?.position}>
                <meshBasicMaterial map={videoTexture} toneMapped={false} />
            </mesh>
        </primitive>
    );
}

// The Preloader now also accepts the `device` prop for its animations.
function PreloaderAndAnimations({ device }) {
    const [worldReady, setWorldReady] = useState(false);
    const [assets, setAssets] = useState(null);
    const [isIntroPlaying, setIntroPlaying] = useState(false);
    const { camera } = useThree();
    const { progress } = useProgress();

    useEffect(() => {
        if (worldReady && assets && !isIntroPlaying) {
            setIntroPlaying(true);
            
            const playIntro = () => {
                const timeline = gsap.timeline();
                timeline.to(".preloader", {
                    opacity: 0,
                    delay: 1,
                    onComplete: () => document.querySelector(".preloader")?.classList.add("hidden"),
                })
                // Use the `device` prop to change the animation
                .to(assets.actualRoom.position, { 
                    x: device === 'desktop' ? -1 : 0,
                    z: device === 'desktop' ? 0 : -1, // Added mobile logic
                    duration: 0.7, 
                    ease: "power1.out" 
                }, ">")
                .to(".intro-text", {
                    opacity: 1,
                    duration: 0.5,
                    onComplete: () => window.addEventListener("wheel", playSecondIntro, { once: true }),
                }, ">-0.5");
            };
            
            const playSecondIntro = () => {
                const timeline = gsap.timeline();
                timeline.to(".intro-text", { opacity: 0, duration: 0.5 })
                .to(assets.actualRoom.position, { x: 0, y: 0, z: 0, duration: 1.0, ease: "power2.out" }, "<")
                .to(assets.roomChildren.computer.scale, { x: 1, y: 1, z: 1, ease: "back.out(2.2)", duration: 0.5 }, ">-0.5")
                .to(assets.roomChildren.shelves.scale, { x: 1, y: 1, z: 1, ease: "back.out(2.2)", duration: 0.5 }, ">-0.4")
                .to(assets.roomChildren.desks.scale, { x: 1, y: 1, z: 1, ease: "back.out(2.2)", duration: 0.5 }, ">-0.3")
                .to(".hero-main-title", { opacity: 1, duration: 0.5 });
            };

            playIntro();
        }
    }, [worldReady, assets, camera, isIntroPlaying, device]);

    return (
        <>
            <Html center>
                <div className="preloader" style={{ backgroundColor: '#1a1a1a', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h1 className="loading-text" style={{ color: 'white', fontSize: '2rem' }}>{Math.round(progress)}%</h1>
                </div>
                <div className="intro-text" style={{ opacity: 0, color: 'white', fontSize: '2rem', textAlign: 'center' }}>Welcome</div>
                <div className="hero-main-title" style={{ opacity: 0, color: 'white', fontSize: '4rem', textAlign: 'center' }}>Main Title</div>
            </Html>
            
            <Room 
                device={device}
                onWorldReady={() => setWorldReady(true)} 
                onAssetsReady={(assets) => setAssets(assets)} 
            />
        </>
    );
}

// --- The Main Experience Component ---
export default function Experience() {
  // This state and effect hook replaces your `Size.js` logic.
  const [device, setDevice] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth < 968) {
            setDevice('mobile');
        } else {
            setDevice('desktop');
        }
    };
    
    handleResize(); // Set initial device
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Canvas
        gl={{ antialias: true, toneMapping: THREE.CineonToneMapping }}
        onCreated={({ gl }) => {
            gl.toneMappingExposure = 1.75;
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
    >
        <Suspense fallback={null}>
            <CameraAndControls />
            {/* We pass the device down as a prop */}
            <PreloaderAndAnimations device={device} />
        </Suspense>
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} castShadow />
    </Canvas>
  );
}
