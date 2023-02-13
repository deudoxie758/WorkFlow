import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { resolve } from "styled-jsx/css";

function Chat({ channel }) {
  const [messages, setMessages] = useState([]);
  const [channelId, setChannelId] = useState(null);
  const { data: session, status } = useSession();
  useEffect(() => {
    setMessages(channel.messages);
    setChannelId(channel.id);
  }, [channel]);
  async function onClick(e) {
    try {
      if (session) {
        const user_id = session.user.id;
        e.preventDefault();
        console.log(e.target.body.value);
        const getText = e.target.body.value;
        const data = await axios.post("/api/messages", {
          body: getText,
          channel_id: channelId,
          user_id,
        });
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      {messages ? (
        <div>
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
