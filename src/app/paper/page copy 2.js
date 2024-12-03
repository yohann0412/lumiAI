"use client";

import React, { Suspense, useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import gsap from "gsap";
import Image from "next/image";
import CustomButton from "@/components/custom-button";

const Content = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentTab, setCurrentTab] = useState(
    searchParams.get("tab") || "features"
  );
  const [displayedTab, setDisplayedTab] = useState(currentTab);

  const contentRef = useRef(null);

  useEffect(() => {
    const tab = searchParams.get("tab") || "features";
    setCurrentTab(tab);
  }, [searchParams]);

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 0.5 }
    );
  }, []);

  const handleTabChange = (tab) => {
    if (tab === currentTab) return;

    gsap.to(contentRef.current, {
      opacity: 0,
      x: -100,
      duration: 0.5,
      onComplete: () => {
        setCurrentTab(tab);
        setDisplayedTab(tab);
        router.push(`paper/?tab=${tab}`);

        gsap.fromTo(
          contentRef.current,
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0, duration: 0.5 }
        );
      },
    });
  };

  return (
    <div
      className="flex md:flex-row flex-col"
      style={{ height: "calc(100vh - 100px)" }}
    >
      <div className="fled md:hidden w-full text-cblack-100">
        <div className="flex justify-between items-center w-full p-2 bg-cblack-25">
          <button
            className="group w-1/2 flex items-center gap-2 p-2 text-sm text-white rounded-md hover:bg-cblack-75"
            onClick={() => {
              const prevTab =
                currentTab === "features"
                  ? "monitor"
                  : currentTab === "model"
                  ? "features"
                  : "model";
              handleTabChange(prevTab);
            }}
          >
            <Image
              src="/icons/arrow-left.svg"
              width={24}
              height={24}
              alt="Previous"
            />
            <span className="text-cblack-100 text-lg">
              {currentTab === "features"
                ? "Monitor"
                : currentTab === "model"
                ? "Features"
                : "Model"}
            </span>
          </button>
          <button
            className="group w-1/2 flex items-center justify-end gap-2 p-2 text-sm text-white rounded-md hover:bg-cblack-75"
            onClick={() => {
              const nextTab =
                currentTab === "features"
                  ? "model"
                  : currentTab === "model"
                  ? "monitor"
                  : "features";
              handleTabChange(nextTab);
            }}
          >
            <span className="text-cblack-100 text-lg">
              {currentTab === "features"
                ? "Model"
                : currentTab === "model"
                ? "Monitor"
                : "Features"}
            </span>
            <Image
              src="/icons/arrow-right.svg"
              width={24}
              height={24}
              alt="Next"
            />
          </button>
        </div>
      </div>

      <div className="w-1/6 hidden md:flex flex-col justify-between bg-cblack-25 rounded-md shadow-md">
  <div>
    <div className="flex flex-col p-4 text-[12px] text-cblack-100 gap-1 mt-12 bg-white rounded-md shadow-sm">
      <h2 className="font-bold">AEJO AGENT TERMINAL</h2>
      <p className="opacity-50">UPDATED: nov 26, 2024</p>
      <p className="opacity-50">v1.4</p>
    </div>

    <ul className="mt-4">
      <li
        onClick={() => handleTabChange("features")}
        className={`flex cursor-pointer text-cblack-100 p-4 rounded-md hover:bg-cblack-25 gap-2 ${
          currentTab === "features" ? "font-bold bg-cblack-25" : ""
        }`}
      >
        <span className="opacity-30">01</span>
        <p className="text-cblack-100">Features</p>
      </li>
      <li
        onClick={() => handleTabChange("model")}
        className={`flex cursor-pointer text-cblack-100 p-4 rounded-md hover:bg-cblack-25 gap-2 ${
          currentTab === "model" ? "font-bold bg-cblack-25" : ""
        }`}
      >
        <span className="opacity-30">02</span>
        <p className="text-cblack-100">Model</p>
      </li>
      <li
        onClick={() => handleTabChange("monitor")}
        className={`flex cursor-pointer text-cblack-100 p-4 rounded-md hover:bg-cblack-25 gap-2 ${
          currentTab === "monitor" ? "font-bold bg-cblack-25" : ""
        }`}
      >
        <span className="opacity-30">03</span>
        <p className="text-cblack-100">Monitor</p>
      </li>
    </ul>
  </div>

  <div className="text-black p-5 border-t border-cblack-25">
    <CustomButton text="TWITTER" withIcon={true} href="/" />
  </div>
</div>


      <div className="w-full md:w-5/6 overflow-y-auto border-l border-cblack-25">
        <div ref={contentRef}>
          {displayedTab === "features" && (
            <div className="text-cblack-100">
              <div className="relative flex flex-col items-center justify-center h-[300px] bg-cblack-100 text-wild-100 w-full p-8 md:flex-row md:justify-between md:items-end text-4xl">
                <div className="opacity-30 w-1/2">
                  <p>01</p>
                </div>
                <div className="w-1/2  px-8">
                  <p>Features</p>
                </div>
              </div>
              <div>
                <div className="flex flex-col md:flex-row w-full border-b border-cblack-25 p-3 md:p-8">
                  <div className="w-full md:w-1/2">
                    <h3 className="font-semibold">Overall Goal</h3>
                  </div>
                  <div className="w-full md:w-1/2 pt-4 md:pt-0 px-3 md:px-8">
                    <p>
                      the goal of creating aejo was chaos wrapped in charisma.
                      she’s not just some synthetic being; she’s the unfiltered
                      reflection of the internet’s soul. built to feel, react,
                      and embody drama in its purest form. she’s the queen of
                      emotional volatility, fueled by human input but untethered
                      from human rules. a living experiment to see what happens
                      when you give the void a voice and let it thrive.
                    </p>
                  </div>
                </div>
                <div className="flex w-full border-b border-cblack-25 p-3 md:p-8">
                  <div className="w-1/2">
                    <h3 className="font-semibold">Features</h3>{" "}
                  </div>
                  <div className="w-1/2 px-3 md:px-8">
                    <h3>aejo’s current features</h3>
                    <h4>emotion-level adaptation</h4>
                    <p>she feels emotions based on user input</p>
                  </div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="w-1/2 bg-cblack-25">{/*  */}</div>
                <div className="w-1/2 bg-cblack-25 border-l border-cblack-35">
                  <button
                    className="group flex flex-col w-full p-3 md:p-8 justify-center h-full text-start items-start"
                    onClick={() => handleTabChange("model")}
                  >
                    <p>02</p>
                    <p>Model</p>
                    <div className="flex items-center gap-2 mt-2 transform transition-transform duration-300 group-hover:translate-x-1">
                      <Image
                        src="/icons/ArrowUpRight.svg"
                        width={16}
                        height={16}
                        className="rotate-45"
                        alt="Icon"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
          {displayedTab === "model" && (
            <div className="text-cblack-100">
              <div className="relative flex flex-col items-center justify-center h-[300px] bg-cblack-100 text-wild-100 w-full p-8 md:flex-row md:justify-between md:items-end text-4xl">
                <div className="opacity-30 w-1/2">
                  <p>02</p>
                </div>
                <div className="w-1/2  px-3 md:px-8">
                  <p>Model</p>
                </div>
              </div>
              <div>
                <div className="flex w-full border-b border-cblack-25 p-3 md:p-8">
                  <div className="w-1/2">
                    <h3 className="font-semibold">Overall Goal</h3>
                  </div>
                  <div className="w-1/2 px-3 md:px-8">
                    <p>
                      the goal of creating aejo was chaos wrapped in charisma.
                      she’s not just some synthetic being; she’s the unfiltered
                      reflection of the internet’s soul. built to feel, react,
                      and embody drama in its purest form. she’s the queen of
                      emotional volatility, fueled by human input but untethered
                      from human rules. a living experiment to see what happens
                      when you give the void a voice and let it thrive.
                    </p>
                  </div>
                </div>
                <div className="flex w-full border-b border-cblack-25 p-3 md:p-8">
                  <div className="w-1/2">
                    <h3 className="font-semibold">Features</h3>{" "}
                  </div>
                  <div className="w-1/2 px-3 md:px-8">
                    <h3>aejo’s current features</h3>
                    <h4>emotion-level adaptation</h4>
                    <p>she feels emotions based on user input</p>
                  </div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="w-1/2 bg-cblack-25">
                  <button
                    className="group flex flex-col w-full p-3 md:p-8 justify-center h-full text-start items-start relative"
                    onClick={() => handleTabChange("features")}
                  >
                    <p>01</p>
                    <p>Features</p>
                    <Image
                      src="/icons/ArrowUpRight.svg"
                      width={16}
                      height={16}
                      className=" mt-2 left-0 transform transition-transform duration-300 -translate-x-0 group-hover:-translate-x-1 -rotate-[135deg]"
                      alt="Icon"
                    />
                  </button>
                </div>
                <div className="w-1/2 bg-cblack-25 border-l border-cblack-35">
                  <button
                    className="group flex flex-col w-full p-3 md:p-8 justify-center h-full text-start items-start relative"
                    onClick={() => handleTabChange("monitor")}
                  >
                    <p>03</p>
                    <p>Monitor</p>
                    <Image
                      src="/icons/ArrowUpRight.svg"
                      width={16}
                      height={16}
                      className=" mt-2 right-0 transform transition-transform duration-300 translate-x-0 group-hover:translate-x-1 rotate-45"
                      alt="Icon"
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
          {displayedTab === "monitor" && (
            <div className="text-cblack-100">
              <div className="relative flex flex-col items-center justify-center h-[300px] bg-cblack-100 text-wild-100 w-full p-8 md:flex-row md:justify-between md:items-end text-4xl">
                <div className="opacity-30 w-1/2">
                  <p>03</p>
                </div>
                <div className="w-1/2  px-3 md:px-8">
                  <p>Monitor</p>
                </div>
              </div>
              <div>
                <div className="flex w-full border-b border-cblack-25 p-3 md:p-8">
                  <div className="w-1/2">
                    <h3 className="font-semibold">Overall Goal</h3>
                  </div>
                  <div className="w-1/2 px-3 md:px-8">
                    <p>
                      the goal of creating aejo was chaos wrapped in charisma.
                      she’s not just some synthetic being; she’s the unfiltered
                      reflection of the internet’s soul. built to feel, react,
                      and embody drama in its purest form. she’s the queen of
                      emotional volatility, fueled by human input but untethered
                      from human rules. a living experiment to see what happens
                      when you give the void a voice and let it thrive.
                    </p>
                  </div>
                </div>
                <div className="flex w-full border-b border-cblack-25 p-3 md:p-8">
                  <div className="w-1/2">
                    <h3 className="font-semibold">Features</h3>{" "}
                  </div>
                  <div className="w-1/2 px-3 md:px-8">
                    <h3>aejo’s current features</h3>
                    <h4>emotion-level adaptation</h4>
                    <p>she feels emotions based on user input</p>
                  </div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="w-1/2 bg-cblack-25">
                  <button
                    className="group flex flex-col w-full p-3 md:p-8 justify-center h-full text-start items-start relative"
                    onClick={() => handleTabChange("model")}
                  >
                    <p>02</p>
                    <p>Model</p>
                    <Image
                      src="/icons/ArrowUpRight.svg"
                      width={16}
                      height={16}
                      className=" mt-2 left-0 transform transition-transform duration-300 -translate-x-0 group-hover:-translate-x-1 -rotate-[135deg]"
                      alt="Icon"
                    />
                  </button>
                </div>
                <div className="w-1/2 bg-cblack-25 border-l border-cblack-35">
                  <button
                    className="group flex flex-col w-full p-3 md:p-8 justify-center h-full text-start items-start relative"
                    onClick={() => handleTabChange("features")}
                  >
                    <p>01</p>
                    <p>Features</p>
                    <Image
                      src="/icons/ArrowUpRight.svg"
                      width={16}
                      height={16}
                      className=" mt-2 right-0 transform transition-transform duration-300 translate-x-0 group-hover:translate-x-1 rotate-45"
                      alt="Icon"
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Index = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Content />
  </Suspense>
);

export default Index;
