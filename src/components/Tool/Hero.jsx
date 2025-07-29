import React from 'react';

const Hero = React.memo(() => {
    return (
        <>
            <section className="hero">
                <div className="hero-wrapper">
                    <div className="intro-text" style={{ opacity: 0 }}>Welcome to my portfolio!</div>
                    <div className="arrow-svg-wrapper" style={{ opacity: 0 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                            <path fill="currentColor" d="M12 14.95q-.2 0-.375-.063-.175-.062-.325-.212L6.675 10.05q-.275-.275-.262-.688.012-.412.287-.687.275-.275.7-.275.425 0 .7.275l3.9 3.9 3.925-3.925q.275-.275.688-.263.412.013.687.288.275.275.275.7 0 .425-.275.7l-4.6 4.6q-.15.15-.325.212-.175.063-.375.063Z" />
                        </svg>
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
        </>
    );
});

export default Hero;
