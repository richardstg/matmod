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
import _, { map } from "underscore";
import horbyData from "../data/horby";
import karlskronaData from "../data/karlskrona";
import olandData from "../data/oland";
import regression from "regression";
import { regressionFunc } from "./regression";

var gaussian = require("gaussian");

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
      text: "Normaldistribution för residualer",
      color: "black",
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "SANNOLIKHET",
        color: "black",
        type: "time",
      },
    },
    x: {
      title: {
        display: true,
        text: "y-ŷ",
        color: "black",
        type: "time",
      },
    },
  },
};
const kData = karlskronaData.map((d, i) => [i, parseFloat(d.temp)]);
const kTemp = karlskronaData.map((d, i) => parseFloat(d.temp));
// const labels = karlskronaData.map((d) => d.temp);
const range = (start, stop, step = 1) =>
  Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => (x + y * step).toFixed(1));

var labels = range(-10, 10, 0.2);
// for (var i = 8; i <= 32; i++) {
//   labels.push(i);
// }

const result = regression.linear(kData);
const a = result.equation[0];
const b = result.equation[1];

const kLog = karlskronaData.map((d, i) => [i, Math.log(d.temp)]);
const resultLog = regression.linear(kLog);
const k = resultLog.equation[0];
const m = resultLog.equation[1];

function calculateAverage(array) {
  var total = 0;
  var count = 0;

  array.forEach(function (item, index) {
    total += parseFloat(item);
    count++;
  });

  return total / count;
}

function getStandardDeviation(array) {
  const n = array.length;
  const mean = array.reduce((a, b) => parseFloat(a) + parseFloat(b)) / n;
  return Math.sqrt(
    array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
  );
}

// Linear
const residualLin = karlskronaData.map((d, i) => d.temp - (a * i + b));
const avgResidualLin = calculateAverage(residualLin);
const stdResidualLin = getStandardDeviation(residualLin);
// console.log(stdResidualLin ** 2);
var distributionResidualLin = gaussian(avgResidualLin, stdResidualLin ** 2);

// Logaritmic
const residualLog = karlskronaData.map((d, i) => d.temp - Math.exp(k * i + m));
const avgResidualLog = calculateAverage(residualLog);
console.log("lin" + avgResidualLin);
console.log("log " + avgResidualLog);
const stdResidualLog = getStandardDeviation(residualLog);
// console.log(stdResidualLog ** 2);
var distributionResidualLog = gaussian(avgResidualLog, stdResidualLog ** 2);

export const data = {
  labels,
  datasets: [
    {
      label: "Linjär",
      data: labels.map((temp) => distributionResidualLin.pdf(temp)),
      borderColor: "rgb(253, 62, 35)",
      backgroundColor: "rgba(253, 62, 35, 0.5)",
    },
    {
      label: "Logaritmisk",
      data: labels.map((temp) => distributionResidualLog.pdf(temp)),
      borderColor: "rgb(153, 162, 35)",
      backgroundColor: "rgba(153, 162, 35, 0.5)",
    },
  ],
};

export default function ChartSix() {
  return <Line options={options} data={data} />;
}
