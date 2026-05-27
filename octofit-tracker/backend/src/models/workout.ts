import { Schema, model } from 'mongoose';

export interface IWorkout {
  name: string;
  category: string;
  durationMinutes: number;
  difficulty: string;
  targetMuscles: string[];
  description: string;
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true },
    targetMuscles: [{ type: String, required: true }],
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export const Workout = model<IWorkout>('Workout', workoutSchema);
