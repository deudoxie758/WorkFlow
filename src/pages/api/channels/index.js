import { PrismaClient } from "@prisma/client";
export default async function handler(req, res) {
  const method = req.method;
  const prisma = new PrismaClient();
  switch (method) {
    case "POST":
      try {
        const { name, description, type, body, user_id } = req.body;
        const created_at = new Date();
        const newChannel = await prisma.channel.create({
          data: {
            name,
            description,
            type,
          },
        });
        const channel_id = newChannel.id;
        await prisma.message.create({
          data: {
            channel_id,
            user_id,
            body,
            created_at,
          },
        });
        const getChannel = await prisma.channel.findUnique({
          where: { id: channel_id },
          select: {
            name: true,
            description: true,
            type: true,
            messages: true,
          },
        });
        res.status(200).json(getChannel);
      } catch (error) {
        res.status(400).json({ error: error });
      }
      break;

    default:
      res.status(400).json({ message: `${method} not supported` });
      break;
  }
}
