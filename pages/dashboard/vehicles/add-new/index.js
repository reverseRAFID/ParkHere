"use client";
import React, { useEffect, useState } from "react";
import UserWrapper from "@/components/UserWrapper";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Bike, Car, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession, getSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

export default function AddNewVehicle() {
  const { user: session } = useSession();
  const [sess, setSess] = useState(null);
  const [formData, setFormData] = useState({
    vehicleType: "",
    vehicleNumber: "",
    ownerName: "",
    vehicleModel: "",
    userId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    fetch("/api/vehicle/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        toast({
          title: "Vehicle Added",
          description: "Vehicle has been added successfully",
        })
        console.log(data);
        window.location.href = "/dashboard/vehicles";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if(formData.userId===''){getSession().then(async (session) => {
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
            // setUser(data);
            setFormData({
              ...formData,
              userId: data.id,
            });
          });
      }
    });}
  }, []);

  return (
    <UserWrapper>
      <div>
        <div>
          <div className="font-bold text-lg">Add New Vehicle</div>
        </div>
        <div>
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                {/* <label htmlFor="vehicleType">Vehicle Type</label> */}

                <RadioGroup
                  defaultValue={formData.vehicleType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, vehicleType: value })
                  }
                  className="flex flex-row gap-4 my-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label
                      htmlFor="light"
                      className="p-8 border-2 rounded-lg cursor-pointer"
                    >
                      <Car />
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="heavy" id="heavy" />
                    <Label
                      htmlFor="heavy"
                      className="p-8 border-2 rounded-lg cursor-pointer"
                    >
                      <Truck />
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="motorbike" id="motorbike" />
                    <Label
                      htmlFor="motorbike"
                      className="p-8 border-2 rounded-lg cursor-pointer"
                    >
                      <Bike />
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <label htmlFor="vehicleNumber">Vehicle Plate Number</label>
                <Input
                  type="text"
                  name="vehicleNumber"
                  id="vehicleNumber"
                  onChange={handleChange}
                  value={formData.vehicleNumber}
                />
              </div>
              <div>
                <label htmlFor="ownerName">Owners Full Name</label>
                <Input
                  type="text"
                  name="ownerName"
                  id="ownerName"
                  onChange={handleChange}
                  value={formData.ownerName}
                />
              </div>
              <div>
                <label htmlFor="vehicleModel">
                  Vehicle Company and Model{" "}
                  <span className="text-gray-600 text-sm">
                    (e.g. Toyota Corolla X)
                  </span>
                </label>
                <Input
                  type="text"
                  name="vehicleModel"
                  id="vehicleModel"
                  onChange={handleChange}
                  value={formData.vehicleModel}
                />
              </div>
              <div className="mt-4">
                <Button type="submit" className="w-full">
                  Add Vehicle
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </UserWrapper>
  );
}
