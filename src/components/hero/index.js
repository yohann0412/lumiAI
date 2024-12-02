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
    imageSrc: "/icons/Smiley.svg",
    text: "Happiness",
    type: "left",
    position: { top: "35%", left: "10%" },
    delay: 0.5,
  },
  {
    imageSrc: "/icons/Sparkle.svg",
    text: "Delight",
    type: "right",
    position: { top: "40%", right: "15%" },
    delay: 0.5,
  },
  {
    imageSrc: "/icons/Heart.svg",
    text: "Love",
    type: "right",
    position: { top: "80%", right: "25%" },
    delay: 0.75,
  },
  {
    imageSrc: "/icons/HandHeart.svg",
    text: "Tenderness",
    type: "left",
    position: { top: "90%", left: "15%" },
    delay: 1,
  },
  // 2
  {
    imageSrc: "/icons/SmileySad.svg",
    text: "Sadness",
    type: "left",
    position: { top: "45%", left: "12%" },
    delay: 2.25,
  },
  {
    imageSrc: "/icons/Drop.svg",
    text: "Melancholy",
    type: "left",
    position: { top: "80%", left: "18%" },
    delay: 2.25,
  },
  {
    imageSrc: "/icons/Cloud.svg",
    text: "Nostalgia",
    type: "right",
    position: { top: "50%", right: "18%" },
    delay: 2.5,
  },
  {
    imageSrc: "/icons/PersonSimpleWalk.svg",
    text: "Loneliness",
    type: "right",
    position: { top: "60%", right: "25%" },
    delay: 2.75,
  },
  // 3
  {
    imageSrc: "/icons/SmileyNervous.svg",
    text: "Anxiety",
    type: "left",
    position: { top: "29%", left: "19%" },
    delay: 3.25,
  },
  {
    imageSrc: "/icons/Ghost.svg",
    text: "Fear",
    type: "right",
    position: { top: "30%", right: "20%" },
    delay: 3.25,
  },
  {
    imageSrc: "/icons/SmileyAngry.svg",
    text: "Angry",
    type: "right",
    position: { top: "70%", right: "22%" },
    delay: 3.5,
  },
  {
    imageSrc: "/icons/SealQuestion.svg",
    text: "Uncertainty",
    type: "left",
    position: { top: "70%", left: "20%" },
    delay: 3.5,
  },
  // 4
  {
    imageSrc: "/icons/SmileyAngry.svg",
    text: "Anger",
    type: "left",
    position: { top: "40%", left: "10%" },
    delay: 4.25,
  },
  {
    imageSrc: "/icons/UserMinus.svg",
    text: "Intolerance",
    type: "left",
    position: { top: "95%", left: "20%" },
    delay: 4.5,
  },
  {
    imageSrc: "/icons/HandFist.svg",
    text: "Aggression",
    type: "right",
    position: { top: "60%", right: "28%" },
    delay: 4.75,
  },
  {
    imageSrc: "/icons/SmileySad.svg",
    text: "Disappointment",
    type: "right",
    position: { top: "45%", right: "18%" },
    delay: 5.0,
  },
  // 5
  {
    imageSrc: "/icons/SmileyXEyes.svg",
    text: "Guilt",
    type: "right",
    position: { top: "35%", right: "22%" },
    delay: 5.25,
  },
  {
    imageSrc: "/icons/Gavel.svg",
    text: "Remorse",
    type: "left",
    position: { top: "40%", left: "10%" },
    delay: 5.5,
  },
  {
    imageSrc: "/icons/SmileyMelting.svg",
    text: "Shame",
    type: "left",
    position: { top: "75%", left: "15%" },
    delay: 5.75,
  },
  {
    imageSrc: "/icons/WechatLogo.svg",
    text: "Self-criticism",
    type: "right",
    position: { top: "60%", right: "25%" },
    delay: 6.0,
  },
  // 6
  {
    imageSrc: "/icons/MaskHappy.svg",
    text: "Relaxation",
    type: "left",
    position: { top: "30%", left: "10%" },
    delay: 6.25,
  },
  {
    imageSrc: "/icons/FlowerLotus.svg",
    text: "Tranquility",
    type: "right",
    position: { top: "45%", right: "18%" },
    delay: 6.5,
  },
  {
    imageSrc: "/icons/FlowerLotus.svg",
    text: "Tranquility",
    type: "left",
    position: { top: "65%", left: "5%" },
    delay: 6.75,
  },
  {
    imageSrc: "/icons/Clover.svg",
    text: "Serenity",
    type: "right",
    position: { top: "65%", right: "22%" },
    delay: 7.0,
  },
  // 7
  {
    imageSrc: "/icons/SmileyWink.svg",
    text: "Excited",
    type: "left",
    position: { top: "24%", left: "8%" },
    delay: 7.25,
  },
  {
    imageSrc: "/icons/SmileyWink.svg",
    text: "Interest",
    type: "right",
    position: { top: "40%", right: "18%" },
    delay: 7.5,
  },
  {
    imageSrc: "/icons/Lightning.svg",
    text: "Energy",
    type: "right",
    position: { top: "76%", right: "14%" },
    delay: 7.75,
  },
  {
    imageSrc: "/icons/MagnifyingGlass.svg",
    text: "Curiosity",
    type: "left",
    position: { top: "70%", left: "15%" },
    delay: 8.0,
  },
  // 8
  {
    imageSrc: "/icons/SmileyMeh.svg",
    text: "Boring",
    type: "left",
    position: { top: "25%", left: "10%" },
    delay: 8.25,
  },
  {
    imageSrc: "/icons/SmileyMeh.svg",
    text: "Indifference",
    type: "right",
    position: { top: "40%", right: "12%" },
    delay: 8.5,
  },
  {
    imageSrc: "/icons/BatteryLow.svg",
    text: "Apathy",
    type: "left",
    position: { top: "90%", left: "14%" },
    delay: 8.75,
  },
  {
    imageSrc: "/icons/SmileyNervous.svg",
    text: "Despondency",
    type: "right",
    position: { top: "65%", right: "15%" },
    delay: 9.0,
  },
];


