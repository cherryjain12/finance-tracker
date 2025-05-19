import React from "react";
import "/home/aman/Desktop/React/finance-tracker/src/index.css";
import CustomButton from "./CustomButton";
import { Card } from "antd";

const SingleCard = ({ title, amount, btnText, btnAction }) => {
  return (
    <Card className="card-design" title={title}>
      <p className="dollar">${amount}</p>
      <CustomButton text={btnText} isBlue={true} onClick={btnAction} />
    </Card>
  );
};

export default SingleCard;
