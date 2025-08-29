'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState, useCallback } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Hero from '@/components/Content/Hero';
import ToggleBar from '@/components/Content/ToggleBar';
import PortfolioSections from '@/components/Content/PortfolioSections';
import Preloader from '@/components/Content/Preloader';

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Experience = dynamic(() => import('@/components/Experience'), {
  ssr: false,
});

import { ThemeContext } from '@/context/ThemeContext';
import { Preload } from '@react-three/drei';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [assets, setAssets] = useState(null);
  const [isIntroPlaying, setIsIntroPlaying] = useState(false);
  const [revealHeroContent, setRevealHeroContent] = useState(false);
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

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  // Toggle theme
  const handleThemeToggle = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme); // persist
  }, [theme]);

  useEffect(() => {
    if (assets && !isIntroPlaying) {
      setIsIntroPlaying(true);

      const playIntro = () => {
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

        // Reveal full model and ensure room is visible
        tl.call(() => {
          setShowFullModel(true);
          setIsModelRevealed(true);

          if (assets.room) {
            assets.room.visible = true;
            assets.room.position.set(0, 0, 0);
            assets.room.updateMatrix();
            assets.room.updateMatrixWorld(true);
          }
        })

          .call(() => {
            setRevealHeroContent(true);
          }, null, "reveal")
          .to(".hero-main-title, .hero-main-description, .hero-second-subheading", {
            opacity: 1,
            stagger: 0.1,
            duration: 0.5
          }, "reveal")

          .to(assets.nodes.chut.scale, {
            x: 2,
            y: 2,
            z: 2,
            ease: "back.out(2.2)",
            duration: 0.5
          })

          .to(assets.nodes.chut.rotation, {
            y: "+=" + Math.PI * 2,
            ease: "power2.inOut",
            duration: 0.8
          })

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
          }, "reveal+=2.4")
          .to(assets.nodes.desk?.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5
          }, "reveal+=2.0")


          .to(assets.nodes.Bed?.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5
          }, "reveal+=2.6")
          .to(assets.nodes.tableitem?.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5
          }, "reveal+=2.4")
          .to(assets.nodes.monitor?.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5
          }, "reveal+=2.6")
          .to(assets.nodes.shelve?.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5
          }, "reveal+=2.8")
          .to(assets.nodes.floor.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5
          }, "reveal+=3.0")
          .to(assets.nodes.clock.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5
          }, "reveal+=3.2")
          .to(assets.nodes.chair?.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5
          }, ">-0.4")
          .to(assets.nodes.chair?.rotation, {
            y: 2.1 * Math.PI,
            ease: "power2.out",
            duration: 1
          }, "<");
      };

      setTimeout(playIntro, 100);
    }
  }, [assets, isIntroPlaying, device]);

  return (
    <div className="fixed w-screen h-screen top-0 left-0">
      <ThemeContext.Provider value={theme}>
        <Experience
          device={device}
          onAssetsReady={setAssets}
          assets={assets}
          showFullModel={showFullModel}
          isModelRevealed={isModelRevealed}
        />
      </ThemeContext.Provider>

      <Preloader />

      <div className="page relative top-0 left-0 w-full overflow-auto y-scroll z-10 bg-transparent" asscroll-container="true">
        <div className="page-wrapper" asscroll="true" style={{ height: "18000px" }}>
          <Hero revealHeroContent={revealHeroContent} />
          <PortfolioSections /> 
        </div>
      </div>
      <ToggleBar assets={assets} theme={theme} onThemeToggle={handleThemeToggle} />
    </div>
  );
}