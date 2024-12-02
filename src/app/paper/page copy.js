"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const Index = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get("tab") || "main";

  const [displayTab, setDisplayTab] = useState(currentTab);

  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        x: -100,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => {
          setDisplayTab(currentTab);

          gsap.fromTo(
            contentRef.current,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.3, ease: 'power3.out' }
          );
        }
      });
    }
  }, [currentTab]);

  const handleTabChange = (tab) => {
    router.push(`paper/?tab=${tab}`);
  };

  return (
    <div className="flex" style={{ height: "calc(100vh - 100px)" }}>
      <div className="w-1/5 p-4 bg-gray-600">
        <h2>Side</h2>
        <ul>
          <li
            onClick={() => handleTabChange("main")}
            className={`cursor-pointer p-2 ${
              currentTab === "main" ? "font-bold" : ""
            }`}
          >
            Main
          </li>
          <li
            onClick={() => handleTabChange("second")}
            className={`cursor-pointer p-2 ${
              currentTab === "second" ? "font-bold" : ""
            }`}
          >
            Second
          </li>
        </ul>
      </div>

      <div className="w-4/5 p-4 overflow-y-auto">
        <div ref={contentRef}>
          {displayTab === "main" && (
            <div className="text-cblack-100">
              <p>This is the main content</p>
              <p>This is the main content</p>
              <p>This is the main content</p>
              <p>This is the main content</p>
              <p>This is the main content</p>
              <p>This is the main content</p>
              <p>This is the main content</p>
            </div>
          )}
          {displayTab === "second" && (
            <div className="text-cblack-100">
              <p>This is the second content</p>
              <p>This is the second content</p>
              <p>This is the second content</p>
              <p>This is the second content</p>
              <p>This is the second content</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
