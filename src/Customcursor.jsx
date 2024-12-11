import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = ({bgcol}) => {
  const cursorRef = useRef(null);
  console.log(bgcol);
  
  useEffect(() => {
    const cursor = cursorRef.current;

    gsap.set(cursor, { 
      xPercent: -50, 
      yPercent: -50,
    });

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX + 20,
        y: e.clientY + 20,
        duration: 0.5,
      });
    };
    

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed top-[-20px] left-[-20px] w-5 h-5 ${
          bgcol ? "bg-[#fd2c2a]" : "bg-[#fff]"
        } rounded-full pointer-events-none z-[5] transition-colors duration-[0.1ms]`}        
      ></div>
    </>
  );
};

export default CustomCursor;
