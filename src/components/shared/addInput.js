import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function AddInput({ selectData, addFilialInput, id , deleteID, input2Name }) {
  const [obj, setObj] = useState({ branch: 0, quantity: 0 , id});

  function changeObj(e, key) {
    let keyName ={}
    keyName[`${key}`]=e
    addFilialInput({ ...obj ,...keyName}, id);
    setObj({ ...obj ,...keyName});
  }

  const DeleteFilialItem = () => {
    deleteID(id)
  }

  return selectData ? (
    <div
      style={{ backgroundColor: "#ccc", width: "570px" }}
      className="flex gap-3 p-3  "
    >
      <div className="mx-1">
        <FormControl
          style={{ width: "200px" }}
          sx={{ m: 1, minWidth: 120 }}
          size="small"
        >
          <InputLabel id="demo-select-small-label" placholder="Kategoriya">
            Filial
          </InputLabel>
          <Select
            label="Filial"
            onChange={(e) => changeObj(e.target.value,'branch')}
          >
            {selectData?.map((item, i) => (
              <MenuItem key={i} value={item.latitude}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="mx-1">
        <TextField
          label={'Soni'}
          variant="outlined"
          size="small"
          style={{ height: "10px", marginTop: "10px" }}
          type="number"
          onChange={(e) => {
            changeObj( +e.target.value , "quantity");
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
  ) :
  (
    <div
    className="flex gap-5 p-3"
    style={{ width: "570px", backgroundColor: "#ccc" }}
  >
    <div className="mx-1">
      <TextField
        label="Asosiy element"
        variant="outlined"
        size="small"
        style={{ marginTop: "10px" }}
        type="text"
       //  value={content}
       onChange={(e) => changeObj(e.target.value,'content')}
      />
    </div>
    <div className="mx-1">
      <TextField
        label="Tartib raqam"
        variant="outlined"
        size="small"
        style={{ marginTop: "10px" }}
        type="number"
        onChange={(e) => {
          changeObj( +e.target.value , "order");
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
      <button 
  type="button" onClick={() => DeleteFilialItem()}
      >
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  </div>
  )
}
