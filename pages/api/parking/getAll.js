import prisma from '../../../prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const parkingLots = await prisma.parkingLot.findMany();
      res.status(200).json(parkingLots);
    } catch (error) {
      console.error('Error fetching parking lots:', error);
      res.status(500).json({ error: 'An error occurred while fetching parking lots.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
