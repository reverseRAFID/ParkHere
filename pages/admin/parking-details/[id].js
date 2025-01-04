"use client";
import React, { useRef, createRef } from "react";
import { useRouter } from "next/router";
// import UserWrapper from "@/components/UserWrapper";
import AdminWrapper from "@/components/AdminWrapper";
import { Bike, Car, Copy, Download, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Map, Marker } from "pigeon-maps";
import { CircleParking } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
// import { exportComponentAsPDF } from "react-component-export-image";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code";

export default function ParkingDetails() {
  const id = useRouter().query.id;
  const { toast } = useToast();

  const [parking, setParking] = React.useState(null);
  const [slots, setSlots] = React.useState([]);

  const slotsRef = useRef();

  const exportComponentAsPDF = () => {
    const input = slotsRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
      orientation: input.offsetWidth > input.offsetHeight ? "landscape" : "portrait",
      unit: "mm",
      format: [input.offsetWidth * 0.264583, input.offsetHeight * 0.264583] // Convert px to mm
      });
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("slots.pdf");
    });
  }

  console.log(slots);

  React.useEffect(() => {
    fetch(`/api/parking/getParkingDetails?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setParking(data);
        fetch(`/api/parking/get-slots?parkingId=${id}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setSlots(data.parkingSlots);
          });
      });
  }, [id]);

  return (
    <AdminWrapper>
      <div className="flex flex-row gap-4">
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
                    <TableHead>
                      <Bike />
                    </TableHead>
                    <TableHead>
                      <Car />
                    </TableHead>
                    <TableHead>
                      <Truck />
                    </TableHead>
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
                    <TableCell>
                      {parking.motorbikeBicycleCapacity} slots
                    </TableCell>
                    <TableCell>{parking.lightVehicleCapacity} slots</TableCell>
                    <TableCell>{parking.heavyVehicleCapacity} slots</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>
                      <Button className="w-full">Reserve</Button>
                    </TableCell>
                    <TableCell>
                      <Button className="w-full">Reserve</Button>
                    </TableCell>
                    <TableCell>
                      <Button className="w-full">Reserve</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
        {parking?.location && (
          <div>
            <MapContainer location={parking?.location} />
          </div>
        )}
      </div>
      <div>
        <div className="flex flex-row justify-between items-center">
          <div className="font-bold text-lg">Parking Slots and QR Codes</div>
          <div
            className="flex flex-row items-center gap-2 text-sm cursor-pointer hover:text-green-600"
            onClick={exportComponentAsPDF}
          >
            <Download size={16} /> Export as PDF
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-6 mt-4" ref={slotsRef}>
          {slots && slots?.length > 0 ? (
            slots.map((slot) => (
              <div className="flex flex-col gap-2 p-4 shadow-2xl">
                <div>
                  <QRCode
                    value={`https://${window.location.host}/check-in/slot/${slot.id}`}
                  />
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div>
                    {slot.parkingType === "light" && <Car size={32} />}
                    {slot.parkingType === "heavy" && <Truck size={32} />}
                    {slot.parkingType === "motorbike" && <Bike size={32} />}
                  </div>
                  <div className="font-bold">{slot.parkingSlotNumber}</div>
                </div>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </AdminWrapper>
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
