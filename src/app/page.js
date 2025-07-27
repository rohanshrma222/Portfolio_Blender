'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import gsap from 'gsap';

// Dynamically import the Experience component with SSR turned off.
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

  // All animation logic now lives here, in the main page component.
  useEffect(() => {
    if (assets && !isIntroPlaying) {
        setIsIntroPlaying(true);
        
        const playIntro = () => {
          const tl = gsap.timeline();
        
          tl.to(".preloader", {
            opacity: 0,
            duration: 1.0,
            onComplete: () => {
              document.querySelector(".preloader")?.classList.add("hidden");
            }
          })
        
          // Animate Cube and Text Together
          .to(assets.nodes.Cube.scale, {
            x: 5,
            y: 5,
            z: 5,
            ease: "back.out(2.2)",
            duration: 0.7
          }, "reveal")
        
          .to(".intro-text", {
            opacity: 1,
            duration: 0.7
          }, "reveal")
        
          .to(".toggle-bar", { opacity: 1, duration: 0.5 }, "reveal+=0.4")
          .to(".arrow-svg-wrapper", { opacity: 1, duration: 0.5 }, "reveal+=0.4")
        
          .call(() => {
            window.addEventListener("wheel", playSecondIntro, { once: true });
            setShowFullModel(true);
          });
        };
        

        const playSecondIntro = () => {
          const tl = gsap.timeline();
        
          // Fade out intro text and arrow
          tl.to([".intro-text", ".arrow-svg-wrapper"], {
            opacity: 0,
            duration: 0.5
          }, "fadeout")
        
          // Animate cube out (rotate & scale)
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
        
          // Move room to center
          .to(assets.room.position, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1.0,
            ease: "power2.out"
          }, "sync")
        
          // Reveal the main content
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
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path fill="currentColor" d="M12 14.95q-.2 0-.375-.063-.175-.062-.325-.212L6.675 10.05q-.275-.275-.262-.688.012-.412.287-.687.275-.275.7-.275.425 0 .7.275l3.9 3.9 3.925-3.925q.275-.275.688-.263.412.013.687.288.275.275.275.7 0 .425-.275.7l-4.6 4.6q-.15.15-.325-.212-.175.063-.375.063Z"/></svg>
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
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path fill="currentColor" d="M12 5Q11.575 5 11.288 4.712Q11 4.425 11 4V2Q11 1.575 11.288 1.287Q11.575 1 12 1Q12.425 1 12.713 1.287Q13 1.575 13 2V4Q13 4.425 12.713 4.712Q12.425 5 12 5ZM16.95 7.05Q16.675 6.775 16.675 6.362Q16.675 5.95 16.95 5.65L18.35 4.225Q18.65 3.925 19.062 3.925Q19.475 3.925 19.775 4.225Q20.05 4.5 20.05 4.925Q20.05 5.35 19.775 5.625L18.35 7.05Q18.075 7.325 17.65 7.325Q17.225 7.325 16.95 7.05ZM20 13Q19.575 13 19.288 12.712Q19 12.425 19 12Q19 11.575 19.288 11.287Q19.575 11 20 11H22Q22.425 11 22.712 11.287Q23 11.575 23 12Q23 12.425 22.712 12.712Q22.425 13 22 13ZM12 23Q11.575 23 11.288 22.712Q11 22.425 11 22V20Q11 19.575 11.288 19.288Q11.575 19 12 19Q12.425 19 12.713 19.288Q13 19.575 13 20V22Q13 22.425 12.713 22.712Q12.425 23 12 23ZM5.65 7.05 4.225 5.65Q3.925 5.35 3.925 4.925Q3.925 4.5 4.225 4.225Q4.5 3.95 4.925 3.95Q5.35 3.95 5.625 4.225L7.05 5.65Q7.325 5.925 7.325 6.35Q7.325 6.775 7.05 7.05Q6.75 7.325 6.35 7.325Q5.95 7.325 5.65 7.05ZM18.35 19.775 16.95 18.35Q16.675 18.05 16.675 17.638Q16.675 17.225 16.95 16.95Q17.225 16.675 17.638 16.675Q18.05 16.675 18.35 16.95L19.775 18.35Q20.075 18.625 20.062 19.05Q20.05 19.475 19.775 19.775Q19.475 20.075 19.05 20.075Q18.625 20.075 18.35 19.775ZM2 13Q1.575 13 1.288 12.712Q1 12.425 1 12Q1 11.575 1.288 11.287Q1.575 11 2 11H4Q4.425 11 4.713 11.287Q5 11.575 5 12Q5 12.425 4.713 12.712Q4.425 13 4 13ZM4.225 19.775Q3.95 19.5 3.95 19.075Q3.95 18.65 4.225 18.375L5.65 16.95Q5.925 16.675 6.338 16.675Q6.75 16.675 7.05 16.95Q7.35 17.25 7.35 17.663Q7.35 18.075 7.05 18.375L5.65 19.775Q5.35 20.075 4.925 20.075Q4.5 20.075 4.225 19.775ZM12 18Q9.5 18 7.75 16.25Q6 14.5 6 12Q6 9.5 7.75 7.75Q9.5 6 12 6Q14.5 6 16.25 7.75Q18 9.5 18 12Q18 14.5 16.25 16.25Q14.5 18 12 18ZM12 16Q13.65 16 14.825 14.825Q16 13.65 16 12Q16 10.35 14.825 9.175Q13.65 8 12 8Q10.35 8 9.175 9.175Q8 10.35 8 12Q8 13.65 9.175 14.825Q10.35 16 12 16Z"/></svg>
        </div>
        <button className="toggle-button" onClick={handleThemeToggle}>
          <div className="toggle-circle"></div>
        </button>
        <div className="moon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path fill="currentColor" d="M12 21Q8.25 21 5.625 18.375Q3 15.75 3 12Q3 8.25 5.625 5.625Q8.25 3 12 3Q12.35 3 12.688 3.025Q13.025 3.05 13.35 3.1Q12.325 3.825 11.713 4.987Q11.1 6.15 11.1 7.5Q11.1 9.75 12.675 11.325Q14.25 12.9 16.5 12.9Q17.875 12.9 19.025 12.287Q20.175 11.675 20.9 10.65Q20.95 10.975 20.975 11.312Q21 11.65 21 12Q21 15.75 18.375 18.375Q15.75 21 12 21ZM12 19Q14.2 19 15.95 17.788Q17.7 16.575 18.5 14.625Q18 14.75 17.5 14.825Q17 14.9 16.5 14.9Q13.425 14.9 11.262 12.738Q9.1 10.575 9.1 7.5Q9.1 7 9.175 6.5Q9.25 6 9.375 5.5Q7.425 6.3 6.213 8.05Q5 9.8 5 12Q5 14.9 7.05 16.95Q9.1 19 12 19ZM11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Z"/></svg>
        </div>
      </div>
    </div>
  );
}
