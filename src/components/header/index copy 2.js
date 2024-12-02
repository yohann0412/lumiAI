'use client'

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        scrolled ? "bg-cblack-100" : "bg-wild-100"
      } text-black px-14 py-6 sticky top-0 z-10 transition-colors duration-300`}
    >
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary-foreground">
          <Link href="/" className="text-cblack-100">
            LUMI.
            <span className="gradient-text">AI</span>
          </Link>
        </h1>
        <nav>
          <ul className="flex gap-6">
            <li className="font-helvetica cursor-pointer uppercase">
              <Link href="/paper" className="text-cblack-100">
                paper
              </Link>
            </li>
            <span className="opacity-[0.2]">|</span>
            <li className="font-helvetica flex items-center gap-2 cursor-pointer uppercase">
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
