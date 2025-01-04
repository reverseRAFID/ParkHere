import { connectDB } from "@/helpers/server-helpers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectDB();

      const { parkingId } = req.query;

      if (!parkingId || !/^[0-9a-fA-F]{24}$/.test(parkingId)) {
        return res
          .status(400)
          .json({ success: false, message: "Valid Parking ID is required" });
      }

      const parkingSlots = await prisma.parkingslot.findMany({
        where: {
          parkingId: parkingId,
        },
      });

      res.status(200).json({ success: true, parkingSlots });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
