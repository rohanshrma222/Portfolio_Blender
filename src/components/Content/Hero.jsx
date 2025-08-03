import { cn } from '@/lib/utils';
import React from 'react';

const Hero = React.memo(({ revealHeroContent }) => {
    return (
        <section className="relative">
            <div className="fixed w-full h-full top-0 left-0 z-[11]">
                {/* Intro Text */}
                <div
                    className={cn(
                        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#222] pointer-events-none transition-opacity duration-500',
                        { 'opacity-0': revealHeroContent, 'opacity-100': !revealHeroContent }
                    )}
                >
                    Welcome to my portfolio!
                </div>

                {/* Arrow SVG */}
                <div
                    className={cn(
                        'absolute top-[90%] left-1/2 -translate-x-1/2 text-[#222] pointer-events-none transition-opacity duration-500 animate-bounce',
                        { 'opacity-0': revealHeroContent, 'opacity-100': !revealHeroContent }
                    )}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                        <path
                            fill="currentColor"
                            d="M12 14.95q-.2 0-.375-.063-.175-.062-.325-.212L6.675 10.05q-.275-.275-.262-.688.012-.412.287-.687.275-.275.7-.275.425 0 .7.275l3.9 3.9 3.925-3.925q.275-.275.688-.263.412.013.687.288.275.275.275.7 0 .425-.275.7l-4.6 4.6q-.15.15-.325.212-.175.063-.375.063Z"
                        />
                    </svg>
                </div>

                {/* Hero Main */}
                <div
                    className={cn(
                        'absolute top-1/2 left-[5%] text-[#222] text-left opacity-0 translate-y-10 transition-all duration-800 ease-[cubic-bezier(.4,0,.2,1)]',
                        { 'opacity-100 translate-y-0': revealHeroContent }
                    )}
                >
                    <h1 className="text-7xl">Rohan Sharma</h1>
                    <p className="text-2xl">Full Stack Web Developer</p>
                </div>

                {/* Hero Second */}
                <div
                    className={cn(
                        'absolute top-1/2 right-[10%] text-right opacity-0 translate-y-10 transition-all duration-800 ease-[cubic-bezier(.4,0,.2,1)]',
                        { 'opacity-100 translate-y-0': revealHeroContent }
                    )}
                >
                    <p className="text-2xl">Rohan Sharma</p>
                    <p className="text-2xl">Portfolio</p>
                </div>
            </div>
        </section>
    );
});

export default Hero;
