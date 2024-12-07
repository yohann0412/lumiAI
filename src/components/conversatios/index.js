"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const Conversations = () => {
  const [tweets, setTweets] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch("/api/tweets");
        if (!response.ok) {
          throw new Error("Failed to fetch tweets");
        }
        const data = await response.json();

        if (Array.isArray(data)) {
          setTweets(data);
        } else if (data.tweets && Array.isArray(data.tweets)) {
          setTweets(data.tweets);
        } else {
          console.error("Invalid tweets format:", data);
          setTweets([]);
        }
      } catch (error) {
        console.error("Error fetching tweets:", error);
        setTweets([]);
      }
    };

    fetchTweets();
  }, []);

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
  }, [tweets]);

  return (
    <div
      ref={containerRef}
      className="w-full md:h-[600px] max-h-[62vh] bg-wild-100 overflow-scroll"
    >
      <h2>Recent Tweets</h2>
      <div className="px-4 md:px-12">
        <div className="border-t-2 border-[#DEDEDE] w-full ">
          {tweets.map((tweet) => (
            <Link
              href={tweet.url}
              key={tweet.id}
              target="_blank"
              rel="noopener noreferrer"
              className="tweet-item group flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between border-b-2 border-[#DEDEDE] hover:border-cblack-100 transition-colors duration-300 cursor-pointer"
            >
              <div className="flex flex-col gap-2 w-full md:max-w-[15%] text-cblack-100 md:border-r-2 border-[#DEDEDE] items-start py-4 md:py-8">
                <p className="text-base md:text-[20px]">
                  {new Date(tweet.timestamp).toLocaleDateString()}
                </p>
                <p className="text-base md:text-[20px]">
                  {new Date(tweet.timestamp).toLocaleTimeString()}
                </p>
              </div>
              <div className="relative flex flex-col md:flex-row items-start md:items-center gap-2 w-full text-cblack-100 pl-0 md:pl-14">
                <p className="text-base md:text-2xl">{tweet.content}</p>
                <span className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-cblack-100">
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
