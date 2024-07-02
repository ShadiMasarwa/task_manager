const express = require("express");
const app = express();
const PORT = process.env.port || 5000;
const todoList = require("./todolist.json");
const cors = require("cors");
const fs = require("fs");

app.use(express.json());
app.use(cors());

app.get("/todolist", (req, res) => {
  return res.json(todoList);
});

app.post("/todolist/", (req, res) => {
  let taskId = 1;
  try {
    taskId = todoList[todoList.length - 1].indx + 1;
  } catch (error) {
    taskId = 1;
  }
  const newTask = Object.assign({ indx: taskId }, req.body);
  todoList.push(newTask);
  fs.writeFile("./todolist.json", JSON.stringify(todoList), (err, data) => {
    return res.json({ message: "Task was created..." });
  });
});

app.put("/todolist/:taskId", (req, res) => {
  const id = Number(req.params.taskId);
  const index = todoList.findIndex((todoList) => todoList.indx === id);
  todoList.splice(index, 1, { ...req.body });
  fs.writeFile("./todolist.json", JSON.stringify(todoList), (err, data) => {
    return res.json({ message: "Task was updated..." });
  });
});

app.delete("/todolist/:taskId", (req, res) => {
  const id = Number(req.params.taskId);
  //   const newTasks = todoList.filter((tasks) => todoList.indx != id);
  const index = todoList.findIndex((todoList) => todoList.indx === id);
  todoList.splice(index, 1);
  fs.writeFile("./todolist.json", JSON.stringify(todoList), (err, data) => {
    return res.json({ message: "Task was deleted..." });
  });
});

app.listen(PORT, (err) => {
  console.log(`App listening at port: ${PORT}...`);
});
