'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import gsap from 'gsap';

const Experience = dynamic(() => import('@/components/Experience'), {
  ssr: false,
});

export default function App() {
  const [theme, setTheme] = useState('light');
  const [assets, setAssets] = useState(null);
  const [isIntroPlaying, setIsIntroPlaying] = useState(false);
  const [device, setDevice] = useState('desktop');
  const [showFullModel, setShowFullModel] = useState(false);

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

  useEffect(() => {
    if (assets && !isIntroPlaying) {
      setIsIntroPlaying(true);

      const playIntro = () => {
        const tl = gsap.timeline();

        tl.set(assets.nodes.Cube.scale, { x: 0.2, y: 0.2, z: 0.2 });
        tl.set(assets.nodes.Cube.position, { y: 5 });
        tl.set(".intro-text", { y: -100 });

        tl.to(".preloader", {
          opacity: 0,
          duration: 1.0,
          onComplete: () => {
            document.querySelector(".preloader")?.classList.add("hidden");
          }
        })

        .to(assets.nodes.Cube.position, {
          y: 0,
          ease: "bounce.out",
          duration: 1.2
        }, "drop")

        .to(assets.nodes.Cube.scale, {
          x: 2,
          y: 2,
          z: 2,
          ease: "back.out(1.7)",
          duration: 1.0
        }, "drop+=0.2")

        .to(".intro-text", {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out"
        }, "drop+=0.3")

        .to(".toggle-bar", { opacity: 1, duration: 0.5 }, "drop+=1.3")
        .to(".arrow-svg-wrapper", { opacity: 1, duration: 0.5 }, "drop+=1.3")

        .from(".page-wrapper", {
          opacity: 0,
          duration: 1.0
        }, "drop+=1.4")

        .call(() => {
          window.addEventListener("wheel", playSecondIntro, { once: true });
          setShowFullModel(true);
        });
      };

      const playSecondIntro = () => {
        const tl = gsap.timeline();

        gsap.set(assets.room.position, { y: -15 });

        tl.to([".intro-text", ".arrow-svg-wrapper"], {
          opacity: 0,
          duration: 0.5
        }, "fadeout")

        .to(assets.nodes.Cube.rotation, {
          y: 2 * Math.PI + Math.PI / 4,
          duration: 1.0,
          ease: "power2.out"
        }, "sync")

        .to(assets.nodes.Cube.scale, {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.5
        }, "sync+=0.5")

        .to(assets.room.position, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1.0,
          ease: "power2.out"
        }, "sync")

        .to(".hero-main-title, .hero-main-description, .hero-second-subheading", {
          opacity: 1,
          stagger: 0.1,
          duration: 0.5
        }, "reveal")

        .to(assets.nodes.desk?.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5
        }, "reveal+=0.2")

        .to(assets.nodes.chair?.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5
        }, ">-0.4")

        .to(assets.nodes.minifloor?.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5
        }, "reveal+=0.3")        

        .to(assets.nodes.chair?.rotation, {
          y: 2.1 * Math.PI,
          ease: "power2.out",
          duration: 1
        }, "<");
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
        assets={assets}
        showFullModel={showFullModel}
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
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                  <path fill="currentColor" d="M12 14.95q-.2 0-.375-.063-.175-.062-.325-.212L6.675 10.05q-.275-.275-.262-.688.012-.412.287-.687.275-.275.7-.275.425 0 .7.275l3.9 3.9 3.925-3.925q.275-.275.688-.263.412.013.687.288.275.275.275.7 0 .425-.275.7l-4.6 4.6q-.15.15-.325-.212-.175.063-.375.063Z" />
                </svg>
              </div>
              <div className="hero-main">
                <h1 className="hero-main-title" style={{ opacity: 0 }}>Rohan Sharma</h1>
                <p className="hero-main-description" style={{ opacity: 0 }}>Full Stack Web Developer</p>
              </div>
              <div className="hero-second">
                <p className="hero-second-subheading first-sub" style={{ opacity: 0 }}>ROHAN SHARMA</p>
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
        <div className="sun-wrapper">
          {/* [SVG icons truncated for brevity] */}
        </div>
        <button className="toggle-button" onClick={handleThemeToggle}>
          <div className="toggle-circle"></div>
        </button>
        <div className="moon-wrapper">
          {/* [SVG icons truncated for brevity] */}
        </div>
      </div>
    </div>
  );
}
