'use client';

import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Controls({ assets, device, floorCircles }) {
  const { camera, size } = useThree();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!assets || !floorCircles.current || isInitialized.current) return;
    
    isInitialized.current = true;

    const initSmoothScroll = async () => {
      if (device !== 'mobile') {
        try {
          const ASScroll = (await import('@ashthornton/asscroll')).default;
          const asscroll = new ASScroll({ ease: 0.1, disableRaf: true });

          gsap.ticker.add(asscroll.update);
          ScrollTrigger.defaults({ scroller: asscroll.containerElement });
          ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
              return arguments.length ? (asscroll.currentPos = value) : asscroll.currentPos;
            },
            getBoundingClientRect() {
              return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
          });
          asscroll.on("update", ScrollTrigger.update);
          ScrollTrigger.addEventListener("refresh", asscroll.resize);
          requestAnimationFrame(() => {
            asscroll.enable({ newScrollElements: document.querySelectorAll(".page") });
          });
          return asscroll;
        } catch (error) {
          console.error("Failed to load or initialize ASScroll:", error);
        }
      }
      return null;
    };

    const setupMainAnimationTimeline = () => {
      const animatedNodes = [
        assets.nodes.Mailbox, assets.nodes.Lamp, assets.nodes.Floorfirst,
        assets.nodes.Floorsecond, assets.nodes.flower1, assets.nodes.flower2
      ].filter(Boolean);

      animatedNodes.forEach(node => node.scale.set(0, 0, 0));
      if (assets.nodes.Minifloor) {
        assets.nodes.Minifloor.scale.set(0.001, 0.001, 0.001);
      }
      
      const room = assets.room;
      const rectLight = room.getObjectByName("RectAreaLight");
      let outdoorSceneHasPlayed = false;

      ScrollTrigger.matchMedia({
        "(min-width: 969px)": () => {
          room.scale.set(0.11, 0.11, 0.11);
          if (rectLight) {
            rectLight.width = 0.5;
            rectLight.height = 0.7;
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".portfolio-container",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
            },
          });

          // Phase 1: About
          tl.to(room.position, { x: size.width * 0.0003 }, "phase1")
            .to("#about", { opacity: 1, duration: 0.2 }, "phase1"); // ✨ FIX: Fade in "About" section
          if (floorCircles.current[0]) {
            tl.to(floorCircles.current[0].scale, { x: 3, y: 3, z: 3 }, "phase1");
          }

          // Phase 2: Work
          tl.to(room.position, { x: 0.8 }, "phase2")
            .to(room.scale, { x: 0.4, y: 0.4, z: 0.4 }, "phase2")
            .to("#about", { opacity: 0, duration: 0.2 }, "phase2") // ✨ FIX: Fade out "About"
            .to("#work", { opacity: 1, duration: 0.2 }, "phase2"); // ✨ FIX: Fade in "Work"
          if (rectLight) {
            tl.to(rectLight, { width: 2, height: 2.8 }, "phase2");
          }
          if (floorCircles.current[1]) {
            tl.to(floorCircles.current[1].scale, { x: 3, y: 3, z: 3 }, "phase2");
          }

          // Phase 3: Contact
          tl.to(camera.position, { y: 1, x: 2 }, "phase3")
            .to("#work", { opacity: 0, duration: 0.2 }, "phase3") // ✨ FIX: Fade out "Work"
            .to("#contact", { opacity: 1, duration: 0.2 }, "phase3"); // ✨ FIX: Fade in "Contact"
          if (floorCircles.current[2]) {
            tl.to(floorCircles.current[2].scale, { x: 3, y: 3, z: 3 }, "phase3");
          }
          tl.call(() => {
            if (!outdoorSceneHasPlayed && assets.nodes.Minifloor) {
              outdoorSceneHasPlayed = true;
              gsap.timeline()
                .to(assets.nodes.Minifloor.position, { x: -2.1379, z: 2 }, "start")
                .to(assets.nodes.Minifloor.scale, { x: 1, y: 1, z: 1, ease: "back.out(2)" }, "start")
                .to(animatedNodes.map(n => n.scale), {
                  x: 1, y: 1, z: 1,
                  ease: "back.out(2)",
                  stagger: 0.05
                }, "start+=0.2");
            }
          }, null, "phase3");
        },

        "(max-width: 968px)": () => {
          // Mobile animations (simplified)
          room.scale.set(0.07, 0.07, 0.07);
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".portfolio-container",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
            },
          });
          
          tl.to(room.scale, { x: 0.1, y: 0.1, z: 0.1 }, "phase1")
            .to("#about", { opacity: 1, duration: 0.2 }, "phase1")
            .to(room.position, { x: 1.5 }, "phase2")
            .to(room.scale, { x: 0.25, y: 0.25, z: 0.25 }, "phase2")
            .to("#about", { opacity: 0, duration: 0.2 }, "phase2")
            .to("#work", { opacity: 1, duration: 0.2 }, "phase2")
            .to(room.position, { z: -4.5 }, "phase3")
            .to("#work", { opacity: 0, duration: 0.2 }, "phase3")
            .to("#contact", { opacity: 1, duration: 0.2 }, "phase3");
        }
      });
    };

    const run = async () => {
      const asscroll = await initSmoothScroll();
      setupMainAnimationTimeline();
      return () => {
        if (asscroll) asscroll.destroy();
        ScrollTrigger.getAll().forEach(t => t.kill());
        ScrollTrigger.clearMatchMedia();
      };
    };

    const cleanupPromise = run();
    return () => {
      cleanupPromise.then(cleanup => cleanup && cleanup());
    };
  }, [assets, device, floorCircles, camera, size]);

  return null;
}