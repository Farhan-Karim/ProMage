import mongoose, { Schema, Document } from 'mongoose';

interface IManager extends Document {
  name: string;
}

const managerSchema = new Schema({
  name: { type: String, required: true }
});

const Manager = mongoose.model<IManager>('Manager', managerSchema);

export { Manager, IManager }; // Export Manager model and IManager interface

