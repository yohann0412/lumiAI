"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/hero"), { ssr: false });
const Diagram = dynamic(() => import("@/components/diagram"), { ssr: false });
const Conversatios = dynamic(() => import("@/components/conversatios"), {
  ssr: false,
});

export default function Home() {
  const [isDiagramLoaded, setIsDiagramLoaded] = useState(false);
  const [isConversatiosLoaded, setIsConversatiosLoaded] = useState(false);

  useEffect(() => {
    const loadDiagram = async () => {
      await import("@/components/diagram");
      setIsDiagramLoaded(true);
    };

    const loadConversatios = async () => {
      await import("@/components/conversatios");
      setIsConversatiosLoaded(true);
    };

    loadDiagram().then(loadConversatios);
  }, []);

  return (
    <div className="flex flex-col overflow-hidden">
      <Hero />
      {isDiagramLoaded && <Diagram />}
      {isConversatiosLoaded && <Conversatios />}
    </div>
  );
}
