import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Search from "./Search";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function NewModal({
  openModal,
  handleClose,
  channels,
  updateChannels,
  users,
}) {
  const [hideText, setHideText] = useState(true);
  const [members, setMembers] = useState([]);
  const [ids, setIds] = useState([]);
  const [getName, setGetName] = useState("");
  const [desc, setDesc] = useState("");
  const [getBody, setGetBody] = useState("");
  const { data: session, status } = useSession();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 500,
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflow: "scroll",
  };
  const createNewChannel = async (e) => {
    e.preventDefault();
    const name = hideText ? members[0].name : getName;
    const description = desc;
    const body = getBody;
    const type = hideText ? "private" : "public";
    const id = session?.user.id;
    const user_ids = members.map((member) => member.id);
    user_ids.unshift(id);
    const data = {
      name,
      description,
      body,
      type,
      user_ids,
    };
    const newChan = await axios.post("/api/channels", data);
    const getChans = await axios.get(`/api/users/${id}channels`);
    updateChannels(getChans.data.channels);
    console.log(getChans.data.channels);
    handleClose();
  };

  const cancelModal = () => {
    setMembers([]);
    handleClose();
  };
  const setValue = (obj) => {
    const getIds = members.map((member) => member.id);
    console.log("setval");
    console.log(getIds);
    getIds.push(obj.id);
    setMembers([...members, obj]);
    setIds(getIds);
    // console.log(ids);
  };
  const removeMember = (id) => {
    const updatedMembers = members.filter((m) => m.id !== id);
    setMembers(updatedMembers);
    const getIds = updatedMembers.map((m) => m.id);
    setIds(getIds);
  };
  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create Message
        </Typography>
        <form onSubmit={createNewChannel}>
          <FormControl>
            <RadioGroup className="pb-5">
              <FormControlLabel
                onClick={() => setHideText(true)}
                value="private"
                control={<Radio />}
                label="Direct Message"
              />
              <FormControlLabel
                onClick={() => setHideText(false)}
                value="public"
                control={<Radio />}
                label="Group Chat"
              />
            </RadioGroup>

            <Box>
              {!members.length ? (
                <div className="text-gray-400">
                  People in the chat will appear here
                </div>
              ) : (
                members.map((member) => (
                  <Button
                    onClick={() => removeMember(member.id)}
                    key={member.id}
                  >
                    {member.name}
                  </Button>
                ))
              )}
            </Box>
            <Search
              setValue={setValue}
              ids={ids}
              setIds={setIds}
              users={users}
            />
            <TextField
              label="Channel Name"
              className={`${hideText ? "hidden" : "visible"} mt-5`}
              onChange={(e) => setGetName(e.target.value)}
            />
            <TextField
              label="Description"
              className={`${hideText ? "hidden" : "visible"} mt-5`}
              onChange={(e) => setDesc(e.target.value)}
            />
            <TextField
              label="Message"
              className="mt-5 h-20"
              multiline={true}
              rows={5}
              onChange={(e) => setGetBody(e.target.value)}
            />
          </FormControl>
          <div className="mt-20 flex justify-between">
            <Button onClick={cancelModal} variant="outlined">
              Cancel
            </Button>
            <Button className=" bg-sky-700" variant="contained" type="submit">
              Create Channel
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
