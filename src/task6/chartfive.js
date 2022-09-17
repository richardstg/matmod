import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import horbyData from "../data/horby";
import karlskronaData from "../data/karlskrona";
import olandData from "../data/oland";
import regression from "regression";
import { regressionFunc } from "./regression";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Residualanalys",
      color: "black",
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "y-ŷ",
        color: "black",
        type: "time",
      },
    },
    x: {
      title: {
        display: true,
        text: "TID",
        color: "black",
        type: "time",
      },
    },
  },
};
const kData = karlskronaData.map((d, i) => [i, parseFloat(d.temp)]);
const labels = karlskronaData.map((d) => d.time);

const result = regression.linear(kData);
const a = result.equation[0];
const b = result.equation[1];

const kLog = karlskronaData.map((d, i) => [i, Math.log(d.temp)]);
const resultLog = regression.linear(kLog);
const k = resultLog.equation[0];
const m = resultLog.equation[1];

export const data = {
  labels,
  datasets: [
    // {
    //   label: "Linjär regression: y = -0.07x + 19.24",
    //   data: karlskronaData.map((d, i) => a * i + b),
    //   borderColor: "rgb(253, 162, 135)",
    //   backgroundColor: "rgba(253, 162, 135, 0.5)",
    // },
    // {
    //   label: "Logaritmisk transformering",
    //   data: kData.map((d, i) => Math.exp(k * i + m)),
    //   borderColor: "rgb(153, 262, 135)",
    //   backgroundColor: "rgba(153, 262, 135, 0.5)",
    // },
    {
      label: "Linjär",
      data: karlskronaData.map((d, i) => d.temp - (a * i + b)),
      borderColor: "rgb(153, 62, 35)",
      backgroundColor: "rgba(153, 62, 35, 0.5)",
    },
    {
      label: "Logaritmisk",
      data: karlskronaData.map((d, i) => d.temp - Math.exp(k * i + m)),
      borderColor: "rgb(153, 162, 35)",
      backgroundColor: "rgba(153, 162, 35, 0.5)",
    },
  ],
};

export default function ChartFive() {
  return <Line options={options} data={data} />;
}
