import React, { useEffect, useState } from "react";
import "./App.css";
import AddForm from "./componenets/AddForm";
import Tasks from "./componenets/Tasks";
import Popup from "./componenets/Popup";

function App() {
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("tasks"))
      ? JSON.parse(localStorage.getItem("tasks"))
      : []
  );
  const [popupButton, setPopupButton] = useState(false);
  const [updateText, setUpdateText] = useState("");
  const [updateIndex, setUpdateIndex] = useState(-1);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  const handleAddNewTask = (task) => {

    let newIndx = -1;
    if (taskList.length === 0) newIndx = 0;
    else newIndx = parseInt(taskList[taskList.length - 1].indx) + 1;
    const tsk = {
      done: false,
      text: task,
      indx: newIndx,
    };
    setTaskList([...taskList, tsk]);
  };

  const handleImportTasks = () => {
    let newIndx = 0;
    if (taskList.length > 0)
      newIndx = parseInt(taskList[taskList.length - 1].indx);
    
    fetch("https://dummyjson.com/todos")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const jsonTasks = data.todos.slice(0, 7).map((item) => {
          newIndx++;
          const tsk = {
            done: item.completed,
            text: item.todo,
            indx: newIndx,
          };
          return tsk;
        });
        setTaskList([...taskList.concat([...jsonTasks])]);
      });

  };

  const handelDeleteFromTasks = (index) => {
    const newArray = taskList.filter((el) => el.indx !== parseInt(index));
    setTaskList([...newArray]);
  };

  const handleDoneChangeFromTasks = (index) => {
    const temp=taskList.map((el) => {
      if (el.indx === parseInt(index)) {
        el.done = !el.done;
        return el;
      }
      return el;
    });
    setTaskList([...temp])
  };

  const handleEditFromTasks = (index) => {
    let i = -1;
    let t = "";
    taskList.map((el, indexOfEl) => {
      if (el.indx === parseInt(index)) {
        i = indexOfEl;
        t = el.text;
        return el;
      }
      else
        return el
    });
    setPopupButton(true);
    setUpdateText(t);
    setUpdateIndex(i);
  };

  const handleUpdate = (txt, index) => {
    const i = taskList[index].indx
    const temp = taskList.map(el => {
      if (i === el.indx) {
        el.text = txt;
        return el
      }
      else
        return el
    })
    setPopupButton(false);
    setTaskList([...temp])
  };

  const handleDeleteAll = () => {
    
    setTaskList([]);
  };

  const handleDeleteChecked = () => {
    const newArray = taskList.filter((el) => !el.done);
    setTaskList([...newArray]);
  };

  return (
    <div className="App">
      <AddForm handleAddNewTask={handleAddNewTask} />
      <Tasks
        tasks={taskList}
        handelDeleteFromTasks={handelDeleteFromTasks}
        handleDoneChangeFromTasks={handleDoneChangeFromTasks}
        handleEditFromTasks={handleEditFromTasks}
      />
      <div className="btns">
        <button className="btn btndeletechecked" onClick={handleDeleteChecked}>
          Delete Checked
        </button>
        <button className="btn btnDeleteAll" onClick={handleDeleteAll}>
          Delete All
        </button>
        <button className="btn btnImport" onClick={handleImportTasks}>
          Import Tasks
        </button>
      </div>
      <Popup
        originTxt={updateText}
        indexOfTask={updateIndex}
        trigger={popupButton}
        handleUpdate={handleUpdate}
        setPopupButton={setPopupButton}
      />
    </div>
  );
}

export default App;
