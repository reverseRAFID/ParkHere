import React, { useState, useEffect } from "react";
import UserWrapper from "@/components/UserWrapper";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import { Bike, Car, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CheckIn() {
  const id = useRouter().query.id;
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: session } = useSession();
  const [sess, setSess] = useState(null);
  const [user, setUser] = useState(null);
  const [slotDetails, setSlotDetails] = useState(null);
  const [activeReservation, setActiveReservation] = useState(null);
  const [activeVehicle, setActiveVehicle] = useState(null);

  console.log("Active Reservation: ", activeReservation);
  console.log("Active Vehicle: ", activeVehicle);
  console.log("Slot Details: ", slotDetails);
  console.log("ID: ", id);

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

    fetch(`/api/parking/get-parking-slot-details?parkingSlotId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        // if (data?.parkingSlot?.isOccupied) {
        //   alert("Slot is already occupied. Please scan another slot to check-in.");
        //   window.location.href = "/dashboard/find-parking";
        // }
        setSlotDetails(data);
        data?.parkingSlot?.Reservation.map((reservation) => {
          if (reservation.reservationStatus === "active") {
            setActiveReservation(reservation);
            fetch(`/api/vehicle/get?vehicleId=${reservation.vehicleProfileId}`)
              .then((res) => res.json())
              .then((data) => {
                setActiveVehicle(data);
              });
          }
        });
      });
  }, [id]);

  useEffect(() => {
    if (user) {
      fetch("/api/vehicle/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setVehicles(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [user]);

  const [formData, setFormData] = useState({
    parkingId: slotDetails?.parkingSlot?.parking?.id,
    parkingSlotId: id,
    userId: user?.id,
    vehicleProfileId: "",
    reservationStartTime: new Date(),
    // reservationEndTime: reservationEndTime ? new Date(reservationEndTime) : null,
    reservationStatus: "active",
    // paymentId,
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    formData.parkingId = slotDetails?.parkingSlot?.parking?.id;
    formData.parkingSlotId = id;
    formData.userId = user?.id;

    if (formData.vehicleProfileId === "") {
      alert("Please select a vehicle");
      return;
    }

    console.log(formData);

    await fetch("/api/parking/check-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.id) {
          alert("Checked In Successfully");
          window.location.href = "/dashboard/find-parking";
        }
      });
  };

  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (activeReservation) {
      const interval = setInterval(() => {
        setTimeElapsed(
          Math.floor(
            (new Date() - new Date(activeReservation.reservationStartTime)) /
              (1000)
          )
        );
      }, 1000); // Update every minute

      return () => clearInterval(interval);
    }
  }, [activeReservation]);

  return (
    <UserWrapper>
      <div>
        <div className="flex flex-row justify-between">
          <div className="font-bold text-lg">Check Out</div>
          {slotDetails && slotDetails.parkingSlot && (
            <div className="flex flex-col items-center">
              <div>
                {slotDetails?.parkingSlot?.parkingType === "motorbike" && (
                  <Bike size={32} />
                )}
                {slotDetails?.parkingSlot?.parkingType === "light" && (
                  <Car size={32} />
                )}
                {slotDetails?.parkingSlot?.parkingType === "heavy" && (
                  <Truck size={32} />
                )}
              </div>
              <div className="font-bold">
                Slot {slotDetails?.parkingSlot?.parkingSlotNumber}
              </div>
            </div>
          )}
        </div>
        <div className="">
          <div className="font-bold">Parking Details</div>
          <div>
            {slotDetails?.parkingSlot?.parking?.parkingName}
            <br />
            {slotDetails?.parkingSlot?.parking?.locationAddress}
            <br />
            Rate:{" "}
            <span className="font-bold text-lg">
              ৳
              {slotDetails &&
                slotDetails.parkingSlot &&
                slotDetails.parkingSlot.parkingType === "light" &&
                `${slotDetails?.parkingSlot?.parking?.lightVehicleRate}`}
              {slotDetails &&
                slotDetails.parkingSlot &&
                slotDetails.parkingSlot.parkingType === "heavy" &&
                `${slotDetails?.parkingSlot?.parking?.heavyVehicleRate}`}
              {slotDetails &&
                slotDetails.parkingSlot &&
                slotDetails.parkingSlot.parkingType === "motorbike" &&
                `${slotDetails?.parkingSlot?.parking?.motorbikeBicycleRate}`}
            </span>
            /hr
          </div>
          <div className="mt-4">
            <div>
              <span className="font-bold">Parked Vehicle:</span> {activeVehicle?.vehicleNumber} -{" "}
              {activeVehicle?.vehicleModel}
            </div>
            <div>
              Parked at:{" "}
              {new Date(activeReservation?.reservationStartTime).toLocaleString()}
            </div>
            <div>
              Time Elapsed:{" "}
              {activeReservation && (
                <span>
                  {Math.floor(timeElapsed / 3600)} hours{" "}
                  {Math.floor((timeElapsed % 3600) / 60)} minutes{" "}
                  {timeElapsed % 60} seconds
                </span>
              )}
            </div>
          </div>
          <div className="mt-4">
            <Button className="w-full" onClick={onSubmit}>
              Check Out
            </Button>
          </div>
        </div>
      </div>
    </UserWrapper>
  );
}
