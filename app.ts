import express from "express";
import mongoose from "mongoose";
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
const PORT = 8080;

app.use(express.json());

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/myproject', { useNewUrlParser: true, useUnifiedTopology: true })

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

// import express, { Express } from "express";
// import projectsAPI from "./src/apis/project";
// // import projectsAPI from "./apis/projects";
// import tasksAPI from "./src/apis/task";
// import managersAPI from "./src/apis/manager";

// const app: Express = express();
// const PORT: number = 8000;

// // Body parsing middleware
// app.use(express.json());

// // Register API routes
// projectsAPI(app);
// tasksAPI(app);
// managersAPI(app);

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// import express, { Express, Request, Response } from "express";
// const app = express();
// const PORT = 8000;
// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello from node js not TS..");
// });
// app.get("/message", (req: Request, res: Response) => {
//   res.send("Good Server is working");
// });

// app.listen(PORT, () => {
//   console.log(`now port is live on ${PORT}`);
// });
// index.ts
