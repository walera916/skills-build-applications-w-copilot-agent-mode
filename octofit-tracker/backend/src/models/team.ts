import { Schema, model, Types } from 'mongoose';

export interface ITeam {
  name: string;
  description: string;
  members: Types.ObjectId[];
  totalPoints: number;
  createdAt: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: Types.ObjectId, ref: 'User' }],
    totalPoints: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

export const Team = model<ITeam>('Team', teamSchema);
