"use client";
import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

import Image from "next/image";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lottie from "lottie-react";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import { Button } from "../ui/button";
import animationData from "../../../public/lottie.json";
import Bubble from "../bubble";

const bubbles = [
  {
    imageSrc: "/icons/Smiley.svg",
    text: "Happiness",
    type: "left",
    position: { top: "65px", right: "110px" },
    mobilePosition: { top: "62%", left: "0%" },
    delay: 0.5,
  },
  {
    imageSrc: "/icons/Sparkle.svg",
    text: "Delight",
    type: "right",
    position: { top: "65px", left: "110px" },
    mobilePosition: { top: "62%", right: "10%" },
    delay: 0.5,
  },
];

// const bubbles = [
//   {
//     imageSrc: "/icons/Smiley.svg",
//     text: "Happiness",
//     type: "left",
//     position: { top: "35%", left: "10%" },
//     mobilePosition: { top: "62%", left: "10%" },
//     delay: 0.5,
//   },
//   {
//     imageSrc: "/icons/Sparkle.svg",
//     text: "Delight",
//     type: "right",
//     position: { top: "40%", right: "15%" },
//     mobilePosition: { top: "62%", right: "10%" },
//     delay: 0.5,
//   },
//   {
//     imageSrc: "/icons/Heart.svg",
//     text: "Love",
//     type: "right",
//     position: { top: "80%", right: "25%" },
//     mobilePosition: { top: "67%", right: "25%" },
//     delay: 0.75,
//   },
//   {
//     imageSrc: "/icons/HandHeart.svg",
//     text: "Tenderness",
//     type: "left",
//     position: { top: "90%", left: "15%" },
//     mobilePosition: { top: "69%", left: "14%" },
//     delay: 1,
//   },
//   {
//     imageSrc: "/icons/SmileySad.svg",
//     text: "Sadness",
//     type: "left",
//     position: { top: "45%", left: "12%" },
//     delay: 2.25,
//     mobilePosition: { top: "63%", left: "26%" },
//   },
//   {
//     imageSrc: "/icons/Drop.svg",
//     text: "Melancholy",
//     type: "left",
//     position: { top: "80%", left: "18%" },
//     delay: 2.25,
//     mobilePosition: { top: "64%", right: "8%" },
//   },
//   {
//     imageSrc: "/icons/Cloud.svg",
//     text: "Nostalgia",
//     type: "right",
//     position: { top: "50%", right: "18%" },
//     delay: 2.5,
//     mobilePosition: { top: "67%", right: "29%" },
//   },
//   {
//     imageSrc: "/icons/PersonSimpleWalk.svg",
//     text: "Loneliness",
//     type: "right",
//     position: { top: "60%", right: "25%" },
//     delay: 2.75,
//     mobilePosition: { top: "70%", left: "14%" },
//   },

//   // 3
// ];

const gsapTitle = [
  "T",
  "h",
  "e",
  " ",
  "A",
  "I",
  " ",
  "T",
  "h",
  "a",
  "t",
  " ",
  "T",
  "h",
  "i",
  "n",
  "k",
  "s",
  " ",
  "A",
  "l",
  "o",
  "n",
  "g",
  " ",
  "S",
  "i",
  "d",
  "e",
  " ",
  "U",
  "s",
  " ",
  "A",
  "l",
  "l",
];

