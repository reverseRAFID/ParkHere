import { connectDB } from "@/helpers/server-helpers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectDB();

      const { paymentMethod, paymentStatus, paymentAmount, reservationId } = req.body;

      // Create a payment
      const payment = await prisma.payment.create({
        data: {
          paymentMethod,
          paymentStatus,
          paymentAmount: parseFloat(paymentAmount),
          paymentDate: new Date(),
          reservationId,
        },
      });

      res.status(201).json({
        success: true,
        payment: {
          ...payment,
          paymentAmount: payment.paymentAmount.toString(),
          id: payment.id.toString(),
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}