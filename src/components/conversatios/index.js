// /src/components/Conversations/index.js
"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import tweetsData from '../../../tweets.json';

gsap.registerPlugin(ScrollTrigger);

const Conversations = () => {
  const tweets = tweetsData.tweets;
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            onEnter: () => {
              gsap.fromTo(
                ".tweet-item",
                { opacity: 0, x: -30 },
                {
                  opacity: 1,
                  x: 0,
                  duration: 1,
                  ease: "power3.out",
                  stagger: 0.3,
                }
              );
            },
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <h2>Recent Tweets</h2>
      <div className="px-12">
        <div className="border-t-2 border-[#DEDEDE] w-full">
          {tweets.map((tweet) => (
            <Link
              href={tweet.url}
              key={tweet.id}
              target="_blank"
              rel="noopener noreferrer"
              className="tweet-item group flex items-center justify-between border-b-2 border-[#DEDEDE] hover:border-cblack-100 transition-colors duration-300 cursor-pointer"
            >
              <div className="flex flex-col gap-2 w-full max-w-[15%] text-cblack-100 border-r-2 border-[#DEDEDE] items-start py-8 min-w-[200px]">
                <p className="text-[20px]">{new Date(tweet.timestamp).toLocaleDateString()}</p>
                <p className="text-[20px]">{new Date(tweet.timestamp).toLocaleTimeString()}</p>
              </div>
              <div className="relative flex items-center gap-2 w-full text-cblack-100 pl-14">
                <p className="text-2xl">{tweet.content}</p>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-cblack-100">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Conversations;
