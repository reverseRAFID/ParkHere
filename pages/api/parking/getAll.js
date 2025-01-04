import { connectDB } from '@/helpers/server-helpers';
import prisma from '../../../prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await connectDB();
      const parking = await prisma.parking.findMany();
      console.log('Parking:', parking);
      const payload = {
        parking: parking.map((p) => {
          return {
            id: p.id.toString(),
            parkingName: p.parkingName.toString(),
            location: p.location,
            locationAddress: p.locationAddress.toString(),
            heavyVehicleCapacity: p.heavyVehicleCapacity.toString(),
            lightVehicleCapacity: p.lightVehicleCapacity.toString(),
            motorbikeBicycleCapacity: p.motorbikeBicycleCapacity.toString(),
            heavyVehicleRate: p.heavyVehicleRate.toString(),
            lightVehicleRate: p.lightVehicleRate.toString(),
            motorbikeBicycleRate: p.motorbikeBicycleRate.toString(),
          };
        }),
      };
      // parking.id = parking.id.toString();
      res.status(200).json(payload);
    } catch (error) {
      console.error('Error fetching parking lots:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
