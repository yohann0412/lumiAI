"use client";
import dynamic from "next/dynamic";
import ChatBlock from "@/components/chatBlock";
import Conversatios from "@/components/conversatios";
import Spine from "@/components/spine";
import { Button } from "@/components/ui/button";

const Hero = dynamic(() => import("@/components/hero"), { ssr: false });

export default function Home() {
  return (
    <div className="flex flex-col overflow-hidden">
      <Hero />
      <Conversatios />
    </div>
  );
}
