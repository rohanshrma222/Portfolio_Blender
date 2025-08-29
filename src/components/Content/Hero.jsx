import { cn } from '@/lib/utils';
import React from 'react';

const Hero = React.memo(({ revealHeroContent }) => {
    return (
        <div className="relative w-full">
            {/* SECTION 1 - First Viewport */}
            <section className=" relative w-full h-screen">
                {/* fixed welcome + arrow */}
                <div className="fixed inset-0 pointer-events-none z-20">
                    {/* Welcome */}
                    <div
                        className={cn(
                            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500",
                            { "opacity-0": revealHeroContent, "opacity-100": !revealHeroContent }
                        )}
                    >
                        Welcome to my portfolio!
                    </div>
                    {/* Arrow */}
                    <div
                        className={cn(
                            "absolute top-[90%] left-1/2 -translate-x-1/2 transition-opacity duration-500 animate-bounce",
                            { "opacity-0": revealHeroContent, "opacity-100": !revealHeroContent }
                        )}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                            <path
                                fill="currentColor"
                                d="M12 14.95q-.2 0-.375-.063-.175-.062-.325-.212L6.675 10.05q-.275-.275-.262-.688.012-.412.287-.687.275-.275.7-.275.425 0 .7.275l3.9 3.9 3.925-3.925q.275-.275.688-.263.412.013.687.288.275.275.275.7 0 .425-.275.7l-4.6 4.6q-.15.15-.325.212-.175-.063-.375-.063Z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Hero Main and Hero Second */}
                <div
                    className={cn(
                        "absolute top-1/2 left-[5%] text-left opacity-0 translate-y-10 transition-all duration-800 ease-[cubic-bezier(.4,0,.2,1)] z-10",
                        { "opacity-100 translate-y-0": revealHeroContent }
                    )}
                >
                    <h1 className="text-7xl">Rohan Sharma</h1>
                    <p className="text-2xl">Full Stack Web Developer</p>
                </div>
                <div
                    className={cn(
                        "absolute top-1/2 right-[10%] text-right opacity-0 translate-y-10 transition-all duration-800 ease-[cubic-bezier(.4,0,.2,1)] z-10",
                        { "opacity-100 translate-y-0": revealHeroContent }
                    )}
                >
                    <p className="text-2xl">Rohan Sharma</p>
                </div>
            </section>

            {/* SECTION 2 - Refactored for better layout */}
            <section className="relative w-full min-h-screen bg-green-500 z-10 p-8 md:p-16">
                <div className="max-w-7xl mx-auto">
                    {/* Top Row: About, Work, Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {/* About Me */}
                        <div>
                            <h2 className="text-3xl font-bold mb-4">About Me</h2>
                            <p className="text-lg leading-7">
                                Hi there 👋! I'm a passionate Full-Stack Developer who loves
                                crafting interactive, user-centric digital experiences. I specialize
                                in React.js, Next.js, and Node.js, and I enjoy blending clean design
                                with powerful functionality.
                            </p>
                        </div>

                        {/* My Work */}
                        <div>
                            <h2 className="text-3xl font-bold mb-4">My Work</h2>
                            <h3 className="mb-2 mt-6 text-2xl font-bold text-gray-900">New Delhi</h3>
                        </div>

                        {/* Contact */}
                        <div>
                            <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
                            <p className="text-lg leading-7">I post all my work here...</p>
                            <h3 className="mb-2 mt-6 text-2xl font-bold text-gray-900">LinkedIn</h3>
                            <p className="text-base mt-2">Career updates and so much more!</p>
                        </div>
                    </div>

                    {/* Projects Section */}
                    <div>
                        <h2 className="text-4xl font-bold mb-8">Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                                <h3 className="text-xl font-bold mb-2">Project 1</h3>
                                <p>Description of your first project...</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                                <h3 className="text-xl font-bold mb-2">Project 2</h3>
                                <p>Description of your second project...</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                                <h3 className="text-xl font-bold mb-2">Project 3</h3>
                                <p>Description of your third project...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
});

export default Hero;