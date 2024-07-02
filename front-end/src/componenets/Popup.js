import React, { useEffect, useState } from "react";
import "./Popup.css";

const Popup = ({
  originTxt,
  indexOfTask,
  trigger,
  handleUpdate,
  setPopupButton,
}) => {
  const [txt, setTxt] = useState(originTxt);

  useEffect(() => {
    setTxt(originTxt);
  }, [trigger]);

  const handleUpdateButton = () => {
    if (txt !== "") {
      handleUpdate(txt, indexOfTask);
      setTxt("");
    }
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUpdateButton();
    }
  };

  return trigger ? (
    <div>
      <div className="popup">
        <div className="popup-inner">
          <button className="close-btn" onClick={() => setPopupButton(false)}>
            cancel
          </button>
          <h2>Update task</h2>

          <input
            value={txt}
            onChange={(e) => setTxt(e.target.value)}
            onKeyDown={(e) => handleOnKeyDown(e)}
          />
          <br />
          <button className="update-btn" onClick={handleUpdateButton}>
            Update Task
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
