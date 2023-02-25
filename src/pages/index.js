import Head from "next/head";
import styles from "@/styles/Home.module.css";
import SignOut from "@/components/SignOut";
import SideBar from "@/components/SideBar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import checkStatus from "@/utils/checkStatus";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import io from "socket.io-client";
import SideBar2 from "@/components/SideBar2";
import NavBar from "@/components/NavBar";

let socket;

export default function Home({ channelData, users }) {
  const [channels, setChannels] = useState(channelData);
  const [channel, setChannel] = useState(channelData[0]);
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState(channelData[0]?.messages || []);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [checked, setChecked] = useState(false);

  checkStatus();
  console.log(channelData);

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
    const socketInitializer = async () => {
      await fetch("/api/socket");
      socket = io();

      socket.on("connect", () => {
        console.log("connected");
      });

      socket.on("new-messages", (data) => {
        // setMessages(data);
        setMessages([...data]);
      });
    };
    socketInitializer();
  }, [session, messages, isDarkMode, channelData]);

  function updateChat(chat) {
    // console.log(chat);
    if (chat.messages) {
      setChannel(chat);
      setMessages(chat.messages);
    }
  }
  function updateChannels(newChannels) {
    console.log(newChannels);
    setChannels(() => [...newChannels]);
  }
  async function onClick(e) {
    try {
      if (session) {
        const user_id = session.user.id;
        e.preventDefault();
        const getText = e.target.body.value;
        const getData = {
          body: getText,
          channel_id: channel.id,
          user_id,
        };
        socket.emit("new-message", getData);
        e.target.body.value = "";
        // console.log(messages);
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (!channel) {
    return (
      <div>
        <button>Create First Channel</button>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>WorkFlow</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col h-screen overflow-scroll dark:bg-gray-900 dark:text-white">
        {/* <NavBar checked={checked} setChecked={setChecked} /> */}

        {/* <label class="toggleDarkBtn">
          DarkMode
          <input type="checkbox" onClick={() => setIsDarkMode(!isDarkMode)} />
          <span class="slideBtnTg round"></span>
        </label> */}

        <div className="flex flex-1">
          <div className="w-1/4 border-r border-gray-400">
            <SideBar
              channels={channels}
              updateChat={updateChat}
              updateChannels={updateChannels}
              users={users}
            />
          </div>
          <div className="flex-1">
            {channel ? (
              <div className="flex flex-col h-screen">
                <div className="flex justify-between items-center p-4 border-b border-gray-400">
                  <div className="text-lg font-medium">
                    {channel.users[0].id === session?.user?.id
                      ? `${channel.users[1].username}`
                      : `${channel.users[0].username}`}
                  </div>
                  <div className="text-gray-500">{channel.description}</div>
                </div>
                <div className="flex-1 p-4 overflow-y-scroll">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start justify-start space-x-2 mb-4`}
                    >
                      <div className="flex-shrink-0">
                        {/* <img
                          src={message.avatar}
                          alt={`${message.username}'s avatar`}
                          className="w-8 h-8 rounded-full"
                        /> */}
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-500">{message.username}</div>
                        <h2>{`${message?.user?.username}`}</h2>
                        <div
                          className={`${
                            message.user?.id === session?.user?.id
                              ? "bg-sky-200"
                              : "bg-gray-200"
                          } px-4 py-2 rounded-md`}
                        >
                          <div className={`text-gray-800`}>{message.body}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={onClick} className="flex-none p-4">
                  <div className="flex space-x-2 pb-3">
                    <img
                      src="/placeholder.jpeg"
                      alt="User avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <textarea
                      name="body"
                      id="body"
                      className="flex-1 border border-gray-400 rounded-md p-2"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white rounded-md px-4 py-2"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="flex-1 p-4">
                <div className="text-xl font-medium mb-4">Select a channel</div>
                <div className="text-gray-500">
                  Channels you belong to will appear here.
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  let channelData = [];
  let users = [];
  if (session) {
    const id = session.user ? session.user.id : null;
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/users/${id}/channels`
    );
    channelData = await response.json();
    const userData = await fetch(`${process.env.NEXTAUTH_URL}/api/users`);
    users = await userData.json();
  }
  return {
    props: {
      channelData,
      users,
    },
  };
}
