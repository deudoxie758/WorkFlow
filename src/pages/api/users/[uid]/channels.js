import { PrismaClient } from "@prisma/client";
export default async function handler(req, res) {
  const { uid } = req.query;
  const id = parseInt(uid);
  const method = req.method;
  const prisma = new PrismaClient();
  switch (method) {
    case "GET":
      try {
        const channels = await prisma.channel.findMany({
          include: {
            messages: true,
          },
        });
        const filtered_channels = [];
        const ids = new Set();
        for (let channel of channels) {
          for (let message of channel.messages) {
            if (message.user_id === id) {
              if (!ids.has(channel.id)) {
                filtered_channels.push(channel);
                ids.add(channel.id);
              }
            }
          }
        }
        console.log(filtered_channels);
        res.status(200).json(filtered_channels);
      } catch (error) {
        res.status(400).json({ error: error });
      }
      break;
    default:
  }
}
