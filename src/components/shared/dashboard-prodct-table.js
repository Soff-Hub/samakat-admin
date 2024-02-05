import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";

export default function DashboardProdctTable() {
  const [data, setData] = useState([]);

  const DashboardProduct = async () => {
    await Client.get(API_ENDPOINTS.DASHBOARD_ORDER)
      .then((res) => {
        setData(res?.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    DashboardProduct();
  }, []);
  return (
    <div className="ro my-3 px-3">
      <div class="co-12">
        <div class="card recent-sales overflow-auto">
          <div class="card-body">
            <h5 class="card-title">
              {" "}
              Buyurtmalar <span>| Bugun</span>
            </h5>

            <table class="table table-borderless datatable">
              <thead>
                <tr
                  style={{
                    borderBottom: "2px solid #ccc",
                  }}
                >
                  <th scope="col">Id</th>
                  <th scope="col">Filial</th>
                  <th scope="col">To'lov</th>
                  <th scope="col">Narxi</th>
                  <th scope="col">Sanasi</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((el) => (
                  <tr
                    style={{
                      borderBottom: "1px solid #ccc",
                    }}
                  >
                    <th scope="row">
                      <a href="#">{el?.id}</a>
                    </th>
                    <td>{el?.branch?.name}</td>
                    
                    <td>
                      <span class="text-primary">
                        {el?.is_paid ? "To'langan" : "To'lanmagan"}
                      </span>
                    </td>
                    <td>{el?.total_amount} so'm</td>
                    <td>{el?.created_at?.substring(0,10)}</td>
                    <td>
                      {el?.status === "cancelled" ? (
                        <span class="badge bg-danger">Bekor qilingan</span>
                      ) : el?.status === "approved" ? (
                        <span class="badge bg-success">Tasdiqlangan</span>
                      ) : el?.status === "process" ? (
                        <span class="badge bg-warning">Jarayonda</span>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
