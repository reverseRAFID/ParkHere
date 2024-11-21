import React from "react";
import WhyCard from "./WhyCard";

export default function WhyChose() {
  return (
    <section className="pb-[22px] md:pb-[94px]">
      <div className="py-[50px]">
        <div className="text-center font-semibold text-3xl">
          Why Choose ParkHere?
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <WhyCard title={"Generate QR Codes"} subtitle={"Easily create QR codes for parking spaces."} copy1={"QR Code Generation"} copy2={"Easy Setup"} />
        <WhyCard title={"Manage Parking"} subtitle={"Easily create QR codes for parking spaces."} copy1={"QR Code Generation"} copy2={"Easy Setup"} />
        <WhyCard title={"User-Friendly"} subtitle={"Easily create QR codes for parking spaces."} copy1={"QR Code Generation"} copy2={"Easy Setup"} />
        <WhyCard title={"Secure"} subtitle={"Easily create QR codes for parking spaces."} copy1={"QR Code Generation"} copy2={"Easy Setup"} />
      </div>
    </section>
  );
}
