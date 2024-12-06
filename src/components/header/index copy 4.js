"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

const Header = () => {
  const headerFrame = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const header = headerFrame.current;

    gsap.set(header, { position: "absolute", top: 0, left: 0, y: "0%" });

    ScrollTrigger.create({
      start: "top top", 
      end: 9999, 
      onEnter: () => {
        gsap.set(header, { position: "sticky" }); 
      },
      onLeaveBack: () => {
        gsap.set(header, { position: "absolute" });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <header
      ref={headerFrame}
      className="text-black absolute bg-wild-100 px-4 md:px-14 py-6 w-full z-50 shadow-md"
    >
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary-foreground">
          <Link href="/" className="text-cblack-100">
            Lumi.
            <span className="gradient-text">AI</span>
          </Link>
        </h1>
        <nav>
          <ul className="flex gap-2 md:gap-6">
            <li className="font-helvetica cursor-pointer uppercase">
              <Link href="/paper" className="text-cblack-100">
                paper
              </Link>
            </li>
            <span className="opacity-[0.2]">|</span>
            <li className="font-helvetica flex items-center gap-1 md:gap-2 cursor-pointer uppercase">
              <Image
                src="/icons/CoinVertical.svg"
                alt="Coin Vertical Logo"
                width={20}
                height={20}
              />
              token
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