const Hero = () => {
  const [Lottie, setLottie] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const firstFrameRef = useRef(null);
  const mobileFrameRef = useRef(null);
  const bubblesRef = useRef([]);
  const mobileBubblesRef = useRef([]);
  const contentRef = useRef([]);
  const lettersRef = useRef([]);

  useEffect(() => {
    const loadLottie = async () => {
      const module = await import("lottie-react");
      setLottie(() => module.default);
    };
    loadLottie();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isMobile && Lottie) {
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const timelineFirst = gsap.timeline({
          scrollTrigger: {
            trigger: firstFrameRef.current,
            start: "top top",
            end: "bottom+=100 top",
            scrub: true,
            pin: true,
            markers: false,
          },
        });

        timelineFirst
          .to(firstFrameRef.current, { duration: 1 })
          .fromTo(
            firstFrameRef.current.querySelector(".box"),
            { scale: 2.6 },
            { scale: 1, duration: 2 },
            "-=0.5"
          )
          .fromTo(
            firstFrameRef.current.querySelector(".bubbles"),
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1 },
            "+=0.5"
          )
          .fromTo(
            firstFrameRef.current.querySelector(".call-title"),
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1 },
            "+=0.5"
          )
          .fromTo(
            lettersRef.current,
            { y: 0, color: "#000" },
            {
              y: 20,
              color: "#67aac9",
              duration: 0.5,
              stagger: 0.05,
            },
            "+=0.3"
          )
          .fromTo(
            firstFrameRef.current.querySelector(".action-button"),
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1 },
            "+=0.5"
          );

        const bubblesGroups = [];
        for (let i = 0; i < bubbles.length; i += 4) {
          bubblesGroups.push(bubbles.slice(i, i + 4));
        }

        const bubblesTimeline = gsap.timeline({ repeat: -1 });
        const stepBetweenGroups = 4;

        bubblesGroups.forEach((group, groupIndex) => {
          const groupStartTime = groupIndex * stepBetweenGroups;

          group.forEach((bubble) => {
            const bubbleIndex = bubbles.indexOf(bubble);
            const randomOffset = (Math.random() - 0.5) * 0.8;
            const bubbleStartTime = groupStartTime + randomOffset;

            bubblesTimeline.fromTo(
              bubblesRef.current[bubbleIndex],
              { opacity: 0, scale: 0 },
              {
                opacity: 1,
                scale: 1,
                duration: 1.25,
                ease: "back.out(1.7)",
              },
              bubbleStartTime
            );

            bubblesTimeline.to(
              bubblesRef.current[bubbleIndex],
              { opacity: 0, scale: 0, duration: 1.25, ease: "power2.in" },
              bubbleStartTime + 1.25
            );
          });
        });
      });

      return () => ctx.revert();
    }
  }, [Lottie, isMobile]);

  if (!Lottie) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-200 rounded-full animate-bounce"></div>
          <div
            className="w-4 h-4 bg-blue-300 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-4 h-4 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    // <div className="min-h-screen">
    <div className="">
      <div
        ref={firstFrameRef}
        className="z-10 relative flex flex-col items-center justify-center text-center text-black min-h-screen max-h-screen overflow-hidden "
      >
        {/* <div className="box w-full bg-white mt-4">
          <Lottie animationData={animationData} loop={true} />
        </div> */}
        <div className="box w-full bg-white mt-4">
          <video
            src="/Horizontal.mp4"
            autoPlay
            loop
            muted
            className="w-full h-auto"
          />
        </div>
        <div
          className="bubbles absolute top-1/2 left-1/2 z-10 w-[10px] h-[4px] bg-red-500 opacity-0"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          {bubbles.map((bubble, index) => (
            <Bubble
              key={index}
              imageSrc={bubble.imageSrc}
              text={bubble.text}
              type={bubble.type}
              position={bubble.position}
              className="bubble-animation"
            />
          ))}
        </div>

        {/* <div className="bubbles absolute top-0 right-0 z-10 w-full h-[400px] mt-[10px] opacity-0">
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
        </div> */}
        <div ref={contentRef} className="absolute bottom-0">
          {/* <div className="action-button top-[-30px] left-1/2 transform -translate-x-1/2 p-1 rounded-sm opacity-0"> */}
          <div className="action-button top-[-30px] p-1 rounded-sm opacity-0">
            <a
              href="https://x.com/0xlumi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="chat-button px-9 py-6 text-white rounded-sm">
                <Image
                  src="/icons/ChatTeardrop.svg"
                  alt="Coin Vertical Logo"
                  width={20}
                  height={20}
                />
                Talk to me...
              </Button>
            </a>
          </div>
          <h1 className="call-title gsap-title text-4xl uppercase font-bold mb-2 pt-10 py-24 opacity-0">
            {gsapTitle.map((letter, index) => (
              <span
                key={index}
                ref={(el) => (lettersRef.current[index] = el)}
                className="inline-block text-cblack-100"
                style={{ whiteSpace: "pre" }}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
