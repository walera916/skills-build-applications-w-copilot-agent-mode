import { Types } from 'mongoose';
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
export declare const Leaderboard: import("mongoose").Model<ILeaderboard, {}, {}, {}, import("mongoose").Document<unknown, {}, ILeaderboard> & ILeaderboard & {
    _id: Types.ObjectId;
}, any>;
//# sourceMappingURL=leaderboard.d.ts.map