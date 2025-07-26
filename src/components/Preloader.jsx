// 'use client';

// import { useEffect, useState } from 'react';
// import gsap from 'gsap';

// // This component is now logic-only. It finds and animates elements in the main page.
// export default function Preloader({ assets, device }) {
//     const [isIntroPlaying, setIsIntroPlaying] = useState(false);

//     useEffect(() => {
//         // When `assets` is no longer null and the intro hasn't played, start it.
//         if (assets && !isIntroPlaying) {
//             setIsIntroPlaying(true);
//             playIntro();
//         }
//     }, [assets, isIntroPlaying, device]);

//     const playIntro = () => {
//         const tl = gsap.timeline();
        
//         // This timeline replicates the first part of the intro animation.
//         tl.to(".preloader", { 
//             opacity: 0, 
//             duration: 1.0, 
//             onComplete: () => { 
//                 document.querySelector(".preloader")?.classList.add("hidden"); 
//             } 
//         })
//         // Animate the small cube scaling up (assuming a 'Cube' object exists)
//         .to(assets.nodes.Cube?.scale, {
//             x: 1.4,
//             y: 1.4,
//             z: 1.4,
//             ease: "back.out(2.5)",
//             duration: 0.7,
//         }, ">-0.5")
//         .to(assets.room.position, { 
//             x: device === 'desktop' ? -1 : 0, 
//             z: device === 'desktop' ? 0 : -1, 
//             duration: 0.7, 
//             ease: "power1.out" 
//         }, "<") // Run simultaneously with the cube scale
//         .to(".intro-text", { opacity: 1, duration: 0.5 }, ">-0.5")
//         .to(".toggle-bar", { opacity: 1, duration: 0.5 }, "<")
//         .to(".arrow-svg-wrapper", { opacity: 1, duration: 0.5 }, "<")
//         .call(() => { window.addEventListener("wheel", playSecondIntro, { once: true }); });
//     };

//     const playSecondIntro = () => {
//         const tl = gsap.timeline();

//         // This timeline replicates the more complex second intro animation.
//         tl.to(".intro-text", { opacity: 0, duration: 0.5 }, "fadeout")
//         .to(".arrow-svg-wrapper", { opacity: 0, duration: 0.5 }, "fadeout")
//         .to(assets.room.position, { x: 0, y: 0, z: 0, duration: 1.0, ease: "power2.out" }, "sync")
//         // The "cube engulf" effect
//         .to(assets.nodes.Cube?.rotation, { y: 2 * Math.PI + Math.PI / 4 }, "sync")
//         .to(assets.nodes.Cube?.scale, { x: 10, y: 10, z: 10 }, "sync")
//         .to(assets.nodes.Cube?.position, { y: 2 }, "sync") // Move cube up slightly
//         // Hide the cube and reveal the room contents
//         .to(assets.nodes.Cube?.scale, { x: 0, y: 0, z: 0, duration: 0.5 }, "reveal")
//         .to(".hero-main-title, .hero-main-description, .hero-second-subheading", {
//             opacity: 1,
//             stagger: 0.1,
//             duration: 0.5
//         }, "reveal")
//         // Staggered animation of all room parts
//         .to(assets.nodes['upper-objects']?.scale, { x: 1, y: 1, z: 1, ease: "back.out(2.2)", duration: 0.5 }, "reveal+=0.2")
//         .to(assets.nodes.Drawer?.scale, { x: 1, y: 1, z: 1, ease: "back.out(2.2)", duration: 0.5 }, ">-0.4")
//         .to(assets.nodes.bed?.scale, { x: 1, y: 1, z: 1, ease: "back.out(2.2)", duration: 0.5 }, ">-0.4")
//         .to(assets.nodes['table all']?.scale, { x: 1, y: 1, z: 1, ease: "back.out(2.2)", duration: 0.5 }, ">-0.4")
//         .to(assets.nodes.Chair?.scale, { x: 1, y: 1, z: 1, ease: "back.out(2.2)", duration: 0.5 }, ">-0.4")
//         .to(assets.nodes.Chair?.rotation, { y: 4 * Math.PI, ease: "power2.out", duration: 1 }, "<");
//     };

//     // This component does not render any of its own HTML.
//     return null;
// }
