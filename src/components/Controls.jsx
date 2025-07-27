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
                    scrollTop(value) {
                        return arguments.length ? (asscroll.currentPos = value) : asscroll.currentPos;
                    },
                    getBoundingClientRect() {
                        return {
                            top: 0,
                            left: 0,
                            width: window.innerWidth,
                            height: window.innerHeight,
                        };
                    },
                });

                asscroll.on("update", ScrollTrigger.update);
                ScrollTrigger.addEventListener("refresh", asscroll.resize);

                requestAnimationFrame(() => asscroll.enable({ newScrollElements: document.querySelectorAll(".page") }));
            }

            setupScrollAnimations();
        };

        const setupScrollAnimations = () => {
            const room = assets.room;
            const rectLight = room.getObjectByName("RectAreaLight");
            const nodes = assets.nodes;

            // Set initial visibility (scale to 0)
            const animatedNodes = [
                nodes.Mailbox,
                nodes.Lamp,
                nodes.Floorfirst,
                nodes.Floorsecond,
                nodes.flower1,
                nodes.flower2
            ];

            animatedNodes.forEach(node => {
                if (node?.scale) {
                    node.scale.set(0, 0, 0);
                }
            });

            if (nodes.Minifloor?.scale) {
                nodes.Minifloor.scale.set(0.001, 0.001, 0.001); // Very small but visible
            }

            // Desktops
            ScrollTrigger.matchMedia({
                "(min-width: 969px)": () => {
                    room.scale.set(0.11, 0.11, 0.11);
                    if (rectLight) {
                        rectLight.width = 0.5;
                        rectLight.height = 0.7;
                    }

                    gsap.timeline({
                        scrollTrigger: {
                            trigger: ".first-move",
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.6,
                        },
                    }).to(room.position, { x: size.width * 0.0003 });

                    const tl2 = gsap.timeline({
                        scrollTrigger: {
                            trigger: ".second-move",
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.6,
                        },
                    });

                    tl2.to(room.position, { x: 0.8, z: size.height * 0.000001 }, "same")
                        .to(room.scale, { x: 0.4, y: 0.4, z: 0.4 }, "same");

                    if (rectLight) {
                        tl2.to(rectLight, { width: 2, height: 2.8 }, "same");
                    }

                    gsap.timeline({
                        scrollTrigger: {
                            trigger: ".third-move",
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.6,
                        },
                    }).to(camera.position, { y: 2,   x: 1 });
                },

                // Mobiles
                "(max-width: 968px)": () => {
                    room.scale.set(0.07, 0.07, 0.07);
                    if (rectLight) {
                        rectLight.width = 0.3;
                        rectLight.height = 0.4;
                    }

                    gsap.timeline({
                        scrollTrigger: {
                            trigger: ".first-move",
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.6,
                        },
                    }).to(room.scale, { x: 0.1, y: 0.1, z: 0.1 });

                    const tl2m = gsap.timeline({
                        scrollTrigger: {
                            trigger: ".second-move",
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.6,
                        },
                    });

                    tl2m.to(room.scale, { x: 0.25, y: 0.25, z: 0.25 }, "same")
                        .to(room.position, { x: 1.5 }, "same");

                    if (rectLight) {
                        tl2m.to(rectLight, { width: 1.02, height: 1.36 }, "same");
                    }

                    gsap.timeline({
                        scrollTrigger: {
                            trigger: ".third-move",
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.6,
                        },
                    }).to(room.position, { z: -4.5 });
                },

                // All Devices
                "all": () => {
                    floorCircles.current.forEach((circle, index) => {
                        gsap.timeline({
                            scrollTrigger: {
                                trigger: [".first-move", ".second-move", ".third-move"][index],
                                start: "top top",
                                end: "bottom bottom",
                                scrub: 0.6,
                            },
                        }).to(circle.scale, { x: 3, y: 3, z: 3 });
                    });

                    document.querySelectorAll(".section").forEach(section => {
                        const isRight = section.classList.contains("right");
                        const progressWrapper = section.querySelector(".progress-wrapper");
                        const progressBar = section.querySelector(".progress-bar");

                        gsap.to(section, {
                            [isRight ? "borderTopLeftRadius" : "borderTopRightRadius"]: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });

                        gsap.to(section, {
                            [isRight ? "borderBottomLeftRadius" : "borderBottomRightRadius"]: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });

                        if (progressBar) {
                            gsap.from(progressBar, {
                                scaleY: 0,
                                scrollTrigger: {
                                    trigger: section,
                                    start: "top top",
                                    end: "bottom bottom",
                                    scrub: 0.4,
                                    pin: progressWrapper,
                                    pinSpacing: false,
                                },
                            });
                        }
                    });

                    const tlOutdoor = gsap.timeline({
                        scrollTrigger: {
                            trigger: ".third-move",
                            start: "center center",
                        },
                    });

                    if (nodes) {
                        tlOutdoor.to(nodes.Minifloor?.position || {}, { x:-2.1379 ,z:2, duration: 0.3 }, "start");
                        tlOutdoor.to(nodes.Minifloor?.scale || {}, { x: 1, y: 1, z: 1, duration: 0.3, ease: "back.out(2)" }, "start");

                        animatedNodes.forEach((node, i) => {
                            const delay = 0.1 + i * 0.05;
                            tlOutdoor.to(node?.scale || {}, { x: 1, y: 1, z: 1, duration: 0.3, ease: "back.out(2)" }, `start+=${delay}`);
                        });
                    }
                },
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
