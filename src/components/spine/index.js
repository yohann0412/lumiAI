"use client"
import React, { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";

const Spine = () => {
  const [scenePath, setScenePath] = useState("/shift_500.spline");

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 540) {
        setScenePath("/shift_302.spline");
      } else {
        setScenePath("/shift_500.spline");
      }
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div className="flex items-center justify-center text-center">
      <Spline scene={scenePath} className="flex justify-center" />
    </div>
  );
};

export default Spine;
