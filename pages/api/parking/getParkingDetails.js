import { connectDB } from "@/helpers/server-helpers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    try {
      await connectDB();
      const parking = await prisma.parking.findUnique({
        where: { id: id },
      });
      const payload = {
        ...parking,
        // id: parking.id.toString(),
        parkingName: parking.parkingName.toString(),
        location: parking.location,
        locationAddress: parking.locationAddress.toString(),
        heavyVehicleCapacity: parking.heavyVehicleCapacity.toString(),
        lightVehicleCapacity: parking.lightVehicleCapacity.toString(),
        motorbikeBicycleCapacity: parking.motorbikeBicycleCapacity.toString(),
        heavyVehicleRate: parking.heavyVehicleRate.toString(),
        lightVehicleRate: parking.lightVehicleRate.toString(),
        motorbikeBicycleRate: parking.motorbikeBicycleRate.toString(),
      };
      res.status(200).json(payload);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
