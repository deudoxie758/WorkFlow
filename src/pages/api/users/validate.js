import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { email, password } = req.body;
  const prisma = new PrismaClient();
  const method = req.method;
  if (method === "POST") {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const returnUser = {
          id: user.id,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          created_at: user.created_at,
          updated_at: user.updated_at,
        };
        res.status(200).json(returnUser);
      } else {
        res.status(401).json({ message: "not authorized" });
      }
    } else {
      res.status(404);
    }
  } else {
    res.status(400).json({ message: "method not supported" });
  }
}
