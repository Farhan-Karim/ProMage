"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const project_1 = require("./src/apis/project");
const task_1 = require("./src/apis/task");
const manager_1 = require("./src/apis/manager");
const app = (0, express_1.default)();
const cors = require('cors');
const PORT = 8080;
app.use(cors());
app.use(express_1.default.json());
// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/myproject', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose_1.default
    .connect("mongodb://localhost:27017/myproject")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));
// Project APIs
app.post("/projects", project_1.createProject);
app.get("/projects", project_1.getProjects);
app.get("/projects/:id", project_1.getProjectById);
app.put("/projects/:id", project_1.updateProject);
app.delete("/projects/:id", project_1.deleteProject);
// Task APIs
app.post("/tasks", task_1.createTask);
app.get("/tasks", task_1.getTasks);
app.get("/tasks/:id", task_1.getTaskById);
app.put("/tasks/:id", task_1.updateTask);
app.delete("/tasks/:id", task_1.deleteTask);
// Manager APIs
app.post("/managers", manager_1.createManager);
app.get("/managers", manager_1.getManagers);
app.delete("/managers/:id", manager_1.deleteManager);
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
