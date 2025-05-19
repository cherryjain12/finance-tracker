import React from "react";
import { Line } from "@ant-design/plots";
import "/home/aman/Desktop/React/finance-tracker/src/index.css";

const StatisticGraph = ({ transactions }) => {
  const data = Object.values(transactions);
  data.sort((a, b) => new Date(a.date) - new Date(b.date));
  const config = {
    data,
    xField: "date",
    yField: "amount",
    point: {
      shapeField: "square",
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: true,
      },
    },
    style: {
      lineWidth: 2,
    },
  };
  return (
    <div className="statistics">
      <h3>Financial Statistics</h3>
      <Line {...config} />
    </div>
  );
};

export default StatisticGraph;
