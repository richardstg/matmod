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
      text: "Normaldistribution för medeltemperatur för varje temperatur, samtliga stationer 10-11:e augusti 2021",
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
        text: "TEMPERATUR I CELCIUS",
        color: "black",
        // type: "time",
      },
    },
  },
};
const meanArray = horbyData.map((d, i) => {
  return (
    (parseFloat(d.temp) +
      parseFloat(karlskronaData[i].temp) +
      parseFloat(olandData[i].temp)) /
    3
  );
});

// const labels = karlskronaData.map((d) => d.temp);
const range = (start, stop, step = 1) =>
  Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => (x + y * step).toFixed(1));

var labels = range(12, 25, 0.2);

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

const avg = calculateAverage(meanArray);
const std = getStandardDeviation(meanArray);

var distribution = gaussian(avg, std ** 2);

export const data = {
  labels,
  datasets: [
    {
      label: "Normaldistribution",
      data: labels.map((temp) => distribution.pdf(temp)),
      borderColor: "rgb(153, 162, 35)",
      backgroundColor: "rgba(153, 162, 35, 0.5)",
    },
  ],
};

export default function ChartSeven() {
  return <Line options={options} data={data} />;
}
