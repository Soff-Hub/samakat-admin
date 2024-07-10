import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";

function DashboarRight() {
  const [data, setData] = useState([]);

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

  console.log('data', data);

  return (
    <div data-aos="flip-right" class="card">
      {/* <div class="filter">
              <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li class="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>

                <li><a class="dropdown-item" href="#">Today</a></li>
                <li><a class="dropdown-item" href="#">This Month</a></li>
                <li><a class="dropdown-item" href="#">This Year</a></li>
              </ul>
            </div> */}

      <div class="card-body">
        <h5 class="card-title">
          Ommabop mahsulotlar <span>| Bugun</span>
        </h5>
        <div class="activity">
        {data?.map((el) => (
          <div class="activity-item d-flex">
            <div class="activite-label">{el.count} ta</div>
            <i style={{color: `${el.color}`}} class={`fa-solid fa-circle activity-badge align-self-start`} ></i>
            <div class="activity-content">
             {el.product_variant__product__name}
            </div>
          </div>
        ))}

        </div>
      </div>
    </div>
  );
}

export default DashboarRight;
