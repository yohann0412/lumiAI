
const Bubble = ({ 
  imageSrc, 
  text, 
  type = "left", 
  position = { top: "50%", left: "50%" } 
}) => {
  const tailStyle = type === "left" 
    ? "right-[-8px] top-1/2 -translate-y-1/2 border-y-[10px] border-y-transparent border-l-[10px] border-l-[#fff]"
    : "left-[-8px] top-1/2 -translate-y-1/2 border-y-[10px] border-y-transparent border-r-[10px] border-r-[#fff]";

  return (
    <div
      className="absolute flex items-center gap-2 px-4 py-2 bg-[#fff] text-cblack-100 rounded-lg shadow-md animate-float"
      style={{ ...position }}
    >
      <img src={imageSrc} alt="Bubble Icon" className="w-6 h-6" />

      <span>{text}</span>

      <div
        className={`absolute ${tailStyle}`}
      ></div>
    </div>
  );
};

export default Bubble;
