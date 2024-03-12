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
        console.log("task added successfully... ", req.body);
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
