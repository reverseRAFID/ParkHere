import React, { useEffect, useState } from "react";
import { Map, Marker } from "pigeon-maps";
import { CircleParking, MapPin, Navigation2 } from "lucide-react";

export default function MapContainer() {
  const [parkingData, setParkingData] = useState([]);
  console.log(parkingData);

  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [yaw, setYaw] = useState(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", (event) => {
        const yaw = event.alpha; // Yaw value in degrees
        setYaw(yaw);
        console.log("Yaw: ", yaw);
      });
    } else {
      console.error("Device orientation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    fetch("/api/parking/getAll")
      .then((response) => response.json())
      .then((data) => {
        setParkingData((prev) => data);
        // console.log(parkingData)
      })
      .catch((error) => {
        console.error("There was an error fetching the parking data!", error);
      });
  }, []);

  return (
    <div className="rounded-xl overflow-hidden">
      {userLocation && userLocation.latitude != 0 && (
        <div ><Map
          height={400}
          defaultCenter={[userLocation.latitude, userLocation.longitude]}
          defaultZoom={15}
        >
          {parkingData?.parking?.map((parking, ind) => (
            <Marker key={ind + 53431} width={50} anchor={parking.location} onClick={() => console.log(parking)} payload={parking.location} hover={true}>
              <div className="relative group">
                <CircleParking className="cursor-pointer" size={32} strokeWidth={2.25} color="red" onClick={() => console.log(parking)} />
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-white text-black text-xs p-1 rounded shadow-lg">
                  {parking.name}
                </div>
              </div>
            </Marker>
          ))}
          <Marker anchor={[userLocation.latitude, userLocation.longitude]}>
            <Navigation2
              size={32}
              strokeWidth={2.25}
              style={{ transform: `rotate(${yaw}deg)` }}
            />
          </Marker>
        </Map>
        </div>
      )}
    </div>
  );
}
