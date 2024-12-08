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
    positionMobile: { top: "14%", left: "10%" },
    delay: 0.5,
  },
  {
    imageSrc: "/icons/Sparkle.svg",
    text: "Delight",
    type: "right",
    position: { top: "40%", right: "15%" },
    positionMobile: { top: "35%", left: "10%" },
    delay: 0.5,
  },
  {
    imageSrc: "/icons/Heart.svg",
    text: "Love",
    type: "right",
    position: { top: "80%", right: "25%" },
    positionMobile: { top: "35%", left: "10%" },
    delay: 0.75,
  },
  {
    imageSrc: "/icons/HandHeart.svg",
    text: "Tenderness",
    type: "left",
    position: { top: "90%", left: "15%" },
    positionMobile: { top: "35%", left: "10%" },
    delay: 1,
  },
  // 2
];

const Hero = () => {
  const [Lottie, setLottie] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const firstFrameRef = useRef(null);
  const mobileFrameRef = useRef(null);
  const bubblesRef = useRef([]);
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
            { scale: 3 },
            { scale: 2, duration: 2 }
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
      });

      return () => ctx.revert();
    }
  }, [Lottie, isMobile]);

  if (!Lottie) {
    return <div className="min-h-screen w-full ">Loading...</div>;
  }

  if (isMobile) {
    return (
      <div
        ref={mobileFrameRef}
        className="w-full h-screen flex flex-col justify-center items-center pb-6"
      >
        <div className="mobilebox">
          <Lottie animationData={animationData} loop={true} />
        </div>
        <div className="relative flex flex-col items-center justify-center">
          <h1 className="mobile-title text-cblack-100 text-4xl opacity-0">
            Hello Mobile
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
        <div>
          {bubbles.map((bubble, index) => (
            <Bubble
              key={index}
              imageSrc={bubble.imageSrc}
              text={bubble.text}
              type={bubble.type}
              position={bubble.positionMobile}
              delay={bubble.delay}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default Hero;
