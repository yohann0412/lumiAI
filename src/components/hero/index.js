"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../ui/button";
import Lottie from "lottie-react";
import animationData from "../../../public/lottie.json";
import Image from "next/image";
import Bubble from "../bubble";


gsap.registerPlugin(ScrollTrigger);

const bubbles = [
  {
    imageSrc: "/icons/MusicNotes.svg",
    text: "Music?",
    type: "left",
    position: { top: "35%", left: "16%" },
    delay: 0.5,
  },
  {
    imageSrc: "/icons/Heart.svg",
    text: "Life?",
    type: "right",
    position: { top: "50%", right: "18%" },
    delay: 0.5,
  },
  {
    imageSrc: "/icons/SmileySticker.svg",
    text: "Emotional Growth?",
    type: "right",
    position: { top: "25%", right: "10%" },
    delay: 0.75,
  },
  {
    imageSrc: "/icons/FilmSlate.svg",
    text: "Film?",
    type: "left",
    position: { top: "50%", left: "20%" },
    delay: 1,
  },
];

const Hero = () => {
  const heroRef = useRef(null);
  const animationRef = useRef(null);
  const contentRef = useRef(null);
  const textRef = useRef(null);
  const bubblesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();

      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom+=100 top",
          pin: true,
          pinSpacing: true,
          markers: true,
        },
      });

      mainTimeline.fromTo(
        animationRef.current,
        { scale: 2 },
        { scale: 1.2, duration: 1 }
      );

      mainTimeline.fromTo(
        contentRef.current,
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "<"
      );

      mainTimeline.to(
        textRef.current,
        {
          backgroundPosition: "100% 0%",
          ease: "none",
          duration: 1,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "80% center",
            end: "bottom top",
            scrub: true,
          },
        },
        "-=0.5"
      );

      const sortedDelayValues = [
        ...new Set(bubbles.map((b) => b.delay)),
      ].sort((a, b) => a - b);

      const bubblesTimeline = gsap.timeline({ repeat: -1 });
      const stepBetweenGroups = 0.5;

      sortedDelayValues.forEach((delayValue, groupIndex) => {
        const groupBubbles = bubbles.filter((b) => b.delay === delayValue);
        const startTime = groupIndex * stepBetweenGroups;

        groupBubbles.forEach((bubble) => {
          const bubbleIndex = bubbles.indexOf(bubble);
          bubblesTimeline.fromTo(
            bubblesRef.current[bubbleIndex],
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.75 },
            startTime
          );
        });

        groupBubbles.forEach((bubble) => {
          const bubbleIndex = bubbles.indexOf(bubble);
          bubblesTimeline.to(
            bubblesRef.current[bubbleIndex],
            { opacity: 0, scale: 0, duration: 0.75 },
            startTime + 0.75
          );
        });
      });

      mainTimeline.add(bubblesTimeline, "+=0.5");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="z-10 relative flex flex-col items-center justify-center text-center text-black min-h-screen"
    >
      <div ref={animationRef} className="hero-animation">
        <Lottie animationData={animationData} loop={true} />
      </div>
      <div ref={contentRef} className="relative">
        <div className="absolute top-[-5px] left-1/2 transform -translate-x-1/2 p-1 rounded-sm">
          <Button className="chat-button px-9 py-6 text-white rounded-sm">
            <Image
              src="/icons/ChatTeardrop.svg"
              alt="Coin Vertical Logo"
              width={20}
              height={20}
            />
            CHAT NOW
          </Button>
        </div>
        <h1
          ref={textRef}
          className="text-4xl uppercase font-bold mb-2 py-24"
        >
          The AI That Thinks Along Side Us All
        </h1>
      </div>
      <div className="absolute top-0 right-0 z-10 w-full h-[400px]">
        {bubbles.map((bubble, index) => (
          <div
            key={index}
            ref={(el) => (bubblesRef.current[index] = el)}
            className="absolute"
            style={bubble.position}
          >
            <Bubble
              imageSrc={bubble.imageSrc}
              text={bubble.text}
              type={bubble.type}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
