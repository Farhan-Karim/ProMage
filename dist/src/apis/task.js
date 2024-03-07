"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getTasks = exports.createTask = void 0;
const task_1 = require("../models/task");
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId, name, description, status } = req.body;
        const task = new task_1.Task({ projectId, name, description, status });
        yield task.save();
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createTask = createTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield task_1.Task.find();
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getTasks = getTasks;
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const task = yield task_1.Task.findById(taskId);
        if (!task) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getTaskById = getTaskById;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const { projectId, name, description, status } = req.body;
        const task = yield task_1.Task.findByIdAndUpdate(taskId, { projectId, name, description, status }, { new: true });
        if (!task) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const task = yield task_1.Task.findByIdAndDelete(taskId);
        if (!task) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deleteTask = deleteTask;
// tasks.ts
// import { Express, Request, Response } from "express";
// const tasksAPI = (app: Express) => {
//   let tasks: any[] = [
//     { id: 1, projectId: 1, name: "Task 1", description: "Description for Task 1", status: "In Progress" },
//     { id: 2, projectId: 1, name: "Task 2", description: "Description for Task 2", status: "Completed" },
//     { id: 3, projectId: 2, name: "Task 3", description: "Description for Task 3", status: "Pending" }
//   ];
//   // Get all tasks
//   app.get("/tasks", (req: Request, res: Response) => {
//     res.json(tasks);
//   });
//   // Get task by ID
//   app.get("/tasks/:id", (req: Request, res: Response) => {
//     const taskId: number = parseInt(req.params.id);
//     const task = tasks.find(task => task.id === taskId);
//     if (task) {
//       res.json(task);
//     } else {
//       res.status(404).send("Task not found");
//     }
//   });
//   // Create a new task
//   app.post("/tasks", (req: Request, res: Response) => {
//     const { projectId, name, description, status } = req.body;
//     const newTask = { id: tasks.length + 1, projectId, name, description, status };
//     tasks.push(newTask);
//     res.status(201).json(newTask);
//   });
//   // Update a task
//   app.put("/tasks/:id", (req: Request, res: Response) => {
//     const taskId: number = parseInt(req.params.id);
//     const { projectId, name, description, status } = req.body;
//     const taskIndex = tasks.findIndex(task => task.id === taskId);
//     if (taskIndex !== -1) {
//       tasks[taskIndex] = { ...tasks[taskIndex], projectId, name, description, status };
//       res.json(tasks[taskIndex]);
//     } else {
//       res.status(404).send("Task not found");
//     }
//   });
//   // Delete a task
//   app.delete("/tasks/:id", (req: Request, res: Response) => {
//     const taskId: number = parseInt(req.params.id);
//     tasks = tasks.filter(task => task.id !== taskId);
//     res.status(204).send();
//   });
// };
// export default tasksAPI;
