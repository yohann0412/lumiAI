"use client"
import React, { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";

const Spine = () => {
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollFactor = Math.min(scrollTop / maxScroll, 1);

      const newScale = 0.5 + scrollFactor * 0.5;
      setScale(newScale);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 text-center">
      <div
        style={{
          transform: `scale(${scale})`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <Spline scene="/shift_500.spline" />
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default Spine;
