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
      text: "Temperatur 10-11:e augusti 2021",
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

export const data = {
  labels,
  datasets: [
    {
      label: "Hörby",
      data: horbyData.map((d) => d.temp),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Karlskrona",
      data: karlskronaData.map((d) => d.temp),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Öland",
      data: olandData.map((d) => d.temp),
      borderColor: "rgb(53, 162, 135)",
      backgroundColor: "rgba(53, 162, 135, 0.5)",
    },
  ],
};

export default function ChartOne() {
  return <Line options={options} data={data} />;
}
