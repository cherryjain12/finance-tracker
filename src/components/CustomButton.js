import "/home/aman/Desktop/React/finance-tracker/src/index.css";
import React from "react";

const CustomButton = ({ text, isBlue, onClick }) => {
  return (
    <button
      className="button"
      onClick={onClick}
      style={{
        backgroundColor: isBlue ? "blue" : "#f0f0f0)",
        color: isBlue ? "white" : "black",
        borderRadius: "3px",
      }}
    >
      {text}
    </button>
  );
};

export default CustomButton;
