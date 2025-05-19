import React from "react";
import { Pie } from "@ant-design/plots";
import "../index.css";

const PieChart = ({ transactions }) => {
  let totalIncome = 0,
    totalExpense = 0;
  transactions.map((item) => {
    if (item.type === "income") {
      totalIncome = totalIncome + item.amount;
    } else {
      totalExpense = totalExpense + item.amount;
    }
  });
  console.log(totalExpense, totalIncome);
  const config = {
    data: [
      { type: "Income", value: totalIncome },
      { type: "Expense", value: totalExpense },
    ],
    angleField: "value",
    colorField: "type",
    label: {
      text: "value",
      position: "outside",
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
  };
  return (
    <div className="pieChart">
      <h3>Expense-Income</h3>
      <Pie {...config} />
    </div>
  );
};

export default PieChart;
