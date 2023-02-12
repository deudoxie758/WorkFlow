import { useEffect, useState } from "react";

function Chat({ channel }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages(channel.messages);
  });
  return (
    <div>
      {messages ? (
        <>
          <div>{channel.name}</div>
          <div>{channel.description}</div>
          <div>
            {messages.map((message) => (
              <li key={message.id}>{message.body}</li>
            ))}
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Chat;
