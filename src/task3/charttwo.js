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

function getStandardDeviation(array) {
  const n = array.length;
  const mean = array.reduce((a, b) => parseFloat(a) + parseFloat(b)) / n;
  return Math.sqrt(
    array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
  );
}

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
      text: "Medelemperatur för samtliga stationer med standardavvikelse 10-11:e augusti 2021",
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

const labels = horbyData.map((d) => d.time);

const meanArray = horbyData.map((d, i) => {
  return (
    (parseFloat(d.temp) +
      parseFloat(karlskronaData[i].temp) +
      parseFloat(olandData[i].temp)) /
    3
  );
});

const stdAvgLow = meanArray.map((d) => d - getStandardDeviation(meanArray));
const stdAvgHigh = meanArray.map((d) => d + getStandardDeviation(meanArray));

export const data = {
  labels,
  datasets: [
    {
      label: "Medeltemperatur",
      data: meanArray,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "std low",
      data: stdAvgLow,
      borderColor: "rgb(3, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "std high",
      data: stdAvgHigh,
      borderColor: "rgb(3, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    // {
    //   label: "Öland",
    //   data: olandData.map((d) => d.temp),
    //   borderColor: "rgb(53, 162, 135)",
    //   backgroundColor: "rgba(53, 162, 135, 0.5)",
    // },
  ],
};

export default function ChartTwo() {
  return <Line options={options} data={data} />;
}
