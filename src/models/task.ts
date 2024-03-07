import mongoose, { Schema, Document } from 'mongoose';

interface ITask extends Document {
  projectId: string;
  name: string;
  description: string;
  status: string;
}

const taskSchema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' }
});

const Task = mongoose.model<ITask>('Task', taskSchema);

export { Task };
