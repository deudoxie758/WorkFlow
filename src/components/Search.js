import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function Search({ setValue, ids, setIds, users, errors }) {
  const [ids2, setIds2] = React.useState([]);

  React.useEffect(() => {
    setIds2(ids);
  }, [ids, errors]);

  const test = (e, selectedOption) => {
    const name = e.target.innerHTML;
    if (typeof name === "string" && name.length > 0 && name.length < 70) {
      if (selectedOption) {
        const getIds = new Set(ids2);
        const id = selectedOption.id;
        if (!getIds.has(id)) {
          getIds.add(id);
          setIds([...ids2, id]);
          setValue({ name, id });
        }
      }
    }
  };
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={users}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="People"
          error={
            errors[0]?.length > 0 ||
            errors[1]?.length > 0 ||
            errors[2]?.length > 0
          }
        />
      )}
      getOptionLabel={(option) => (option ? option.username : "")}
      key={(option) => option.id}
      onChange={test}
    />
  );
}
// const users = [
//   { name: "john", id: 1 },
//   { name: "boon", id: 2 },
//   { name: "jon", id: 3 },
//   { name: "kevin", id: 4 },
//   { name: "tyna", id: 5 },
//   { name: "pauline", id: 6 },
//   { name: "samuel", id: 7 },
//   { name: "ron", id: 8 },
// ];
