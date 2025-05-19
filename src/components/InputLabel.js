import React from "react";
import "/home/aman/Desktop/React/finance-tracker/src/index.css";

const InputLabel = ({ label, onChange, placeholderVal, type, customInput }) => {
  return (
    <div>
      <label className="label">
        <strong>{label}</strong>
      </label>
      {customInput ? (
        customInput
      ) : (
        <input
          className="input"
          onChange={onChange}
          placeholder={placeholderVal}
          type={type}
        />
      )}
    </div>
  );
};

export default InputLabel;
