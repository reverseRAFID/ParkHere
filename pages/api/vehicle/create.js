import { connectDB } from '@/helpers/server-helpers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { vehicleType, vehicleNumber, userId, ownerName, vehicleModel } = req.body;

    try {
      await connectDB();
      const newVehicleProfile = await prisma.vehicleProfile.create({
        data: {
          vehicleType,
          vehicleNumber,
          userId,
          ownerName,
          vehicleModel,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      res.status(201).json(newVehicleProfile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}