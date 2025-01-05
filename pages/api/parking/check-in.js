import { connectDB } from "@/helpers/server-helpers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      parkingId,
      parkingSlotId,
      userId,
      vehicleProfileId,
      reservationStartTime,
      // reservationEndTime,
      reservationStatus,
      // paymentId,
    } = req.body;

    try {
      await connectDB();
      const newReservation = await prisma.reservation.create({
        data: {
          parkingId,
          parkingSlotId,
          userId,
          vehicleProfileId,
          reservationStartTime: new Date(reservationStartTime),
          // reservationEndTime: reservationEndTime ? new Date(reservationEndTime) : null,
          reservationStatus,
          // paymentId,
        },
      });

      const updatedParkingSlot = await prisma.parkingslot.update({
        where: {
          id: parkingSlotId,
        },
        data: {
          isOccupied: true,
        },
      });

      res.status(201).json(newReservation);
    } catch (error) {
      res.status(500).json({ error: "Error creating reservation" });
    }
  } else if (req.method === "PUT") {
    const {
      reservationId,
      parkingId,
      parkingSlotId,
      userId,
      vehicleProfileId,
      reservationStartTime,
      reservationEndTime,
      reservationStatus,
      paymentId,
    } = req.body;

    try {
      await connectDB();
      const updatedReservation = await prisma.reservation.update({
        where: {
          id: reservationId,
        },
        data: {
          parkingId,
          parkingSlotId,
          userId,
          vehicleProfileId,
          reservationStartTime: new Date(reservationStartTime),
          reservationEndTime: reservationEndTime ? new Date(reservationEndTime) : null,
          reservationStatus,
          paymentId,
        },
      });

      res.status(200).json(updatedReservation);
    } catch (error) {
      res.status(500).json({ error: "Error updating reservation" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
