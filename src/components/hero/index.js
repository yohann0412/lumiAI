import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Bubble from "../bubble";

const bubbles = [
  {
    imageSrc: "/icons/MusicNotes.svg",
    text: "Music?",
    type: "left",
    position: { top: "25%", left: "16%" },
  },
  {
    imageSrc: "/icons/Heart.svg",
    text: "Life?",
    type: "right",
    position: { top: "50%", right: "18%" },
  },
  {
    imageSrc: "/icons/SmileySticker.svg",
    text: "Emotional Growth?",
    type: "right",
    position: { top: "25%", right: "10%" },
  },
  {
    imageSrc: "/icons/FilmSlate.svg",
    text: "Film?",
    type: "left",
    position: { top: "50%", left: "20%" },
  },
];

const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center text-center text-black">
      <div className="absolute top-0 right-0 z-10 w-full h-[400px]">
        {bubbles.map((bubble, index) => (
          <Bubble
            key={index}
            imageSrc={bubble.imageSrc}
            text={bubble.text}
            type={bubble.type}
            position={bubble.position}
          />
        ))}
      </div>

      <div>
        <Image
          src="/images/hero.png"
          alt="Hero Image"
          width={1440}
          height={500}
        />
      </div>

      <div className="relative">
        {/* <div className=" absolute -top-[30px] left-1/2 transform -translate-x-1/2 p-1 rounded-sm bg-blue-600"> */}
        <div className=" absolute -top-[30px] left-1/2 transform -translate-x-1/2 p-1 rounded-sm ">
          <Button className="  px-9 py-6 text-white rounded-sm">
            <Image
              src="/icons/ChatTeardrop.svg"
              alt="Coin Vertical Logo"
              width={20}
              height={20}
            />
            CHAT NOW
          </Button>
        </div>

        <h1 className="text-4xl uppercase font-bold mb-2 py-24">
          The AI That Thinks Along Side Us All
        </h1>
      </div>
    </div>
  );
};

export default Hero;
