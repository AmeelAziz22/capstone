// TradingViewWidget.jsx
import React from "react";
import { Chart as chartjs } from "chart.js/auto";
import { Chart, Line } from "react-chartjs-2";
import API from "../../services/api-service";

function PortfolioSummary({ userID, summaryData }) {
  // console.log(summaryData);
  const dates = summaryData.map((item) => item.date);
  const totalValues = summaryData.map((item) => item.total_value);

  const data = {
    labels: dates,
    datasets: [
      {
        data: totalValues,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(15,202,142,1)",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: 
        {
          // type: "time",
        },
      y: 
        {
          suggestedMin: 0,
        },
    },
  };

  return (
    <div className="flex items-center justify-center w-[70vw] h-[20vw]">
        <Line data={data} width={"70%"} options={options}></Line>
    </div>
  );
}

export default PortfolioSummary;
