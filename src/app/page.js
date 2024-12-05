import React from "react";
import Diagram from "@/components/diagram";
import Hero from "@/components/hero";
import Conversatios from "@/components/conversatios";

export default function Home() {
  return (
    <div className="flex flex-col overflow-hidden">
      <Hero />
      {/* <Diagram /> */}
      <Conversatios />
    </div>
  );
}
