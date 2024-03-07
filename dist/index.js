"use strict";
// import express, { Express, Request, Response } from "express";
// const app = express();
// const PORT = 8000;
// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello from node js not TS..");
// });
// app.get("/message", (req: Request, res: Response) => {
//   res.send("Good Server is working");
// });
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.listen(PORT, () => {
//   console.log(`now port is live on ${PORT}`);
// });
// index.ts
const express_1 = __importDefault(require("express"));
const project_1 = __importDefault(require("./src/apis/project"));
// import projectsAPI from "./apis/projects";
// import tasksAPI from "./api/tasks";
// import managersAPI from "./api/managers";
const app = (0, express_1.default)();
const PORT = 8000;
// Body parsing middleware
app.use(express_1.default.json());
// Register API routes
(0, project_1.default)(app);
// tasksAPI(app);
// managersAPI(app);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
