import {useState } from "react";
import "./Task.css";
import deleteIcon from "./deleteIcon.svg";
import editIcon from "./editIcon.svg";

const Task = ({
  i,
  d,
  t,
  handelDeleteFromTask,
  handleDoneChangeFromTask,
  handleEditFromTask,
}) => {
  const [done, setDone] = useState(d);
  return (
    <div key={i} className="taskContainer">
      <div className="taskText">
        <input
          type="checkbox"
          checked={done}
          onChange={(e) => {
            setDone(e.target.checked);
            handleDoneChangeFromTask(e.target.id.split("_")[1]);
          }}
          className="taskInput"
          id={"input_" + i}
        />

        <label title={t} htmlFor={"input_" + i}>
          {t}
        </label>
      </div>

      <div className="taskButtons">
        <img
          src={editIcon}
          className="edit-btn"
          id={"edit_" + i}
          title="Edit"
          alt="Edit icon"
          onClick={(e) => {
            handleEditFromTask(e.target.id.split("_")[1]);
          }}
        />
        <img
          src={deleteIcon}
          title="Delete"
          alt="Delete icon"
          id={"delete_" + i}
          onClick={(e) => {
            handelDeleteFromTask(e.target.id.split("_")[1]);
          }}
        />
      </div>
    </div>
  );
};

export default Task;
