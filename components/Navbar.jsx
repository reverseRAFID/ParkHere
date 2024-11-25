"use client";

import Image from "next/image";
import React from "react";
import Logo from "../assets/icons/logo.svg";
import Line from "../assets/icons/v1.svg";
import Menu from "../assets/icons/menu.svg";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {Gauge}  from "lucide-react"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { data: session } = useSession({
    required: false,
  });
  return (
    <React.Fragment>
      <div className="flex flex-row gap-12 py-5 justify-between  w-full sticky bg-white ">
        <Link href={"/"}>
          <Image src={Logo} alt="Logo" className="cursor-pointer" />
        </Link>
        {/* /* Desktop */}
        <div className="flex-1 w-full justify-between flex-row hidden lg:flex">
          <div>
            <ul className="flex flex-row gap-8">
              <li className="cursor-pointer hover:font-semibold">Features</li>
              <li className="cursor-pointer hover:font-semibold">Pricing</li>
              <li className="cursor-pointer hover:font-semibold">About Us</li>
              <li className="cursor-pointer hover:font-semibold">Contact</li>
            </ul>
          </div>
          <div className="flex flex-row gap-8">
            {/* <div className="cursor-pointer">Download app</div>
            <Image src={Line} alt="Line" /> */}
            {!session && (
              <Link href={"/login"}>
                <div className="cursor-pointer hover:font-semibold">Log in</div>
              </Link>
            )}
            {!session && (
              <div className="bg-[#14AE5C] hover:font-semibold hover:bg-[#167140] cursor-pointer text-white rounded-lg items-center justify-center py-2 px-5 -mt-2">
                Try it free
              </div>
            )}

            {session && (
              <Link href={"/dashboard"}>
                <div className="bg-[#14AE5C] flex flex-row gap-2 hover:font-semibold hover:bg-[#167140] cursor-pointer text-white rounded-lg items-center justify-center py-2 px-5 -mt-2">
                <Gauge /> Dashboard 
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* /* Mobile */}
        <div className="flex flex-row gap-4 lg:hidden relative">
          <div className="bg-[#14AE5C] hover:bg-[#167140] cursor-pointer text-white rounded-lg items-center justify-center py-2 px-5 -mt-2">
            Try it free
          </div>
          <div
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
            className="cursor-pointer"
          >
            <Image src={Menu} alt="Menu" />
          </div>
          <div
            className={`${
              menuOpen ? "-left-28" : "left-[200%]"
            } -left-28 transition-all absolute border border-1 w-[16.5rem] mt-12 rounded-lg shadow-lg bg-white`}
          >
            <div className="">
              <div>
                <ul className="flex flex-col">
                  <li className="cursor-pointer p-3 hover:bg-[#31723417]">
                    Features
                  </li>
                  <li className="cursor-pointer p-3 hover:bg-[#31723417]">
                    Pricing
                  </li>
                  <li className="cursor-pointer p-3 hover:bg-[#31723417]">
                    About Us
                  </li>
                  <li className="cursor-pointer p-3 hover:bg-[#31723417]">
                    Contact
                  </li>
                </ul>
              </div>
              <div className="flex flex-col">
                {/* <div className="p-6 hover:bg-[#31723417]">Download app</div> */}
                {/* <Image src={Line} alt="Line" /> */}
                <Link href={"/login"}>
                  <div className="p-3 cursor-pointer hover:bg-[#31723417] font-bold">
                    Log in
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
