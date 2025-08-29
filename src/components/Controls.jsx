'use client';

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Controls({ assets, device, floorCircles }) {
  const { camera, size } = useThree();

  useEffect(() => {
    if (!assets || !floorCircles.current) return;

    gsap.registerPlugin(ScrollTrigger);
    document.querySelector(".page").style.overflow = "visible";

    let asscroll;
    const initSmoothScroll = async () => {
      if (device !== 'mobile') {
        const ASScroll = (await import('@ashthornton/asscroll')).default;
        asscroll = new ASScroll({ ease: 0.1, disableRaf: true, });
        gsap.ticker.add(asscroll.update);
        ScrollTrigger.defaults({ scroller: asscroll.containerElement });
        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
          scrollTop(value) { return arguments.length ? (asscroll.currentPos = value) : asscroll.currentPos; },
          getBoundingClientRect() { return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }; },
        });
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
        requestAnimationFrame(() => asscroll.enable({ newScrollElements: document.querySelectorAll(".page") }));
      }
      setupMainAnimationTimeline();
    };

    // Ensure all sections start hidden
    // The lines below are commented out as section visibility is now handled in Hero.jsx
    // gsap.set([".about-section", ".work-section", ".contact-section"], {
    //     opacity: 0,
    //     pointerEvents: "none"
    // });

    const setupMainAnimationTimeline = () => {
      const animatedNodes = [
        assets.nodes.Mailbox,
        assets.nodes.Lamp,
        assets.nodes.Floorfirst,
        assets.nodes.Floorsecond,
        assets.nodes.flower1,
        assets.nodes.flower2
      ];
      animatedNodes.forEach(node => node?.scale.set(0, 0, 0));
      assets.nodes.Minifloor?.scale.set(0.001, 0.001, 0.001);

      const room = assets.room;
      const rectLight = room.getObjectByName("RectAreaLight");
      let outdoorSceneHasPlayed = false;

      ScrollTrigger.matchMedia({
        "(min-width: 969px)": () => {
          room.scale.set(0.11, 0.11, 0.11);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".portfolio-container",
              start: "top top",
              end: "+=18000", // adjust to feel right
              scrub: 0.6,
              pin: true,
              anticipatePin: 1
            }
          });

          // PHASE 1: Model moves right
          tl.to(room.position, { x: size.width * 0.0003, duration: 1 }, "phase1")
            .to(floorCircles.current[0].scale, { x: 3, y: 3, z: 3, duration: 1.5 }, "phase1");

          // PHASE 2: Model scales
          tl.to(room.position, { x: 0.8, duration: 1 }, "phase2")
            .to(room.scale, { x: 0.4, y: 0.4, z: 0.4, duration: 1 }, "phase2")
            .to(rectLight, { width: 2, height: 2.8, duration: 1 }, "phase2")
            .to(floorCircles.current[1].scale, { x: 3, y: 3, z: 3, duration: 1.5 }, "phase2");

          // PHASE 3: Camera moves
          tl.to(camera.position, { y: 1, x: 2, duration: 1 }, "phase3")
            .to(floorCircles.current[2].scale, { x: 3, y: 3, z: 3, duration: 1.5 }, "phase3")
            .call(() => {
              if (!outdoorSceneHasPlayed) {
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
        }
      });
    };

    initSmoothScroll();

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      ScrollTrigger.clearMatchMedia();
      if (asscroll) {
        asscroll.disable();
        gsap.ticker.remove(asscroll.update);
      }
    };
  }, [assets, device, floorCircles, camera, size]);

  return null;
}