import { Types } from 'mongoose';
export interface IUser {
    name: string;
    email: string;
    role: string;
    profile: string;
    totalPoints: number;
    team?: Types.ObjectId;
    joinedAt: Date;
}
export declare const User: import("mongoose").Model<IUser, {}, {}, {}, import("mongoose").Document<unknown, {}, IUser> & IUser & {
    _id: Types.ObjectId;
}, any>;
//# sourceMappingURL=user.d.ts.map