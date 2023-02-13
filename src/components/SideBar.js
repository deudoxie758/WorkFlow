import React from "react";

function SideBar({ channels, updateChat }) {
  if (channels) {
    return (
      <ul>
        {channels.map((channel) => (
          <li key={channel.id} id={channel.id}>
            <button onClick={() => updateChat(channel)}>
              {" "}
              {channel.name}{" "}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default SideBar;
