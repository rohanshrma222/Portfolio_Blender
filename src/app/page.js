'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState, useCallback } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Hero from '@/components/Tool/Hero';
import ToggleBar from '@/components/Tool/ToggleBar';

const Experience = dynamic(() => import('@/components/Experience'), {
  ssr: false,
});

import { ThemeContext } from '@/context/ThemeContext';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [assets, setAssets] = useState(null);
  const [isIntroPlaying, setIsIntroPlaying] = useState(false);
  const [device, setDevice] = useState('desktop');
  const [showFullModel, setShowFullModel] = useState(false);
  const [isModelRevealed, setIsModelRevealed] = useState(false);



  useEffect(() => {
    const handleResize = () => {
      setDevice(window.innerWidth < 968 ? 'mobile' : 'desktop');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const handleThemeToggle = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.classList.toggle('dark-theme', newTheme === 'dark');
  }, [theme]);

  // Refresh ScrollTrigger and ASScroll after theme change to fix scroll jump
  useEffect(() => {
    ScrollTrigger.refresh();
    if (window.asscroll) window.asscroll.resize(); // or .update(), depending on your setup
  }, [theme]);

  useEffect(() => {
    if (assets && !isIntroPlaying) {
      setIsIntroPlaying(true);

      const playIntro = () => {
        console.log('Starting intro animation...');
        console.log('Intro cube exists?', !!assets.nodes.intro);

        const tl = gsap.timeline();
        // Set initial states for animation - start with cube visible, then animate
        tl.set(".intro-text", { y: -100, opacity: 0 });

        // Add a delay so user can see the cube first
        tl.to({}, { duration: 2 }); // 2 second delay

        // Hide preloader
        tl.to(".preloader", {
          opacity: 0,
          duration: 1.0,
          onComplete: () => {
            document.querySelector(".preloader")?.classList.add("hidden");
          }
        });

        // Simple animation - just move cube down if it exists
        if (assets.nodes.intro) {
          tl.to(assets.nodes.intro.position, {
            y: 0,
            ease: "bounce.out",
            duration: 1.2
          }, "drop");
        }

        // Show welcome text
        tl.to(".intro-text", {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out"
        }, "drop+=0.3")

          // Show UI elements
          .to(".toggle-bar", { opacity: 1, duration: 0.5 }, "drop+=1.3")
          .to(".arrow-svg-wrapper", { opacity: 1, duration: 0.5 }, "drop+=1.3")

          // Show page content
          .from(".page-wrapper", {
            opacity: 0,
            duration: 1.0
          }, "drop+=1.4")

          // Set up scroll listener for model reveal
          .call(() => {
            window.addEventListener("wheel", revealFullModel, { once: true });
          });
      };

      const revealFullModel = () => {
        const tl = gsap.timeline();

        // Hide intro elements
        tl.to([".intro-text", ".arrow-svg-wrapper"], {
          opacity: 0,
          duration: 0.5
        }, "fadeout");

        // Rotate and scale down cube - only if cube exists
        if (assets.nodes.intro) {
          tl.to(assets.nodes.intro.rotation, {
            y: 2 * Math.PI + Math.PI / 4,
            duration: 1.0,
            ease: "power2.out"
          }, "sync")

            .to(assets.nodes.intro.scale, {
              x: 0,
              y: 0,
              z: 0,
              duration: 0.5
            }, "sync+=0.5");
        }

        // Reveal full model and ensure room is visible
        tl.call(() => {
          setShowFullModel(true);
          setIsModelRevealed(true);

          // Ensure room is visible and positioned correctly
          if (assets.room) {
            assets.room.visible = true;
            assets.room.position.set(0, 0, 0);
            assets.room.updateMatrix();
            assets.room.updateMatrixWorld(true);
          }
        })

          // Show hero content immediately
          .to(".hero-main-title, .hero-main-description, .hero-second-subheading", {
            opacity: 1,
            stagger: 0.1,
            duration: 0.5
          }, "reveal")

          .to(assets.nodes.chut.scale, {
            x: 1.5,
            y: 1.5,
            z: 1.5,
            ease: "back.out(2.2)",
            duration: 0.5
          })

          // Spin
          .to(assets.nodes.chut.rotation, {
            y: "+=" + Math.PI * 2, // full 360-degree spin
            ease: "power2.inOut",
            duration: 0.8
          })

          // Shrink to zero
          .to(assets.nodes.chut.scale, {
            x: 0,
            y: 0,
            z: 0,
            ease: "back.in(2)",
            duration: 0.4
          },)
          .to(assets.nodes.Body?.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5
          }, "reveal+=1.7")

          .to(assets.nodes.drawer?.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5
          }, "reveal+=1.7")
          .to(assets.nodes.desk?.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5
          }, "reveal+=1.9")


          .to(assets.nodes.Bed?.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5
          }, "reveal+=2.1")
          .to(assets.nodes.tableitem?.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5
          }, "reveal+=2.3")
          .to(assets.nodes.monitor?.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5
          }, "reveal+=2.5")
          .to(assets.nodes.shelve?.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5
          }, "reveal+=2.7")
          .to(assets.nodes.floor.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5
          }, "reveal+=2.9")
          .to(assets.nodes.clock.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5
          }, "reveal+=3.1")


          .to(assets.nodes.chair?.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5
          }, ">-0.4")

          // .to(assets.nodes.minifloor?.scale, {
          //   x: 1,
          //   y: 1,
          //   z: 1,
          //   ease: "back.out(2.2)",
          //   duration: 0.5
          // }, "reveal+=0.3")

          .to(assets.nodes.chair?.rotation, {
            y: 2.1 * Math.PI,
            ease: "power2.out",
            duration: 1
          }, "<");
      };

      // Add a small delay to ensure everything is ready
      setTimeout(playIntro, 100);
    }
  }, [assets, isIntroPlaying, device]);



  return (
    <div className="experience-wrapper">
      <ThemeContext.Provider value={theme}>
        <Experience
          device={device}
          onAssetsReady={setAssets}
          assets={assets}
          showFullModel={showFullModel}
          isModelRevealed={isModelRevealed}
        />
      </ThemeContext.Provider>

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
          {/* <section className="hero">
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
          <section className="third-section section left"></section> */}
          <Hero />
        </div>
      </div>

      {/* <div className="toggle-bar" style={{ opacity: 0 }}>
          <div className="sun-wrapper">
            {/* [SVG icons truncated for brevity] */}
      {/* </div>
        <button className="toggle-button" onClick={handleThemeToggle}>
          <div className="toggle-circle"></div>
        </button>
        <div className="moon-wrapper">
          <button
            className="sound-button"
            onClick={() => {
              if (isMuted) {
                assets?.setMutedAndPlay?.();
                setIsMuted(false);
              } else {
                assets?.setMuted?.();
                setIsMuted(true);
              }
            }}
            style={{ marginLeft: '10px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'white' }}>
            {isMuted ? '🔇' : '🔊'}
          </button>
          {/* [SVG icons truncated for brevity] */}
      {/* </div> */}
      <ToggleBar assets={assets} theme={theme} onThemeToggle={handleThemeToggle} />
    </div>
  );
}
