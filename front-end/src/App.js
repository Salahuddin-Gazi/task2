import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

var options = {
  responsive: true,
  plugins: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly Revenue",
    },
    datalabels: {
      color: "black",
      anchor: "end",
      align: "end",
      formatter: function (value, context) {
        return value + "%";
      },
    },
  },
};

export function App() {
  var [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5432/data")
      .then(({ data }) => {
        if (data && data.length == 12) {
          // setTimeout(() => {
          setRevenueData(data);
          // }, 10000);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  if (revenueData.length == 0) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center mt-[50px]">
        <h1>Waiting for Data!</h1>
        <div id="outer">
          <div id="middle">
            <div id="inner"></div>
          </div>
        </div>
      </div>
    );
  } else {
    var months = revenueData.map((data) => {
      var temp_month = data.month;
      temp_month = temp_month.charAt(0).toUpperCase() + temp_month.slice(1);
      return temp_month;
    });
    var revenue = revenueData.map((data) => data.revenue);

    var data = {
      labels: months,
      datasets: [
        {
          label: "Revenue Percentage",
          data: revenue,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
          ],
          borderWidth: 1,
        },
      ],
    };
    return (
      <>
        <div className="max-w-screen-lg mx-auto mt-[30px] flex flex-col justify-center items-center">
          <a
            href="http://127.0.0.1:5432/"
            className="text-blue-500 underline text-center mb-[20px]"
          >
            Update Data
          </a>

          <h1 className="my-[20px]">
            This bar chart updates with page refresh!
          </h1>
          <Bar options={options} data={data} />
        </div>
      </>
    );
  }
}
