import React from "react";
import Image from "next/image";
import Heropic from "../../assets/images/hero.png";

export default function Hero() {
  return (
    <div className="">
      <div className="flex flex-col w-full justify-center">
        <div className="font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center pt-[40px] md:pt-[78px] lg:pt-[94px]">
          Simplify Parking with{" "}<br/>
          <span className="font-bold text-[#3E8D62]">ParkHere</span>{" "}
        </div>
      </div>

      <div className="pt-[50px] pb-[22px] md:pb-[94px] w-full flex flex-row justify-center items-center">
        <Image src={Heropic} alt="Hero" />
      </div>
    </div>
  );
}
