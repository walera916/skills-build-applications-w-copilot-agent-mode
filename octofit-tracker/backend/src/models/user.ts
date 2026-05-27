import { Schema, model, Types } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  role: string;
  profile: string;
  totalPoints: number;
  team?: Types.ObjectId;
  joinedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    profile: { type: String, required: true },
    totalPoints: { type: Number, required: true, default: 0 },
    team: { type: Types.ObjectId, ref: 'Team' },
    joinedAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
