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
        if (data?.parkingSlot?.isOccupied) {
          alert("Slot is already occupied. Please scan another slot to check-in.");
          window.location.href = "/dashboard/find-parking";
        }
        setSlotDetails(data);
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

  return (
    <UserWrapper>
      <div>
        <div className="flex flex-row justify-between">
          <div className="font-bold text-lg">Check In</div>
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
            </span>{" "}
            /hr
          </div>
          <form className="mt-4">
            <div className="text-xs mb-4 text-gray-600">
              Select a vehicle from the dropdown and click "Check In" below
            </div>
            <Select
              onValueChange={(value) => {
                formData.vehicleProfileId = value;
              }}
              name="vehicleProfileId"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Vehicle" />
              </SelectTrigger>
              <SelectContent>
                {vehicles.map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.vehicleNumber} - {vehicle.vehicleModel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </form>
          <div className="mt-4">
            <Button className="w-full" onClick={onSubmit}>
              Check In
            </Button>
          </div>
        </div>
      </div>
    </UserWrapper>
  );
}
