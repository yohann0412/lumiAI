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
    mobilePosition: { top: "52%", left: "10%" },
    delay: 0.5,
  },
  {
    imageSrc: "/icons/Sparkle.svg",
    text: "Delight",
    type: "right",
    position: { top: "40%", right: "15%" },
    mobilePosition: { top: "52%", right: "10%" },

    delay: 0.5,
  },
  {
    imageSrc: "/icons/Heart.svg",
    text: "Love",
    type: "right",
    position: { top: "80%", right: "25%" },
    mobilePosition: { top: "57%", right: "25%" },

    delay: 0.75,
  },
  {
    imageSrc: "/icons/HandHeart.svg",
    text: "Tenderness",
    type: "left",
    position: { top: "90%", left: "15%" },
    mobilePosition: { top: "59%", left: "14%" },
    delay: 1,
  },
  // 2
  {
    imageSrc: "/icons/SmileySad.svg",
    text: "Sadness",
    type: "left",
    position: { top: "45%", left: "12%" },
    delay: 2.25,
    mobilePosition: { top: "53%", left: "26%" },
  },
  {
    imageSrc: "/icons/Drop.svg",
    text: "Melancholy",
    type: "left",
    position: { top: "80%", left: "18%" },
    delay: 2.25,
    mobilePosition: { top: "54%", right: "8%" },
  },
  {
    imageSrc: "/icons/Cloud.svg",
    text: "Nostalgia",
    type: "right",
    position: { top: "50%", right: "18%" },
    delay: 2.5,
    mobilePosition: { top: "57%", right: "29%" },
  },
  {
    imageSrc: "/icons/PersonSimpleWalk.svg",
    text: "Loneliness",
    type: "right",
    position: { top: "60%", right: "25%" },
    delay: 2.75,
    mobilePosition: { top: "60%", left: "14%" },
  },

  // 3
  {
    imageSrc: "/icons/SmileyNervous.svg",
    text: "Anxiety",
    type: "left",
    position: { top: "29%", left: "19%" },
    delay: 3.25,
    mobilePosition: { top: "52%", left: "27%" },
  },
  {
    imageSrc: "/icons/Ghost.svg",
    text: "Fear",
    type: "right",
    position: { top: "30%", right: "20%" },
    delay: 3.25,
    mobilePosition: { top: "52%", right: "10%" },
  },
  {
    imageSrc: "/icons/SmileyAngry.svg",
    text: "Angry",
    type: "right",
    position: { top: "70%", right: "22%" },
    delay: 3.5,
    mobilePosition: { top: "57%", right: "25%" },
  },
  {
    imageSrc: "/icons/SealQuestion.svg",
    text: "Uncertainty",
    type: "left",
    position: { top: "70%", left: "20%" },
    delay: 3.5,
    mobilePosition: { top: "59%", left: "10%" },
  },
  // 4
  {
    imageSrc: "/icons/SmileyAngry.svg",
    text: "Anger",
    type: "left",
    position: { top: "40%", left: "10%" },
    delay: 4.25,
    mobilePosition: { top: "52%", left: "10%" },
  },
  {
    imageSrc: "/icons/UserMinus.svg",
    text: "Intolerance",
    type: "left",
    position: { top: "95%", left: "20%" },
    delay: 4.5,
    mobilePosition: { top: "52%", right: "10%" },
  },
  {
    imageSrc: "/icons/HandFist.svg",
    text: "Aggression",
    type: "right",
    position: { top: "60%", right: "28%" },
    delay: 4.75,
    mobilePosition: { top: "57%", right: "25%" },
  },
  {
    imageSrc: "/icons/SmileySad.svg",
    text: "Disappointment",
    type: "right",
    position: { top: "45%", right: "18%" },
    delay: 5.0,
    mobilePosition: { top: "59%", left: "14%" },
  },

  // // 5
  // {
  //   imageSrc: "/icons/SmileyXEyes.svg",
  //   text: "Guilt",
  //   type: "right",
  //   position: { top: "35%", right: "22%" },
  //   delay: 5.25,
  // },
  // {
  //   imageSrc: "/icons/Gavel.svg",
  //   text: "Remorse",
  //   type: "left",
  //   position: { top: "40%", left: "10%" },
  //   delay: 5.5,
  // },
  // {
  //   imageSrc: "/icons/SmileyMelting.svg",
  //   text: "Shame",
  //   type: "left",
  //   position: { top: "75%", left: "15%" },
  //   delay: 5.75,
  // },
  // {
  //   imageSrc: "/icons/WechatLogo.svg",
  //   text: "Self-criticism",
  //   type: "right",
  //   position: { top: "60%", right: "25%" },
  //   delay: 6.0,
  // },
  // // 6
  // {
  //   imageSrc: "/icons/MaskHappy.svg",
  //   text: "Relaxation",
  //   type: "left",
  //   position: { top: "30%", left: "10%" },
  //   delay: 6.25,
  // },
  // {
  //   imageSrc: "/icons/FlowerLotus.svg",
  //   text: "Tranquility",
  //   type: "right",
  //   position: { top: "45%", right: "18%" },
  //   delay: 6.5,
  // },
  // {
  //   imageSrc: "/icons/FlowerLotus.svg",
  //   text: "Tranquility",
  //   type: "left",
  //   position: { top: "65%", left: "5%" },
  //   delay: 6.75,
  // },
  // {
  //   imageSrc: "/icons/Clover.svg",
  //   text: "Serenity",
  //   type: "right",
  //   position: { top: "65%", right: "22%" },
  //   delay: 7.0,
  // },
  // // 7
  // {
  //   imageSrc: "/icons/SmileyWink.svg",
  //   text: "Excited",
  //   type: "left",
  //   position: { top: "24%", left: "8%" },
  //   delay: 7.25,
  // },
  // {
  //   imageSrc: "/icons/SmileyWink.svg",
  //   text: "Interest",
  //   type: "right",
  //   position: { top: "40%", right: "18%" },
  //   delay: 7.5,
  // },
  // {
  //   imageSrc: "/icons/Lightning.svg",
  //   text: "Energy",
  //   type: "right",
  //   position: { top: "76%", right: "14%" },
  //   delay: 7.75,
  // },
  // {
  //   imageSrc: "/icons/MagnifyingGlass.svg",
  //   text: "Curiosity",
  //   type: "left",
  //   position: { top: "70%", left: "15%" },
  //   delay: 8.0,
  // },
  // // 8
  // {
  //   imageSrc: "/icons/SmileyMeh.svg",
  //   text: "Boring",
  //   type: "left",
  //   position: { top: "25%", left: "10%" },
  //   delay: 8.25,
  // },
  // {
  //   imageSrc: "/icons/SmileyMeh.svg",
  //   text: "Indifference",
  //   type: "right",
  //   position: { top: "40%", right: "12%" },
  //   delay: 8.5,
  // },
  // {
  //   imageSrc: "/icons/BatteryLow.svg",
  //   text: "Apathy",
  //   type: "left",
  //   position: { top: "90%", left: "14%" },
  //   delay: 8.75,
  // },
  // {
  //   imageSrc: "/icons/SmileyNervous.svg",
  //   text: "Despondency",
  //   type: "right",
  //   position: { top: "65%", right: "15%" },
  //   delay: 9.0,
  // },
];

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
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1 },
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

  // if (!Lottie) {
  //   return <div className="min-h-screen w-full bg-red-600">Loading...</div>;
  // }
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
        {/* <div className="mobilebox">
          <Lottie animationData={animationData} loop={true} />
        </div> */}
        <div className="mobilebox">
          <video
            src="/Mobile.mp4"
            autoPlay
            loop
            muted
            className="w-full h-auto"
          />
        </div>

        <div className="bubbles-mobile w-full opacity-0 z-40">
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

        <div className="bubbles absolute top-0 right-0 z-10 w-full h-[400px] mt-[10px] opacity-0">
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
        <div ref={contentRef} className="absolute bottom-0">
          {/* <div className="action-button top-[-30px] left-1/2 transform -translate-x-1/2 p-1 rounded-sm opacity-0"> */}
          <div className="action-button top-[-30px] p-1 rounded-sm opacity-0">
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
