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