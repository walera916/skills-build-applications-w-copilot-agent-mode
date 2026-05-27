import { Types } from 'mongoose';
export interface ITeam {
    name: string;
    description: string;
    members: Types.ObjectId[];
    totalPoints: number;
    createdAt: Date;
}
export declare const Team: import("mongoose").Model<ITeam, {}, {}, {}, import("mongoose").Document<unknown, {}, ITeam> & ITeam & {
    _id: Types.ObjectId;
}, any>;
//# sourceMappingURL=team.d.ts.map