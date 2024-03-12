import { Request, Response } from 'express';
import { Task } from '../models/task';

const createTask = async (req: Request, res: Response) => {
  try {
    console.log("task added successfully... ", req.body);
    const { projectId, name, description, status } = req.body;
    const task = new Task({ projectId, name, description, status });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getTaskById = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const { projectId, name, description, status } = req.body;
    const task = await Task.findByIdAndUpdate(taskId, { projectId, name, description, status }, { new: true });
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { createTask, getTasks, getTaskById, updateTask, deleteTask };