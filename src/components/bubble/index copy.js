"use client"
import React, { useEffect, useState } from "react";

const Bubble = ({ 
  imageSrc, 
  text, 
  type = "left", 
  position = { top: "50%", left: "50%" } 
}) => {
  const tailStyle = type === "left" 
    ? "right-[-8px] top-1/2 -translate-y-1/2 border-y-[10px] border-y-transparent border-l-[10px] border-l-[#fff]"
    : "left-[-8px] top-1/2 -translate-y-1/2 border-y-[10px] border-y-transparent border-r-[10px] border-r-[#fff]";

  const [animationOffset, setAnimationOffset] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const animate = () => {
      setAnimationOffset({
        top: Math.random() * 2 - 1, 
        left: Math.random() * 2 - 1, 
      });
    };

    const interval = setInterval(animate, 1000);
    return () => clearInterval(interval); 
  }, []);

  return (
    <div
      className="absolute flex items-center gap-2 px-4 py-2 bg-[#fff] text-cblack-100 rounded-lg shadow-md transition-transform duration-1000 ease-in-out"
      style={{
        ...position,
        transform: `translate(${animationOffset.left}px, ${animationOffset.top}px)`,
      }}
    >
      <img src={imageSrc} alt="Bubble Icon" className="w-6 h-6" />

      <span>{text}</span>

      <div className={`absolute ${tailStyle}`}></div>
    </div>
  );
};

export default Bubble;
