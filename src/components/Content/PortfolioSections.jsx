import React from "react";

const PortfolioSections = () => {
  return (
    <div  className="portfolio-container w-full pointer-events-auto text-black dark:text-white opacity-100 !opacity-100 z-50">
      {/* About Me Section */}
      <div id="about" className="relative w-full py-12 px-4 md:px-8">
        <h2 className="text-3xl font-bold mb-4">About Me</h2>
        <p className="text-lg leading-7">Hi there 👋! I'm a passionate Full-Stack Developer who loves crafting interactive, user-centric digital experiences. I specialize in React.js, Next.js, and Node.js, and I enjoy blending clean design with powerful functionality.</p>
      </div>

      {/* My Work Section */}
      <div id="work" className="relative w-full py-12 px-4 md:px-8">
        <h2 className="text-3xl font-bold mb-4">My Work</h2>
        <h3 className="mb-2 mt-6 text-2xl font-bold text-gray-900">New Delhi</h3>
      </div>

      {/* Contact Me Section */}
      <div id="contact" className="relative w-full py-12 px-4 md:px-8">
        <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
        <p className="text-lg leading-7">I post all my work here...</p>
        <h3 className="mb-2 mt-6 text-2xl font-bold text-gray-900">LinkedIn</h3>
        <p className="text-base mt-2">Career updates and so much more!</p>
      </div>
    </div>
  );
};

export default PortfolioSections;
