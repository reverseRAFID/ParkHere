import { connectDB } from "@/helpers/server-helpers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectDB();

      let {
        lightVehicleCapacity,
        heavyVehicleCapacity,
        motorbikeBicycleCapacity,
        heavyVehicleRate,
        lightVehicleRate,
        motorbikeBicycleRate,
      } = req.body;
      lightVehicleCapacity = parseInt(lightVehicleCapacity, 10);
      heavyVehicleCapacity = parseInt(heavyVehicleCapacity, 10);
      motorbikeBicycleCapacity = parseInt(motorbikeBicycleCapacity, 10);
      // const {
      //   parkingName,
      //   location,
      //   locationAddress,
      //   heavyVehicleCapacity,
      //   lightVehicleCapacity,
      //   motorbikeBicycleCapacity,
      //   heavyVehicleRate,
      //   lightVehicleRate,
      //   motorbikeBicycleRate,
      // } = req.body;

      // Create a parking lot
      const parking = await prisma.parking.create({
        data: {
          ...req.body,
          heavyVehicleCapacity: parseInt(req.body.heavyVehicleCapacity, 10),
          lightVehicleCapacity: parseInt(req.body.lightVehicleCapacity, 10),
          motorbikeBicycleCapacity: parseInt(
            req.body.motorbikeBicycleCapacity,
            10
          ),
          heavyVehicleRate: parseFloat(req.body.heavyVehicleRate),
          lightVehicleRate: parseFloat(req.body.lightVehicleRate),
          motorbikeBicycleRate: parseFloat(req.body.motorbikeBicycleRate),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      console.log(
        lightVehicleCapacity,
        heavyVehicleCapacity,
        motorbikeBicycleCapacity
      );
      console.log(
        typeof lightVehicleCapacity,
        typeof heavyVehicleCapacity,
        typeof motorbikeBicycleCapacity
      );
      if (lightVehicleCapacity > 0) {
        for (let i = 0; i < lightVehicleCapacity; i++) {
          const parkingSlot = await prisma.parkingslot.create({
            data: {
              parkingType: "light",
              parkingId: parking.id,
              parkingSlotNumber: (i + 1).toString(),
              isOccupied: false,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          });
          console.log("Parking Slot:", parkingSlot);
        }
      }
      if (heavyVehicleCapacity > 0) {
        for (let i = 0; i < heavyVehicleCapacity; i++) {
          const parkingSlot = await prisma.parkingslot.create({
            data: {
              parkingType: "heavy",
              parkingId: parking.id,
              parkingSlotNumber: (i + 1).toString(),
              isOccupied: false,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          });
          console.log("Parking Slot:", parkingSlot);
        }
      }

      if (motorbikeBicycleCapacity > 0) {
        for (let i = 0; i < motorbikeBicycleCapacity; i++) {
          const parkingSlot = await prisma.parkingslot.create({
            data: {
              parkingType: "motorbike",
              parkingId: parking.id,
              parkingSlotNumber: (i + 1).toString(),
              isOccupied: false,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          });
          console.log("Parking Slot:", parkingSlot);
        }
      }

      await res.status(201).json({
        success: true,
        parkingLot: {
          ...parking,
          heavyVehicleCapacity: parking.heavyVehicleCapacity.toString(),
          lightVehicleCapacity: parking.lightVehicleCapacity.toString(),
          motorbikeBicycleCapacity: parking.motorbikeBicycleCapacity.toString(),
          heavyVehicleRate: parking.heavyVehicleRate.toString(),
          lightVehicleRate: parking.lightVehicleRate.toString(),
          motorbikeBicycleRate: parking.motorbikeBicycleRate.toString(),
          id: parking.id.toString(),
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
