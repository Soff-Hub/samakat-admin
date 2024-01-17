import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import NavHeaderSelect from "components/shared/NavHeaderSelect";
import { Row2 } from "components/shared/Row2";

export default function Categories2() {
  const [data, setData] = useState(null);
  const [page, setPage] = React.useState(1);
  const [type, setType] = useState("bistro");

  const handleChange = async (e) => {
    setType(e.target.value);
    setPage(1);
    await Client.get(
      `${API_ENDPOINTS.CATEGORIES}?page=${page}&type=${e.target.value}&parent_is_null=true`
    )
      .then((resp) => {
        console.log('first data => ', resp.results);
        
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
      })
      .catch((err) => console.log(err));
  }

  const Search = async (e) => {
    await Client.get(`${API_ENDPOINTS.CATEGORIES}?type=${type}&search=${e}`)
      .then((resp) => {
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

 
  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-2 ">
      <NavHeaderSelect title="Kategoriyalar" />
      <div className="colorr my-2 px-2">
      <ToggleButtonGroup
        color="primary"
        value={type}
        exclusive
        onChange={handleChange}
        className="mt-2 flex items-center w-full colorr p-2"
      >
        <ToggleButton className="w-full" value="bistro">
          Bistro
        </ToggleButton>
        <ToggleButton className="w-full" value="byuti">
          Byuti
        </ToggleButton>
      </ToggleButtonGroup>
      <input
        type="text"
        placeholder="Izlash"
        className=" px-3 ps-5 py-3 border-2 rounded-md my-3 border-3  hover:outline-none focus:outline-none active:outline-none"
        style={{ width: "100%" }}
        onChange={(e) => Search(e.target.value)}
      />
      <div className="flex justify-between bg-[#fff] p-2 px-4 mb-1">
        <div className="font-bold text-[16px]">Nomi</div>
        <div className="font-bold text-[16px]">Amallar</div>
      </div>
      <hr />
      <div>
        <Row2 row={data} />
      </div>
      </div>
    </div>
  );
}
