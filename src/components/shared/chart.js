import React, { useState } from "react";
import Chart from "react-apexcharts";

export default function ChartComponent() {
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [
        "yanvar",
        "fevral",
        "mart",
        "aprel",
        "may",
        "iyun",
        "iyul",
        "avgust",
        "sentabr",
        "oktabr",
        "noyabr",
        "dekabr",
      ],
    },
  });
  const [series, setSeries] = useState([
    {
      name: "daromad",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 33, 55, 80, 99],
    },
  ]);
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     options: {
  //       chart: {
  //         id: "basic-bar"
  //       },
  //       xaxis: {
  //         categories: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul' , 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']
  //       }
  //     },
  //     series: [
  //       {
  //         name: "daromad",
  //         data: [30, 40, 45, 50, 49, 60, 70, 91, 33, 55, 80, 99]
  //       }
  //     ]
  //   };
  // }

  return (
    <div className="app ">
      <div className="row">
        <div className="mixed-chart text-center ">
          <Chart
            options={options}
            series={series}
            type="bar"
            className="w-full"
            style={{
              maxWidth: "1000px",
              with: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
}