const Hero = () => {
  const heroRef = useRef(null);
  const animationRef = useRef(null);
  const contentRef = useRef(null);
  const bubblesRef = useRef([]);
  const lettersRef = useRef([]);

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
        scrollTrigger: function (trigger) {
          return {
            trigger: trigger,
            start: "top top",
            end: "bottom+=100 top",
            pin: true,
            pinSpacing: true,
            markers: true,
          };
        },
      });
  
      mainTimeline.fromTo(
        animationRef.current,
        { scale: 2.5 },
        { scale: 1.2, duration: 1 }
      );
  
      mainTimeline.fromTo(
        contentRef.current,
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "<"
      );
  
      mainTimeline.fromTo(
        lettersRef.current,
        { y: 0, color: "#000" },
        {
          y: 20,
          color: "#67aac9",
          duration: 0.5,
          stagger: 0.05,
        },
        "+=0.3"
      );
  
      const bubblesGroups = [];
      for (let i = 0; i < bubbles.length; i += 4) {
        bubblesGroups.push(bubbles.slice(i, i + 4));
      }
  
      const bubblesTimeline = gsap.timeline({ repeat: -1 });
      const stepBetweenGroups = 2; 
  
      bubblesGroups.forEach((group, groupIndex) => {
        const startTime = groupIndex * stepBetweenGroups;
  
        group.forEach((bubble) => {
          const bubbleIndex = bubbles.indexOf(bubble);
          const randomOffset = (Math.random() - 0.5) * 1.4; //random
          bubblesTimeline.fromTo(
            bubblesRef.current[bubbleIndex],
            { opacity: 0, scale: 0 },
            {
              opacity: 1,
              scale: 1,
              duration: 1.25,
              ease: "back.out(1.7)",
            },
            startTime + randomOffset 
          );
        });
        
  
        group.forEach((bubble) => {
          const bubbleIndex = bubbles.indexOf(bubble);
          bubblesTimeline.to(
            bubblesRef.current[bubbleIndex],
            { opacity: 0, scale: 0, duration: 1.25, ease: "power2.in" },
            startTime + 1.25
          );
        });
      });
  
      mainTimeline.add(bubblesTimeline, "+=0.1");
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
        <h1 className="gsap-title text-4xl uppercase font-bold mb-2 py-24">
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
      <div className="absolute top-0 right-0 z-10 w-full h-[400px] mt-[10px]">
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
