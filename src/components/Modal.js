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

export default function NewModal({ openModal, handleClose }) {
  const [hideText, setHideText] = useState(true);
  const [members, setMembers] = useState([]);
  const [ids, setIds] = useState([]);

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
  const createNewChannel = () => {};

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
            <Search setValue={setValue} ids={ids} setIds={setIds} />
            <TextField
              label="Channel Name"
              className={`${hideText ? "invisible" : "visible"} mt-5`}
            />
            <TextField
              label="Message"
              className="mt-5 h-20"
              multiline={true}
              rows={5}
            />
          </FormControl>
          <div className="mt-20 flex justify-between">
            <Button variant="outlined">Cancel</Button>
            <Button className=" bg-sky-700" variant="contained">
              Creat Channel
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
