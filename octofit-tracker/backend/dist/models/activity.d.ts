import { Types } from 'mongoose';
export interface IActivity {
    user: Types.ObjectId;
    type: string;
    durationMinutes: number;
    caloriesBurned: number;
    date: Date;
    notes: string;
}
export declare const Activity: import("mongoose").Model<IActivity, {}, {}, {}, import("mongoose").Document<unknown, {}, IActivity> & IActivity & {
    _id: Types.ObjectId;
}, any>;
//# sourceMappingURL=activity.d.ts.map