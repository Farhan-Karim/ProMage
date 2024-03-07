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
exports.deleteManager = exports.getManagers = exports.createManager = void 0;
const manager_1 = require("../models/manager");
const createManager = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const manager = new manager_1.Manager({ name });
        yield manager.save();
        res.status(201).json(manager);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createManager = createManager;
const getManagers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const managers = yield manager_1.Manager.find();
        res.json(managers);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getManagers = getManagers;
const deleteManager = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const managerId = req.params.id;
        const manager = yield manager_1.Manager.findByIdAndDelete(managerId);
        if (!manager) {
            res.status(404).json({ error: 'Manager not found' });
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deleteManager = deleteManager;
// // managers.ts
// import { Express, Request, Response } from "express";
// const managersAPI = (app: Express) => {
//   let managers: string[] = ["John Doe", "Jane Smith", "Alice Johnson"];
//   // Get all managers
//   app.get("/managers", (req: Request, res: Response) => {
//     res.json(managers);
//   });
//   // Create a new manager
//   app.post("/managers", (req: Request, res: Response) => {
//     const { name } = req.body;
//     managers.push(name);
//     res.status(201).json({ message: "Manager added successfully" });
//   });
//   // Delete a manager
//   app.delete("/managers/:name", (req: Request, res: Response) => {
//     const nameToDelete: string = req.params.name;
//     managers = managers.filter(manager => manager !== nameToDelete);
//     res.status(204).send();
//   });
// };
// export default managersAPI;
