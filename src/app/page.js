import React from "react";
import Diagram from "@/components/diagram";
import Hero from "@/components/hero";
import Conversatios from "@/components/conversatios";
import EmotionVisualizer from "@/components/emotions";

export default function Home() {
  const emotions = {
    Happy: 51,
    Sad: 30,
    Excited: 39,
    Angry: 11,
    Bored: 29,
    Anxious: 48,
    Content: 43,
    Confident: 27,
    Confused: 77,
  };
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
