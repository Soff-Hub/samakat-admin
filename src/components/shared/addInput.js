import { TextField } from "@mui/material";
import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function AddInput({
  dataH,
  dataF,
  selectData,
  addFilialInput,
  id,
  deleteID,
  deleteIDHighlight,
  setChangeBranchCunt,
  change,
}) {
  const [obj, setObj] = useState({ branch: "", quantity: "", id });
  // const [select, setSelect] = useState([]);

  function changeObj(e, key) {

    let keyName = {};
    keyName[`${key}`] = e;

    addFilialInput({ ...obj, ...keyName }, id);

    setObj({ ...obj, ...keyName });
  }

  const DeleteFilialItem = () => {
    deleteID(id);
    // console.log("delete id => ", id);
  };

  const DeleteIDHighlight = () => {
    deleteIDHighlight(id);
  };

  // useState(() => {
  //   // console.log(dataF, "data");
  //   setSelect(
  //     selectData?.map((el) => ({
  //       label: el.name,
  //       value: el.id,
  //     }))
  //   );
  // }, []);

  return selectData ? (
    <div style={{ backgroundColor: "#EEEEEE" }} className="flex gap-x-10 p-3  ">
      <div className="mx-1">
        <FormControl sx={{ m: 0, minWidth: 220 }} size="small">
          <InputLabel id="demo-select-small-label" placholder="Kategoriya">
            Filial *
          </InputLabel>
          <Select
            label="Filial"
            onChange={(e) => changeObj(e.target.value, "branch")}
            defaultValue={dataF?.brach}
            // required
          >
            {selectData?.map((item, i) => (
              <MenuItem key={i} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <TextField
          label={"Soni"}
          variant="outlined"
          size="small"
          type="number"
          // required
          defaultValue={dataF?.quantity || obj?.quantity}
          onChange={(e) => {
            changeObj(+e.target.value, "quantity");
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyItems: "end",
          alignItems: "center",
        }}
      >
        <button type="button" onClick={() => DeleteFilialItem()}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  ) : (
    <div className="flex  p-3" style={{ backgroundColor: "#EEEEEE" }}>
      <div className="mx-1">
        <TextField
          label="Tartib raqam"
          variant="outlined"
          size="small"
          style={{ marginTop: "10px", width: "150px" }}
          type="number"
          defaultValue={dataH?.order ? dataH?.order : obj?.order}
          onChange={(e) => {
            changeObj(+e.target.value, "order");
          }}
        />
      </div>
      <div className="mx-1 w-full">
        <TextField
          id="outlined-multiline-static"
          label="Asosiy element "
          variant="outlined"
          className="w-full"
          // required
          multiline
          rows={4}
          size="small"
          style={{ marginTop: "10px" }}
          type="text"
          defaultValue={dataH?.content}
          onChange={(e) => changeObj(e.target.value, "content")}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyItems: "end",
          alignItems: "end",
          padding: "0 10px",
        }}
      >
        <button type="button" onClick={() => DeleteIDHighlight()}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
}
