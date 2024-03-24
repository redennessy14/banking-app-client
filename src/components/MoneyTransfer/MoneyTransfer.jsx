import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const MoneyTransfer = ({ transfers }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const borderColorGradient = document
    .createElement("canvas")
    .getContext("2d")
    .createLinearGradient(0, 0, 0, 400);
  borderColorGradient.addColorStop(0, "blue");
  borderColorGradient.addColorStop(1, "blue");

  const backgroundColorGradient = document
    .createElement("canvas")
    .getContext("2d")
    .createLinearGradient(0, 0, 0, 400);
  backgroundColorGradient.addColorStop(0, "blue");
  backgroundColorGradient.addColorStop(1, "purple");

  useEffect(() => {
    if (chartRef.current) {
      if (transfers.length === 0) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        chartInstance.current = new Chart(chartRef.current, {
          type: "bar",
          data: {
            labels: [],
            datasets: [],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Сумма перевода ($)",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Дата перевода",
                },
              },
            },
          },
        });
      } else {
        const dates = transfers.map((transfer) => {
          const date = new Date(transfer.date);
          return date.toLocaleString("ru-RU", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
        });
        const amounts = transfers.map((transfer) => transfer.amount);

        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(chartRef.current, {
          type: "bar",
          data: {
            labels: dates,
            datasets: [
              {
                label: "Денежные переводы",
                backgroundColor: backgroundColorGradient,
                borderColor: borderColorGradient,
                borderWidth: 1,
                data: amounts,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Сумма перевода ($)",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Дата перевода",
                },
              },
            },
          },
        });
      }
    }
  }, [transfers]);

  return (
    <div>
      <h2>График денежных переводов</h2>
      <canvas ref={chartRef} width={400} height={300}></canvas>
    </div>
  );
};

export default MoneyTransfer;
