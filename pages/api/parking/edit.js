import { connectDB } from "@/helpers/server-helpers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      await connectDB();
      const { id, ...data } = req.body;

      // Update a parking lot
      const updatedParkingLot = await prisma.parking.update({
        where: { id: parseInt(id, 10) },
        data: {
          ...data,
          heavyVehicleCapacity: parseInt(data.heavyVehicleCapacity, 10),
          lightVehicleCapacity: parseInt(data.lightVehicleCapacity, 10),
          motorbikeBicycleCapacity: parseInt(data.motorbikeBicycleCapacity, 10),
          heavyVehicleRate: parseFloat(data.heavyVehicleRate),
          lightVehicleRate: parseFloat(data.lightVehicleRate),
          motorbikeBicycleRate: parseFloat(data.motorbikeBicycleRate),
          updatedAt: new Date(),
        },
      });

      res.status(200).json({ 
        success: true, 
        parkingLot: {
          ...updatedParkingLot,
          heavyVehicleCapacity: updatedParkingLot.heavyVehicleCapacity.toString(),
          lightVehicleCapacity: updatedParkingLot.lightVehicleCapacity.toString(),
          motorbikeBicycleCapacity: updatedParkingLot.motorbikeBicycleCapacity.toString(),
          heavyVehicleRate: updatedParkingLot.heavyVehicleRate.toString(),
          lightVehicleRate: updatedParkingLot.lightVehicleRate.toString(),
          motorbikeBicycleRate: updatedParkingLot.motorbikeBicycleRate.toString(),
        }
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}