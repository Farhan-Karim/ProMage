import { Project } from './src/models/project';

// Create a new project document
const newProject = new Project({
  name: 'Project 1',
  startDate: new Date('2024-03-15'),
  endDate: new Date('2024-04-15'),
  manager: 'John Doe'
});

// Save the new project document to the database
newProject.save()
  .then(() => {
    console.log('New project saved successfully');
  })
  .catch((error) => {
    console.error('Error saving project:', error);
  });
