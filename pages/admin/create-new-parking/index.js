import AdminWrapper from "@/components/AdminWrapper";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Map, Marker } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import { CldUploadWidget } from "next-cloudinary";
import axios from "axios";

export default function CreateNewParking() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    parkingName: "",
    location: [],
    locationAddress: "",
    heavyVehicleCapacity: "",
    lightVehicleCapacity: "",
    motorbikeBicycleCapacity: "",
    heavyVehicleRate: "",
    lightVehicleRate: "",
    motorbikeBicycleRate: "",
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
    setLoading(true);
    // Handle form submission logic here
    console.log(formData);
    fetch("/api/parking/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        let path = `/admin/parking-details/${data.parkingLot.id}`;
        console.log(path);
        window.location.href = path;
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
      });
  };

  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lng: 0,
  });

  const handleMapClick = ({ latLng }) => {
    setCoordinates({
      lat: latLng[0],
      lng: latLng[1],
    });
    setFormData({
      ...formData,
      location: [latLng[0], latLng[1]],
    });
  };

  return (
    <AdminWrapper>
      <div>
        <div className="font-bold">Create New Parking</div>
        <div>
          Select the location of your Parking from the map and enter details
        </div>
        <div className="mt-4">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col xl:flex-row gap-4">
              <div className="flex-1">
                <div>
                  <Label htmlFor="parkingName">Parking Name</Label>
                  <Input
                    type="text"
                    id="parkingName"
                    name="parkingName"
                    value={formData.parkingName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location (Select on the map)</Label>
                  <Input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    readOnly
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location Address</Label>
                  <Input
                    type="text"
                    id="locationAddress"
                    name="locationAddress"
                    value={formData.locationAddress}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="rounded-xl w-full xl:max-w-[400px] overflow-hidden">
                <Map
                  provider={osm}
                  defaultCenter={[23.879, 90.6997]}
                  defaultZoom={10}
                  onClick={handleMapClick}
                  height={200}
                >
                  <Marker
                    width={50}
                    anchor={[coordinates.lat, coordinates.lng]}
                  />
                </Map>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-2">
              <div className="flex-1">
                <Label htmlFor="heavyVehicleCapacity">
                  Heavy Vehicle Capacity
                </Label>
                <Input
                  type="number"
                  id="heavyVehicleCapacity"
                  name="heavyVehicleCapacity"
                  value={formData.heavyVehicleCapacity}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="lightVehicleCapacity">
                  Light Vehicle Capacity
                </Label>
                <Input
                  type="number"
                  id="lightVehicleCapacity"
                  name="lightVehicleCapacity"
                  value={formData.lightVehicleCapacity}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="motorbikeBicycleCapacity">
                  Motorbike/Bicycle Capacity
                </Label>
                <Input
                  type="number"
                  id="motorbikeBicycleCapacity"
                  name="motorbikeBicycleCapacity"
                  value={formData.motorbikeBicycleCapacity}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-2">
              <div className="flex-1">
                <Label htmlFor="heavyVehicleRate">
                  Heavy Vehicle Rate (in BDT)
                </Label>
                <Input
                  type="number"
                  id="heavyVehicleRate"
                  name="heavyVehicleRate"
                  value={formData.heavyVehicleRate}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="lightVehicleRate">
                  Light Vehicle Rate (in BDT)
                </Label>
                <Input
                  type="number"
                  id="lightVehicleRate"
                  name="lightVehicleRate"
                  value={formData.lightVehicleRate}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="motorbikeBicycleRate">
                  Motorbike/Bicycle Rate (in BDT)
                </Label>
                <Input
                  type="number"
                  id="motorbikeBicycleRate"
                  name="motorbikeBicycleRate"
                  value={formData.motorbikeBicycleRate}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* <div className="mt-4">
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
              >
                {({ open, results }) => {
                  if (results && results.event === "success") {
                    console.log(results);
                    // setFormData({
                    //   ...formData,
                    //   image: results.data.info.files[0].uploadInfo.secure_url,
                    // });
                  }
                  return (
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() => open()}
                    >
                      Upload an Image
                    </Button>
                  );
                }}
              </CldUploadWidget>
            </div> */}
            {!loading ? <Button type="submit" className="mt-4 w-full">
              Create Parking
            </Button> : <Button disabled className="mt-4 w-full">
              Creating Parking...
            </Button>}
          </form>
        </div>
      </div>
    </AdminWrapper>
  );
}
