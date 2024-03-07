import { Request, Response } from "express";
import { Project } from "../models/project";
import { stringify } from "querystring";

const createProject = async (req: Request, res: Response) => {
  try {
    console.log("Project added successfully... ", req.body);
    const { name, startDate, endDate, manager } = req.body;
    const project = new Project({ name, startDate, endDate, manager });
    // const project = new Project({
    //   name: 'Project 1',
    //   startDate: new Date('2024-03-15'),
    //   endDate: new Date('2024-04-15'),
    //   manager: 'John Doe'
    // });
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
    const projectId = req.params.id;
    const project = await Project.findByIdAndDelete(projectId);
    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};

// // projects.ts

// import { Express, Request, Response } from "express";

// const projectsAPI = (app: Express) => {
//   let projects: any[] = [
//     { id: 1, name: "Project 1", startDate: "2024-03-06", endDate: "2024-03-10", manager: "John Doe", tasks: [] },
//     { id: 2, name: "Project 2", startDate: "2024-03-08", endDate: "2024-03-15", manager: "Jane Smith", tasks: [] }
//   ];

//   // Get all projects
//   app.get("/projects", (req: Request, res: Response) => {
//     res.json(projects);
//   });

//   // Get project by ID
//   app.get("/projects/:id", (req: Request, res: Response) => {
//     const projectId: number = parseInt(req.params.id);
//     const project = projects.find(project => project.id === projectId);
//     if (project) {
//       res.json(project);
//     } else {
//       res.status(404).send("Project not found");
//     }
//   });

//   // Create a new project
//   app.post("/projects", (req: Request, res: Response) => {
//     const { name, startDate, endDate, manager } = req.body;
//     const newProject = { id: projects.length + 1, name, startDate, endDate, manager, tasks: [] };
//     projects.push(newProject);
//     res.status(201).json(newProject);
//   });

//   // Update a project
//   app.put("/projects/:id", (req: Request, res: Response) => {
//     const projectId: number = parseInt(req.params.id);
//     const { name, startDate, endDate, manager } = req.body;
//     const projectIndex = projects.findIndex(project => project.id === projectId);
//     if (projectIndex !== -1) {
//       projects[projectIndex] = { ...projects[projectIndex], name, startDate, endDate, manager };
//       res.json(projects[projectIndex]);
//     } else {
//       res.status(404).send("Project not found");
//     }
//   });

//   // Delete a project
//   app.delete("/projects/:id", (req: Request, res: Response) => {
//     const projectId: number = parseInt(req.params.id);
//     projects = projects.filter(project => project.id !== projectId);
//     res.status(204).send();
//   });
// };

// export default projectsAPI;
