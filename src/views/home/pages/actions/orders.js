import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  Button,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";

export default function Orders() {
  const locationn = useLocation();
  const [data, setData] = useState(null);
  const navigate = useNavigate()
  const { role } = useSelector((state) => state.admin);

  const status = {
    process : 'jarayonda',
    approved : 'tasdiqlangan',
    cancelled : "bekor qilingan"
  }

  const getData = async (id) => {
    await Client.get(`${API_ENDPOINTS.DETAIL_ORDER}${id}/`)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRouterAdress = (location, latitute, longitute) => {
    if (location) {
      window.open(`https://www.google.com/maps/place/${location}/?q=${latitute},${longitute}`, '_blank')
    }
  }

  const handleChangeRouter = (id) => {
    if (id && role != "seller") {
      navigate(`/users/actions/?detail?${id}`)
    }
  }

  useEffect(() => {
    getData(locationn.search.split("?")[1]);
    // eslint-disable-next-line
  }, []);



  return (
    <div className="px-2 py-3 bg--color">
      <div className="flex items-center justify-between bg--color">
        <h1 className="text-[28px] pb-3">Buyurtma</h1>
        <Link to="/orders">
          <Button
            variant="contained"
            size="large"
            startIcon={<ArrowBackIcon />}
            sx={{ 
              background: "#000",
              '&:hover': {
                backgroundColor: "#333", // Change this to the desired hover color
              }
            }}
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
                value={data?.user_data ? data?.user_data?.first_name : "-"}
                onClick={() => handleChangeRouter(data.user_data?.id)}
              />
              <TextField
                label="Umumiy so'mma"
                variant="outlined"
                size="large"
                value={data.total_amount ? data?.total_amount  : "-"} 
                type="text"
              />
              <TextField
                label="Soni"
                variant="outlined"
                size="large"
                value={data.count_products ? data?.count_products + " ta" : "-"}
                type="text"
              />
              <TextField
                label="Vaqti"
                variant="outlined"
                size="large"
                value={data?.created_at ?  data?.created_at?.slice(0,10) + " | " +  data?.created_at?.slice(11,18) : "-"}
                type="text"
              />
            <TextField
                label="Manzil"
                variant="outlined"
                size="large"
                value={data.address ? data?.address : "-"}
                type="text"
                onClick={() => handleRouterAdress(data?.address?.location ,data?.address?.latitude, data?.address?.longitude )}
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
                  data && status[data?.status]
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
              {/* <div className="text-left flex align-center">
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
              </div> */}
            </form>
            {
               data?.product_orders?.length > 0 ?
            <form className="w-2/3 mt-2  bg-slate-200 p-6 mt-6 ">
              <p className="font-normal font-sans text-start text-lg pb-2" >Buyurtmalar:</p>
              <ul className="border-[#AEB2B8] py-2 text-start border rounded">
              {
                  data?.product_orders?.map((el,i) => (
                    <li className="font-normal font-sans text-base pl-2 my-2" >
                      <a style={{
                        display:'flex',
                        alignItems:'center',
                        gap:'5px'
                      }} 
                       href={`/products/actions/?edit?${el?.product_data?.slug}`}>

                     {i+1}. {el?.product_data?.name} {" "} {el?.quantity} ta

                      </a>
                    </li>
                  ))
                }
              </ul>
            </form>
              : " "
            }
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
