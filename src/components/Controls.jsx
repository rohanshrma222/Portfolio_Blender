'use client';

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

export default function Controls({ assets, device, floorCircles }) {
  const { camera, size } = useThree();

  useEffect(() => {
    if (!assets || !floorCircles.current) return;

    let isInitialized = false;

    const initAnimations = async () => {
      if (isInitialized) return;
      isInitialized = true;
      
      // Dynamically import client-side libraries
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      document.querySelector(".page").style.overflow = "visible";

      let asscroll;
      if (device !== 'mobile') {
        try {
          const ASScroll = (await import('@ashthornton/asscroll')).default;
          asscroll = new ASScroll({ ease: 0.1, disableRaf: true });
          gsap.ticker.add(asscroll.update);
          ScrollTrigger.defaults({ scroller: asscroll.containerElement });
          ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) { return arguments.length ? (asscroll.currentPos = value) : asscroll.currentPos; },
            getBoundingClientRect() { return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }; },
          });
          asscroll.on("update", ScrollTrigger.update);
          ScrollTrigger.addEventListener("refresh", asscroll.resize);
          requestAnimationFrame(() => asscroll.enable({ newScrollElements: document.querySelectorAll(".page") }));
        } catch (error) {
          console.error("Failed to load ASScroll:", error);
        }
      }
      
      setupMainAnimationTimeline(gsap, ScrollTrigger);
    };

    const setupMainAnimationTimeline = (gsap, ScrollTrigger) => {
      const animatedNodes = [
        assets.nodes.Mailbox,
        assets.nodes.Lamp,
        assets.nodes.Floorfirst,
        assets.nodes.Floorsecond,
        assets.nodes.flower1,
        assets.nodes.flower2
      ].filter(Boolean); // Filter out any undefined nodes
      
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
          if(rectLight){
            rectLight.width = 0.5;
            rectLight.height = 0.7;
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".portfolio-container",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              pin: true,
              anticipatePin: 1
            }
          });

          tl.to(room.position, { x: size.width * 0.0003, duration: 1 }, "phase1")
            .to(floorCircles.current[0].scale, { x: 3, y: 3, z: 3, duration: 1.5 }, "phase1");

          tl.to(room.position, { x: 0.8, duration: 1 }, "phase2")
            .to(room.scale, { x: 0.4, y: 0.4, z: 0.4, duration: 1 }, "phase2")
            .to(rectLight, { width: 2, height: 2.8, duration: 1 }, "phase2")
            .to(floorCircles.current[1].scale, { x: 3, y: 3, z: 3, duration: 1.5 }, "phase2");

          tl.to(camera.position, { y: 1, x: 2, duration: 1 }, "phase3")
            .to(floorCircles.current[2].scale, { x: 3, y: 3, z: 3, duration: 1.5 }, "phase3")
            .call(() => {
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
          room.scale.set(0.07, 0.07, 0.07);
          if(rectLight){
            rectLight.width = 0.3;
            rectLight.height = 0.4;
          }
          
           const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".portfolio-container",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              pin: true,
              anticipatePin: 1
            }
          });

          tl.to(room.scale, { x: 0.1, y: 0.1, z: 0.1 }, "phase1");
          tl.to(room.position, { x: 1.5 }, "phase2");
          tl.to(room.scale, { x: 0.25, y: 0.25, z: 0.25 }, "phase2");
          tl.to(room.position, { z: -4.5 }, "phase3");
        }
      });
      
      const sections = document.querySelectorAll(".section");
      sections.forEach((section) => {
        const progressBar = section.querySelector(".progress-bar");
        gsap.from(progressBar, {
          scaleY: 0,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.4,
          },
        });
      });
    };

    initAnimations();

    return () => {
      if (ScrollTrigger.getAll) {
        ScrollTrigger.getAll().forEach(t => t.kill());
        ScrollTrigger.clearMatchMedia();
      }
    };
  }, [assets, device, floorCircles, camera, size]);

  return null;
}

