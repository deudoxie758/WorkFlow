import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";

const SocketHandler = (req, res) => {
  const prisma = new PrismaClient();
  if (res.socket.server.io) {
    console.log("socket is already running");
  } else {
    console.log("socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("new-message", async (msg) => {
        // async function postNewMessage() {
        const data = msg;
        data.created_at = new Date();
        console.log(data);
        const message = await prisma.message.create({
          data,
        });
        const getChannel = await prisma.channel.findUnique({
          where: { id: message.channel_id },
        });
        const getMessages = getChannel.messages;
        socket.broadcast.emit("post-message", getMessages);
      });
    });
  }
  res.end();
};

export default SocketHandler;
