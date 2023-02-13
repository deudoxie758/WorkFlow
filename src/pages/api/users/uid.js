import { PrismaClient } from "@prisma/client";
export default async function handler(req, res) {
  const { uid } = req.query;
  const id = parseInt(uid);
  const method = req.method;
  const prisma = new PrismaClient();
  switch (method) {
    case "GET":
      try {
        const getUser = await prisma.user.findUnique({
          where: { id },
          select: {
            id: true,
            username: true,
            firstname: true,
            lastname: true,
            email: true,
            created_at: true,
            updated_at: true,
            channels: true,
          },
        });
        res.status(200).json(getUser);
      } catch (e) {
        res.status(400).json({ error: e });
      }
      break;
    case "PUT":
      try {
        const data = req.body;
        data.updated_at = new Date();
        const editUser = await prisma.user.update({
          where: { id },
          data,
          select: {
            id: true,
            username: true,
            firstname: true,
            lastname: true,
            email: true,
            created_at: true,
            updated_at: true,
            channels: true,
          },
        });
        res.status(200).json(editUser);
      } catch (e) {
        res.status(400).json({ error: e });
      }
      break;
    case "DELETE":
      try {
        await prisma.user.delete({
          where: { id },
        });
        res.status(200).json({ message: "user deleted" });
      } catch (e) {
        res.status(400).json({ error: e });
      }
      break;
    default:
      res.status(200).json({ message: `${method} not supported` });
  }
}
