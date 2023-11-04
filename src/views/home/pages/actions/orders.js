import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Switch, TextField } from "@mui/material";

export default function Orders() {
  const location = useLocation();
  const [data, setData] = useState(null);

  const getData = async (id) => {
    await Client.get(`${API_ENDPOINTS.DETAIL_ORDER}${id}/`)
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData(location.search.split("?")[1]);
  }, []);

  console.log("log", location.search);

  return (
    <div>
      <h3 className="text-center font-medium text-lg"> Buyurtma tavsifi </h3>
      <div>
        {data ? (
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="text-center w-full 	"
          >
            <form className="w-2/3 bg-slate-200 p-6  flex flex-col gap-5 mt-6  create-branch-form">
              <TextField
                label="Foydalanuvchi"
                variant="outlined"
                size="large"
                type="text"
                value={data ? data.user : ""}
              />

              {/* <div className="flex gap-10" >
        <TextField
            label="Latitude"
            variant="outlined"
            size="small"
            name="latitude"
            value={data ? data?.total_amount : ''}
            type="number"
          />
          <TextField
            label="Longitude"
            variant="outlined"
            size="small"
            value={data ? data?.address.longitude : ''}
            type="number"
          />
        </div> */}
              <TextField
                label="Umumiy so'mma"
                variant="outlined"
                size="large"
                value={data ? data?.total_amount : ""}
                type="text"
              />
              <TextField
                label="Manzil"
                variant="outlined"
                size="large"
                value={data ? data?.address : ""}
                type="text"
              />
              <TextField
                label="Promo kod"
                variant="outlined"
                size="large"
                value={data ? data?.promocode : ""}
                type="text"
              />
              <TextField
                label="Holat"
                variant="outlined"
                size="large"
                value={
                  data && data?.status == "approved"
                    ? "tasdiqlangan"
                    : data && data?.status == "pending"
                    ? "jarayonda"
                    : data && data?.status == "cancelled"
                    ? "bekor qilingan"
                    : ""
                }
                type="text"
              />
              <div className="text-left">
                <label className="font-normal font-sans text-base">
                  Eshik oldida qoldirish
                </label>
                <Switch
                  checked={data ? data?.leave : ""}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
            </form>
          </div>
        ) : (
          <Box
            sx={{
              display: "flex",
              wdith: "100%",
              justifyContent: "center",
              padding: "150px 0",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </div>
    </div>
  );
}
