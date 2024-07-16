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

      <div className="card-body">
        <h5 className="card-title">
          Ommabop mahsulotlar <span>| Bugun</span>
        </h5>
        <div className="activity">
        {data?.map((el) => (
          <div key={el?.id} className="activity-item d-flex">
            <div className="activite-label">{el.count} ta</div>
            <i style={{color: `${el.color}`}} className={`fa-solid fa-circle activity-badge align-self-start`} ></i>
            <div className="activity-content">
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
