"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/hero"), { ssr: false });
const Conversatios = dynamic(() => import("@/components/conversatios"), {
  ssr: false,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const modules = [
      () => import("@/components/hero"),
      () => import("@/components/conversatios"),
    ];

    let loadedModules = 0;

    const updateProgress = () => {
      loadedModules += 1;
      setProgress(Math.round((loadedModules / modules.length) * 100));
    };

    Promise.all(
      modules.map((loadModule) =>
        loadModule().then(() => {
          updateProgress(); 
        })
      )
    )
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке компонентов:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="relative flex items-center justify-center h-32 w-32">
          <div className="animate-spin-slow rounded-full h-full w-full border-t-4 border-b-4 border-gray-900 absolute"></div>
          <div className="absolute text-center">
            <div className="text-md font-semibold text-cblack-100">{progress}%</div>
            <p className="text-cblack-100 text-sm ">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <Hero />
      <Conversatios />
    </div>
  );
}
