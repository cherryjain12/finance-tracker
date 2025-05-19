import React, { useEffect, useState } from "react";
import { Table, Card, Radio } from "antd";
import "/home/aman/Desktop/React/finance-tracker/src/index.css";
import { CSVLink } from "react-csv";

const TransactionTable = ({ transactions }) => {
  const [searchWith, setSearchWith] = useState("");
  const [displayData, setDisplayData] = useState(transactions);
  const [filter, setFilter] = useState("All");
  const [sortType, setSortType] = useState("");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  useEffect(() => {
    setDisplayData(transactions);
  }, [transactions]);

  useEffect(() => {
    let typeSearch = [];
    if (filter === "All") {
      typeSearch = ["income", "expense"];
    } else {
      typeSearch = [filter.toLowerCase()];
    }
    let newData = transactions.filter(
      (item) => item.name.includes(searchWith) && typeSearch.includes(item.type)
    );
    setDisplayData(newData);
  }, [searchWith, filter]);

  useEffect(() => {
    const sortData = JSON.parse(JSON.stringify(displayData));
    if (sortType == "amount") {
      sortData.sort((a, b) => a.amount - b.amount);
    } else if (sortType == "name") {
      sortData.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    } else {
      sortData.sort(
        (a, b) =>
          Number(a.date.replaceAll("-", "")) -
          Number(b.date.replaceAll("-", ""))
      );
    }
    setDisplayData(sortData);
  }, [sortType]);

  return (
    <div className="bottom-section">
      <div className="filter-section">
        <input
          type="search"
          className="search-bar"
          placeholder="🔍  Search by Name..."
          onChange={(e) => setSearchWith(e.target.value)}
        />
        <Radio.Group
          className="radio-sorting"
          block
          options={[
            { label: "By Date", value: "" },
            { label: "By Name", value: "name" },
            { label: "By Amount", value: "amount" },
          ]}
          defaultValue=""
          optionType="button"
          onChange={(e) => setSortType(e.target.value)}
        />
        <select className="fiter" onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>Income</option>
          <option>Expense</option>
        </select>
      </div>
      <Card title="My Transactions" className="card-design-table">
        <div className="csv-buttons">
          <CSVLink className="single-button" data={transactions}>
            Export CSV
          </CSVLink>
          <CSVLink className="single-button" data={transactions}>
            Import CSV
          </CSVLink>
        </div>
        <Table
          dataSource={displayData}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default TransactionTable;
