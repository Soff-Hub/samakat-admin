import React, { useEffect, useState } from "react";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import ChartComponent from "components/shared/chart";
import { Box, CircularProgress } from "@mui/material";
import DashboardRight from "components/shared/dashboard-right";
import DashboardProdctTable from "components/shared/dashboard-prodct-table";

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
    <div className="dashboard-container dashboard pt-4" style={{
      backgroundColor:'#F1F4FA'
    }}>
      <div className="row px-3">
        <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6">
          <div class="card info-card sales-card">
            <div class="card-body">
              <h5 class="card-title">
                Daromad <span>| Bugun</span>
              </h5>

              <div class="d-flex align-items-center">
                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i class="bi bi-cart"></i>
                </div>
                <div class="ps-3">
                  <h6>{data?.todays_amount}</h6>
                  <span class="text-success small pt-1 fw-bold">12%</span>{" "}
                  <span class="text-muted small pt-2 ps-1">increase</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6">
          <div class="card info-card revenue-card">
            <div class="card-body">
              <h5 class="card-title">
                Daromad <span>| Jami</span>
              </h5>

              <div class="d-flex align-items-center">
                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i class="bi bi-currency-dollar"></i>
                </div>
                <div class="ps-3">
                  <h6>{data?.total_amount}</h6>
                  <span class="text-success small pt-1 fw-bold">8%</span>{" "}
                  <span class="text-muted small pt-2 ps-1">increase</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6">
          <div class="card info-card customers-card">
            <div class="card-body">
              <h5 class="card-title">
                Daromad <span>| Oxirgi 30 kunlik</span>
              </h5>

              <div class="d-flex align-items-center">
                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                <i class="bi bi-cash-coin"></i>
                </div>
                <div class="ps-3">
                  <h6>{data?.total_for_last_month}</h6>
                  <span class="text-danger small pt-1 fw-bold">12%</span>{" "}
                  <span class="text-muted small pt-2 ps-1">decrease</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6">
          <div class="card info-card customers-card2">
            <div class="card-body">
              <h5 class="card-title">
                Soni <span>| Jami mahsulotlar</span>
              </h5>

              <div class="d-flex align-items-center">
                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                <i class="bi bi-bar-chart-fill"></i>
                </div>
                <div class="ps-3">
                  <h6>{data?.total_sold_products}</h6>
                  <span class="text-danger small pt-1 fw-bold">12%</span>{" "}
                  <span class="text-muted small pt-2 ps-1">decrease</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {1 ? (
        <>
        <div className="dashboard-main">
          <ChartComponent />
          <DashboardRight />
        </div>
        <DashboardProdctTable/>
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
