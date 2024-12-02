import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="text-black bg-wild-100 px-14 py-6 sticky top-0 z-50">
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
