import { PrismaClient } from "@prisma/client";
export default async function handler(req, res) {
  const { cid } = req.query;
  const id = parseInt(cid);
  const method = req.method;
  const prisma = new PrismaClient();
  switch (method) {
    case "GET":
      try {
        const channel = await prisma.channel.findUnique({
          where: { id },
          include: {
            messages: true,
            users: true,
          },
        });
        res.status(200).json(channel);
      } catch (error) {
        res.status(400).json({ error: error });
      }
      break;
    case "DELETE":
      try {
        await prisma.channel.delete({
          where: { id },
        });
        res.status(200).json({ message: "channel deleted" });
      } catch (e) {
        res.status(400).json({ error: e });
      }
      break;

    default:
      break;
  }
}
