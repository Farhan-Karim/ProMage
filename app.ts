import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "./src/apis/project";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "./src/apis/task";
import { createManager, getManagers, deleteManager } from "./src/apis/manager";

const app = express();

const PORT = 4200;
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/myproject")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Project APIs
app.post("/projects", createProject);
app.get("/projects", getProjects);
app.get("/projects/:id", getProjectById);
app.put("/projects/:id", updateProject);
app.delete("/projects/:id", deleteProject);

// Task APIs
app.post("/tasks", createTask);
app.get("/tasks", getTasks);
app.get("/tasks/:id", getTaskById);
app.put("/tasks/:id", updateTask);
app.delete("/tasks/:id", deleteTask);

// Manager APIs
app.post("/managers", createManager);
app.get("/managers", getManagers);
app.delete("/managers/:id", deleteManager);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
