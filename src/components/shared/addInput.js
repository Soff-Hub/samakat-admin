import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
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
  // change,
}) {
  const [obj, setObj] = useState({ branch: 0, quantity: 0, id });

  function changeObj(e, key) {
    console.log("key", key, e);
    if (key == "quantity") {
      setChangeBranchCunt(true);
    }
    let keyName = {};
    keyName[`${key}`] = e;
    addFilialInput({ ...obj, ...keyName }, id);
    setObj({ ...obj, ...keyName });
  }

  const DeleteFilialItem = () => {
    deleteID(id);
  };

  const DeleteIDHighlight = () => {
    deleteIDHighlight(id);
  };

  return selectData ? (
    <div style={{ backgroundColor: "#ccc" }} className="flex gap-3 p-3  ">
      <div className="mx-1">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label" placholder="Kategoriya">
            Filial
          </InputLabel>
          <Select
            label="Filial"
            required
            onChange={(e) => changeObj(e.target.value, "branch")}
            defaultValue={dataF?.brach}
          >
            {selectData?.map((item, i) => (
              <MenuItem key={i} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="mx-1">
        <TextField
          label={"Soni"}
          variant="outlined"
          size="small"
          style={{ height: "10px", marginTop: "10px" }}
          type="number"
          defaultValue={dataF ? dataF?.quantity : obj?.quantity}
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
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  ) : (
    <div className="flex gap-5 p-3" style={{ backgroundColor: "#ccc" }}>
      <div className="mx-1">
        <TextField
          label="Asosiy element"
          variant="outlined"
          required
          size="small"
          style={{ marginTop: "10px" }}
          type="text"
          defaultValue={dataH?.content}
          onChange={(e) => (changeObj(e.target.value, "content"))}
        />
      </div>
      <div className="mx-1">
        <TextField
          label="Tartib raqam"
          variant="outlined"
          size="small"
          style={{ marginTop: "10px" }}
          type="number"
          defaultValue={dataH?.order ? dataH?.order : obj?.order}
          // value={dataH?.order ? dataH?.order : obj?.order}
          onChange={(e) => {
            changeObj(+e.target.value, "order");
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
        <button type="button" onClick={() => DeleteIDHighlight()}>
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
}
