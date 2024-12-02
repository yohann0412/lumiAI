import React from "react";

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
            <div
              key={index}
              className="flex flex-col bg-cblack-50 p-4 mb-3 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <p className="text-lg font-semibold text-wild-100">{item.time}</p>
              <p className="text-wild-300 mt-2">{item.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBlock;
