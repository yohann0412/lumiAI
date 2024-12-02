import ChatBlock from "@/components/chatBlock";
import Spine from "@/components/spine";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <Spine />
      <div className="relative">
        <Button className=" absolute -top-[30px] left-1/2 transform -translate-x-1/2 px-6 text-white rounded-full">
          Chat Now
        </Button>
      </div>
      <div id="chat" className="max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-black text-center">
          THE AI <br />
          THAT <span className="gradient-text">THINKS</span> ALONGSIDE<br /> US ALL
        </h2>
      </div>
      <ChatBlock />
    </div>
  );
}
