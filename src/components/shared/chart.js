import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import PropTypes from "prop-types";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import { Select } from "antd";
import { Radio } from "antd";

const ChartComponent = () => {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);
  const [year, setYear] = useState(null);
  const [value, setValue] = useState("daromad");

  const onChange = async (e) => {
    setValue(e.target.value);

    await Client.get(`${API_ENDPOINTS.MOTHLY_STATISTIC}`)
      .then((res) => {
        if (e.target.value === "daromad") {
          setSeries([
            {
              name: "Daromad",
              data: res?.map((el) => el.monthly_amount),
            },
          ]);
        } else if (e.target.value === "soni") {
          setSeries([
            {
              name: "Sotilgan mahsulot",
              data: res?.map((el) => JSON.parse(el.products_count)),
            },
          ]);
        }

        setOptions({
          chart: {
            type: 'area',
            toolbar: {
              show: false
            },
          },
          xaxis: {
            categories: res?.map((el) => el.month),
          },
          scales: {
            y: {
              beginAtZero: false,
            },
          },
          markers: {
            size: 4,
          },
          colors: ["#4154f1", "#2eca6a", "#ff771d"],
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.3,
              opacityTo: 0.4,
              stops: [0, 90, 100]
            }
          },
          dataLabels: {
            enabled: false
          },
          
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const getStatisticAmout = async () => {
    await Client.get(`${API_ENDPOINTS.MOTHLY_STATISTIC}`)
      .then((res) => {
        setSeries([
          {
            name: "Daromad",
            data: res?.map((el) => el.monthly_amount),
          },
          {
            name: "Sotilgan mahsulot",
            data: res?.map((el) => JSON.parse(el.products_count)),
          },
        ]);

        setOptions({
          chart: {
            type: 'area',
            toolbar: {
              show: false
            },
          },
          xaxis: {
            categories: res?.map((el) => el.month),
          },
          scales: {
            y: {
              beginAtZero: false,
            },
          },
          markers: {
            size: 4,
          },
          colors: ["#4154f1", "#2eca6a", "#ff771d"],
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.3,
              opacityTo: 0.4,
              stops: [0, 90, 100]
            }
          },
          dataLabels: {
            enabled: false
          },
          
        });
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
            data: res?.map((el) => JSON.parse(el.products_count)),
          },
        ]);
        setOptions({
          chart: {
            type: 'area',
            toolbar: {
              show: false
            },
          },
          xaxis: {
            categories: res?.map((el) => el.month),
          },
          scales: {
            y: {
              beginAtZero: false,
            },
          },
          markers: {
            size: 4,
          },
          colors: ["#4154f1", "#2eca6a", "#ff771d"],
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.3,
              opacityTo: 0.4,
              stops: [0, 90, 100]
            }
          },
          dataLabels: {
            enabled: false
          },
          
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeSelect = async (selectedYear) => {
    await Client.get(`${API_ENDPOINTS.MOTHLY_STATISTIC}?year=${selectedYear}`)
      .then((res) => {
        const daromadData = res?.map((el) => el.monthly_amount);
        const mahsulotData = res?.map((el) => JSON.parse(el.products_count));

        if (selectedYear && value === 'daromad') {
          setSeries([
            {
              name: "Daromad",
              data: daromadData,
            },
          ]);

        } else if ( selectedYear && value === 'soni') {
          setSeries([
            {
              name: "Sotilgan mahsulot",
              data: mahsulotData,
            },
          ]);
        }

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
    if (value === "daromad") {
      getStatisticAmout();
    } else if (value === "soni") {
      getStatistic();
    }
    getYear();
  }, []);

  return (
    <div className=""
    style={{
      maxWidth:'700px',
      width:'100%',
      height:'500px',
      }}
    >
      <Select
        style={{
          width: "100%",
          // paddingLeft: "10px",
          margin: "8px 10px 8px 0 ",
        }}
        optionFilterProp="children"
        placeholder="Yillar"
        onChange={handleChangeSelect}
        options={year}
      />
      {/* <Radio.Group onChange={onChange} value={value}>
        <Radio value="daromad">Daromad</Radio>
        <Radio value="soni">Soni</Radio>
      </Radio.Group> */}

      <div className="row">
        <div
         
        >
          {1 ? (
            <Chart
              options={options}
              series={series}
              type="area"
              style={{
                backgroundColor:'#fff'
              }}
              // className=" chart-height-control"
            />
          ) : (
            <>load</>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;

ChartComponent.propTypes = {
  month: PropTypes.string,
};
