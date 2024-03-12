import { Request, Response } from "express";
import { Project } from "../models/project";
import { stringify } from "querystring";

const createProject = async (req: Request, res: Response) => {
  try {
    console.log("Project added successfully... ", req.body);
    const { name, startDate, endDate, manager, description} = req.body;
    const project = new Project({ name, startDate, endDate, manager, description});

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", detail: JSON.stringify(error) });
  }
};

const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProjectById = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateProject = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const { name, startDate, endDate, manager } = req.body;
    const project = await Project.findByIdAndUpdate(
      projectId,
      { name, startDate, endDate, manager },
      { new: true }
    );
    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteProject = async (req: Request, res: Response) => {
  try {
    console.log("Delete request:", req.method, req.url, req.params);
    const projectId = req.params.id;
    const project = await Project.findByIdAndDelete(projectId);
    if (!project) {
      console.log("Project not found");
      return res.status(404).json({ error: "Project not found" });
    }
    console.log(`Successfully deleted project: ${projectId}`);
    return res.status(204).send(); // No content to send in response
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



export {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};


    // const project = new Project({
    //   name: 'Project 1',
    //   startDate: new Date('2024-03-15'),
    //   endDate: new Date('2024-04-15'),
    //   manager: 'John Doe',
    //   description: 'This is a backend project on promage'
    // });