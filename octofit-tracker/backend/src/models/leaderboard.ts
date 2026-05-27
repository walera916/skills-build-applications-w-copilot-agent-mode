import { Schema, model, Types } from 'mongoose';

export interface ILeaderboardEntry {
  rank: number;
  entityType: 'user' | 'team';
  entityId: Types.ObjectId;
  label: string;
  points: number;
}

export interface ILeaderboard {
  name: string;
  scope: string;
  entries: ILeaderboardEntry[];
}

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>(
  {
    rank: { type: Number, required: true },
    entityType: { type: String, required: true, enum: ['user', 'team'] },
    entityId: { type: Schema.Types.ObjectId, required: true },
    label: { type: String, required: true },
    points: { type: Number, required: true },
  },
  { _id: false }
);

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    name: { type: String, required: true },
    scope: { type: String, required: true },
    entries: { type: [leaderboardEntrySchema], required: true },
  },
  { timestamps: true }
);

export const Leaderboard = model<ILeaderboard>('Leaderboard', leaderboardSchema);
