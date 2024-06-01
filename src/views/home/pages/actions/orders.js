import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "contexts/themeContex";
import { Input } from "antd";
const { TextArea } = Input;

export default function Orders() {
  const locationn = useLocation();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const { theme } = useTheme();

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
      window.open(
        `https://www.google.com/maps/place/${location}/?q=${latitute},${longitute}`,
        "_blank"
      );
    }
  };

  const handleChangeRouter = (id) => {
    if (id) {
      navigate(`/users/actions/?detail?${id}`);
    }
  };

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
            color="primary"
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
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="text-start w-full flex flex-col	"
          >
            <form
              className={`w-2/3 bg-slate-200 p-6  flex flex-col gap-5 mt-6  create-branch-form ${
                theme.palette.mode === "light"
                  ? "colorr"
                  : "colorr-b text-[#fff]"
              } `}
            >
              <div>
                <span className="p-1 font-medium text-sm text-start">
                  Foydalanuvchi
                </span>
                <Input
                  size="large"
                  type="text"
                  placeholder="Foydalanuvchi"
                  value={data?.user_about ? data?.user_about?.user : "-"}
                  onClick={() => handleChangeRouter(data.user_about?.id)}
                />
              </div>
              <div>
                <span className="p-1 font-medium text-sm text-start">
                  Umumiy so'mma
                </span>
                <Input
                  size="large"
                  type="text"
                  placeholder="Umumiy so'mma"
                  value={data.total_amount ? data?.total_amount : "-"}
                />
              </div>
              <div>
                <span className="p-1 font-medium text-sm text-start">Soni</span>
                <Input
                  size="large"
                  type="text"
                  placeholder="Soni"
                  value={
                    data.count_products ? data?.count_products + " ta" : "-"
                  }
                />
              </div>
              <div>
                <span className="p-1 font-medium text-sm text-start">
                  Vaqti
                </span>
                <Input
                  size="large"
                  type="text"
                  placeholder="Vaqti"
                  value={
                    data?.created_at
                      ? data?.created_at?.slice(0, 10) +
                        " | " +
                        data?.created_at?.slice(11, 18)
                      : "-"
                  }
                />
              </div>
              <div>
                <span className="p-1 font-medium text-sm text-start">
                  Manzil
                </span>
                <Input
                  size="large"
                  type="text"
                  placeholder="Manzil"
                  value={data.address?.location ? data?.address?.location : "-"}
                  onClick={() =>
                    handleRouterAdress(
                      data?.address?.location,
                      data?.address?.latitude,
                      data?.address?.longitude
                    )
                  }
                />
              </div>
              {/* <TextField
                label="Promo kod"
                variant="outlined"
                size="large"
                value={data.promocode ? data?.promocode?.code : "-"}
                type="text"
              /> */}

              <div>
                <span className="p-1 font-medium text-sm text-start">
                  Holat
                </span>
                <Input
                  size="large"
                  type="text"
                  placeholder="Holat"
                  value={
                    data && data?.status === "approved"
                      ? "tasdiqlangan"
                      : data && data?.status === "process"
                      ? "jarayonda"
                      : data && data?.status === "cancelled"
                      ? "bekor qilingan"
                      : ""
                  }
                />
              </div>
              <div>
                <span className="p-1 font-medium text-sm text-start">
                Izoh
                </span>
                <TextArea  value={data.commentary ? data?.commentary : "-"} placeholder="Izoh" allowClear rows={4} maxLength={6} />
              </div>

             
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
            {data?.product_count?.length > 0 ? (
              <form className={`w-2/3 mt-2  bg-slate-200 p-6 mt-6 ${
                theme.palette.mode === "light"
                  ? "colorr"
                  : "colorr-b text-[#fff]"
              } `}>
                <p className="font-normal font-sans text-start text-lg pb-2">
                  Buyurtmalar:
                </p>
                <ul className="border-[#AEB2B8] py-2 text-start border rounded">
                  {data?.product_count?.map((el, i) => (
                    <li className="font-normal font-sans text-base pl-2 my-2">
                      <a
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                        href={`/products/actions/?bistro?edit?${el.product_slug}`}
                      >
                        {i + 1}.{" "}
                        <img src={el.image} width={50} alt="alokand.uz" />{" "}
                        {el.product}
                      </a>
                    </li>
                  ))}
                </ul>
              </form>
            ) : (
              " "
            )}
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
