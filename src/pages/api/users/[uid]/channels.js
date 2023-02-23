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
          where: {
            users: {
              some: { id },
            },
          },
          include: {
            messages: {
              select: {
                id: true,
                body: true,
                created_at: true,
                user: {
                  select: {
                    id: true,
                    username: true,
                    firstname: true,
                    lastname: true,
                    email: true,
                  },
                },
              },
            },
            users: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        });
        res.status(200).json(channels);
      } catch (error) {
        res.status(400).json({ error: error });
      }
      break;
    default:
  }
}
