import React, { useEffect, useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import NewModal from "./Modal";
import SignOut from "./SignOut";
import { useSession } from "next-auth/react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

function SideBar({ channels, updateChat, updateChannels, users }) {
  const [open, setOpen] = useState(true);
  const [open1, setOpen1] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [currentChannels, setCurrentChannels] = useState([]);
  const [publicChannels, setPublicChannels] = useState([]);
  const [privateChannels, setPrivateChannels] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    // updateChannels(channels);
    setCurrentChannels(channels);
    const getPubChannels = channels.filter(
      (channel) => channel.type.toLowerCase() === "public"
    );
    const getPrivChannels = channels.filter(
      (channel) => channel.type.toLowerCase() === "private"
    );
    setPrivateChannels(() => [...getPrivChannels]);
    setPublicChannels(getPubChannels);
  }, [channels]);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const handleModal = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  console.log(Array.isArray(currentChannels));

  if (channels) {
    return (
      <>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              className="dark:bg-gray-900 dark:text-white"
            >
              Channels
            </ListSubheader>
          }
          className="dark:bg-gray-900 dark:text-white"
        >
          <NewModal
            handleModal={handleModal}
            openModal={openModal}
            handleClose={handleClose}
            channels={channels}
            updateChannels={updateChannels}
            users={users}
          />
          <ListItemButton onClick={handleModal}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="New Channel" />
          </ListItemButton>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Channels" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {publicChannels?.length ? (
                publicChannels.map((channel) => (
                  <ListItemButton
                    key={channel.id}
                    id={channel.id}
                    onClick={() => updateChat(channel)}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary={channel.name} />
                  </ListItemButton>
                ))
              ) : (
                <div></div>
              )}
            </List>
          </Collapse>
          <ListItemButton onClick={handleClick1}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
            {open1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {privateChannels?.length && privateChannels ? (
                privateChannels.map((channel) => (
                  <ListItemButton
                    key={channel.id}
                    id={channel.id}
                    onClick={() => updateChat(channel)}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    {/* <ListItemText primary={channel.name} /> */}
                    <ListItemText
                      primary={
                        channel.users[0].id === session?.user?.id
                          ? `${channel.users[1].username}`
                          : `${channel.users[0].username}`
                      }
                    />
                  </ListItemButton>
                ))
              ) : (
                <div></div>
              )}
            </List>
          </Collapse>
          <ListItemButton>
            <ListItemIcon>
              <ArrowCircleLeftIcon />
            </ListItemIcon>
            <SignOut />
          </ListItemButton>
        </List>
      </>
    );
  } else {
    return (
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            className="dark:bg-gray-900 dark:text-white"
          >
            Channels
          </ListSubheader>
        }
        className="dark:bg-gray-900 dark:text-white"
      >
        <NewModal
          handleModal={handleModal}
          openModal={openModal}
          handleClose={handleClose}
          channels={channels}
          updateChannels={updateChannels}
          users={users}
        />
        <ListItemButton onClick={handleModal}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="New Channel" />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Channels" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding></List>
        </Collapse>
        <ListItemButton onClick={handleClick1}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {open1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding></List>
        </Collapse>
        <ListItemButton>
          <ListItemIcon>
            <ArrowCircleLeftIcon />
          </ListItemIcon>
          <SignOut />
        </ListItemButton>
      </List>
    );
  }
}

export default SideBar;
