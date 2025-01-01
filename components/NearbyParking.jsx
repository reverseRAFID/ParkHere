import React from "react";
import ParkingImage from "../assets/images/parking.png";
import Image from "next/image";
import AccessIcon from "../assets/icons/access.png";
import SecurityIcon from "../assets/icons/security.png";
import CoveredParkingIcon from "../assets/icons/coveredParking.png";
import EvChargingIcon from "../assets/icons/evCharging.png";

export default function NearbyParking() {
  return (
    <div>
      <div className="font-bold text-lg">Nearby Parking Options</div>
      <div className="py-4 flex flex-row gap-2">
        <select
          className="border border-gray-300 rounded-2xl px-4 py-2"
          defaultValue={""}
        >
          <option value={""}>Price</option>
          <option value={"0-500"}>BDT0 - BDT500</option>
          <option value={"501-1000"}>BDT501 - BDT1000</option>
          <option value={"1001+"}>BDT1001 +</option>
        </select>

        <select
          className="border border-gray-300 rounded-2xl px-4 py-2"
          defaultValue={""}
        >
          <option value={""}>Distance</option>
          <option value={"0-1"}>0 - 1 km</option>
          <option value={"1-5"}>1 - 5 km</option>
          <option value={"5+"}>5+ km</option>
        </select>

        <select
          className="border border-gray-300 rounded-2xl px-4 py-2"
          defaultValue={""}
        >
          <option value={""}>Rating</option>
          <option value={"4"}>4+ stars</option>
          <option value={"3"}>3+ stars</option>
          <option value={"2"}>2+ stars</option>
        </select>

        <select
          className="border border-gray-300 rounded-2xl px-4 py-2"
          defaultValue={""}
        >
          <option value={""}>Features</option>
          <option value={"evCharging"}>EV Charging</option>
          <option value={"covered"}>Covered Parking</option>
          <option value={"security"}>Security</option>
        </select>
      </div>

      <div className="flex flex-col gap-4">
        <ParkingCard />
        <ParkingCard />
        <ParkingCard />
        <ParkingCard />
        <ParkingCard />
      </div>
    </div>
  );
}

function ParkingCard() {
  return (
    <div className="flex flex-row rounded-xl overflow-hidden bg-[#3172340f] hover:bg-[#31723421] cursor-pointer">
      <Image src={ParkingImage} alt="Parking" />
      <div className="flex-1 flex flex-col justify-center p-4">
        <div className="mb-4">
          <div className="font-bold text-lg">Downtown Garage</div>
          <div>4.5 ⭐️</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-row items-center gap-2">
            <Image
              className="h-[16px] w-[16px]"
              src={AccessIcon}
              alt="access"
            />{" "}
            24/7 Access
          </div>
          <div className="flex flex-row items-center gap-2">
            <Image
              className="h-[16px] w-[16px]"
              src={AccessIcon}
              alt="access"
            />{" "}
            24/7 Access
          </div>
          <div className="flex flex-row items-center gap-2">
            <Image
              className="h-[16px] w-[16px]"
              src={AccessIcon}
              alt="access"
            />{" "}
            24/7 Access
          </div>
          <div className="flex flex-row items-center gap-2">
            <Image
              className="h-[16px] w-[16px]"
              src={AccessIcon}
              alt="access"
            />{" "}
            24/7 Access
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="text-[#39833C] font-bold text-lg">$10/hr</div>
        <div className="text-right">$20</div>
      </div>
    </div>
  );
}
