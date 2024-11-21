import React from "react";
import Logo from "../../assets/icons/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  display: "swap",
  strategy: "selfHosted",
  weights: [400, 500, 700],
});

export default function Login() {
  return (
    <div className={`flex justify-center bg-[#FAFEFC] ${inter.className}`}>
      <div className="flex flex-col w-full max-w-screen-2xl px-4 lg:px-2 py-6">
        <Link href={"/"}>
          <Image src={Logo} alt="Logo" className="cursor-pointer" />
        </Link>
        <div className="flex flex-col h-[90vh] justify-center items-center">
          <div className="font-semibold text-3xl py-2">
            Login to Your Account
          </div>
          <div>Login to start booking parking spots with ease.</div>
        </div>
      </div>
    </div>
  );
}
