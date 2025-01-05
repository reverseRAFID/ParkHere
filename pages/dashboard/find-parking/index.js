"use client";

import MapContainer from "@/components/Map";
import NearbyParking from "@/components/NearbyParking";
import UserWrapper from "@/components/UserWrapper";
import { Dot } from "lucide-react";
import { useSession, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Bike, Car, Truck } from "lucide-react";

export default function Dashboard() {
  const { user: session } = useSession();
  const [sess, setSess] = useState(null);
  const [user, setUser] = useState(null);
  const [slotDetails, setSlotDetails] = useState([]);

  console.log("Slot Details: ", slotDetails);
  // console.log("ID: ", id);
  console.log("User: ", user);

  useEffect(() => {
    if (!user) {
      getSession().then(async (session) => {
        setSess((prev) => session);
        if (session) {
          // console.log(session);
          // setRole((prev) => session.user.name);
          await fetch("/api/getLoggedInUserDetails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: session.user.email }),
          })
            .then((res) => res.json())
            .then((data) => {
              setUser(data);
            });
        }
      });
    }

    // fetch(`/api/parking/get-parking-slot-details?parkingSlotId=${}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setSlotDetails(data);
    //   });
  }, []);

  useEffect(() => {
    // var slotTemp = [];
    console.log(user?.Reservation);
    user?.Reservation?.map(async (reservation) => {
      // if (reservation.reservationStatus === "active") {
      //   slotTemp.push(reservation.parkingSlotId)
      // }
      await fetch(
        `/api/parking/get-parking-slot-details?parkingSlotId=${reservation.parkingSlotId}`
      )
        .then((res) => res.json())
        .then((data) => {
          setSlotDetails((prev) => [...slotDetails, data]);
        });
    });
    // setSlotDetails((prev) => [...slotTemp]);

    // console.log("Slot Temp: ", slotTemp);
    console.log("Slot Details: ", slotDetails);
  }, [user]);
  useEffect(() => {
    const interval = setInterval(() => {
      setSlotDetails((prevSlotDetails) =>
        prevSlotDetails.map((slotDetail, ind) => {
          const reservation = user?.Reservation[ind];
          if (reservation && reservation.reservationStatus === "active") {
            const elapsedTime = new Date() - new Date(reservation.reservationStartTime);
            return {
              ...slotDetail,
              elapsedTime,
            };
          }
          return slotDetail;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [user, slotDetails]);

  return (
    <UserWrapper>
      <div className="container mx-auto">
        {slotDetails &&
          slotDetails.length > 0 &&
          user?.Reservation?.map((reservation, ind) =>
            reservation.reservationStatus === "active" ? (
              <div
                key={reservation.id}
                onClick={() => {
                  window.location.href = `/check-out/slot/${reservation.parkingSlotId}`;
                }}
                className="p-4 border-2 hover:bg-gray-200 cursor-pointer border-gray-200 border-dashed rounded-lg mb-4"
              >
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row items-center font-bold">
                    Active Parking{" "}
                    <span className="text-green-700">
                      <Dot size={40} />
                    </span>
                  </div>
                  {slotDetails && slotDetails[ind].parkingSlot && (
                    <div className="flex flex-col items-center">
                      <div>
                        {slotDetails[ind]?.parkingSlot?.parkingType ===
                          "motorbike" && <Bike size={32} />}
                        {slotDetails[ind]?.parkingSlot?.parkingType ===
                          "light" && <Car size={32} />}
                        {slotDetails[ind]?.parkingSlot?.parkingType ===
                          "heavy" && <Truck size={32} />}
                      </div>
                      <div className="font-bold">
                        Slot {slotDetails[ind]?.parkingSlot?.parkingSlotNumber}
                      </div>
                    </div>
                  )}
                </div>
                <div>{slotDetails[ind]?.parkingSlot.parking.parkingName}</div>
                <div>
                  {slotDetails[ind]?.parkingSlot.parking.locationAddress}
                </div>
                {/* <div>
                  {reservation.reservationStartTime}
                </div> */}
                <div className="mt-4">
                  <span className="font-bold">Time Elapsed:</span> {Math.floor(slotDetails[ind]?.elapsedTime / 3600000)} hours, {Math.floor((slotDetails[ind]?.elapsedTime % 3600000) / 60000)} minutes, {Math.floor((slotDetails[ind]?.elapsedTime % 60000) / 1000)} seconds
                </div>
              </div>
            ) : null
          )}
        <div className="font-bold text-2xl text-right px-4">
          Find Parking Near You
        </div>
        <div className="p-4 rounded-lg">
          <MapContainer />
        </div>
        <div className="p-4 ">
          <NearbyParking />
        </div>
      </div>
    </UserWrapper>
  );
}
