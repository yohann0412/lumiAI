"use client";
import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const messages = [
    {
      date: "25/11/2024",
      time: "10:00 AM",
      message:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia",
    },
    {
      date: "25/12/2023",
      time: "10:00 AM",
      message:
        "There live the blind texts. Separated they live in Bookmarksgrove right at the coast",
    },
    {
      date: "25/12/2023",
      time: "11:00 AM",
      message:
        "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life.",
    },
    {
      date: "25/12/2023",
      time: "11:00 AM",
      message:
        "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life.",
    },
    {
      date: "25/12/2023",
      time: "11:00 AM",
      message:
        "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life.",
    },
    {
      date: "25/12/2023",
      time: "11:00 AM",
      message:
        "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life.",
    },
    {
      date: "25/12/2023",
      time: "11:00 AM",
      message:
        "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life.",
    },
  ];

const Conversations = () => {
  const containerRef = useRef(null);
  const messageRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        x: 200,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      messageRefs.current.forEach((el, index) => {
        gsap.from(el, {
          x: 200,
          opacity: 0,
          duration: 1,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !messageRefs.current.includes(el)) {
      messageRefs.current.push(el);
    }
  };

  return (
    <div ref={containerRef}>
      <div>
        <h2>Recent Conversations</h2>
      </div>
      <div className="px-12">
        <div className="border-t-2 border-[#DEDEDE] w-full">
          {messages.map((message, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="group flex items-center justify-between border-b-2 border-[#DEDEDE] hover:border-cblack-100 transition-colors duration-300 cursor-pointer"
            >
              <div className="flex flex-col gap-2 w-full max-w-[15%] text-cblack-100 border-r-2 border-[#DEDEDE] items-start py-8 min-w-[200px]">
                <p className="text-[20px]">{message.date}</p>
                <p className="text-[20px]">{message.time}</p>
              </div>
              <div className="relative flex items-center gap-2 w-full text-cblack-100 pl-14">
                <p className="text-2xl">{message.message}</p>
                <Image
                  src="/icons/ArrowUpRight.svg"
                  width={36}
                  height={36}
                  className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  alt="Icon"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Conversations;
