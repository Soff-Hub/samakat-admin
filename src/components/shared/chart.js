import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import PropTypes from 'prop-types'

export default function ChartComponent({ data }) {
  const [arrMonth, setArrMonth] = useState([]);
  const [arrMonthValue, setArrMonthValue] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: arrMonth,
    },
  });
  const [series, setSeries] = useState([
    {
      name: "mahsulot soni",
      data: arrMonthValue,
    },
  ]);

  const sortData = (data) => {
    for (const item of data) {
      arrMonth.push(item.month);
      arrMonthValue.push(item.monthly_amount)
    }
    console.log("statistic", arrMonthValue);
  };

  useEffect(() => {
    if (data?.length > 0) {
      sortData(data);
    }
  }, []);

  console.log(options , series);

  return (
    <div className="app ">
      <div className="row w-full">
        <div
          className="mixed-chart"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
         {
          data?.length > 0 ? 
          <Chart
          options={options}
          series={series}
          type="bar"
          className="w-full"
          style={{
            maxWidth: "1200px",
            with: "100%",
          }}
        /> :
        <>load</>
         }
        </div>
      </div>
    </div>
  );
}

ChartComponent.propTypes = {
  month: PropTypes.string
}