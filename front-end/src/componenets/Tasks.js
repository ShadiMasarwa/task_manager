import Task from "./Task";
import "./Tasks.css";

const Tasks = ({
  tasks,
  handelDeleteFromTasks,
  handleDoneChangeFromTasks,
  handleEditFromTasks,
}) => {
  const handelDeleteFromTask = (index) => {
    handelDeleteFromTasks(index);
  };

  const handleDoneChangeFromTask = (index) => {
    handleDoneChangeFromTasks(index);
  };

  const handleEditFromTask = (index) => {
    handleEditFromTasks(index);
  };

  return (
    <div className="tasksConteainer">
      {tasks.map((el) => (
        <Task
          d={el.done}
          t={el.text}
          i={el.indx}
          key={el.indx}
          handelDeleteFromTask={handelDeleteFromTask}
          handleDoneChangeFromTask={handleDoneChangeFromTask}
          handleEditFromTask={handleEditFromTask}
        />
      ))}
    </div>
  );
};

export default Tasks;
