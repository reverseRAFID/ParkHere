import React from "react";
import Logo from "../../assets/icons/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const inter = Inter({
  display: "swap",
  strategy: "selfHosted",
  weights: [400, 500, 700],
  subsets: ["latin"],
});

export default function Login() {
  const [page, setPage] = React.useState(0);
  return (
    <div className={`flex justify-center bg-[#FAFEFC] ${inter.className}`}>
      <div className="flex flex-col w-full max-w-screen-2xl px-4 lg:px-2 py-6">
        <Link href={"/"}>
          <Image src={Logo} alt="Logo" className="cursor-pointer" />
        </Link>
        <div className="flex flex-col h-[90vh] justify-center items-center text-center">
          <div className="font-semibold text-3xl py-2">
            Login to Your Account
          </div>
          <div>Login to start booking parking spots with ease.</div>
          <div className="pt-8">
            <Input
              type="email"
              placeholder="Email"
              className=" rounded-xl max-w-[350px] sm:max-w-[400px] w-[100vw]"
            />
          </div>
          <div className="pt-3">
            <Input
              type="password"
              placeholder="Password"
              className=" rounded-xl max-w-[350px] sm:max-w-[400px] w-[100vw]"
            />
          </div>
          <div className="pt-3">
            <Button className="rounded-xl max-w-[350px] sm:max-w-[400px] w-[100vw]">
              Login
            </Button>
            </div>
            <div className="text-sm">or, <Link href={"/signup"}><span className="font-bold">Sign Up</span></Link></div>
        </div>
      </div>
    </div>
  );
}
