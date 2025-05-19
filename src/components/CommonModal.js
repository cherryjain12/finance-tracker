import React, { useState } from "react";
import InputLabel from "./InputLabel";
import { Card, Modal } from "antd";
import "../index.css";
import CustomButton from "./CustomButton";

const CommonModal = ({ title, kind, cancelModal, isModalOpen, onClick }) => {
  const [incomeData, setIncomeData] = useState({
    name: "",
    amount: 0,
    date: "",
    tag: "",
    type: "income",
  });

  const [expenseData, setExpenseData] = useState({
    name: "",
    amount: 0,
    date: "",
    tag: "",
    type: "expense",
  });

  const settingIncomeDataOnInput = (e, val) => {
    const targetVal =
      val === "amount" ? Number(e.target.value) : e.target.value;
    setIncomeData((prev) => ({ ...prev, [val]: targetVal }));
  };

  const settingExpenseDataOnInput = (e, val) => {
    const targetVal =
      val === "amount" ? Number(e.target.value) : e.target.value;
    setExpenseData((prev) => ({ ...prev, [val]: targetVal }));
  };

  return (
    <Modal
      title={title}
      open={isModalOpen}
      footer={null}
      closable={true}
      onCancel={cancelModal}
    >
      <Card>
        <InputLabel
          label="Name"
          placeholderVal=""
          type="text"
          onChange={
            kind == "income"
              ? (e) => settingIncomeDataOnInput(e, "name")
              : (e) => settingExpenseDataOnInput(e, "name")
          }
        />
        <InputLabel
          label="Amount"
          placeholderVal=""
          type="number"
          onChange={
            kind == "income"
              ? (e) => settingIncomeDataOnInput(e, "amount")
              : (e) => settingExpenseDataOnInput(e, "amount")
          }
        />
        <InputLabel
          label="Date"
          placeholderVal="Select Date"
          type="date"
          onChange={
            kind == "income"
              ? (e) => settingIncomeDataOnInput(e, "date")
              : (e) => settingExpenseDataOnInput(e, "date")
          }
        />
        {/* make this diff component : bcz every component should follow "SINGLE RESPONSIBILITY PRINCIPLE" */}
        <InputLabel
          label="Tag"
          customInput={
            <select id="options" name="options" required defaultValue="">
              <option value="" disabled selected hidden></option>
              <option value="apple">Salary</option>
              <option value="banana">Freelance</option>
              <option value="cherry">Investment</option>
            </select>
          }
          onChange={
            kind == "income"
              ? (e) => settingIncomeDataOnInput(e, "tag")
              : (e) => settingExpenseDataOnInput(e, "tag")
          }
        />
        <br />
        <CustomButton
          text={title}
          onClick={() => {
            kind === "income" ? onClick(incomeData) : onClick(expenseData);
          }}
          isBlue={true}
        />
      </Card>
    </Modal>
  );
};

export default CommonModal;
