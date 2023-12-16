import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
import { Select } from "antd";
// import Select from "@mui/material/Select";

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
  console.log('dataF', dataF);
  const [obj, setObj] = useState({ branch: "", quantity: "", id });
  const [select, setSelect] = useState([]);

  function changeObj(e, key) {
    let keyName = {};
    keyName[`${key}`] = e;
    addFilialInput({ ...obj, ...keyName }, id);
    setObj({ ...obj, ...keyName });
  }

  const DeleteFilialItem = () => {
    deleteID(id);
    console.log("addInputdan ketayotgan  delete id => ", id);
  };
  
  const DeleteIDHighlight = () => {
    deleteIDHighlight(id);
  };

  
  useEffect(()=> {
    setSelect(
      selectData?.map((el) => ({
        label: el?.name,
        value: el?.id,
      }))
    );
  }, [selectData])


  return selectData ? (
    <div style={{ backgroundColor: "#EEEEEE" }} className="flex gap-x-10 p-3  ">
      <div className="mx-1">
        {/* <FormControl sx={{ m: 0, minWidth: 220 }} size="small">
          <InputLabel id="demo-select-small-label" placholder="Kategoriya">
            Filial
          </InputLabel>
          <Select
            label="Filial"
            onChange={(e) => changeObj(e.target.value, "branch")}
            defaultValue={"salom"}
            // value={'salom'}
            // required
          >
            {selectData?.map((item, i) => (
              <MenuItem key={i} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        <Select
        placeholder="Filial"
        sx={{ m: 0, minWidth: 220 }} size="small"
          value={dataF?.branch}
          style={{
            width: 170,
            height: 40,
            //  backgroundColor:'#EEEEEE'
          }}
          onChange={(e) => changeObj(e, "branch")}
          options={select}
        />
      </div>
      <div>
        <TextField
          label={"Soni"}
          variant="outlined"
          backgroundColor='#ffffff'
          size="small"
          type="number"
          // required
          value={dataF?.quantity}
          onChange={(e) => {
            changeObj(e.target.value, "quantity");
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
          // defaultValue={dataH?.order}
          value={dataH?.order}
          onChange={(e) => {
            changeObj(e.target.value, "order");
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
          value={dataH?.content}
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
