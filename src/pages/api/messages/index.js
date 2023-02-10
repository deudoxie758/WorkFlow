import { PrismaClient } from "@prisma/client";
export default async function handler(req, res) {
  const method = req.method;
  const prisma = new PrismaClient();
  switch (method) {
    case "POST":
      try {
        const { user_id, channel_id, body } = req.body;
        const message = await prisma.message.create({
          data: {
            user_id,
            channel_id,
            body,
            created_at: new Date(),
          },
        });
        res.status(200).json(message);
      } catch (error) {
        res.status(400).json({ error: error });
      }
      break;

    default:
      break;
  }
}
