import { Request, Response } from 'express';
import { Manager } from '../models/manager';

const createManager = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const manager = new Manager({ name });
    await manager.save();
    res.status(201).json(manager);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getManagers = async (req: Request, res: Response) => {
  try {
    const managers = await Manager.find();
    res.json(managers);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteManager = async (req: Request, res: Response) => {
  try {
    const managerId = req.params.id;
    const manager = await Manager.findByIdAndDelete(managerId);
    if (!manager) {
      res.status(404).json({ error: 'Manager not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { createManager, getManagers, deleteManager };


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
