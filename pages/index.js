import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Landing/Hero";

import {Inter} from 'next/font/google';
import WhyChose from "@/components/Landing/WhyChose";
const inter = Inter({
  display: 'swap',
  strategy: 'selfHosted',
  weights: [400, 500, 700],
})

export default function Home() {
  return (
    <div className={`flex justify-center bg-[#FAFEFC] ${inter.className}`}>
      <div className="flex flex-col w-full max-w-screen-2xl px-4 lg:px-2">
        <div className=""><Navbar /></div>
        <div className="py-11 w-full"><Hero/></div>
        <div><WhyChose/></div>
      </div>
    </div>
  );
}
