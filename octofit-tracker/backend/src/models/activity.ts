import { Schema, model, Types } from 'mongoose';

export interface IActivity {
  user: Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
  notes: string;
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    notes: { type: String, required: true },
  },
  { timestamps: true }
);

export const Activity = model<IActivity>('Activity', activitySchema);
