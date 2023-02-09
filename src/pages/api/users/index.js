import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

async function hashPassword(password) {
  const saltOrRounds = 11;
  const hashedPassword = await bcrypt.hash(password, saltOrRounds);
  return hashedPassword;
}

export default async function handler(req, res) {
  const method = req.method;
  const prisma = new PrismaClient();
  switch (method) {
    case "GET":
      try {
        const users = await prisma.user.findMany({
          select: {
            id: true,
            username: true,
            firstname: true,
            lastname: true,
            email: true,
            created_at: true,
          },
        });
        res.status(200).json(users);
      } catch (e) {
        res.status(400).json({ error: e });
      }
      break;
    case "POST":
      try {
        const { username, firstname, lastname, email, password } = req.body;
        const newPassword = await hashPassword(password);
        console.log(newPassword);
        const created_at = new Date();
        const updated_at = new Date();
        const newUser = await prisma.user.create({
          data: {
            username,
            firstname,
            lastname,
            email,
            password: newPassword,
            created_at,
            updated_at,
          },
          select: {
            id: true,
            username: true,
            firstname: true,
            lastname: true,
            email: true,
            created_at: true,
            updated_at: true,
          },
        });

        res.status(200).json(newUser);
      } catch (e) {
        res.status(400).json({ error: e });
      }
      break;

    default:
      res.status(400).json({ message: `${method} not supported` });
  }
}
