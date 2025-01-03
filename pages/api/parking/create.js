import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { location, isAvailable, capacity, waitTime } = req.body;

      // Create a parking lot
      const parkingLot = await prisma.parking.create({
        data: {
          location,
          isAvailable,
          capacity,
          waitTime,
        },
      });

      res.status(201).json({ success: true, parkingLot });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to create parking lot' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
