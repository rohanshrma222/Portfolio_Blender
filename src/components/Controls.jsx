'use client';

import React, { useEffect } from 'react';
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
                asscroll = new ASScroll({
                    ease: 0.1,
                    disableRaf: true,
                });
                gsap.ticker.add(asscroll.update);
                ScrollTrigger.defaults({ scroller: asscroll.containerElement });
                ScrollTrigger.scrollerProxy(asscroll.containerElement, {
                    scrollTop(value) { return arguments.length ? asscroll.currentPos = value : asscroll.currentPos; },
                    getBoundingClientRect() { return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }; },
                });
                asscroll.on("update", ScrollTrigger.update);
                ScrollTrigger.addEventListener("refresh", asscroll.resize);
                requestAnimationFrame(() => asscroll.enable());
            }
            setupScrollTriggers();
        };

        const setupScrollTriggers = () => {
            // Ensure the RectAreaLight is found before animating it
            const rectLight = assets.room.getObjectByName("RectAreaLight");

            ScrollTrigger.matchMedia({
                // --- Desktop Animations ---
                "(min-width: 969px)": () => {
                    assets.room.scale.set(0.11, 0.11, 0.11);
                    if(rectLight) {
                        rectLight.width = 0.5;
                        rectLight.height = 0.7;
                    }
                    
                    gsap.timeline({ scrollTrigger: { trigger: ".first-move", start: "top top", end: "bottom bottom", scrub: 0.6 } })
                        .to(assets.room.position, { x: size.width * 0.0014 });

                    const secondMoveTimeline = gsap.timeline({ scrollTrigger: { trigger: ".second-move", start: "top top", end: "bottom bottom", scrub: 0.6 } });
                    secondMoveTimeline.to(assets.room.position, { x: 1, z: size.height * 0.0032 }, "same")
                        .to(assets.room.scale, { x: 0.4, y: 0.4, z: 0.4 }, "same");
                    if(rectLight) {
                        secondMoveTimeline.to(rectLight, { width: 0.5 * 4, height: 0.7 * 4 }, "same");
                    }

                    gsap.timeline({ scrollTrigger: { trigger: ".third-move", start: "top top", end: "bottom bottom", scrub: 0.6 } })
                        .to(camera.position, { y: 1.5, x: -4.1 });
                },
                // --- Mobile Animations ---
                "(max-width: 968px)": () => {
                    assets.room.scale.set(0.07, 0.07, 0.07);
                    if(rectLight) {
                        rectLight.width = 0.3;
                        rectLight.height = 0.4;
                    }

                    gsap.timeline({ scrollTrigger: { trigger: ".first-move", start: "top top", end: "bottom bottom", scrub: 0.6 } })
                        .to(assets.room.scale, { x: 0.1, y: 0.1, z: 0.1 });
                    
                    const secondMoveTimelineMobile = gsap.timeline({ scrollTrigger: { trigger: ".second-move", start: "top top", end: "bottom bottom", scrub: 0.6 } });
                    secondMoveTimelineMobile.to(assets.room.scale, { x: 0.25, y: 0.25, z: 0.25 }, "same")
                        .to(assets.room.position, { x: 1.5 }, "same");
                    if(rectLight) {
                       secondMoveTimelineMobile.to(rectLight, { width: 0.3 * 3.4, height: 0.4 * 3.4 }, "same");
                    }

                    gsap.timeline({ scrollTrigger: { trigger: ".third-move", start: "top top", end: "bottom bottom", scrub: 0.6 } })
                        .to(assets.room.position, { z: -4.5 });
                },
                // --- Animations for All Screen Sizes ---
                "all": () => {
                    // Animate floor circles
                    gsap.timeline({ scrollTrigger: { trigger: ".first-move", start: "top top", end: "bottom bottom", scrub: 0.6 } }).to(floorCircles.current[0].scale, { x: 3, y: 3, z: 3 });
                    gsap.timeline({ scrollTrigger: { trigger: ".second-move", start: "top top", end: "bottom bottom", scrub: 0.6 } }).to(floorCircles.current[1].scale, { x: 3, y: 3, z: 3 });
                    gsap.timeline({ scrollTrigger: { trigger: ".third-move", start: "top top", end: "bottom bottom", scrub: 0.6 } }).to(floorCircles.current[2].scale, { x: 3, y: 3, z: 3 });
                    
                    // Animate HTML sections
                    document.querySelectorAll(".section").forEach((section) => {
                        const progressWrapper = section.querySelector(".progress-wrapper");
                        const progressBar = section.querySelector(".progress-bar");

                        if (section.classList.contains("right")) {
                            gsap.to(section, { borderTopLeftRadius: 10, scrollTrigger: { trigger: section, start: "top bottom", end: "top top", scrub: 0.6 } });
                            gsap.to(section, { borderBottomLeftRadius: 700, scrollTrigger: { trigger: section, start: "bottom bottom", end: "bottom top", scrub: 0.6 } });
                        } else {
                            gsap.to(section, { borderTopRightRadius: 10, scrollTrigger: { trigger: section, start: "top bottom", end: "top top", scrub: 0.6 } });
                            gsap.to(section, { borderBottomRightRadius: 700, scrollTrigger: { trigger: section, start: "bottom bottom", end: "bottom top", scrub: 0.6 } });
                        }
                        if (progressBar) {
                           gsap.from(progressBar, { scaleY: 0, scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.4, pin: progressWrapper, pinSpacing: false } });
                        }
                    });

                    // Animate outdoor platform
                    const secondPartTimeline = gsap.timeline({ scrollTrigger: { trigger: ".third-move", start: "center center" } });
                    if (assets.nodes.Minifloor) secondPartTimeline.to(assets.nodes.Minifloor.position, { x: -5.44, z: 13.61, duration: 0.3 }, "start");
                    if (assets.nodes.Mailbox) secondPartTimeline.to(assets.nodes.Mailbox.scale, { x: 1, y: 1, z: 1, duration: 0.3 }, "start");
                    if (assets.nodes.Lamp) secondPartTimeline.to(assets.nodes.Lamp.scale, { x: 1, y: 1, z: 1, duration: 0.3, ease: "back.out(2)" }, "start+=0.1");
                    if (assets.nodes.Floorfirst) secondPartTimeline.to(assets.nodes.Floorfirst.scale, { x: 1, y: 1, z: 1, duration: 0.3, ease: "back.out(2)" }, "start+=0.15");
                    if (assets.nodes.Floorsecond) secondPartTimeline.to(assets.nodes.Floorsecond.scale, { x: 1, y: 1, z: 1, duration: 0.3, ease: "back.out(2)" }, "start+=0.2");
                    if (assets.nodes.flower1) secondPartTimeline.to(assets.nodes.flower1.scale, { x: 1, y: 1, z: 1, duration: 0.3, ease: "back.out(2)" }, "start+=0.25");
                    if (assets.nodes.flower2) secondPartTimeline.to(assets.nodes.flower2.scale, { x: 1, y: 1, z: 1, duration: 0.3, ease: "back.out(2)" }, "start+=0.3");
                }
            });
        };

        initSmoothScroll();

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            if (asscroll) {
                asscroll.disable();
                gsap.ticker.remove(asscroll.update);
            }
        };
    }, [assets, device, camera, size, floorCircles]);

    return null;
}
