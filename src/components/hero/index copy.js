import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-500 text-center text-black py-10 px-5">
      <h1 className="text-4xl font-bold mb-4">Lumi AI</h1>
      <div className="max-w-2xl">
        <p className="text-xl mb-6">
          We've created this space to inspire, educate, and amaze. Here, you'll
          find everything you need for growth, creativity, and a dose of
          positivity. Whether you're looking for fresh ideas, practical tips, or
          simply a place to unwind — you're in the right spot. Explore,
          discover, and join our community. We believe that even the smallest
          things can make a big impact, and your presence makes it even better.
          Welcome home!
        </p>
        <Button className="px-6 py-3 text-white rounded-md">
          Discover
        </Button>
      </div>
    </div>
  );
};

export default Hero;
