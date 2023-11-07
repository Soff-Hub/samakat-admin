import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import NavHeaderSelect from "components/shared/NavHeaderSelect";
import { Row2 } from "components/shared/Row2";

export default function Categories2() {
  const [data, setData] = useState(null);
  const [alignment, setAlignment] = React.useState("web");
  const [page, setPage] = React.useState(1);
  const [type, setType] = useState("bistro");
  const [count, setCount] = useState(10);
  const [deteItem, setDeleteItem] = useState("");

  const handleChange = async (e) => {
    setType(e.target.value);
    setPage(1);
    await Client.get(
      `${API_ENDPOINTS.CATEGORIES}?page=${page}&type=${e.target.value}&parent_is_null=true`
    )
      .then((resp) => {
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  async function getCategories() {
    await Client.get(
      `${API_ENDPOINTS.CATEGORIES}?page=${page}&type=bistro&parent_is_null=true`
    )
      .then((resp) => {
        setData(resp.results);
        setCount(resp.count);
      })
      .catch((err) => console.log(err));
  }
  console.log(count);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const Search = async (e) => {
    await Client.get(`${API_ENDPOINTS.CATEGORIES}?search=${e}`)
      .then((resp) => {
        console.log(resp);
        getCategories();
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const Detele = (value) => {
    console.log("delete", value);
    setDeleteItem(value);
  };

  useEffect(() => {
    getCategories();
  }, [deteItem, data]);

  return (
    <div>
      <NavHeaderSelect title="Kategoriyalar" />
      <ToggleButtonGroup
        color="primary"
        value={type}
        exclusive
        onChange={handleChange}
        className="mt-5 flex items-center w-full"
      >
        <ToggleButton className="mt-5 flex items-center w-full" value="bistro">
          Bistro
        </ToggleButton>
        <ToggleButton className="mt-5 flex items-center w-full" value="byuti">
          Apteka
        </ToggleButton>
      </ToggleButtonGroup>
      <input
        type="text"
        placeholder="Izlash"
        className=" px-3 ps-5 py-3 border-2 rounded-md my-3 border-3  hover:outline-none focus:outline-none active:outline-none"
        style={{ width: "100%" }}
        onChange={(e) => Search(e.target.value)}
      />
      <div className="flex justify-between  bg-gray-300 p-2">
        <div className="text-base font-[700]">Nomi</div>
        <div className="text-base font-[700]">Amallar</div>
      </div>
      <div>
        <Row2 row={data} Detele={Detele} />
      </div>
    </div>
  );
}
