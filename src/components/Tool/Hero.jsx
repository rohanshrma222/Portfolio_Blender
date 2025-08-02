import React from 'react';

const Hero = React.memo(({ revealHeroContent }) => {
    return (
        <>
            <style>{`
            .hero-main, .hero-second {
                opacity: 0;
                transform: translateY(40px);
                transition: opacity 0.8s cubic-bezier(.4,0,.2,1), transform 0.8s cubic-bezier(.4,0,.2,1);
            }
            .hero-main.hero-animate, .hero-second.hero-animate {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Add these new styles */
            .section {
                min-height: 100vh;
                padding: 80px 40px;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            
            .section-text, .section-heading {
                opacity: 1 !important;
                visibility: visible !important;
            }
           `}</style>
            <section className="hero">
                <div className="hero-wrapper">
                    <div className="intro-text">Welcome to my portfolio!</div>
                    <div className="arrow-svg-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                            <path fill="currentColor" d="M12 14.95q-.2 0-.375-.063-.175-.062-.325-.212L6.675 10.05q-.275-.275-.262-.688.012-.412.287-.687.275-.275.7-.275.425 0 .7.275l3.9 3.9 3.925-3.925q.275-.275.688-.263.412.013.687.288.275.275.275.7 0 .425-.275.7l-4.6 4.6q-.15.15-.325.212-.175.063-.375.063Z" />
                        </svg>
                    </div>
                    <div
                        className={`hero-main${revealHeroContent ? ' hero-animate' : ''}`}
                        style={revealHeroContent ? { opacity: 1, transform: 'none' } : {}}
                    >
                        <h1 className="hero-main-title">Rohan Sharma</h1>
                        <p className="hero-main-description">Full Stack Web Developer</p>
                    </div>
                    <div
                        className={`hero-second${revealHeroContent ? ' hero-animate' : ''}`}
                        style={revealHeroContent ? { opacity: 1, transform: 'none' } : {}}
                    >
                        <p className="hero-second-subheading first-sub">Rohan Sharma</p>
                        <p className="hero-second-subheading second-sub">Portfolio</p>
                    </div>
                </div>
            </section>
           
        </>
    );
});

export default Hero;
