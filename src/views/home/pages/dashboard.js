import React, { useEffect, useState } from "react";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import ChartComponent from "components/shared/chart";
import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [statistic, setStatistic] = useState(null)
  const [year, setYear] = useState(null)

  const getData = async () => {
    await Client.get(API_ENDPOINTS.DASHBOARD)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatistic = async () => {
    await Client.get(API_ENDPOINTS.MOTHLY_STATISTIC)
    .then((res) => {
      setStatistic(res.result)
    })
    .catch((err) => {
      console.log(err);
      
    })
  }
  const getYear = async () => {
    await Client.get(API_ENDPOINTS.YEAR)
    .then((res) => {
      setYear(res.result)
    })
    .catch((err) => {
      console.log(err);
      
    })
  }


  useEffect(() => {
    getData();
    getStatistic();
    getYear()
  }, []);



  return (
    <div>
      <div className="flex justify-center">
        <div className="md:w-1/2 w-1/4  flex flex-col xl:gap-12 justify-between  border p-4 rounded-md m-2 shadow-lg shadow-indigo-500/40">
          <div className="flex justify-between">
            <p>
              <span className="text-[18px] block font-semibold text-slate-900">
                Bugungi daromad
              </span>
            </p>
            <i
              style={{ color: "#FFC107  ", fontSize: "28px" }}
              className="fa-solid fa-money-check-dollar"
            ></i>
          </div>
          <p className="text-[16px]">
            <i style={{ color: "#FFC107" }} className="fa-solid fa-coins mr-1"></i>
            {data?.todays_amount}
          </p>
        </div>
        <div className="md:w-1/2 w-1/4  flex flex-col xl:gap-12 justify-between  border p-4 rounded-md m-2 shadow-lg shadow-indigo-500/40">
          <div className="flex justify-between">
            <p>
              <span className="text-[18px] block font-semibold text-slate-900">
                Jami daromad
              </span>
            </p>
            <i
              style={{ color: "#FFC107  ", fontSize: "28px" }}
                class="fa-solid fa-sack-dollar"
            ></i>
          </div>
          <p className="text-[16px]">
            <i style={{ color: "#FFC107" }} className="fa-solid fa-coins"></i>{" "}
            {data?.total_amount}
          </p>
        </div>
        <div className="md:w-1/2 w-1/4  flex flex-col xl:gap-12 justify-between  border p-4 rounded-md m-2 shadow-lg shadow-indigo-500/40">
          <div className="flex justify-between">
            <p>
              <span className="text-[18px] block font-semibold text-slate-900">
                Oxirgi 30 kunlik
              </span>
            </p>
            <i
              style={{ color: "#FFC107  ", fontSize: "28px" }}
              className="fa-solid fa-money-bill-trend-up"
            ></i>
          </div>
          <p className="text-[16px]">
            <i style={{ color: "#FFC107" }} className="fa-solid fa-coins"></i>
            {data?.total_for_last_month}
          </p>
        </div>
        <div className="md:w-1/2 w-1/4  flex flex-col xl:gap-12 justify-between  border p-4 rounded-md m-2 shadow-lg shadow-indigo-500/40">
          <div className="flex justify-between">
            <p>
              <span className="text-[18px] block font-semibold text-slate-900">
              Sotilgan mahsulotning soni
              </span>
            </p>
            <i
              style={{ color: "#FFC107  ", fontSize: "28px" }}
              className="fa-solid fa-list-ol"
            ></i>
          </div>
          <p className="text-[16px]">
            <i style={{ color: "#FFC107" }} className="fa-solid fa-coins"></i>{" "}
           {data?.total_sold_products}
          </p>
        </div>
      </div>
      {
        statistic?.length > 0 ?
        <>
        <div>
        {/* <FormControl
          sx={{ minWidth: 100 }}
          size="small"
          className="sm:w-full  w-1/3"
        >
          <InputLabel id="demo-select-small-label" placholder="Yillar bo'yicha">
            Yillar bo'yicha
          </InputLabel>
          <Select
            className="py-0.5"
            value={''}
            label="Holat bo'yicha"
            // onChange={handleChangeFilial}
          >
            {year ? (
              year?.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))
            ) : (
              <></>
            )}
          </Select>
        </FormControl> */}
        </div>
        <ChartComponent data={statistic} />
        </>
        :
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
      }
  </div>
  );
}
