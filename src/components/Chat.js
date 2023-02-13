import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

function Chat({ channel }) {
  const [messages, setMessages] = useState([]);
  const [channelId, setChannelId] = useState(null);
  const { data: session, status } = useSession();
  const [checkSocket, setCheckSocket] = useState(false);

  useEffect(() => {
    // if (!checkSocket) setMessages(channel.messages);
    setChannelId(channel.id);
    socketInitializer();
  }, [channel, messages]);
  const socketInitializer = async () => {
    await axios.get("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("post-message", (newMessage) => {
      // setCheckSocket(true);
      setMessages(newMessage);
    });

    setMessages(channel.messages);
  };
  // socketInitializer();
  async function onClick(e) {
    try {
      if (session) {
        const user_id = session.user.id;
        e.preventDefault();
        const getText = e.target.body.value;
        const getData = {
          body: getText,
          channel_id: channelId,
          user_id,
        };
        // const data = await axios.post("/api/messages", getData);
        socket.emit("new-message", getData);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      {Array.isArray(messages) ? (
        <div>
          {/* <div>{input}</div> */}
          <div>{channel.name}</div>
          <div>{channel.description}</div>
          <div>
            {messages.map((message) => (
              <li key={message.id}>{message.body}</li>
            ))}
          </div>
          <form onSubmit={onClick}>
            <textarea name="body" id="body" />
            <button type="submit">Send</button>
          </form>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Chat;
