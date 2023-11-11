import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Button, Switch, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
      <div className="flex items-center justify-between">
        <h1 className="text-[28px] pb-3">Buyurtma</h1>
        <Link to="/orders">
          <Button
            variant="contained"
            color="info"
            size="large"
            startIcon={<ArrowBackIcon />}
          >
            Orqaga
          </Button>
        </Link>
      </div>
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
                  data && data?.status === "approved"
                    ? "tasdiqlangan"
                    : data && data?.status === "pending"
                    ? "jarayonda"
                    : data && data?.status === "cancelled"
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
