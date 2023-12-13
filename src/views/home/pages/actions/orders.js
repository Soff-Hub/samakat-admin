import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Orders() {
  const location = useLocation();
  const [data, setData] = useState(null);
  const navigate = useNavigate()

  const getData = async (id) => {
    await Client.get(`${API_ENDPOINTS.DETAIL_ORDER}${id}/`)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeRouter = (id) => {
    navigate(`/users/actions/?detail?${id}`)
  }

  useEffect(() => {
    getData(location.search.split("?")[1]);
    // eslint-disable-next-line
  }, []);


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
            style={{ display: "flex", justifyContent: "center", alignItems:'center' }}
            className="text-center w-full flex flex-col	"
          >
            <form className="w-2/3 bg-slate-200 p-6  flex flex-col gap-5 mt-6  create-branch-form">
              <TextField
                label="Foydalanuvchi"
                variant="outlined"
                size="large"
                type="text"
                value={(data.user.first_name || data.user.first_name ) ? data.user.first_name + " " + data.user?.last_name : "-"}
                onClick={() => handleChangeRouter(data.user?.id)}
              />
              <TextField
                label="Umumiy so'mma"
                variant="outlined"
                size="large"
                value={data.total_amount ? data?.total_amount : "-"}
                type="text"
              />
              <TextField
                label="Manzil"
                variant="outlined"
                size="large"
                value={data.address ? data?.address : "-"}
                type="text"
              />
              {/* <TextField
                label="Promo kod"
                variant="outlined"
                size="large"
                value={data.promocode ? data?.promocode?.code : "-"}
                type="text"
              /> */}
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

              <TextField
                label="Izoh"
                variant="outlined"
                size="large"
                value={data.commentary ? data?.commentary : "-"}
                type="text"
                multiline
                rows={4}
              />
              <div className="text-left flex align-center">
                <label className="font-normal font-sans text-base pt-2 pr-2">
                  Eshik oldida qoldirish
                </label>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={data ? data?.leave : ""}
                >
                  <FormControlLabel
                    value={data ? data?.leave : ""}
                    control={<Radio />}
                  />
                </RadioGroup>
              </div>
            </form>
            <form className="w-2/3 mt-2  bg-slate-200 p-6 mt-6 ">
              <p className="font-normal font-sans text-start text-lg pb-2" >Buyurtmalar:</p>
              <ul className="border-[#AEB2B8] py-2 text-start border rounded">
              {
                  data?.product_count?.map((el,i) => (
                    <li className="font-normal font-sans text-base pl-2" >
                     {i+1}. {el.product} {el.amount !== null ? ` - ${ el.amount}` : ''}
                    </li>
                  ))
                }
              </ul>
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
