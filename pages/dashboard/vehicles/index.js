import { Button } from "@/components/ui/button";
import UserWrapper from "@/components/UserWrapper";
import React, { useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import { useState } from "react";
import { Bike, Car, Trash2, Truck } from "lucide-react";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: session } = useSession();
  const [sess, setSess] = useState(null);
  const [user, setUser] = useState(null);

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
  }, []);

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
  return (
    <UserWrapper>
      <div>
        <div className="flex flex-row justify-between">
          <div>
            <div className="font-bold text-lg">My Vehicles</div>
            <div>
              Manage your vehicles here. You can add, remove or edit your
              vehicles from here.
            </div>
          </div>
          <Button
            onClick={() => {
              window.location.href = "/dashboard/vehicles/add-new";
            }}
          >
            + Add New Vehicle
          </Button>
        </div>
        <div className="mt-4">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              {vehicles.length > 0 ? (
                <div>
                  <div className="flex flex-row gap-4 flex-wrap">
                    {vehicles.map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className="relative group p-8 border-2 border-dashed rounded-lg flex flex-col max-w-max cursor-pointer hover:bg-gray-100"
                      >
                        <div className="absolute top-2 right-2 hidden group-hover:block hover:text-red-600" onClick={() => {
                            if (confirm("Are you sure you want to delete this vehicle?")) {
                            fetch("/api/vehicle/get", {
                              method: "DELETE",
                              headers: {
                              "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                              vehicleId: vehicle.id,
                              }),
                            })
                              .then((response) => response.json())
                              .then((data) => {
                              console.log(data);
                              window.location.reload();
                              })
                              .catch((error) => {
                              console.error("Error:", error);
                              });
                            }
                        }}><Trash2 /></div>
                        <div className="font-bold text-lg">
                          {vehicle.vehicleNumber}
                        </div>
                        <div className="flex flex-row justify-between">
                          <div>{vehicle.vehicleModel}</div>
                          <div>
                            {vehicle.vehicleType === "light" && <Car />}
                            {vehicle.vehicleType === "heavy" && <Truck />}
                            {vehicle.vehicleType === "motorbike" && <Bike />}
                          </div>
                        </div>
                        <div>{vehicle.ownerName}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>No vehicles found</div>
              )}
            </div>
          )}
        </div>
      </div>
    </UserWrapper>
  );
}
