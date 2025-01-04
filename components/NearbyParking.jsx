import React from "react";
import ParkingImage from "../assets/images/parking.png";
import Image from "next/image";
import AccessIcon from "../assets/icons/access.png";
import SecurityIcon from "../assets/icons/security.png";
import CoveredParkingIcon from "../assets/icons/coveredParking.png";
import EvChargingIcon from "../assets/icons/evCharging.png";
import { Map, Marker } from "pigeon-maps";
import { Bike, Car, CircleParking, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function NearbyParking() {
  const [parkingData, setParkingData] = useState([]);

  useEffect(() => {
    fetch("/api/parking/getAll")
      .then((response) => response.json())
      .then((data) => {
      setParkingData(prev => data.parking);
      // console.log(parkingData)
      })
      .catch((error) => {
      console.error("There was an error fetching the parking data!", error);
      });
  }, []);

  console.log(parkingData);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting current location", error);
      }
    );
  }, []);

  const calculateDistance = (location1, location2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((location2.lat - location1.lat) * Math.PI) / 180;
    const dLng = ((location2.lng - location1.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((location1.lat * Math.PI) / 180) *
        Math.cos((location2.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const sortedParkingData = currentLocation
    ? [...parkingData].sort((a, b) => {
        const distanceA = calculateDistance(currentLocation, {
          lat: a.location[0],
          lng: a.location[1],
        });
        const distanceB = calculateDistance(currentLocation, {
          lat: b.location[0],
          lng: b.location[1],
        });
        return distanceA - distanceB;
      })
    : parkingData;

  const [filters, setFilters] = useState({
    price: "",
    distance: "",
    rating: "",
    features: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredParkingData = sortedParkingData.filter((parking) => {
    const { price, distance, rating, features } = filters;

    const matchesPrice =
      !price ||
      (price === "0-500" && parking.lightVehicleRate <= 500) ||
      (price === "501-1000" && parking.lightVehicleRate > 500 && parking.lightVehicleRate <= 1000) ||
      (price === "1001+" && parking.lightVehicleRate > 1000);

    const matchesDistance =
      !distance ||
      (distance === "0-1" && calculateDistance(currentLocation, { lat: parking.location[0], lng: parking.location[1] }) <= 1) ||
      (distance === "1-5" && calculateDistance(currentLocation, { lat: parking.location[0], lng: parking.location[1] }) > 1 && calculateDistance(currentLocation, { lat: parking.location[0], lng: parking.location[1] }) <= 5) ||
      (distance === "5+" && calculateDistance(currentLocation, { lat: parking.location[0], lng: parking.location[1] }) > 5);

    const matchesRating = !rating || parking.rating >= parseInt(rating);

    const matchesFeatures =
      !features ||
      (features === "evCharging" && parking.evCharging) ||
      (features === "covered" && parking.coveredParking) ||
      (features === "security" && parking.security);

    return matchesPrice && matchesDistance && matchesRating && matchesFeatures;
  });

  return (
    <div>
      <div className="font-bold text-lg">Nearby Parking Options</div>
      <div className="py-4 flex flex-col lg:flex-row gap-2">
        <select
          name="price"
          className="border border-gray-300 rounded-2xl px-4 py-2"
          value={filters.price}
          onChange={handleFilterChange}
        >
          <option value={""}>Price</option>
          <option value={"0-500"}>BDT0 - BDT500</option>
          <option value={"501-1000"}>BDT501 - BDT1000</option>
          <option value={"1001+"}>BDT1001 +</option>
        </select>

        <select
          name="distance"
          className="border border-gray-300 rounded-2xl px-4 py-2"
          value={filters.distance}
          onChange={handleFilterChange}
        >
          <option value={""}>Distance</option>
          <option value={"0-1"}>0 - 1 km</option>
          <option value={"1-5"}>1 - 5 km</option>
          <option value={"5+"}>5+ km</option>
        </select>

        {/* <select
          name="rating"
          className="border border-gray-300 rounded-2xl px-4 py-2"
          value={filters.rating}
          onChange={handleFilterChange}
        >
          <option value={""}>Rating</option>
          <option value={"4"}>4+ stars</option>
          <option value={"3"}>3+ stars</option>
          <option value={"2"}>2+ stars</option>
        </select>

        <select
          name="features"
          className="border border-gray-300 rounded-2xl px-4 py-2"
          value={filters.features}
          onChange={handleFilterChange}
        >
          <option value={""}>Features</option>
          <option value={"evCharging"}>EV Charging</option>
          <option value={"covered"}>Covered Parking</option>
          <option value={"security"}>Security</option>
        </select> */}
      </div>

      <div className="flex flex-col gap-4">
        {filteredParkingData?.map((parking, ind) => {
          return <ParkingCard key={ind + 322} data={parking} />;
        })}
      </div>
    </div>
  );
}

function ParkingCard({ data }) {
  return (
    <div className="flex flex-row rounded-xl overflow-hidden bg-[#3172340f] hover:bg-[#31723421] cursor-pointer" onClick={() => {
      window.location.href = `/dashboard/parking-details/${data.id}`;
    }}>
      {/* <Image src={ParkingImage} alt="Parking" /> */}
      <SmMapContainer location={data.location} />
      <div className="flex-1 flex flex-col justify-center p-4">
        <div className="mb-4">
          <div className="font-bold text-lg">{data.parkingName}</div>
          <div>{data.locationAddress}</div>
          <div>4.5 ⭐️</div>
        </div>
        <div className="hidden grid lg:grid-cols-2 gap-2">
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
        <div className="flex flex-row gap-4 items-center">
          <Bike /> <span className="font-bold">৳{data.motorbikeBicycleRate}/hr</span>{" "}
          <span className="text-sm">({data.motorbikeBicycleCapacity} slots remaining)</span>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <Car /> <span className="font-bold">৳{data.lightVehicleRate}/hr</span>{" "}
          <span className="text-sm">({data.lightVehicleCapacity} slots remaining)</span>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <Truck /> <span className="font-bold">৳{data.heavyVehicleRate}/hr</span>{" "}
          <span className="text-sm">({data.heavyVehicleCapacity} slots remaining)</span>
        </div>
        {/* <div className="text-right">$20</div> */}
      </div>
    </div>
  );
}

function SmMapContainer({ location }) {
  return (
    <div className="overflow-hidden">
      <Map
        height={150}
        width={200}
        defaultCenter={location}
        defaultZoom={16}
      >
        <Marker width={50} anchor={location} > 
        <CircleParking className="cursor-pointer" size={32} strokeWidth={2.25} color="red" />
        </Marker>
      </Map>
    </div>
  );
}
