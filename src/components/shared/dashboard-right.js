import { useTheme } from "contexts/themeContex";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";

function DashboarRight() {
  const [data, setData] = useState([]);
  const { theme } = useTheme();

  const DashboardProduct = async () => {
    await Client.get(API_ENDPOINTS.DASHBOARD_PRODUCT)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    DashboardProduct();
  }, []);

  return (
    <div class={`card  ${ theme.palette.mode === "light"
    ? " "
    : "bg-black text-white"} `}>
      <div class="card-body">
        <h5  class={` ${
                  theme.palette.mode === "light" ? "card-title" : "card-title-b"
                }`} >
          Ommabop mahsulotlar <span>| Bugun</span>
        </h5>
        <div class="activity">
        {data?.map((el) => (
          <div class="activity-item d-flex">
            <div class="activite-label">{el.count} ta</div>
            <i class={`fa-solid fa-circle activity-badge align-self-start text-success `} ></i>
            <div class="activity-content">
             {el.product__name}
            </div>
          </div>
        ))}

        </div>
      </div>
    </div>
  );
}

export default DashboarRight;
