import React from "react";

const PortfolioSections = () => {
  // Helper component for the decorative title lines to avoid repetition
  const SectionTitleDecoration = ({ colorClass = "border-pink", bgColorClass = "bg-pink" }) => (
    <>
      <div className={`styleOne absolute top-0 block w-full max-w-[278px] h-[60px] border ${colorClass} origin-left [transform:skewY(-25deg)]`}></div>
      <div className={`styleTwo absolute top-[80px] block w-full max-w-[278px] h-[60px] border ${colorClass} origin-left [transform:skewY(-25deg)]`}></div>
      <div className={`styleThree absolute top-[80px] block w-full max-w-[278px] h-[60px] border ${colorClass} ${bgColorClass} origin-left [transform:skewY(25deg)]`}></div>
    </>
  );

  return (
    <div className="portfolio-container w-full relative z-[99999]">
      <div className="page-wrapper relative">
        {/* Spacer for the first section scroll trigger */}
        <div className="first-move h-[3000px] w-full"></div>

        {/* Section 1: About Me */}
        <section id="about" className="section left relative w-full md:w-1/2 p-[1000px_4%] m-0 bg-background overflow-hidden mr-auto rounded-tr-[700px]">
          <div className="progress-wrapper progress-bar-wrapper-left absolute top-0 left-0 md:left-0 md:right-auto right-0 h-0 w-[12px] z-[9999]">
            <div className="progress-bar h-screen w-full bg-pink scale-y-100"></div>
          </div>
          <div className="section-intro-wrapper relative p-[20%_5%] border-b-2 border-pink pb-[400px]">
            <h1 className="section-title relative text-pink">
              <span className="section-title-text block text-4xl font-medium origin-left z-[5] uppercase text-pink [transform:skewY(25deg)]">
                About Me
              </span>
              <SectionTitleDecoration />
            </h1>
            <span className="section-number absolute bottom-[15px] right-0 text-pink text-2xl">01</span>
          </div>
          <div className="section-detail-wrapper relative p-[20%_5%]">
            <p className="section-text leading-loose mt-[18px] text-base text-text">
              Hi there 👋! I'm a passionate Full-Stack Developer who loves
              crafting interactive, user-centric digital experiences. I
              specialize in React.js, Next.js, and Node.js, and I enjoy
              blending clean design with powerful functionality.
            </p>
          </div>
        </section>

        {/* Spacer */}
        <div className="second-move h-[3000px] w-full"></div>

        {/* Section 2: My Work */}
        <section id="work" className="section right relative w-full md:w-1/2 p-[1000px_4%] m-0 bg-background overflow-hidden ml-auto rounded-tl-[700px]">
          <div className="progress-wrapper progress-bar-wrapper-right absolute top-0 right-0 h-0 w-[12px] z-[9999]">
            <div className="progress-bar h-screen w-full bg-blue scale-y-100"></div>
          </div>
          <div className="section-intro-wrapper relative p-[20%_5%] border-b-2 border-blue pb-[400px]">
            <h1 className="section-title relative text-blue">
              <span className="section-title-text block text-4xl font-medium origin-left z-[5] uppercase text-blue [transform:skewY(25deg)]">
                My Work
              </span>
              <SectionTitleDecoration colorClass="border-blue" bgColorClass="bg-blue" />
            </h1>
            <span className="section-number absolute bottom-[15px] right-0 text-blue text-2xl">02</span>
          </div>
          <div className="section-detail-wrapper relative p-[20%_5%]">
            <h3 className="section-heading text-lg font-bold leading-[1.8] mt-16 text-text">New Delhi</h3>
            <p className="section-text leading-loose mt-[18px] text-base text-text">
              Projects and experiences from my time in New Delhi.
            </p>
          </div>
        </section>

        {/* Spacer */}
        <div className="third-move h-[3000px] w-full"></div>

        {/* Section 3: Contact Me */}
        <section id="contact" className="section left relative w-full md:w-1/2 p-[1000px_4%] m-0 bg-background overflow-hidden mr-auto rounded-tr-[700px]">
           <div className="progress-wrapper progress-bar-wrapper-left absolute top-0 left-0 md:left-0 md:right-auto right-0 h-0 w-[12px] z-[9999]">
            <div className="progress-bar h-screen w-full bg-green scale-y-100"></div>
          </div>
          <div className="section-intro-wrapper relative p-[20%_5%] border-b-2 border-green pb-[400px]">
            <h1 className="section-title relative text-green">
              <span className="section-title-text block text-4xl font-medium origin-left z-[5] uppercase text-green [transform:skewY(25deg)]">
                Contact Me
              </span>
              <SectionTitleDecoration colorClass="border-green" bgColorClass="bg-green" />
            </h1>
            <span className="section-number absolute bottom-[15px] right-0 text-green text-2xl">03</span>
          </div>
          <div className="section-detail-wrapper relative p-[20%_5%]">
            <h3 className="section-heading text-lg font-bold leading-[1.8] mt-16 text-text">LinkedIn</h3>
            <p className="section-text leading-loose mt-[18px] text-base text-text">
              I post all my work here... Career updates and so much more!
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PortfolioSections;

