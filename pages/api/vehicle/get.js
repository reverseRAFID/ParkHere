import { connectDB } from "@/helpers/server-helpers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    try {
      await connectDB();
      const vehicleProfiles = await prisma.vehicleProfile.findMany({
        where: {
          userId: userId,
        },
      });

      res.status(200).json(vehicleProfiles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
