"use client";

import MapContainer from "@/components/Map";
import NearbyParking from "@/components/NearbyParking";
import UserWrapper from "@/components/UserWrapper";

export default function Dashboard() {
  return (
    <UserWrapper>
      <div className="container mx-auto">
        <div className="font-bold text-2xl text-right">
          Find Parking Near You
        </div>
        <div className="p-4 rounded-lg">
          <MapContainer />
        </div>
        <div className="p-4 "><NearbyParking /></div>
      </div>
    </UserWrapper>
  );
}
