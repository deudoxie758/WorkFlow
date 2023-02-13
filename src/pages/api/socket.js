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
        const message = await prisma.message.create({
          data,
        });
        const getChannel = await prisma.channel.findUnique({
          where: { id: data.channel_id },
          include: { messages: true },
        });
        const getMessages = getChannel.messages;
        console.log(getMessages);

        // // socket.broadcast.emit("post-message", getMessages);
        // console.log(getChannel);
        socket.broadcast.emit("new-messages", getMessages);
      });
    });
  }
  res.end();
};

export default SocketHandler;
