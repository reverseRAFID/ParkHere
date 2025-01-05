import React from "react";
import { useRouter } from "next/router";
import UserWrapper from "@/components/UserWrapper";
import { Bike, Car, Copy, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Map, Marker } from "pigeon-maps";
import { CircleParking } from "lucide-react";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function ParkingDetails() {
  const id = useRouter().query.id;
  const { toast } = useToast();

  const [parking, setParking] = React.useState(null);

  React.useEffect(() => {
    fetch(`/api/parking/getParkingDetails?id=${id}`)
      .then((res) => res.json())
      .then((data) => setParking(data));
  }, [id]);

  return (
    <UserWrapper>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="font-bold text-2xl">Parking Details</div>
          {parking ? (
            <div className="p-4">
              <div
                className="text-sm flex flex-row gap-2 items-center cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(parking.id);
                  toast({
                    description: "Copied to clipboard.",
                  });
                }}
              >
                ID: {parking.id} <Copy size={11} />
              </div>
              <div>
                <span className="font-bold">Title:</span> {parking.parkingName}
              </div>
              <div>
                <span className="font-bold">Address:</span>{" "}
                {parking.locationAddress}
              </div>
              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead></TableHead>
                    <TableHead><Bike /></TableHead>
                    <TableHead><Car /></TableHead>
                    <TableHead><Truck /></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Rate</TableCell>
                    <TableCell>৳{parking.motorbikeBicycleRate}/hr</TableCell>
                    <TableCell>৳{parking.lightVehicleRate}/hr</TableCell>
                    <TableCell>৳{parking.heavyVehicleRate}/hr</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Capacity</TableCell>
                    <TableCell>{parking.motorbikeBicycleCapacity} slots</TableCell>
                    <TableCell>{parking.lightVehicleCapacity} slots</TableCell>
                    <TableCell>{parking.heavyVehicleCapacity} slots</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell><Button className="w-full">Reserve</Button></TableCell>
                    <TableCell><Button className="w-full">Reserve</Button></TableCell>
                    <TableCell><Button className="w-full">Reserve</Button></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
        {parking?.location && <div><MapContainer location={parking?.location} /></div>}
      </div>
    </UserWrapper>
  );
}

function MapContainer({ location }) {
  return (
    <div className="overflow-hidden">
      <Map height={300} width={500} defaultCenter={location} defaultZoom={16}>
        <Marker width={50} anchor={location}>
          <CircleParking
            className="cursor-pointer"
            size={32}
            strokeWidth={2.25}
            color="red"
          />
        </Marker>
      </Map>
    </div>
  );
}
