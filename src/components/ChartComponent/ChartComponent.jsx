import React from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
Chart.register(CategoryScale);

const ChartComponent = () => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const dataPoints = [65, 59, 80, 81, 56, 55, 40];

  const borderColorGradient = document
    .createElement("canvas")
    .getContext("2d")
    .createLinearGradient(0, 0, 0, 400);
  borderColorGradient.addColorStop(0, "blue");
  borderColorGradient.addColorStop(1, "purple");

  const backgroundColorGradient = document
    .createElement("canvas")
    .getContext("2d")
    .createLinearGradient(0, 0, 0, 400);
  backgroundColorGradient.addColorStop(0, "purple");
  backgroundColorGradient.addColorStop(1, "blue");

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Dataset 1",
        data: dataPoints,
        borderColor: borderColorGradient,
        backgroundColor: backgroundColorGradient,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "График переводов",
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        type: "logarithmic",
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ChartComponent;
