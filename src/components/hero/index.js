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
    position: { top: "35%", left: "10%" },
    mobilePosition: { top: "62%", left: "10%" },
    delay: 0.5,
  },
  {
    imageSrc: "/icons/Sparkle.svg",
    text: "Delight",
    type: "right",
    position: { top: "40%", right: "15%" },
    mobilePosition: { top: "62%", right: "10%" },
    delay: 0.5,
  },
  {
    imageSrc: "/icons/Heart.svg",
    text: "Love",
    type: "right",
    position: { top: "80%", right: "25%" },
    mobilePosition: { top: "67%", right: "25%" },
    delay: 0.75,
  },
  {
    imageSrc: "/icons/HandHeart.svg",
    text: "Tenderness",
    type: "left",
    position: { top: "90%", left: "15%" },
    mobilePosition: { top: "69%", left: "14%" },
    delay: 1,
  },
  {
    imageSrc: "/icons/SmileySad.svg",
    text: "Sadness",
    type: "left",
    position: { top: "45%", left: "12%" },
    delay: 2.25,
    mobilePosition: { top: "63%", left: "26%" },
  },
  {
    imageSrc: "/icons/Drop.svg",
    text: "Melancholy",
    type: "left",
    position: { top: "80%", left: "18%" },
    delay: 2.25,
    mobilePosition: { top: "64%", right: "8%" },
  },
  {
    imageSrc: "/icons/Cloud.svg",
    text: "Nostalgia",
    type: "right",
    position: { top: "50%", right: "18%" },
    delay: 2.5,
    mobilePosition: { top: "67%", right: "29%" },
  },
  {
    imageSrc: "/icons/PersonSimpleWalk.svg",
    text: "Loneliness",
    type: "right",
    position: { top: "60%", right: "25%" },
    delay: 2.75,
    mobilePosition: { top: "70%", left: "14%" },
  },

  // 3
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
    if (isMobile && Lottie) {
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const timelineMobile = gsap.timeline({
          scrollTrigger: {
            trigger: mobileFrameRef.current,
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: true,
            scrub: true,
            markers: false,
            toggleActions: "play complete none none",
          },
        });

        timelineMobile
          .to(mobileFrameRef.current, { duration: 1 })
          .fromTo(
            mobileFrameRef.current.querySelector(".mobilebox"),
            { scale: 2 },
            { scale: 1, duration: 2 }
          )
          .fromTo(
            mobileFrameRef.current.querySelector(".bubbles-mobile"),
            { opacity: 0, y: 50, zIndex: 0 },
            { opacity: 1, y: 0, zIndex: 5, duration: 1 },
            "+=0.5"
          )
          .fromTo(
            mobileFrameRef.current.querySelector(".mobile-title"),
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1 },
            "+=0.5"
          )
          .fromTo(
            mobileFrameRef.current.querySelector(".mobile-button"),
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
              mobileBubblesRef.current[bubbleIndex],
              { opacity: 0, scale: 0 },
              {
                opacity: 1,
                scale: 0.7,
                duration: 1.25,
                ease: "back.out(1.7)",
              },
              bubbleStartTime
            );

            bubblesTimeline.to(
              mobileBubblesRef.current[bubbleIndex],
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

  if (isMobile) {
    return (
      <div
        ref={mobileFrameRef}
        className="w-full h-screen flex flex-col justify-center items-center pb-7"
      >
        <div className="mobilebox">
          <video
            src="/Mobile.mp4"
            loop
            muted
            playsInline
            className="w-full h-auto"
            onLoadedData={(e) => e.target.play()}
          ></video>
        </div>

        <div className="bubbles-mobile w-full opacity-0 z-40 h-screen ">
          {bubbles.map((bubble, index) => (
            <Bubble
              key={index}
              ref={(el) => (mobileBubblesRef.current[index] = el)}
              imageSrc={bubble.imageSrc}
              text={bubble.text}
              type={bubble.type}
              position={bubble.mobilePosition}
              delay={bubble.delay}
            />
          ))}
        </div>

        <div className="relative flex flex-col items-center justify-center">
          <h1 className="mobile-title text-cblack-100 text-2xl font-bold opacity-0 text-center px-5">
            The AI That Thinks Along Side Us All
          </h1>
          <div className="mobile-button top-[-5px]  p-1 rounded-sm opacity-0">
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
        </div>
      </div>
    );
  }
};

export default Hero;
