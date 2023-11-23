import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import PropTypes from "prop-types";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import { Select } from "antd";

export default function ChartComponent({ data }) {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);
  const [year, setYear] = useState(null);

  const getYear = async () => {
    await Client.get(API_ENDPOINTS.YEAR)
      .then((res) => {
        setYear(
          res?.map((el) => ({
            label: el,
            value: el,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatistic = async () => {
    await Client.get(`${API_ENDPOINTS.MOTHLY_STATISTIC}`)
      .then((res) => {
        setSeries([
          {
            name: "Daromad",
            data: res?.map((el) => el.monthly_amount),
          },
          {
            name: "Sotilgan mahsulot",
            data: res?.map((el) => el.products_count),
          },
        ]);
        setOptions({
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: res?.map((el) => el.month),
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeSelect = async (year) => {
    await Client.get(`${API_ENDPOINTS.MOTHLY_STATISTIC}?year=${year}`)
    .then((res) => {
      setSeries([
        {
          name: "Daromad",
          data: res?.map((el) => el.monthly_amount),
        },
        {
          name: "Sotilgan mahsulot",
          data: res?.map((el) => el.products_count),
        },
      ]);
      setOptions({
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: res?.map((el) => el.month),
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    getStatistic();
    getYear();
  }, []);

  return (
    <div className="app ">
      <Select
        style={{
          width: "25%",
          paddingLeft: "10px",
          margin: "8px 0",
        }}
        optionFilterProp="children"
        placeholder="Yillar"
        onChange={handleChangeSelect}
        options={year}
      />

      <div className="row w-full">
        <div
          className="mixed-chart"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {1 ? (
            <Chart
              options={options}
              series={series}
              type="bar"
              className="w-full"
              style={{
                with: "100%",
                height: "auto",
              }}
            />
          ) : (
            <>load</>
          )}
        </div>
      </div>
    </div>
  );
}

ChartComponent.propTypes = {
  month: PropTypes.string,
};
