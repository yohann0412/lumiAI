import React from "react";
import Diagram from "@/components/diagram";
import Hero from "@/components/hero";
import Conversatios from "@/components/conversatios";
import EmotionVisualizer from "@/components/emotions";
import emotionsData from "../../mood.json"; 

export default function Home() {
  const emotions = emotionsData;

  return (
    <div className="flex flex-col overflow-hidden">
      <Hero />
      {/* <Diagram /> */}
      {/* <Home /> */}
      <EmotionVisualizer emotions={emotions} />
      <Conversatios />
    </div>
  );
}
