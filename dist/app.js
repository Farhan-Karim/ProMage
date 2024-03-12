"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const project_1 = require("./src/apis/project");
const task_1 = require("./src/apis/task");
const manager_1 = require("./src/apis/manager");
const app = (0, express_1.default)();
const PORT = 4200;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
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
