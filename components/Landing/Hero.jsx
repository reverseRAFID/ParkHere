import React from "react";
import Image from "next/image";
import Heropic from "../../assets/images/hero.png";

export default function Hero() {
  return (
    <div className="">
      <div className="flex flex-col w-full justify-center">
        <div className="font-semibold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-center pt-[40px] md:pt-[78px] lg:pt-[94px]">
          Simplify Parking with{" "}
          <span className="font-bold text-[#3E8D62]">ParkHere</span>{" "}
        </div>
      </div>

      <div className="pt-[50px] pb-[94px] w-full flex flex-row justify-center items-center">
        <Image src={Heropic} alt="Hero" />
      </div>
    </div>
  );
}
