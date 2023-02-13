import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

let socket;

function Chat({ channelData }) {
  const [messages, setMessages] = useState([]);
  const [channelId, setChannelId] = useState(null);
  const { data: session, status } = useSession();
  const [checkSocket, setCheckSocket] = useState(false);
  const [input, setInput] = useState("");
  console.log(channelData);
  useEffect(() => {
    // setChannelId(channel.id);
    // setMessages(channel.messages);
  });

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
      {/* {Array.isArray(messages) ? (
        <div>
          <div>{input}</div>
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
      )} */}
    </div>
  );
}

export default Chat;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const id = session.user ? session.user.id : null;
  console.log(context);
  if (id) {
    const data = await axios.get(`/api/users/${id}/channels`);
    const channelData = data.data;
  }
  return {
    props: {
      channelData,
    },
  };
}
