"use client";
import React, { useState, useEffect } from "react";

const mock = [
  {
    time: "10:00 AM",
    message: "I truly believe in the future of the new human species",
  },
  {
    time: "11:30 AM",
    message: "I truly believe in the future of the new human species",
  },
  {
    time: "12:45 PM",
    message: "I truly believe in the future of the new human species",
  },
  {
    time: "1:15 PM",
    message: "Exploring the possibilities of advanced AI integration",
  },
  {
    time: "2:30 PM",
    message: "The evolution of humanity and technology combined",
  },
  {
    time: "3:00 PM",
    message: "Future collaborations between humans and AI",
  },
  {
    time: "4:45 PM",
    message: "The limitless potential of new AI systems",
  },
];

const Message = ({ time, message }) => {
  const [glitchWords, setGlitchWords] = useState({});

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const glitchProbability = 0.1;

      if (Math.random() < glitchProbability) {
        const words = message.split(" ");
        const wordIndex = Math.floor(Math.random() * words.length);

        setGlitchWords((prev) => ({
          ...prev,
          [wordIndex]: true,
        }));

        setTimeout(() => {
          setGlitchWords((prev) => {
            const newGlitchWords = { ...prev };
            delete newGlitchWords[wordIndex];
            return newGlitchWords;
          });
        }, 1000);
      }
    }, 1200);

    return () => clearInterval(glitchInterval);
  }, [message]);

  const glitchChars =
    "01@#$%^&*()_+-=[]{}<>/?~";

  return (
    <div className="flex flex-col bg-cblack-50 p-4 mb-3 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <p className="text-lg font-semibold text-wild-100">{time}</p>
      <p className="text-wild-300 mt-2">
        {message.split(" ").map((word, index) => {
          let displayWord = word;
          let wordClass = "";

          if (glitchWords[index]) {
            displayWord = word
              .split("")
              .map(
                () =>
                  glitchChars.charAt(
                    Math.floor(Math.random() * glitchChars.length)
                  )
              )
              .join("");
            wordClass = "text-wild-100";
          }

          return (
            <span key={index} className={wordClass}>
              {displayWord}{" "}
            </span>
          );
        })}
      </p>
    </div>
  );
};

const ChatBlock = () => {
  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen py-10 px-6 bg-cover bg-center bg-cblack-100"
      style={{ backgroundImage: "url('/grain.jpg')" }}
    >
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-wild-100 text-center tracking-wide">
          Recent Conversations
        </h1>
      </div>
      <div className="flex w-full max-w-md flex-col gap-4 border border-cblack-50 rounded-lg bg-cblack-100 p-4">
        <div className="max-h-96 overflow-y-auto hide-scrollbar">
          {mock.map((item, index) => (
            <Message key={index} time={item.time} message={item.message} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBlock;
