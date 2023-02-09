export default async function handler(req, res) {
  const method = req.method;
  const prisma = new PrismaClient();
  switch (method) {
    case "POST":
      break;

    default:
      break;
  }
}
