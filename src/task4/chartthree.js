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
      text: "Regression med konfidensintervall för Karlskrona 10-11:e augusti 2021",
      color: "black",
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "TEMPERATUR I CELCIUS",
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

const labels = karlskronaData.map((d) => d.time);
const result = regression.linear(
  karlskronaData.map((d, i) => [i, parseFloat(d.temp)])
);
const a = result.equation[0];
const b = result.equation[1];
const [bLower, bUpper, aLower, aUpper, confInt] = regressionFunc(
  karlskronaData.map((d, i) => [i]),
  karlskronaData.map((d) => [parseFloat(d.temp)])
);
console.log(bLower);
console.log(bUpper);
console.log(aLower);
console.log(aUpper);

export const data = {
  labels,
  datasets: [
    {
      label: "Linjär regression: y = -0.07x + 19.24",
      data: karlskronaData.map((d, i) => a * i + b),
      borderColor: "rgb(253, 162, 135)",
      backgroundColor: "rgba(253, 162, 135, 0.5)",
    },
    {
      label: "95% konfidensintervall",
      data: karlskronaData.map((d, i) => a * i + b - confInt(i)),
      borderColor: "rgb(3, 162, 135)",
      backgroundColor: "rgba(3, 162, 135, 0.5)",
    },
    {
      label: "95% konfidensintervall",
      data: karlskronaData.map((d, i) => a * i + b + confInt(i)),
      borderColor: "rgb(3, 162, 135)",
      backgroundColor: "rgba(3, 162, 135, 0.5)",
    },
    {
      label: "Originaldata",
      data: karlskronaData.map((d) => d.temp),
      borderColor: "rgb(153, 162, 135)",
      backgroundColor: "rgba(153, 162, 135, 0.5)",
    },
  ],
};

export default function ChartThree() {
  return <Line options={options} data={data} />;
}
