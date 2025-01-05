import { connectDB } from "@/helpers/server-helpers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      let { parkingSlotId } = req.query;
      parkingSlotId = parkingSlotId.toString();
      console.log("Parking Slot ID:", parkingSlotId);

      if (!parkingSlotId || !/^[0-9a-fA-F]{24}$/.test(parkingSlotId)) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Valid Parking Slot ID is required",
          });
      }

      await connectDB();
      const parkingSlot = await prisma.parkingslot.findUnique({
        where: {
          id: parkingSlotId,
        },
        include: {
          parking: true,
          Reservation: true,
        },
      });

      if (!parkingSlot) {
        return res
          .status(404)
          .json({ success: false, message: "Parking Slot not found" });
      }

      // Convert BigInt values to strings
      const parkingSlotSerialized = JSON.parse(
        JSON.stringify(parkingSlot, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      );

      res.status(200).json({ success: true, parkingSlot: parkingSlotSerialized });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
