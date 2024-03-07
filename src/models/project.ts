import mongoose, { Schema, Document } from 'mongoose';

interface IProject extends Document {
  name: string;
  startDate: Date;
  endDate: Date;
  manager: string;
}

const projectSchema = new Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  manager: { type: String, required: true }
});

const Project = mongoose.model<IProject>('Project', projectSchema);

export { Project };
