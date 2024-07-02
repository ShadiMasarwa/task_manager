import React, { useState } from "react";
import "./AddForm.css";
import AddButton from "./AddButton.svg";

const AddForm = ({ handleAddNewTask }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (inputValue !== "") {
        handleAddNewTask(inputValue);
        setInputValue("");
      }
    }
  };

  return (
    <div className="container1">
      <div className="inner-container">
        <h2>Add Task: </h2>
        <input
          className="inputTask"
          value={inputValue}
          placeholder="Task"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <img
          src={AddButton}
          alt="Add Button"
          className="btnAddForm"
          onClick={() => {
            if (inputValue !== "") {
              handleAddNewTask(inputValue);
              setInputValue("");
            }
          }}
        />
      </div>
    </div>
  );
};

export default AddForm;
