import React from "react";
import Link from "next/link";
import Image from "next/image";

const CustomButton = ({
  text,
  type = "white",
  withIcon = false,
  href = "#",
}) => {
  const buttonClass =
    type === "dark"
      ? "bg-inherit text-white "
      : "bg-inherit text-black  border border-gray-300 hover:border-gray-400 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring" ;

  return (
    <Link
      href={href}
      className={`inline-flex w-full items-center justify-center px-2 py-1 rounded-md font-medium text-[12px] transition-all duration-300 gap-2 ${buttonClass}`}
    >
      {text}
      {withIcon && (
        <Image
          src="/icons/ArrowUpRight.svg"
          alt="Arrow Icon"
          className=""
          width={14}
          height={14}
        />
      )}
    </Link>
  );
};

export default CustomButton;
