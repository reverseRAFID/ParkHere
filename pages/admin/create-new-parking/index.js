import AdminWrapper from "@/components/AdminWrapper";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Map, Marker } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";

export default function CreateNewParking() {
  const [formData, setFormData] = useState({
    parkingName: "",
    location: "",
    capacity: "",
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
      location: `${latLng[0]}, ${latLng[1]}`,
    });
  };

  return (
    <AdminWrapper>
      <div>
        <div className="font-bold">Create New Parking</div>
        <div>Select the location of your Parking from the map and enter details</div>
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
                  <Label htmlFor="location">Location</Label>
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
              </div>
              <div className="rounded-xl w-full xl:max-w-400 overflow-hidden">
                <Map
                  provider={osm}
                  defaultCenter={[23.879, 90.6997]}
                  defaultZoom={10}
                  onClick={handleMapClick}
                  height={200}
                  // width={500}
                >
                  <Marker
                    width={50}
                    anchor={[coordinates.lat, coordinates.lng]}
                  />
                </Map>
              </div>
            </div>
            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
              />
            </div>
            <Button type="submit">Create Parking</Button>
          </form>
        </div>
      </div>
    </AdminWrapper>
  );
}
