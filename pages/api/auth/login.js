import { connectDB } from "@/helpers/server-helpers";
import bcrypt from "bcrypt";
import prisma from "@/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    try{
      const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Invalid request" });
    }
    // Check if the email and password are correct
    await connectDB();
    // Check if the email and password are correct
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // Check if the password is correct
    const passwordMatch = bcrypt.compareSync(password, user.password);
    // console.log(passwordMatch);
    // console.log(user);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // Return the user object
    return res.status(200).json({ user });
    }
    catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      await prisma.$disconnect();
    }
  }
}
