import React, { useEffect, useState } from "react";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import ChartComponent from "components/shared/chart";
import {
  Box,
  CircularProgress
} from "@mui/material";

export default function Dashboard() {
  const [data, setData] = useState(null);

  const getData = async () => {
    await Client.get(API_ENDPOINTS.DASHBOARD)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <div className="dashboard-container" >
      <div className="dashboard">
       {/* <div className="dashboart-cart-group-two" > */}
       <div className="dashboard-item-cart     flex flex-col xl:gap-12 justify-between  border lg:p-4 md:p-2 p-2 rounded-md m-2 shadow-lg shadow-indigo-500/40">
          <div className="flex justify-between">
            <p>
              <span className="lg:text-[18px] md:text-[16px]  sm:text-[14px] text-[13px] lg:leading-5 leading-4  block font-semibold text-slate-900">
                Bugungi daromad
              </span>
            </p>
            <i
              className="fa-solid fa-money-check-dollar dashboard-icon"
            ></i>
          </div>
          <p className="lg:text-[15px] md:text-[14px] sm:text-[12px] text-[12px] leading-3">
            <i
              style={{ color: "#FFC107" }}
              className="fa-solid fa-coins mr-1"
            ></i>
            {data?.todays_amount}
          </p>
        </div>
        <div className="dashboard-item-cart   flex flex-col xl:gap-12 justify-between  border lg:p-4 md:p-2 p-2 rounded-md m-2 shadow-lg shadow-indigo-500/40">
          <div className="flex justify-between">
            <p>
              <span className="lg:text-[18px] md:text-[16px] sm:text-[14px] text-[13px] lg:leading-5 leading-4  block font-semibold text-slate-900">
                Jami daromad
              </span>
            </p>
            <i
              class="fa-solid fa-sack-dollar dashboard-icon"
            ></i>
          </div>
          <p className="lg:text-[15px] md:text-[14px] sm:text-[12px] text-[12px] leading-3">
            <i style={{ color: "#FFC107" }} className="fa-solid fa-coins "></i>{" "}
            {data?.total_amount} <span>so'm</span>
          </p>
        </div>
       {/* </div> */}

       {/* <div className="dashboart-cart-group-two"> */}
       <div className="dashboard-item-cart   flex flex-col xl:gap-12 justify-between  border lg:p-4 md:p-2 p-2 rounded-md m-2 shadow-lg shadow-indigo-500/40">
          <div className="flex justify-between">
            <p>
              <span className="lg:text-[18px] md:text-[16px] sm:text-[14px] text-[13px] lg:leading-5 leading-4 block font-semibold text-slate-900">
                Oxirgi 30 kunlik
              </span>
            </p>
            <i
              className="fa-solid fa-money-bill-trend-up dashboard-icon"
            ></i>
          </div>
          <p className="lg:text-[15px] md:text-[14px] sm:text-[12px] text-[12px] leading-3 ">
            <i style={{ color: "#FFC107" }} className="fa-solid fa-coins"></i>
            {data?.total_for_last_month} <span>so'm</span>
          </p>
        </div>
        <div className="dashboard-item-cart   flex flex-col xl:gap-12 justify-between  border lg:p-4 md:p-2 p-2 rounded-md m-2 shadow-lg shadow-indigo-500/40">
          <div className="flex justify-between">
            <p>
              <span className="lg:text-[18px] md:text-[16px] sm:text-[14px] text-[13px] lg:leading-5 leading-4  block font-semibold text-slate-900">
                Sotilgan mahsulotning soni
              </span>
            </p>
            <i
              className="fa-solid fa-list-ol dashboard-icon"
            ></i>
          </div>
          <p className="lg:text-[15px] md:text-[14px] sm:text-[12px] text-[12px] leading-3">
            <i style={{ color: "#FFC107" }} className="fa-solid fa-coins"></i>{" "}
            {data?.total_sold_products}
          </p>
        </div>
       {/* </div> */}
       
      </div>
      {1 ? (
        <>
          <ChartComponent />
        </>
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
  );
}
