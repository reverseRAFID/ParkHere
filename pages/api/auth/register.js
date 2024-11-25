import { connectDB } from "@/helpers/server-helpers";
import prisma from "@/prisma";
import bcrypt from "bcrypt";
import { signIn } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password) {
        throw new Error("Invalid request");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await connectDB();
      const user = await prisma.User.create({
        data: { email, name, password: hashedPassword, role },
      });
      return res.status(201).json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      await prisma.$disconnect();
      // res.end();
    }
  }
}
