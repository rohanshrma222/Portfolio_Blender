'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import gsap from 'gsap';

// Dynamically import the Experience component with SSR turned off.
const Experience = dynamic(() => import('@/components/Experience'), {
  ssr: false,
});

export default function App() {
  const [theme, setTheme] = useState('light');
  const [assets, setAssets] = useState(null);
  const [isIntroPlaying, setIsIntroPlaying] = useState(false);
  const [device, setDevice] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
        setDevice(window.innerWidth < 968 ? 'mobile' : 'desktop');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.classList.toggle('dark-theme', newTheme === 'dark');
  };

  // All animation logic now lives here, in the main page component.
  useEffect(() => {
    if (assets && !isIntroPlaying) {
        setIsIntroPlaying(true);
        
        const playIntro = () => {
            const tl = gsap.timeline();
            tl.to(".preloader", { opacity: 0, duration: 1.0, onComplete: () => { document.querySelector(".preloader")?.classList.add("hidden"); } })
            .to(assets.room.position, { x: device === 'desktop' ? 0.05 : 0, z: device === 'desktop' ? -1 : -1, duration: 0.7, ease: "power1.out" }, ">")
            .to(".intro-text", { opacity: 1, duration: 0.5 }, ">-0.5")
            .to(".toggle-bar", { opacity: 1, duration: 0.5 }, "<")
            .to(".arrow-svg-wrapper", { opacity: 1, duration: 0.5 }, "<")
            .call(() => { window.addEventListener("wheel", playSecondIntro, { once: true }); });
        };

        const playSecondIntro = () => {
            const tl = gsap.timeline();
            // FIX: Removed the "cube engulf" effect animations
            tl.to(".intro-text", { opacity: 0, duration: 0.5 }, "fadeout")
            .to(".arrow-svg-wrapper", { opacity: 0, duration: 0.5 }, "fadeout")
            .to(assets.room.position, { x: 0, y: 0, z: 0, duration: 1.0, ease: "power2.out" }, "sync")
            .to(".hero-main-title, .hero-main-description, .hero-second-subheading", { opacity: 1, stagger: 0.1, duration: 0.5 }, "reveal")
            .to(assets.nodes['upper-objects'].scale, { x: 1, y: 1, z: 1, ease: "back.out(2.2)", duration: 0.5 }, "reveal+=0.2")
            .to(assets.nodes.Drawer.scale, { x: 1, y: 1, z: 1, ease: "back.out(2.2)", duration: 0.5 }, ">-0.4")
            .to(assets.nodes.bed.scale, { x: 1, y: 1, z: 1, ease: "back.out(2.2)", duration: 0.5 }, ">-0.4")
            .to(assets.nodes['table all'].scale, { x: 1, y: 1, z: 1, ease: "back.out(2.2)", duration: 0.5 }, ">-0.4")
            .to(assets.nodes.Chair.scale, { x: 1, y: 1, z: 1, ease: "back.out(2.2)", duration: 0.5 }, ">-0.4")
            .to(assets.nodes.Chair.rotation, { y: 4 * Math.PI, ease: "power2.out", duration: 1 }, "<");
        };

        playIntro();
    }
  }, [assets, isIntroPlaying, device]);

  return (
    <div className="experience-wrapper">
      <Experience 
        theme={theme} 
        device={device}
        onAssetsReady={setAssets} 
      />

      <div className="preloader">
        <div className="preloader-wrapper">
          <div className="loading">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
      </div>

      <div className="page" asscroll-container="true">
        <div className="page-wrapper" asscroll="true">
          <section className="hero">
            <div className="hero-wrapper">
              <div className="intro-text" style={{ opacity: 0 }}>Welcome to my portfolio!</div>
              <div className="arrow-svg-wrapper" style={{ opacity: 0 }}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path fill="currentColor" d="M12 14.95q-.2 0-.375-.063-.175-.062-.325-.212L6.675 10.05q-.275-.275-.262-.688.012-.412.287-.687.275-.275.7-.275.425 0 .7.275l3.9 3.9 3.925-3.925q.275-.275.688-.263.412.013.687.288.275.275.275.7 0 .425-.275.7l-4.6 4.6q-.15.15-.325-.212-.175.063-.375.063Z"/></svg>
              </div>
              <div className="hero-main">
                <h1 className="hero-main-title" style={{ opacity: 0 }}>Abigail Bloom</h1>
                <p className="hero-main-description" style={{ opacity: 0 }}>Digital Media Student | 3D Artist</p>
              </div>
              <div className="hero-second">
                <p className="hero-second-subheading first-sub" style={{ opacity: 0 }}>ABIGAILBLOOM</p>
                <p className="hero-second-subheading second-sub" style={{ opacity: 0 }}>PORTFOLIO</p>
              </div>
            </div>
          </section>
          <div className="first-move section-margin"></div>
          <section className="first-section section left"></section>
          <div className="second-move section-margin"></div>
          <section className="second-section section right"></section>
          <div className="third-move section-margin"></div>
          <section className="third-section section left"></section>
        </div>
      </div>

      <div className="toggle-bar" style={{ opacity: 0 }}>
        <button className="toggle-button" onClick={handleThemeToggle}>
          <div className="toggle-circle"></div>
        </button>
      </div>
    </div>
  );
}
