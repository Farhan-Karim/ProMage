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
exports.deleteProject = exports.updateProject = exports.getProjectById = exports.getProjects = exports.createProject = void 0;
const project_1 = require("../models/project");
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Project added successfully... ", req.body);
        const { name, startDate, endDate, manager, description } = req.body;
        const project = new project_1.Project({ name, startDate, endDate, manager, description });
        yield project.save();
        res.status(201).json(project);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Internal server error", detail: JSON.stringify(error) });
    }
});
exports.createProject = createProject;
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield project_1.Project.find();
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getProjects = getProjects;
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectId = req.params.id;
        const project = yield project_1.Project.findById(projectId);
        if (!project) {
            res.status(404).json({ error: "Project not found" });
            return;
        }
        res.json(project);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getProjectById = getProjectById;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectId = req.params.id;
        const { name, startDate, endDate, manager } = req.body;
        const project = yield project_1.Project.findByIdAndUpdate(projectId, { name, startDate, endDate, manager }, { new: true });
        if (!project) {
            res.status(404).json({ error: "Project not found" });
            return;
        }
        res.json(project);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateProject = updateProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Delete request:", req.method, req.url, req.params);
        const projectId = req.params.id;
        const project = yield project_1.Project.findByIdAndDelete(projectId);
        if (!project) {
            console.log("Project not found");
            return res.status(404).json({ error: "Project not found" });
        }
        console.log(`Successfully deleted project: ${projectId}`);
        return res.status(204).send(); // No content to send in response
    }
    catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteProject = deleteProject;
// const project = new Project({
//   name: 'Project 1',
//   startDate: new Date('2024-03-15'),
//   endDate: new Date('2024-04-15'),
//   manager: 'John Doe',
//   description: 'This is a backend project on promage'
// });
