import { PrismaClient } from "@prisma/client";
export default async function handler(req, res) {
  const method = req.method;
  const prisma = new PrismaClient();
  switch (method) {
    case "POST":
      try {
        const { name, description, type, body, user_ids } = req.body;
        const created_at = new Date();

        prisma.channel
          .create({
            data: {
              name,
              description,
              type,
              users: {
                connect: user_ids.map((user_id) => ({ id: user_id })),
              },
              messages: {
                create: {
                  body,
                  created_at,
                  user: { connect: { id: user_ids[0] } },
                },
              },
            },
            include: {
              users: {
                select: {
                  id: true,
                  username: true,
                  firstname: true,
                  lastname: true,
                  email: true,
                },
              },
              messages: true,
            },
          })
          .then((newChannel) => {
            res.status(200).json(newChannel);
          })
          .catch((error) => {
            res.status(400).json({ error: error });
          });
      } catch (error) {
        res.status(400).json({ error: error });
      }
      break;

    default:
      res.status(400).json({ message: `${method} not supported` });
      break;
  }
}
