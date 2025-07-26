'use client';

import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// We remove the static import from here
// import ASScroll from '@ashthornton/asscroll';

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
            ScrollTrigger.matchMedia({
                "(min-width: 969px)": () => {
                    assets.room.scale.set(0.11, 0.11, 0.11);
                    // gsap.timeline({ scrollTrigger: { trigger: ".first-move", start: "top top", end: "bottom bottom", scrub: 0.6 } }).to(assets.room.position, { x: size.width * 0.0014 });
                    
                    // gsap.timeline({ scrollTrigger: { trigger: ".second-move", start: "top top", end: "bottom bottom", scrub: 0.6 } })
                    //     .to(assets.room.position, { x: 1, z: size.height * 0.0032 }, "same")
                    //     .to(assets.room.scale, { x: 0.4, y: 0.4, z: 0.4 }, "same");

                    // gsap.timeline({ scrollTrigger: { trigger: ".third-move", start: "top top", end: "bottom bottom", scrub: 0.6 } }).to(camera.position, { y: 1.5, x: -4.1 });
                },
                "(max-width: 968px)": () => {
                    assets.room.scale.set(0.07, 0.07, 0.07);
                    // gsap.timeline({ scrollTrigger: { trigger: ".first-move", start: "top top", end: "bottom bottom", scrub: 0.6 } }).to(assets.room.scale, { x: 0.1, y: 0.1, z: 0.1 });
                    // gsap.timeline({ scrollTrigger: { trigger: ".second-move", start: "top top", end: "bottom bottom", scrub: 0.6 } }).to(assets.room.scale, { x: 0.25, y: 0.25, z: 0.25 }, "same").to(assets.room.position, { x: 1.5 }, "same");
                    // gsap.timeline({ scrollTrigger: { trigger: ".third-move", start: "top top", end: "bottom bottom", scrub: 0.6 } }).to(assets.room.position, { z: -4.5 });
                },
                "all": () => {
                    gsap.timeline({ scrollTrigger: { trigger: ".first-move", start: "top top", end: "bottom bottom", scrub: 0.6 } }).to(floorCircles.current[0].scale, { x: 3, y: 3, z: 3 });
                    gsap.timeline({ scrollTrigger: { trigger: ".second-move", start: "top top", end: "bottom bottom", scrub: 0.6 } }).to(floorCircles.current[1].scale, { x: 3, y: 3, z: 3 });
                    gsap.timeline({ scrollTrigger: { trigger: ".third-move", start: "top top", end: "bottom bottom", scrub: 0.6 } }).to(floorCircles.current[2].scale, { x: 3, y: 3, z: 3 });
                    
                    // const secondPartTimeline = gsap.timeline({ scrollTrigger: { trigger: ".third-move", start: "center center" } });
                    // if (assets.nodes.patel) secondPartTimeline.to(assets.nodes.patel.position, { x: -5.44, z: 13.61, duration: 0.3 }, "start");
                    // if (assets.nodes.mailbox) secondPartTimeline.to(assets.nodes.mailbox.scale, { x: 1, y: 1, z: 1, duration: 0.3 }, "start");
                    // if (assets.nodes.lamp) secondPartTimeline.to(assets.nodes.lamp.scale, { x: 1, y: 1, z: 1, duration: 0.3, ease: "back.out(2)" }, "start+=0.1");
                    // if (assets.nodes['Plane.001']) secondPartTimeline.to(assets.nodes['Plane.001'].scale, { x: 1, y: 1, z: 1, duration: 0.3, ease: "back.out(2)" }, "start+=0.15");
                    // if (assets.nodes['Plane.002']) secondPartTimeline.to(assets.nodes['Plane.002'].scale, { x: 1, y: 1, z: 1, duration: 0.3, ease: "back.out(2)" }, "start+=0.2");
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
