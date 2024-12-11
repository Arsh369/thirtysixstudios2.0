import React, { useEffect, useRef, useState } from 'react';
import Canvas from './Canvas';
import Customcursor from './Customcursor'
import data from './data';
import './index.css';
import LocomotiveScroll from 'locomotive-scroll';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Footer from './footer';

const App = () => {
  const headingref = useRef(null);
  const growingSpan = useRef(null);
  const [ccc, setCcc] = useState(true)
  const [showCanvas, setShowCanvas] = useState(false);
  const [toggleColor, setToggleColor] = useState(false); // Track background color toggle

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
    return () => locomotiveScroll.destroy(); // Cleanup on unmount
  }, []);

  useGSAP(() => {
    headingref.current.addEventListener("click", (e) => {
      setShowCanvas(!showCanvas);
      
      // Adjust growingSpan position
      gsap.set(growingSpan.current, {
        top: e.clientY,
        left: e.clientX,
      });

      // Animate growing span
      gsap.to(growingSpan.current, {
        scale: 1000,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          // Toggle background and text colors
          if (toggleColor) {
            gsap.set("body", {
              backgroundColor: "white",
              color: "black",
            });
          } else {
            gsap.set("body", {
              backgroundColor: "#fd2c2a",
              color: "#000",
            });
          }

          // Reset span scale
          gsap.set(growingSpan.current, {
            scale: 0,
            clearProps: "all",
          });
          setCcc(!ccc)
          setToggleColor(!toggleColor); // Update toggle state
        },
      });
    });
  }, [showCanvas, toggleColor]);

  const navLinks = ['What we do', 'Who we are', 'How we give back', 'Talk to us']; // Navigation links array
  console.log(ccc);
  
  return (
    <>
      <Customcursor bgcol={ccc} />
      <span
        ref={growingSpan}
        className="growing block fixed w-1 h-1 top-[-20px] left-[-20px] rounded-full"
      ></span>
      <div className="w-full relative min-h-screen ">
        {showCanvas &&
          data[0].map((canvasdets, index) => <Canvas key={index} details={canvasdets} />)}

        <div className="w-full h-screen relative">
          {/* Navbar */}
          <nav className="w-full px-4 py-3 flex justify-between items-center z-50">
            <div className="text-lg font-bold">Thirtysixstudios</div>
            <ul className="flex space-x-14">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="hover:text-gray-600 transition-color border-b border-black"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="textcontainer w-full px-[20%]">
            <div className="text w-[50%]">
              <h3 className="text-3xl leading-[1.5]">
                At Thirtysixstudio, we build immersive digital experiences for
                brands with a purpose.
              </h3>
              <p className="text-md w-[80%] mt-5 font-md">
                We are a team of designers, developers, and strategists who are
                passionate about creating digital experiences that are both
                beautiful and functional.
              </p>
              <p className="text-md mt-5">scroll</p>
            </div>
          </div>
          <div className="w-full absolute bottom-0 left-0">
            <h1
              ref={headingref}
              className="text-[12rem] font-normal leading-none text-center cursor-pointer"
            >
              Chili Animation
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full h-fit relative overflow-hidden mt-32 px-10">
        {showCanvas &&
          data[1].map((canvasdets, index) => <Canvas key={index} details={canvasdets} />)}
        {showCanvas &&
          data[2].map((canvasdets, index) => <Canvas key={index} details={canvasdets} />)}
        {showCanvas &&
          data[3].map((canvasdets, index) => <Canvas key={index} details={canvasdets} />)}
        <h1 className="text-8xl ">about the brand</h1>
        <p className="text-2xl leading-[1.8] w-[80%] mt-10 font-light">
          we are a team of designers, developers, and strategists who are
          passionate about creating digital experiences that are both beautiful
          and functional.
        </p>
        <img
          className="w-[50%] relative left-[25%] mt-10 rounded-lg"
          src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
          alt=""
        />
        <div className='w-[70%] relative mt-10 left-[15%] '>
        <h3 className='text-5xl break-words'>
        AtThirtysixstudio,werecognizethatourindustrycanperpetuateharm.Webelievewehavetotryandreversesomeoftheseimbalances.That’swhywe’relaunchingSS36,ourlocalsocialsustainabilityhub.
        ThroughSS36,wereinvestsomeofourrevenueandexpertiseintothecommunitiesthatshapethecultureandtrendsourfieldsoheavilyrelieson.Ourmainfocusisonbridginggapsforthoseaffectedbysystemicobstaclesrelatedtorace,sexuality,wealthandgenderidentity.
        </h3>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default App;
