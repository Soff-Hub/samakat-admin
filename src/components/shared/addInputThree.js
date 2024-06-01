import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Select } from "antd";

export default function AddInputThree({
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
  // console.log("dataF", dataF);
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
  };

  const DeleteIDHighlight = () => {
    deleteIDHighlight(id);
  };

  useEffect(() => {
    setSelect(
      selectData?.map((el) => ({
        label: el?.name,
        value: el?.id,
      }))
    );
  }, [selectData]);

  return (
    <div className="flex gap-x-10 p-3">
    <div className="mx-1">
      <TextField
        label="Tartib raqam"
        variant="outlined"
        size="small"
        style={{ marginTop: "10px", width: "150px" }}
        type="number"
        defaultValue={dataH?.order}
        onChange={(e) => {
          changeObj(e.target.value, "order");
        }}
      />
    </div>
    <div className="mx-1 w-full">
      <TextField
        label="Asosiy element "
        variant="outlined"
        className="w-full"
        size="small"
        style={{ marginTop: "10px" }}
        type="text"
        defaultValue={dataH?.content_uz}
        onChange={(e) => changeObj(e.target.value, "content_uz")}
      />
    </div>
    <div className="mx-1 w-full">
      <TextField
        label="Asosiy element (ru)"
        variant="outlined"
        className="w-full"
        size="small"
        style={{ marginTop: "10px" }}
        type="text"
        defaultValue={dataH?.content_ru}
        onChange={(e) => changeObj(e.target.value, "content_ru")}
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
  )
}
